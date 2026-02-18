"use client";

import Link from "next/link";
import { useState } from "react";
import ForgotPasswordModal from "../(components)/ForgotPasswordModal";
import { Eye, EyeOff, Mail, Lock, UserPlus, LogIn } from "lucide-react";
import { useAuth } from "../context_api/AuthContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function StudentLogin() {
  const [showPass, setShowPass] = useState(false);
  const [open, setOpen] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Email and password are required",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await login({
        emailId: form.email,
        password: form.password,
      });

      Swal.fire({
        icon: "success",
        title: "Login Successful 🎉",
        text: "Redirecting to dashboard...",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        // ✅ STUDENT REDIRECT
        if (res.user.role === "student") {
          router.push("/");
        } else {
          // safety fallback
          router.push("/");
        }
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err?.response?.data?.message || "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7faff] to-[#eef5ff] flex items-center justify-center px-4">
      <div className="max-w-7xl mt-4 mb-10 text-gray-700 w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* ---------------- LEFT SECTION ---------------- */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-blue-500 p-2 rounded-lg">
              <span className="text-white text-2xl">🎓</span>
            </div>
            <h1 className="text-2xl font-bold text-blue-900">Collexa</h1>
          </div>

          <h2 className="text-4xl font-extrabold text-gray-900 leading-snug">
            Transform Your Future
            <br />
            with <span className="text-emerald-500">Expert Education</span>
          </h2>

          <p className="text-gray-600 mt-4 max-w-lg">
            Join thousands of students who have already transformed their
            careers with our industry-leading courses and expert mentorship.
          </p>

          <div className="mt-6 space-y-3">
            <p className="flex items-center gap-3 text-gray-700">
              🎯 Expert-led courses
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              🤝 Industry partnerships
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              ⭐ 5-star rated platform
            </p>
            <p className="flex items-center gap-3 text-gray-700">
              🌍 Global community
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-10 text-center">
            <div>
              <h3 className="text-2xl font-bold">50K+</h3>
              <p className="text-gray-500 text-sm">Students</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">200+</h3>
              <p className="text-gray-500 text-sm">Courses</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">95%</h3>
              <p className="text-gray-500 text-sm">Success Rate</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">4.9/5</h3>
              <p className="text-gray-500 text-sm">Rating</p>
            </div>
          </div>
        </div>

        {/* ---------------- RIGHT LOGIN CARD ---------------- */}
        <div className="bg-white shadow-xl rounded-2xl p-8 border">
          <h2 className="text-center text-lg md:text-4xl font-bold text-blue-900">
            Student Login
          </h2>

          <p className="text-center text-gray-500 mt-2">
            Sign in to continue your learning journey
          </p>

          {/* EMAIL */}
          <label className="block mt-6 text-sm font-semibold text-gray-700">
            Email Address
          </label>
          <div className="flex items-center border rounded-lg px-3 mt-1">
            <Mail size={18} />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 outline-none"
            />
          </div>

          {/* PASSWORD */}
          <label className="block mt-4 text-sm font-semibold text-gray-700">
            Password
          </label>
          <div className="flex items-center border rounded-lg px-3 mt-1">
            <Lock size={18} />
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-2 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="text-gray-500"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-sm text-blue-700 hover:underline mt-2"
          >
            Forgot password?
          </button>

          <ForgotPasswordModal open={open} setOpen={setOpen} />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-blue-900 to-emerald-400 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="flex items-center my-4">
            <hr className="w-full" />
            <span className="px-2 text-gray-700 text-sm text-nowrap">New to Collexa?</span>
            <hr className="w-full" />
          </div>

          <Link href="/register">
            <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2">
              <UserPlus size={18} /> Create New Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
