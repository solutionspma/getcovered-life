'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  CheckCircle2, 
  ArrowRight, 
  Phone,
  Star,
  Users,
  Award,
} from 'lucide-react'
import { QuickQuoteForm } from './quick-quote-form'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient hero-pattern" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
                <Star className="w-4 h-4 mr-2 fill-brand-navy" />
                Rated 4.9/5 by 2,000+ Families
              </Badge>
            </motion.div>

            {/* Headline */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Protect What
              <span className="text-brand-gold block">Matters Most</span>
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-xl">
              Get affordable life insurance quotes in minutes. Compare rates from 
              top-rated carriers and find the perfect coverage for your family.
            </p>

            {/* Trust Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                'No medical exam options',
                'Coverage from $5,000 - $1M+',
                'Instant quotes online',
                'Serving LA, TX & SC',
              ].map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
                  <span className="text-white/90">{point}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button variant="secondary" size="xl" className="group">
                Get Your Free Quote
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="glass" size="xl" asChild>
                <a href="tel:+18668116525">
                  <Phone className="w-5 h-5 mr-2" />
                  1-866-811-6525
                </a>
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12 flex items-center gap-6"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-brand-gold/20 border-2 border-white/20 flex items-center justify-center text-xs font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="font-semibold">Join 50,000+ families</div>
                <div className="text-sm text-white/60">who trust GetCovered.Life</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Quote Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <QuickQuoteForm />
          </motion.div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '$500M+', label: 'Coverage Placed', icon: Shield },
              { value: '50,000+', label: 'Families Protected', icon: Users },
              { value: '15+', label: 'Years Experience', icon: Award },
              { value: '4.9/5', label: 'Customer Rating', icon: Star },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-brand-gold/20 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-brand-gold" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
