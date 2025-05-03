import Link from "next/link"
import { ArrowRight } from "lucide-react"
import NavigationHeader from "@/components/navigation-header"
import HeroSection from "@/components/hero-section"
import ProductGrid from "@/components/product-grid"
import FeaturedCollection from "@/components/featured-collection"
import TechnologySection from "@/components/technology-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <NavigationHeader />
      <HeroSection />

      <section className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400">
            Latest Drops
          </h2>
          <Link
            href="/shop"
            className="group flex items-center gap-2 text-lg text-gray-300 hover:text-white transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <ProductGrid />
      </section>

      <FeaturedCollection />

      <TechnologySection />

      <Footer />
    </main>
  )
}
