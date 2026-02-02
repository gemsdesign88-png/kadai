
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bigjlzrnlzcfxwlkstpp.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZ2psenJubHpjZnh3bGtzdHBwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjcxMzE1NCwiZXhwIjoyMDc4Mjg5MTU0fQ.GcZT8vuuD_8eOU4pr6X5vYjAnmH81arHOBnQTJbqpZM';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const sql = `-- Create appointment_task_staff junction table
CREATE TABLE IF NOT EXISTS public.appointment_task_staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
    service_task_id UUID NOT NULL REFERENCES public.service_tasks(id) ON DELETE CASCADE,
    staff_id UUID NOT NULL REFERENCES public.staff(id) ON DELETE CASCADE,
    
    -- Optional fields for commission and replacement tracking
    percentage_share DECIMAL(5,2),
    replaced_by_staff_id UUID REFERENCES public.staff(id),
    replacement_reason TEXT,
    replaced_at TIMESTAMPTZ,
    
    assigned_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_app_task_staff_appointment ON public.appointment_task_staff(appointment_id);
CREATE INDEX IF NOT EXISTS idx_app_task_staff_task ON public.appointment_task_staff(service_task_id);
CREATE INDEX IF NOT EXISTS idx_app_task_staff_staff ON public.appointment_task_staff(staff_id);

-- Enable RLS
ALTER TABLE public.appointment_task_staff ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'appointment_task_staff' AND policyname = 'Users can manage task staff for their own appointments'
    ) THEN
        CREATE POLICY "Users can manage task staff for their own appointments" 
        ON public.appointment_task_staff FOR ALL 
        USING (
            appointment_id IN (
                SELECT id FROM public.appointments 
                WHERE restaurant_id IN (
                    SELECT id FROM public.restaurants WHERE owner_id = auth.uid()
                )
            )
        );
    END IF;
END $$;
`;

async function executeSql() {
  console.log('Executing SQL...');
  const { data, error } = await supabase.rpc('exec_sql', { sql });

  if (error) {
    console.error('Error executing SQL:', error);
  } else {
    console.log('SQL executed successfully!');
    console.log('Result:', data);
  }
}

executeSql();
