'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, FeatureCard, TestimonialCard, StatsCard } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Heart, 
  Umbrella, 
  RefreshCcw,
  ArrowRight,
  CheckCircle2,
  Phone,
  Star,
  Clock,
  DollarSign,
  Users,
  Award,
  Headphones,
  FileText,
  TrendingUp,
} from 'lucide-react'
import Link from 'next/link'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

// Products Section
export function ProductsSection() {
  const products = [
    {
      title: 'Final Expense',
      description: 'Affordable coverage for end-of-life expenses. Protect your family from funeral costs and medical bills.',
      icon: Heart,
      href: '/products/final-expense',
      features: ['No medical exam', 'Coverage $5K-$50K', 'Fast approval'],
      color: 'bg-rose-500',
    },
    {
      title: 'Term Life Insurance',
      description: 'Straightforward protection for a specific period. Get the highest coverage at the lowest cost.',
      icon: Shield,
      href: '/products/term-life',
      features: ['10-30 year terms', 'Level premiums', 'Convertible options'],
      color: 'bg-blue-500',
    },
    {
      title: 'Indexed Universal Life',
      description: 'Flexible permanent coverage with cash value growth tied to market indices.',
      icon: TrendingUp,
      href: '/products/indexed-universal-life',
      features: ['Cash value growth', 'Tax advantages', 'Flexible premiums'],
      color: 'bg-emerald-500',
    },
    {
      title: 'Return of Premium',
      description: 'Get your premiums back if you outlive your policy. Protection with a money-back guarantee.',
      icon: RefreshCcw,
      href: '/products/return-of-premium',
      features: ['100% premium return', 'Level rates', 'Guaranteed benefit'],
      color: 'bg-amber-500',
    },
  ]

  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge variant="secondary" className="mb-4">Our Products</Badge>
          <h2 className="heading-2 text-brand-navy mb-4">
            Coverage Options For Every Stage of Life
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you're looking for affordable final expense coverage or comprehensive 
            wealth-building life insurance, we have the right solution for you.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {products.map((product) => (
            <motion.div key={product.title} variants={itemVariants}>
              <Card hover="lift" className="h-full flex flex-col">
                <div className={`w-14 h-14 ${product.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <product.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-brand-navy mb-2">
                  {product.title}
                </h3>
                <p className="text-muted-foreground mb-4 flex-grow">
                  {product.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" asChild className="mt-auto">
                  <Link href={product.href}>
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Why Choose Us Section
export function WhyChooseUsSection() {
  const reasons = [
    {
      icon: Clock,
      title: 'Quick & Easy',
      description: 'Get quotes in minutes, not hours. Our streamlined process saves you time.',
    },
    {
      icon: DollarSign,
      title: 'Competitive Rates',
      description: 'We shop multiple carriers to find you the best coverage at the best price.',
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Our licensed agents help you understand your options and make the right choice.',
    },
    {
      icon: Award,
      title: 'Top-Rated Carriers',
      description: 'We only work with A-rated insurance companies you can trust.',
    },
    {
      icon: Headphones,
      title: 'Lifetime Support',
      description: "We're here for you long after your policy is in place. Questions? Just call.",
    },
    {
      icon: FileText,
      title: 'No Obligation',
      description: 'Get your free quote with no pressure. Take your time to make the right decision.',
    },
  ]

  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="mb-4">Why GetCovered.Life</Badge>
            <h2 className="heading-2 text-brand-navy mb-6">
              Your Trusted Partner in <span className="text-brand-gold">Life Insurance</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              With over 15 years of experience, we've helped thousands of families 
              in Louisiana, Texas, and South Carolina secure the protection they need. 
              We're not just selling insurance – we're building relationships.
            </p>
            
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="relative h-48 rounded-xl overflow-hidden">
                <Image
                  src="/images/consultation.jpg"
                  alt="Insurance consultation"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden">
                <Image
                  src="/images/family-1.jpg"
                  alt="Happy family protected by life insurance"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="lg" asChild>
                <Link href="/quote">
                  Get Your Free Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Learn About Us</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Content - Feature Grid */}
          <motion.div 
            className="grid sm:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {reasons.map((reason) => (
              <motion.div 
                key={reason.title}
                variants={itemVariants}
                className="flex gap-4"
              >
                <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center shrink-0">
                  <reason.icon className="w-6 h-6 text-brand-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-navy mb-1">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Image Showcase Section
export function ImageShowcaseSection() {
  return (
    <section className="section-sm bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge variant="secondary" className="mb-4">Protecting Families</Badge>
          <h2 className="heading-2 text-brand-navy mb-4">
            Real Families, Real Protection
          </h2>
          <p className="text-lg text-muted-foreground">
            We help families across Louisiana, Texas, and South Carolina secure their financial future.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div 
            className="relative h-64 md:h-80 rounded-xl overflow-hidden col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/hero-family.jpg"
              alt="Beautiful family"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-semibold">Protecting Your Legacy</p>
              <p className="text-white/70 text-sm">Coverage for every stage of life</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative h-64 md:h-80 rounded-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/senior-couple.jpg"
              alt="Senior couple"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-semibold text-sm">Final Expense</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative h-64 md:h-80 rounded-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Image
              src="/images/family-2.jpg"
              alt="Young family"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white font-semibold text-sm">Term Life</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "GetCovered.Life made the entire process so simple. I had my final expense policy in place within a week, and the premium fit perfectly in my budget.",
      author: "Margaret Johnson",
      role: "Retired Teacher, Louisiana",
      rating: 5,
    },
    {
      quote: "As a father of three, I needed to make sure my family was protected. Jason found me a term policy with excellent coverage at a price I could afford.",
      author: "Michael Torres",
      role: "Small Business Owner, Texas",
      rating: 5,
    },
    {
      quote: "The IUL policy they recommended has been incredible. Not only do I have life insurance, but I'm building cash value for retirement too.",
      author: "Sarah Williams",
      role: "Healthcare Professional, South Carolina",
      rating: 5,
    },
  ]

  return (
    <section className="section bg-brand-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge variant="secondary" className="mb-4">Testimonials</Badge>
          <h2 className="heading-2 text-white mb-4">
            Real Stories From Real Families
          </h2>
          <p className="text-lg text-white/70">
            Don't just take our word for it. Here's what our clients have to say 
            about their experience with GetCovered.Life.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// CTA Section
export function CTASection() {
  return (
    <section className="section bg-gradient-to-br from-brand-gold to-brand-gold-600">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-2 text-brand-navy mb-6">
            Ready to Protect Your Family?
          </h2>
          <p className="text-xl text-brand-navy/80 mb-8">
            Get your free, no-obligation quote in minutes. 
            Our licensed agents are standing by to help you find the perfect coverage.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="xl" asChild>
              <Link href="/quote">
                Get Your Free Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="white" size="xl" asChild>
              <a href="tel:+18668116525">
                <Phone className="w-5 h-5 mr-2" />
                1-866-811-6525
              </a>
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-brand-navy/60">
            No spam. No pressure. Just honest advice.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// Carriers Section
export function CarriersSection() {
  const carriers = [
    { name: 'Americo', logo: '/images/carriers/americo.png' },
    { name: 'Mutual of Omaha', logo: '/images/carriers/mutual-omaha.png' },
    { name: 'Foresters', logo: '/images/carriers/foresters.png' },
    { name: 'AIG', logo: '/images/carriers/aig.png' },
    { name: 'Transamerica', logo: '/images/carriers/transamerica.png' },
    { name: 'National Life', logo: '/images/carriers/national-life.png' },
  ]

  return (
    <section className="section-sm bg-white border-y">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Trusted By Top Carriers
          </p>
          <h3 className="text-xl font-heading font-semibold text-brand-navy">
            We Work With America's Best Insurance Companies
          </h3>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
          {carriers.map((carrier) => (
            <div 
              key={carrier.name}
              className="h-12 w-32 bg-gray-200 rounded-lg flex items-center justify-center text-sm font-medium text-gray-500"
            >
              {carrier.name}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            href="/carriers" 
            className="text-brand-navy hover:text-brand-gold font-medium inline-flex items-center gap-2 transition-colors"
          >
            View All Carriers
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
