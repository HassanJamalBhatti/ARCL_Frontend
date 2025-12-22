"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaTrash, FaPlus, FaFilePdf } from "react-icons/fa";

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
export default function AdminPage() {
  const [governingBody, setGoverningBody] = useState<Member[]>([]);
  const [executiveTeam, setExecutiveTeam] = useState<Member[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [financialPDFs, setFinancialPDFs] = useState<FinancialPDF[]>([]);

  /* ================= FETCH FUNCTIONS ================= */
  const fetchGoverning = async () => {
    const res = await fetch("http://localhost:5000/api/governing");
    const data = await res.json();
    setGoverningBody(data);
  };

  const fetchExecutive = async () => {
    const res = await fetch("http://localhost:5000/api/executive");
    const data = await res.json();
    setExecutiveTeam(data);
  };

  const fetchCertifications = async () => {
    const res = await fetch("http://localhost:5000/api/certifications");
    const data = await res.json();
    setCertifications(data);
  };

  const fetchFinancialPDFs = async () => {
    const res = await fetch("http://localhost:5000/api/financial");
    const data = await res.json();
    setFinancialPDFs(data);
  };

  useEffect(() => {
    fetchGoverning();
    fetchExecutive();
    fetchCertifications();
    fetchFinancialPDFs();
  }, []);

  /* ================= DELETE FUNCTIONS ================= */
  const deleteMember = async (type: "governing" | "executive", id: string) => {
    if (!confirm("Are you sure?")) return;

    await fetch(`http://localhost:5000/api/${type}/${id}`, { method: "DELETE" });
    if (type === "governing") fetchGoverning();
    else fetchExecutive();
  };

  const deleteCertification = async (id: string) => {
    if (!confirm("Delete this certification?")) return;
    await fetch(`http://localhost:5000/api/certifications/${id}`, { method: "DELETE" });
    fetchCertifications();
  };

  const deleteFinancialPDF = async (id: string) => {
    if (!confirm("Delete this financial PDF?")) return;
    await fetch(`http://localhost:5000/api/financial/${id}`, { method: "DELETE" });
    fetchFinancialPDFs();
  };

  /* ================= RENDER ================= */
  const renderMemberCard = (m: Member, type: "governing" | "executive") => (
    <div key={m._id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg text-center">
      <Image
        src={`http://localhost:5000${m.image}`}
        alt={m.name}
        width={120}
        height={120}
        unoptimized
        className="rounded-full mx-auto mb-4 border-2 border-blue-600"
      />
      <h3 className="font-bold">{m.name}</h3>
      <p className="text-gray-500">{m.position}</p>
      <div className="flex justify-center gap-3 mt-4">
        <Link
            href={`/admin/about/${type}/edit/${m._id}`}
            className="flex items-center gap-1 text-sm px-3 py-1 border rounded text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition"
        >
            <FaEdit size={14} /> Edit
        </Link>

        <button
            onClick={() => deleteMember(type, m._id)}
            className="flex items-center gap-1 text-sm px-3 py-1 border border-red-400 text-red-600 rounded hover:bg-red-100 hover:text-red-800 transition"
        >
            <FaTrash size={14} /> Delete
        </button>
        </div>
    </div>
  );

  return (
    <div className="p-10 bg-gray-100 min-h-screen text-gray-800">
      <h1 className="text-4xl font-bold mb-10">Manage About Us Data</h1>

      {/* Governing Body */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Governing Body</h2>
          <Link href="/admin/about/governing/add" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <FaPlus /> Add Member
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {governingBody.map((m) => renderMemberCard(m, "governing"))}
        </div>
      </section>

      {/* Executive Team */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Executive Team</h2>
          <Link href="/admin/about/executive/add" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <FaPlus /> Add Member
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {executiveTeam.map((m) => renderMemberCard(m, "executive"))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Certifications</h2>
          <Link href="/admin/about/certifications/add" className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            <FaPlus /> Add Certification
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {certifications.map((c) => (
            <div key={c._id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg text-center">
              <Image
                src={`http://localhost:5000${c.image}`}
                alt={c.title}
                width={120}
                height={120}
                unoptimized
                className="mx-auto mb-4 rounded"
              />
              <h3 className="font-bold">{c.title}</h3>
              <a href={`http://localhost:5000${c.pdf}`} target="_blank" className="flex justify-center items-center gap-2 text-red-600 mt-2">
                <FaFilePdf /> PDF
              </a>
              <div className="flex justify-center gap-3 mt-3">
                <Link
                    href={`/admin/about/certifications/edit/${c._id}`}
                    className="flex items-center gap-1 text-sm px-3 py-1 border rounded text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition"
                >
                    <FaEdit size={14} /> Edit
                </Link>

                <button
                    onClick={() => deleteCertification(c._id)}
                    className="flex items-center gap-1 text-sm px-3 py-1 border border-red-400 text-red-600 rounded hover:bg-red-100 hover:text-red-800 transition"
                >
                    <FaTrash size={14} /> Delete
                </button>
                </div>

            </div>
          ))}
        </div>
      </section>

      {/* Financial Reports */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Financial Audit Reports</h2>
          <Link href="/admin/about/financial/add" className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            <FaPlus /> Upload PDF
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {financialPDFs.map((f) => (
            <div key={f._id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg text-center">
              <a href={`http://localhost:5000${f.pdf}`} target="_blank" className="flex justify-center items-center gap-2 text-red-600">
                <FaFilePdf /> <span className="text-black">{f.title}</span>
              </a>
              <div className="flex justify-center gap-3 mt-3">
                <Link
                    href={`/admin/about/financial/edit/${f._id}`}
                    className="flex items-center gap-1 text-sm px-3 py-1 border rounded text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition"
                >
                    <FaEdit size={14} /> Edit
                </Link>

                <button
                    onClick={() => deleteFinancialPDF(f._id)}
                    className="flex items-center gap-1 text-sm px-3 py-1 border border-red-400 text-red-600 rounded hover:bg-red-100 hover:text-red-800 transition"
                >
                    <FaTrash size={14} /> Delete
                </button>
                </div>

            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
