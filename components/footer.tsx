"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Instagram, Twitter, Youtube, Facebook, ArrowRight, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      // In a real app, you would send this to your API
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const footerLinks = [
    {
      title: "Shop",
      links: [
        // { name: "New Arrivals", href: "#" },
        { name: "Collections", href: "#" },
        { name: "Accessories", href: "#" },
        { name: "Sale", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQ", href: "#" },
        { name: "Shipping", href: "#" },
        { name: "Returns", href: "#" },
        // { name: "Contact", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Sustainability", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/01_cribsfashion?igsh=cXpwbTFiaTl3dzcw&utm_source=qr" },
    { icon: Twitter, href: "#" },
    { icon: Youtube, href: "#" },
    { icon: Facebook, href: "#" },
  ]

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
        <div className="space-y-6">
            <Link href="/" className="inline-block">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
              >
                CRIB
              </motion.h2>
            </Link>
            <p className="text-gray-400">
            This isn't just a fit—it's your voice stitched into fabric. Join the movement, wear your identity, and tag us to get featured. Let the streets know you've arrived.
              generation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5 text-gray-300" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, columnIndex) => (
            <div key={column.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-white">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: columnIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors inline-flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16 p-6 rounded-xl bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Join the CRIB Community</h3>
              <p className="text-gray-400">
                Subscribe to our newsletter for exclusive drops, events and digital experiences.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-black/50 border-white/10 focus-visible:ring-cyan-400 h-12 pr-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {subscribed && (
                  <div className="absolute inset-0 flex items-center justify-center bg-cyan-500/20 backdrop-blur-sm rounded-md">
                    <span className="text-cyan-400 font-medium">Thanks for subscribing!</span>
                  </div>
                )}
              </div>
              <Button
                type="submit"
                className="h-12 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2024 CRIB. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-300 text-sm">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
