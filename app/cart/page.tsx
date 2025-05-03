"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Copy, CheckCircle } from "lucide-react"
import NavigationHeader from "@/components/navigation-header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart, formatPrice } = useCart()
  const { toast } = useToast()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [name, setName] = useState("")
  const [showFallback, setShowFallback] = useState(false)
  const [orderMessage, setOrderMessage] = useState("")
  const [confirmationMessage, setConfirmationMessage] = useState("")
  const [orderSent, setOrderSent] = useState(false)
  const [confirmationSent, setConfirmationSent] = useState(false)

  // Format price with Naira symbol
  const formatNairaPrice = (price: number) => {
    return `₦${price.toLocaleString()}`
  }

  const generateMessages = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to proceed",
        variant: "destructive",
      })
      return null
    }

    if (!phoneNumber.trim()) {
      toast({
        title: "Phone number required",
        description: "Please enter your WhatsApp number to proceed",
        variant: "destructive",
      })
      return null
    }

    // Format customer's phone number for WhatsApp
    let customerPhone = phoneNumber.trim()
    // If it starts with 0, replace with country code
    if (customerPhone.startsWith("0")) {
      customerPhone = "234" + customerPhone.substring(1)
    }

    // Owner's WhatsApp number
    const ownerWhatsAppNumber = "2349078048405"

    // 1. Message to owner
    let ownerMessage = `*New Order from CRIB Website*\n\n`
    ownerMessage += `*Customer:* ${name}\n`
    ownerMessage += `*Customer Phone:* ${phoneNumber}\n\n`
    ownerMessage += `*Order Details:*\n`

    items.forEach((item, index) => {
      ownerMessage += `${index + 1}. ${item.name}\n`
      ownerMessage += `   - Quantity: ${item.quantity}\n`
      ownerMessage += `   - Size: ${item.size}\n`
      ownerMessage += `   - Color: ${item.color}\n`
      ownerMessage += `   - Price: ${formatNairaPrice(item.price * item.quantity)}\n\n`
    })

    ownerMessage += `*Total Items:* ${totalItems}\n`
    ownerMessage += `*Total Price:* ${formatNairaPrice(totalPrice)}\n\n`
    ownerMessage += `Thank you for shopping with CRIB!`

    // 2. Confirmation message to customer
    let customerMessage = `*Thank you for your CRIB order!*\n\n`
    customerMessage += `Hello ${name},\n\n`
    customerMessage += `We've received your order and will process it shortly. Here's a summary of your purchase:\n\n`

    items.forEach((item, index) => {
      customerMessage += `${index + 1}. ${item.name}\n`
      customerMessage += `   - Quantity: ${item.quantity}\n`
      customerMessage += `   - Size: ${item.size}\n`
      customerMessage += `   - Color: ${item.color}\n`
      customerMessage += `   - Price: ${formatNairaPrice(item.price * item.quantity)}\n\n`
    })

    customerMessage += `*Total Items:* ${totalItems}\n`
    customerMessage += `*Total Price:* ${formatNairaPrice(totalPrice)}\n\n`
    customerMessage += `If you have any questions about your order, please contact us.\n\n`
    customerMessage += `Thank you for shopping with CRIB!`

    return {
      ownerMessage,
      customerMessage,
      ownerPhone: ownerWhatsAppNumber,
      customerPhone,
    }
  }

  const sendOrderToOwner = () => {
    const messages = generateMessages()
    if (!messages) return

    setOrderMessage(messages.ownerMessage)
    setConfirmationMessage(messages.customerMessage)

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(messages.ownerMessage)

    try {
      // Try to open WhatsApp to send message to owner
      window.open(`https://wa.me/${messages.ownerPhone}?text=${encodedMessage}`, "_blank")

      setOrderSent(true)

      // Show success toast
      toast({
        title: "Order sent to CRIB",
        description: "Now let's send you a confirmation",
      })
    } catch (error) {
      console.error("Failed to open WhatsApp:", error)
      setShowFallback(true)
      toast({
        title: "Couldn't open WhatsApp",
        description: "Please use the copy option below to send your order",
        variant: "destructive",
      })
    }
  }

  const sendConfirmationToCustomer = () => {
    const messages = generateMessages()
    if (!messages) return

    // Encode the confirmation message for URL
    const encodedConfirmation = encodeURIComponent(messages.customerMessage)

    try {
      // Try to open WhatsApp to send confirmation to customer
      window.open(`https://wa.me/${messages.customerPhone}?text=${encodedConfirmation}`, "_blank")

      setConfirmationSent(true)

      // Show success toast
      toast({
        title: "Confirmation sent",
        description: "Thank you for your order!",
      })

      // Clear cart after both messages are sent
      if (orderSent) {
        setTimeout(() => {
          clearCart()
        }, 2000)
      }
    } catch (error) {
      console.error("Failed to open WhatsApp for confirmation:", error)
      setShowFallback(true)
      toast({
        title: "Couldn't send confirmation",
        description: "Please use the copy option below",
        variant: "destructive",
      })
    }
  }

  // Copy messages to clipboard
  const copyOrderToClipboard = () => {
    navigator.clipboard.writeText(orderMessage)
    toast({
      title: "Order copied to clipboard",
      description: "Now you can paste it in WhatsApp to the store",
    })
  }

  const copyConfirmationToClipboard = () => {
    navigator.clipboard.writeText(confirmationMessage)
    toast({
      title: "Confirmation copied to clipboard",
      description: "Now you can paste it in WhatsApp to yourself",
    })
  }

  // Open WhatsApp directly
  const openOwnerWhatsApp = () => {
    window.open(`https://wa.me/2349078048405`, "_blank")
    toast({
      title: "Opening WhatsApp",
      description: "Please paste the order details in the chat",
    })
  }

  const openCustomerWhatsApp = () => {
    // Format customer's phone number for WhatsApp
    let customerPhone = phoneNumber.trim()
    // If it starts with 0, replace with country code
    if (customerPhone.startsWith("0")) {
      customerPhone = "234" + customerPhone.substring(1)
    }

    window.open(`https://wa.me/${customerPhone}`, "_blank")
    toast({
      title: "Opening WhatsApp",
      description: "Please paste the confirmation in the chat",
    })
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <NavigationHeader />

      <div className="container mx-auto px-4 py-32">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Your Cart</h1>
          <Link href="/shop" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.color}-${item.size}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex gap-4 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                >
                  <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-white truncate">{item.name}</h3>
                      <p className="font-semibold text-cyan-400">{formatNairaPrice(item.price * item.quantity)}</p>
                    </div>

                    <div className="mt-1 text-sm text-gray-400">
                      <p>Size: {item.size}</p>
                      <p>Color: {item.color}</p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 sticky top-24"
              >
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span>{formatNairaPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Items</span>
                    <span>{totalItems}</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-cyan-400">{formatNairaPrice(totalPrice)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="bg-black/50 border-white/10 focus-visible:ring-cyan-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm text-gray-400 mb-2">
                      Your WhatsApp Number
                    </label>
                    <Input
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. 08012345678"
                      className="bg-black/50 border-white/10 focus-visible:ring-cyan-400"
                    />
                    <p className="text-xs text-gray-500 mt-1">Your Nigerian number (e.g. 08012345678)</p>
                  </div>

                  {!orderSent ? (
                    <Button
                      onClick={sendOrderToOwner}
                      className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Step 1: Send Order to CRIB
                    </Button>
                  ) : !confirmationSent ? (
                    <Button
                      onClick={sendConfirmationToCustomer}
                      className="w-full bg-gradient-to-r from-cyan-500 to-cyan-700 hover:from-cyan-600 hover:to-cyan-800 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Step 2: Get Your Confirmation
                    </Button>
                  ) : (
                    <div className="p-4 bg-green-500/20 rounded-lg border border-green-500/30 text-center">
                      <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <p className="text-white font-medium">Order Complete!</p>
                      <p className="text-sm text-gray-300 mt-1">Thank you for shopping with CRIB</p>
                    </div>
                  )}

                  {(orderSent || showFallback) && (
                    <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-sm text-gray-300 mb-2">
                        {orderSent && !confirmationSent
                          ? "Now let's get your confirmation:"
                          : "If WhatsApp didn't open automatically, you can:"}
                      </p>

                      <div className="flex flex-col space-y-2">
                        {!orderSent && (
                          <>
                            <Button
                              onClick={copyOrderToClipboard}
                              variant="outline"
                              className="w-full border-white/10 text-white"
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Copy Order Details
                            </Button>
                            <Button
                              onClick={openOwnerWhatsApp}
                              className="w-full bg-green-600 hover:bg-green-700 text-white"
                            >
                              Open WhatsApp to Send Order
                            </Button>
                          </>
                        )}

                        {orderSent && !confirmationSent && (
                          <>
                            <Button
                              onClick={copyConfirmationToClipboard}
                              variant="outline"
                              className="w-full border-white/10 text-white"
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Copy Confirmation
                            </Button>
                            <Button
                              onClick={openCustomerWhatsApp}
                              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                            >
                              Open WhatsApp to Get Confirmation
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {items.length > 0 && (
                    <Button onClick={clearCart} variant="ghost" className="w-full mt-2 text-gray-400 hover:text-white">
                      Clear Cart
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6">
              <ShoppingBag className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/shop">
              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
