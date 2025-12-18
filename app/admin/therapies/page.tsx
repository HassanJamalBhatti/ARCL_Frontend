"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Therapy {
  id: number;
  title: string;
  path: string;
}

export default function TherapiesAdmin() {
  const [therapies, setTherapies] = useState<Therapy[]>([
    { id: 1, title: "Speech Language Pathology (SLP)", path: "/therapies/slp" },
    { id: 2, title: "Applied Behavior Analysis (ABA)", path: "/therapies/aba" },
  ]);

  const [form, setForm] = useState({ title: "", path: "" });
  const [editId, setEditId] = useState<number | null>(null);

  /* ================= ADD / UPDATE ================= */
  const submitHandler = () => {
    if (!form.title || !form.path) return alert("Fill all fields");

    if (editId) {
      setTherapies((prev) =>
        prev.map((t) =>
          t.id === editId ? { ...t, ...form } : t
        )
      );
      setEditId(null);
    } else {
      setTherapies((prev) => [
        ...prev,
        { id: Date.now(), ...form },
      ]);
    }

    setForm({ title: "", path: "" });
  };

  /* ================= DELETE ================= */
  const deleteHandler = (id: number) => {
    if (confirm("Delete this therapy?")) {
      setTherapies((prev) => prev.filter((t) => t.id !== id));
    }
  };

  /* ================= EDIT ================= */
  const editHandler = (therapy: Therapy) => {
    setEditId(therapy.id);
    setForm({ title: therapy.title, path: therapy.path });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Therapies</h1>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full">
          <thead className="bg-[#3f1a7b] text-white">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Path</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {therapies.map((t) => (
              <tr key={t.id} className="border-b">
                <td className="p-3">{t.title}</td>
                <td className="p-3 text-sm text-gray-500">{t.path}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => editHandler(t)}
                    className="p-2 bg-yellow-400 rounded text-white"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => deleteHandler(t.id)}
                    className="p-2 bg-red-500 rounded text-white"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= FORM ================= */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Plus size={18} />
          {editId ? "Edit Therapy" : "Add New Therapy"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Therapy Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-3 rounded"
          />
          <input
            type="text"
            placeholder="/therapies/slug"
            value={form.path}
            onChange={(e) => setForm({ ...form, path: e.target.value })}
            className="border p-3 rounded"
          />
        </div>

        <button
          onClick={submitHandler}
          className="mt-4 bg-[#3f1a7b] text-white px-6 py-3 rounded-lg"
        >
          {editId ? "Update Therapy" : "Add Therapy"}
        </button>
      </div>
    </div>
  );
}
