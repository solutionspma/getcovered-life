'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Header, Footer } from '@/components/layout/header-footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { VoiceAIWidget } from '@/components/voice/voice-ai-widget'
import { toast } from 'sonner'
import { 
  Book, 
  Download, 
  Star, 
  CheckCircle2, 
  ShieldCheck,
  CreditCard,
  Lock,
  Loader2,
  Quote,
  ArrowRight,
} from 'lucide-react'

const bookFeatures = [
  'Master the fundamentals of life insurance',
  'Learn proven sales techniques that work',
  'Understand different policy types in depth',
  'Build lasting client relationships',
  'Navigate underwriting like a pro',
  'Close more deals with confidence',
  'Bonus: Scripts and templates included',
]

const testimonials = [
  {
    name: 'Michael R.',
    role: 'Insurance Agent',
    content: 'This book completely transformed how I approach sales. My closing rate has doubled!',
    rating: 5,
  },
  {
    name: 'Jennifer L.',
    role: 'Agency Owner',
    content: 'I bought copies for my entire team. The ROI has been incredible.',
    rating: 5,
  },
  {
    name: 'David K.',
    role: 'New Agent',
    content: 'As someone new to the industry, this gave me the foundation I needed to succeed.',
    rating: 5,
  },
]

export default function BookPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handlePurchase = async () => {
    if (!email) {
      toast.error('Please enter your email')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'Please try again or contact support.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy overflow-hidden pt-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #F8BF4F 0%, transparent 50%), radial-gradient(circle at 75% 75%, #F8BF4F 0%, transparent 50%)`,
            }} />
          </div>
          
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Book Cover */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="relative mx-auto max-w-md">
                  {/* Book Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/30 to-transparent blur-3xl transform translate-y-10" />
                  
                  {/* Book Cover - Actual Image */}
                  <div className="relative rounded-lg shadow-2xl overflow-hidden">
                    <Image
                      src="/images/insurogram-cover.jpg"
                      alt="The Insur-O-Gram Book Cover"
                      width={400}
                      height={533}
                      className="w-full h-auto"
                      priority
                    />
                  </div>

                  {/* Best Seller Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -12 }}
                    animate={{ scale: 1, rotate: -12 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg"
                  >
                    BESTSELLER
                  </motion.div>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-white"
              >
                <Badge variant="gold" className="mb-4">Digital Download</Badge>
                <h1 className="heading-1 text-white mb-4">
                  The Insur-O-Gram
                </h1>
                <p className="text-xl text-white/80 mb-6">
                  The definitive guide to mastering life insurance sales. Learn the 
                  strategies, techniques, and mindset that top producers use to build 
                  thriving careers.
                </p>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <span className="text-white/60">4.9/5 from 200+ readers</span>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-brand-gold">$29.99</span>
                    <span className="text-xl text-white/40 line-through">$49.99</span>
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      40% OFF
                    </Badge>
                  </div>
                  <p className="text-white/60 mt-2">Instant PDF download • Lifetime access</p>
                </div>

                {/* Purchase Form */}
                <Card padding="md" className="bg-white/10 backdrop-blur border-white/20">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-white"
                    />
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={handlePurchase}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Buy Now
                        </>
                      )}
                    </Button>
                  </div>
                </Card>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Powered by Stripe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>30-day guarantee</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4">What's Inside</Badge>
              <h2 className="heading-2 text-brand-navy mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-muted-foreground">
                Over 200 pages of actionable strategies, real-world examples, 
                and proven techniques.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {bookFeatures.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-brand-navy">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4">Reader Reviews</Badge>
              <h2 className="heading-2 text-brand-navy mb-4">
                What Others Are Saying
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card padding="lg" className="h-full">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <div className="flex items-start gap-2 mb-4">
                      <Quote className="w-6 h-6 text-brand-gold/30 shrink-0" />
                      <p className="text-muted-foreground italic">
                        {testimonial.content}
                      </p>
                    </div>
                    <div className="mt-auto">
                      <p className="font-semibold text-brand-navy">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-brand-gold">
          <div className="container mx-auto px-4 text-center">
            <h2 className="heading-2 text-brand-navy mb-4">
              Start Your Journey Today
            </h2>
            <p className="text-lg text-brand-navy/80 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful agents who have transformed their careers 
              with The Insur-O-Gram.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-3xl font-bold text-brand-navy">$29.99</div>
              <Button 
                variant="primary" 
                size="xl"
                onClick={() => {
                  const input = document.querySelector('input[type="email"]') as HTMLInputElement
                  input?.focus()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                Get Your Copy
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <p className="text-sm text-brand-navy/60 mt-4">
              30-day money-back guarantee • Instant download
            </p>
          </div>
        </section>
      </main>
      
      <VoiceAIWidget />
      <Footer />
    </>
  )
}
