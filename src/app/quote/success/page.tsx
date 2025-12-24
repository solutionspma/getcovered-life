'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Header, Footer } from '@/components/layout/header-footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  CheckCircle2, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight,
  PartyPopper,
  Calendar,
  Shield,
} from 'lucide-react'
import Confetti from 'react-confetti'

export default function QuoteSuccessPage() {
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })
  const [showConfetti, setShowConfetti] = useState(true)
  
  useEffect(() => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
    
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Header />
      
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          colors={['#F8BF4F', '#173860', '#4ade80', '#60a5fa']}
        />
      )}
      
      <main className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Success Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <PartyPopper className="w-8 h-8 text-brand-gold" />
                <h1 className="heading-2 text-brand-navy">You're All Set!</h1>
                <PartyPopper className="w-8 h-8 text-brand-gold" />
              </div>
              <p className="text-lg text-muted-foreground">
                Your quote request has been submitted successfully. A licensed agent will 
                contact you within 24 hours with personalized coverage options.
              </p>
            </motion.div>

            {/* What to Expect Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card padding="lg" className="mb-8">
                <h2 className="text-xl font-heading font-semibold text-brand-navy mb-6">
                  What Happens Next?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-navy mb-1">Review & Match</h3>
                      <p className="text-muted-foreground">
                        We'll review your information and match you with the best carriers for your needs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-navy mb-1">Personal Consultation</h3>
                      <p className="text-muted-foreground">
                        A licensed agent will call to discuss your options and answer any questions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-navy mb-1">Get Covered</h3>
                      <p className="text-muted-foreground">
                        Choose the perfect plan and get your coverage started — often same day!
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Contact Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card padding="lg" className="bg-brand-navy text-white mb-8">
                <h2 className="text-xl font-heading font-semibold mb-4">
                  Can't Wait? Reach Us Now!
                </h2>
                <p className="text-white/80 mb-6">
                  If you'd like to speak with an agent right away, we're here to help.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <a
                    href="tel:+18668116525"
                    className="flex items-center gap-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <Phone className="w-6 h-6 text-brand-gold" />
                    <div>
                      <div className="text-sm text-white/60">Call Us</div>
                      <div className="font-semibold">(800) 555-1234</div>
                    </div>
                  </a>
                  <a
                    href="mailto:quotes@getcovered.life"
                    className="flex items-center gap-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <Mail className="w-6 h-6 text-brand-gold" />
                    <div>
                      <div className="text-sm text-white/60">Email Us</div>
                      <div className="font-semibold">quotes@getcovered.life</div>
                    </div>
                  </a>
                </div>
              </Card>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/">
                <Button variant="outline" size="lg">
                  Return Home
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="secondary" size="lg">
                  Explore Products
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>

            {/* Schedule Call CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 rounded-full">
                <Calendar className="w-4 h-4 text-brand-gold" />
                <span className="text-sm text-brand-navy">
                  Prefer a specific time?{' '}
                  <a href="/schedule" className="font-semibold text-brand-gold hover:underline">
                    Schedule a call
                  </a>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
