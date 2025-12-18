"use client";

import React from "react";
import { User } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-800 overflow-hidden">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Area */}
      <div className="ml-64 flex flex-col flex-1 h-screen overflow-hidden">

        {/* Top Bar */}
        <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-8 shrink-0">
          <h2 className="text-lg font-semibold">Admin Panel</h2>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">
              admin@arcl.org
            </span>
            <div className="w-9 h-9 rounded-full bg-[#3f1a7b] text-white flex items-center justify-center">
              <User size={18} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
