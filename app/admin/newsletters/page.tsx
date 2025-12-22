"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Pencil, Plus, FileText } from "lucide-react";
import { useEffect, useState } from "react";

interface Newsletter {
  _id: string;
  title: string;
  date: string;
  pdfUrl: string;
  imageUrl?: string | null;
}

const API_URL = "http://localhost:5000";

export default function NewsletterListPage() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH ALL
  const fetchNewsletters = async () => {
    try {
      const res = await fetch(`${API_URL}/api/newsletters`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setNewsletters(data.data);
    } catch (err: any) {
      setError(err.message || "Failed to load newsletters");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this newsletter?")) return;

    try {
      const res = await fetch(`${API_URL}/api/newsletters/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setNewsletters((prev) => prev.filter((n) => n._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading newsletters...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#3f1a7b]">
          Newsletters
        </h1>

        <Link
          href="/admin/newsletters/add"
          className="flex items-center gap-2 bg-yellow-400 
                     text-[#3f1a7b] px-5 py-2 rounded font-semibold"
        >
          <Plus size={18} /> Add Newsletter
        </Link>
      </div>

      {newsletters.length === 0 ? (
        <p className="text-gray-500">No newsletters found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {newsletters.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <Image
                src={
                  item.imageUrl
                    ? `http://localhost:5000${item.imageUrl}`
                    : "/newsletter-placeholder.jpg"
                }
                alt={item.title}
                width={400}
                height={250}
                unoptimized
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-[#3f1a7b]">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.date}</p>

                <a
                  href={`${API_URL}${item.pdfUrl}`}
                  target="_blank"
                  className="flex items-center gap-2 mt-2 text-blue-600 text-sm"
                >
                  <FileText size={16} /> View PDF
                </a>

                <div className="flex gap-3 mt-4">
                  <Link
                    href={`/admin/newsletters/edit/${item._id}`}
                    className="flex items-center gap-1 text-sm px-3 py-1 border rounded"
                  >
                    <Pencil size={14} /> Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center gap-1 text-sm px-3 py-1 
                               border border-red-400 text-red-600 rounded"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
