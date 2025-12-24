'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Header, Footer } from '@/components/layout/header-footer'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { SelectField } from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { VoiceAIWidget } from '@/components/voice/voice-ai-widget'
import { toast } from 'sonner'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Loader2,
  CheckCircle2,
} from 'lucide-react'

const contactSchema = z.object({
  firstName: z.string().min(2, 'Please enter your first name'),
  lastName: z.string().min(2, 'Please enter your last name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Please enter at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const subjects = [
  { value: 'quote', label: 'Get a Quote' },
  { value: 'existing-policy', label: 'Existing Policy Question' },
  { value: 'claims', label: 'Claims Assistance' },
  { value: 'agent', label: 'Become an Agent' },
  { value: 'partnership', label: 'Partnership Inquiry' },
  { value: 'other', label: 'Other' },
]

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    value: '(800) 555-1234',
    href: 'tel:+18668116525',
    description: 'Mon-Fri 8am-8pm EST',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@getcovered.life',
    href: 'mailto:hello@getcovered.life',
    description: 'We respond within 24 hours',
  },
  {
    icon: MapPin,
    title: 'Office',
    value: 'Tampa, Florida',
    href: '#',
    description: 'Licensed in all 50 states',
  },
  {
    icon: Clock,
    title: 'Hours',
    value: 'Mon-Fri 8am-8pm',
    href: '#',
    description: 'Sat 9am-5pm EST',
  },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })
  
  const watchedValues = watch()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      // Submit to API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      setIsSubmitted(true)
      toast.success('Message sent!', {
        description: 'We\'ll get back to you within 24 hours.',
      })
      reset()
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'Please try again or call us directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Badge variant="gold" className="mb-4">Contact Us</Badge>
                <h1 className="heading-1 text-white mb-4">
                  Let's Talk About Your <span className="text-brand-gold">Coverage</span>
                </h1>
                <p className="text-xl text-white/80">
                  Whether you have a question or are ready to get started, 
                  we're here to help.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-8 -mt-12 relative z-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card padding="md" hover className="h-full text-center">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                      <info.icon className="w-6 h-6 text-brand-gold group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-semibold text-brand-navy mb-1">{info.title}</h3>
                    <p className="text-brand-navy font-medium">{info.value}</p>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </Card>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card padding="lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-brand-gold" />
                    </div>
                    <div>
                      <h2 className="text-xl font-heading font-semibold text-brand-navy">
                        Send Us a Message
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </div>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-heading font-semibold text-brand-navy mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for reaching out. We'll get back to you soon.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
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
                        label="Email Address"
                        type="email"
                        placeholder="john@example.com"
                        {...register('email')}
                        error={errors.email?.message}
                        required
                      />
                      
                      <Input
                        label="Phone Number (Optional)"
                        type="tel"
                        placeholder="(555) 555-5555"
                        {...register('phone')}
                      />
                      
                      <SelectField
                        label="Subject"
                        options={subjects}
                        value={watchedValues.subject}
                        onValueChange={(value) => setValue('subject', value)}
                        error={errors.subject?.message}
                        required
                      />
                      
                      <Textarea
                        label="Message"
                        placeholder="How can we help you?"
                        rows={5}
                        {...register('message')}
                        error={errors.message?.message}
                        required
                      />
                      
                      <Button
                        type="submit"
                        variant="secondary"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </Card>
              </motion.div>

              {/* FAQ / Quick Help */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <Badge variant="secondary" className="mb-4">Common Questions</Badge>
                  <h2 className="heading-3 text-brand-navy mb-6">
                    Quick Answers
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      question: 'How quickly can I get coverage?',
                      answer: 'Many of our policies offer same-day coverage approval. Final expense policies often have no waiting period.',
                    },
                    {
                      question: 'Do I need a medical exam?',
                      answer: 'It depends on the policy. We offer many no-exam options, especially for final expense and some term policies.',
                    },
                    {
                      question: 'How much does life insurance cost?',
                      answer: 'Costs vary based on age, health, coverage amount, and policy type. Get a free quote to see your personalized rates.',
                    },
                    {
                      question: 'Can I change my policy later?',
                      answer: 'Many policies allow adjustments. Contact us to discuss your options.',
                    },
                    {
                      question: 'What states do you serve?',
                      answer: 'We\'re licensed in all 50 states and can help families nationwide.',
                    },
                  ].map((faq) => (
                    <Card key={faq.question} padding="md">
                      <h4 className="font-semibold text-brand-navy mb-2">{faq.question}</h4>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </Card>
                  ))}
                </div>

                {/* Call CTA */}
                <Card padding="lg" className="bg-brand-navy text-white">
                  <h3 className="text-xl font-heading font-semibold mb-2">
                    Prefer to Talk?
                  </h3>
                  <p className="text-white/80 mb-4">
                    Our licensed agents are standing by to help you.
                  </p>
                  <a href="tel:+18668116525">
                    <Button variant="secondary" size="lg" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call (800) 555-1234
                    </Button>
                  </a>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <VoiceAIWidget />
      <Footer />
    </>
  )
}
