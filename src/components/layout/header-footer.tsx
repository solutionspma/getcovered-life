'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  Menu, 
  X, 
  Phone, 
  ChevronDown,
  Shield,
  Heart,
  Umbrella,
  Users,
} from 'lucide-react'

const navigation = [
  { 
    name: 'Products', 
    href: '/products',
    children: [
      { name: 'Final Expense', href: '/products/final-expense', icon: Heart, description: 'Affordable coverage for end-of-life expenses' },
      { name: 'Term Life', href: '/products/term-life', icon: Shield, description: 'Straightforward protection for your family' },
      { name: 'IUL Insurance', href: '/products/indexed-universal-life', icon: Umbrella, description: 'Flexible coverage with cash value growth' },
      { name: 'Return of Premium', href: '/products/return-of-premium', icon: Users, description: 'Get your premiums back if you outlive your policy' },
    ]
  },
  { name: 'Get a Quote', href: '/quote' },
  { name: 'Carriers', href: '/carriers' },
  { name: 'About', href: '/about' },
  { name: 'Book', href: '/book' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-brand-navy text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="hidden md:flex items-center gap-6">
            <span>Licensed Insurance Broker</span>
            <span>•</span>
            <span>Serving Louisiana, Texas & South Carolina</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="tel:+18668116525" 
              className="flex items-center gap-2 hover:text-brand-gold transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-semibold">1-866-811-6525</span>
            </a>
            <span className="hidden sm:inline text-white/50">|</span>
            <a 
              href="tel:+18888811057" 
              className="hidden sm:flex items-center gap-2 hover:text-brand-gold transition-colors"
            >
              <span className="font-semibold">1-888-881-1057</span>
              <span className="text-xs text-brand-gold">(Chico AI)</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo-horizontal.png"
                alt="Covered Family Financial Services Inc."
                width={200}
                height={60}
                className="h-14 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div 
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'px-4 py-2 rounded-lg font-medium text-brand-navy hover:text-brand-gold hover:bg-brand-gold/10 transition-all flex items-center gap-1',
                      item.name === 'Get a Quote' && 'bg-brand-gold text-brand-navy hover:bg-brand-gold-600 hover:text-brand-navy'
                    )}
                  >
                    {item.name}
                    {item.children && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {item.children && openDropdown === item.name && (
                    <div className="absolute top-full left-0 pt-2 w-80">
                      <div className="bg-white rounded-xl shadow-xl border p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-brand-gold/10 transition-colors"
                          >
                            <div className="w-10 h-10 bg-brand-navy/10 rounded-lg flex items-center justify-center shrink-0">
                              <child.icon className="w-5 h-5 text-brand-navy" />
                            </div>
                            <div>
                              <div className="font-medium text-brand-navy">{child.name}</div>
                              <div className="text-sm text-muted-foreground">{child.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" size="lg" asChild>
                <Link href="/careers">Become an Agent</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 rounded-lg font-medium text-brand-navy hover:bg-brand-gold/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-4 space-y-1 mt-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-brand-navy"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t space-y-2">
                <Button variant="secondary" fullWidth asChild>
                  <Link href="/quote">Get Your Free Quote</Link>
                </Button>
                <Button variant="outline" fullWidth asChild>
                  <Link href="/careers">Become an Agent</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-brand-navy text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <div className="mb-6">
              <Image
                src="/images/logo-horizontal.png"
                alt="Covered Family Financial Services Inc."
                width={220}
                height={70}
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-white/70 mb-6">
              Protecting families in Louisiana, Texas & South Carolina with affordable life insurance solutions. 
              Get the coverage you need at a price you can afford.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-brand-gold hover:text-brand-navy transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-brand-gold hover:text-brand-navy transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-brand-gold hover:text-brand-navy transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554v-11.452h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zm-15.11-13.019c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019h-3.564v-11.452h3.564v11.452zm15.106-20.452h-20.454c-.979 0-1.771.774-1.771 1.729v20.542c0 .956.792 1.729 1.771 1.729h20.451c.978 0 1.778-.773 1.778-1.729v-20.542c0-.955-.8-1.729-1.778-1.729z"/></svg>
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Products</h3>
            <ul className="space-y-3">
              <li><Link href="/products/final-expense" className="text-white/70 hover:text-brand-gold transition-colors">Final Expense Insurance</Link></li>
              <li><Link href="/products/term-life" className="text-white/70 hover:text-brand-gold transition-colors">Term Life Insurance</Link></li>
              <li><Link href="/products/indexed-universal-life" className="text-white/70 hover:text-brand-gold transition-colors">Indexed Universal Life</Link></li>
              <li><Link href="/products/return-of-premium" className="text-white/70 hover:text-brand-gold transition-colors">Return of Premium</Link></li>
              <li><Link href="/carriers" className="text-white/70 hover:text-brand-gold transition-colors">Our Carriers</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-white/70 hover:text-brand-gold transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-white/70 hover:text-brand-gold transition-colors">Become an Agent</Link></li>
              <li><Link href="/book" className="text-white/70 hover:text-brand-gold transition-colors">Insur-O-Gram Book</Link></li>
              <li><Link href="/contact" className="text-white/70 hover:text-brand-gold transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-white/70 hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-gold/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <div className="text-sm text-white/50">Main Line</div>
                  <a href="tel:+18668116525" className="font-semibold hover:text-brand-gold transition-colors">1-866-811-6525</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-gold/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <div className="text-sm text-white/50">Chico AI Broker</div>
                  <a href="tel:+18888811057" className="font-semibold hover:text-brand-gold transition-colors">1-888-881-1057</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-gold/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-white/50">Email Us</div>
                  <a href="mailto:info@getcovered.life" className="font-semibold hover:text-brand-gold transition-colors">info@getcovered.life</a>
                </div>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-white/10 rounded-xl">
              <div className="text-sm text-white/70 mb-2">Business Hours</div>
              <div className="font-medium">Mon - Fri: 9AM - 6PM EST</div>
              <div className="text-sm text-white/50">Sat: 10AM - 2PM EST</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <div>
              © {currentYear} Covered Family Financial Services Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/disclosures" className="hover:text-white transition-colors">Disclosures</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
