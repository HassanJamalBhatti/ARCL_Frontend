"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import { Book, HeartHandshake, Users, DollarSign, Home, Users2 } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Specialized Education",
    icon: <Book className="w-12 h-12 text-white" />,
    description:
      "Individualized learning programs designed to meet unique educational needs.",
    color: "bg-purple-700",
    link: "/services/specialized-education",
  },
  {
    title: "Therapeutic Support",
    icon: <HeartHandshake className="w-12 h-12 text-white" />,
    description:
      "Professional therapy services supporting emotional, behavioral, and developmental growth.",
    color: "bg-pink-500",
    link: "/services/therapeutic-support",
  },
  {
    title: "Parent Training",
    icon: <Users className="w-12 h-12 text-white" />,
    description:
      "Empowering parents with skills, strategies, and confidence to support their children.",
    color: "bg-indigo-600",
    link: "/services/parent-training",
  },
  {
    title: "Financial Assistance",
    icon: <DollarSign className="w-12 h-12 text-white" />,
    description:
      "Guidance and support to access funding and financial resources.",
    color: "bg-green-600",
    link: "/services/financial-assistance",
  },
  {
    title: "Home Services",
    icon: <Home className="w-12 h-12 text-white" />,
    description:
      "Therapy and educational support provided in the comfort of your home.",
    color: "bg-yellow-500",
    link: "/services/home-services",
  },
  {
    title: "Social Skills Development",
    icon: <Users2 className="w-12 h-12 text-white" />,
    description:
      "Programs focused on enhancing communication, social interactions, and community engagement.",
    color: "bg-red-500",
    link: "/services/social-skills-development",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
        <Navbar />
      {/* HERO */}
      <section className="relative bg-gradient-to-b from-[#3f1a7b] to-[#3f1a7b] py-48 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-hand font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-yellow-300 max-w-2xl mx-auto">
            Comprehensive programs and support to help children thrive.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-purple-700 mb-2 uppercase tracking-wide">
            What We Offer
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Our Specialized Services
          </h2>
          <p className="text-gray-600 text-lg">
            We provide comprehensive services designed to support children and families through every stage of care and development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-start gap-6 group"
            >
              {/* ICON */}
              <div
                className={`p-5 rounded-xl ${service.color} flex items-center justify-center text-white text-3xl transition-transform duration-300 group-hover:scale-110`}
              >
                {service.icon}
              </div>

              {/* TITLE & DESCRIPTION */}
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>

              {/* CTA Button */}
              <Link
                href={service.link}
                className="mt-auto px-5 py-2 rounded-xl bg-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:bg-purple-800 text-center w-full"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
