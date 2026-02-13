import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import PaymentClient from './payment-client';

export default async function PaymentPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  
  // Fetch submission data
  const { data: submission, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !submission) {
    notFound();
  }

  return <PaymentClient submission={submission} />;
}
