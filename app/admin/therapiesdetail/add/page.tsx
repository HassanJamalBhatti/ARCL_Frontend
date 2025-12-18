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

interface Therapy {
  _id?: string; 
  mainTitle: string;
  sections: Section[];
  status: "Active" | "Inactive";
  role: "Admin" | "Therapist" | "Parent";
  url: string;
}

export default function AddTherapy() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editId = searchParams.get("id");

  const [form, setForm] = useState<Therapy>({
    mainTitle: "",
    sections: [{ id: Date.now(), header: "", description: "", hasList: false, listItems: [""] }],
    status: "Active",
    role: "Admin",
    url: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch therapy data if editing
  useEffect(() => {
    if (editId) {
      setLoading(true);
      fetch(`http://localhost:5000/api/therapies/${editId}`)
        .then((res) => res.json())
        .then((data) => setForm(data))
        .catch((err) => console.error(err))
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
      sections: [...form.sections, { id: Date.now(), header: "", description: "", hasList: false, listItems: [""] }],
    });
  };

  const addListItem = (sectionIndex: number) => {
    const newSections = [...form.sections];
    newSections[sectionIndex].listItems.push("");
    setForm({ ...form, sections: newSections });
  };

  const removeSection = (index: number) => {
    const newSections = [...form.sections];
    newSections.splice(index, 1);
    setForm({ ...form, sections: newSections });
  };

  const removeListItem = (sectionIndex: number, itemIndex: number) => {
    const newSections = [...form.sections];
    newSections[sectionIndex].listItems.splice(itemIndex, 1);
    setForm({ ...form, sections: newSections });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        // Update existing therapy
        await fetch(`http://localhost:5000/api/therapies/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        alert("Therapy updated successfully");
      } else {
        await fetch("http://localhost:5000/api/therapies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        alert("Therapy added successfully");
      }
      resetForm();
      router.push("/admin/therapiesdetail"); 
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-blue-950 mb-8 text-center">
        {editId ? "Edit Therapy" : "Add New Therapy"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg mb-12">
        {/* Main Title */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Main Title</label>
          <input
            type="text"
            value={form.mainTitle}
            onChange={handleMainTitleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* URL Input */}
        <div className="mb-4">
          <label className="block font-medium mb-1">URL Link</label>
          <input
            type="text"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="https://example.com"
          />
        </div>

        {/* Role Selector */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Role</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value as any })}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="Admin">Admin</option>
            <option value="Therapist">Therapist</option>
            <option value="Parent">Parent</option>
          </select>
        </div>

        {/* Status Toggle */}
        <div className="mb-4 flex items-center gap-4">
          <label className="font-medium">Status:</label>
          <button
            type="button"
            className={`px-4 py-2 rounded ${form.status === "Active" ? "bg-green-600 text-white" : "bg-gray-300"}`}
            onClick={() => setForm({ ...form, status: "Active" })}
          >
            Active
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded ${form.status === "Inactive" ? "bg-red-600 text-white" : "bg-gray-300"}`}
            onClick={() => setForm({ ...form, status: "Inactive" })}
          >
            Inactive
          </button>
        </div>

        {/* Sections */}
        {form.sections.map((section, index) => (
          <div key={section.id} className="border p-4 rounded mb-4 relative bg-gray-50">
            <button
              type="button"
              onClick={() => removeSection(index)}
              className="absolute top-2 right-2 text-red-600 font-bold"
            >
              X
            </button>

            <div className="mb-2">
              <label className="block font-medium mb-1">Section Header</label>
              <input
                type="text"
                value={section.header}
                onChange={(e) => handleSectionChange(index, "header", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block font-medium mb-1">Description</label>
              <textarea
                value={section.description}
                onChange={(e) => handleSectionChange(index, "description", e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows={3}
              ></textarea>
            </div>

            <div className="mb-2 flex items-center gap-2">
              <label className="font-medium">Add List?</label>
              <input
                type="checkbox"
                checked={section.hasList}
                onChange={(e) => handleSectionChange(index, "hasList", e.target.checked)}
              />
            </div>

            {section.hasList &&
              section.listItems.map((item, itemIndex) => (
                <div key={itemIndex} className="flex gap-2 mb-2 items-center">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleListItemChange(index, itemIndex, e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="List item"
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem(index, itemIndex)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    X
                  </button>
                </div>
              ))}

            {section.hasList && (
              <button
                type="button"
                onClick={() => addListItem(index)}
                className="bg-green-600 text-white px-4 py-1 rounded"
              >
                + Add List Item
              </button>
            )}
          </div>
        ))}

        <div className="mb-4">
          <button
            type="button"
            onClick={addSection}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Section
          </button>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-800 text-white py-2 px-6 rounded-full hover:bg-blue-900 transition-colors"
          >
            {editId ? "Update Therapy" : "Add Therapy"}
          </button>
          <Link
            href="/admin/therapiesdetail"
            className="bg-gray-400 text-white py-2 px-6 rounded-full hover:bg-gray-500 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
