"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

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
  role: "Admin" | "Services" | "Parent";
}

const API_BASE_URL = "http://localhost:5000/api";

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch services from backend
  const fetchServices = async () => {
    console.log("📡 fetchServices function called");
    setLoading(true);
    setError(null);
    
    try {
      console.log("🔗 Making API call to:", `${API_BASE_URL}/services`);
      const res = await fetch(`${API_BASE_URL}/services`);
      console.log("✅ Response status:", res.status);
      console.log("✅ Response ok:", res.ok);
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ API Error response:", errorText);
        throw new Error(`Failed to fetch services: ${res.status} ${res.statusText}`);
      }
      
      const data = await res.json();
      console.log("📦 Data received:", data);
      console.log("📊 Number of services:", data.length);
      setServices(data);
      
    } catch (err: any) {
      console.error("❌ Error in fetchServices:", err);
      setError(err.message || "Something went wrong");
    } finally {
      console.log("🏁 Loading set to false");
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("⚡ useEffect triggered");
    console.log("📍 Component mounted, calling fetchServices");
    fetchServices();
  }, []);

  // DELETE service function
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    
    try {
      console.log("🗑️ Deleting service with ID:", id);
      const res = await fetch(`${API_BASE_URL}/services/${id}`, { 
        method: "DELETE" 
      });
      
      console.log("✅ Delete response status:", res.status);
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete service");
      }
      
      // Remove the deleted service from state
      setServices(services.filter((s) => s._id !== id));
      alert("Service deleted successfully");
      
    } catch (err: any) {
      console.error("❌ Delete error:", err);
      alert(err.message || "Failed to delete service");
    }
  };

  // Test API directly
  useEffect(() => {
    console.log("🧪 Running API connectivity test...");
    
    // Method 1: Direct fetch test
    const testAPI = async () => {
      try {
        console.log("🔍 Testing direct API call...");
        const testRes = await fetch(`${API_BASE_URL}/services`);
        console.log("🧪 Test response status:", testRes.status);
        
        if (testRes.ok) {
          const testData = await testRes.json();
          console.log("🧪 Test data count:", testData.length);
        } else {
          console.error("🧪 Test failed with status:", testRes.status);
        }
      } catch (testErr) {
        console.error("🧪 Test error:", testErr);
      }
    };
    
    testAPI();
    
  }, []);

  console.log("🔄 Component render - loading:", loading, "error:", error, "services count:", services.length);

  if (loading) {
    console.log("⏳ Showing loading state");
    return <p className="text-center py-10">Loading services...</p>;
  }
  
  if (error) {
    console.log("🚨 Showing error state:", error);
    return (
      <div className="text-center py-10">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <button 
          onClick={fetchServices}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }
  
  if (services.length === 0) {
    console.log("📭 Showing empty state");
    return (
      <div className="text-center py-10">
        <p className="mb-4">No services found.</p>
        <button 
          onClick={fetchServices}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Refresh
        </button>
        <Link
          href="/admin/services/add"
          className="inline-flex items-center gap-2 bg-[#3f1a7b] text-white px-4 py-2 rounded"
        >
          <FaPlus /> Add First Service
        </Link>
      </div>
    );
  }

  console.log("✅ Rendering services list with", services.length, "services");

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-12 px-4">
      {/* Debug info - remove after testing */}

      {/* Top Bar */}
      <div className="top-0 bg-white z-50 flex justify-between items-center px-6 py-4 shadow-md border-b border-gray-200">
        <h1 className="text-3xl font-bold text-blue-950">Services</h1>
        <Link
          href="/admin/services/add"
          className="flex items-center gap-2 bg-[#3f1a7b] text-white px-4 py-2 rounded-lg hover:bg-purple-800"
        >
          <FaPlus /> Add New Service
        </Link>
      </div>

      {/* Service Cards */}
      <div className="space-y-6">
        {services.map((service) => (
          <div key={service._id} className="bg-white rounded-xl p-6 shadow w-full">
            {/* Header & Status */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <h3 className="text-2xl font-bold text-blue-950">{service.mainTitle}</h3>
              <div className="flex gap-2 mt-2 md:mt-0">
                <span
                  className={`px-2 py-1 rounded text-white text-sm ${
                    service.status === "Active" ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {service.status}
                </span>
                <span className="px-2 py-1 rounded bg-gray-200 text-gray-800 text-sm">
                  Services
                </span>
              </div>
            </div>

            {/* URL */}
            {service.url && (
              <p className="text-blue-600 mt-2">
                URL: {service.url}
              </p>
            )}

            {/* Sections */}
            {service.sections && service.sections.length > 0 && (
              <div className="mt-4 space-y-4">
                {service.sections.map((section, index) => (
                  <div key={index} className="">
                    <h4 className="font-semibold text-lg text-blue-900">{section.header}</h4>
                    {section.description && (
                      <p className="mt-1 whitespace-pre-wrap break-words">{section.description}</p>
                    )}
                    {section.hasList && section.listItems && section.listItems.length > 0 && (
                      <ul className="list-disc pl-6 mt-2">
                        {section.listItems.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <Link
                href={`/admin/services/add?id=${service._id}`}
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                <FaEdit /> Edit
              </Link>
              <button
                onClick={() => handleDelete(service._id)}
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