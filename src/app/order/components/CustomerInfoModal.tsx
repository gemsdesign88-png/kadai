'use client';

import { useEffect, useRef, memo } from 'react';

interface CustomerInfoModalProps {
  isOpen: boolean;
  onConfirm: (name: string, phone: string) => void;
  primaryColor?: string;
}

const CustomerInfoModal = memo(function CustomerInfoModal({
  isOpen,
  onConfirm,
  primaryColor = '#FF5A5F',
}: CustomerInfoModalProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        nameRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const name = nameRef.current?.value.trim() || '';
    const phone = phoneRef.current?.value.trim() || '';
    
    if (!name) {
      alert('Nama tidak boleh kosong');
      nameRef.current?.focus();
      return;
    }
    
    onConfirm(name, phone);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      style={{ pointerEvents: 'auto' }}
    >
      <div 
        className="bg-white rounded-2xl p-6 w-full max-w-md"
        style={{ pointerEvents: 'auto' }}
      >
        <h2 className="text-xl font-bold text-gray-900 mb-5">Informasi Anda</h2>

        <label className="block text-xs font-semibold text-gray-600 mb-2">
          Nama *
        </label>
        <input
          ref={nameRef}
          type="text"
          autoComplete="off"
          inputMode="text"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:ring-2"
          style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
          placeholder="Masukkan nama"
          defaultValue=""
        />

        <label className="block text-xs font-semibold text-gray-600 mb-2">
          Nomor Telepon (Opsional)
        </label>
        <input
          ref={phoneRef}
          type="tel"
          autoComplete="off"
          inputMode="tel"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:ring-2"
          style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
          placeholder="Masukkan nomor telepon"
          defaultValue=""
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full text-white py-3.5 rounded-xl font-bold transition-opacity hover:opacity-90"
          style={{ backgroundColor: primaryColor }}
        >
          Lanjutkan
        </button>
      </div>
    </div>
  );
});

export default CustomerInfoModal;
