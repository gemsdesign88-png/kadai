import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/svg+xml'
 
export default function Icon() {
  return new ImageResponse(
    (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="6" fill="#FF5A5F" />
        <path
          d="M16 8L21.5 13.5L16 19L10.5 13.5L16 8Z"
          fill="white"
        />
        <rect x="10" y="19" width="12" height="5" rx="1" fill="white" />
      </svg>
    ),
    {
      ...size,
    }
  )
}
