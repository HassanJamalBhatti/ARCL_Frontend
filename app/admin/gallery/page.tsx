"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Upload, Trash2 } from "lucide-react";

/* ================= TYPES ================= */

interface Therapy {
  _id: string;
  mainTitle: string;
  status: "Active" | "Inactive";
}

interface GalleryImage {
  _id: string;
  imageUrl: string;
  therapyId: string;
  therapyTitle: string;
}

/* ================= PAGE ================= */

export default function AdminGalleryPage() {
  const [therapies, setTherapies] = useState<Therapy[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<{
    files: File[];
    previews: string[];
    therapyId: string;
  }>({
    files: [],
    previews: [],
    therapyId: "",
  });

  /* ================= FETCH THERAPIES ================= */
  const fetchTherapies = async () => {
    const res = await fetch("http://localhost:5000/api/therapies");
    const data = await res.json();
    setTherapies(data.filter((t: Therapy) => t.status === "Active"));
  };

  /* ================= FETCH GALLERY ================= */
  const fetchGallery = async () => {
    const res = await fetch("http://localhost:5000/api/gallery");
    const data = await res.json();
    setGallery(data);
  };

  useEffect(() => {
    fetchTherapies();
    fetchGallery();
  }, []);

  /* ================= FILE CHANGE ================= */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setForm({
      ...form,
      files,
      previews: files.map((f) => URL.createObjectURL(f)),
    });
  };

  /* ================= SAVE MULTIPLE ================= */
  const handleSave = async () => {
    if (form.files.length === 0 || !form.therapyId) {
      return alert("Please select therapy and images");
    }

    const fd = new FormData();
    form.files.forEach((file) => fd.append("images", file));
    fd.append("therapyId", form.therapyId);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/gallery", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error("Upload failed");

      await fetchGallery();
      setForm({ files: [], previews: [], therapyId: "" });
      alert("Images uploaded successfully");
    } catch (err) {
      alert("Error uploading images");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    await fetch(`http://localhost:5000/api/gallery/${id}`, {
      method: "DELETE",
    });
    fetchGallery();
  };

  return (
    <main className="min-h-screen px-6 py-12">
      <h1 className="text-4xl font-extrabold text-[#2a1d7a] mb-2">
        Gallery Management
      </h1>
      <p className="text-gray-600 mb-10">
        Upload multiple images according to therapies
      </p>

      {/* ================= ADD FORM ================= */}
      <div className="bg-white p-8 rounded-2xl shadow-xl mb-16 max-w-6xl">
        <h2 className="text-2xl font-bold text-[#2a1d7a] mb-6 flex items-center gap-2">
          <Plus /> Add Gallery Images
        </h2>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {/* IMAGE UPLOAD CARD */}
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-8 hover:border-[#3f1a7b] transition flex flex-col justify-center min-h-[260px]">
            <label className="flex flex-col items-center justify-center cursor-pointer text-center h-full">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#3f1a7b]/10 mb-4">
                <Upload className="text-[#3f1a7b]" size={28} />
              </div>

              <h4 className="font-semibold text-gray-800">
                Upload Gallery Images
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                Click to select multiple images (JPG, PNG)
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* THERAPY SELECT CARD */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[260px]">
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">
                Assign to Therapy
              </label>

              <p className="text-xs text-gray-500">
                Only active therapies are shown
              </p>

              <select
                value={form.therapyId}
                onChange={(e) =>
                  setForm({ ...form, therapyId: e.target.value })
                }
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-[#3f1a7b] focus:ring-2 focus:ring-[#3f1a7b]/30 outline-none transition"
              >
                <option value="">-- Select Therapy --</option>
                {therapies.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.mainTitle}
                  </option>
                ))}
              </select>

              {form.therapyId && (
                <p className="text-sm text-gray-700">
                  Selected:{" "}
                  <span className="font-semibold">
                    {
                      therapies.find(
                        (t) => t._id === form.therapyId
                      )?.mainTitle
                    }
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* ACTION CARD */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[260px]">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">
                Save Gallery
              </h4>
              <p className="text-sm text-gray-500">
                Upload all selected images at once
              </p>
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-[#3f1a7b] text-white font-semibold rounded-xl py-3 hover:bg-[#2a1d7a] transition disabled:opacity-60"
            >
              {loading ? "Uploading..." : "Save Images"}
            </button>
          </div>
        </div>

        {/* ================= PREVIEWS ================= */}
        {form.previews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {form.previews.map((src, i) => (
              <Image
                key={i}
                src={src}
                alt="Preview"
                width={200}
                height={150}
                unoptimized
                className="rounded-xl object-cover h-32 w-full"
              />
            ))}
          </div>
        )}
      </div>

      {/* ================= GALLERY LIST ================= */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {gallery.map((img) => (
          <div
            key={img._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden group relative"
          >
            <Image
              src={`http://localhost:5000${img.imageUrl}`}
              alt={img.therapyTitle}
              width={400}
              height={300}
              unoptimized
              className="h-56 w-full object-cover"
            />

            <div className="p-4 flex justify-between items-center">
              <p className="text-sm text-gray-600 truncate">
                {img.therapyTitle}
              </p>
              <button
                onClick={() => handleDelete(img._id)}
                className="bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                aria-label="Delete Image"
                >
                <Trash2 size={18} />
                </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
