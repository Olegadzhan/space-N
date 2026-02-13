import type { Metadata } from 'next'
import { Orbitron, Space_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import StarBackground from '@/components/cosmic/StarBackground'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-orbitron',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
})

export const metadata: Metadata = {
  title: 'Cosmic Portal | Journey Through the Universe',
  description: 'Explore the cosmos with interactive 3D planets, AI-generated music, and stunning space imagery',
  keywords: ['space', 'planets', 'cosmos', 'astronomy', 'AI music', '3D visualization'],
  authors: [{ name: 'Cosmic Portal Team' }],
  openGraph: {
    title: 'Cosmic Portal',
    description: 'Interactive cosmic exploration platform',
    type: 'website',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cosmic Portal',
    description: 'Explore the universe with AI',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${spaceMono.variable}`}>
      <body className="min-h-screen bg-space-black text-star-white overflow-x-hidden">
        <StarBackground />
        <div className="relative z-10">
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
