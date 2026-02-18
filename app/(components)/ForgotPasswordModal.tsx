"use client";

import { useState } from "react";
import { useAuth } from "../context_api/AuthContext";
import Swal from "sweetalert2";
import { Mail, X } from "lucide-react";

export default function ForgotPasswordModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      Swal.fire("Error", "Please enter your email address.", "error");
      return;
    }

    console.log("🔵 [ForgotPassword] Submitting with email:", email);
    setLoading(true);

    try {
      console.log("🟡 [ForgotPassword] Calling forgotPassword API...");
      const response = await forgotPassword(email);

      console.log("✅ [ForgotPassword] Full API Response:", response);
      console.log("✅ [ForgotPassword] Response Status:", response?.status);
      console.log("✅ [ForgotPassword] Response Data:", response?.data);
      console.log("✅ [ForgotPassword] Response Message:", response?.message);

      // Handle different response structures
      const successMessage =
        response?.data ||
        "OTP sent successfully";

      console.log("✅ [ForgotPassword] Success Message:", successMessage);

      Swal.fire({
        icon: "success",
        title: "OTP Sent!",
        text: successMessage,
      });

      setOpen(false);
      setEmail("");
    } catch (err: any) {
      console.error("❌ [ForgotPassword] Error caught:", err);
      console.error("❌ [ForgotPassword] Error message:", err?.message);
      console.error("❌ [ForgotPassword] Error response:", err?.response);
      console.error(
        "❌ [ForgotPassword] Error response data:",
        err?.response?.data
      );
      console.error(
        "❌ [ForgotPassword] Error response status:",
        err?.response?.status
      );

      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Something went wrong. Please try again.";

      console.error("❌ [ForgotPassword] Showing error:", errorMessage);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: errorMessage,
      });
    } finally {
      setLoading(false);
      console.log("🔵 [ForgotPassword] Request completed.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-blue-900">Forgot Password</h2>

        <p className="text-gray-500 mt-2">
          Enter your email to receive an OTP.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label className="block mt-6 text-sm font-semibold text-gray-700">
            Email Address
          </label>

          <div className="flex items-center border rounded-lg px-3 mt-1 focus-within:border-blue-500">
            <Mail size={18} className="text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              className="w-full px-3 py-2 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-blue-900 to-emerald-400 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 disabled:opacity-70 hover:opacity-90 transition"
          >
            {loading ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Sending OTP...
              </>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}