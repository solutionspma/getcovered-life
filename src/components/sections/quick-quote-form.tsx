'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SelectField } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { 
  ArrowRight, 
  Shield,
  Lock,
  CheckCircle2,
  Loader2,
} from 'lucide-react'
import { toast } from 'sonner'

const quickQuoteSchema = z.object({
  firstName: z.string().min(2, 'Please enter your first name'),
  lastName: z.string().min(2, 'Please enter your last name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  age: z.string().min(1, 'Please select your age range'),
  coverageType: z.string().min(1, 'Please select coverage type'),
  coverageAmount: z.string().min(1, 'Please select coverage amount'),
})

type QuickQuoteFormData = z.infer<typeof quickQuoteSchema>

const ageRanges = [
  { value: '18-30', label: '18-30 years' },
  { value: '31-40', label: '31-40 years' },
  { value: '41-50', label: '41-50 years' },
  { value: '51-60', label: '51-60 years' },
  { value: '61-70', label: '61-70 years' },
  { value: '71-80', label: '71-80 years' },
  { value: '81+', label: '81+ years' },
]

const coverageTypes = [
  { value: 'final-expense', label: 'Final Expense' },
  { value: 'term-life', label: 'Term Life Insurance' },
  { value: 'iul', label: 'Indexed Universal Life' },
  { value: 'return-premium', label: 'Return of Premium' },
  { value: 'not-sure', label: 'Not Sure - Help Me Choose' },
]

const coverageAmounts = [
  { value: '5000-10000', label: '$5,000 - $10,000' },
  { value: '10000-25000', label: '$10,000 - $25,000' },
  { value: '25000-50000', label: '$25,000 - $50,000' },
  { value: '50000-100000', label: '$50,000 - $100,000' },
  { value: '100000-250000', label: '$100,000 - $250,000' },
  { value: '250000-500000', label: '$250,000 - $500,000' },
  { value: '500000+', label: '$500,000+' },
]

export function QuickQuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QuickQuoteFormData>({
    resolver: zodResolver(quickQuoteSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: '',
      coverageType: '',
      coverageAmount: '',
    },
  })
  
  const watchedValues = watch()
  
  const onSubmit = async (data: QuickQuoteFormData) => {
    setIsSubmitting(true)
    
    try {
      // In production, this would submit to your API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      toast.success('Quote request submitted!', {
        description: 'We\'ll contact you within 24 hours with personalized quotes.',
      })
      
      // Reset form or redirect
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'Please try again or call us directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const nextStep = () => {
    if (step < 2) setStep(step + 1)
  }
  
  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }
  
  const canProceed = () => {
    if (step === 1) {
      return watchedValues.age && watchedValues.coverageType && watchedValues.coverageAmount
    }
    return true
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-navy to-brand-navy-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-brand-gold rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-brand-navy" />
          </div>
          <h2 className="text-xl font-heading font-bold">Get Your Free Quote</h2>
        </div>
        <p className="text-white/80 text-sm">
          Takes less than 60 seconds • No obligation
        </p>
        
        {/* Progress Bar */}
        <div className="mt-4 flex gap-2">
          {[1, 2].map((s) => (
            <div 
              key={s}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-colors',
                s <= step ? 'bg-brand-gold' : 'bg-white/20'
              )}
            />
          ))}
        </div>
      </div>
      
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        {/* Step 1: Coverage Info */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <SelectField
              label="Your Age Range"
              options={ageRanges}
              value={watchedValues.age}
              onValueChange={(value) => setValue('age', value)}
              error={errors.age?.message}
              required
            />
            
            <SelectField
              label="Coverage Type"
              options={coverageTypes}
              value={watchedValues.coverageType}
              onValueChange={(value) => setValue('coverageType', value)}
              error={errors.coverageType?.message}
              required
            />
            
            <SelectField
              label="Coverage Amount"
              options={coverageAmounts}
              value={watchedValues.coverageAmount}
              onValueChange={(value) => setValue('coverageAmount', value)}
              error={errors.coverageAmount?.message}
              required
            />
            
            <Button 
              type="button"
              variant="secondary" 
              fullWidth 
              size="lg"
              onClick={nextStep}
              disabled={!canProceed()}
              className="mt-6"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}
        
        {/* Step 2: Contact Info */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                placeholder="John"
                {...register('firstName')}
                error={errors.firstName?.message}
                required
              />
              <Input
                label="Last Name"
                placeholder="Smith"
                {...register('lastName')}
                error={errors.lastName?.message}
                required
              />
            </div>
            
            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              {...register('email')}
              error={errors.email?.message}
              required
            />
            
            <Input
              label="Phone"
              type="tel"
              placeholder="(555) 555-5555"
              {...register('phone')}
              error={errors.phone?.message}
              required
            />
            
            <div className="flex gap-3 mt-6">
              <Button 
                type="button"
                variant="outline" 
                size="lg"
                onClick={prevStep}
              >
                Back
              </Button>
              <Button 
                type="submit"
                variant="secondary" 
                size="lg"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Get My Quotes
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
        
        {/* Trust Indicators */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4" />
              <span>256-bit SSL</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              <span>No Spam</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Free Quote</span>
            </div>
          </div>
        </div>
      </form>
      
      {/* Bottom Trust Banner */}
      <div className="bg-brand-gold/10 px-6 py-4 border-t">
        <div className="flex items-center justify-center gap-4">
          <div className="flex -space-x-2">
            {['A', 'B', 'C'].map((letter) => (
              <div 
                key={letter}
                className="w-8 h-8 rounded-full bg-brand-navy text-white flex items-center justify-center text-xs font-medium border-2 border-white"
              >
                {letter}
              </div>
            ))}
          </div>
          <div className="text-sm">
            <span className="font-semibold text-brand-navy">2,847 people</span>
            <span className="text-muted-foreground"> got quotes this week</span>
          </div>
        </div>
      </div>
    </div>
  )
}
