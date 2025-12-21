-- Enable RLS on menu_items table (if not already enabled)
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS menu_items_select ON menu_items;
DROP POLICY IF EXISTS menu_items_insert ON menu_items;
DROP POLICY IF EXISTS menu_items_update ON menu_items;
DROP POLICY IF EXISTS menu_items_delete ON menu_items;

-- Create SELECT policy
CREATE POLICY menu_items_select ON menu_items
FOR SELECT USING (
  restaurant_id IN (
    SELECT id FROM restaurants WHERE owner_id = auth.uid()
  )
);

-- Create INSERT policy
CREATE POLICY menu_items_insert ON menu_items
FOR INSERT WITH CHECK (
  restaurant_id IN (
    SELECT id FROM restaurants WHERE owner_id = auth.uid()
  )
);

-- Create UPDATE policy
CREATE POLICY menu_items_update ON menu_items
FOR UPDATE USING (
  restaurant_id IN (
    SELECT id FROM restaurants WHERE owner_id = auth.uid()
  )
) WITH CHECK (
  restaurant_id IN (
    SELECT id FROM restaurants WHERE owner_id = auth.uid()
  )
);

-- Create DELETE policy
CREATE POLICY menu_items_delete ON menu_items
FOR DELETE USING (
  restaurant_id IN (
    SELECT id FROM restaurants WHERE owner_id = auth.uid()
  )
);