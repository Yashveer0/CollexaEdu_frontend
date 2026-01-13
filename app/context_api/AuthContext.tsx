"use client";

import { createContext, useContext, useEffect, useState } from "react";
import API from "../lib/axios";

type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNumber?: string;
  role: "student" | "employer" | "admin";

  // future
  profileImage?: string;
  gender?: string;
  skills?: string[];
};

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true); // 🔥 start true

  // 🔁 Load user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("collexa_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 🔐 LOGIN
  const login = async (data: { emailId: string; password: string }) => {
    const res = await API.post("/api/auth/login", data);

    setUser(res.data.user);
    localStorage.setItem(
      "collexa_user",
      JSON.stringify(res.data.user)
    );

    return res.data;
  };

  // 📝 REGISTER
  const register = async (data: any) => {
    const res = await API.post("/api/auth/register", data);

    // agar auto-login ho
    if (res.data.user) {
      setUser(res.data.user);
      localStorage.setItem(
        "collexa_user",
        JSON.stringify(res.data.user)
      );
    }

    return res.data;
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("collexa_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
