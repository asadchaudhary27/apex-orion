import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, AlertCircle, User, Mail, Briefcase, DollarSign, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../common/GlassCard';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  service: z.enum(['Web Development', 'Mobile App Development', 'Custom POS Systems', '3D Web Experiences', 'UI/UX Design', 'Custom'], {
    errorMap: () => ({ message: 'Please select a service needed' }),
  }),
  budget: z.enum(['$100 – $500', '$500 – $1k', '$1k – $5k', '$5k – $10k', '$10k+'], {
    errorMap: () => ({ message: 'Please select a budget range' }),
  }),
  details: z.string().min(10, { message: 'Project details must be at least 10 characters' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const ContactForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      service: 'Web Development',
      budget: '$100 – $500',
      details: '',
    },
  });

  const onSubmit = (data: ContactFormData) => {
    // Simulate real form dispatch
    console.log('Valid Form Submitted:', data);
    setIsSubmitted(true);
  };

  const getInputStyle = (fieldName: keyof ContactFormData) => {
    const isError = Boolean(errors[fieldName]);
    const isTouched = Boolean(touchedFields[fieldName]);
    
    const baseStyle = 'pl-11';

    if (isError) {
      return `${baseStyle} border-red-500/80 ring-1 ring-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)] bg-red-950/10`;
    }
    if (isTouched && !isError) {
      return `${baseStyle} border-emerald-500/80 ring-1 ring-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] bg-emerald-950/10`;
    }
    return `${baseStyle} border-white/10 hover:border-white/20 focus:border-[#FF5722]/50 focus:ring-1 focus:ring-[#FF5722] bg-black/[0.03]`;
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } }
  };

  if (isSubmitted) {
    return (
      <GlassCard variant="hover-glow" glowColor="cyan" className="p-8 sm:p-12 text-center space-y-6 rounded-3xl overflow-hidden relative">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.5)]"
        >
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>

        <motion.h3 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-headline text-3xl font-bold text-white"
        >
          Inquiry Received!
        </motion.h3>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed"
        >
          Thank you for reaching out. The Apex Orion engineering team will review your project details and get back to you within 24 hours.
        </motion.p>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => {
            setIsSubmitted(false);
            reset();
          }}
          className="mt-4 px-8 py-3 text-sm font-semibold text-white bg-black/[0.03] border border-white/10 rounded-full hover:bg-black/[0.05] hover:border-white/20 transition-all duration-300"
        >
          Send Another Message
        </motion.button>
      </GlassCard>
    );
  }

  return (
    <GlassCard variant="solid-dark" className="p-8 sm:p-12 space-y-8 rounded-3xl border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl bg-[#0a0a0a]/90">
      {/* Decorative gradient orb */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#FF5722]/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="space-y-3 relative z-10">
        <h2 className="font-headline text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          Start a Project
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Fill out the inquiry form below to receive a custom engineering scope & quote.
        </p>
      </div>

      <motion.form 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-6 relative z-10" 
        noValidate
      >
        {/* Name Field */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label htmlFor="name" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">
            Your Name <span className="text-[#FF5722]">*</span>
          </label>
          <div className="relative group">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF5722] transition-colors" />
            <input
              id="name"
              type="text"
              placeholder="Alpha / Asad"
              {...register('name')}
              className={`w-full py-3.5 rounded-xl text-white placeholder-gray-600 transition-all duration-300 outline-none ${getInputStyle(
                'name'
              )}`}
            />
          </div>
          <AnimatePresence>
            {errors.name && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-400 text-xs flex items-center space-x-1.5 pt-1 font-medium pl-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.name.message}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Email Field */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label htmlFor="email" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">
            Email Address <span className="text-[#FF5722]">*</span>
          </label>
          <div className="relative group">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF5722] transition-colors" />
            <input
              id="email"
              type="email"
              placeholder="client@company.com"
              {...register('email')}
              className={`w-full py-3.5 rounded-xl text-white placeholder-gray-600 transition-all duration-300 outline-none ${getInputStyle(
                'email'
              )}`}
            />
          </div>
          <AnimatePresence>
            {errors.email && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-400 text-xs flex items-center space-x-1.5 pt-1 font-medium pl-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.email.message}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Grid: Service & Budget Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="service" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">
              Service Needed <span className="text-[#FF5722]">*</span>
            </label>
            <div className="relative group">
              <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF5722] transition-colors" />
              <select
                id="service"
                {...register('service')}
                className={`w-full py-3.5 rounded-xl text-white bg-[#0a0a0a] appearance-none transition-all duration-300 outline-none ${getInputStyle(
                  'service'
                )}`}
              >
                <option value="Web Development" className="bg-black text-white py-2">Web Development</option>
                <option value="Mobile App Development" className="bg-black text-white py-2">Mobile App Development</option>
                <option value="Custom POS Systems" className="bg-black text-white py-2">Custom POS Systems</option>
                <option value="3D Web Experiences" className="bg-black text-white py-2">3D Web Experiences</option>
                <option value="UI/UX Design" className="bg-black text-white py-2">UI/UX Design</option>
                <option value="Custom" className="bg-black text-white py-2">Custom</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-gray-500 group-focus-within:border-t-#FF5722" />
            </div>
            <AnimatePresence>
              {errors.service && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-400 text-xs flex items-center space-x-1.5 pt-1 font-medium pl-1">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errors.service.message}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="budget" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">
              Budget Range <span className="text-[#FF5722]">*</span>
            </label>
            <div className="relative group">
              <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF5722] transition-colors" />
              <select
                id="budget"
                {...register('budget')}
                className={`w-full py-3.5 rounded-xl text-white bg-[#0a0a0a] appearance-none transition-all duration-300 outline-none ${getInputStyle(
                  'budget'
                )}`}
              >
                <option value="$100 – $500" className="bg-black text-white py-2">$100 – $500</option>
                <option value="$500 – $1k" className="bg-black text-white py-2">$500 – $1k</option>
                <option value="$1k – $5k" className="bg-black text-white py-2">$1k – $5k</option>
                <option value="$5k – $10k" className="bg-black text-white py-2">$5k – $10k</option>
                <option value="$10k+" className="bg-black text-white py-2">$10k+</option>
                <option value="Want to negotiate" className="bg-black text-white py-2">Want to negotiate</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-gray-500 group-focus-within:border-t-#FF5722" />
            </div>
            <AnimatePresence>
              {errors.budget && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-400 text-xs flex items-center space-x-1.5 pt-1 font-medium pl-1">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errors.budget.message}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Project Details Textarea */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label htmlFor="details" className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block pl-1">
            Project Details <span className="text-[#FF5722]">*</span>
          </label>
          <div className="relative group">
            <MessageSquare className="absolute left-3.5 top-4 w-4 h-4 text-gray-400 group-focus-within:text-[#FF5722] transition-colors" />
            <textarea
              id="details"
              rows={4}
              placeholder="Tell us about your project goals, timelines, and technical requirements..."
              {...register('details')}
              className={`w-full py-3.5 rounded-xl text-white placeholder-gray-600 transition-all duration-300 outline-none resize-none ${getInputStyle(
                'details'
              )}`}
            />
          </div>
          <AnimatePresence>
            {errors.details && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-400 text-xs flex items-center space-x-1.5 pt-1 font-medium pl-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.details.message}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants} className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 text-base font-bold text-white bg-gradient-to-r from-[#FF5722] to-[#FF8A65] rounded-xl shadow-[0_0_20px_rgba(255,87,34,0.4)] hover:shadow-[0_0_40px_rgba(255,87,34,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:scale-100 group relative overflow-hidden"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
            
            <span className="relative z-10">{isSubmitting ? 'Submitting...' : 'Send Inquiry'}</span>
            <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </motion.form>
    </GlassCard>
  );
};

export default ContactForm;
