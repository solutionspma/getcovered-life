'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Header, Footer } from '@/components/layout/header-footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  CheckCircle2, 
  Download, 
  Mail, 
  ArrowRight,
  Book,
  PartyPopper,
} from 'lucide-react'
import Confetti from 'react-confetti'

function BookSuccessContent() {
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })
  const [showConfetti, setShowConfetti] = useState(true)
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

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
                <h1 className="heading-2 text-brand-navy">Thank You!</h1>
                <PartyPopper className="w-8 h-8 text-brand-gold" />
              </div>
              <p className="text-lg text-muted-foreground">
                Your purchase of The Insur-O-Gram was successful. 
                You're on your way to insurance mastery!
              </p>
            </motion.div>

            {/* Download Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card padding="lg" className="text-center mb-8">
                <div className="w-20 h-20 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Book className="w-10 h-10 text-brand-gold" />
                </div>
                <h2 className="text-xl font-heading font-semibold text-brand-navy mb-4">
                  Your Download is Ready
                </h2>
                <p className="text-muted-foreground mb-6">
                  Click the button below to download your copy of The Insur-O-Gram.
                  The download link has also been sent to your email.
                </p>
                <Button variant="secondary" size="lg">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Your download link will expire in 30 days.
                </p>
              </Card>
            </motion.div>

            {/* Email Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card padding="md" className="bg-blue-50 border-blue-200 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">
                      Check Your Email
                    </h3>
                    <p className="text-sm text-blue-800">
                      We've sent a receipt and download link to your email address. 
                      If you don't see it, check your spam folder.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* What's Next */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Card padding="lg" className="bg-brand-navy text-white">
                <h2 className="text-xl font-heading font-semibold mb-4">
                  Ready to Put Your Knowledge to Work?
                </h2>
                <p className="text-white/80 mb-6">
                  Now that you have the playbook, let's help you start generating leads 
                  and closing deals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/careers">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                      Join Our Team
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/quote">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                      Get a Quote
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* Return Home */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-center mt-8"
            >
              <Link href="/" className="text-brand-gold hover:underline">
                Return to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}

export default function BookSuccessPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <main className="min-h-screen bg-gray-50 pt-32 pb-20 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full" />
        </main>
      }>
        <BookSuccessContent />
      </Suspense>
      <Footer />
    </>
  )
}
