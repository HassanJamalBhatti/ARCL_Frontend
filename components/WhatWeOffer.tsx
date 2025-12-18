"use client";

import { useState, useEffect } from "react";
import { Brain, MessageSquare, Users, BrainCog } from "lucide-react";

interface Section {
  id: number;
  header: string;
  description: string;
  hasList: boolean;
  listItems: string[];
}

interface Therapy {
  _id: string;
  mainTitle: string;
  sections: Section[];
  status: "Active" | "Inactive";
  role: "Admin" | "Therapist" | "Parent";
  url: string;
}

export default function WhatWeOffer() {
  const [therapies, setTherapies] = useState<Therapy[]>([]);
  const icons = [<Brain />, <MessageSquare />, <BrainCog />, <Users />];

  useEffect(() => {
    const fetchTherapies = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/therapies");
        const data = await res.json();
        // Filter only active therapies and take first 4
        const activeTherapies = data.filter((t: Therapy) => t.status === "Active").slice(0, 4);
        setTherapies(activeTherapies);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTherapies();
  }, []);

  return (
    <section className="w-full bg-[#f4effa] py-20 px-6 md:px-20">
      {/* Heading */}
      <div className="max-w-6xl mx-auto">
        <h4 className="text-lg font-semibold text-[#2a1d7a]">
          Autism Clinic Programs & Therapies
        </h4>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-4 text-[#2a1d7a]">
          What We Offer
        </h1>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-2 gap-14">
        {therapies.map((therapy, i) => (
          <div key={therapy._id} className="relative group">
            
            {/* Gradient Edge */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2a1d7a] to-[#6a5acd] skew-x-[-8deg] rounded-2xl" />

            {/* Main Card */}
            <div className="relative bg-white px-10 py-10 flex items-center gap-8 skew-x-[-8deg] rounded-2xl shadow-lg
                            transition-all duration-500 group-hover:translate-y-[-6px] group-hover:shadow-2xl">

              {/* Icon */}
              <div className="bg-[#fbd46d] w-16 h-16 rounded-full flex items-center justify-center shadow-md shrink-0 skew-x-[8deg]">
                {icons[i] || <Brain />}
              </div>

              {/* Content */}
              <div className="skew-x-[8deg]">
                <h3 className="text-2xl font-bold text-[#2a1d7a]">{therapy.mainTitle}</h3>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed max-w-sm">
                  {therapy.sections[0]?.description
                    ? therapy.sections[0].description.slice(0, 75) + "..."
                    : ""}
                </p>
              </div>

              {/* Arrow */}
              <div className="ml-auto skew-x-[8deg] text-[#2a1d7a] text-2xl font-semibold opacity-70 group-hover:opacity-100 transition">
                →
              </div>
            </div>

            {/* Right Putty */}
            <span className="absolute top-1/2 -right-5 w-4 h-4 bg-[#fbd46d] rounded-full shadow-lg -translate-y-1/2
                             group-hover:scale-125 transition-transform duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
}
