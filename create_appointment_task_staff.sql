CREATE TABLE IF NOT EXISTS appointment_task_staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  service_task_id UUID NOT NULL REFERENCES service_tasks(id),
  staff_id UUID NOT NULL REFERENCES staff(id),
  
  -- Support staff replacement
  replaced_by_staff_id UUID REFERENCES staff(id),
  replacement_reason TEXT,
  replaced_at TIMESTAMPTZ,
  
  -- Commission tracking for this specific task
  percentage_share DECIMAL(5,2), 
  
  -- Audit trail
  assigned_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_app_task_staff_appointment ON appointment_task_staff(appointment_id);
CREATE INDEX IF NOT EXISTS idx_app_task_staff_task ON appointment_task_staff(service_task_id);
CREATE INDEX IF NOT EXISTS idx_app_task_staff_staff ON appointment_task_staff(staff_id);

-- Enable RLS
ALTER TABLE appointment_task_staff ENABLE ROW LEVEL SECURITY;

-- Policy (similar to appointment_staff)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'appointment_task_staff' 
        AND policyname = 'Users can manage task staff for their own appointments'
    ) THEN
        CREATE POLICY "Users can manage task staff for their own appointments" 
        ON appointment_task_staff FOR ALL 
        USING (
          appointment_id IN (
            SELECT id FROM appointments 
            WHERE restaurant_id IN (
              SELECT id FROM restaurants WHERE owner_id = auth.uid()
            )
          )
        );
    END IF;
END $$;
