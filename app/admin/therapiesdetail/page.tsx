// pages/admin/therapies/index.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

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

export default function AdminTherapies() {
  const [therapies, setTherapies] = useState<Therapy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch therapies from backend
  const fetchTherapies = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/therapies");
      if (!res.ok) throw new Error("Failed to fetch therapies");
      const data = await res.json();
      setTherapies(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTherapies();
  }, []);

  // Delete therapy
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this therapy?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/therapies/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete therapy");
      setTherapies(therapies.filter((t) => t._id !== id));
      alert("Therapy deleted successfully");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to delete therapy");
    }
  };

  if (loading) return <p className="text-center py-10">Loading therapies...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;
  if (therapies.length === 0) return <p className="text-center py-10">No therapies found.</p>;

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-12 px-4">

      {/* Top Bar */}
      <div className=" top-0 bg-white z-50 flex justify-between items-center px-6 py-4 shadow-md border-b border-gray-200">
        <h1 className="text-3xl font-bold text-blue-950">Therapies</h1>
        <Link
          href="/admin/therapiesdetail/add"
          className="flex items-center gap-2 bg-[#3f1a7b] text-white px-4 py-2 rounded-lg hover:bg-purple-800"
        >
          <FaPlus /> Add New Therapy
        </Link>
      </div>

      {/* Therapy Cards */}
      <div className="space-y-6">
        {therapies.map((therapy) => (
          <div key={therapy._id} className="bg-white rounded-xl p-6 shadow w-full">

            {/* Header & Status */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <h3 className="text-2xl font-bold text-blue-950">{therapy.mainTitle}</h3>
              <div className="flex gap-2 mt-2 md:mt-0">
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    therapy.status === "Active" ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {therapy.status}
                </span>
                <span className="px-2 py-1 rounded bg-gray-200 text-gray-800 text-sm">{therapy.role}</span>
              </div>
            </div>

            {/* URL */}
            {therapy.url && (
              <p className="text-blue-600  mt-2">
                URL:
                {/* <a href={therapy.url} target="_blank" rel="noopener noreferrer"> */}
                  {therapy.url}
                {/* </a> */}
              </p>
            )}

            {/* Sections */}
            {therapy.sections.map((s, sectionIdx) => (
              <div key={s.id || sectionIdx} className="text-gray-700 space-y-1 mt-4">
                <h4 className="font-semibold text-lg">{s.header}</h4>
                <p>{s.description}</p>
                {s.hasList && (
                  <ul className="list-disc pl-6">
                    {s.listItems.map((li, idx) => (
                      <li key={`${sectionIdx}-${idx}`}>{li}</li> // unique key per section & item
                    ))}
                  </ul>
                )}
              </div>
            ))}
            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <Link
                href={`/admin/therapiesdetail/edit/${therapy._id}`}
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                <FaEdit /> Edit
              </Link>

              <button
                onClick={() => handleDelete(therapy._id)}
                className="flex items-center gap-1 text-red-600 hover:underline"
              >
                <FaTrash /> Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
