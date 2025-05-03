"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filter, ChevronDown } from "lucide-react"
import NavigationHeader from "@/components/navigation-header"
import ProductGrid from "@/components/product-grid"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"

export default function ShopPage() {
  const [priceRange, setPriceRange] = useState([0, 500])
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeSort, setActiveSort] = useState("Newest")

  const categories = ["All", "Jackets", "Hoodies", "T-Shirts", "Pants", "Accessories"]

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Shop Collection</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Explore our full range of futuristic apparel designed for the digital generation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">Filters:</span>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  className={`rounded-full border ${
                    activeCategory === category
                      ? "border-cyan-400 text-cyan-400"
                      : "border-gray-700 text-gray-300 hover:border-gray-500"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block text-sm text-gray-400">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="border border-gray-700">
                    <span className="mr-2">Sort: {activeSort}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 border border-gray-700">
                  {["Newest", "Price: Low to High", "Price: High to Low", "Popular"].map((option) => (
                    <DropdownMenuItem
                      key={option}
                      className="text-gray-300 hover:text-white focus:text-white cursor-pointer"
                      onClick={() => setActiveSort(option)}
                    >
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="mt-6 md:hidden">
            <div className="text-sm text-gray-400 mb-2">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </div>
            <Slider
              defaultValue={[0, 500]}
              max={500}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ProductGrid />
          <ProductGrid />

          <div className="mt-16 flex justify-center">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:bg-white/10">
              Load More Products
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
