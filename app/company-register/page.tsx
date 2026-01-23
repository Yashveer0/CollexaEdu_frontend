"use client";

import { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
  Phone,
  Globe,
  MapPin,
  User,
  FileText,
} from "lucide-react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function CompanyRegisterPage() {
  const router = useRouter();

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    companyName: "",
    companyEmail: "",
    phone: "",
    password: "",

    gst: "",
    cin: "",
    website: "",
    linkedin: "",

    hrName: "",
    hrEmail: "",
    hrPhone: "",

    companyType: "",
    hiringFor: "",

    city: "",
    state: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    if (!form.companyName) return setError("Company name is required");
    if (!form.companyEmail) return setError("Company email is required");
    if (!form.phone) return setError("Phone number is required");
    if (!form.password) return setError("Password is required");
    if (!form.hiringFor) return setError("Please select hiring type");

    try {
      setLoading(true);

      // 🔥 DEMO API PAYLOAD
      const payload = {
        ...form,
        role: "company",
      };

      console.log("Company Register Payload 👉", payload);

      // ⏳ Fake delay
      await new Promise((res) => setTimeout(res, 1200));

      Swal.fire({
        icon: "success",
        title: "Company Registered 🎉",
        text: "You can now login and post jobs / internships",
      }).then(() => {
        router.push("/company-login");
      });

    } catch (err) {
      setError("Company registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbff] flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black max-w-2xl w-full p-8 rounded-2xl shadow-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center text-[#0c2c66]">
          Company Registration
        </h2>

        {error && (
          <p className="text-red-500 bg-red-50 p-2 rounded text-sm">{error}</p>
        )}

        {/* Company Name */}
        <div className="border rounded-md flex items-center gap-2 px-2">
          <Building2 size={16} />
          <input
            name="companyName"
            placeholder="Company Name *"
            className="w-full p-2 outline-none"
            value={form.companyName}
            onChange={handleChange}
          />
        </div>

        {/* Company Email */}
        <div className="border rounded-md flex items-center gap-2 px-2">
          <Mail size={16} />
          <input
            name="companyEmail"
            placeholder="Company Email *"
            className="w-full p-2 outline-none"
            value={form.companyEmail}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className="border rounded-md flex items-center gap-2 px-2">
          <Phone size={16} />
          <input
            name="phone"
            placeholder="Company Phone *"
            maxLength={10}
            className="w-full p-2 outline-none"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        {/* GST + CIN */}
        <div className="grid grid-cols-2 gap-3">
          <input
            name="gst"
            placeholder="GST Number"
            className="border p-2 rounded-md outline-none"
            value={form.gst}
            onChange={handleChange}
          />
          <input
            name="cin"
            placeholder="CIN Number"
            className="border p-2 rounded-md outline-none"
            value={form.cin}
            onChange={handleChange}
          />
        </div>

        {/* Website + LinkedIn */}
        <div className="grid grid-cols-2 gap-3">
          <input
            name="website"
            placeholder="Company Website"
            className="border p-2 rounded-md outline-none"
            value={form.website}
            onChange={handleChange}
          />
          <input
            name="linkedin"
            placeholder="LinkedIn URL"
            className="border p-2 rounded-md outline-none"
            value={form.linkedin}
            onChange={handleChange}
          />
        </div>

        {/* HR Info */}
        <div className="grid grid-cols-3 gap-3">
          <input
            name="hrName"
            placeholder="HR Name"
            className="border p-2 rounded-md outline-none"
            value={form.hrName}
            onChange={handleChange}
          />
          <input
            name="hrEmail"
            placeholder="HR Email"
            className="border p-2 rounded-md outline-none"
            value={form.hrEmail}
            onChange={handleChange}
          />
          <input
            name="hrPhone"
            placeholder="HR Phone"
            className="border p-2 rounded-md outline-none"
            value={form.hrPhone}
            onChange={handleChange}
          />
        </div>

        {/* Company Type */}
        <select
          name="companyType"
          className="border p-2 rounded-md w-full"
          value={form.companyType}
          onChange={handleChange}
        >
          <option value="">Company Type</option>
          <option value="startup">Startup</option>
          <option value="msme">MSME</option>
          <option value="mnc">MNC</option>
        </select>

        {/* Hiring For */}
        <select
          name="hiringFor"
          className="border p-2 rounded-md w-full"
          value={form.hiringFor}
          onChange={handleChange}
        >
          <option value="">Hiring For *</option>
          <option value="job">Jobs</option>
          <option value="internship">Internships</option>
          <option value="both">Both</option>
        </select>

        {/* City + State */}
        <div className="grid grid-cols-2 gap-3">
          <input
            name="city"
            placeholder="City"
            className="border p-2 rounded-md outline-none"
            value={form.city}
            onChange={handleChange}
          />
          <input
            name="state"
            placeholder="State"
            className="border p-2 rounded-md outline-none"
            value={form.state}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="border rounded-md flex items-center gap-2 px-2">
          <Lock size={16} />
          <input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Create Password *"
            className="w-full p-2 outline-none"
            value={form.password}
            onChange={handleChange}
          />
          {showPass ? (
            <EyeOff onClick={() => setShowPass(false)} />
          ) : (
            <Eye onClick={() => setShowPass(true)} />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#163683] text-white py-2 rounded-md"
        >
          {loading ? "Registering..." : "Register Company"}
        </button>
      </form>
    </div>
  );
}
