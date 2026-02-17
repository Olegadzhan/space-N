'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    setIsFirstLoad(false)
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: isFirstLoad ? 1 : 0, y: isFirstLoad ? 0 : 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1],
            delay: isFirstLoad ? 0 : 0.1
          }
        }}
        exit={{ 
          opacity: 0, 
          y: -20,
          transition: { duration: 0.4, ease: 'easeInOut' }
        }}
        className="relative"
      >
        {children}
        
        {!isFirstLoad && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.34, 1.56, 0.64, 1],
              delay: 0.2
            }}
            style={{ originX: 0 }}
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-deep-purple via-neon-blue to-cosmic-pink z-50"
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
