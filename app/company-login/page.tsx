"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuth } from "../context_api/AuthContext";

export default function CompanyLoginPage() {
  const router = useRouter();
  const { Company_login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCompanyLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Company email and password are required");
      return;
    }

    try {
      setLoading(true);

      await Company_login({
        emailId: email,
        password,
      });

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome to Company Dashboard 🎉",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        router.push("/company-dashboard");
      }, 1500);

    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          err?.response?.data?.message ||
          "Invalid company credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center px-6">
      <div className="bg-white text-black rounded-2xl shadow-xl p-8 w-full max-w-md">

        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-4 text-indigo-600">
          <Building2 />
          <span className="font-semibold">Company Access</span>
        </div>

        <h3 className="text-2xl font-bold text-center text-gray-900">
          Company Login
        </h3>
        <p className="text-center text-gray-600 text-sm mt-1">
          Post jobs & internships for students
        </p>

        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700">
            Company Email
          </label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="email"
              placeholder="hr@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
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
          onClick={handleCompanyLogin}
          disabled={loading}
          className="w-full mt-6 py-2 rounded-md text-white font-medium bg-gradient-to-r from-indigo-600 to-blue-500 hover:opacity-90 transition"
        >
          {loading ? "Signing in..." : "Sign In as Company"}
        </button>
        {/* Register Section */}
<div className="mt-4 text-center">
  <p className="text-sm text-gray-600">
    New company on Collexa?
  </p>
  <button
    onClick={() => router.push("/company-register")}
    className="mt-1 text-sm font-medium text-indigo-600 hover:underline"
  >
    Register as Company
  </button>
</div>


        <p className="text-xs text-gray-500 text-center mt-4">
          Only registered companies can post jobs & internships.
        </p>
      </div>
    </div>
  );
}
