'use client';

import { useEffect } from 'react';

interface Submission {
  id: string;
}

interface PaymentClientProps {
  submission: Submission;
}

export default function PaymentClient({ submission }: PaymentClientProps) {
  // Langsung redirect: coba app dulu, fallback ke app.kadai.id
  useEffect(() => {
    const deepLink = `kadai://payment/${submission.id}`;
    
    // Try to open app
    window.location.href = deepLink;
    
    // Fallback: redirect to web app after 1.5 seconds
    const fallbackTimer = setTimeout(() => {
      window.location.href = `https://app.kadai.id/payment/${submission.id}`;
    }, 1500);
    
    return () => clearTimeout(fallbackTimer);
  }, [submission.id]);
  
  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-4">
          <div className="w-16 h-16 mx-auto border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600 font-medium">Membuka halaman pembayaran...</p>
      </div>
    </div>
  );
}
