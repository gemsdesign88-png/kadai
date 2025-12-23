'use server';

import { createAdminClient } from '@/lib/supabase/server-admin';
import { createClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';

interface CreateUserInput {
  email: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
}

export async function createUserAction(input: CreateUserInput) {
  try {
    const supabaseAdmin = createAdminClient();

    console.log('[Server] Creating user with admin client:', input.email);

    // Use admin API to create user - auto-confirm email (temporary for testing)
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: input.email,
      password: input.password,
      email_confirm: true,
      user_metadata: {
        full_name: input.fullName,
        phone: input.phoneNumber,
      },
    });

    if (error) {
      console.error('[Server] Supabase signUp error:', {
        message: error.message,
        status: error.status,
        name: error.name
      });
      
      // Check for duplicate email
      if (error.message?.includes('already') || error.message?.includes('exists')) {
        return { success: false, error: 'This email is already registered. Please sign in instead.', userId: null };
      }
      
      return { success: false, error: error.message || 'Failed to create user', userId: null };
    }

    if (!data.user) {
      console.error('[Server] User creation returned no data and no error');
      return { success: false, error: 'User creation returned no data', userId: null };
    }

    console.log('[Server] User registration initiated successfully:', data.user?.id);

    return { success: true, userId: data.user?.id, error: null };
  } catch (err: any) {
    console.error('[Server] Unexpected error creating user:', err);
    return { success: false, error: err.message || 'Unexpected error', userId: null };
  }
}

export async function checkEmailExistsAction(email: string) {
  try {
    const supabase = createAdminClient();
    
    // Query auth.users to check if email exists
    const { data, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.error('[Server] Error checking email:', error);
      return { exists: false, error: 'Unable to verify email' };
    }
    
    const users = data?.users || [];
    const emailExists = users.some((user: any) => user.email?.toLowerCase() === email.toLowerCase());
    
    return { exists: emailExists, error: null };
  } catch (err: any) {
    console.error('[Server] Unexpected error checking email:', err);
    return { exists: false, error: err.message || 'Unexpected error' };
  }
}

interface CreateUserProfileInput {
  userId: string;
  fullName: string;
  phoneNumber?: string;
  email: string;
}

export async function createUserProfileAction(input: CreateUserProfileInput) {
  try {
    const supabase = createAdminClient();

    const profileData: any = {
      id: input.userId,
      full_name: input.fullName,
      email: input.email,
      // created_at and updated_at have database defaults
    };

    if (input.phoneNumber) {
      profileData.phone_number = input.phoneNumber;
    }

    console.log('[Server] Creating user profile with data:', profileData);

    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .upsert(profileData, { onConflict: 'id' }) // Use upsert instead of insert
      .select()
      .single();

    if (profileError) {
      console.error('[Server] User profile creation failed:', profileError);
      return { success: false, error: profileError.message || 'Failed to create user profile' };
    }

    if (!profile) {
      return { success: false, error: 'User profile creation returned no data' };
    }

    console.log('[Server] User profile created successfully:', profile);
    return { success: true, profile };
  } catch (err: any) {
    console.error('[Server] Unexpected error creating user profile:', err);
    return { success: false, error: err.message || 'Unexpected error' };
  }
}

interface CreateRestaurantInput {
  userId: string;
  businessName: string;
  businessType: 'toko' | 'resto';
  category: string;
  planId: string;
}

export async function createRestaurantAction(input: CreateRestaurantInput) {
  try {
    // Use service role client (with elevated privileges) on the server
    const supabase = createAdminClient();

    // Fetch plan details to get the correct plan_tier
    const { data: plan } = await supabase
      .from('subscription_plans')
      .select('plan_tier')
      .eq('id', input.planId)
      .single();

    const restaurantData = {
      name: input.businessName,
      owner_id: input.userId,
      business_type: input.businessType,
      business_category: input.category,
      plan_tier: plan?.plan_tier || (input.businessType === 'toko' ? 'lite' : 'starter'),
      onboarding_completed: true,
      is_trial: true,
      subscription_status: 'trial',
    };

    console.log('[Server] Creating restaurant with data:', restaurantData);

    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .insert(restaurantData)
      .select()
      .single();

    if (restaurantError) {
      console.error('[Server] Restaurant creation failed:', restaurantError);
      return { success: false, error: restaurantError.message || 'Failed to create restaurant' };
    }

    if (!restaurant) {
      return { success: false, error: 'Restaurant creation returned no data' };
    }

    console.log('[Server] Restaurant created successfully:', restaurant);
    return { success: true, restaurant };
  } catch (err: any) {
    console.error('[Server] Unexpected error creating restaurant:', err);
    return { success: false, error: err.message || 'Unexpected error' };
  }
}

interface CreateSubscriptionInput {
  restaurantId: string;
  planId: string;
}

export async function createSubscriptionAction(input: CreateSubscriptionInput) {
  try {
    const supabase = createAdminClient();

    const subscriptionData = {
      restaurant_id: input.restaurantId,
      plan_id: input.planId,
      status: 'trial',
      trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    };

    console.log('[Server] Creating subscription with data:', subscriptionData);

    const { error: subscriptionError } = await supabase
      .from('subscriptions')
      .insert(subscriptionData);

    if (subscriptionError) {
      console.error('[Server] Subscription creation failed:', subscriptionError);
      return { success: false, error: subscriptionError.message || 'Failed to create subscription' };
    }

    console.log('[Server] Subscription created successfully');
    return { success: true };
  } catch (err: any) {
    console.error('[Server] Unexpected error creating subscription:', err);
    return { success: false, error: err.message || 'Unexpected error' };
  }
}
