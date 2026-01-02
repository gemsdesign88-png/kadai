-- Create table_sessions table for managing dynamic order codes
CREATE TABLE IF NOT EXISTS table_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_id UUID NOT NULL REFERENCES tables(id) ON DELETE CASCADE,
  dynamic_code VARCHAR(12) NOT NULL UNIQUE, -- Short unique code
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT true,
  UNIQUE(table_id, dynamic_code)
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_table_sessions_table_id ON table_sessions(table_id);
CREATE INDEX IF NOT EXISTS idx_table_sessions_code ON table_sessions(dynamic_code);
CREATE INDEX IF NOT EXISTS idx_table_sessions_active ON table_sessions(is_active, expires_at);

-- RLS Policies
ALTER TABLE table_sessions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read active sessions
CREATE POLICY "Anyone can read active sessions"
  ON table_sessions
  FOR SELECT
  USING (true);

-- Allow anyone to insert sessions (for initial QR scan)
CREATE POLICY "Anyone can create sessions"
  ON table_sessions
  FOR INSERT
  WITH CHECK (true);

-- Function to generate short unique code
CREATE OR REPLACE FUNCTION generate_dynamic_code()
RETURNS VARCHAR(12) AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; -- Exclude similar looking chars
  result VARCHAR(12) := '';
  i INTEGER;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to create new dynamic code for table
CREATE OR REPLACE FUNCTION create_dynamic_code(p_table_id UUID, p_duration_minutes INTEGER DEFAULT 5)
RETURNS TABLE (
  dynamic_code VARCHAR(12),
  expires_at TIMESTAMPTZ
) AS $$
DECLARE
  v_code VARCHAR(12);
  v_expires_at TIMESTAMPTZ;
  v_max_attempts INTEGER := 10;
  v_attempt INTEGER := 0;
BEGIN
  v_expires_at := NOW() + (p_duration_minutes || ' minutes')::INTERVAL;
  
  -- Try to generate unique code
  LOOP
    v_code := generate_dynamic_code();
    v_attempt := v_attempt + 1;
    
    -- Try to insert
    BEGIN
      INSERT INTO table_sessions (table_id, dynamic_code, expires_at)
      VALUES (p_table_id, v_code, v_expires_at);
      
      EXIT; -- Success, exit loop
    EXCEPTION WHEN unique_violation THEN
      IF v_attempt >= v_max_attempts THEN
        RAISE EXCEPTION 'Failed to generate unique code after % attempts', v_max_attempts;
      END IF;
      -- Try again with new code
    END;
  END LOOP;
  
  RETURN QUERY SELECT v_code, v_expires_at;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to validate dynamic code
CREATE OR REPLACE FUNCTION validate_dynamic_code(p_table_id UUID, p_dynamic_code VARCHAR(12))
RETURNS BOOLEAN AS $$
DECLARE
  v_is_valid BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1
    FROM table_sessions
    WHERE table_id = p_table_id
      AND dynamic_code = p_dynamic_code
      AND is_active = true
      AND expires_at > NOW()
  ) INTO v_is_valid;
  
  RETURN v_is_valid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to invalidate old sessions for a table
CREATE OR REPLACE FUNCTION invalidate_old_sessions(p_table_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
BEGIN
  UPDATE table_sessions
  SET is_active = false
  WHERE table_id = p_table_id
    AND (expires_at <= NOW() OR is_active = true);
    
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON TABLE table_sessions IS 'Stores dynamic codes for table ordering - codes expire after 5 minutes';
COMMENT ON FUNCTION create_dynamic_code IS 'Generates new dynamic code for table ordering';
COMMENT ON FUNCTION validate_dynamic_code IS 'Validates if dynamic code is still valid';
COMMENT ON FUNCTION invalidate_old_sessions IS 'Invalidates expired or old sessions for a table';
