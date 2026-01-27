'use client';

import React from 'react';
import { MobileScreenContainer } from '../../MobileDeviceFrame';
import { mobileDesignTokens, getMobileCardClasses } from '@/lib/design-tokens';
import { Users, Clock } from 'lucide-react';

interface Table {
  id: number;
  number: number;
  status: 'available' | 'occupied' | 'reserved';
  guests?: number;
  total?: string;
  time?: string;
}

/**
 * TableManagementScreen - Recreates resto table management UI
 * Pixel-perfect replica of mobile app table view
 */
export function TableManagementScreen() {
  const tables: Table[] = [
    { id: 1, number: 1, status: 'available', guests: 0 },
    { id: 2, number: 2, status: 'occupied', guests: 4, total: 'Rp 250.000' },
    { id: 3, number: 3, status: 'reserved', guests: 2, time: '19:00' },
    { id: 4, number: 4, status: 'available', guests: 0 },
    { id: 5, number: 5, status: 'occupied', guests: 2, total: 'Rp 125.000' },
    { id: 6, number: 6, status: 'available', guests: 0 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return {
          bg: 'bg-white',
          border: 'border-gray-200',
          text: 'text-gray-900',
          badge: 'bg-green-100 text-green-700',
        };
      case 'occupied':
        return {
          bg: 'bg-black',
          border: 'border-black',
          text: 'text-white',
          badge: 'bg-white text-black',
        };
      case 'reserved':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-900',
          badge: 'bg-blue-200 text-blue-700',
        };
      default:
        return {
          bg: 'bg-white',
          border: 'border-gray-200',
          text: 'text-gray-900',
          badge: 'bg-gray-100 text-gray-700',
        };
    }
  };

  return (
    <MobileScreenContainer>
      <div className="min-h-screen p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 
            className="text-2xl font-bold mb-2"
            style={{ color: mobileDesignTokens.colors.text.primary }}
          >
            Table Management
          </h1>
          <p style={{ color: mobileDesignTokens.colors.text.secondary }}>
            Tap a table to manage orders
          </p>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 text-center border-2 border-gray-200">
            <div className="text-2xl font-bold text-green-600">4</div>
            <div className="text-xs text-gray-600 font-medium">Available</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center border-2 border-gray-200">
            <div className="text-2xl font-bold text-gray-900">2</div>
            <div className="text-xs text-gray-600 font-medium">Occupied</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center border-2 border-gray-200">
            <div className="text-2xl font-bold text-blue-600">1</div>
            <div className="text-xs text-gray-600 font-medium">Reserved</div>
          </div>
        </div>

        {/* Table Grid */}
        <div className="grid grid-cols-2 gap-4">
          {tables.map((table) => {
            const colors = getStatusColor(table.status);
            return (
              <div
                key={table.id}
                className={`
                  relative p-6 rounded-2xl border-2 
                  ${colors.bg} ${colors.border} ${colors.text}
                  hover:shadow-lg transition-all duration-150 cursor-pointer
                  active:scale-95
                `}
                style={{ boxShadow: mobileDesignTokens.shadows.md.boxShadow }}
              >
                {/* Table Number */}
                <div className="text-center mb-3">
                  <div className="text-4xl font-bold">
                    {table.number}
                  </div>
                </div>

                {/* Status Badge */}
                <div
                  className={`
                    text-xs font-bold px-2 py-1 rounded-full text-center mb-2
                    ${colors.badge}
                  `}
                >
                  {table.status.toUpperCase()}
                </div>

                {/* Details for Occupied */}
                {table.status === 'occupied' && (
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>Guests:</span>
                      </div>
                      <span className="font-bold">{table.guests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total:</span>
                      <span className="font-bold">{table.total}</span>
                    </div>
                  </div>
                )}

                {/* Details for Reserved */}
                {table.status === 'reserved' && (
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>Guests:</span>
                      </div>
                      <span className="font-bold">{table.guests}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>Time:</span>
                      </div>
                      <span className="font-bold">{table.time}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </MobileScreenContainer>
  );
}
