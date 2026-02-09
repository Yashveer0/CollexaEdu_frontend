"use client";

import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useAuth } from "../context_api/AuthContext";
import Swal from "sweetalert2";

export default function EnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { submitContactForm } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: "General Enquiry",
    message: "",
  });

  // ✅ Auto Open When Page Loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
      };

      await submitContactForm(payload);

      Swal.fire({
        icon: "success",
        title: "Enquiry Sent!",
        text: "We will contact you shortly.",
        confirmButtonColor: "#1e3a8a",
      });

      setIsOpen(false);

      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        subject: "General Enquiry",
        message: "",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response?.data?.message ||
          "Failed to send enquiry. Try again.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative shadow-xl">

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-xl font-semibold text-[#0B2B6B] mb-4">
          Quick Enquiry
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">

          {/* Full Name */}
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email Address"
            className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />

          {/* Phone Number (Required + 10 digit validation) */}
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit phone number"
            placeholder="Phone Number"
            className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />

          {/* Message */}
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Your Message"
            className="w-full border rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Submit Enquiry"}
          </button>

        </form>
      </div>
    </div>
  );
}
