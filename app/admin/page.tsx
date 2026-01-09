"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔐 DEMO API (replace later with real API)
  const handleAdminLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      // ⏳ fake delay (API demo)
      await new Promise((res) => setTimeout(res, 1500));

      // ✅ demo validation
      if (email === "admin@collexa.com" && password === "admin123") {
        alert("Admin login successful ✅");
        // later: router.push("/admin/dashboard")
      } else {
        throw new Error("Invalid admin credentials");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex items-center justify-center px-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SECTION */}
        <div className="hidden md:block">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              🎓
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Collexa Edu</h1>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            Transform Your Future <br />
            with <span className="text-emerald-500">Expert Education</span>
          </h2>

          <p className="mt-4 text-gray-600 max-w-md">
            Secure admin access to manage courses, users, analytics and platform
            operations.
          </p>

          <ul className="mt-6 space-y-3 text-gray-700">
            <li className="flex items-center gap-2">⭐ Expert-led courses</li>
            <li className="flex items-center gap-2">🤝 Industry partnerships</li>
            <li className="flex items-center gap-2">🌍 Global learning community</li>
            <li className="flex items-center gap-2">🔐 Admin-only secure panel</li>
          </ul>

          <div className="grid grid-cols-2 gap-6 mt-10">
            <div>
              <p className="text-2xl font-bold text-gray-900">50K+</p>
              <p className="text-sm text-gray-600">Students</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">200+</p>
              <p className="text-sm text-gray-600">Courses</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">95%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">4.9/5</p>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
          </div>
        </div>

        {/* RIGHT LOGIN CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4 text-blue-600">
            <ShieldCheck />
            <span className="font-semibold">Admin Access</span>
          </div>

          <h3 className="text-2xl font-bold text-center text-gray-900">
            Welcome Back
          </h3>
          <p className="text-center text-gray-600 text-sm mt-1">
            Sign in to manage the Collexa platform
          </p>

          {error && (
            <div className="mt-4 text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mt-6 text-gray-700">
            <label className="text-sm font-medium text-gray-700">
              Admin Email
            </label>
            <div className="relative mt-1 text-gray-700">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="admin@collexa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 text-gray-700 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mt-4 text-gray-700">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1 text-gray-700">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-gray-700 pl-10 pr-10 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          

          {/* Button */}
          <button
            onClick={handleAdminLogin}
            disabled={loading}
            className="w-full mt-6 py-2 rounded-md text-white font-medium bg-gradient-to-r from-blue-700 to-emerald-500 hover:opacity-90 transition"
          >
            {loading ? "Signing in..." : "Sign In as Admin"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            This login is restricted to authorized administrators only.
          </p>
        </div>
      </div>
    </div>
  );
}
