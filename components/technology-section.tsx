"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import crib5 from "@/public/crib5.jpg"
import crib6 from "@/public/crib6.jpg"
import crib7 from "@/public/crib7.jpg"
import crib8 from "@/public/crib8.jpg"

export default function TechnologySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const techFeatures = [
    {
      id: "materials",
      title: "Advanced Materials",
      description:
        "Our proprietary fabrics blend nano-tech fibers with sustainable materials, creating garments that adapt to your environment while minimizing ecological impact.",
      image: crib5,
    },
    {
      id: "connectivity",
      title: "Digital Connectivity",
      description:
        "Each CRIB piece contains embedded NFC technology, connecting your physical garment to its digital twin in the CRIB ecosystem, unlocking exclusive content and experiences.",
      image: crib6,
    },
    {
      id: "customization",
      title: "Adaptive Customization",
      description:
        "Our app allows you to customize certain elements of your garments, from color-shifting patterns to interactive lighting elements that respond to music or movement.",
      image: crib8,
    },
  ]

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_70%)]" />
      </div>

      <motion.div style={{ opacity, scale }} className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
              FUTURE TECH FASHION
            </h2>
            <p className="text-lg text-gray-300">
              At CRIB, we're not just creating clothing. We're engineering the future of fashion through innovative
              technology and sustainable practices.
            </p>
          </motion.div>
        </div>

        <Tabs defaultValue="materials" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-black/50 border border-white/10 backdrop-blur-sm">
              {techFeatures.map((feature) => (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-cyan-400"
                >
                  {feature.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {techFeatures.map((feature) => (
            <TabsContent key={feature.id} value={feature.id}>
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <h3 className="text-3xl font-bold text-white">{feature.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{feature.description}</p>

                  <div className="pt-4">
                    <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
                      Learn More
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <div className="relative h-[400px] rounded-lg overflow-hidden border border-white/10 group">
                    <Image
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />

                    {/* Interactive Elements */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 animate-pulse-glow">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full" />
                      </div>
                    </div>

                    {/* Feature Points */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full text-xs text-cyan-400"
                          >
                            Feature {i + 1}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "60%", label: "Sustainable Materials" },
            { value: "24mo", label: "Product Lifespan" },
            { value: "100%", label: "Digital Integration" },
            { value: "0", label: "Carbon Footprint" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
