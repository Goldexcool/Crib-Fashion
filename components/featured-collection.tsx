"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import crib7 from "@/public/crib7.jpg"
import { IoMdMan } from "react-icons/io"
import { FaArrowRight } from "react-icons/fa"

export default function FeaturedCollection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div style={{ opacity }} className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            LA CRIB DA DRIP EDITION
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Discover collections that speak your language—relaxed fits, premium textures, and cuts that command attention. Comfort is our code. Elegance is our edge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <motion.div
            style={{ y: y1 }}
            className="relative h-[600px] rounded-lg overflow-hidden group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image src={crib7} alt="Nexus Collection" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="inline-block text-sm font-medium text-cyan-400 mb-2">FEATURED</span>
              <h3 className="text-2xl font-bold text-white mb-2">La crib da drop edition</h3>
              <p className="text-gray-300 mb-4">FUTURISTIC DESIGN WITH PREMIUM COTTON FIBER</p>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 group">
                Explore <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>

          <motion.div style={{ y: y2 }} className="space-y-8">
            <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <h3 className="text-xl font-bold mb-4 text-white">The Vibe</h3>
              <p className="text-gray-300">
                “Drip Without Compromise.”
                Discover collections that speak your language—relaxed fits, premium textures, and cuts that command attention. Comfort is our code. Elegance is our edge.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-gradient-to-r from-purple-900/30 to-cyan-900/30 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:from-purple-900/40 hover:to-cyan-900/40 hover:border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">The Craft</h3>
                <IoMdMan className="text-cyan-400 text-xl" />
              </div>
              <p className="text-gray-300 mb-3">
                “Tailored for Chaos. Styled for Comfort.”
                Every piece is engineered for everyday rebellion. From hoodie to hem, we blend soft-core comfort with street-bred structure—because style shouldn’t come with sacrifice.
              </p>
              <div className="mt-4 bg-black/30 p-3 rounded border border-cyan-900/50 text-xs text-gray-400">
                Owners gain access to members-only events, limited drops, and digital wearables for your virtual avatar.
              </div>
            </div>

            <div className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              <h3 className="text-xl font-bold mb-4 text-white">The Challenge</h3>
              <p className="text-gray-300">
                “Show Up. Stand Out. #NoteTheCrib”
                This isn’t just a fit—it’s your voice stitched into fabric. Join the movement, wear your identity, and tag us to get featured. Let the streets know you’ve arrived.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
