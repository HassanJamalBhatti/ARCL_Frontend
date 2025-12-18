"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  {
    src: "/banners/BANNER1.jpg",
    alt: "ARCL Image 1",
    buttonText: "Learn More About Us",
    link: "/about",
    sideImage: "/slides/kid1.jpg", 
  },
  {
    src: "/banners/BANNER2.jpg",
    alt: "ARCL Image 2",
    buttonText: "Explore Our Activities",
    link: "/activities",
    sideImage: "/slides/kid2.jpg",
  },
  {
    src: "/banners/hero-3.jpg",
    alt: "ARCL Image 3",
    buttonText: "See Our Kids in Action",
    link: "/gallery",
    sideImage: "/slides/kid3.jpg",
  },
  {
    src: "/banners/hero-4.jpg",
    alt: "ARCL Image 4",
    buttonText: "Subscribe for Updates",
    link: "/newsletter",
    sideImage: "/slides/kid1.jpg",
  },
  {
    src: "/banners/hero-5.JPG",
    alt: "ARCL Image 5",
    buttonText: "Apply for Admission",
    link: "/admissions",
    sideImage: "/slides/kid2.jpg",
  },
  {
    src: "/banners/hero-6.jpeg",
    alt: "ARCL Image 6",
    buttonText: "Make a Difference Today",
    link: "/donate",
    sideImage: "/slides/kid3.jpg",
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = images[currentIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#3f1a7b]">
      {/* Background Slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
         <motion.div
            key={currentIndex}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.9,
              ease: [0.68, -0.55, 0.265, 1.55], 
            }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-cover"
              priority
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 ml-3 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white"
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Welcome to <br />
              <span className="text-yellow-400">ARCL</span>
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl leading-relaxed">
              Autism Resource Centre Lahore – A safe, nurturing, and empowering space where every child with autism is celebrated, supported, and given the opportunity to shine.
            </p>

            {/* Slide Indicators */}
            <div className="flex gap-3 mt-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === currentIndex
                      ? "w-12 bg-yellow-400"
                      : "w-6 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Side - Dynamic Image + Button */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Rounded Side Image */}
            <div className="relative w-60 h-60 md:w-86 md:h-86 mt-15 ml-55 relative">
              <Image
                src={current.sideImage}
                alt="Child at ARCL"
                fill
                className="rounded-full object-cover border-8 border-yellow-400 shadow-2xl"
                priority
              />
            </div>

            {/* Dynamic Button */}
            <Link
              href={current.link}
              className="bg-yellow-400 hover:bg-yellow-500 ml-55 text-black font-bold text-md px-10 py-5 rounded-full shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              {current.buttonText}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Optional Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}