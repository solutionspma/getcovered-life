import { Inter, Montserrat, Playfair_Display } from 'next/font/google'
import { Toaster } from 'sonner'
import '@/styles/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: 'GetCovered.Life | Covered Family Financial Services Inc.',
  description: 'Get affordable life insurance quotes in minutes. Final expense, term life, and indexed universal life insurance from top-rated carriers. Licensed insurance broker.',
  keywords: ['life insurance', 'final expense', 'term life', 'IUL', 'indexed universal life', 'insurance quotes', 'Covered Family Financial Services'],
  openGraph: {
    title: 'GetCovered.Life | Covered Family Financial Services Inc.',
    description: 'Get affordable life insurance quotes in minutes from top-rated carriers.',
    url: 'https://getcovered.life',
    siteName: 'GetCovered.Life - Covered Family Financial Services',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GetCovered.Life - Covered Family Financial Services',
    description: 'Get affordable life insurance quotes in minutes from top-rated carriers.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.jpg',
    apple: '/images/webclip.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${playfair.variable}`}>
      <head>
        <meta name="theme-color" content="#173860" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <Toaster 
          position="bottom-right" 
          richColors 
          closeButton
          toastOptions={{
            style: {
              fontFamily: 'var(--font-inter)',
            },
          }}
        />
      </body>
    </html>
  )
}
