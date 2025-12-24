'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Header, Footer } from '@/components/layout/header-footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { VoiceAIWidget } from '@/components/voice/voice-ai-widget'
import { 
  Shield, 
  DollarSign, 
  Clock,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
} from 'lucide-react'

const benefits = [
  { icon: DollarSign, title: 'Unlimited Earning', description: 'Commission-based with no cap on your income potential' },
  { icon: Clock, title: 'Flexible Schedule', description: 'Work when you want, where you want' },
  { icon: Users, title: 'Mentorship', description: 'Learn from experienced agents who close $1M+ annually' },
  { icon: TrendingUp, title: 'Growth Path', description: 'Clear advancement from agent to agency owner' },
  { icon: GraduationCap, title: 'Training', description: 'Comprehensive training program at no cost to you' },
  { icon: Heart, title: 'Make a Difference', description: 'Help families protect their loved ones' },
]

const positions = [
  {
    title: 'Life Insurance Agent',
    type: 'Full-Time / Part-Time',
    location: 'Remote',
    experience: 'Entry Level',
    description: 'Help families secure their financial future with quality life insurance products.',
    requirements: [
      'Must obtain life insurance license (we help!)',
      'Strong communication skills',
      'Self-motivated and goal-oriented',
      'Computer and internet access',
    ],
  },
  {
    title: 'Senior Agent / Team Lead',
    type: 'Full-Time',
    location: 'Remote',
    experience: '2+ Years',
    description: 'Lead a team of agents while maintaining your own book of business.',
    requirements: [
      'Active life insurance license',
      '2+ years of life insurance sales experience',
      'Proven track record of $100K+ annual production',
      'Leadership and mentoring abilities',
    ],
  },
]

export default function CareersPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy overflow-hidden">
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
                <Badge variant="gold" className="mb-6">We're Hiring</Badge>
                <h1 className="heading-1 text-white mb-6">
                  Build Your <span className="text-brand-gold">Insurance Career</span> With Us
                </h1>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  Join a team of top-producing agents who are changing lives through 
                  quality life insurance. No experience? No problem — we'll train you.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#positions">
                    <Button variant="secondary" size="xl">
                      View Open Positions
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </a>
                  <Link href="/contact">
                    <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10">
                      Ask Questions
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4">Why Join Us?</Badge>
              <h2 className="heading-2 text-brand-navy mb-4">
                More Than Just a Job
              </h2>
              <p className="text-muted-foreground">
                We invest in your success with comprehensive support, training, and resources.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card hover padding="lg" className="h-full">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-brand-gold" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-brand-navy mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Earnings Potential */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge variant="secondary" className="mb-4">Earnings Potential</Badge>
                <h2 className="heading-2 text-brand-navy mb-6">
                  Your Income, Your Control
                </h2>
                <p className="text-muted-foreground mb-8">
                  Our agents earn based on their effort and results. Top performers 
                  regularly exceed six figures in annual income.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
                    <div className="text-2xl font-bold text-brand-navy">$50K-$75K</div>
                    <div className="text-sm text-muted-foreground">First Year (Part-Time)</div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
                    <div className="text-2xl font-bold text-brand-navy">$100K-$150K</div>
                    <div className="text-sm text-muted-foreground">Year 2-3 (Full-Time)</div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-brand-gold/10 rounded-xl border-2 border-brand-gold">
                    <div className="text-2xl font-bold text-brand-navy">$200K+</div>
                    <div className="text-sm text-brand-navy">Top Performers</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card padding="lg" className="bg-brand-navy text-white">
                  <h3 className="text-xl font-heading font-semibold mb-6">
                    What Our Top Agents Say
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center shrink-0">
                        <span className="text-brand-navy font-bold text-sm">JM</span>
                      </div>
                      <div>
                        <p className="text-white/80 italic mb-2">
                          "I went from making $40K at my corporate job to over $150K in my 
                          second year. The training and support here is unmatched."
                        </p>
                        <p className="text-sm text-brand-gold">— James M., Senior Agent</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center shrink-0">
                        <span className="text-brand-navy font-bold text-sm">SP</span>
                      </div>
                      <div>
                        <p className="text-white/80 italic mb-2">
                          "The flexibility is incredible. I work from home and still have 
                          time for my kids. Best decision I ever made."
                        </p>
                        <p className="text-sm text-brand-gold">— Sarah P., Agent</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="positions" className="py-20 bg-white scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="secondary" className="mb-4">Open Positions</Badge>
              <h2 className="heading-2 text-brand-navy mb-4">
                Join Our Team
              </h2>
              <p className="text-muted-foreground">
                We're always looking for motivated individuals ready to build a career.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {positions.map((position, index) => (
                <motion.div
                  key={position.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card padding="lg">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="text-xl font-heading font-semibold text-brand-navy">
                            {position.title}
                          </h3>
                          <div className="flex gap-2">
                            <Badge variant="outline">{position.type}</Badge>
                            <Badge variant="secondary">{position.experience}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <MapPin className="w-4 h-4" />
                          {position.location}
                        </div>
                        <p className="text-muted-foreground mb-4">
                          {position.description}
                        </p>
                        <div className="space-y-2">
                          {position.requirements.map((req) => (
                            <div key={req} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Link href="/contact?subject=agent" className="shrink-0">
                        <Button variant="secondary" size="lg">
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-brand-gold">
          <div className="container mx-auto px-4 text-center">
            <h2 className="heading-2 text-brand-navy mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-brand-navy/80 mb-8 max-w-2xl mx-auto">
              Take the first step toward a rewarding career in life insurance. 
              Apply today and we'll be in touch within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact?subject=agent">
                <Button variant="primary" size="xl">
                  Apply Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:+18668116525">
                <Button variant="outline" size="xl" className="border-brand-navy text-brand-navy hover:bg-brand-navy/10">
                  Call (800) 555-1234
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <VoiceAIWidget />
      <Footer />
    </>
  )
}
