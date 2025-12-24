import { Header, Footer } from '@/components/layout/header-footer'
import { HeroSection } from '@/components/sections/hero-section'
import { 
  ProductsSection, 
  WhyChooseUsSection, 
  TestimonialsSection, 
  CTASection,
  CarriersSection,
  ImageShowcaseSection,
} from '@/components/sections/home-sections'
import { VoiceAIWidget } from '@/components/voice/voice-ai-widget'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CarriersSection />
        <ProductsSection />
        <ImageShowcaseSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <VoiceAIWidget 
        agentName="Chico"
        greeting="Hi! I'm Chico, your AI insurance broker assistant. I can help you understand your life insurance options and get a free quote. What questions do you have?"
      />
    </>
  )
}
