'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Palette, Check } from 'lucide-react';

interface ThemeColorPickerProps {
  restaurantId: string;
  currentColor?: string;
  onColorChange?: (color: string) => void;
}

const PRESET_COLORS = [
  { name: 'Coral Red', color: '#FF5A5F' },
  { name: 'Ocean Blue', color: '#1E88E5' },
  { name: 'Forest Green', color: '#43A047' },
  { name: 'Sunset Orange', color: '#FF6F00' },
  { name: 'Royal Purple', color: '#7B1FA2' },
  { name: 'Rose Pink', color: '#E91E63' },
  { name: 'Teal', color: '#00897B' },
  { name: 'Amber', color: '#FFB300' },
  { name: 'Deep Orange', color: '#F4511E' },
  { name: 'Indigo', color: '#3949AB' },
  { name: 'Lime', color: '#C0CA33' },
  { name: 'Cyan', color: '#00ACC1' },
];

export function ThemeColorPicker({ restaurantId, currentColor = '#FF5A5F', onColorChange }: ThemeColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState(currentColor);
  const [saving, setSaving] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = async (color: string) => {
    setSelectedColor(color);
    setSaving(true);

    try {
      const supabase = createClient();
      
      // Update restaurant's primary color
      const { error } = await supabase
        .from('restaurants')
        .update({ primary_color: color })
        .eq('id', restaurantId);

      if (error) {
        console.error('Error updating theme color:', error);
        return;
      }

      // Update CSS variables immediately
      document.documentElement.style.setProperty('--color-accent', color);
      
      // Notify parent component
      onColorChange?.(color);

      // Dispatch event to update other components
      window.dispatchEvent(new Event('restaurantChanged'));
    } catch (error) {
      console.error('Error saving theme color:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
        title="Change theme color"
      >
        <Palette className="w-4 h-4 text-gray-600" />
        <div 
          className="w-6 h-6 rounded border-2 border-white shadow-sm"
          style={{ backgroundColor: selectedColor }}
        />
        <span className="text-sm text-gray-700">Theme Color</span>
      </button>

      {showPicker && (
        <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50 w-80">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-1">Choose Brand Color</h3>
            <p className="text-xs text-gray-500">Select a color that matches your brand</p>
          </div>

          <div className="grid grid-cols-6 gap-2 mb-4">
            {PRESET_COLORS.map((preset) => (
              <button
                key={preset.color}
                onClick={() => handleColorChange(preset.color)}
                className="relative w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-all hover:scale-110"
                style={{ backgroundColor: preset.color }}
                title={preset.name}
                disabled={saving}
              >
                {selectedColor === preset.color && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-3">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Custom Color (Hex)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                placeholder="#FF5A5F"
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                pattern="^#[0-9A-Fa-f]{6}$"
              />
              <button
                onClick={() => handleColorChange(selectedColor)}
                disabled={saving || !/^#[0-9A-Fa-f]{6}$/.test(selectedColor)}
                className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? 'Saving...' : 'Apply'}
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowPicker(false)}
            className="mt-3 w-full text-center text-xs text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
