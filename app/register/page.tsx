"use client";

import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  ChevronDown,
  ShieldCheck,
  Link
} from "lucide-react";


import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
const router = useRouter();
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    role: "Student",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    // ⭐ REQUIRED FIELD VALIDATION
    if (!form.fname) return setError("First Name is required");
    if (!form.email) return setError("Email is required");
    if (!form.phone) return setError("Phone Number is required");
    if (!form.role) return setError("Please select your role");
    if (!form.password) return setError("Password is required");
    if (!form.confirm) return setError("Please confirm your password");

    if (form.password !== form.confirm)
      return setError("Passwords do not match");

    try {
      setLoading(true);

      // 🔥 API CONNECT HERE LATER
      // await fetch("/api/register", { ... })

      setTimeout(() => {
        setLoading(false);
        alert("Account Created Successfully 🎉");
      }, 800);
    } catch (err) {
      setLoading(false);
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fbff] flex items-center justify-center px-6">

      <div className="max-w-7xl mt-25 mb-10 w-full grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT SECTION */}
        <div className=" md:block mt-16">
          <div className="flex items-center gap-2 text-xl font-bold text-[#0c2c66]">
            <ShieldCheck className="text-blue-600" /> Collexa
          </div>

          <h1 className="text-3xl font-extrabold mt-6 text-[#0c2c66]">
            Start Your Journey with <span className="text-emerald-500">Collexa</span>
          </h1>

          <p className="text-gray-600 mt-3">
            Join our community of learners and unlock your potential with world-class education.
          </p>

          <ul className="mt-6 space-y-3 text-gray-700">
            <li>• Expert-led courses</li>
            <li>• Industry partnerships</li>
            <li>• 5-star rated platform</li>
            <li>• Global community</li>
          </ul>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-10 text-center">

            <div>
              <h3 className="text-2xl text-black font-bold">50K+</h3>
              <p className="text-gray-500 text-sm">Students</p>
            </div>

            <div>
              <h3 className="text-2xl text-black font-bold">200+</h3>
              <p className="text-gray-500 text-sm">Courses</p>
            </div>

            <div>
              <h3 className="text-2xl text-black font-bold">95%</h3>
              <p className="text-gray-500 text-sm">Success Rate</p>
            </div>

            <div>
              <h3 className="text-2xl text-black font-bold">4.9/5</h3>
              <p className="text-gray-500 text-sm">Rating</p>
            </div>

          </div>
        </div>

        {/* RIGHT — FORM */}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-8 space-y-4">

          <h2 className="text-center text-xl font-bold text-[#0c2c66]">
            Create Account
          </h2>

          {error && (
            <p className="text-red-500 bg-red-50 p-2 rounded-md text-sm">{error}</p>
          )}

          {/* NAME */}
          <div className="grid text-gray-700 grid-cols-2 gap-3">
            <div className="border text-gray-700 rounded-md flex items-center gap-2 px-2">
              <User size={16} />
              <input
                name="fname"
                placeholder="First Name *"
                className="w-full text-gray-700 p-2 outline-none"
                value={form.fname}
                onChange={handleChange}
              />
            </div>

            <div className="border text-gray-700 rounded-md flex items-center gap-2 px-2">
              <User size={16} />
              <input
                name="lname"
                placeholder="Last Name"
                className="w-full text-gray-700 p-2 outline-none"
                value={form.lname}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="border text-gray-700 rounded-md flex items-center gap-2 px-2">
            <Mail size={16} />
            <input
              name="email"
              placeholder="Email Address *"
              className="w-full text-gray-700 p-2 outline-none"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* PHONE */}
          <div className="border text-gray-700 rounded-md flex items-center gap-2 px-2">
            <Phone size={16} />
            <input
              name="phone"
              placeholder="Phone Number *"
              className="w-full  text-gray-700 p-2 outline-none"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          {/* ROLE (Required) */}
          <div className="border text-gray-700 rounded-md flex items-center justify-between px-3">
            <select
              name="role"
              className="w-full p-2 outline-none"
              value={form.role}
              onChange={handleChange}
            >
              <option value="Student">Student</option>
              <option value="Instructor">Company</option>
              <option value="Recruiter">Institution</option>
            </select>
            
          </div>

          {/* PASSWORD */}
          <div className="border text-gray-700 rounded-md flex items-center gap-2 px-2">
            <Lock size={16} />
            <input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder="Create password *"
              className="w-full text-gray-700 p-2 outline-none"
              value={form.password}
              onChange={handleChange}
            />

            {showPass ? (
              <EyeOff size={16} className="cursor-pointer text-gray-700" onClick={() => setShowPass(false)} />
            ) : (
              <Eye size={16} className="cursor-pointer text-gray-700" onClick={() => setShowPass(true)} />
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="border text-gray-700 rounded-md flex items-center gap-2 px-2">
            <Lock size={16} />
            <input
              name="confirm"
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password *"
              className="w-full p-2 outline-none text-gray-700"
              value={form.confirm}
              onChange={handleChange}
            />

            {showConfirm ? (
              <EyeOff size={16} className="cursor-pointer text-gray-700" onClick={() => setShowConfirm(false)} />
            ) : (
              <Eye size={16} className="cursor-pointer text-gray-700" onClick={() => setShowConfirm(true)} />
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#163683] text-white py-2 rounded-md mt-3 hover:opacity-90"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* DIV — Already Have Account Section */}
<div className="w-full mt-3">

  {/* Divider line with text */}
  <div className="flex items-center gap-3 my-3">
    <span className="flex-1 h-px bg-gray-200" />
    <p className="text-gray-500 text-sm whitespace-nowrap">
      Already have an account?
    </p>
    <span className="flex-1 h-px bg-gray-200" />
  </div>

  {/* Sign In Button */}
  
  <button 
     onClick={() => router.push("/")}
    type="button"
    className="w-full border text-gray-700 rounded-md py-2 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <polyline points="17 11 19 13 23 9" />
    </svg>

  
  <span className="text-sm font-medium text-gray-700">
      Sign In Instead
    </span>
  
    
  </button>

</div>

        </form>
      </div>
    </div>
  );
}
