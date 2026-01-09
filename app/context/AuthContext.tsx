"use client";

import { createContext, useContext, useState } from "react";
import axios from "axios";

// 1️⃣ Context create
const AuthContext = createContext<any>(null);

// 2️⃣ Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 3️⃣ Example API function (login / contact / auth)
  const login = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post("http://localhost:5000/api/login", data);
      setUser(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 4️⃣ Value jo sab components use kar sakte hain
  const value = {
    user,
    loading,
    error,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 5️⃣ Custom hook (easy usage)
export const useAuth = () => useContext(AuthContext);
