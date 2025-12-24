'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Header, Footer } from '@/components/layout/header-footer'
import { Button } from '@/components/ui/button'
import { Card, StatsCard } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { VoiceAIWidget } from '@/components/voice/voice-ai-widget'
import { 
  Shield, 
  Heart, 
  Users, 
  Award,
  Target,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Quote,
} from 'lucide-react'

const stats = [
  { value: '15+', label: 'Years Experience', icon: Award },
  { value: '10,000+', label: 'Families Protected', icon: Shield },
  { value: '50+', label: 'Carrier Partners', icon: Briefcase },
  { value: '4.9', label: 'Customer Rating', icon: Heart },
]

const values = [
  {
    title: 'People First',
    description: 'Every recommendation starts with understanding your unique situation, not selling a product.',
    icon: Users,
  },
  {
    title: 'Transparency',
    description: 'We explain everything in plain English — no jargon, no hidden fees, no surprises.',
    icon: Target,
  },
  {
    title: 'Independence',
    description: 'We work with 50+ carriers so we can always find you the best fit, not just the most profitable.',
    icon: Shield,
  },
  {
    title: 'Relationships',
    description: 'We\'re here for the long haul — from your first policy to retirement planning and beyond.',
    icon: Briefcase,
  },
]

const team = [
  {
    name: 'Jason Harris',
    title: 'Founder & CEO',
    image: '/images/jason-harris.png',
    bio: '15+ years helping families secure their financial future. Author of The Insur-O-Gram.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="container mx-auto px-4 py-32 relative z-10">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Badge variant="gold" className="mb-6">About Us</Badge>
                <h1 className="heading-1 text-white mb-6">
                  Protecting Families,<br />
                  <span className="text-brand-gold">One Policy at a Time</span>
                </h1>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  We're not your typical insurance agency. We're a team of licensed professionals 
                  who believe that everyone deserves access to quality life insurance — without 
                  the pushy sales tactics or confusing jargon.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/quote">
                    <Button variant="secondary" size="xl">
                      Get Your Free Quote
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <StatsCard {...stat} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge variant="secondary" className="mb-4">Our Story</Badge>
                <h2 className="heading-2 text-brand-navy mb-6">
                  Born From a Simple Belief
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    GetCovered.Life was founded on a simple but powerful idea: everyone 
                    deserves straightforward, honest advice about life insurance. Too many 
                    families go without coverage — not because they can't afford it, but 
                    because the process feels overwhelming.
                  </p>
                  <p>
                    We set out to change that. We built a platform where you can get instant 
                    quotes, compare options from 50+ carriers, and work with licensed agents 
                    who genuinely care about finding you the right coverage.
                  </p>
                  <p>
                    Today, we've helped over 10,000 families protect their loved ones. And 
                    we're just getting started.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative h-[400px] rounded-2xl overflow-hidden"
              >
                <Image
                  src="/images/family-protected.jpg"
                  alt="Family protected by life insurance"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <Card padding="md" className="bg-white/95 backdrop-blur">
                    <div className="flex items-start gap-3">
                      <Quote className="w-8 h-8 text-brand-gold shrink-0" />
                      <div>
                        <p className="text-brand-navy font-medium italic">
                          "They made the whole process so easy. I finally have peace of mind 
                          knowing my family is protected."
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          — Sarah M., Tampa FL
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4">Our Values</Badge>
              <h2 className="heading-2 text-brand-navy mb-4">
                What We Stand For
              </h2>
              <p className="text-muted-foreground">
                These aren't just words on a wall — they guide every interaction we have.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card hover padding="lg" className="text-center h-full">
                    <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-brand-gold" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-brand-navy mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gradient-to-br from-brand-navy to-brand-navy-light">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge variant="gold" className="mb-4">Why Choose Us</Badge>
                <h2 className="heading-2 text-white mb-6">
                  The GetCovered.Life Difference
                </h2>
                <div className="space-y-4">
                  {[
                    'Free quotes from 50+ top-rated carriers',
                    'No high-pressure sales tactics — ever',
                    'Licensed agents with 15+ years experience',
                    'We find you the best price, not just any price',
                    'Support that lasts beyond the sale',
                    'Same-day coverage available',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
                      <span className="text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-xl font-heading font-semibold text-brand-navy mb-6">
                  Ready to Get Started?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Get your free, no-obligation quote in minutes. No spam, no pressure — 
                  just honest guidance.
                </p>
                <Link href="/quote">
                  <Button variant="secondary" size="lg" className="w-full">
                    Get Your Free Quote
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-brand-gold">
          <div className="container mx-auto px-4 text-center">
            <h2 className="heading-2 text-brand-navy mb-4">
              Questions? We're Here to Help.
            </h2>
            <p className="text-lg text-brand-navy/80 mb-8 max-w-2xl mx-auto">
              Whether you're ready to get started or just want to learn more, 
              our team is standing by.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+18668116525">
                <Button variant="primary" size="xl">
                  Call (800) 555-1234
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="outline" size="xl" className="border-brand-navy text-brand-navy hover:bg-brand-navy/10">
                  Send a Message
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <VoiceAIWidget />
      <Footer />
    </>
  )
}
