/**
 * Warehouse Subscription Selection Screen
 * NO TRIAL - Payment required before warehouse activation
 * Shows pricing tiers and enforces payment before enabling warehouse
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface WarehousePlan {
  id: string;
  name: string;
  icon: string;
  price_idr: number;
  price_display: string;
  period: 'monthly' | 'yearly';
  duration_months: number;
  color: string;
  features: string[];
  metadata: {
    max_warehouses: number;
    max_regional_warehouses: number;
    max_hub_stores: number;
    max_total_stores: number;
    max_warehouse_staff: number;
    no_trial: boolean;
    payment_required: boolean;
  };
}

export default function WarehouseSubscriptionSelectScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { language } = useLanguage();
  
  const [plans, setPlans] = useState<WarehousePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [processingPayment, setProcessingPayment] = useState(false);

  const t = {
    id: {
      title: 'Pilih Paket Warehouse',
      subtitle: 'Kelola distribusi multi-toko dengan sistem warehouse',
      monthly: 'Bulanan',
      yearly: 'Tahunan',
      saveText: 'Hemat ~10%',
      capacity: 'KAPASITAS:',
      regionalWarehouses: 'Regional Warehouse',
      hubStores: 'Hub Store',
      totalStores: 'Total Store',
      warehouseStaff: 'Staff Warehouse',
      unlimited: 'Unlimited',
      noTrial: 'Tidak ada masa trial - Pembayaran diperlukan untuk aktivasi',
      selectPay: 'Pilih & Bayar Sekarang',
      processing: 'Memproses...',
      confirmTitle: 'Konfirmasi Pembayaran',
      confirmMessage: (name: string, period: string, price: string) => 
        `Anda akan berlangganan ${name} (${period === 'monthly' ? 'Bulanan' : 'Tahunan'}) dengan harga ${price}.\n\n⚠️ Warehouse tidak memiliki masa trial. Pembayaran diperlukan untuk aktivasi.`,
      cancel: 'Batal',
      continuePay: 'Lanjut Bayar',
      whyWarehouse: 'Mengapa Warehouse?',
      benefit1: 'Kelola stok terpusat untuk semua cabang',
      benefit2: 'Tracking transfer stok antar lokasi',
      benefit3: 'Sistem Hub-Satellite untuk distribusi efisien',
      benefit4: 'Otomatis request stok dari cabang ke warehouse',
      errorLoading: 'Gagal memuat paket warehouse',
      errorPayment: 'Gagal memproses pembayaran',
      loadingText: 'Memuat paket warehouse...',
      mostPopular: '⭐ PALING POPULER',
    },
    en: {
      title: 'Choose Warehouse Plan',
      subtitle: 'Manage multi-store distribution with warehouse system',
      monthly: 'Monthly',
      yearly: 'Yearly',
      saveText: 'Save ~10%',
      capacity: 'CAPACITY:',
      regionalWarehouses: 'Regional Warehouse',
      hubStores: 'Hub Stores',
      totalStores: 'Total Stores',
      warehouseStaff: 'Warehouse Staff',
      unlimited: 'Unlimited',
      noTrial: 'No trial period - Payment required for activation',
      selectPay: 'Select & Pay Now',
      processing: 'Processing...',
      confirmTitle: 'Payment Confirmation',
      confirmMessage: (name: string, period: string, price: string) => 
        `You will subscribe to ${name} (${period === 'monthly' ? 'Monthly' : 'Yearly'}) at ${price}.\n\n⚠️ Warehouse has no trial period. Payment required for activation.`,
      cancel: 'Cancel',
      continuePay: 'Continue to Pay',
      whyWarehouse: 'Why Warehouse?',
      benefit1: 'Centralized stock management for all branches',
      benefit2: 'Track stock transfers between locations',
      benefit3: 'Hub-Satellite system for efficient distribution',
      benefit4: 'Automatic stock requests from branches to warehouse',
      errorLoading: 'Failed to load warehouse plans',
      errorPayment: 'Failed to process payment',
      loadingText: 'Loading warehouse plans...',
      mostPopular: '⭐ MOST POPULAR',
    }
  };

  const translations = language === 'id' ? t.id : t.en;

  useEffect(() => {
    loadWarehousePlans();
  }, []);

  const loadWarehousePlans = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('plan_tier', 'warehouse')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      setPlans(data || []);
    } catch (error) {
      console.error('Error loading warehouse plans:', error);
      Alert.alert('Error', translations.errorLoading);
    } finally {
      setLoading(false);
    }
  };

  const filteredPlans = plans.filter(p => p.period === selectedPeriod);

  // Group by tier name
  const tierPlans = {
    starter: filteredPlans.find(p => p.name.includes('Starter')),
    growth: filteredPlans.find(p => p.name.includes('Growth')),
    pro: filteredPlans.find(p => p.name.includes('Pro')),
  };

  const handleSelectPlan = async (plan: WarehousePlan) => {
    const periodText = selectedPeriod === 'monthly' ? translations.monthly : translations.yearly;
    Alert.alert(
      translations.confirmTitle,
      translations.confirmMessage(plan.name, selectedPeriod, plan.price_display),
      [
        { text: translations.cancel, style: 'cancel' },
        {
          text: translations.continuePay,
          onPress: () => processPayment(plan),
        },
      ]
    );
  };

  const processPayment = async (plan: WarehousePlan) => {
    setProcessingPayment(true);
    
    try {
      // TODO: Integrate with payment gateway (Midtrans, Xendit, etc.)
      // For now, redirect to payment flow
      
      router.push({
        pathname: '/payment/warehouse-checkout',
        params: {
          planId: plan.id,
          planName: plan.name,
          price: plan.price_idr,
          period: plan.period,
        },
      });
    } catch (error) {
      console.error('Error processing payment:', error);
      Alert.alert('Error', translations.errorPayment);
    } finally {
      setProcessingPayment(false);
    }
  };

  const renderPlanCard = (plan: WarehousePlan | undefined, tier: 'starter' | 'growth' | 'pro') => {
    if (!plan) return null;

    const isPopular = tier === 'growth';
    const capacity = plan.metadata.max_total_stores === -1 
      ? translations.unlimited
      : `${plan.metadata.max_total_stores} ${translations.totalStores}`;

    return (
      <View key={plan.id} className="mb-4">
        {isPopular && (
          <View className="bg-purple-500 py-2 px-4 rounded-t-xl items-center">
            <Text className="text-white font-semibold">{translations.mostPopular}</Text>
          </View>
        )}
        
        <View 
          className={`bg-white border-2 p-6 ${isPopular ? 'rounded-b-xl border-purple-500' : 'rounded-xl border-gray-200'}`}
          style={{ borderColor: isPopular ? plan.color : '#E5E7EB' }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-2xl mb-1">{plan.icon}</Text>
              <Text className="text-xl font-bold text-gray-800">{plan.name}</Text>
              <Text className="text-sm text-gray-500">{capacity}</Text>
            </View>
            <View className="items-end">
              <Text className="text-3xl font-bold" style={{ color: plan.color }}>
                {plan.price_display.split('/')[0]}
              </Text>
              <Text className="text-sm text-gray-500">
                /{selectedPeriod === 'monthly' ? translations.monthly.toLowerCase() : translations.yearly.toLowerCase()}
              </Text>
            </View>
          </View>

          {/* Capacity Limits */}
          <View className="bg-gray-50 p-4 rounded-lg mb-4">
            <Text className="text-xs font-semibold text-gray-600 mb-2">{translations.capacity}</Text>
            
            {plan.metadata.max_regional_warehouses > 0 && (
              <View className="flex-row items-center mb-1">
                <Ionicons name="business" size={14} color="#6B7280" />
                <Text className="text-sm text-gray-700 ml-2">
                  {plan.metadata.max_regional_warehouses === -1 ? translations.unlimited : plan.metadata.max_regional_warehouses} {translations.regionalWarehouses}
                </Text>
              </View>
            )}
            
            <View className="flex-row items-center mb-1">
              <Ionicons name="storefront" size={14} color="#6B7280" />
              <Text className="text-sm text-gray-700 ml-2">
                {plan.metadata.max_hub_stores === -1 ? translations.unlimited : plan.metadata.max_hub_stores} {translations.hubStores}
              </Text>
            </View>
            
            <View className="flex-row items-center mb-1">
              <Ionicons name="apps" size={14} color="#6B7280" />
              <Text className="text-sm text-gray-700 ml-2">
                {plan.metadata.max_total_stores === -1 ? translations.unlimited : plan.metadata.max_total_stores} {translations.totalStores}
              </Text>
            </View>
            
            <View className="flex-row items-center">
              <Ionicons name="people" size={14} color="#6B7280" />
              <Text className="text-sm text-gray-700 ml-2">
                {plan.metadata.max_warehouse_staff === -1 ? translations.unlimited : plan.metadata.max_warehouse_staff} {translations.warehouseStaff}
              </Text>
            </View>
          </View>

          {/* Features */}
          <View className="mb-4">
            {plan.features.map((feature, idx) => (
              <View key={idx} className="flex-row items-start mb-2">
                <Ionicons name="checkmark-circle" size={18} color={plan.color} />
                <Text className="text-sm text-gray-700 ml-2 flex-1">{feature}</Text>
              </View>
            ))}
          </View>

          {/* No Trial Warning */}
          <View className="bg-orange-50 border border-orange-200 p-3 rounded-lg mb-4">
            <View className="flex-row items-center">
              <Ionicons name="alert-circle" size={16} color="#F97316" />
              <Text className="text-xs font-semibold text-orange-700 ml-2">
                {translations.noTrial}
              </Text>
            </View>
          </View>

          {/* Select Button */}
          <TouchableOpacity
            onPress={() => handleSelectPlan(plan)}
            disabled={processingPayment}
            className="py-4 px-6 rounded-xl items-center"
            style={{ backgroundColor: plan.color }}
          >
            <Text className="text-white font-bold text-base">
              {processingPayment ? translations.processing : translations.selectPay}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-gray-600">{translations.loadingText}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 pt-12 pb-6 border-b border-gray-200">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="mb-4"
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          {translations.title}
        </Text>
        <Text className="text-sm text-gray-600">
          {translations.subtitle}
        </Text>
      </View>

      {/* Period Toggle */}
      <View className="bg-white px-4 py-4 border-b border-gray-200">
        <View className="flex-row bg-gray-100 rounded-xl p-1">
          <TouchableOpacity
            onPress={() => setSelectedPeriod('monthly')}
            className={`flex-1 py-3 rounded-lg ${selectedPeriod === 'monthly' ? 'bg-blue-500' : ''}`}
          >
            <Text className={`text-center font-semibold ${selectedPeriod === 'monthly' ? 'text-white' : 'text-gray-600'}`}>
              {translations.monthly}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setSelectedPeriod('yearly')}
            className={`flex-1 py-3 rounded-lg ${selectedPeriod === 'yearly' ? 'bg-blue-500' : ''}`}
          >
            <View className="items-center">
              <Text className={`font-semibold ${selectedPeriod === 'yearly' ? 'text-white' : 'text-gray-600'}`}>
                {translations.yearly}
              </Text>
              <Text className={`text-xs ${selectedPeriod === 'yearly' ? 'text-blue-100' : 'text-green-600'}`}>
                {translations.saveText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {renderPlanCard(tierPlans.starter, 'starter')}
        {renderPlanCard(tierPlans.growth, 'growth')}
        {renderPlanCard(tierPlans.pro, 'pro')}

        {/* Info Section */}
        <View className="bg-blue-50 p-4 rounded-xl mt-4 mb-8">
          <View className="flex-row items-start">
            <Ionicons name="information-circle" size={20} color="#3B82F6" />
            <View className="flex-1 ml-3">
              <Text className="text-sm font-semibold text-blue-800 mb-2">
                {translations.whyWarehouse}
              </Text>
              <Text className="text-xs text-blue-700 mb-1">
                • {translations.benefit1}
              </Text>
              <Text className="text-xs text-blue-700 mb-1">
                • {translations.benefit2}
              </Text>
              <Text className="text-xs text-blue-700 mb-1">
                • {translations.benefit3}
              </Text>
              <Text className="text-xs text-blue-700">
                • {translations.benefit4}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
