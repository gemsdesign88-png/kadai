'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';

interface ThemeContextType {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const DEFAULT_PRIMARY_COLOR = '#FF5A5F';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [primaryColor, setPrimaryColorState] = useState<string>(DEFAULT_PRIMARY_COLOR);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadThemeColor();

    // Listen for restaurant changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'selected_restaurant_id') {
        loadThemeColor();
      }
    };

    // Listen for custom event when restaurant is changed in same tab
    const handleRestaurantChange = () => {
      loadThemeColor();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('restaurantChanged', handleRestaurantChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('restaurantChanged', handleRestaurantChange);
    };
  }, []);

  const loadThemeColor = async () => {
    try {
      const supabase = createClient();
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsLoading(false);
        return;
      }

      // First, try to get from selected restaurant (most reliable source)
      const selectedRestaurantId = localStorage.getItem('selected_restaurant_id');
      if (selectedRestaurantId) {
        const { data: restaurant, error: restaurantError } = await supabase
          .from('restaurants')
          .select('primary_color')
          .eq('id', selectedRestaurantId)
          .maybeSingle();

        if (!restaurantError && restaurant?.primary_color) {
          setPrimaryColorState(restaurant.primary_color);
          updateCSSVariables(restaurant.primary_color);
          setIsLoading(false);
          return;
        }
      }

      // Try to get primary color from user_profiles (if column exists)
      try {
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('primary_color')
          .eq('id', user.id)
          .maybeSingle();

        if (!profileError && profile?.primary_color) {
          setPrimaryColorState(profile.primary_color);
          updateCSSVariables(profile.primary_color);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        // Column might not exist, continue with default
        console.log('primary_color column not found in user_profiles, using default');
      }

      // Use default color
      updateCSSVariables(DEFAULT_PRIMARY_COLOR);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading theme color:', error);
      updateCSSVariables(DEFAULT_PRIMARY_COLOR);
      setIsLoading(false);
    }
  };

  const updateCSSVariables = (color: string) => {
    // Update CSS variables dynamically
    document.documentElement.style.setProperty('--color-accent', color);
    
    // Generate hover color (slightly darker)
    const hoverColor = adjustColorBrightness(color, -10);
    document.documentElement.style.setProperty('--color-accent-hover', hoverColor);
    
    // Generate light color (very light version)
    const lightColor = adjustColorBrightness(color, 40);
    document.documentElement.style.setProperty('--color-accent-light', lightColor);
  };

  const setPrimaryColor = async (color: string) => {
    try {
      setPrimaryColorState(color);
      updateCSSVariables(color);

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Save to user_profiles
        await supabase
          .from('user_profiles')
          .upsert({
            id: user.id,
            primary_color: color,
          });
      }
    } catch (error) {
      console.error('Error saving primary color:', error);
    }
  };

  const value: ThemeContextType = {
    primaryColor,
    setPrimaryColor,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Helper function to adjust color brightness
function adjustColorBrightness(color: string, percent: number): string {
  // Remove # if present
  let hex = color.replace('#', '');
  
  // Convert to RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Adjust brightness
  r = Math.min(255, Math.max(0, r + (r * percent) / 100));
  g = Math.min(255, Math.max(0, g + (g * percent) / 100));
  b = Math.min(255, Math.max(0, b + (b * percent) / 100));

  // Convert back to hex
  const rr = Math.round(r).toString(16).padStart(2, '0');
  const gg = Math.round(g).toString(16).padStart(2, '0');
  const bb = Math.round(b).toString(16).padStart(2, '0');

  return `#${rr}${gg}${bb}`;
}
