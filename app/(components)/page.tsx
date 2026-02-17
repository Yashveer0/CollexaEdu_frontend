"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "../context_api/AuthContext";
import Swal from "sweetalert2";
import { Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

function ResetPasswordComponent() {
  const { resetPassword } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Invalid Link",
        text: "The password reset link is missing or invalid.",
      }).then(() => {
        router.push("/student-login");
      });
    }
  }, [token, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwords.newPassword || !passwords.confirmPassword) {
      Swal.fire("Warning", "Please fill both password fields.", "warning");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      Swal.fire("Error", "Passwords do not match.", "error");
      return;
    }

    if (!token) {
      Swal.fire("Error", "Invalid or missing reset token.", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword(token, passwords.newPassword);
      Swal.fire({
        icon: "success",
        title: "Password Reset Successful!",
        text: res.message || "You can now login with your new password.",
      }).then(() => {
        router.push("/student-login");
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Reset Failed",
        text:
          err?.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center py-10">
        <p>Invalid reset link. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 border w-full max-w-md">
      <h2 className="text-center text-3xl font-bold text-blue-900">
        Reset Your Password
      </h2>
      <p className="text-center text-gray-500 mt-2">
        Enter your new password below.
      </p>

      <form onSubmit={handleSubmit}>
        <label className="block mt-6 text-sm font-semibold text-gray-700">New Password</label>
        <div className="flex items-center border rounded-lg px-3 mt-1">
          <Lock size={18} />
          <input type={showPass ? "text" : "password"} name="newPassword" value={passwords.newPassword} onChange={handleChange} placeholder="Enter new password" className="w-full px-3 py-2 outline-none" required />
          <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-500">
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <label className="block mt-4 text-sm font-semibold text-gray-700">Confirm New Password</label>
        <div className="flex items-center border rounded-lg px-3 mt-1">
          <Lock size={18} />
          <input type={showConfirmPass ? "text" : "password"} name="confirmPassword" value={passwords.confirmPassword} onChange={handleChange} placeholder="Confirm new password" className="w-full px-3 py-2 outline-none" required />
          <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="text-gray-500">
            {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button type="submit" disabled={loading} className="w-full mt-6 bg-gradient-to-r from-blue-900 to-emerald-400 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 disabled:opacity-70">
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      <div className="text-center mt-4">
        <Link href="/student-login" className="text-sm text-blue-700 hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7faff] to-[#eef5ff] flex items-center justify-center px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordComponent />
      </Suspense>
    </div>
  );
}