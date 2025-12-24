'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Header, Footer } from '@/components/layout/header-footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SelectField } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { 
  ArrowRight, 
  ArrowLeft,
  Shield, 
  Lock, 
  CheckCircle2, 
  Loader2,
  Heart,
  Umbrella,
  RefreshCcw,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Activity,
  Cigarette,
} from 'lucide-react'

const quoteSchema = z.object({
  // Step 1: Product Selection
  productType: z.string().min(1, 'Please select a product type'),
  
  // Step 2: Personal Info
  firstName: z.string().min(2, 'Please enter your first name'),
  lastName: z.string().min(2, 'Please enter your last name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  
  // Step 3: Demographics
  dateOfBirth: z.string().min(1, 'Please enter your date of birth'),
  gender: z.string().min(1, 'Please select your gender'),
  state: z.string().min(1, 'Please select your state'),
  
  // Step 4: Health Info
  tobaccoUser: z.string().min(1, 'Please answer this question'),
  healthRating: z.string().min(1, 'Please rate your health'),
  
  // Step 5: Coverage Details
  coverageAmount: z.string().min(1, 'Please select coverage amount'),
  termLength: z.string().optional(),
})

type QuoteFormData = z.infer<typeof quoteSchema>

const steps = [
  { id: 1, name: 'Coverage Type', icon: Shield },
  { id: 2, name: 'Contact Info', icon: User },
  { id: 3, name: 'About You', icon: Calendar },
  { id: 4, name: 'Health', icon: Activity },
  { id: 5, name: 'Coverage', icon: Heart },
]

const products = [
  { 
    value: 'final-expense', 
    label: 'Final Expense', 
    icon: Heart,
    description: 'Affordable whole life coverage for end-of-life expenses',
    features: ['No medical exam', '$5K-$50K coverage', 'Guaranteed acceptance options'],
  },
  { 
    value: 'term-life', 
    label: 'Term Life', 
    icon: Shield,
    description: 'Straightforward protection for a specific period',
    features: ['Lowest premiums', '$50K-$1M+ coverage', '10-30 year terms'],
  },
  { 
    value: 'iul', 
    label: 'Indexed Universal Life', 
    icon: Umbrella,
    description: 'Permanent coverage with cash value growth potential',
    features: ['Cash value growth', 'Tax advantages', 'Flexible premiums'],
  },
  { 
    value: 'return-premium', 
    label: 'Return of Premium', 
    icon: RefreshCcw,
    description: 'Term coverage that returns your premiums',
    features: ['100% premium return', 'Death benefit protection', 'Built-in savings'],
  },
]

const states = [
  { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' }, { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' }, { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' }, { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' }, { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' }, { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' }, { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' }, { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' }, { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' },
]

const coverageAmounts = {
  'final-expense': [
    { value: '5000', label: '$5,000' },
    { value: '10000', label: '$10,000' },
    { value: '15000', label: '$15,000' },
    { value: '20000', label: '$20,000' },
    { value: '25000', label: '$25,000' },
    { value: '35000', label: '$35,000' },
    { value: '50000', label: '$50,000' },
  ],
  'term-life': [
    { value: '100000', label: '$100,000' },
    { value: '250000', label: '$250,000' },
    { value: '500000', label: '$500,000' },
    { value: '750000', label: '$750,000' },
    { value: '1000000', label: '$1,000,000' },
  ],
  'iul': [
    { value: '100000', label: '$100,000' },
    { value: '250000', label: '$250,000' },
    { value: '500000', label: '$500,000' },
    { value: '1000000', label: '$1,000,000+' },
  ],
  'return-premium': [
    { value: '100000', label: '$100,000' },
    { value: '250000', label: '$250,000' },
    { value: '500000', label: '$500,000' },
    { value: '750000', label: '$750,000' },
  ],
}

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    mode: 'onChange',
  })
  
  const watchedValues = watch()
  
  const nextStep = useCallback(async () => {
    // Validate current step fields
    let fieldsToValidate: (keyof QuoteFormData)[] = []
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['productType']
        break
      case 2:
        fieldsToValidate = ['firstName', 'lastName', 'email', 'phone']
        break
      case 3:
        fieldsToValidate = ['dateOfBirth', 'gender', 'state']
        break
      case 4:
        fieldsToValidate = ['tobaccoUser', 'healthRating']
        break
      case 5:
        fieldsToValidate = ['coverageAmount']
        break
    }
    
    const isValid = await trigger(fieldsToValidate)
    if (isValid && currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }, [currentStep, trigger])
  
  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }, [currentStep])
  
  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    
    try {
      // Submit to API
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      toast.success('Quote request submitted!', {
        description: 'We\'ll contact you within 24 hours with personalized quotes.',
      })
      
      // Redirect to success page
      window.location.href = '/quote/success'
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'Please try again or call us directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedProduct = products.find(p => p.value === watchedValues.productType)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-4">Free Quote</Badge>
            <h1 className="heading-2 text-brand-navy mb-4">
              Get Your Personalized Quote
            </h1>
            <p className="text-lg text-muted-foreground">
              Answer a few questions and we'll find you the best coverage at the best price.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
                      currentStep >= step.id 
                        ? 'bg-brand-gold text-brand-navy' 
                        : 'bg-gray-200 text-gray-400'
                    )}>
                      {currentStep > step.id ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-6 h-6" />
                      )}
                    </div>
                    <span className={cn(
                      'mt-2 text-sm font-medium hidden md:block',
                      currentStep >= step.id ? 'text-brand-navy' : 'text-gray-400'
                    )}>
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      'flex-1 h-1 mx-2',
                      currentStep > step.id ? 'bg-brand-gold' : 'bg-gray-200'
                    )} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <Card padding="lg" className="shadow-xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  {/* Step 1: Product Selection */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h2 className="text-xl font-heading font-semibold text-brand-navy mb-6">
                        What type of coverage are you looking for?
                      </h2>
                      <div className="grid gap-4">
                        {products.map((product) => (
                          <label
                            key={product.value}
                            className={cn(
                              'flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
                              watchedValues.productType === product.value
                                ? 'border-brand-gold bg-brand-gold/5'
                                : 'border-gray-200 hover:border-brand-gold/50'
                            )}
                          >
                            <input
                              type="radio"
                              value={product.value}
                              {...register('productType')}
                              className="sr-only"
                            />
                            <div className={cn(
                              'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                              watchedValues.productType === product.value
                                ? 'bg-brand-gold text-brand-navy'
                                : 'bg-gray-100 text-gray-500'
                            )}>
                              <product.icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-brand-navy">{product.label}</div>
                              <div className="text-sm text-muted-foreground mb-2">{product.description}</div>
                              <div className="flex flex-wrap gap-2">
                                {product.features.map((feature) => (
                                  <span key={feature} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className={cn(
                              'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0',
                              watchedValues.productType === product.value
                                ? 'border-brand-gold bg-brand-gold'
                                : 'border-gray-300'
                            )}>
                              {watchedValues.productType === product.value && (
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              )}
                            </div>
                          </label>
                        ))}
                      </div>
                      {errors.productType && (
                        <p className="mt-2 text-sm text-red-500">{errors.productType.message}</p>
                      )}
                    </motion.div>
                  )}

                  {/* Step 2: Contact Info */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-xl font-heading font-semibold text-brand-navy mb-6">
                        How can we reach you?
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          label="First Name"
                          placeholder="John"
                          leftIcon={<User className="w-5 h-5" />}
                          {...register('firstName')}
                          error={errors.firstName?.message}
                          required
                        />
                        <Input
                          label="Last Name"
                          placeholder="Smith"
                          leftIcon={<User className="w-5 h-5" />}
                          {...register('lastName')}
                          error={errors.lastName?.message}
                          required
                        />
                      </div>
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        leftIcon={<Mail className="w-5 h-5" />}
                        {...register('email')}
                        error={errors.email?.message}
                        required
                      />
                      <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="(555) 555-5555"
                        leftIcon={<Phone className="w-5 h-5" />}
                        {...register('phone')}
                        error={errors.phone?.message}
                        required
                      />
                    </motion.div>
                  )}

                  {/* Step 3: Demographics */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-xl font-heading font-semibold text-brand-navy mb-6">
                        Tell us a bit about yourself
                      </h2>
                      <Input
                        label="Date of Birth"
                        type="date"
                        leftIcon={<Calendar className="w-5 h-5" />}
                        {...register('dateOfBirth')}
                        error={errors.dateOfBirth?.message}
                        required
                      />
                      <SelectField
                        label="Gender"
                        options={[
                          { value: 'male', label: 'Male' },
                          { value: 'female', label: 'Female' },
                        ]}
                        value={watchedValues.gender}
                        onValueChange={(value) => setValue('gender', value)}
                        error={errors.gender?.message}
                        required
                      />
                      <SelectField
                        label="State of Residence"
                        options={states}
                        value={watchedValues.state}
                        onValueChange={(value) => setValue('state', value)}
                        error={errors.state?.message}
                        required
                      />
                    </motion.div>
                  )}

                  {/* Step 4: Health Info */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-xl font-heading font-semibold text-brand-navy mb-6">
                        A few health questions
                      </h2>
                      <SelectField
                        label="Have you used tobacco products in the last 12 months?"
                        options={[
                          { value: 'no', label: 'No' },
                          { value: 'yes', label: 'Yes' },
                        ]}
                        value={watchedValues.tobaccoUser}
                        onValueChange={(value) => setValue('tobaccoUser', value)}
                        error={errors.tobaccoUser?.message}
                        required
                      />
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                          How would you rate your overall health? <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-5 gap-2">
                          {['1', '2', '3', '4', '5'].map((rating) => (
                            <label
                              key={rating}
                              className={cn(
                                'flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all',
                                watchedValues.healthRating === rating
                                  ? 'border-brand-gold bg-brand-gold/5'
                                  : 'border-gray-200 hover:border-brand-gold/50'
                              )}
                            >
                              <input
                                type="radio"
                                value={rating}
                                {...register('healthRating')}
                                className="sr-only"
                              />
                              <span className="text-2xl font-bold text-brand-navy">{rating}</span>
                              <span className="text-xs text-muted-foreground">
                                {rating === '1' && 'Poor'}
                                {rating === '2' && 'Fair'}
                                {rating === '3' && 'Good'}
                                {rating === '4' && 'Great'}
                                {rating === '5' && 'Excellent'}
                              </span>
                            </label>
                          ))}
                        </div>
                        {errors.healthRating && (
                          <p className="mt-2 text-sm text-red-500">{errors.healthRating.message}</p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 5: Coverage Details */}
                  {currentStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-xl font-heading font-semibold text-brand-navy mb-6">
                        How much coverage do you need?
                      </h2>
                      
                      {selectedProduct && (
                        <div className="bg-brand-gold/10 rounded-xl p-4 mb-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-gold rounded-lg flex items-center justify-center">
                              <selectedProduct.icon className="w-5 h-5 text-brand-navy" />
                            </div>
                            <div>
                              <div className="font-semibold text-brand-navy">{selectedProduct.label}</div>
                              <div className="text-sm text-muted-foreground">{selectedProduct.description}</div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <SelectField
                        label="Coverage Amount"
                        options={coverageAmounts[watchedValues.productType as keyof typeof coverageAmounts] || []}
                        value={watchedValues.coverageAmount}
                        onValueChange={(value) => setValue('coverageAmount', value)}
                        error={errors.coverageAmount?.message}
                        required
                      />
                      
                      {(watchedValues.productType === 'term-life' || watchedValues.productType === 'return-premium') && (
                        <SelectField
                          label="Term Length"
                          options={[
                            { value: '10', label: '10 Years' },
                            { value: '15', label: '15 Years' },
                            { value: '20', label: '20 Years' },
                            { value: '25', label: '25 Years' },
                            { value: '30', label: '30 Years' },
                          ]}
                          value={watchedValues.termLength}
                          onValueChange={(value) => setValue('termLength', value)}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    type="button"
                    variant="ghost"
                    size="lg"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  
                  {currentStep < 5 ? (
                    <Button
                      type="button"
                      variant="secondary"
                      size="lg"
                      onClick={nextStep}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="secondary"
                      size="lg"
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
                  )}
                </div>
              </form>
            </Card>

            {/* Trust Indicators */}
            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>256-bit SSL encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>No spam, ever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Free & no obligation</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
