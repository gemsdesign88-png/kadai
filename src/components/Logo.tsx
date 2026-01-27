import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

/**
 * Logo - Web version of mobile app logo
 * Converted from React Native SVG to web SVG
 */
export default function Logo({ 
  width = 32, 
  height = 32, 
  color = '#FF5A5F',
  className = ''
}: LogoProps) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 60 60" 
      fill="none"
      className={className}
    >
      <path
        d="M35.8292 17.2939C38.4963 16.5793 41.2383 18.1621 41.9532 20.8291L49.7178 49.8076C50.4324 52.4748 48.8497 55.2158 46.1827 55.9307C43.5153 56.6454 40.7734 55.0628 40.0587 52.3955L32.294 23.418C31.5793 20.7508 33.1621 18.0088 35.8292 17.2939ZM17.127 20.3115C17.8419 17.6446 20.583 16.062 23.2501 16.7764C25.9174 17.4911 27.5009 20.2331 26.7862 22.9004L19.0215 51.8779C18.3068 54.5452 15.5648 56.1278 12.8975 55.4131C10.2305 54.6983 8.64788 51.9572 9.36237 49.29L17.127 20.3115ZM45.0001 4C47.7615 4.00003 50.0001 6.2386 50.0001 9C50.0001 11.7614 47.7615 14 45.0001 14H15.0001C12.2386 14 10.0001 11.7614 10.0001 9C10.0001 6.23858 12.2386 4 15.0001 4H45.0001Z"
        fill={color}
      />
    </svg>
  );
}
