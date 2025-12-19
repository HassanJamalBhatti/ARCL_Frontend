"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Section {
  id: number;
  header: string;
  description: string;
  hasList: boolean;
  listItems: string[];
}

interface Service {
  _id?: string; 
  mainTitle: string;
  sections: Section[];
  status: "Active" | "Inactive";
  role: "Admin" | "Services" | "Parent";
  url: string;
}

export default function AddService() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editId = searchParams.get("id");

  const [form, setForm] = useState<Service>({
    mainTitle: "",
    sections: [{ id: Date.now(), header: "", description: "", hasList: false, listItems: [""] }],
    status: "Active",
    role: "Admin",
    url: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch service data if editing
  useEffect(() => {
    if (editId) {
      setLoading(true);
      fetch(`http://localhost:5000/api/services/${editId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch service");
          return res.json();
        })
        .then((data) => {
          // Ensure sections have id field if missing
          const sectionsWithId = data.sections?.map((section: any, index: number) => ({
            ...section,
            id: section.id || Date.now() + index
          })) || [{ id: Date.now(), header: "", description: "", hasList: false, listItems: [""] }];
          
          setForm({
            ...data,
            sections: sectionsWithId
          });
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to load service data");
        })
        .finally(() => setLoading(false));
    }
  }, [editId]);

  const resetForm = () => {
    setForm({
      mainTitle: "",
      sections: [{ id: Date.now(), header: "", description: "", hasList: false, listItems: [""] }],
      status: "Active",
      role: "Admin",
      url: "",
    });
  };

  const handleMainTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, mainTitle: e.target.value });
  };

  const handleSectionChange = (index: number, field: keyof Section, value: any) => {
    const newSections = [...form.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setForm({ ...form, sections: newSections });
  };

  const handleListItemChange = (sectionIndex: number, itemIndex: number, value: string) => {
    const newSections = [...form.sections];
    newSections[sectionIndex].listItems[itemIndex] = value;
    setForm({ ...form, sections: newSections });
  };

  const addSection = () => {
    setForm({
      ...form,
      sections: [...form.sections, { 
        id: Date.now(), 
        header: "", 
        description: "", 
        hasList: false, 
        listItems: [""] 
      }],
    });
  };

  const addListItem = (sectionIndex: number) => {
    const newSections = [...form.sections];
    newSections[sectionIndex].listItems.push("");
    setForm({ ...form, sections: newSections });
  };

  const removeSection = (index: number) => {
    if (form.sections.length > 1) {
      const newSections = [...form.sections];
      newSections.splice(index, 1);
      setForm({ ...form, sections: newSections });
    } else {
      alert("At least one section is required");
    }
  };

  const removeListItem = (sectionIndex: number, itemIndex: number) => {
    const newSections = [...form.sections];
    // Make a copy of the list items array
    const updatedListItems = [...newSections[sectionIndex].listItems];
    // Remove the specific item
    updatedListItems.splice(itemIndex, 1);
    
    // Update the section with new list items
    newSections[sectionIndex] = {
      ...newSections[sectionIndex],
      listItems: updatedListItems
    };
    
    setForm({ ...form, sections: newSections });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!form.mainTitle.trim()) {
      alert("Main title is required");
      return;
    }
    
    // Validate sections
    for (const section of form.sections) {
      if (!section.header.trim()) {
        alert("Section header is required for all sections");
        return;
      }
    }

    setLoading(true);
    try {
      const url = editId 
        ? `http://localhost:5000/api/services/${editId}`
        : "http://localhost:5000/api/services";
      
      const method = editId ? "PUT" : "POST";
      
      // Remove URL from form if empty (optional)
      const formData = {
        ...form,
        url: form.url.trim() || "" // Keep as empty string if not provided
      };
      
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save service");
      }

      const result = await response.json();
      console.log("Service saved:", result);
      
      alert(editId ? "Service updated successfully" : "Service added successfully");
      resetForm();
      router.push("/admin/services"); 
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading && editId) return <p className="text-center py-10">Loading service data...</p>;

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-blue-950 mb-8 text-center">
        {editId ? "Edit Service" : "Add New Service"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg mb-12">
        {/* Main Title */}
        <div className="mb-6">
          <label className="block font-medium mb-2 text-lg">Main Title</label>
          <input
            type="text"
            value={form.mainTitle}
            onChange={handleMainTitleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3f1a7b] focus:border-transparent"
            placeholder="Enter service title"
            required
          />
        </div>

        {/* URL Input */}
        <div className="mb-6">
          <label className="block font-medium mb-2 text-lg">URL Slug</label>
          <input
            type="text"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3f1a7b] focus:border-transparent"
            placeholder="/services/service-name"
          />
        </div>

        {/* Role Selector */}
        <div className="mb-6">
          <label className="block font-medium mb-2 text-lg">Role</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value as any })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3f1a7b] focus:border-transparent"
          >
            <option value="Admin">Admin</option>
            <option value="Services">Service Provider</option>
            <option value="Parent">Parent</option>
          </select>
        </div>

        {/* Status Toggle */}
        <div className="mb-8">
          <label className="block font-medium mb-2 text-lg">Status</label>
          <div className="flex gap-4">
            <button
              type="button"
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                form.status === "Active" 
                  ? "bg-green-600 text-white shadow" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setForm({ ...form, status: "Active" })}
            >
              Active
            </button>
            <button
              type="button"
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                form.status === "Inactive" 
                  ? "bg-red-600 text-white shadow" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setForm({ ...form, status: "Inactive" })}
            >
              Inactive
            </button>
          </div>
        </div>

        {/* Sections */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-950">Sections</h2>
          </div>

          {form.sections.map((section, sectionIndex) => (
            <div key={section.id} className="border-2 border-gray-200 p-6 rounded-xl mb-6 relative bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-blue-900">Section {sectionIndex + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeSection(sectionIndex)}
                  className="text-red-700 hover:bg-red-200 px-3 py-1.5 rounded-lg font-medium transition-colors"
                  disabled={form.sections.length <= 1}
                >
                  X
                </button>
              </div>

              {/* Section Header */}
              <div className="mb-4">
                <label className="block font-medium mb-2">Section Header</label>
                <input
                  type="text"
                  value={section.header}
                  onChange={(e) => handleSectionChange(sectionIndex, "header", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter section header"
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block font-medium mb-2">Description</label>
                <textarea
                  value={section.description}
                  onChange={(e) => handleSectionChange(sectionIndex, "description", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Enter section description"
                ></textarea>
              </div>

              {/* List Toggle */}
              <div className="mb-4 flex items-center gap-3 p-3 bg-white rounded-lg">
                <label className="font-medium">Include List Items?</label>
                <input
                  type="checkbox"
                  checked={section.hasList}
                  onChange={(e) => handleSectionChange(sectionIndex, "hasList", e.target.checked)}
                  className="w-5 h-5 text-[#3f1a7b] focus:ring-[#3f1a7b]"
                />
              </div>

              {/* List Items */}
              {section.hasList && (
                <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-lg">List Items</h4>
                  </div>
                  
                  {section.listItems.map((item, itemIndex) => (
                    <div key={`${sectionIndex}-${itemIndex}`} className="flex gap-3 mb-3 items-center">
                      <div className="flex-grow">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => handleListItemChange(sectionIndex, itemIndex, e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter list item"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeListItem(sectionIndex, itemIndex)}
                        className="bg-red-600 text-white hover:bg-red-200 px-4 py-3 rounded-lg font-medium transition-colors"
                        disabled={section.listItems.length <= 1}
                      >
                        X
                      </button>
                    </div>
                  ))}
                  
                  {/* Add Item Button at bottom */}
                  <button
                    type="button"
                    onClick={() => addListItem(sectionIndex)}
                    className="mt-4 bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-lg 
                    font-medium transition-colors flex items-center gap-2 justify-center"
                  >
                    <span>+</span> Add List Item
                  </button>
                </div>
              )}
            </div>
          ))}
          
          {/* Add Section Button at bottom */}
          <button
            type="button"
            onClick={addSection}
            className="mt-6 bg-[#3f1a7b] text-white px-5 py-2.5 rounded-lg hover:bg-purple-800 
            transition-colors flex items-center gap-2 justify-center"
          >
            <span className="text-xl">+</span> Add Section
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-8 border-t border-gray-200">
  <button
    type="submit"
    disabled={loading}
    className="bg-[#3f1a7b] text-white py-3 px-8 rounded-full hover:bg-purple-800 
    transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
  >
    {loading ? "Saving..." : editId ? "Update Service" : "Add Service"}
  </button>
  <Link
    href="/admin/services"
    className="bg-gray-300 text-gray-800 py-3 px-8 rounded-full hover:bg-gray-400 transition-colors 
    font-medium text-sm text-center"
  >
    Cancel
  </Link>
</div>
      </form>
    </div>
  );
}