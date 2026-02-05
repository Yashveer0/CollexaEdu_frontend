"use client";

import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { useAuth } from "../context_api/AuthContext";
import Swal from "sweetalert2";


export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const { submitContactForm } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });

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
      phoneNumber:
        formData.phoneNumber.trim() === ""
          ? undefined
          : formData.phoneNumber,
    };

    await submitContactForm(payload);

    // ✅ Success SweetAlert
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Your message has been sent successfully.",
      confirmButtonColor: "#1e3a8a",
    });

    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
    });
  } catch (error: any) {
    console.error("Failed to send message:", error);

    // ❌ Error SweetAlert
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text:
        error.response?.data?.message ||
        "Failed to send message. Please try again.",
      confirmButtonColor: "#dc2626",
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="w-full bg-[#F7F9FC]">

      {/* HERO */}
      <section className="w-full py-20  px-4 bg-gradient-to-b from-white to-[#F7F9FC] text-center">
        <h1 className="text-3xl mt-20 sm:text-4xl font-bold text-[#0B2B6B]">
          Get in Touch
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-4 max-w-xl mx-auto">
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>
      </section>

      {/* CONTENT */}
      <section className="w-full pb-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT – CONTACT INFO */}
          <div>
            <h2 className="text-xl font-semibold text-[#0B2B6B]">
              Contact Information
            </h2>
            <p className="text-sm text-gray-600 mt-2 mb-6">
              Feel free to reach out to us through any of these channels.
              We're here to help!
            </p>

            <div className="space-y-4">

              {/* Email */}
              <div className="group bg-white  border rounded-xl p-5 flex gap-4 items-start transition hover:scale-[1.03] hover:shadow-md">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                  <FiMail />
                </div>
                <div>
                  <h4 className="font-medium text-[#0B2B6B]">Email Us</h4>
                  <p className="text-sm text-gray-600">
                    info@collexaedu.com
                  </p>
                </div>
              </div>

              {/* Call */}
              <div className="group bg-white border rounded-xl p-5 flex gap-4 items-start transition hover:scale-[1.03] hover:shadow-md">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                  <FiPhone />
                </div>
                <div>
                  <h4 className="font-medium text-[#0B2B6B]">Call Us</h4>
                  <p className="text-sm text-gray-600">
                    +91 9217070575
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="group bg-white border rounded-xl p-5 flex gap-4 items-start transition hover:scale-[1.03] hover:shadow-md">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                  <FiMapPin />
                </div>
                <div>
                  <h4 className="font-medium text-[#0B2B6B]">Visit Us</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    E-23 sec-3 Noida 201301, Uttar Pradesh, India
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT – FORM */}
          <div className="bg-white border rounded-2xl p-8 hover:shadow-lg transition hover:scale-[1.01]">
            <h2 className="text-xl font-semibold text-[#0B2B6B]">
              Send us a Message
            </h2>
            <p className="text-sm text-gray-600 mt-2 mb-6">
              Fill out the form below and we'll get back to you soon.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-gray-200">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="border text-gray-900 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="border text-gray-900 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="border text-gray-900 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this regarding?"
                  className="border text-gray-900 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Tell us how we can help you..."
                className="border text-gray-900 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-blue-900 text-white px-6 py-2 rounded-md text-sm hover:bg-blue-800 transition disabled:opacity-60"
              >
                <FiSend />
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>
          </div>

        </div>
      </section>
    </div>
  );
}
