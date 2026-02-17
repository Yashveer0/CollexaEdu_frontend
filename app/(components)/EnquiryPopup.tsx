"use client";

import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useAuth } from "../context_api/AuthContext";
import Swal from "sweetalert2";
import { FiUser, FiMail, FiPhone, FiBook, FiMapPin } from "react-icons/fi";

export default function EnquiryPopup() {
  const { submitContactForm } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);

  


  const [captchaInput, setCaptchaInput] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    course: "",
    state: "",
  });

  const generateCaptcha = () => {
  const n1 = Math.floor(Math.random() * 10) + 1; // 1–10
  const n2 = Math.floor(Math.random() * 10) + 1;
  setNum1(n1);
  setNum2(n2);
};

  // Auto Open
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
    }, []);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (parseInt(captchaInput) !== num1 + num2) {
  generateCaptcha();
  setCaptchaInput("");
  Swal.fire("Invalid Captcha", "Please solve captcha correctly", "error");
  return;
}


    if (!agreed) {
      Swal.fire("Agreement Required", "Please accept terms", "warning");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        subject: formData.course,
        message: `State: ${formData.state}`,
      };

      await submitContactForm(payload);

Swal.fire({
  icon: "success",
  title: "Enquiry Submitted!",
  text: "We will contact you soon.",
  confirmButtonColor: "#1e3a8a",
});

generateCaptcha();   


      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        course: "",
        state: "",
      });

      setCaptchaInput("");
      setAgreed(false);

    } catch (error: any) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-xl">

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-2xl font-bold text-[#0B2B6B] mb-4">
          Enquire Now
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">

  {/* Name */}
  <div>
    <label className="flex items-center gap-2 text-sm font-medium text-[#0B2B6B] mb-1">
      <FiUser /> Name <span className="text-red-500">*</span>
    </label>
    <input
      name="fullName"
      required
      placeholder="Enter Your Name"
      value={formData.fullName}
      onChange={handleChange}
      className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Email */}
  <div>
    <label className="flex items-center gap-2 text-sm font-medium text-[#0B2B6B] mb-1">
      <FiMail /> Email <span className="text-red-500">*</span>
    </label>
    <input
      type="email"
      name="email"
      required
      placeholder="Enter Your Mail ID"
      value={formData.email}
      onChange={handleChange}
      className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Phone */}
  <div>
    <label className="flex items-center gap-2 text-sm font-medium text-[#0B2B6B] mb-1">
      <FiPhone /> Phone <span className="text-red-500">*</span>
    </label>
    <input
      type="tel"
      name="phoneNumber"
      required
      pattern="[0-9]{10}"
      placeholder="Enter Your Number"
      value={formData.phoneNumber}
      onChange={handleChange}
      className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Course */}
  <div>
    <label className="flex items-center gap-2 text-sm font-medium text-[#0B2B6B] mb-1">
      <FiBook /> Course <span className="text-red-500">*</span>
    </label>
    <input
      name="course"
      required
      placeholder="Enter Your Course"
      value={formData.course}
      onChange={handleChange}
      className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* State */}
  <div>
    <label className="flex items-center gap-2 text-sm font-medium text-[#0B2B6B] mb-1">
      <FiMapPin /> State <span className="text-red-500">*</span>
    </label>
    <input
      name="state"
      required
      placeholder="Enter Your State"
      value={formData.state}
      onChange={handleChange}
      className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Captcha */}
  <div>
    <label className="text-sm font-medium text-[#0B2B6B] mb-1 block">
      Custom Captcha <span className="text-red-500">*</span>
    </label>
    <div className="flex items-center gap-3 text-sm">
      <span className="font-medium">{num1} + {num2} =</span>
      <input
        type="number"
        required
        value={captchaInput}
        onChange={(e) => setCaptchaInput(e.target.value)}
        className="border rounded-md px-3 py-1 w-24 focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>

  {/* Agreement */}
  <div className="flex items-center gap-2 text-xs">
    <input
      type="checkbox"
      checked={agreed}
      onChange={(e) => setAgreed(e.target.checked)}
      required
    />
    <span>
      I agree to receive university updates via email
    </span>
  </div>

  {/* Submit */}
  <button
    type="submit"
    disabled={loading}
    className="w-full bg-[#0B2B6B] text-white py-2 rounded-md hover:bg-blue-800 transition disabled:opacity-60"
  >
    {loading ? "Submitting..." : "Submit"}
  </button>

</form>



      </div>
    </div>
  );
}
