"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../lib/axios";

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

export type JobType = {
  _id: string;
  title: string;
  description: string;
  location: string;
  type: string;
  salaryMin: number;
  salaryMax: number;
  skillsRequired: string[];
  openings: number;
  experienceLevel: string;
  company: {
    _id: string;
    name: string;
    description: string;
    location: string;
    logoUrl: string;
  };
  isActive: boolean;
  createdAt: string;
};

export type CampusCourseType = {
  _id: string;
  universityName: string;
  courseName: string;
  degreeType: string;
  description: string;
  rating: number;
  duration: string;
  enrolledCount: number;
  level: string;
  isTop: boolean;
  location: string;
  isActive: boolean;
  createdAt: string;
};

export type CertificationCourseType = {
  _id: string;
  title: string;
  instructor: string;
  description?: string;
  badge: string;
  category: string;
  currency: string;
  currentPrice: number;
  duration: string;
  enrollLink: string;
  image: string;
  level: string;
  originalPrice: number;
  rating: number;
  studentsEnrolled: number;
  createdAt: string;
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
  const token = localStorage.getItem("collexa_token");
  if (!token) throw new Error("Not authenticated");

  const res = await API.patch("/api/userprofile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // 🔥 SAFETY CHECK
  const updatedUser = res.data?.data || res.data?.user;

  if (updatedUser) {
    setUser(updatedUser);
    localStorage.setItem(
      "collexa_user",
      JSON.stringify(updatedUser)
    );
    return updatedUser;
  }

  // If success but no user object (e.g. just message), re-fetch profile
  if (res.status === 200 || res.status === 201) {
    return await getProfile();
  }

  // ❌ agar backend data nahi bhej raha
  console.error("Profile update response invalid", res.data);
  throw new Error("Profile update failed");
};

const forgotPassword = async (emailId: string) => {
  const res = await API.post("/api/auth/forgetPassword", {
    emailId,
  });

  return res.data; // { message: "OTP sent" }
};


const resetPassword = async (
  emailId: string,
  otp: string,
  newPassword: string
) => {
  const res = await API.post("/api/auth/resetPassword", {
    emailId,
    otp,
    newPassword,
  });

  return res.data;
};


// 🌍 PUBLIC JOB LIST (no auth required)
const getPublicJobs = async (params?: {
  page?: number;
  limit?: number;
  type?: "job" | "internship";
  keyword?: string;
  location?: string;
  category?: string;
}) => {
  try {
    const res = await API.get("/api/jobs/listingjob", {
      params: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        type: params?.type,
        keyword: params?.keyword,
        location: params?.location,
        category: params?.category,
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
  category?: string;
}) => {
  try {
    const res = await API.get("/api/internship/listinginternship", {
      params: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        keyword: params?.keyword,
        location: params?.location,
        category: params?.category,
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


const getPublicCampusCourses = async (params?: {
  page?: number;
  limit?: number;
  category?: string;
  keyword?: string;
}) => {
  try {
    const res = await API.get("/api/campuscourses", {
      params: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        category: params?.category,
        keyword: params?.keyword,
      },
    });

    

    return (
      res.data?.campusCourses ||
      res.data?.courses ||
      res.data?.data?.campusCourses ||
      res.data?.data ||
      res.data ||
      []
    );
  } catch (err: any) {
    console.error("getPublicCampusCourses error:", err);
    throw err;
  }
};

const getCertificationCourses = async (params?: {
  page?: number;
  limit?: number;
  category?: string;
  keyword?: string;
}) => {
  try {
    const res = await API.get("/api/certificatecourses/listAll", {
      params: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        category: params?.category,
        keyword: params?.keyword,
      },
    });

    

    return (
      res.data?.courses ||
      res.data?.data?.courses ||
      res.data?.data ||
      res.data ||
      []
    );
  } catch (err: any) {
    console.error("getCertificationCourses error:", err);
    throw err;
  }
};


const applyForCampusCourse = async (data: any) => {
  const res = await API.post("/api/campuscourses/lead", data);
  return res.data;
};

const applyForCertificationCourse = async (data: any) => {
  const res = await API.post("/api/certificatecourses/createCertificateLead", data);
  return res.data;
};

const applyForJob = async (id: string, formData: any) => {
  const token = localStorage.getItem("collexa_token");

  const res = await API.post(`/api/applications/apply/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const getJobApplications = async (jobId: string) => {
  const token = localStorage.getItem("collexa_token");
  const res = await API.get(`/api/applications/job-applications/${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


const submitContactForm = async (data: {
  fullName: string;
  email: string;
  phoneNumber?: string;
  subject: string;
  message: string;
}) => {
  const res = await API.post("/api/contactus", data);
  return res.data;
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
        getPublicCampusCourses,
        getCertificationCourses,
        applyForJob,
        applyForCampusCourse,
        applyForCertificationCourse,
        getJobApplications,
        submitContactForm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
