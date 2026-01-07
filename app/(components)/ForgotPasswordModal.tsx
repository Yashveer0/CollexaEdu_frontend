"use client";
import { useState } from "react";
import { FiMail } from "react-icons/fi";

export default function ForgotPasswordModal({ open, setOpen }: any) {

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!email.trim()) return alert("Please enter email 🙂");

    // 👇 API baad me laga lena
    // await fetch("/api/forgot-password", { method:"POST", body: JSON.stringify({email}) })

    setSent(true);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-3 top-3 text-gray-600 hover:text-black"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-[#0B2B6B] text-center mb-2">
          Forgot Password?
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Enter your registered email to reset your password
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="flex items-center text-gray-800 gap-2 border rounded-lg px-3 py-2">
              <FiMail className="text-gray-500" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full text-gray-800 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#163683] text-white py-2 rounded-lg hover:bg-blue-900 transition"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-center space-y-3">

            <p className="text-green-600 font-semibold">
              Reset link sent successfully 🎉
            </p>

            <p className="text-gray-600 text-sm">
              Please check your email inbox.  
              You will receive a password reset link shortly.
            </p>

            <button
              onClick={() => setOpen(false)}
              className="w-full bg-[#163683] text-white py-2 rounded-lg hover:bg-blue-900 transition"
            >
              Close
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
