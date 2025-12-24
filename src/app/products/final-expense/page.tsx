import { Header, Footer } from '@/components/layout/header-footer'
import { VoiceAIWidget } from '@/components/voice/voice-ai-widget'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { 
  Heart, 
  CheckCircle2, 
  ArrowRight, 
  Phone,
  Shield,
  Clock,
  DollarSign,
  FileText,
  Users,
} from 'lucide-react'

export const metadata = {
  title: 'Final Expense Insurance | GetCovered.Life',
  description: 'Affordable final expense insurance to cover funeral costs, medical bills, and other end-of-life expenses. Get quotes from top carriers with no medical exam required.',
}

export default function FinalExpensePage() {
  const benefits = [
    {
      icon: Shield,
      title: 'No Medical Exam',
      description: 'Most plans don\'t require a medical exam. Just answer a few health questions.',
    },
    {
      icon: Clock,
      title: 'Fast Approval',
      description: 'Get approved in as little as 24-48 hours with some carriers.',
    },
    {
      icon: DollarSign,
      title: 'Affordable Premiums',
      description: 'Coverage starting at just $20-30 per month for most applicants.',
    },
    {
      icon: FileText,
      title: 'Guaranteed Acceptance',
      description: 'Options available even if you\'ve been declined elsewhere.',
    },
  ]

  const coverageOptions = [
    { amount: '$5,000', monthlyFrom: '$15', description: 'Basic coverage for cremation services' },
    { amount: '$10,000', monthlyFrom: '$25', description: 'Standard funeral coverage' },
    { amount: '$15,000', monthlyFrom: '$35', description: 'Traditional burial with services' },
    { amount: '$25,000', monthlyFrom: '$50', description: 'Premium coverage with extras' },
    { amount: '$35,000', monthlyFrom: '$70', description: 'Comprehensive final expenses' },
    { amount: '$50,000', monthlyFrom: '$95', description: 'Maximum protection available' },
  ]

  const faqs = [
    {
      question: 'What does final expense insurance cover?',
      answer: 'Final expense insurance covers end-of-life costs including funeral services, burial or cremation, medical bills, outstanding debts, and other final expenses your family may face.',
    },
    {
      question: 'Do I need a medical exam?',
      answer: 'Most final expense policies don\'t require a medical exam. You\'ll answer a few health questions on the application, and approval is often within 24-48 hours.',
    },
    {
      question: 'What ages qualify for final expense insurance?',
      answer: 'Most carriers offer final expense coverage for ages 50-85, though some have options starting at age 40.',
    },
    {
      question: 'How soon does coverage start?',
      answer: 'Most policies provide immediate full coverage. Some plans may have a 2-year waiting period if you have significant health issues.',
    },
    {
      question: 'Can I be declined?',
      answer: 'While some health conditions may affect approval, we work with multiple carriers and often find options even for those with health challenges. We also offer guaranteed issue policies.',
    },
  ]

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-navy via-brand-navy-600 to-brand-navy-700 pt-32 pb-20">
          <div className="absolute inset-0 hero-pattern opacity-30" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <Badge variant="secondary" className="mb-6">
                  <Heart className="w-4 h-4 mr-2" />
                  Final Expense Insurance
                </Badge>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Protect Your Family From
                  <span className="text-brand-gold block">Unexpected Costs</span>
                </h1>
                <p className="text-xl text-white/80 mb-8">
                  Affordable whole life insurance designed to cover funeral expenses, 
                  medical bills, and other final costs. No medical exam required for most applicants.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button variant="secondary" size="xl" asChild>
                    <Link href="/quote?type=final-expense">
                      Get Your Free Quote
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="glass" size="xl" asChild>
                    <a href="tel:+18668116525">
                      <Phone className="w-5 h-5 mr-2" />
                      1-866-811-6525
                    </a>
                  </Button>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                    <span>No medical exam</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                    <span>Coverage in 24-48 hours</span>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-heading font-bold text-brand-navy mb-6">
                  Why Families Choose Us
                </h3>
                <div className="space-y-6">
                  {[
                    { value: '50,000+', label: 'Families Protected' },
                    { value: '$15/mo', label: 'Starting Premium' },
                    { value: '24 Hours', label: 'Average Approval Time' },
                    { value: '4.9/5', label: 'Customer Rating' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between pb-4 border-b last:border-0">
                      <span className="text-muted-foreground">{stat.label}</span>
                      <span className="text-2xl font-bold text-brand-navy">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="heading-2 text-brand-navy mb-4">
                Why Choose Final Expense Insurance?
              </h2>
              <p className="text-lg text-muted-foreground">
                Don't leave your family with the burden of funeral costs and medical bills. 
                Final expense insurance provides peace of mind at an affordable price.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit) => (
                <Card key={benefit.title} hover="lift" className="text-center">
                  <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-brand-gold" />
                  </div>
                  <h3 className="text-lg font-semibold text-brand-navy mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage Options */}
        <section className="section bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="secondary" className="mb-4">Coverage Options</Badge>
              <h2 className="heading-2 text-brand-navy mb-4">
                Choose the Right Coverage for You
              </h2>
              <p className="text-lg text-muted-foreground">
                Final expense coverage from $5,000 to $50,000. Find the right amount to cover your needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coverageOptions.map((option) => (
                <Card key={option.amount} hover="glow" className="relative overflow-hidden">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-brand-navy mb-1">{option.amount}</div>
                    <div className="text-sm text-muted-foreground mb-4">{option.description}</div>
                    <div className="text-lg">
                      Starting at <span className="font-bold text-brand-gold">{option.monthlyFrom}</span>/month
                    </div>
                  </div>
                  <Button variant="outline" fullWidth className="mt-6" asChild>
                    <Link href={`/quote?type=final-expense&amount=${option.amount}`}>
                      Get Quote
                    </Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="secondary" className="mb-4">FAQ</Badge>
              <h2 className="heading-2 text-brand-navy mb-4">
                Common Questions About Final Expense
              </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} padding="lg">
                  <h3 className="text-lg font-semibold text-brand-navy mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-brand-navy">
          <div className="container mx-auto px-4 text-center">
            <h2 className="heading-2 text-white mb-6">
              Ready to Protect Your Family?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Get your free final expense quote in minutes. No obligation, no pressure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="xl" asChild>
                <Link href="/quote?type=final-expense">
                  Get Your Free Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="glass" size="xl" asChild>
                <a href="tel:+18668116525">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <VoiceAIWidget agentName="Sarah" />
    </>
  )
}
