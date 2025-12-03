# Dynamic Theme System

## Overview
The web dashboard now uses a dynamic theme system that automatically syncs with the mobile app's theme colors.

## How It Works

### 1. Theme Provider (`/src/contexts/ThemeContext.tsx`)
- Loads the user's selected primary color from the database on app startup
- Updates CSS variables dynamically based on the selected color
- Listens for restaurant changes and updates theme accordingly

### 2. Color Sources (Priority Order)
1. **Restaurant's Primary Color** - From `restaurants.primary_color` column (highest priority)
2. **User Profile Color** - From `user_profiles.primary_color` column (if restaurant color not available)
3. **Default Color** - Falls back to `#FF5A5F` (red/coral)

### 3. CSS Variables
The theme system dynamically updates these CSS variables:
- `--color-accent` - Primary brand color
- `--color-accent-hover` - Slightly darker version for hover states
- `--color-accent-light` - Very light version for backgrounds

### 4. Integration Points

#### Web Dashboard
- Wrapped in `ThemeProvider` at root level (`/src/app/layout.tsx`)
- All components use `var(--color-accent)` for consistent theming
- Automatically updates when restaurant selection changes

#### Mobile App
- Uses `ThemeContext` from `/mobile-app/contexts/ThemeContext.tsx`
- Stores color in both AsyncStorage and `user_profiles` table
- Default color: `#FF5A5F`

### 5. Restaurant Selection Sync
When a user changes restaurants in the analytics page:
1. Analytics page saves selection to localStorage
2. Dispatches `restaurantChanged` event
3. ThemeProvider listens for this event
4. Fetches new restaurant's primary color
5. Updates CSS variables dynamically
6. All UI elements update automatically

## Database Schema

### Required Columns

#### restaurants table
```sql
primary_color VARCHAR(7) -- Hex color code (e.g., '#FF5A5F')
```

#### user_profiles table (optional)
```sql
primary_color VARCHAR(7) -- Hex color code (e.g., '#FF5A5F')
```

## Usage

### For Developers
Components automatically use the theme color through CSS variables:
```tsx
<div className="bg-[var(--color-accent)]">
  This will use the current theme color
</div>
```

### For Users
1. In the mobile app, go to Theme Settings
2. Select your preferred brand color
3. The web dashboard will automatically use this color
4. When switching restaurants, the dashboard uses that restaurant's color

## Testing

To test the dynamic theme system:
1. Log in to the dashboard
2. Go to Analytics page
3. Switch between different restaurants
4. Verify that the accent color changes based on each restaurant's primary_color
5. Check that all interactive elements (buttons, badges, highlights) update

## Migration Notes

If you need to add the `primary_color` column to existing tables:

```sql
-- Add to restaurants table
ALTER TABLE restaurants ADD COLUMN primary_color VARCHAR(7);

-- Add to user_profiles table (optional)
ALTER TABLE user_profiles ADD COLUMN primary_color VARCHAR(7);
```

## Troubleshooting

### Colors not changing?
1. Check browser console for errors
2. Verify `restaurants.primary_color` column exists
3. Ensure restaurant has a valid hex color code set
4. Clear browser cache and reload

### Default color always showing?
1. Check if selected restaurant has `primary_color` set in database
2. Verify localStorage has `selected_restaurant_id`
3. Check network tab for Supabase queries
