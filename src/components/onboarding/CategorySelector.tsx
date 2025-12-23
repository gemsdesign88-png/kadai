'use client';

import { useLanguage } from '@/lib/i18n/context';

interface CategorySelectorProps {
  businessType: 'toko' | 'resto';
  businessName: string;
  onSelect: (categoryId: string) => void;
  selected: string | null;
}

const categories = {
  toko: [
    { id: 'warung', name: 'Warung', icon: '🍜', description: 'Traditional food stall' },
    { id: 'kios', name: 'Kios', icon: '🏪', description: 'Small retail shop' },
    { id: 'retail', name: 'Retail', icon: '🛍️', description: 'General retail store' },
    { id: 'fashion', name: 'Fashion', icon: '👕', description: 'Clothing & accessories' },
    { id: 'salon', name: 'Salon', icon: '💇', description: 'Beauty & grooming' },
    { id: 'other_toko', name: 'Other', icon: '✨', description: 'Other business type' },
  ],
  resto: [
    { id: 'cafe', name: 'Café', icon: '☕', description: 'Coffee shop & light meals' },
    { id: 'restaurant', name: 'Restaurant', icon: '🍽️', description: 'Full-service dining' },
    { id: 'fine_dining', name: 'Fine Dining', icon: '⭐', description: 'Premium dining experience' },
    { id: 'catering', name: 'Catering', icon: '🏢', description: 'Event & corporate catering' },
    { id: 'bakery', name: 'Bakery', icon: '🥐', description: 'Bakery & pastry shop' },
    { id: 'food_court', name: 'Food Court', icon: '🍱', description: 'Multi-vendor food court' },
    { id: 'other_resto', name: 'Other', icon: '✨', description: 'Other food business' },
  ],
};

export default function CategorySelector({ businessType, businessName, onSelect, selected }: CategorySelectorProps) {
  const { language, t } = useLanguage();
  const availableCategories = categories[businessType];

  return (
    <div className="p-8 sm:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Selected Info Summary */}
        <div className="mb-8 grid md:grid-cols-2 gap-4">
          {/* Business Name Card */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 text-xl">
                🏢
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{t.register.category.businessName}</p>
                <p className="text-base font-bold text-gray-900 truncate">{businessName}</p>
              </div>
            </div>
          </div>

          {/* Business Type Card */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xl ${
                businessType === 'toko'
                  ? 'bg-gradient-to-r from-green-500 to-green-600'
                  : 'bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6]'
              }`}>
                {businessType === 'toko' ? '🏪' : '🍽️'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{t.register.category.businessType}</p>
                <p className="text-base font-bold text-gray-900 capitalize">
                  {businessType === 'toko' ? t.register.businessType.types.toko.name : t.register.businessType.types.resto.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {t.register.category.title}
          </h2>
          <p className="text-lg text-gray-600">
            {t.register.category.subtitle}
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableCategories.map((category) => {
            const categoryTrans = t.register.category.categories[category.id as keyof typeof t.register.category.categories];
            return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className={`group relative p-6 rounded-2xl border-2 transition-all duration-200 text-left hover:shadow-lg hover:-translate-y-1 ${
                selected === category.id
                  ? 'border-[#FF5A5F] bg-gradient-to-br from-red-50 to-purple-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              {/* Gradient Overlay */}
              {selected === category.id && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
              )}

              <div className="relative">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform duration-200 ${
                  selected === category.id
                    ? 'bg-gradient-to-br from-[#FF5A5F] to-[#8B5CF6] shadow-lg scale-110'
                    : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  {category.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-1">{categoryTrans.name}</h3>
                <p className="text-sm text-gray-600">{categoryTrans.description}</p>

                {/* Selected Indicator */}
                {selected === category.id && (
                  <div className="absolute top-6 right-6 w-6 h-6 rounded-full bg-gradient-to-br from-[#FF5A5F] to-[#8B5CF6] flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}

                {/* Hover Arrow */}
                <div className={`mt-4 flex items-center space-x-1 text-sm font-medium transition-opacity ${
                  selected === category.id ? 'text-[#FF5A5F] opacity-100' : 'text-gray-400 opacity-0 group-hover:opacity-100'
                }`}>
                  <span>{t.register.category.select}</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
            );
          })}
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {t.register.category.helpText}
          </p>
        </div>
      </div>
    </div>
  );
}
