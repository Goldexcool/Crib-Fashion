"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ShoppingBag, Heart } from "lucide-react"
import NavigationHeader from "@/components/navigation-header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"
import crib1 from "@/public/crib1.jpg"
import crib2 from "@/public/crib2.jpg"
import crib3 from "@/public/crib3.jpg"
import crib5 from "@/public/crib5.jpg"
import crib6 from "@/public/crib6.jpg"
import crib7 from "@/public/crib7.jpg"
import crib8 from "@/public/crib8.jpg"

// Updated product data to match the collection and lookbook naming
const products = [
  {
    id: 1,
    name: "Time velo edition",
    price: 25000,
    description:
      "The Time velo edition represents the pinnacle of futuristic streetwear. Crafted with our proprietary light-reactive fabric, this piece transforms its appearance based on ambient lighting conditions. The jacket features adaptive thermal regulation, keeping you comfortable in any environment.",
    features: [
      "Light-reactive outer shell",
      "Adaptive thermal regulation",
      "Water-repellent finish",
      "Concealed smart device pockets",
      "Embedded NFC connectivity",
    ],
    care: "Hand wash cold with similar colors. Do not bleach. Hang dry in shade. Do not iron directly on reflective elements.",
    images: [
      crib1,
      crib1,
      crib1,
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cyber Blue", "Neon Pink", "Stealth Black"],
    category: "Outerwear",
  },
  {
    id: 2,
    name: "Awakening edition",
    price: 25000,
    description:
      "The Awakening edition is designed for the digital native. This versatile piece features our signature adaptive materials that respond to your body temperature, providing optimal comfort in any setting.",
    features: [
      "Responsive thermal fabric",
      "Minimalist aesthetic design",
      "Anti-bacterial treatment",
      "Hidden utility pockets",
      "Reflective branding elements",
    ],
    care: "Machine wash cold. Tumble dry low. Do not bleach. Cool iron if needed.",
    images: [
      crib2,
      crib2,
      crib2,
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Obsidian", "Silver", "Crimson"],
    category: "Tops",
  },
  {
    id: 3,
    name: "Steeze 425 edition",
    price: 25000,
    description:
      "The Steeze 425 edition combines cutting-edge design with unparalleled comfort. These bottoms feature our proprietary stretch fabric that moves with you while maintaining structural integrity and a futuristic aesthetic.",
    features: [
      "Four-way stretch material",
      "Reinforced stress points",
      "Hidden zip pockets",
      "Moisture-wicking technology",
      "Adjustable fit system",
    ],
    care: "Machine wash cold with similar colors. Hang to dry. Do not iron decorative elements.",
    images: [
      crib3,
      crib3,
      crib3,
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Graphite", "Cobalt", "Ash"],
    category: "Bottoms",
  },
  {
    id: 4,
    name: "La crib da drop edition",
    price: 25000,
    description:
      "The La crib da drop edition is our flagship product featuring premium cotton fiber and futuristic design elements. This statement piece integrates our NFC technology, connecting your physical garment to its digital twin in the CRIB metaverse.",
    features: [
      "Premium cotton fiber construction",
      "NFC technology integration",
      "Digital authentication",
      "Access to exclusive digital content",
      "Temperature-regulating properties",
    ],
    care: "Gentle hand wash only. Lay flat to dry. Do not bleach or iron directly.",
    images: [
      crib7,
      crib7,
      crib7,
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Midnight", "Azure", "Eclipse"],
    category: "Tops",
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number.parseInt(params.id)) || products[0]
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0].src, 
      category: product.category,
    }
    
    addToCart(cartProduct, quantity, selectedColor, selectedSize)

    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedColor}, ${selectedSize}) has been added to your cart.`,
    })
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <NavigationHeader />

      <div className="container mx-auto px-4 py-32">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-900">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden ${
                    selectedImage === index ? "ring-2 ring-cyan-400" : "opacity-70"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-2xl text-cyan-400">₦{product.price.toLocaleString()}</p>
            </div>

            <p className="text-gray-300 leading-relaxed">{product.description}</p>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm text-gray-400 mb-3">COLOR</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full border ${
                        selectedColor === color
                          ? "border-cyan-400 text-cyan-400"
                          : "border-gray-700 text-gray-300 hover:border-gray-500"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm text-gray-400 mb-3">SIZE</h3>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center rounded-full border ${
                        selectedSize === size
                          ? "border-cyan-400 text-cyan-400"
                          : "border-gray-700 text-gray-300 hover:border-gray-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 border-gray-700 text-gray-300 hover:text-white hover:bg-white/10"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-900/50">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="care">Care</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="features" className="pt-4">
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <span className="text-cyan-400 text-xl leading-none">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="care" className="pt-4 text-gray-300">
                <p>{product.care}</p>
              </TabsContent>
              <TabsContent value="shipping" className="pt-4 text-gray-300">
                <p>Free worldwide shipping on all orders over ₦20,000. Standard delivery 3-5 business days.</p>
                <p className="mt-2">Express shipping available at checkout.</p>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
