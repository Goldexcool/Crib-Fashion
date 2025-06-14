"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import crib1 from "@/public/crib1.jpg"
import crib2 from "@/public/crib2.jpg"
import crib3 from "@/public/crib3.jpg"
import crib4 from "@/public/crib4.jpg"
import crib5 from "@/public/crib5.jpg"
import crib6 from "@/public/crib6.jpg"
import crib7 from "@/public/crib7.jpg"
import crib8 from "@/public/crib8.jpg"


// Add a quick add to cart button to the product grid

// Add these imports at the top:
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"

// Sample product data
const products = [
  {
    id: 1,
    name: "Time velo edition",
    price: 25000,
    image: crib1,
    category: "Outerwear",
  },
  {
    id: 2,
    name: "Awakening edition",
    price: 25000,
    image: crib2,
    category: "Tops",
  },
  {
    id: 3,
    name: "Steeze 425 edition",
    price: 21000,
    image: crib3,
    category: "Bottoms",
  },
  {
    id: 4,
    name: "La crib da drop edition",
    price: 25000,
    image: crib5,
    category: "Tops",
  },
  {
    id: 5,
    name: "La crib da drop edition",
    price: 25000,
    image: crib6,
    category: "Tops",
  },
  {
    id: 6,
    name: "Crib crop top for female",
    price: 10000,
    image: crib8,
    category: "Tops",
  },
]

export default function ProductGrid() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  const { addToCart } = useCart()
  const { toast } = useToast()

  const quickAddToCart = (product: any, event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    // Add with default size and color
    addToCart(product, 1, "Default", "M")

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group"
        >
          <Link href={`/products/${product.id}`}>
            <div
              className="relative overflow-hidden rounded-lg bg-gray-900 aspect-[4/5]"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 ease-out">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="inline-block text-xs font-medium text-cyan-400 mb-2">{product.category}</span>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-lg font-semibold text-white/90">N{product.price}</p>
                  </div>

                  <div
                    className={`
                    w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center
                    transform transition-all duration-500
                    ${hoveredProduct === product.id ? "scale-100 opacity-100" : "scale-50 opacity-0"}
                  `}
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    onClick={(e) => quickAddToCart(product, e)}
                    className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-sm py-1"
                  >
                    <ShoppingBag className="w-3 h-3 mr-2" />
                    Quick Add
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
