"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { API }from "../lib/axios";

type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNumber?: string;
  role: "student" | "employer" | "admin";

  profileImage?: string;
  gender?: string;

  profile?: {
    skills?: string[];
  };
};


const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true); // 🔥 start true
  

  useEffect(() => {
  if (typeof window === "undefined") return;

  try {
    const storedUser = localStorage.getItem("collexa_user");

    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
      localStorage.removeItem("collexa_user");
    }
  } catch (err) {
    console.error("Invalid user in localStorage", err);
    localStorage.removeItem("collexa_user");
    setUser(null);
  } finally {
    setLoading(false);
  }
}, []);


  // 🔐 LOGIN
  const login = async (data: { emailId: string; password: string }) => {
  const res = await API.post("/api/auth/login", data);

  setUser(res.data.user);
  localStorage.setItem(
    "collexa_user",
    JSON.stringify(res.data.user)
  );

  // 🔐 JWT SAVE
  localStorage.setItem(
    "collexa_token",
    res.data.token
  );

  return res.data;
};

 const Admin_login = async (data: { emailId: string; password: string }) => {
  const res = await API.post("/api/auth/admin/login", data);

  setUser(res.data.user);
  localStorage.setItem(
    "collexa_user",
    JSON.stringify(res.data.user)
  );

  // 🔐 JWT SAVE
  localStorage.setItem(
    "collexa_token",
    res.data.token
  );

  return res.data;
};

 const addJob = async (data: any) => {
  const token = localStorage.getItem("collexa_token");

  const res = await API.post(
    "/api/jobs/addjob",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

const addCompany = async (data: any) => {
  const token = localStorage.getItem("collexa_token");

  const res = await API.post(
    "/api/companies",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};


const updateCompany = async (id: string, data: any) => {
  const token = localStorage.getItem("collexa_token");

  const res = await API.patch(
    `/api/companies/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

const updateJob = async (jobId: string, payload: any) => {
  const token = localStorage.getItem("collexa_token");

  const res = await API.patch(
    `/api/jobs/updatejob/${jobId}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

const deleteJob = async (jobId: string) => {
  const token = localStorage.getItem("collexa_token");

  const res = await API.delete(
    `/api/jobs/deletejob/${jobId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
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
  localStorage.removeItem("collexa_token");

  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
};

  // GET PROFILE
const getProfile = async () => {
  try {
    const token = localStorage.getItem("collexa_token");
    if (!token) throw new Error("Missing token");

    const res = await API.get("/api/userprofile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // ✅ Handle possible backend formats
    const userData =
      res.data?.data?.user || // if backend sends { data: { user: {...} } }
      res.data?.user ||       // if backend sends { user: {...} }
      res.data?.data ||       // if backend sends { data: {...} }
      null;

    if (!userData) {
      console.error("Unexpected response format:", res.data);
      throw new Error("Invalid response");
    }

    setUser(userData);
    localStorage.setItem("collexa_user", JSON.stringify(userData));

    return userData;
  } catch (err) {
    console.error("getProfile error:", err);
    throw err;
  }
};


 const updateProfile = async (data: any) => {
  const res = await API.patch("/api/userprofile", data);

  // 🔥 SAFETY CHECK
  if (res.data?.data) {
    setUser(res.data.data);
    localStorage.setItem(
      "collexa_user",
      JSON.stringify(res.data.data)
    );
    return res.data.data;
  }

  // ❌ agar backend data nahi bhej raha
  console.error("Profile update response invalid", res.data);
  throw new Error("Profile update failed");
};

const forgotPassword = async (emailId: string) => {
  try {
    const res = await API.post("/api/auth/forgetPassword", { emailId });
    return res.data; // { message: "Reset link sent" }
  } catch (err: any) {
    throw err;
  }
};

const resetPassword = async (
  token: string,
  newPassword: string
) => {
  try {
    const res = await API.post("/api/auth/resetPassword", {
      token,
      password: newPassword,
    });

    return res.data; // { message: "Password reset successful" }
  } catch (err: any) {
    throw err;
  }
};

// 🌍 PUBLIC JOB LIST (no auth required)
const getPublicJobs = async (params?: {
  page?: number;
  limit?: number;
  type?: "job" | "internship";
  keyword?: string;
  location?: string;
}) => {
  try {
    const res = await API.get("/api/jobs/listingjob", {
      params: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        type: params?.type,
        keyword: params?.keyword,
        location: params?.location,
      },
    });

    /*
      Expected backend response examples:
      {
        jobs: [],
        total: 100,
        page: 1
      }
      OR
      {
        data: { jobs: [], total: 100 }
      }
    */

    return (
      res.data?.data || // if wrapped in data
      res.data          // direct response
    );
  } catch (err: any) {
    console.error("getPublicJobs error:", err);
    throw err;
  }
};

const getPublicInternships = async (params?: {
  page?: number;
  limit?: number;
  keyword?: string;
  location?: string;
}) => {
  try {
    const res = await API.get("/api/internship/listinginternship", {
      params: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        keyword: params?.keyword,
        location: params?.location,
      },
    });
 
    return (
      res.data?.internships ||
      res.data?.data?.internships ||
      res.data?.data ||
      []
    );
  } catch (err: any) {
    console.error("getPublicInternships error:", err);
    throw err;
  }
};




  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        getProfile,     
        forgotPassword,   
        resetPassword, 
        Admin_login,
        addJob,
        addCompany,
        updateCompany,
        updateJob,
        deleteJob,
        getPublicJobs,
        getPublicInternships,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
