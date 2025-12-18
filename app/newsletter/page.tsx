"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

const eventsData = [
  {
    title: "Newsletter Vol. 16",
    date: "OCT–DEC, 2024",
    link: "/newsletters/newsletter-16.pdf",
    image: "/newsletter-placeholder.jpg",
  },
  {
    title: "Newsletter Vol. 15",
    date: "JUL–SEP, 2024",
    link: "/newsletters/newsletter-15.pdf",
    image: "/newsletter-placeholder.jpg",
  },
  {
    title: "Newsletter Vol. 14",
    date: "APR–JUNE, 2024",
    link: "/newsletters/newsletter-14.pdf",
    image: "/newsletter-placeholder.jpg",
  },
  {
    title: "Newsletter Vol. 13",
    date: "JAN–MARCH, 2024",
    link: "/newsletters/newsletter-13.pdf",
    image: "/newsletter-placeholder.jpg",
  },
  {
    title: "Newsletter Vol. 12",
    date: "OCT–DEC, 2023",
    link: "/newsletters/newsletter-12.pdf",
    image: "/newsletter-placeholder.jpg",
  },
  {
    title: "Newsletter Vol. 11",
    date: "JUL–SEP, 2023",
    link: "/newsletters/newsletter-11.pdf",
    image: "/newsletter-placeholder.jpg",
  },
  {
    title: "Newsletter Vol. 10",
    date: "APR–JUNE, 2023",
    link: "/newsletters/newsletter-10.pdf",
    image: "/newsletter-placeholder.jpg",
  },
  {
    title: "Newsletter Vol. 9",
    date: "JAN–MARCH, 2023",
    link: "/newsletters/newsletter-9.pdf",
    image: "/newsletter-placeholder.jpg",
  },
  {
    title: "Newsletter Vol. 8",
    date: "OCT–DEC, 2022",
    link: "/newsletters/newsletter-8.pdf",
    image: "/newsletter-placeholder.jpg",
  },
  {
    title: "Newsletter Vol. 7",
    date: "JUL–SEP, 2022",
    link: "/newsletters/newsletter-7.pdf",
    image: "/newsletter-placeholder.jpg",
  },
  {
    title: "Newsletter Vol. 6",
    date: "APR–JUNE, 2022",
    link: "/newsletters/newsletter-6.pdf",
    image: "/newsletter-placeholder.jpg",
  },
  {
    title: "Newsletter Vol. 5",
    date: "JAN–MARCH, 2025",
    link: "/newsletters/newsletter-5.pdf",
    image: "/newsletter-placeholder.jpg",
  },
  {
    title: "Newsletter Vol. 3",
    date: "JUL–SEP, 2021",
    link: "/newsletters/newsletter-3.pdf",
    image: "/newsletter-placeholder.jpg",
  },
  {
    title: "Newsletter Vol. 1",
    date: "JAN–MARCH, 2021",
    link: "/newsletters/newsletter-1.pdf",
    image: "/newsletter-placeholder.jpg",
  },
];

export default function NewsletterPage() {
  return (
    <div className="bg-white">
        <Navbar />

      {/* HERO */}
      <section className="relative h-[75vh] flex items-center justify-center">
        {/* <Image
          src="/Newsletter.png"
          alt="ARCL Newsletters"
          fill
          className="object-cover"
        /> */}
        <div className="absolute inset-0 bg-[#3f1a7b]" />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            Our Newsletters
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-yellow-300 max-w-2xl mx-auto"
          >
            Stay updated with ARCL’s activities, achievements, and community
            impact through our quarterly newsletters.
          </motion.p>
        </div>
      </section>

      {/* NEWSLETTER GRID */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {eventsData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border 
                         hover:shadow-2xl transition"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={400}
                className="h-52 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#3f1a7b]">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{item.date}</p>

                <a
                  href={item.link}
                  target="_blank"
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2 
                             rounded-full bg-yellow-400 text-[#3f1a7b] 
                             font-semibold hover:bg-[#3f1a7b] hover:text-white 
                             transition"
                >
                  <FileText size={18} />
                  View Newsletter
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
        {/* GET IN TOUCH WITH FORM */}
        <section className="relative bg-[#3f1a7b] py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3f1a7b] via-[#3f1a7b]/90 to-black/40" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
            Get in Touch
            </h2>

            <p className="mt-4 text-lg text-yellow-300 max-w-2xl mx-auto">
            Have questions or want to learn more about our programs, events, or publications? Fill out the form below and we’ll get back to you shortly.
            </p>

            {/* FORM */}
            <form
            action="https://formsubmit.co/info@arcl.org.pk" 
            method="POST"
            className="mt-10 bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto text-left"
            >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <label className="block text-gray-700 font-semibold mb-2">
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                </div>

                <div>
                <label className="block text-gray-700 font-semibold mb-2">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                </div>

                <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">
                    Subject
                </label>
                <input
                    type="text"
                    name="subject"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                </div>

                <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">
                    Message
                </label>
                <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                </div>
            </div>

            <button
                type="submit"
                className="mt-6 w-full md:w-auto px-8 py-3 bg-yellow-400 text-[#3f1a7b] font-semibold rounded-full hover:bg-[#3f1a7b] hover:text-white transition"
            >
                Send Message
            </button>
            </form>
        </div>
        </section>

          <Footer />
    </div>
  );
}