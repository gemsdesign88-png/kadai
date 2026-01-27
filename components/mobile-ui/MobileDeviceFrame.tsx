import React from 'react';

interface MobileDeviceFrameProps {
  children: React.ReactNode;
  device?: 'iphone' | 'android';
  showStatusBar?: boolean;
  className?: string;
}

/**
 * MobileDeviceFrame - Creates a realistic phone frame for showcasing mobile UI
 * Matches the actual device dimensions and styling
 */
export function MobileDeviceFrame({ 
  children, 
  device = 'iphone',
  showStatusBar = true,
  className = ''
}: MobileDeviceFrameProps) {
  return (
    <div className={`relative mx-auto ${className}`} style={{ maxWidth: '390px' }}>
      {/* Device outer frame (bezel) */}
      <div className="
        relative overflow-hidden
        bg-black rounded-[3rem] p-3
        shadow-2xl
      ">
        {/* Screen */}
        <div 
          className="
            relative overflow-hidden
            bg-[#F8FAFC] rounded-[2.5rem]
          "
          style={{ aspectRatio: '9/19.5' }}
        >
          {/* Status Bar */}
          {showStatusBar && (
            <div className="
              sticky top-0 z-50
              h-12 bg-white border-b border-gray-200 
              flex items-center justify-between px-6
            ">
              {/* Time */}
              <span className="text-sm font-semibold text-black">9:41</span>
              
              {/* Status icons */}
              <div className="flex items-center gap-1">
                {/* Signal */}
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                  <rect width="3" height="12" rx="1" fill="currentColor" />
                  <rect x="5" width="3" height="9" rx="1" fill="currentColor" />
                  <rect x="10" width="3" height="6" rx="1" fill="currentColor" />
                  <rect x="15" width="3" height="3" rx="1" fill="currentColor" opacity="0.4" />
                </svg>
                
                {/* WiFi */}
                <svg width="17" height="12" viewBox="0 0 17 12" fill="none" className="ml-1">
                  <path d="M8.5 3.5C10.433 3.5 12.213 4.213 13.607 5.393L14.5 4.5C12.82 2.82 10.548 2 8.5 2C6.452 2 4.18 2.82 2.5 4.5L3.393 5.393C4.787 4.213 6.567 3.5 8.5 3.5Z" fill="currentColor" />
                  <path d="M8.5 7C9.433 7 10.287 7.373 10.95 7.95L12 6.9C11.02 5.92 9.76 5.5 8.5 5.5C7.24 5.5 5.98 5.92 5 6.9L6.05 7.95C6.713 7.373 7.567 7 8.5 7Z" fill="currentColor" />
                  <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
                </svg>
                
                {/* Battery */}
                <svg width="27" height="13" viewBox="0 0 27 13" fill="none" className="ml-1">
                  <rect x="0.5" y="0.5" width="22" height="12" rx="2.5" stroke="currentColor" strokeOpacity="0.35" />
                  <path d="M23 4V9C24.6569 9 26 7.65685 26 6C26 4.34315 24.6569 3 23 3V4Z" fill="currentColor" fillOpacity="0.4" />
                  <rect x="2" y="2" width="18" height="9" rx="1" fill="currentColor" />
                </svg>
              </div>
            </div>
          )}
          
          {/* Content Area */}
          <div className="h-full overflow-y-auto overscroll-contain">
            {children}
          </div>
        </div>
      </div>
      
      {/* Device label (optional) */}
      <div className="text-center mt-4 text-sm text-gray-500">
        {device === 'iphone' ? 'iPhone 15 Pro' : 'Android Device'}
      </div>
    </div>
  );
}

/**
 * MobileScreenContainer - Wrapper for mobile screen content
 * Provides consistent padding and background
 */
export function MobileScreenContainer({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={`min-h-full bg-[#F8FAFC] ${className}`}>
      {children}
    </div>
  );
}
