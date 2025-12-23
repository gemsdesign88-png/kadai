'use client';

import { useLanguage } from '@/lib/i18n/context';

interface BusinessTypeSelectorProps {
  businessName: string;
  onSelect: (type: 'toko' | 'resto') => void;
  selected: 'toko' | 'resto' | null;
}

export default function BusinessTypeSelector({ businessName, onSelect, selected }: BusinessTypeSelectorProps) {
  const { language, t } = useLanguage();
  
  const businessTypes = [
    {
      id: 'toko' as const,
      name: t.register.businessType.types.toko.name,
      icon: '🏪',
      tagline: t.register.businessType.types.toko.tagline,
      description: t.register.businessType.types.toko.description,
      features: t.register.businessType.types.toko.features,
      idealFor: t.register.businessType.types.toko.idealFor,
      price: t.register.businessType.types.toko.price,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50',
    },
    {
      id: 'resto' as const,
      name: t.register.businessType.types.resto.name,
      icon: '🍽️',
      tagline: t.register.businessType.types.resto.tagline,
      description: t.register.businessType.types.resto.description,
      features: t.register.businessType.types.resto.features,
      idealFor: t.register.businessType.types.resto.idealFor,
      price: t.register.businessType.types.resto.price,
      gradient: 'from-[#FF5A5F] to-[#8B5CF6]',
      bgGradient: 'from-red-50 to-purple-50',
    },
  ];

  return (
    <div className="p-8 sm:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Selected Business Name */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm max-w-md mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 text-xl">
                🏢
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{t.register.businessType.businessName}</p>
                <p className="text-base font-bold text-gray-900 truncate">{businessName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {t.register.businessType.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.register.businessType.subtitle}
          </p>
        </div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {businessTypes.map((type) => {
            return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={`relative group text-left p-8 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                selected === type.id
                  ? `border-transparent bg-gradient-to-br ${type.bgGradient} shadow-xl`
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              {/* Gradient Border Effect */}
              {selected === type.id && (
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${type.gradient} opacity-10`} />
              )}

              <div className="relative">
                {/* Icon & Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${type.gradient} flex items-center justify-center text-3xl shadow-lg`}>
                    {type.icon}
                  </div>
                  {selected === type.id && (
                    <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${type.gradient} text-white text-xs font-medium shadow-md`}>
                      {t.register.businessType.selected}
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{type.name}</h3>
                <p className={`text-sm font-medium mb-3 bg-gradient-to-r ${type.gradient} bg-clip-text text-transparent`}>
                  {type.tagline}
                </p>
                <p className="text-gray-600 mb-6">{type.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {type.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                  ))}
                </ul>

                {/* Footer Info */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{t.register.businessType.idealFor}</p>
                      <p className="text-sm font-medium text-gray-700">{type.idealFor}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold bg-gradient-to-r ${type.gradient} bg-clip-text text-transparent`}>
                        {type.price}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className={`absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity ${
                  selected === type.id ? 'opacity-100' : ''
                }`}>
                  <svg className={`w-6 h-6 bg-gradient-to-r ${type.gradient} bg-clip-text text-transparent`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
            {t.register.businessType.notSure}
          </p>
        </div>
      </div>
    </div>
  );
}
