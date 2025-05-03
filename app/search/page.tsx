"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, Search } from "lucide-react"
import NavigationHeader from "@/components/navigation-header"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Sample product data - in a real app, you would fetch this from an API
const allProducts = [
  {
    id: 1,
    name: "Neon Flux Jacket",
    price: 249.99,
    image: "/placeholder.svg?height=600&width=500",
    category: "Outerwear",
  },
  {
    id: 2,
    name: "Digital Wave Hoodie",
    price: 189.99,
    image: "/placeholder.svg?height=600&width=500",
    category: "Tops",
  },
  {
    id: 3,
    name: "Cyber Cargo Pants",
    price: 159.99,
    image: "/placeholder.svg?height=600&width=500",
    category: "Bottoms",
  },
  {
    id: 4,
    name: "Quantum Mesh Tee",
    price: 89.99,
    image: "/placeholder.svg?height=600&width=500",
    category: "Tops",
  },
  {
    id: 5,
    name: "Holographic Bomber",
    price: 279.99,
    image: "/placeholder.svg?height=600&width=500",
    category: "Outerwear",
  },
  {
    id: 6,
    name: "Neural Link Sweater",
    price: 149.99,
    image: "/placeholder.svg?height=600&width=500",
    category: "Tops",
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [searchResults, setSearchResults] = useState<typeof allProducts>([])

  useEffect(() => {
    if (query) {
      const results = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <NavigationHeader />

      <div className="container mx-auto px-4 py-32">
        <div className="max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-6">Search Results</h1>
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border-white/10 focus-visible:ring-cyan-400 h-12 pl-12"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Button type="submit" className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10" variant="ghost">
              Search
            </Button>
          </form>
        </div>

        {query ? (
          <>
            <div className="mb-8">
              <p className="text-gray-400">
                {searchResults.length} results for <span className="text-white">"{query}"</span>
              </p>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchResults.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link href={`/products/${product.id}`}>
                      <div className="group relative overflow-hidden rounded-lg bg-gray-900 aspect-[4/5]">
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
                              <span className="inline-block text-xs font-medium text-cyan-400 mb-2">
                                {product.category}
                              </span>
                              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                                {product.name}
                              </h3>
                              <p className="text-lg font-semibold text-white/90">${product.price}</p>
                            </div>

                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transform transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 opacity-0 scale-50">
                              <ArrowRight className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">No results found</h2>
                <p className="text-gray-400 mb-8">
                  We couldn't find any products matching "{query}". Try a different search term.
                </p>
                <Link href="/shop">
                  <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
                    Browse All Products
                  </Button>
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Enter a search term</h2>
            <p className="text-gray-400 mb-8">Type in the search box above to find products.</p>
            <Link href="/shop">
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
                Browse All Products
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
