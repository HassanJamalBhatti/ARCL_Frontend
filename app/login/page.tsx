"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Eye, EyeOff, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      router.push("/admin");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const contentType = res.headers.get("content-type");
      let data: any;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.error("Unexpected response:", text);
        throw new Error("Server did not return JSON. Check backend.");
      }

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save token, user info, and sessionId
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("userInfo", JSON.stringify({
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        status: data.user.status,
      }));
      localStorage.setItem("sessionId", data.sessionId);

      router.push("/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const handleLogout = async () => {
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) return;

    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      localStorage.removeItem("adminToken");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("sessionId");

      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3f1a7b]">
      <div className="relative w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/logolatest.png"
            alt="Logo Background"
            fill
            className="object-cover opacity-10"
          />
        </div>

        <div className="relative z-10 px-8 py-10">
          <div className="flex justify-center mb-6">
            <Image
              src="/arcl_logo.jpg"
              alt="Logo"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>

          <h1 className="text-3xl font-bold text-[#3f1a7b] text-center mb-8">
            Welcome to ARCL Admin Panel
          </h1>

          {error && (
            <p className="text-red-600 bg-red-100 p-3 rounded mb-4">{error}</p>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-12"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-yellow-400 text-[#3f1a7b] font-semibold rounded-xl hover:bg-[#3f1a7b] hover:text-yellow-400 transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Logout button (visible if already logged in) */}
          {localStorage.getItem("adminToken") && (
            <button
              onClick={handleLogout}
              className="w-full mt-4 py-3 flex items-center justify-center gap-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition"
            >
              <LogOut size={18} /> Logout
            </button>
          )}

          <div className="flex justify-between mt-4 text-sm text-gray-500">
            <a href="#" className="hover:text-yellow-400">Forgot Password?</a>
            <a href="/" className="hover:text-yellow-400">Back To Website</a>
          </div>
        </div>
      </div>
    </div>
  );
}
