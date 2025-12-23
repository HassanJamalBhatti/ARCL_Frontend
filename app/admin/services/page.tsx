"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";

interface Section {
  header: string;
  description: string;
  hasList: boolean;
  listItems: string[];
}

interface Service {
  _id: string;
  mainTitle: string;
  url: string;
  sections: Section[];
  status: "Active" | "Inactive";
  role: string;
  createdAt: string;
}

const API_BASE_URL = "http://localhost:5000/api";

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/services`);
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await fetch(`${API_BASE_URL}/services/${id}`, { method: "DELETE" });
    setServices((prev) => prev.filter((s) => s._id !== id));
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-950">Services</h1>
        <Link
          href="/admin/services/add"
          className="flex items-center gap-2 bg-[#3f1a7b] text-white px-4 py-2 rounded"
        >
          <FaPlus /> Add Service
        </Link>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4">Status</th>
              {/* <th className="p-4">Created</th> */}
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{service.mainTitle}</td>

                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      service.status === "Active"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {service.status}
                  </span>
                </td>
{/* 
                <td className="p-4 text-sm text-gray-600">
                  {new Date(service.createdAt).toLocaleDateString()}
                </td> */}

                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <Link
                      href={`/admin/services/edit/${service._id}`}
                      className="flex items-center gap-1 text-sm px-3 py-1 border rounded"
                    >
                      <FaEdit /> Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(service._id)}
                      className="flex items-center gap-1 text-sm px-3 py-1
                                   border border-red-400 text-red-600 rounded"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
