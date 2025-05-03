"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import cribhero1 from "@/public/cribhome2.jpg"
import cribhero2 from "@/public/cribhome.jpg"
import cribhero3 from "@/public/cribhome3.jpg"

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const heroImages = [cribhero1, cribhero2, cribhero3]
  
  // Image slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000) 
    
    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
            <Image
              src={heroImages[currentImage]}
              alt={`Crib Brand Background ${currentImage + 1}`}
              fill
              className="object-cover"
              style={{
                objectPosition: 'center 40%', 
                width: '100%',
              }}
              sizes="100vw"
              priority
              quality={95}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </motion.div>
      </AnimatePresence>

      {/* Image indicators */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentImage === index 
                ? "bg-white w-6" 
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`View slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div className="mb-6">
            <motion.span 
              className="block text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              CRIB
            </motion.span>
            <motion.span 
              className="text-2xl md:text-3xl font-light tracking-widest"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              LA CRIB DA DRIP
            </motion.span>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Elevating streetwear to new dimensions with cutting-edge designs and innovative materials for the digital
            generation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 w-full sm:w-auto"
              >
                Shop Collection
              </Button>
            </Link>
            <Link href="/lookbook">
              <Button
                variant="outline"
                size="lg"
                className="border-gray-500 text-white hover:bg-white/10 hover:text-white w-full sm:w-auto"
              >
                Explore Lookbook
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}
