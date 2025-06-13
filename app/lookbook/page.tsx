"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import NavigationHeader from "@/components/navigation-header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FaArrowRight } from "react-icons/fa"
import crib1 from "@/public/crib1.jpg"
import crib2 from "@/public/crib2.jpg"
import crib3 from "@/public/crib3.jpg"
import crib5 from "@/public/crib5.jpg"
import crib6 from "@/public/crib6.jpg"
import crib8 from "@/public/crib8.jpg"

export default function LookbookPage() {
  const [activeCollection, setActiveCollection] = useState("FW24")
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)

  const collections = ["FW24", "SS24", "FW23", "SS23", "Archive"]

  // Using real product data from the product grid
  const lookbookImages = [
    {
      id: 1,
      src: crib1,
      alt: "Time velo edition",
      price: 16000,
      category: "Outerwear",
      products: ["Time velo edition"],
    },
    {
      id: 2,
      src: crib2,
      alt: "Awakening edition",
      price: 16000,
      category: "Tops",
      products: ["Awakening edition"],
    },
    {
      id: 3,
      src: crib3,
      alt: "Steeze 425 edition",
      price: 21000,
      category: "Bottoms",
      products: ["Steeze 425 edition"],
    },
    {
      id: 4,
      src: crib5,
      alt: "La crib da drop edition",
      price: 22000,
      category: "Tops",
      products: ["La crib da drop edition"],
    },
    {
      id: 5,
      src: crib6,
      alt: "La crib da drop edition",
      price: 22000,
      category: "Tops",
      products: ["La crib da drop edition"],
    },
    {
      id: 6,
      src: crib8,
      alt: "Crib crop top for female",
      price: 7000,
      category: "Tops",
      products: ["Crib crop top for female"],
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Lookbook</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Explore our collections through curated visual stories that showcase the future of fashion.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collection Selector */}
      <section className="py-8 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {collections.map((collection) => (
              <Button
                key={collection}
                variant="ghost"
                className={`rounded-full border ${
                  activeCollection === collection
                    ? "border-cyan-400 text-cyan-400"
                    : "border-gray-700 text-gray-300 hover:border-gray-500"
                }`}
                onClick={() => setActiveCollection(collection)}
              >
                {collection}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Lookbook Grid with Product Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lookbookImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative aspect-[3/4] rounded-lg overflow-hidden"
                onMouseEnter={() => setHoveredImage(image.id)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <Link href={`/products/${image.id}`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Product tags with style from lookbook */}
                  <div className="absolute top-6 left-6 right-6 space-y-2">
                    <div className="inline-block px-3 py-1 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full text-sm text-cyan-400">
                      {image.category}
                    </div>
                  </div>

                  {/* Product info with style from product grid */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500">
                    <div className="flex justify-between items-end">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                          {image.products[0]}
                        </h3>
                        <p className="text-lg font-semibold text-white/90">₦{image.price}</p>
                      </div>

                      <div
                        className={`
                          w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center
                          transform transition-all duration-500
                          ${hoveredImage === image.id ? "scale-100 opacity-100" : "scale-50 opacity-0"}
                        `}
                      >
                        <FaArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="outline"
                        className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm border-white/30"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
