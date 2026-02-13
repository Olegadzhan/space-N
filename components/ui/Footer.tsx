import Link from 'next/link'
import { Github, Twitter, Instagram, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-space-black to-gray-900/50 border-t border-neon-blue/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-deep-purple to-neon-blue flex items-center justify-center">
                <span className="text-white font-orbitron text-xl">🚀</span>
              </div>
              <span className="text-2xl font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-cosmic-pink">
                COSMIC
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Explore the wonders of the universe through interactive experiences and AI-powered creativity.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-blue transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-blue transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-blue transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-orbitron text-neon-blue mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/planets', label: 'Planets' },
                { href: '/music', label: 'Music' },
                { href: '/real-photos', label: 'Real Photos' },
                { href: '/generated-photos', label: 'AI Art' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-neon-blue transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-orbitron text-neon-blue mb-4">Features</h3>
            <ul className="space-y-2">
              {[
                '3D Planet Visualization',
                'AI Music Generation',
                'Real NASA Photos',
                'AI Image Creation',
                'Interactive Experience',
              ].map((feature, index) => (
                <li key={index}>
                  <span className="text-gray-400 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-orbitron text-neon-blue mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>contact@cosmic-portal.space</span>
              </li>
              <li>
                <a
                  href="https://github.com/yourusername/cosmic-portal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-neon-blue hover:text-cosmic-pink transition-colors"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neon-blue/10 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Cosmic Portal. All rights reserved. 
            Built with Next.js, Three.js, and AI technologies.
          </p>
        </div>
      </div>
    </footer>
  )
}
