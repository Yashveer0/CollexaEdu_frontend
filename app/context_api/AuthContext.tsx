"use client";

import { createContext, useContext, useState } from "react";
import API from "../lib/axios";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // LOGIN
  const login = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);

      const res = await API.post("/api/auth/login", data);
      setUser(res.data.user); // backend ke hisaab se adjust karo
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // REGISTER ✅
  const register = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const res = await API.post("/api/auth/register" , data);

      // Agar register ke baad login bhi hota hai
      setUser(res.data.user);

      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register, // 👈 expose kiya
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
