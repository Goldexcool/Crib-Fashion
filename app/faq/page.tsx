"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import NavigationHeader from "@/components/navigation-header"
import Footer from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqCategories = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer:
            "Standard shipping typically takes 3-5 business days within the US, and 7-14 business days for international orders. Express shipping options are available at checkout for faster delivery.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can view specific shipping information for your country during checkout.",
        },
        {
          question: "How can I track my order?",
          answer:
            "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account on our website.",
        },
        {
          question: "Can I change or cancel my order?",
          answer:
            "Orders can be modified or canceled within 1 hour of placement. After this window, please contact our customer support team, and we'll do our best to accommodate your request.",
        },
      ],
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          question: "What is your return policy?",
          answer:
            "We offer a 30-day return policy for unworn items in original condition with tags attached. Returns are free for customers in the US. International customers are responsible for return shipping costs.",
        },
        {
          question: "How do I initiate a return or exchange?",
          answer:
            "To initiate a return or exchange, log into your account, go to your order history, and select the 'Return or Exchange' option for the relevant order. Follow the prompts to complete the process.",
        },
        {
          question: "When will I receive my refund?",
          answer:
            "Refunds are typically processed within 5-7 business days after we receive your returned items. The funds will be credited back to your original payment method.",
        },
      ],
    },
    {
      category: "Product Information",
      questions: [
        {
          question: "How do I care for my CRIB garments?",
          answer:
            "Each CRIB piece comes with specific care instructions. Generally, we recommend hand washing in cold water with mild detergent and air drying. Avoid bleach and direct heat, which can damage the advanced materials and embedded technology.",
        },
        {
          question: "Are your products sustainable?",
          answer:
            "Sustainability is a core value at CRIB. We use eco-friendly materials wherever possible and employ ethical manufacturing practices. Our packaging is 100% recyclable, and we're constantly working to reduce our environmental footprint.",
        },
        {
          question: "How does the NFC technology in your clothing work?",
          answer:
            "Our garments contain small, washable NFC chips embedded in discrete locations. Using the CRIB app, you can scan these chips to access digital content, verify authenticity, and unlock exclusive experiences related to your specific item.",
        },
        {
          question: "What sizes do you offer?",
          answer:
            "We offer sizes XS through XXL in most styles. Our sizing is designed to be inclusive and accommodating. Please refer to the size guide on each product page for specific measurements to ensure the perfect fit.",
        },
      ],
    },
  ]

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery
    ? faqCategories
        .map((category) => ({
          ...category,
          questions: category.questions.filter(
            (q) =>
              q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.questions.length > 0)
    : faqCategories

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
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about our products, shipping, returns, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for answers..."
                className="pl-10 bg-white/5 border-white/10 focus-visible:ring-cyan-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem
                        key={faqIndex}
                        value={`${categoryIndex}-${faqIndex}`}
                        className="border border-white/10 rounded-lg overflow-hidden bg-white/5"
                      >
                        <AccordionTrigger className="px-6 py-4 hover:bg-white/10 transition-colors text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 py-4 text-gray-300">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">No results found for "{searchQuery}"</p>
                <p className="text-gray-500">Try a different search term or browse the categories below.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
