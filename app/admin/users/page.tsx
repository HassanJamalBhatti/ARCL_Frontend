"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  console.log("Logged-in user:", loggedInUser);
  /* ================= FETCH LOGGED-IN USER ================= */
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }

    try {
      const payloadBase64 = token.split(".")[1];
      const decoded = JSON.parse(atob(payloadBase64));
      setLoggedInUser({
        _id: decoded.id,
        name: decoded.name || "",
        email: decoded.email || "",
        role: decoded.role || "",
        status: decoded.status || "",
      });
    } catch (err) {
      console.error("Invalid token", err);
      setError("Invalid token");
    }
  }, []);

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        if (loggedInUser?.role === "admin") {
          setUsers(data); // admin sees all users
        } else if (loggedInUser) {
          // non-admin sees only their own data
          const filtered = data.filter((u: User) => u.email === loggedInUser.email);
          setUsers(filtered);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (loggedInUser) fetchUsers();
  }, [loggedInUser]);

  /* ================= DELETE USER ================= */
  const handleDelete = async (id: string) => {
    if (loggedInUser?.role !== "admin") {
      alert("Only admins can delete users");
      return;
    }

    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  /* ================= UI STATES ================= */
  if (loading) return <p className="text-center py-20">Loading users...</p>;
  if (error) return <p className="text-center py-20 text-red-600">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#3f1a7b]">Manage Users</h1>

        {loggedInUser?.role === "admin" && (
          <Link
            href="/admin/users/add"
            className="flex items-center gap-2 bg-yellow-400 text-[#3f1a7b] px-4 py-2 rounded font-semibold hover:bg-[#3f1a7b] hover:text-white transition"
          >
            <Plus size={18} /> Add User
          </Link>
        )}
      </div>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user._id} className="bg-white rounded-xl shadow p-4">
              <h3 className="font-bold text-[#3f1a7b]">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm mt-1">
                Role: <span className="font-medium">{user.role}</span>
              </p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={`font-medium ${
                    user.status === "Active" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {user.status}
                </span>
              </p>

              <div className="flex gap-3 mt-4">
                <Link
                  href={`/admin/users/edit/${user._id}`}
                  className="flex items-center gap-1 text-sm px-3 py-1 border rounded hover:bg-gray-100"
                >
                  <Pencil size={14} /> Edit
                </Link>

                {loggedInUser?.role === "admin" && (
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="flex items-center gap-1 text-sm px-3 py-1 border border-red-400 text-red-600 rounded hover:bg-red-50"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
