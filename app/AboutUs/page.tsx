"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFilePdf } from "react-icons/fa";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

/* ================= TYPES ================= */
interface Member {
  _id: string;
  name: string;
  position: string;
  image: string;
}

interface Certification {
  _id: string;
  title: string;
  image: string;
  pdf: string;
}

interface FinancialPDF {
  _id: string;
  title: string;
  pdf: string;
}

/* ================= PAGE ================= */
export default function AboutUsPage() {
  const [governingBodyMembers, setGoverningBodyMembers] = useState<Member[]>([]);
  const [executiveMembers, setExecutiveMembers] = useState<Member[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [financialPDFs, setFinancialPDFs] = useState<FinancialPDF[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const governingRes = await fetch("http://localhost:5000/api/governing");
        const governingData = await governingRes.json();
        setGoverningBodyMembers(governingData);

        const executiveRes = await fetch("http://localhost:5000/api/executive");
        const executiveData = await executiveRes.json();
        setExecutiveMembers(executiveData);

        const certRes = await fetch("http://localhost:5000/api/certifications");
        const certData = await certRes.json();
        setCertifications(certData);

        const financialRes = await fetch("http://localhost:5000/api/financial");
        const financialData = await financialRes.json();
        setFinancialPDFs(financialData);
      } catch (err) {
        console.error("Error fetching About Us data:", err);
      }
    };

    fetchData();
  }, []);

  /* ================= CERTIFICATION SLIDER ================= */
  const [certIndex, setCertIndex] = useState(0);
  const visible = 3;
  const total = certifications.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCertIndex((prev) => (prev + 1 > total - visible ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <div className="text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative h-[75vh]">
        <Image src="/centre-1.jpg" alt="About Us" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              About Our Organization
            </h1>
            <p className="text-lg max-w-3xl mx-auto text-gray-200">
              Dedicated to empowering children with autism through compassion and care.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="bg-[#3f1a7b] rounded-2xl p-8 md:p-10 shadow-xl hover:scale-[1.03] transition duration-300">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-gray-200 text-base md:text-lg leading-relaxed text-center">
              At <span className="font-semibold text-white">ARCL</span>, our mission is
              to empower children with autism by delivering compassionate, evidence-based
              therapy, personalized education, and family-centered support. We are
              committed to nurturing each child’s unique potential and improving
              their quality of life.
            </p>
          </div>

          <div className="bg-[#3f1a7b] rounded-2xl p-8 md:p-10 shadow-xl hover:scale-[1.03] transition duration-300">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6 text-center">
              Our Vision
            </h2>
            <p className="text-gray-200 text-base md:text-lg leading-relaxed text-center">
              Our vision is to build an inclusive and supportive society where children
              with autism are valued, understood, and given equal opportunities to
              thrive. We aspire to be a center of excellence in autism care, advocacy,
              and awareness at both national and global levels.
            </p>
          </div>
        </div>
      </section>

      {/* GOVERNING BODY */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold text-yellow-400 text-center mb-12">Governing Body</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {governingBodyMembers.map((m) => (
            <div key={m._id} className="bg-[#3f1a7b] p-6 rounded-xl text-center hover:scale-105 transition">
              <Image
                src={`http://localhost:5000${m.image}`}
                alt={m.name}
                width={140}
                height={140}
                className="rounded-full mx-auto border-2 border-yellow-400 mb-4"
                unoptimized
              />
              <h3 className="font-bold">{m.name}</h3>
              <p className="text-yellow-300">{m.position}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXECUTIVE TEAM */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-semibold text-yellow-400 text-center mb-12">Executive Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {executiveMembers.map((m) => (
            <div key={m._id} className="bg-[#3f1a7b] p-6 rounded-xl text-center hover:scale-105 transition">
              <Image
                src={`http://localhost:5000${m.image}`}
                alt={m.name}
                width={120}
                height={120}
                className="rounded-full mx-auto border-2 border-yellow-400 mb-4"
                unoptimized
              />
              <h3 className="font-bold">{m.name}</h3>
              <p className="text-yellow-300">{m.position}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-blue-950 mb-12">
            Our Certifications
          </h2>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                width: `${(total / visible) * 100}%`,
                transform: `translateX(-${certIndex * (100 / total)}%)`,
              }}
            >
              {certifications.map((cert) => (
                <div key={cert._id} className="w-1/3 px-4">
                  <a
                    href={`http://localhost:5000${cert.pdf}`}
                    target="_blank"
                    className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden"
                  >
                    <img
                      src={`http://localhost:5000${cert.image}`}
                      alt={cert.title}
                      className="h-72 w-full object-cover"
                    />
                    <div className="p-5 text-center">
                      <h3 className="font-semibold text-lg text-blue-950">
                        {cert.title}
                      </h3>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINANCIAL STATEMENTS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <h2 className="text-4xl font-bold text-center text-blue-950 mb-8">
            Financial Audit Reports
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {financialPDFs.map((f) => (
              <Link
                key={f._id}
                href={`http://localhost:5000${f.pdf}`}
                target="_blank"
                className="flex items-center justify-between p-5 rounded-xl border hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3">
                  <FaFilePdf className="text-red-500 text-2xl" />
                  <span className="font-semibold text-blue-950">{f.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
