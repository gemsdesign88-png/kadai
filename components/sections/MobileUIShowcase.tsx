'use client';

import React from 'react';
import { MobileDeviceFrame } from '../MobileDeviceFrame';
import { Check } from 'lucide-react';

interface MobileUIShowcaseProps {
  title: string;
  description: string;
  screen: React.ReactNode;
  features: string[];
  reverse?: boolean;
}

/**
 * MobileUIShowcase - Displays recreated mobile UI with feature descriptions
 * Used in business-type pages to showcase actual app interface
 */
export function MobileUIShowcase({ 
  title, 
  description, 
  screen, 
  features,
  reverse = false 
}: MobileUIShowcaseProps) {
  return (
    <div className={`
      grid lg:grid-cols-2 gap-12 items-center py-20
      ${reverse ? 'lg:grid-flow-dense' : ''}
    `}>
      {/* Mobile Preview */}
      <div className={`
        ${reverse ? 'lg:col-start-2' : 'lg:col-start-1'}
        flex justify-center
      `}>
        <MobileDeviceFrame showStatusBar>
          {screen}
        </MobileDeviceFrame>
      </div>
      
      {/* Feature Description */}
      <div className={`
        ${reverse ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-2'}
        space-y-6
      `}>
        <div>
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            {title}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>
        
        <ul className="space-y-4">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                <Check size={16} className="text-white" strokeWidth={3} />
              </div>
              <span className="text-lg text-gray-700 leading-relaxed">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * MobileUIShowcaseSection - Container for multiple showcases
 */
export function MobileUIShowcaseSection({ 
  children, 
  title,
  subtitle 
}: { 
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {title && (
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-gray-900">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className="space-y-20">
          {children}
        </div>
      </div>
    </section>
  );
}
