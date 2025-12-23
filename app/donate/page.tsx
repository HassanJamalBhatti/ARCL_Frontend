"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

export default function DonatePage() {
  const [amount, setAmount] = useState<number>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !name || !email || !phone) {
      alert("Please fill all fields");
      return;
    }

    // Call backend API to create JazzCash payment request
    const res = await fetch("/api/jazzcash/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, name, email, phone }),
    });

    const data = await res.json();

    if (data && data.paymentUrl) {
      setPaymentUrl(data.paymentUrl);
      setShowModal(true); // Show custom popup
    } else {
      alert("Payment initiation failed. Try again.");
    }
  };

  return (
    <main className="bg-white min-h-screen text-gray-900">
        <Navbar />
      {/* Hero */}
      <section className="relative bg-linear-to-b h-[75vh] from-[#3f1a7b] to-[#3f1a7b] py-48 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-hand font-bold text-white mb-4">
            Donate Now
          </h1>
          <p className="text-lg md:text-xl text-yellow-300">
            Support our mission to empower children with autism
          </p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-[#f8f8f8] p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-[#3f1a7b] mb-6 text-center">
            Make a Donation
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Your Full Name"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="03XXXXXXXXX"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Donation Amount (PKR)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="500, 1000, 2000..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-yellow-400 text-[#3f1a7b] font-semibold hover:bg-[#ffc107] transition"
            >
              Donate via JazzCash
            </button>
          </form>

          <p className="mt-6 text-gray-500 text-sm text-center">
            Your contribution makes a real difference!
          </p>
        </div>
      </section>

      {/* Custom Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-8 w-11/12 max-w-md relative">
            <h3 className="text-2xl font-bold text-[#3f1a7b] mb-4 text-center">
              Confirm Donation
            </h3>
            <p className="text-gray-700 mb-6 text-center">
              You are about to donate <span className="font-semibold">{amount} PKR</span>.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href={paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center w-full px-6 py-3 bg-yellow-400 text-[#3f1a7b] font-semibold rounded-full hover:bg-[#ffc107] transition"
              >
                Proceed to JazzCash
              </a>

              <button
                onClick={() => setShowModal(false)}
                className="w-full px-6 py-3 border-2 border-yellow-400 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400 hover:text-[#3f1a7b] transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
}
