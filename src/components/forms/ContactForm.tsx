'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, MessageCircle, FileText, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';

interface ContactFormProps {
  type: 'contact' | 'demo';
  subjectPrefix?: string;
}

export default function ContactForm({ type, subjectPrefix }: ContactFormProps) {
  const { t } = useLanguage();
  const formStrings = type === 'contact' ? t.contact.form : t.demo.form;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: subjectPrefix ? `${subjectPrefix} ${formData.subject}` : formData.subject
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', whatsapp: '', subject: '', message: '' });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      alert(error.message || 'Failed to send message. Please try again or contact us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key={`${type}-form`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 pl-1">{formStrings.name}</label>
              <div className="relative">
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  required
                  minLength={2}
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  type="text"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-[#FF5A5F] focus:ring-4 focus:ring-[#FF5A5F]/5 transition-all outline-none font-medium"
                  placeholder={formStrings.placeholders.name}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 pl-1">{formStrings.email}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  type="email"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-[#FF5A5F] focus:ring-4 focus:ring-[#FF5A5F]/5 transition-all outline-none font-medium"
                  placeholder={formStrings.placeholders.email}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 pl-1">{formStrings.whatsapp}</label>
              <div className="relative">
                <MessageCircle className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  required
                  minLength={8}
                  value={formData.whatsapp}
                  onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                  type="tel"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-[#FF5A5F] focus:ring-4 focus:ring-[#FF5A5F]/5 transition-all outline-none font-medium"
                  placeholder={formStrings.placeholders.whatsapp}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 pl-1">{formStrings.subject}</label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  required
                  minLength={2}
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  type="text"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl focus:bg-white focus:border-[#FF5A5F] focus:ring-4 focus:ring-[#FF5A5F]/5 transition-all outline-none font-medium"
                  placeholder={formStrings.placeholders.subject}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 pl-1">{formStrings.message}</label>
              <textarea
                required
                minLength={10}
                rows={4}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-6 bg-gray-50 border-transparent rounded-3xl focus:bg-white focus:border-[#FF5A5F] focus:ring-4 focus:ring-[#FF5A5F]/5 transition-all outline-none font-medium resize-none text-lg"
                placeholder={formStrings.placeholders.message}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 bg-gray-900 hover:bg-black text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 transition-all relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {formStrings.submit}
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-12"
          >
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4">{formStrings.success}</h3>
            <p className="text-gray-500 font-medium mb-8 max-w-sm">
              {type === 'contact' ? t.contact.successMessage : t.demo.successMessage}
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-8 py-4 bg-gray-50 hover:bg-gray-100 text-gray-900 font-bold rounded-2xl transition-all uppercase tracking-widest text-xs"
            >
              {type === 'contact' ? 'Send another message' : 'Request another demo'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
