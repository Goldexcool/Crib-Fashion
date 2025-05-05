"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import NavigationHeader from "@/components/navigation-header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import crib1 from "@/public/crib1.jpg"
import crib2 from "@/public/crib2.jpg"
import crib3 from "@/public/crib3.jpg"
import crib5 from "@/public/crib5.jpg"

export default function CollectionsPage() {
  const collections = [
    {
      id: "nexus",
      name: "La Crib Collection",
      description:
        "Discover collections that speak your language—relaxed fits, premium textures, and cuts that command attention. Comfort is our code. Elegance is our edge.",
      image: crib1,
      link: "/shop?collection=nexus",
      featured: "Time velo edition",
      price: "₦15,000"
    },
    {
      id: "quantum",
      name: "Steeze Series",
      description:
        "Inspired by quantum computing, this collection features reactive patterns and adaptive materials that respond to environmental changes.",
      image: crib3,
      link: "/shop?collection=quantum",
      featured: "Steeze 425 edition",
      price: "₦20,000"
    },
    {
      id: "neural",
      name: "La Crib Collection",
      description:
        "Our most technologically advanced collection, featuring garments with embedded sensors that learn and adapt to your movement patterns.",
      image: crib5,
      link: "/shop?collection=neural",
      featured: "La crib da drop edition",
      price: "₦21,000"
    },
    {
      id: "archive",
      name: "Awakening Series",
      description:
        "A curated selection of our most iconic pieces from past collections, reimagined with new materials and technologies.",
      image: crib2,
      link: "/shop?collection=archive",
      featured: "Awakening edition", 
      price: "₦15,000"
    },
  ]

  return (
    <main className="min-h-screen bg-black text-white">
      <NavigationHeader />

      {/* Hero Banner */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Collections</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Explore our curated collections, each representing a unique vision of the future of fashion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-32">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:grid-flow-dense" : ""}`}
              >
                <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div className="inline-block px-3 py-1 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full text-sm text-cyan-400 mb-2">
                      FEATURED: {collection.featured}
                    </div>
                    
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                      {collection.name}
                    </h2>
                    
                    <p className="text-lg text-gray-300">{collection.description}</p>
                    
                    <p className="text-lg font-semibold text-white/90">Starting from {collection.price}</p>
                    
                    <Link href={collection.link}>
                      <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white group">
                        Explore Collection
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>

                <div className={index % 2 === 1 ? "md:col-start-1" : ""}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative aspect-[4/5] rounded-lg overflow-hidden group"
                  >
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="inline-block text-sm font-medium text-cyan-400 mb-2">VIEW PRODUCTS</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transform transition-all duration-500 opacity-0 group-hover:opacity-100">
                          <ArrowRight className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
