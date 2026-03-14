-- Kadai Modifiers System Implementation (Resto Only)

-- 1. Create Modifier Groups table
CREATE TABLE IF NOT EXISTS public.modifier_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    min_selection INTEGER DEFAULT 0,
    max_selection INTEGER DEFAULT 1,
    is_required BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Modifiers table (individual options)
CREATE TABLE IF NOT EXISTS public.modifiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL REFERENCES public.modifier_groups(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    additional_price NUMERIC DEFAULT 0,
    ingredient_id UUID REFERENCES public.ingredients(id) ON DELETE SET NULL,
    ingredient_quantity NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Mapping Table (Link Menu Items to Modifier Groups)
CREATE TABLE IF NOT EXISTS public.menu_item_modifier_groups (
    menu_item_id UUID NOT NULL REFERENCES public.menu_items(id) ON DELETE CASCADE,
    modifier_group_id UUID NOT NULL REFERENCES public.modifier_groups(id) ON DELETE CASCADE,
    PRIMARY KEY (menu_item_id, modifier_group_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Update order_items table to store modifiers snapshot
ALTER TABLE public.order_items ADD COLUMN IF NOT EXISTS modifiers_json JSONB;
ALTER TABLE public.order_items ADD COLUMN IF NOT EXISTS base_price NUMERIC;
ALTER TABLE public.order_items ADD COLUMN IF NOT EXISTS base_hpp NUMERIC;
ALTER TABLE public.order_items ADD COLUMN IF NOT EXISTS total_hpp NUMERIC; -- Total HPP including modifiers

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.modifier_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modifiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_item_modifier_groups ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS Policies

-- Policy for modifier_groups
CREATE POLICY "Users can view modifier groups for their restaurants"
ON public.modifier_groups
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.restaurants r
        WHERE r.id = modifier_groups.restaurant_id
        AND r.owner_id = auth.uid()
    )
);

CREATE POLICY "Users can insert modifier groups for their restaurants"
ON public.modifier_groups
FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.restaurants r
        WHERE r.id = modifier_groups.restaurant_id
        AND r.owner_id = auth.uid()
    )
);

CREATE POLICY "Users can update modifier groups for their restaurants"
ON public.modifier_groups
FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM public.restaurants r
        WHERE r.id = modifier_groups.restaurant_id
        AND r.owner_id = auth.uid()
    )
);

CREATE POLICY "Users can delete modifier groups for their restaurants"
ON public.modifier_groups
FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM public.restaurants r
        WHERE r.id = modifier_groups.restaurant_id
        AND r.owner_id = auth.uid()
    )
);

-- Policy for modifiers
CREATE POLICY "Users can view modifiers for their restaurant's groups"
ON public.modifiers
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.modifier_groups mg
        JOIN public.restaurants r ON r.id = mg.restaurant_id
        WHERE mg.id = modifiers.group_id
        AND r.owner_id = auth.uid()
    )
);

CREATE POLICY "Users can insert modifiers for their restaurant's groups"
ON public.modifiers
FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.modifier_groups mg
        JOIN public.restaurants r ON r.id = mg.restaurant_id
        WHERE mg.id = modifiers.group_id
        AND r.owner_id = auth.uid()
    )
);

CREATE POLICY "Users can update modifiers for their restaurant's groups"
ON public.modifiers
FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM public.modifier_groups mg
        JOIN public.restaurants r ON r.id = mg.restaurant_id
        WHERE mg.id = modifiers.group_id
        AND r.owner_id = auth.uid()
    )
);

CREATE POLICY "Users can delete modifiers for their restaurant's groups"
ON public.modifiers
FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM public.modifier_groups mg
        JOIN public.restaurants r ON r.id = mg.restaurant_id
        WHERE mg.id = modifiers.group_id
        AND r.owner_id = auth.uid()
    )
);

-- Policy for menu_item_modifier_groups
CREATE POLICY "Users can view menu item modifier group mappings"
ON public.menu_item_modifier_groups
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.menu_items mi
        JOIN public.restaurants r ON r.id = mi.restaurant_id
        WHERE mi.id = menu_item_modifier_groups.menu_item_id
        AND r.owner_id = auth.uid()
    )
);

CREATE POLICY "Users can manage menu item modifier group mappings"
ON public.menu_item_modifier_groups
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.menu_items mi
        JOIN public.restaurants r ON r.id = mi.restaurant_id
        WHERE mi.id = menu_item_modifier_groups.menu_item_id
        AND r.owner_id = auth.uid()
    )
);

-- 7. Add Public Access for Customer Order App (SELECT ONLY)
CREATE POLICY "Public can view modifier groups"
ON public.modifier_groups
FOR SELECT
USING (true);

CREATE POLICY "Public can view modifiers"
ON public.modifiers
FOR SELECT
USING (true);

CREATE POLICY "Public can view menu item modifier groups"
ON public.menu_item_modifier_groups
FOR SELECT
USING (true);

-- 8. Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_modifier_groups_updated_at
    BEFORE UPDATE ON public.modifier_groups
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_modifiers_updated_at
    BEFORE UPDATE ON public.modifiers
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
