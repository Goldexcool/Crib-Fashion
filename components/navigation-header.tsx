"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, ShoppingBag, X } from "lucide-react"
import { useCart } from "@/context/cart-context"

export default function NavigationHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()
  const { totalItems } = useCart()

  const navLinks = [
    { name: "Home", href: "/", description: "Return to homepage" },
    { name: "Shop", href: "/shop", description: "Browse our latest collection" },
    { name: "Lookbook", href: "/lookbook", description: "Explore the season's vision" },
    { name: "Collections", href: "/collections", description: "Our curated series" },
  ]

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
    setSearchOpen(false)
  }, [pathname])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (searchOpen) setSearchOpen(false)
        if (isOpen) setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen, isOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen || searchOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, searchOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
          scrolled ? "bg-black/80 backdrop-blur-sm py-3 shadow-lg shadow-black/20" : "bg-gradient-to-b from-black/80 to-transparent py-5"
        }`}
        style={{ zIndex: 40 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-lg">
                CRIB
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-1 py-2 transition-colors group ${
                    pathname.startsWith(link.href) ? "text-cyan-400" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span className={`absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 transition-transform duration-300 ${
                    pathname.startsWith(link.href) ? "bg-cyan-400 scale-x-100" : "bg-white group-hover:scale-x-100"
                  }`}></span>
                </Link>
              ))}
            </div>

            {/* Desktop Controls */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                className="text-gray-300 hover:text-white transition-colors p-2"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link href="/cart">
                <button className="text-gray-300 hover:text-white transition-colors p-2 relative" aria-label={`Cart with ${totalItems} items`}>
                  <ShoppingBag className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 text-[10px] flex items-center justify-center font-medium">
                      {totalItems}
                    </span>
                  )}
                </button>
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center space-x-3 md:hidden">
              <button
                className="text-gray-300 hover:text-white transition-colors p-2"
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link href="/cart">
                <button className="text-gray-300 hover:text-white transition-colors p-2 relative" aria-label={`Cart with ${totalItems} items`}>
                  <ShoppingBag className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 text-[10px] flex items-center justify-center font-medium">
                      {totalItems}
                    </span>
                  )}
                </button>
              </Link>
              
              {/* Simple Hamburger Button */}
              <button
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-50 w-10 h-10 flex items-center justify-center focus:outline-none"
                aria-expanded={isOpen}
                aria-label="Toggle menu"
              >
                <div className="w-6 flex flex-col items-end space-y-1.5">
                  <span className={`block h-0.5 bg-white transition-all duration-300 ${isOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
                  <span className={`block h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-4'}`}></span>
                  <span className={`block h-0.5 bg-white transition-all duration-300 ${isOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Simple Mobile Menu - No framer-motion */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 45 }}
        onClick={() => setIsOpen(false)}
      />

      <div 
        ref={menuRef}
        className={`fixed top-0 left-0 bottom-0 w-[280px] bg-gradient-to-br from-gray-900 to-black border-r border-white/10 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ zIndex: 50 }}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between px-6 py-8 border-b border-white/10">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
              CRIB
            </h2>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-3 py-6">
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name} className="transition-opacity duration-500 opacity-100">
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-start justify-between group px-4 py-3 rounded-lg transition-all ${
                      pathname.startsWith(link.href)
                        ? "bg-gradient-to-r from-cyan-500/20 to-transparent text-cyan-400 border-l-2 border-cyan-400"
                        : "text-gray-300 hover:bg-white/5 hover:text-white hover:border-l-2 hover:border-white/40"
                    }`}
                  >
                    <div>
                      <span className="block text-lg font-medium mb-1">{link.name}</span>
                      <span className="block text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                        {link.description}
                      </span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 mt-1 transition-all ${
                        pathname.startsWith(link.href) ? "text-cyan-400" : "text-gray-600 group-hover:text-gray-400"
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 mt-auto">
            <div className="grid grid-cols-2 gap-3">
             
            </div>
            
            <div className="mt-6 flex justify-center space-x-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Search Overlay - Simple CSS transitions */}
      <div 
        className={`fixed inset-0 bg-black/95 backdrop-blur-md flex items-start justify-center transition-opacity duration-300 ${
          searchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 60 }}
      >
        <div className="w-full max-w-2xl mt-32 px-4">
          <div className="flex items-center justify-end mb-6">
            <button 
              onClick={() => setSearchOpen(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="transition-all duration-300 transform">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full h-16 bg-transparent border-b-2 border-gray-800 focus:border-cyan-500 px-4 text-white text-xl focus:outline-none transition-colors placeholder:text-gray-600"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-cyan-500 transition-colors"
              >
                <Search className="w-6 h-6" />
              </button>
            </form>
          </div>

          <div className="mt-8 text-center">
            <div className="text-gray-500 text-sm">
              Press ESC to close
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
