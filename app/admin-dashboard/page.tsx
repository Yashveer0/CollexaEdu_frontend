"use client";
import JoditEditor from "jodit-react";
import { useRef } from "react";

import { useState } from "react";



import Swal from "sweetalert2";

import { useRouter } from "next/navigation";
import { Bell,  UserCircle } from "lucide-react";
import { useAuth } from "../context_api/AuthContext";
import { API } from "../lib/axios"
import { useEffect } from "react"
import "../globals.css";


import {
  LayoutDashboard,
  Users,
  PhoneCall,
  Package,
  GraduationCap,
  BookOpen,
  FolderOpen,
  Star,
  Briefcase,
  FileText,
  Settings,
  LogOut,
  Building,
  Factory,
  FileBarChart
} from "lucide-react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



type Screen =
  | "dashboard"
  | "users"
  | "user-detail"
  | "leads"
  | "lead-detail"
  | "packages"
  | "create-package"
  | "admissions"
  | "admission-detail"
  | "courses"
  | "add-course"
  | "create-blog"
  | "blog-categories"
  | "companies"
  | "create-company" 
  | "testimonials"
  | "Jobs"
  | "Internships"
  | "applications"
  | "reports"
  | "settings";

export default function AdminPage() {

   const router = useRouter();
  
 useEffect(() => {
  const token = localStorage.getItem("collexa_token");

  if (!token) {
    Swal.fire({
      icon: "warning",
      title: "Login Required",
      text: "Please login first to access admin panel",
      confirmButtonText: "Go to Login",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then(() => {
      router.replace("/admin"); // ya /admin/login
    });
  }
}, []);


  const [screen, setScreen] = useState<Screen>("dashboard");
  const [loading, setLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
 
  
 
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [status, setStatus] = useState<"Pending" | "Approved" | "Rejected">("Pending");
  const [showRequestInfo, setShowRequestInfo] = useState(false);

  const { addJob, addCompany, updateCompany , updateJob , deleteJob } = useAuth();


  const [jobs, setJobs] = useState<any[]>([]);
  const [jobsLoading, setJobsLoading] = useState(false);

// intership 
const [internships, setInternships] = useState<any[]>([]);
const [internshipsLoading, setInternshipsLoading] = useState(false);

const [internshipPage, setInternshipPage] = useState(1);
const [internshipSearch, setInternshipSearch] = useState("");
const [internshipTotalPages, setInternshipTotalPages] = useState(1);

const [showAddInternshipModal, setShowAddInternshipModal] = useState(false);
const [editingInternship, setEditingInternship] = useState<any>(null);
const [internshipLoading, setInternshipLoading] = useState(false);

// users
const [users, setUsers] = useState<any[]>([]);
const [usersLoading, setUsersLoading] = useState(false);

const [userPage, setUserPage] = useState(1);
const [userLimit] = useState(10);
const [userTotalPages, setUserTotalPages] = useState(1);

const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

const [userSearch, setUserSearch] = useState("");
const [userRole, setUserRole] = useState("all"); // student | employer | company | all


const [selectedUser, setSelectedUser] = useState<any>(null);
const [userDetailLoading, setUserDetailLoading] = useState(false);

// blog
// BLOG LIST
const [blogs, setBlogs] = useState<any[]>([]);
const [blogsLoading, setBlogsLoading] = useState(false);
const [editingBlog, setEditingBlog] = useState<any>(null);

// campus courses
const [campusCourses, setCampusCourses] = useState<any[]>([]);
const [campusCoursesLoading, setCampusCoursesLoading] = useState(false);
const [editingCampusCourse, setEditingCampusCourse] = useState<any>(null);
const [viewCampusCourse, setViewCampusCourse] = useState<any>(null);
const [showViewCampusCourseModal, setShowViewCampusCourseModal] = useState(false);
const [campusCourseForm, setCampusCourseForm] = useState({
  university: "",
  type: "",
  title: "",
  desc: "",
  rating: "",
  duration: "",
  enrolled: "",
  level: "",
  category: "Engineering",
});

const [dashboardStats, setDashboardStats] = useState({
  totalUsers: 0,
  totalLeads: 0,
  totalPackages: 0,
  activeSubscriptions: 0,
  monthlyRevenue: 0,
});



// dashboard 
const [userGrowthData, setUserGrowthData] = useState([
  { name: "Jan", users: 10 },
  { name: "Feb", users: 25 },
  { name: "Mar", users: 40 },
  { name: "Apr", users: 65 },
  { name: "May", users: 90 },
  { name: "Jun", users: 120 },
]);

const [leadsData, setLeadsData] = useState([
  { name: "Jan", leads: 80, conversions: 30 },
  { name: "Feb", leads: 120, conversions: 55 },
  { name: "Mar", leads: 160, conversions: 70 },
  { name: "Apr", leads: 200, conversions: 95 },
  { name: "May", leads: 260, conversions: 120 },
]);


// pagination + search
const [page, setPage] = useState(1);
const [limit] = useState(10);
const [search, setSearch] = useState("");
const [totalPages, setTotalPages] = useState(1);

// edit mode
const [editingJob, setEditingJob] = useState<any>(null);

// reports
const [reportType, setReportType] = useState("users");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [reportData, setReportData] = useState<any[]>([]);
const [reportLoading, setReportLoading] = useState(false);


  const [activeSettingTab, setActiveSettingTab] = useState<
  "General" |
  "Admin Profile" |
  "Password & Security" |
  "Payment" |
  "Notifications" |
  "Roles & Permissions"
>("General");

 const [showAddJobModal, setShowAddJobModal] = useState(false);
 
 

const [jobForm, setJobForm] = useState({
  title: "",
  description: "",
  companyId: "",
  companyName: "",   
  location: "",
  type: "remote",
  salaryMin: "",
  salaryMax: "",
  skillsRequired: "",
  openings: "",
  experienceLevel: "Fresher",
});

const [internshipForm, setInternshipForm] = useState({
  title: "",
  description: "",
  companyId: "",
  companyName: "",
  location: "",
  stipendMin: "",
  stipendMax: "",
  duration: "",
  startDate: "",
  openings: "",
  mode: "remote",
  skillsRequired: "",
});

const resetInternshipForm = () => {
  setInternshipForm({
    title: "",
    description: "",
    companyId: "",
    companyName: "",
    location: "",
    stipendMin: "",
    stipendMax: "",
    duration: "",
    startDate: "",
    openings: "",
    mode: "remote",
    skillsRequired: "",
  });
};




const [companyForm, setCompanyForm] = useState({
  name: "",
  description: "",
  website: "",
  location: "",
  logoUrl: "",
});

const fetchJobs = async () => {
  try {
    setJobsLoading(true);
    const token = localStorage.getItem("collexa_token");

    const res = await API.get("/api/jobs/listingjob", {
      params: { page, limit, search },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("JOBS API RESPONSE 👉", res.data);

    const jobsArray =
      res.data?.jobs ||
      res.data?.data?.jobs ||
      res.data?.data ||
      [];

    setJobs(Array.isArray(jobsArray) ? jobsArray : []);
    setTotalPages(res.data?.totalPages || 1);
  } catch (err) {
    console.error("Fetch jobs failed", err);
    setJobs([]);
  } finally {
    setJobsLoading(false);
  }
};

const fetchInternships = async () => {
  try {
    setInternshipsLoading(true);
    const token = localStorage.getItem("collexa_token");

    const res = await API.get("/api/internship/listinginternship", {
      params: {
        page: internshipPage,
        limit: 10,
        search: internshipSearch,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data =
      res.data?.internships ||
      res.data?.data?.internships ||
      res.data?.data ||
      [];

    setInternships(Array.isArray(data) ? data : []);
    setInternshipTotalPages(res.data?.totalPages || 1);
  } catch (err) {
    console.error("Fetch internships failed", err);
    setInternships([]);
  } finally {
    setInternshipsLoading(false);
  }
};


const fetchUsers = async () => {
  try {
    setUsersLoading(true);

    const token = localStorage.getItem("collexa_token");

    const res = await API.get("/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("USERS API RAW RESPONSE 👉", res.data);

    const data =
      res.data?.users ||
      res.data?.data?.users ||
      res.data?.data ||
      [];

    console.log("FINAL USERS ARRAY 👉", data);

    setUsers(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Fetch users failed", err);
    setUsers([]);
  } finally {
    setUsersLoading(false);
  }
};


const fetchSingleUser = async (id: string) => {
  console.log("FETCH USER ID 👉", id);

  const token = localStorage.getItem("collexa_token");

  const res = await API.get(`/api/admin/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data?.user || res.data;
};

// blog
const fetchBlogs = async () => {
  try {
    setBlogsLoading(true);
    const res = await API.get("/api/blogs");

    const data =
      res.data?.blogs ||
      res.data?.data ||
      res.data ||
      [];

    setBlogs(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Fetch blogs failed", err);
    setBlogs([]);
  } finally {
    setBlogsLoading(false);
  }
};

const fetchCampusCourses = async () => {
  try {
    setCampusCoursesLoading(true);
    const token = localStorage.getItem("collexa_token");
    const res = await API.get("/api/campuscourses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCampusCourses(res.data.courses || []);
  } catch (err) {
    console.error("Fetch courses failed", err);
    setCampusCourses([]);
  } finally {
    setCampusCoursesLoading(false);
  }
};

const handleDeleteCampusCourse = async (id: string) => {
  const result = await Swal.fire({
    title: "Delete Course?",
    text: "This course will be permanently removed.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it",
  });

  if (!result.isConfirmed) return;

  try {
    const token = localStorage.getItem("collexa_token");
    await API.delete(`/api/campuscourses/deleteCampus/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    Swal.fire("Deleted!", "Course has been deleted.", "success");
    fetchCampusCourses();
  } catch (err: any) {
    Swal.fire("Error", err.response?.data?.message || "Delete failed", "error");
  }
};

const handleSaveCampusCourse = async () => {
  if (!campusCourseForm.title || !campusCourseForm.university) {
    Swal.fire("Error", "Title and University are required", "warning");
    return;
  }

  try {
    const token = localStorage.getItem("collexa_token");
    const payload = { ...campusCourseForm };

    if (editingCampusCourse) {
      await API.patch(`/api/campuscourses/updateCampus/${editingCampusCourse._id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Success", "Course updated successfully", "success");
    } else {
      await API.post(`/api/campuscourses/createCampus`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Success", "Course created successfully", "success");
    }
    setScreen("courses");
    fetchCampusCourses();
  } catch (err: any) {
    Swal.fire("Error", err.response?.data?.message || "Save failed", "error");
  }
};


const fetchUsersCount = async () => {
  try {
    const token = localStorage.getItem("collexa_token");
    const res = await API.get("/api/admin/users", { headers: { Authorization: `Bearer ${token}` } });
    const count = res.data?.users?.length || res.data?.data?.users?.length || 0;
    setDashboardStats(prev => ({ ...prev, totalUsers: count }));
  } catch (e) { console.error(e); }
};

const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem("collexa_token");
    const res = await API.get("/api/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data) {
      setDashboardStats({
        totalUsers: res.data.totalUsers || res.data.stats?.totalUsers || 0,
        totalLeads: res.data.totalLeads || res.data.stats?.totalLeads || 0,
        totalPackages: res.data.totalPackages || res.data.stats?.totalPackages || 0,
        activeSubscriptions: res.data.activeSubscriptions || res.data.stats?.activeSubscriptions || 0,
        monthlyRevenue: res.data.monthlyRevenue || res.data.stats?.monthlyRevenue || 0,
      });

      if (res.data.userGrowth) setUserGrowthData(res.data.userGrowth);
      if (res.data.leadsData) setLeadsData(res.data.leadsData);
    }
  } catch (err) {
    console.warn("Dashboard API not available, using fallback data.");
    fetchUsersCount();
  }
};


useEffect(() => {
  if (screen === "create-blog" && editingBlog) {
    setBlogForm({
      title: editingBlog.title || "",
      content: editingBlog.content || "",
      excerpt: editingBlog.excerpt || "",
      category: editingBlog.category || "",
      tags: editingBlog.tags?.join(", ") || "",
      imageUrl: editingBlog.imageUrl || "",
    });
  }
}, [screen, editingBlog]);


useEffect(() => {
  if (screen === "dashboard") {
    fetchDashboardData();
  }
}, [screen]);


useEffect(() => {
  if (screen === "Jobs") {
    fetchJobs();
  }
}, [screen, page, search]);

useEffect(() => {
  if (screen === "courses") {
    fetchCampusCourses();
  }
}, [screen]);

useEffect(() => {
  if (screen === "Internships") {
    fetchInternships();
    fetchCompanies();
  }
}, [screen, internshipPage, internshipSearch]);

useEffect(() => {
  if (screen === "users") {
    fetchUsers();
  }
}, [screen, userPage, userSearch, userRole]);

useEffect(() => {
  if (screen === "user-detail" && selectedUserId) {
    const loadUser = async () => {
      try {
        setUserDetailLoading(true);

        const data = await fetchSingleUser(selectedUserId);

        console.log("SINGLE USER DATA 👉", data);

        setSelectedUser(data);
      } catch (err) {
        console.error("Fetch single user failed", err);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Unable to load user details",
        });
      } finally {
        setUserDetailLoading(false);
      }
    };

    loadUser();
  }
}, [screen, selectedUserId]);

useEffect(() => {
  if (screen === "blog-categories") {
    fetchBlogs();
  }
}, [screen]);


const resetJobForm = () => {
  setJobForm({
    title: "",
    description: "",
    companyId: "",
    companyName: "",
    location: "",
    type: "remote",
    salaryMin: "",
    salaryMax: "",
    skillsRequired: "",
    openings: "",
    experienceLevel: "Fresher",
  });
};

const resetCampusCourseForm = () => {
  setCampusCourseForm({
    university: "",
    type: "",
    title: "",
    desc: "",
    rating: "",
    duration: "",
    enrolled: "",
    level: "",
    category: "Engineering",
  });
  setEditingCampusCourse(null);
};




const [blogForm, setBlogForm] = useState({
  title: "",
  content: "",
  excerpt: "",
  category: "",
  tags: "",       // UI ke liye string
  imageUrl: "",
});

const [blogLoading, setBlogLoading] = useState(false);

const joditConfig = {
  height: 350,
  placeholder: "Write full blog content here...",
};



const handleDeleteJob = async (jobId: string) => {
  const result = await Swal.fire({
    title: "Delete Job?",
    text: "This job will be permanently removed.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it",
  });

  if (!result.isConfirmed) return;

  try {
    setLoading(true);
    await deleteJob(jobId);

    await Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Job has been deleted successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

    fetchJobs();
  } catch (err: any) {
    Swal.fire({
      icon: "error",
      title: "Delete failed",
      text:
        err.response?.data?.message ||
        "Unable to delete job",
    });
  } finally {
    setLoading(false);
  }
};

const handleDeleteInternship = async (internshipId: string) => {
  const result = await Swal.fire({
    title: "Delete Internship?",
    text: "This internship will be permanently removed.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it",
  });

  if (!result.isConfirmed) return;

  try {
    setInternshipLoading(true);

    const token = localStorage.getItem("collexa_token");

    await API.delete(
      `/api/internship/deletejob/${internshipId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    Swal.fire({
      icon: "success",
      title: "Deleted!",
      text: "Internship has been deleted successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

    fetchInternships(); // 🔄 refresh table
  } catch (err: any) {
    console.error("Delete internship failed 👉", err);

    Swal.fire({
      icon: "error",
      title: "Delete failed",
      text:
        err.response?.data?.message ||
        "Unable to delete internship",
    });
  } finally {
    setInternshipLoading(false);
  }
};


const handleDeleteUser = async (userId: string) => {
  const result = await Swal.fire({
    title: "Delete User?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Delete",
  });

  if (!result.isConfirmed) return;

  try {
    const token = localStorage.getItem("collexa_token");

    await API.delete(`/api/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Swal.fire({
      icon: "success",
      title: "User deleted",
      timer: 1200,
      showConfirmButton: false,
    });

    fetchUsers();
  } catch (err: any) {
    Swal.fire({
      icon: "error",
      title: "Delete failed",
      text: err.response?.data?.message || "Unable to delete user",
    });
  }
};

const handleDeleteBlog = async (id: string) => {
  const result = await Swal.fire({
    title: "Delete Blog?",
    text: "This blog will be permanently deleted",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Delete",
  });

  if (!result.isConfirmed) return;

  try {
    await API.delete(`/api/blogs/${id}`);

    Swal.fire({
      icon: "success",
      title: "Blog Deleted",
      timer: 1200,
      showConfirmButton: false,
    });

    setBlogs((prev) => prev.filter((b) => b._id !== id));
  } catch (err: any) {
    Swal.fire(
      "Failed",
      err.response?.data?.message || "Delete failed",
      "error"
    );
  }
};


const handleSaveCompany = async () => {
  try {
    // 🔎 validation
    if (
      !companyForm.name.trim() ||
      !companyForm.description.trim() ||
      !companyForm.location.trim()
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Company name, description and location are required",
      });
      return;
    }

    // website validation
    if (
      companyForm.website &&
      !/^https?:\/\//i.test(companyForm.website)
    ) {
      Swal.fire({
        icon: "error",
        title: "Invalid Website",
        text: "Website must start with http:// or https://",
      });
      return;
    }

    setLoading(true);

    const payload = {
      name: companyForm.name.trim(),
      description: companyForm.description.trim(),
      location: companyForm.location.trim(),

      // ✅ optional fields SAFE
      website: companyForm.website?.trim() || "",
      logoUrl: companyForm.logoUrl?.trim() || "",
    };

    if (selectedCompany) {
      // ✏️ UPDATE
      await updateCompany(selectedCompany._id, payload);

      Swal.fire({
        icon: "success",
        title: "Company Updated",
        text: "Company details updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      // ➕ CREATE
      await addCompany(payload);

      Swal.fire({
        icon: "success",
        title: "Company Added",
        text: "New company added successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    }

    // 🔄 refresh list
    await fetchCompanies();

    // 🔁 reset & go back
    setCompanyForm({
      name: "",
      description: "",
      website: "",
      location: "",
      logoUrl: "",
    });
    setSelectedCompany(null);
    setScreen("companies");

  } catch (err: any) {
    console.error("Save company error:", err);

    Swal.fire({
      icon: "error",
      title: "Failed",
      text:
        err.response?.data?.message ||
        "Something went wrong while saving company",
    });
  } finally {
    setLoading(false);
  }
};

const handleSaveInternship = async () => {
  try {
    // 🔎 Validation
    if (
      !internshipForm.title ||
      !internshipForm.description ||
      !internshipForm.companyId ||
      !internshipForm.location ||
      !internshipForm.stipendMin ||
      !internshipForm.stipendMax ||
      !internshipForm.duration ||
      !internshipForm.openings ||
      !internshipForm.skillsRequired
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill all required internship details",
      });
      return;
    }

    if (
      Number(internshipForm.stipendMin) >
      Number(internshipForm.stipendMax)
    ) {
      Swal.fire({
        icon: "error",
        title: "Invalid Stipend",
        text: "Minimum stipend cannot be greater than maximum stipend",
      });
      return;
    }

    setInternshipLoading(true);

    const payload = {
      title: internshipForm.title.trim(),
      description: internshipForm.description.trim(),
      companyName: internshipForm.companyName,
      company: internshipForm.companyId,
      location: internshipForm.location.trim(),
      stipendMin: Number(internshipForm.stipendMin),
      stipendMax: Number(internshipForm.stipendMax),
      duration: internshipForm.duration,
      startDate: internshipForm.startDate,
      openings: Number(internshipForm.openings),
      mode: internshipForm.mode,
      skillsRequired: internshipForm.skillsRequired
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const token = localStorage.getItem("collexa_token");

    if (editingInternship) {
      await API.patch(
        `/api/internship/updatejob/${editingInternship._id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({
        icon: "success",
        title: "Internship Updated",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      await API.post("/api/internship/addinternship", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        icon: "success",
        title: "Internship Created",
        timer: 1500,
        showConfirmButton: false,
      });
    }

    fetchInternships();
    resetInternshipForm();
    setShowAddInternshipModal(false);
    setEditingInternship(null);

  } catch (err: any) {
    console.error("Internship save failed 👉", err);

    Swal.fire({
      icon: "error",
      title: "Failed",
      text:
        err.response?.data?.message ||
        "Something went wrong while saving internship",
    });
  } finally {
    setInternshipLoading(false);
  }
};





const fetchCompanies = async () => {
  try {
    const token = localStorage.getItem("collexa_token");

    const res = await API.get("/api/companies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("COMPANIES API RAW RESPONSE 👉", res.data);

    // ✅ FORCE ARRAY EXTRACTION
    let companiesArray: any[] = [];

    if (Array.isArray(res.data)) {
      companiesArray = res.data;
    } else if (Array.isArray(res.data?.companies)) {
      companiesArray = res.data.companies;
    } else if (Array.isArray(res.data?.data)) {
      companiesArray = res.data.data;
    } else if (Array.isArray(res.data?.data?.companies)) {
      companiesArray = res.data.data.companies;
    } else {
      console.error("❌ Companies array not found", res.data);
    }

    console.log("FINAL COMPANIES ARRAY 👉", companiesArray);

    setCompanies(companiesArray);
  } catch (err: any) {
    console.error("Fetch companies error 👉", err.response || err);
    setCompanies([]);
  }
};




useEffect(() => {
  if (screen === "companies" || screen === "Jobs") {
    fetchCompanies();
  }
}, [screen]);


useEffect(() => {
  if (screen === "create-company") {
    if (selectedCompany) {
      setCompanyForm({
        name: selectedCompany.name || "",
        description: selectedCompany.description || "",
        website: selectedCompany.website || "",
        location: selectedCompany.location || "",
        logoUrl: selectedCompany.logoUrl || "",
      });
    } else {
      // ✅ RESET when creating
      setCompanyForm({
        name: "",
        description: "",
        website: "",
        location: "",
        logoUrl: "",
      });
    }
  }
}, [screen, selectedCompany]);




const handleDeleteCompany = async (id: string) => {
  const result = await Swal.fire({
    title: "Delete Company?",
    text: "All jobs under this company may be affected.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Delete",
  });

  if (!result.isConfirmed) return;

  try {
    await API.delete(`/api/companies/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("collexa_token")}`,
      },
    });

    setCompanies((prev) =>
      prev.filter((c) => c._id !== id)
    );

    Swal.fire({
      icon: "success",
      title: "Deleted",
      timer: 1200,
      showConfirmButton: false,
    });
  } catch {
    Swal.fire({
      icon: "error",
      title: "Delete failed",
      text: "Unable to delete company",
    });
  }
};

const handleGenerateReport = async () => {
  setReportLoading(true);
  try {
    const token = localStorage.getItem("collexa_token");
    let endpoint = "";
    
    switch (reportType) {
      case "users":
        endpoint = "/api/admin/users";
        break;
      case "jobs":
        endpoint = "/api/jobs/listingjob";
        break;
      case "internships":
        endpoint = "/api/internship/listinginternship";
        break;
      case "companies":
        endpoint = "/api/companies";
        break;
      default:
        endpoint = "/api/admin/users";
    }

    const res = await API.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit: 1000 } // Fetch larger dataset for reports
    });

    let data = [];
    if (reportType === "users") data = res.data?.users || res.data?.data?.users || [];
    else if (reportType === "jobs") data = res.data?.jobs || res.data?.data?.jobs || [];
    else if (reportType === "internships") data = res.data?.internships || res.data?.data?.internships || [];
    else if (reportType === "companies") data = res.data?.companies || res.data?.data?.companies || res.data || [];

    // Client-side Date Filtering
    if (startDate || endDate) {
      const start = startDate ? new Date(startDate) : new Date('1970-01-01');
      const end = endDate ? new Date(endDate) : new Date();
      end.setHours(23, 59, 59, 999);

      data = data.filter((item: any) => {
        const dateField = item.createdAt || item.postedDate || item.date;
        if (!dateField) return true;
        const itemDate = new Date(dateField);
        return itemDate >= start && itemDate <= end;
      });
    }

    setReportData(data);

    if (data.length === 0) {
      Swal.fire("Info", "No data found for the selected criteria", "info");
    }

  } catch (error) {
    console.error("Report generation failed", error);
    Swal.fire("Error", "Failed to generate report", "error");
    setReportData([]);
  } finally {
    setReportLoading(false);
  }
};

const downloadReport = () => {
  if (reportData.length === 0) {
    Swal.fire("No Data", "Please generate a report first", "warning");
    return;
  }

  const processValue = (val: any) => {
    if (val === null || val === undefined) return "";
    if (typeof val === "object") {
      return JSON.stringify(val).replace(/"/g, '""');
    }
    return String(val).replace(/"/g, '""');
  };

  const headers = Object.keys(reportData[0]).join(",");
  const rows = reportData.map(row => Object.values(row).map(val => `"${processValue(val)}"`).join(","));
  const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${reportType}_report_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
 


  /* ================= LAYOUT ================= */
  return (
    <div className="min-h-screen text-gray-800 flex bg-gray-100">
      {/* ========== SIDEBAR ========== */}
      <aside className="w-64 bg-white border-r p-4 hidden md:flex flex-col">
  {/* Logo */}
  <div className="mb-6 flex justify-center">
    <img src="./logo.png" className="h-14 w-auto" alt="Logo" />
  </div>

  {/* Menu */}
  <div className="flex-1 space-y-1">
    {[
      { label: "Dashboard", key: "dashboard", icon: LayoutDashboard },
      { label: "Users", key: "users", icon: Users },
      { label: "Leads", key: "leads", icon: PhoneCall },
      { label: "Companies", key: "companies", icon: Factory },
      { label: "Jobs", key: "Jobs", icon: Briefcase },
      { label: "Internships", key: "Internships", icon: Briefcase },
      { label: "Create Blog", key: "create-blog", icon: FileText },
      { label: "Blog Categories", key: "blog-categories", icon: FolderOpen },
      { label: "Packages", key: "packages", icon: Package },
      { label: "Admission Request", key: "admissions", icon: GraduationCap },
      { label: "Campus Courses", key: "courses", icon: BookOpen },     
      
      { label: "Testimonials", key: "testimonials", icon: Star },
      
      { label: "Applications", key: "applications", icon: FileText },
      { label: "Reports", key: "reports", icon: FileBarChart },
      { label: "Settings", key: "settings", icon: Settings },
    ].map(({ label, key, icon: Icon }) => (
      <div
        key={key}
        onClick={() => setScreen(key as Screen)}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
          ${
            screen === key
              ? "bg-blue-50 text-blue-700 font-medium"
              : "text-gray-700 hover:bg-gray-100"
          }`}
      >
        <Icon size={18} />
        <span>{label}</span>
      </div>
    ))}
  </div>

  
</aside>
    

      {/* ========== MAIN ========== */}
      <main className="flex-1">
        {/* Top Bar */}
      <header className="bg-white border-b px-3 sm:px-4 md:px-6 py-3 md:py-4 flex gap-3 justify-between items-center">
        {/* MOBILE HAMBURGER */}
<button
  onClick={() => setMobileMenuOpen(true)}
  className="md:hidden text-gray-600 hover:text-blue-600 text-2xl"
>
  ☰
</button>

  {/* LEFT : PAGE TITLE */}
  <div className="font-semibold uppercase text-gray-800 text-sm sm:text-base md:text-lg truncate">
    {screen.replace("-", " ")}
  </div>

  {/* RIGHT : ADMIN INFO & ACTIONS */}
  <div className="flex items-center gap-6">
    {/* Notification */}
    <div className="relative">
  <button
    onClick={() => setShowNotifications(!showNotifications)}
    className="relative text-gray-500 hover:text-blue-600 transition"
    title="Notifications"
  >
    <Bell size={20} />
    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
  </button>

  {/* ================= NOTIFICATION DROPDOWN ================= */}
  {showNotifications && (
    <div className="absolute right-0 mt-3 w-72 bg-white border rounded-xl shadow-lg z-50">
      {/* Header */}
      <div className="px-4 py-3 border-b font-semibold text-sm">
        Notifications
      </div>

      {/* Content */}
      <div className="max-h-60 overflow-y-auto text-sm">
        {/* 🔹 No notifications state */}
        <div className="px-4 py-6 text-center text-gray-500">
          No notifications
        </div>

        {/*
        🔹 Future use (jab API aa jaye)
        <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
          New admission request received
        </div>
        */}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t text-center">
        <button className="text-xs text-blue-600 hover:underline">
          Mark all as read
        </button>
      </div>
    </div>
  )}
</div>


    {/* Admin Info (ICON + EMAIL always visible) */}
    <div className="flex items-center gap-2 border-l pl-4">
      <UserCircle size={28} className="text-blue-600" />
      <div className="leading-tight">
        <p className="text-sm font-medium text-gray-700">
          Admin
        </p>
        <p className="text-xs text-gray-500">
          admin@gmail.com
        </p>
      </div>
    </div>

    {/* Logout */}
    <button
      onClick={() => setShowLogoutModal(true)}
      className="text-gray-500 hover:text-red-600 transition"
      title="Logout"
    >
      <LogOut size={20} />
    </button>
  </div>
</header>



        <div className="p-3 sm:p-4 md:p-6">
          {/* ================= DASHBOARD ================= */}
          {screen === "dashboard" && (
  <>
    {/* ================= DATE FILTER ================= */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold">Dashboard Overview</h2>

      <div className="flex gap-2">
        {["Today", "7 Days", "30 Days"].map((d) => (
          <button
            key={d}
            className="px-3 py-1 text-sm rounded-lg border hover:bg-blue-50 hover:text-blue-700"
          >
            {d}
          </button>
        ))}
      </div>
    </div>

    {/* ================= STATS CARDS ================= */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {[
        { title: "Total Users", value: dashboardStats.totalUsers, link: "users" },
        { title: "Total Leads", value: dashboardStats.totalLeads, link: "leads" },
        { title: "Total Packages", value: dashboardStats.totalPackages, link: "packages" },
        { title: "Active Subscriptions", value: dashboardStats.activeSubscriptions, link: "packages" },
        { title: "Monthly Revenue", value: `₹${dashboardStats.monthlyRevenue}`, link: "packages" },
      ].map((item) => (
        <div
          key={item.title}
          onClick={() => setScreen(item.link as any)}
          className="bg-white p-4 rounded-xl shadow cursor-pointer hover:shadow-md transition"
        >
          <p className="text-sm text-gray-500">{item.title}</p>
          <h2 className="text-2xl font-bold mt-2">{item.value}</h2>
          <p className="text-xs text-blue-600 mt-1">
            View details →
          </p>
        </div>
      ))}
    </div>

    {/* ================= CHARTS ================= */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-3">
          User Growth
        </h3>
        <div className="h-64">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={userGrowthData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="users"
        stroke="#2563eb"
        strokeWidth={3}
      />
    </LineChart>
  </ResponsiveContainer>
</div>

      </div>

      <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-3">
          Leads vs Conversions
        </h3>
        <div className="h-64">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={leadsData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="leads" fill="#93c5fd" />
      <Bar dataKey="conversions" fill="#2563eb" />
    </BarChart>
  </ResponsiveContainer>
</div>

      </div>
    </div>

    {/* ================= BOTTOM TABLES ================= */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Users */}
      <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">
            Recent Users
          </h3>
          <button
            onClick={() => setScreen("users")}
            className="text-sm text-blue-600"
          >
            View all
          </button>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p>• John Doe (Student)</p>
          <p>• Ayesha Khan (Employer)</p>
          <p>• Rahul Verma (Student)</p>
        </div>
      </div>

      {/* Recent Admission Requests */}
      <div className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">
            Recent Admission Requests
          </h3>
          <button
            onClick={() => setScreen("admissions")}
            className="text-sm text-blue-600"
          >
            View all
          </button>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p>• MBA – Delhi University</p>
          <p>• B.Tech – AKTU</p>
          <p>• MCA – IP University</p>
        </div>
      </div>
    </div>
  </>
)}

          {/* ================= USERS LIST ================= */}
          {screen === "users" && (
  <>
    {/* ================= HEADER ================= */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <h2 className="text-xl font-bold">Users</h2>

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={userSearch}
          onChange={(e) => {
            setUserSearch(e.target.value);
            setUserPage(1);
          }}
          className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
        />

        <select
          value={userRole}
          onChange={(e) => {
            setUserRole(e.target.value);
            setUserPage(1);
          }}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All Roles</option>
          <option value="student">Student</option>
          <option value="employer">Employer</option>
          <option value="company">Company</option>
        </select>

        
      </div>
    </div>

    {/* ================= TABLE ================= */}
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Profile</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Role</th>
            
            <th className="px-4 py-3 text-left">Registered</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {/* Loading */}
          {usersLoading && (
            <tr>
              <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                Loading users...
              </td>
            </tr>
          )}

          {/* Empty */}
          {!usersLoading && users.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                No users found
              </td>
            </tr>
          )}

          {/* Data */}
          {!usersLoading &&
            users.map((user: any) => (
              <tr key={user._id} className="hover:bg-gray-50">

                {/* Profile */}
                <td className="px-4 py-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    {user.firstName?.[0] || "U"}
                  </div>
                </td>

                {/* Name */}
                <td className="px-4 py-3 font-medium">
                  {user.firstName} {user.lastName || ""}
                </td>

                {/* Email */}
                <td className="px-4 py-3 text-gray-600">
                  {user.emailId || "—"}
                </td>

                {/* Phone */}
                <td className="px-4 py-3">
                  {user.phoneNumber || "—"}
                </td>

                {/* Role */}
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-700 capitalize">
                    {user.role}
                  </span>
                </td>

               
                

                {/* Registered */}
                <td className="px-4 py-3 text-gray-500">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "—"}
                </td>

                {/* Action */}
                <td className="px-4 py-3">
                  <div className="flex gap-3 text-xs">
                    <button
  onClick={() => {
    console.log("CLICKED USER ID 👉", user._id);

    setSelectedUserId(user._id);
    setScreen("user-detail");
  }}
  className="text-blue-600 hover:underline"
>
  View
</button>


                    

                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>

    {/* ================= PAGINATION ================= */}
    <div className="flex justify-between items-center mt-6 text-sm">
      <p className="text-gray-500">
        Page {userPage} of {userTotalPages}
      </p>

      <div className="flex gap-2">
        <button
          disabled={userPage === 1}
          onClick={() => setUserPage(userPage - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <button
          disabled={userPage === userTotalPages}
          onClick={() => setUserPage(userPage + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </>
)}


{screen === "user-detail" && (
  userDetailLoading ? (
    <div className="text-center py-10 text-gray-500">
      Loading user details...
    </div>
  ) : !selectedUser ? (
    <div className="text-center py-10 text-gray-500">
      User not found
    </div>
  ) : (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

      {/* ================= LEFT PANEL ================= */}
      <div className="bg-white rounded-xl shadow p-4">

        {/* Profile */}
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-700">
            {selectedUser.firstName?.[0] || "U"}
          </div>

          <h2 className="mt-4 font-semibold text-lg">
            {selectedUser.firstName} {selectedUser.lastName}
          </h2>

          <span className="mt-1 px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 capitalize">
            {selectedUser.role}
          </span>

          <span
            className={`mt-2 px-3 py-1 text-xs rounded-full ${
              selectedUser.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {selectedUser.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Contact */}
        <div className="mt-6 text-sm text-gray-600 space-y-2">
          <p><b>Email:</b> {selectedUser.emailId || "—"}</p>
          <p><b>Phone:</b> {selectedUser.phoneNumber || "—"}</p>
          <p><b>Job Type:</b> {selectedUser.jobType || "—"}</p>
          <p><b>Location:</b> {selectedUser.profile?.location || "—"}</p>
        </div>
      </div>

      {/* ================= RIGHT PANEL ================= */}
      <div className="lg:col-span-3 bg-white rounded-xl shadow p-4">

        {/* ================= OVERVIEW ================= */}
        <div className="text-sm text-gray-700 space-y-3">
          <p><b>User ID:</b> {selectedUser._id}</p>
          <p>
            <b>Registered On:</b>{" "}
            {new Date(selectedUser.createdAt).toLocaleDateString()}
          </p>
          <p>
            <b>Last Updated:</b>{" "}
            {new Date(selectedUser.updatedAt).toLocaleDateString()}
          </p>
        </div>

        {/* ================= PROFILE DETAILS ================= */}
        <div className="mt-6 border rounded-xl p-4">
          <h3 className="font-semibold mb-3 text-gray-800">
            Profile Information
          </h3>

          <div className="text-sm text-gray-700 space-y-2">
            <p><b>Headline:</b> {selectedUser.profile?.headline || "—"}</p>
            <p><b>Bio:</b> {selectedUser.profile?.bio || "—"}</p>

            <p>
              <b>Resume:</b>{" "}
              {selectedUser.profile?.resumeUrl ? (
                <a
                  href={selectedUser.profile.resumeUrl}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>
              ) : (
                "—"
              )}
            </p>

            <p>
              <b>Skills:</b>{" "}
              {selectedUser.profile?.skills?.length > 0
                ? selectedUser.profile.skills.join(", ")
                : "—"}
            </p>
          </div>
        </div>

        {/* ================= COMPANY DETAILS ================= */}
        {selectedUser.role === "company" && (
          <div className="mt-6 border rounded-xl p-4">
            <h3 className="font-semibold mb-3 text-gray-800">
              Company Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <p><b>Company Name:</b> {selectedUser.companyDetails?.companyName || "—"}</p>
              <p><b>Company Type:</b> {selectedUser.companyDetails?.companyType || "—"}</p>
              <p><b>Industry:</b> {selectedUser.companyDetails?.industry || "—"}</p>
              <p><b>Registration No:</b> {selectedUser.companyDetails?.registrationNumber || "—"}</p>
              <p>
                <b>Incorporation Date:</b>{" "}
                {selectedUser.companyDetails?.incorporationDate
                  ? new Date(
                      selectedUser.companyDetails.incorporationDate
                    ).toLocaleDateString()
                  : "—"}
              </p>
              <p>
                <b>Terms Accepted:</b>{" "}
                {selectedUser.companyDetails?.termsAccepted ? "Yes" : "No"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
)}




{screen === "leads" && (
  <>
    {/* ================= HEADER ================= */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <h2 className="text-xl font-bold">Leads</h2>

      <input
        placeholder="Search leads..."
        className="border rounded-lg px-4 py-2 text-sm max-w-xs"
      />
    </div>

    {/* ================= TABLE ================= */}
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3">
              <input type="checkbox" />
            </th>
            <th className="px-4 py-3 text-left">Lead Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Source</th>
            <th className="px-4 py-3 text-left">Course</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Counselor</th>
            <th className="px-4 py-3 text-left">Created</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {[1, 2, 3, 4].map((i) => (
            <tr
              key={i}
              className="hover:bg-blue-50 transition"
            >
              <td className="px-4 py-3">
                <input type="checkbox" />
              </td>

              <td className="px-4 py-3 font-medium">
                Lead Name {i}
              </td>

              <td className="px-4 py-3 text-gray-600">
                lead{i}@gmail.com
              </td>

              <td className="px-4 py-3">
                98765432{i}
              </td>

              <td className="px-4 py-3">
                Website
              </td>

              <td className="px-4 py-3">
                MBA
              </td>

              {/* Status */}
              <td className="px-4 py-3">
                <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
                  New
                </span>
              </td>

              <td className="px-4 py-3">
                Ankit
              </td>

              <td className="px-4 py-3 text-gray-500">
                10 Jan 2026
              </td>

              <td className="px-4 py-3">
                <button
                  onClick={() => setScreen("lead-detail")}
                  className="text-blue-600 text-xs hover:underline"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
)}

{screen === "lead-detail" && (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* ================= LEFT ================= */}
    <div className="bg-white rounded-xl shadow p-3 sm:p-4 md:p-6">
      <h3 className="font-semibold mb-4">
        Lead Information
      </h3>

      <div className="text-sm text-gray-600 space-y-2">
        <p><b>Name:</b> Rohan Sharma</p>
        <p><b>Email:</b> rohan@gmail.com</p>
        <p><b>Phone:</b> 9876543210</p>
        <p><b>Source:</b> Website</p>

        <span className="inline-block mt-2 px-3 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
          New Lead
        </span>
      </div>

      {/* Actions */}
      <div className="mt-6 space-y-2">
        <button className="w-full border rounded-lg py-2 text-sm hover:bg-gray-50">
          Update Status
        </button>
        <button className="w-full border rounded-lg py-2 text-sm hover:bg-gray-50">
          Assign Counselor
        </button>
        <button className="w-full bg-green-600 text-white rounded-lg py-2 text-sm hover:bg-green-700">
          Convert to User
        </button>
      </div>
    </div>

    {/* ================= RIGHT ================= */}
    <div className="lg:col-span-2 space-y-6">
      {/* Course Interest */}
      <div className="bg-white rounded-xl shadow p-3 sm:p-4 md:p-6">
        <h3 className="font-semibold mb-3">
          Course Interest
        </h3>
        <p className="text-sm text-gray-600">
          MBA – Marketing (Delhi University)
        </p>
      </div>

      {/* Notes Timeline */}
      <div className="bg-white rounded-xl shadow p-3 sm:p-4 md:p-6">
        <h3 className="font-semibold mb-3">
          Notes & Remarks
        </h3>

        <ul className="space-y-3 text-sm">
          <li className="border-l-2 border-blue-600 pl-3">
            <p className="text-gray-700">
              Follow-up call done
            </p>
            <span className="text-xs text-gray-400">
              Today, 11:00 AM
            </span>
          </li>

          <li className="border-l-2 border-gray-300 pl-3">
            <p className="text-gray-700">
              Lead created
            </p>
            <span className="text-xs text-gray-400">
              10 Jan 2026
            </span>
          </li>
        </ul>
      </div>

      {/* Follow-up History */}
      <div className="bg-white rounded-xl shadow p-3 sm:p-4 md:p-6">
        <h3 className="font-semibold mb-3">
          Follow-up History
        </h3>

        <p className="text-sm text-gray-500">
          No pending follow-ups
        </p>
      </div>
    </div>
  </div>
)}


          {/* ================= PACKAGES (IMAGE MATCH) ================= */}
          {screen === "packages" && (
            <>
              <div className="flex justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">
                    Packages & Plans
                  </h2>
                  <p className="text-sm text-gray-500">
                    Manage subscription plans for employers.
                  </p>
                </div>
                <button
                  onClick={() => setScreen("create-package")}
                  className="bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  + Create Package
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {[
                  "Total Packages",
                  "Active Plans",
                  "Inactive Plans",
                ].map((t) => (
                  <div
                    key={t}
                    className="bg-white p-3 sm:p-4 md:p-6 rounded-xl shadow"
                  >
                    <p className="text-sm text-gray-500">{t}</p>
                    <h2 className="text-2xl font-bold mt-2">0</h2>
                  </div>
                ))}
              </div>

              
            </>
          )}

          {/* ================= CREATE / EDIT PACKAGE ================= */}
{/* ================= CREATE / EDIT PACKAGE ================= */}
{screen === "create-package" && (
  <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-3 sm:p-4 md:p-6 md:p-8">
    {/* Header */}
    <div className="mb-6">
      <h2 className="text-xl font-bold">
        Create / Edit Package
      </h2>
      <p className="text-sm text-gray-500">
        Configure pricing plans and features
      </p>
    </div>

    {/* FORM */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* ================= LEFT FORM ================= */}
      <div className="lg:col-span-2 space-y-5">
        {/* Package Name */}
        <div>
          <label className="text-sm font-medium">
            Package Name <span className="text-red-500">*</span>
          </label>
          <input
            placeholder="e.g. Premium Plan"
            className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none transition"
          />
          <p className="text-xs text-gray-400 mt-1">
            Package name is required
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Describe package benefits..."
            className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none transition"
          />
        </div>

        {/* Price + Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">
              Price (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="999"
              className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none transition"
            />
            <p className="text-xs text-gray-400 mt-1">
              Enter valid price
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">
              Duration
            </label>
            <select className="w-full mt-1 border rounded-lg px-4 py-2 hover:border-blue-600 transition">
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>
        </div>

        {/* Features */}
        <div>
          <label className="text-sm font-medium">
            Features
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {[
              "Unlimited Job Posts",
              "Featured Listing",
              "Premium Support",
              "Analytics Dashboard",
              "Priority Visibility",
              "Dedicated Manager",
            ].map((feature) => (
              <label
                key={feature}
                className="flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition"
              >
                <input type="checkbox" className="accent-blue-600" />
                <span className="text-sm">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className="accent-blue-600 scale-110"
            defaultChecked
          />
          <span className="text-sm font-medium">
            Active Package
          </span>
        </div>
      </div>

      {/* ================= RIGHT PREVIEW ================= */}
      <div className="bg-gray-50 rounded-xl p-5 border">
        <h3 className="font-semibold mb-3">
          Package Preview
        </h3>

        <div className="bg-white rounded-xl shadow p-4">
          <h4 className="font-bold text-lg mb-1">
            Premium Plan
          </h4>
          <p className="text-sm text-gray-500 mb-3">
            ₹999 / Month
          </p>

          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              ✅ Unlimited Job Posts
            </li>
            <li className="flex gap-2">
              ✅ Featured Listing
            </li>
            <li className="flex gap-2">
              ✅ Premium Support
            </li>
          </ul>

          <span className="inline-block mt-4 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
            Active
          </span>
        </div>
      </div>
    </div>

    {/* ACTIONS */}
    <div className="mt-8 flex justify-end gap-3">
      <button
        onClick={() => setScreen("packages")}
        className="px-5 py-2 rounded-lg border hover:bg-gray-100 transition"
      >
        Cancel
      </button>

      <button className="px-6 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition shadow">
        Save Package
      </button>
    </div>
  </div>
)}
  {/* admissions */}

  {screen === "admissions" && (
  <>
    {/* ================= HEADER ================= */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <h2 className="text-xl font-bold">
        Admission Requests
      </h2>

      <input
        placeholder="Search by student or course..."
        className="border rounded-lg px-4 py-2 text-sm max-w-xs focus:ring-2 focus:ring-blue-600 outline-none transition"
      />
    </div>

    {/* ================= TABLE ================= */}
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Student Name</th>
            <th className="px-4 py-3 text-left">Course</th>
            <th className="px-4 py-3 text-left">University</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Request Date</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {[1, 2, 3, 4, 5].map((i) => (
            <tr
              key={i}
              className="hover:bg-blue-50 transition"
            >
              {/* Student Name */}
              <td className="px-4 py-3 font-medium">
                Student Name {i}
              </td>

              {/* Course */}
              <td className="px-4 py-3">
                MBA
              </td>

              {/* University */}
              <td className="px-4 py-3 text-gray-600">
                Delhi University
              </td>

              {/* Status */}
              <td className="px-4 py-3">
                {i % 3 === 0 ? (
                  <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                    Approved
                  </span>
                ) : i % 2 === 0 ? (
                  <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
                    Pending
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">
                    Rejected
                  </span>
                )}
              </td>

              {/* Date */}
              <td className="px-4 py-3 text-gray-500">
                14 Jan 2026
              </td>

              {/* Action */}
              <td className="px-4 py-3">
                <button
                  onClick={() => setScreen("admission-detail")}
                  className="text-blue-600 text-xs hover:underline"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* ================= PAGINATION ================= */}
    <div className="flex justify-between items-center mt-6 text-sm">
      <p className="text-gray-500">
        Showing 1–5 of 28 requests
      </p>

      <div className="flex gap-2">
        <button className="px-3 py-1 border rounded hover:bg-gray-100">
          Prev
        </button>
        <button className="px-3 py-1 border rounded bg-blue-600 text-white">
          1
        </button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100">
          2
        </button>
        <button className="px-3 py-1 border rounded hover:bg-gray-100">
          Next
        </button>
      </div>
    </div>
  </>
)}

{screen === "admission-detail" && (() => {
  

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">
            Admission Request Details
          </h2>
          <p className="text-sm text-gray-500">
            Review student profile and application
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setShowRequestInfo(!showRequestInfo)}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
          >
            Request More Info
          </button>

          <button
            onClick={() => setStatus("Rejected")}
            className="px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
          >
            Reject
          </button>

          <button
            onClick={() => setStatus("Approved")}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Approve
          </button>
        </div>
      </div>

      {/* ================= REQUEST INFO ================= */}
      {showRequestInfo && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h4 className="font-semibold mb-2 text-sm">
            Request Additional Information
          </h4>
          <textarea
            rows={2}
            placeholder="Mention what information is required from student..."
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 outline-none transition"
          />
          <button className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
            Send Request
          </button>
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ================= STUDENT ================= */}
        <div className="bg-white rounded-xl shadow p-3 sm:p-4 md:p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-700">
              S
            </div>
            <div>
              <h3 className="font-semibold">Aman Gupta</h3>
              <p className="text-sm text-gray-500">Student</p>

              <span
                className={`inline-block mt-1 px-2 py-1 text-xs rounded
                  ${status === "Pending" && "bg-yellow-100 text-yellow-700"}
                  ${status === "Approved" && "bg-green-100 text-green-700"}
                  ${status === "Rejected" && "bg-red-100 text-red-700"}
                `}
              >
                {status}
              </span>
            </div>
          </div>

          <div className="text-sm text-gray-600 space-y-2">
            <p><b>Email:</b> aman@gmail.com</p>
            <p><b>Phone:</b> 9876543210</p>
            <p><b>DOB:</b> 12 Feb 2002</p>
            <p><b>City:</b> Delhi</p>
          </div>
        </div>

        {/* ================= COURSE ================= */}
        <div className="bg-white rounded-xl shadow p-3 sm:p-4 md:p-6">
          <h3 className="font-semibold mb-3">Course Details</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p><b>Course:</b> MBA – Marketing</p>
            <p><b>University:</b> Delhi University</p>
            <p><b>Intake:</b> 2026</p>
            <p><b>Mode:</b> Full Time</p>
          </div>
        </div>

        {/* ================= DOCUMENTS ================= */}
        <div className="bg-white rounded-xl shadow p-3 sm:p-4 md:p-6">
          <h3 className="font-semibold mb-3">Uploaded Documents</h3>
          <ul className="space-y-2 text-sm">
            {[
              "10th Marksheet",
              "12th Marksheet",
              "Graduation Certificate",
              "ID Proof",
            ].map((doc) => (
              <li
                key={doc}
                className="flex justify-between items-center border rounded-lg px-3 py-2 hover:bg-gray-50 transition"
              >
                <span>{doc}</span>
                <button className="text-blue-600 text-xs hover:underline">
                  View
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ================= COUNSELOR NOTES ================= */}
      <div className="bg-white rounded-xl shadow p-3 sm:p-4 md:p-6">
        <h3 className="font-semibold mb-4">Counselor Notes</h3>

        <div className="space-y-3 text-sm">
          <div className="border-l-2 border-blue-600 pl-3">
            <p>Student is interested in scholarship options.</p>
            <span className="text-xs text-gray-400">
              Added on 14 Jan 2026
            </span>
          </div>

          <div className="border-l-2 border-gray-300 pl-3">
            <p>Initial counseling completed.</p>
            <span className="text-xs text-gray-400">
              12 Jan 2026
            </span>
          </div>
        </div>

        {/* Add Note */}
        <textarea
          rows={2}
          placeholder="Add new note..."
          className="w-full mt-4 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none transition"
        />
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Add Note
        </button>
      </div>
    </div>
  );
})()}


{screen === "courses" && (
  <>
    {/* ================= HEADER ================= */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <h2 className="text-xl font-bold">
        Courses
      </h2>

      <button
        onClick={() => {
          resetCampusCourseForm();
          setScreen("add-course");
        }}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        + Add Course
      </button>
    </div>

    {/* ================= TABLE ================= */}
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">University</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Duration</th>
            <th className="px-4 py-3 text-left">Level</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {campusCoursesLoading && (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                Loading courses...
              </td>
            </tr>
          )}

          {!campusCoursesLoading && campusCourses.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                No courses found
              </td>
            </tr>
          )}

          {!campusCoursesLoading && campusCourses.map((course: any) => (
            <tr
              key={course._id}
              className="hover:bg-blue-50 transition"
            >
              <td className="px-4 py-3 font-medium">
                {course.title}
              </td>
              <td className="px-4 py-3">
                {course.university}
              </td>
              <td className="px-4 py-3">
                {course.category}
              </td>
              <td className="px-4 py-3">
                {course.duration}
              </td>
              <td className="px-4 py-3">
                {course.level}
              </td>

              {/* Action */}
              <td className="px-4 py-3">
                <div className="flex gap-3 text-xs">
                  <button
                    onClick={() => {
                      setViewCampusCourse(course);
                      setShowViewCampusCourseModal(true);
                    }}
                    className="text-green-600 hover:underline"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setEditingCampusCourse(course);
                      setCampusCourseForm({
                        university: course.university || "",
                        type: course.type || "",
                        title: course.title || "",
                        desc: course.desc || "",
                        rating: course.rating || "",
                        duration: course.duration || "",
                        enrolled: course.enrolled || "",
                        level: course.level || "",
                        category: course.category || "Engineering",
                      });
                      setScreen("add-course");
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCampusCourse(course._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
)}


{screen === "add-course" && (
  <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-3 sm:p-4 md:p-6 md:p-8">
    {/* ================= HEADER ================= */}
    <div className="mb-6">
      <h2 className="text-xl font-bold">
        {editingCampusCourse ? "Edit Course" : "Add Course"}
      </h2>
      <p className="text-sm text-gray-500">
        Manage course details and availability
      </p>
    </div>

    {/* ================= FORM ================= */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Course Name */}
      <div>
        <label className="text-sm font-medium">
          Course Title <span className="text-red-500">*</span>
        </label>
        <input
          value={campusCourseForm.title}
          onChange={(e) => setCampusCourseForm({ ...campusCourseForm, title: e.target.value })}
          placeholder="e.g. B.Tech Mechanical"
          className="w-full mt-1 border rounded-lg px-4 py-2
            focus:ring-2 focus:ring-blue-600 outline-none transition"
        />
        <p className="text-xs text-gray-400 mt-1">
          Course name is required
        </p>
      </div>

      {/* University */}
      <div>
        <label className="text-sm font-medium">
          University <span className="text-red-500">*</span>
        </label>
        <input
          value={campusCourseForm.university}
          onChange={(e) => setCampusCourseForm({ ...campusCourseForm, university: e.target.value })}
          placeholder="e.g. IIT Bombay"
          className="w-full mt-1 border rounded-lg px-4 py-2
            focus:ring-2 focus:ring-blue-600 outline-none transition"
        />
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-medium">
          Category
        </label>
        <select
          value={campusCourseForm.category}
          onChange={(e) => setCampusCourseForm({ ...campusCourseForm, category: e.target.value })}
          className="w-full mt-1 border rounded-lg px-4 py-2
            hover:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition"
        >
          {["Engineering", "Management", "Technology", "Business", "Design", "Arts", "Science"].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Duration */}
      <div>
        <label className="text-sm font-medium">
          Duration
        </label>
        <input
          value={campusCourseForm.duration}
          onChange={(e) => setCampusCourseForm({ ...campusCourseForm, duration: e.target.value })}
          placeholder="e.g. 2 Years"
          className="w-full mt-1 border rounded-lg px-4 py-2
            focus:ring-2 focus:ring-blue-600 outline-none transition"
        />
      </div>

      {/* Type */}
      <div>
        <label className="text-sm font-medium">
          Type (Degree)
        </label>
        <input
          value={campusCourseForm.type}
          onChange={(e) => setCampusCourseForm({ ...campusCourseForm, type: e.target.value })}
          placeholder="e.g. B.Tech"
          className="w-full mt-1 border rounded-lg px-4 py-2
            focus:ring-2 focus:ring-blue-600 outline-none transition"
        />
      </div>
    </div>

    {/* Level */}
    <div className="mt-6">
      <label className="text-sm font-medium">
        Level
      </label>
      <input
        value={campusCourseForm.level}
        onChange={(e) => setCampusCourseForm({ ...campusCourseForm, level: e.target.value })}
        placeholder="e.g. Undergraduate"
        className="w-full mt-1 border rounded-lg px-4 py-2
          focus:ring-2 focus:ring-blue-600 outline-none transition"
      />
    </div>

    {/* Description */}
    <div className="mt-6">
      <label className="text-sm font-medium">
        Description
      </label>
      <textarea
        value={campusCourseForm.desc}
        onChange={(e) => setCampusCourseForm({ ...campusCourseForm, desc: e.target.value })}
        rows={4}
        placeholder="Brief description about the course..."
        className="w-full mt-1 border rounded-lg px-4 py-2
          focus:ring-2 focus:ring-blue-600 outline-none transition"
      />
    </div>

    {/* Extra Fields */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div>
        <label className="text-sm font-medium">Rating</label>
        <input
          value={campusCourseForm.rating}
          onChange={(e) => setCampusCourseForm({ ...campusCourseForm, rating: e.target.value })}
          placeholder="e.g. 4.8"
          className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Enrolled Count</label>
        <input
          value={campusCourseForm.enrolled}
          onChange={(e) => setCampusCourseForm({ ...campusCourseForm, enrolled: e.target.value })}
          placeholder="e.g. 950"
          className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
        />
      </div>
    </div>

    {/* ================= ACTIONS ================= */}
    <div className="mt-8 flex justify-end gap-3">
      <button
        onClick={() => {
          resetCampusCourseForm();
          setScreen("courses");
        }}
        className="px-5 py-2 rounded-lg border hover:bg-gray-100 transition"
      >
        Cancel
      </button>

      <button
        onClick={handleSaveCampusCourse}
        className="px-6 py-2 rounded-lg bg-blue-600 text-white
          hover:bg-blue-700 transition shadow"
      >
        {editingCampusCourse ? "Update Course" : "Save Course"}
      </button>
    </div>
  </div>
)}

{screen === "create-blog" && (
  <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-4 sm:p-6 md:p-8">

    {/* HEADER */}
    <div className="mb-6">
      <h2 className="text-xl font-bold">
        {editingBlog ? "Edit Blog" : "Create Blog"}
      </h2>
      <p className="text-sm text-gray-500">
        Write and publish blog content
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* LEFT */}
      <div className="lg:col-span-2 space-y-5">

        {/* Title */}
        <div>
          <label className="text-sm font-medium">Title *</label>
          <input
            value={blogForm.title}
            onChange={(e) =>
              setBlogForm({ ...blogForm, title: e.target.value })
            }
            className="w-full mt-1 border rounded-lg px-4 py-2"
            placeholder="Mastering MERN Stack in 2024"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="text-sm font-medium">Excerpt *</label>
          <textarea
            rows={3}
            value={blogForm.excerpt}
            onChange={(e) =>
              setBlogForm({ ...blogForm, excerpt: e.target.value })
            }
            className="w-full mt-1 border rounded-lg px-4 py-2"
            placeholder="Short summary for blog listing cards"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium">Category *</label>
          <select
  value={blogForm.category}
  onChange={(e) =>
    setBlogForm({ ...blogForm, category: e.target.value })
  }
  className="w-full mt-1 border rounded-lg px-4 py-2"
>
  <option value="">Select category</option>

  {[
    "Career Advice",
    "Interview Tips",
    "Success Stories",
    "Product Updates",
    "Industry Trends",
    "Internship Guide",
  ].map((cat) => (
    <option key={cat} value={cat}>
      {cat}
    </option>
  ))}
</select>

        </div>

        {/* Blog Content */}
        <div>
          <label className="text-sm font-medium">Blog Content *</label>
          <textarea
            rows={10}
            value={blogForm.content}
            onChange={(e) =>
              setBlogForm({ ...blogForm, content: e.target.value })
            }
            className="w-full mt-2 border rounded-lg px-4 py-2"
            placeholder="Write full blog content here..."
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="space-y-6">

        {/* Image URL */}
        <div>
          <label className="text-sm font-medium">Featured Image URL</label>
          <input
            value={blogForm.imageUrl}
            onChange={(e) =>
              setBlogForm({ ...blogForm, imageUrl: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
            placeholder="https://example.com/blog-image.jpg"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="text-sm font-medium">
            Tags (comma separated)
          </label>
          <input
            value={blogForm.tags}
            onChange={(e) =>
              setBlogForm({ ...blogForm, tags: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
            placeholder="MERN, Javascript, NodeJS"
          />
        </div>

        {/* ACTIONS */}
        <div className="border rounded-xl p-4 space-y-3">

          {/* Cancel */}
          <button
            onClick={() => {
              setEditingBlog(null);
              setBlogForm({
                title: "",
                content: "",
                excerpt: "",
                category: "",
                tags: "",
                imageUrl: "",
              });
              setScreen("blog-categories");
            }}
            className="w-full border rounded-lg py-2"
          >
            Cancel
          </button>

          {/* Save */}
          <button
            disabled={blogLoading}
            onClick={async () => {
              try {
                if (
                  !blogForm.title ||
                  !blogForm.content ||
                  !blogForm.excerpt ||
                  !blogForm.category
                ) {
                  Swal.fire(
                    "Missing fields",
                    "Please fill all required fields",
                    "warning"
                  );
                  return;
                }

                setBlogLoading(true);

                const payload = {
                  title: blogForm.title.trim(),
                  content: blogForm.content,
                  excerpt: blogForm.excerpt.trim(),
                  category: blogForm.category,
                  tags: blogForm.tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                  imageUrl: blogForm.imageUrl.trim(),
                };

                console.log("BLOG PAYLOAD 👉", payload);

                if (editingBlog) {
                  // ✅ UPDATE
                  await API.patch(`/api/blogs/${editingBlog._id}`, payload);


                  Swal.fire({
                    icon: "success",
                    title: "Blog Updated",
                    timer: 1500,
                    showConfirmButton: false,
                  });
                } else {
                  // ✅ CREATE
                  await API.post("/api/blogs", payload);

                  Swal.fire({
                    icon: "success",
                    title: "Blog Created",
                    timer: 1500,
                    showConfirmButton: false,
                  });
                }

                setEditingBlog(null);
                setBlogForm({
                  title: "",
                  content: "",
                  excerpt: "",
                  category: "",
                  tags: "",
                  imageUrl: "",
                });

                fetchBlogs();
                setScreen("blog-categories");

              } catch (err: any) {
                Swal.fire(
                  "Failed",
                  err.response?.data?.message ||
                    "Unable to save blog",
                  "error"
                );
              } finally {
                setBlogLoading(false);
              }
            }}
            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 disabled:opacity-60"
          >
            {blogLoading
              ? "Saving..."
              : editingBlog
              ? "Update Blog"
              : "Save Blog"}
          </button>
        </div>
      </div>
    </div>
  </div>
)}


{screen === "blog-categories" && (
  <>
    {/* ================= HEADER ================= */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h2 className="text-xl font-bold">
          Blogs
        </h2>
        <p className="text-sm text-gray-500">
          Manage blogs, edit or delete posts
        </p>
      </div>

      <button
        onClick={() => {
          setEditingBlog(null);
          setBlogForm({
            title: "",
            content: "",
            excerpt: "",
            category: "",
            tags: "",
            imageUrl: "",
          });
          setScreen("create-blog");
        }}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        + Add Blog
      </button>
    </div>

    {/* ================= TABLE ================= */}
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Created Date</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">

          {/* Loading */}
          {blogsLoading && (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                Loading blogs...
              </td>
            </tr>
          )}

          {/* Empty */}
          {!blogsLoading && blogs.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                No blogs found
              </td>
            </tr>
          )}

          {/* Data */}
          {!blogsLoading &&
            blogs.map((blog) => (
              <tr
                key={blog._id}
                className="hover:bg-blue-50 transition"
              >
                {/* Title */}
                <td className="px-4 py-3 font-medium">
                  {blog.title}
                </td>

                {/* Category */}
                <td className="px-4 py-3">
                  {blog.category}
                </td>

                {/* Date */}
                <td className="px-4 py-3 text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>

                {/* Action */}
                <td className="px-4 py-3">
                  <div className="flex gap-3 text-xs">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => {
  setEditingBlog(blog);
  setScreen("create-blog");
}}

                        
                    >
                      Edit
                    </button>

                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDeleteBlog(blog._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </>
)}


{screen === "companies" && (
  <>
    {/* ================= HEADER ================= */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h2 className="text-xl font-bold">Companies</h2>
        <p className="text-sm text-gray-500">
          Manage registered companies
        </p>
      </div>

      <button
        onClick={() => {
          setSelectedCompany(null);
          setScreen("create-company");
        }}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        + Add Company
      </button>
    </div>

    {/* ================= TABLE ================= */}
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Company Name</th>
            <th className="px-4 py-3 text-left">Location</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Created At</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">

          {/* 🔐 SAFETY CHECK */}
          {!Array.isArray(companies) || companies.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-10 text-center text-gray-500"
              >
                <p className="mb-4">No companies found</p>

                <button
                  onClick={() => {
                    setSelectedCompany(null);
                    setScreen("create-company");
                  }}
                  className="inline-flex items-center px-4 py-2 rounded-lg
                    bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
                >
                  + Add Company
                </button>
              </td>
            </tr>
          ) : (
            companies.map((company: any) => (
              <tr
                key={company._id}
                className="hover:bg-blue-50 transition"
              >
                <td className="px-4 py-3 font-medium">
                  {company.name}
                </td>

                <td className="px-4 py-3">
                  {company.location}
                </td>

                <td className="px-4 py-3 text-gray-600 line-clamp-2 max-w-xs">
                  {company.description || "—"}
                </td>

                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                    Active
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-500">
                  {company.createdAt
                    ? new Date(company.createdAt).toLocaleDateString()
                    : "—"}
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-3 text-xs">
                    <button
                      onClick={() => {
                        setSelectedCompany(company);
                        setScreen("create-company");
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteCompany(company._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </>
)}


{screen === "create-company" && (
  <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-4 sm:p-6 md:p-8">

    {/* ================= HEADER ================= */}
    <div className="mb-6">
      <h2 className="text-xl font-bold">
        {selectedCompany ? "Edit Company" : "Add Company"}
      </h2>
      <p className="text-sm text-gray-500">
        Manage company information
      </p>
    </div>

    {/* ================= FORM ================= */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Company Name */}
      <div>
        <label className="text-sm font-medium">
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          value={companyForm.name}
          onChange={(e) =>
            setCompanyForm({ ...companyForm, name: e.target.value })
          }
          placeholder="e.g. TCS"
          className="w-full mt-1 border rounded-lg px-4 py-2
            focus:ring-2 focus:ring-blue-600 outline-none"
        />
      </div>

      {/* Location */}
      <div>
        <label className="text-sm font-medium">
          Location <span className="text-red-500">*</span>
        </label>
        <input
          value={companyForm.location}
          onChange={(e) =>
            setCompanyForm({ ...companyForm, location: e.target.value })
          }
          placeholder="e.g. Bangalore, India"
          className="w-full mt-1 border rounded-lg px-4 py-2
            focus:ring-2 focus:ring-blue-600 outline-none"
        />
      </div>

      {/* Website */}
      <div>
        <label className="text-sm font-medium">
          Website
        </label>
        <input
          value={companyForm.website}
          onChange={(e) =>
            setCompanyForm({ ...companyForm, website: e.target.value })
          }
          placeholder="https://company.com"
          className="w-full mt-1 border rounded-lg px-4 py-2
            focus:ring-2 focus:ring-blue-600 outline-none"
        />
      </div>

      {/* Logo URL */}
      <div>
        <label className="text-sm font-medium">
          Logo URL
        </label>
        <input
          value={companyForm.logoUrl}
          onChange={(e) =>
            setCompanyForm({ ...companyForm, logoUrl: e.target.value })
          }
          placeholder="https://image-url.com/logo.png"
          className="w-full mt-1 border rounded-lg px-4 py-2
            focus:ring-2 focus:ring-blue-600 outline-none"
        />
      </div>
    </div>

    {/* Description */}
    <div className="mt-6">
      <label className="text-sm font-medium">
        Description <span className="text-red-500">*</span>
      </label>
      <textarea
        rows={4}
        value={companyForm.description}
        onChange={(e) =>
          setCompanyForm({ ...companyForm, description: e.target.value })
        }
        placeholder="Brief description about the company"
        className="w-full mt-1 border rounded-lg px-4 py-2
          focus:ring-2 focus:ring-blue-600 outline-none"
      />
    </div>

    {/* ================= ACTIONS ================= */}
    <div className="mt-8 flex justify-end gap-3">
      <button
        onClick={() => {
          setSelectedCompany(null);
          setCompanyForm({
            name: "",
            description: "",
            website: "",
            location: "",
            logoUrl: "",
          });
          setScreen("companies");
        }}
        className="px-5 py-2 rounded-lg border hover:bg-gray-100"
      >
        Cancel
      </button>

      <button
        disabled={loading}
        onClick={handleSaveCompany}
        className="px-6 py-2 rounded-lg bg-blue-600 text-white
          hover:bg-blue-700 transition disabled:opacity-60"
      >
        {loading
          ? "Saving..."
          : selectedCompany
          ? "Update Company"
          : "Save Company"}
      </button>
    </div>
  </div>
)}



{screen === "testimonials" && (
  <>
    {/* ================= HEADER ================= */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h2 className="text-xl font-bold">
          Testimonials
        </h2>
        <p className="text-sm text-gray-500">
          Manage user testimonials and reviews
        </p>
      </div>
     
    </div>

    {/* ================= TABLE ================= */}
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Rating</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {[
            {
              name: "Aman Gupta",
              role: "Student",
              rating: 2,
              status: "Active",
            },
            {
              name: "Neha Sharma",
              role: "Parent",
              rating: 5,
              status: "Inactive",
            },
            {
              name: "Rohit Verma",
              role: "Employer",
              rating: 3,
              status: "Active",
            },
            {
              name: "Rohit Verma",
              role: "Employer",
              rating: 4,
              status: "Active",
            },{
              name: "Rohit Verma",
              role: "Employer",
              rating: 2,
              status: "Active",
            },
          ].map((t, i) => (
            <tr
              key={i}
              className="hover:bg-blue-50 transition"
            >
              {/* Name */}
              <td className="px-4 py-3 font-medium">
                {t.name}
              </td>

              {/* Role */}
              <td className="px-4 py-3">
                {t.role}
              </td>

              {/* Rating */}
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <span
                      key={idx}
                      className={`text-sm ${
                        idx < t.rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </td>

              {/* Status */}
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs rounded
                    ${
                      t.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {t.status}
                </span>
              </td>

              {/* Date */}
              <td className="px-4 py-3 text-gray-500">
                22 Jan 2026
              </td>

              {/* Action */}
              <td className="px-4 py-3">
                <div className="flex gap-3 text-xs">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
)}

{screen === "Jobs" && (
  <>
    {/* ================= HEADER ================= */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h2 className="text-xl font-bold">Jobs</h2>
        <p className="text-sm text-gray-500">
          Manage job openings and hiring status
        </p>
      </div>

      <button
        onClick={() => {
          setEditingJob(null);
          resetJobForm();
          setShowAddJobModal(true);
        }}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        + Add Job
      </button>
    </div>

    {/* ================= SEARCH ================= */}
    <input
      placeholder="Search by job title or company..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setPage(1);
      }}
      className="border rounded-lg px-4 py-2 text-sm w-64 mb-4"
    />

    {/* ================= TABLE ================= */}
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Job Title</th>
            <th className="px-4 py-3 text-left">Company</th>
            <th className="px-4 py-3 text-left">Location</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Posted Date</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {/* Loading */}
          {jobsLoading && (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                Loading jobs...
              </td>
            </tr>
          )}

          {/* Empty */}
          {!jobsLoading && jobs.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                No jobs found
              </td>
            </tr>
          )}

          {/* Jobs */}
          {!jobsLoading &&
            jobs.map((job: any) => (
              <tr key={job._id} className="hover:bg-blue-50 transition">
                <td className="px-4 py-3 font-medium">
                  {job.title}
                </td>

                <td className="px-4 py-3">
                  {job.company?.name || "—"}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {job.location}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      job.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.isActive ? "Open" : "Closed"}
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-500">
                  {job.createdAt
                    ? new Date(job.createdAt).toLocaleDateString()
                    : "—"}
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-3 text-xs">
                    <button
                      onClick={() => {
                        setEditingJob(job);
                        setJobForm({
                          title: job.title || "",
                          description: job.description || "",
                          companyId: job.company || "",
                          companyName: job.companyName || "",
                          location: job.location || "",
                          type: job.type || "remote",
                          salaryMin: job.salaryMin || "",
                          salaryMax: job.salaryMax || "",
                          openings: job.openings || "",
                          experienceLevel:
                            job.experienceLevel || "Fresher",
                          skillsRequired:
                            job.skillsRequired?.join(", ") || "",
                        });
                        setShowAddJobModal(true);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>

    {/* ================= PAGINATION ================= */}
    <div className="flex justify-between items-center mt-4 text-sm">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </>
)}

{/* job from */}
{showAddJobModal && (
  <div className="fixed inset-0 z-50  bg-black/50 flex items-center justify-center">
    <div className="bg-white text-black w-full max-w-2xl rounded-xl shadow-lg p-6 relative">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Add New Job</h3>
        <button
          onClick={() => setShowAddJobModal(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          placeholder="Job Title"
          className="input"
          value={jobForm.title}
          onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
        />

       <select
  className="input"
  value={jobForm.companyId}
  onChange={(e) => {
    const selectedId = e.target.value;
    const selectedCompany = companies.find(
      (c) => c._id === selectedId
    );

    setJobForm({
      ...jobForm,
      companyId: selectedId,
      companyName: selectedCompany?.name || "",
    });
  }}
>
  <option value="">Select Company</option>
  {companies.map((company) => (
    <option key={company._id} value={company._id}>
      {company.name}
    </option>
  ))}
</select>



        <input
          placeholder="Location"
          className="input"
          value={jobForm.location}
          onChange={(e) =>
            setJobForm({ ...jobForm, location: e.target.value })
          }
        />

        <select
  className="input"
  value={jobForm.type}
  onChange={(e) =>
    setJobForm({ ...jobForm, type: e.target.value })
  }
>
  <option value="remote">Remote</option>
  <option value="full-time">Full Time</option>   
  <option value="on-site">Onsite</option>   
  <option value="hybrid">Hybrid</option>
  <option value="part-time">Part Time</option>
  <option value="contract">Contract</option>
</select>

        <input
          placeholder="Salary Min"
          className="input"
          value={jobForm.salaryMin}
          onChange={(e) =>
            setJobForm({ ...jobForm, salaryMin: e.target.value })
          }
        />

        <input
          placeholder="Salary Max"
          className="input"
          value={jobForm.salaryMax}
          onChange={(e) =>
            setJobForm({ ...jobForm, salaryMax: e.target.value })
          }
        />

        <input
          placeholder="Openings"
          className="input"
          value={jobForm.openings}
          onChange={(e) =>
            setJobForm({ ...jobForm, openings: e.target.value })
          }
        />

        <select
          className="input"
          value={jobForm.experienceLevel}
          onChange={(e) =>
            setJobForm({ ...jobForm, experienceLevel: e.target.value })
          }
        >
          <option value="Fresher">Fresher</option>
          <option value="Junior">Junior</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
      </div>

      <textarea
        placeholder="Job Description"
        className="input mt-4 w-full h-24"
        value={jobForm.description}
        onChange={(e) =>
          setJobForm({ ...jobForm, description: e.target.value })
        }
      />

      <input
        placeholder="Skills (comma separated)"
        className="input mt-4 w-full"
        value={jobForm.skillsRequired}
        onChange={(e) =>
          setJobForm({ ...jobForm, skillsRequired: e.target.value })
        }
      />

      {/* Footer */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setShowAddJobModal(false)}
          className="px-4 py-2 rounded border"
        >
          Cancel
        </button>

        <button
  disabled={loading}
  onClick={async () => {
    try {
      // 🔎 Frontend validation
      if (
        !jobForm.title ||
        !jobForm.description ||
        !jobForm.companyId ||
        !jobForm.location ||
        !jobForm.salaryMin ||
        !jobForm.salaryMax ||
        !jobForm.openings ||
        !jobForm.skillsRequired
      ) {
        Swal.fire({
  icon: "warning",
  title: "Missing fields",
  text: "Please fill all required job details",
});

        return;
      }

      setLoading(true);

     const payload = {
  title: jobForm.title.trim(),
  description: jobForm.description.trim(),

  // 👇 BACKEND KE LIYE
  company: jobForm.companyId,        // ObjectId
  companyName: jobForm.companyName,  // String

  location: jobForm.location.trim(),
  type: jobForm.type,
  salaryMin: Number(jobForm.salaryMin),
  salaryMax: Number(jobForm.salaryMax),
  openings: Number(jobForm.openings),
  experienceLevel: jobForm.experienceLevel,
  skillsRequired: jobForm.skillsRequired
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
};


      console.log("ADD JOB PAYLOAD 👉", payload);

      if (editingJob) {
  await updateJob(editingJob._id, payload);
  Swal.fire({
  icon: "success",
  title: "Job Updated",
  text: "Job details updated successfully",
  timer: 1500,
  showConfirmButton: false,
});

} else {
  await addJob(payload);
  Swal.fire({
  icon: "success",
  title: "Job Created",
  text: "Job has been added successfully",
  timer: 1500,
  showConfirmButton: false,
});

}

      await fetchJobs();
resetJobForm();

Swal.fire({
  icon: "success",
  title: "Job Created",
  text: "Job has been added successfully",
  timer: 1500,
  showConfirmButton: false,
});

setShowAddJobModal(false);
      
    } catch (err: any) {
      console.error("Add job failed 👉", err.response?.data || err.message);
      alert(
        err.response?.data?.message || "Failed to add job"
      );
    } finally {
      setLoading(false);
    }
  }}
  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
>
  {loading ? "Saving..." : "Create Job"}
</button>

      </div>
    </div>
  </div>
)}

{screen === "Internships" && (
  <>
    {/* ================= HEADER ================= */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h2 className="text-xl font-bold">Internships</h2>
        <p className="text-sm text-gray-500">
          Manage internship opportunities and applications
        </p>
      </div>

      <button
        onClick={() => {
          setEditingInternship(null);
          resetInternshipForm();
          setShowAddInternshipModal(true);
        }}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        + Add Internship
      </button>
    </div>

    {/* ================= SEARCH ================= */}
    <input
      placeholder="Search by internship title or company..."
      value={internshipSearch}
      onChange={(e) => {
        setInternshipSearch(e.target.value);
        setInternshipPage(1);
      }}
      className="border rounded-lg px-4 py-2 text-sm w-64 mb-4"
    />

    {/* ================= TABLE ================= */}
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Internship Title</th>
            <th className="px-4 py-3 text-left">Company</th>
            <th className="px-4 py-3 text-left">Location</th>
            <th className="px-4 py-3 text-left">Duration</th>
            <th className="px-4 py-3 text-left">Stipend</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Posted Date</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {/* Loading */}
          {internshipsLoading && (
            <tr>
              <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                Loading internships...
              </td>
            </tr>
          )}

          {/* Empty */}
          {!internshipsLoading && internships.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                No internships found
              </td>
            </tr>
          )}

          {/* Internships */}
          {!internshipsLoading &&
            internships.map((internship: any) => (
              <tr
                key={internship._id}
                className="hover:bg-blue-50 transition"
              >
                <td className="px-4 py-3 font-medium">
                  {internship.title}
                </td>

                <td className="px-4 py-3">
                  {internship.company?.name || "—"}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {internship.location}
                </td>

                <td className="px-4 py-3">
                  {internship.duration || "—"}
                </td>

                <td className="px-4 py-3">
                  ₹{internship.stipendMin} – ₹{internship.stipendMax}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      internship.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {internship.isActive ? "Open" : "Closed"}
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-500">
                  {internship.createdAt
                    ? new Date(internship.createdAt).toLocaleDateString()
                    : "—"}
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-3 text-xs">
                    <button
                      onClick={() => {
                        setEditingInternship(internship);
                        setInternshipForm({
                          title: internship.title || "",
                          description: internship.description || "",
                          companyId: internship.company || "",
                          companyName: internship.companyName || "",
                          location: internship.location || "",
                          stipendMin: internship.stipendMin || "",
                          stipendMax: internship.stipendMax || "",
                          duration: internship.duration || "",
                          startDate: internship.startDate || "",
                          openings: internship.openings || "",
                          mode: internship.mode || "remote",
                          skillsRequired:
                            internship.skillsRequired?.join(", ") || "",
                        });
                        setShowAddInternshipModal(true);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteInternship(internship._id)
                      }
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>

    {/* ================= PAGINATION ================= */}
    <div className="flex justify-between items-center mt-4 text-sm">
      <button
        disabled={internshipPage === 1}
        onClick={() => setInternshipPage(internshipPage - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span>
        Page {internshipPage} of {internshipTotalPages}
      </span>

      <button
        disabled={internshipPage === internshipTotalPages}
        onClick={() => setInternshipPage(internshipPage + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </>
)}

{showAddInternshipModal && (
  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
    <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between px-6 py-5 border-b">
        <h3 className="text-2xl font-bold text-gray-800">
          {editingInternship ? "Edit Internship" : "Post New Internship"}
        </h3>
        <button
          onClick={() => setShowAddInternshipModal(false)}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500"
        >
          ✕
        </button>
      </div>

      {/* ================= BODY ================= */}
      <div className="p-6 space-y-8 max-h-[75vh] overflow-y-auto">

        {/* BASIC DETAILS */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            Basic Details
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Internship Title *
              </label>
              <input
                className="mt-1 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Software Development Intern"
                value={internshipForm.title}
                onChange={(e) =>
                  setInternshipForm({ ...internshipForm, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Company *
              </label>
              <select
                className="mt-1 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                value={internshipForm.companyId}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedCompany = companies.find(c => c._id === selectedId);
                  setInternshipForm({
                    ...internshipForm,
                    companyId: selectedId,
                    companyName: selectedCompany?.name || "",
                  });
                }}
              >
                <option value="">Select Company</option>
                {companies.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* LOCATION & MODE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-600">
              Location *
            </label>
            <input
              className="mt-1 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Mumbai"
              value={internshipForm.location}
              onChange={(e) =>
                setInternshipForm({ ...internshipForm, location: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Work Mode *
            </label>
            <select
              className="mt-1 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              value={internshipForm.mode}
              onChange={(e) =>
                setInternshipForm({ ...internshipForm, mode: e.target.value })
              }
            >
              <option value="office">Office</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* STIPEND */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">
            Stipend Details
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="number"
              className="rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Minimum Stipend (₹)"
              value={internshipForm.stipendMin}
              onChange={(e) =>
                setInternshipForm({ ...internshipForm, stipendMin: e.target.value })
              }
            />
            <input
              type="number"
              className="rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Maximum Stipend (₹)"
              value={internshipForm.stipendMax}
              onChange={(e) =>
                setInternshipForm({ ...internshipForm, stipendMax: e.target.value })
              }
            />
          </div>
        </div>

        {/* OTHER DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <input
            className="rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Duration (e.g. 6 Months)"
            value={internshipForm.duration}
            onChange={(e) =>
              setInternshipForm({ ...internshipForm, duration: e.target.value })
            }
          />
          <input
            type="date"
            className="rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            value={internshipForm.startDate}
            onChange={(e) =>
              setInternshipForm({ ...internshipForm, startDate: e.target.value })
            }
          />
          <input
            type="number"
            className="rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Openings"
            value={internshipForm.openings}
            onChange={(e) =>
              setInternshipForm({ ...internshipForm, openings: e.target.value })
            }
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Internship Description *
          </label>
          <textarea
            className="mt-1 w-full rounded-xl border px-4 py-3 h-32 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Responsibilities, expectations, learning outcomes..."
            value={internshipForm.description}
            onChange={(e) =>
              setInternshipForm({ ...internshipForm, description: e.target.value })
            }
          />
        </div>

        {/* SKILLS */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Skills Required *
          </label>
          <input
            className="mt-1 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="React, Node.js, MongoDB"
            value={internshipForm.skillsRequired}
            onChange={(e) =>
              setInternshipForm({ ...internshipForm, skillsRequired: e.target.value })
            }
          />
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50">
        <button
          onClick={() => setShowAddInternshipModal(false)}
          className="px-5 py-2 rounded-xl border hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          disabled={internshipLoading}
          onClick={handleSaveInternship}
          className="px-6 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
        >
          {internshipLoading
            ? "Saving..."
            : editingInternship
            ? "Update Internship"
            : "Create Internship"}
        </button>
      </div>
    </div>
  </div>
)}




{screen === "applications" && (
  <>
    {/* ================= HEADER ================= */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h2 className="text-xl font-bold">
          Applications
        </h2>
        <p className="text-sm text-gray-500">
          Review job applications and candidates
        </p>
      </div>
    </div>

    {/* ================= TABLE ================= */}
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Candidate Name</th>
            <th className="px-4 py-3 text-left">Job Title</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Applied Date</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {[
            {
              name: "Rohit Sharma",
              job: "MERN Stack Developer",
              email: "rohit@gmail.com",
              phone: "9876543210",
              status: "New",
            },
            {
              name: "Neha Verma",
              job: "Content Writer",
              email: "neha@gmail.com",
              phone: "9876543201",
              status: "Reviewed",
            },
            {
              name: "Aman Singh",
              job: "Admission Counselor",
              email: "aman@gmail.com",
              phone: "9876543299",
              status: "Rejected",
            },
          ].map((app, i) => (
            <tr
              key={i}
              className="hover:bg-blue-50 transition"
            >
              {/* Candidate */}
              <td className="px-4 py-3 font-medium">
                {app.name}
              </td>

              {/* Job */}
              <td className="px-4 py-3">
                {app.job}
              </td>

              {/* Email */}
              <td className="px-4 py-3 text-gray-600">
                {app.email}
              </td>

              {/* Phone */}
              <td className="px-4 py-3">
                {app.phone}
              </td>

              {/* Status */}
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs rounded
                    ${
                      app.status === "New"
                        ? "bg-yellow-100 text-yellow-700"
                        : app.status === "Reviewed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {app.status}
                </span>
              </td>

              {/* Date */}
              <td className="px-4 py-3 text-gray-500">
                26 Jan 2026
              </td>

              {/* Action */}
              <td className="px-4 py-3">
                <div className="flex gap-3 text-xs">
                  <button className="text-blue-600 hover:underline">
                    View
                  </button>
                  <button className="text-red-600 hover:underline">
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
)}

{screen === "reports" && (
  <div className="max-w-6xl mx-auto space-y-6">
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold">Reports</h2>
        <p className="text-sm text-gray-500">Generate and download system reports</p>
      </div>
    </div>

    {/* Filters */}
    <div className="bg-white p-6 rounded-xl shadow grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">Report Type</label>
        <select 
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="users">Users Report</option>
          <option value="jobs">Jobs Report</option>
          <option value="internships">Internships Report</option>
          <option value="companies">Companies Report</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">From Date</label>
        <input 
          type="date" 
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">To Date</label>
        <input 
          type="date" 
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <button 
          onClick={handleGenerateReport}
          disabled={reportLoading}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition disabled:opacity-60"
        >
          {reportLoading ? "Loading..." : "Generate"}
        </button>
        
        {reportData.length > 0 && (
          <button 
            onClick={downloadReport}
            className="flex-1 border border-green-600 text-green-600 px-4 py-2 rounded-lg text-sm hover:bg-green-50 transition"
          >
            Download Excel
          </button>
        )}
      </div>
    </div>

    {/* Preview Table */}
    {reportData.length > 0 && (
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">Preview ({reportData.length} records)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium">
              <tr>
                {Object.keys(reportData[0]).slice(0, 6).map((key) => (
                  <th key={key} className="px-6 py-3 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {reportData.slice(0, 10).map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  {Object.values(row).slice(0, 6).map((val: any, idx) => (
                    <td key={idx} className="px-6 py-3 text-gray-600 whitespace-nowrap">
                      {typeof val === 'object' ? JSON.stringify(val).substring(0, 30) + '...' : String(val).substring(0, 50)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {reportData.length > 10 && (
          <div className="px-6 py-3 bg-gray-50 text-center text-xs text-gray-500">
            Showing first 10 records. Download to view all.
          </div>
        )}
      </div>
    )}
  </div>
)}


{screen === "settings" && (
  <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-3 sm:p-4 md:p-6 md:p-8">
    {/* ================= HEADER ================= */}
    <div className="mb-6">
      <h2 className="text-xl font-bold">Settings</h2>
      <p className="text-sm text-gray-500">
        Manage application and admin preferences
      </p>
    </div>

    {/* ================= TABS ================= */}
    <div className="flex flex-wrap gap-4 border-b mb-8 text-sm">
      {[
        "General",
        "Admin Profile",
        "Password & Security",
        "Payment",
        "Notifications",
        "Roles & Permissions",
      ].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveSettingTab(tab as any)}
          className={`pb-2 px-1 border-b-2 transition
            ${
              activeSettingTab === tab
                ? "border-blue-600 text-blue-600 font-medium"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* ================= TAB CONTENT ================= */}
    <div className="space-y-8">

      {/* ===== GENERAL ===== */}
      {activeSettingTab === "General" && (
        <div>
          <h3 className="font-semibold mb-4">General Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Application Name"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <input
              placeholder="Support Email"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
        </div>
      )}

      {/* ===== ADMIN PROFILE ===== */}
      {activeSettingTab === "Admin Profile" && (
        <div>
          <h3 className="font-semibold mb-4">Admin Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Admin Name"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <input
              placeholder="Email Address"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
        </div>
      )}

      {/* ===== PASSWORD & SECURITY ===== */}
      {activeSettingTab === "Password & Security" && (
        <div>
          <h3 className="font-semibold mb-4">Change Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="password"
              placeholder="Current Password"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <input
              type="password"
              placeholder="New Password"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Update Password
          </button>
        </div>
      )}

      {/* ===== PAYMENT ===== */}
      {activeSettingTab === "Payment" && (
        <div>
          <h3 className="font-semibold mb-4">Payment Settings</h3>
          <input
            placeholder="Razorpay Key ID"
            className="border rounded-lg px-4 py-2 w-full md:w-1/2 focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>
      )}

      {/* ===== NOTIFICATIONS ===== */}
      {activeSettingTab === "Notifications" && (
        <div>
          <h3 className="font-semibold mb-4">Notification Settings</h3>
          <div className="space-y-3 text-sm">
            {[
              "Email notifications for new leads",
              "Notify on new admission request",
              "Weekly summary report",
            ].map((n) => (
              <label
                key={n}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input type="checkbox" defaultChecked className="accent-blue-600 scale-110" />
                <span>{n}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* ===== ROLES ===== */}
      {activeSettingTab === "Roles & Permissions" && (
        <div>
          <h3 className="font-semibold mb-4">Roles & Permissions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {[
              "Manage Users",
              "View Leads",
              "Edit Packages",
              "Approve Admissions",
              "Manage companies",
              "Access Reports",
            ].map((perm) => (
              <label
                key={perm}
                className="flex items-center gap-3 border rounded-lg px-3 py-2 hover:bg-gray-50 cursor-pointer"
              >
                <input type="checkbox" className="accent-blue-600" />
                <span>{perm}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* ================= SAVE ================= */}
    <div className="mt-10 flex justify-end">
      <button className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition shadow">
        Save Settings
      </button>
    </div>
  </div>
)}

{showLogoutModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
  <div
    className="
      bg-white rounded-2xl shadow-lg
      w-full max-w-md
      p-4 sm:p-6
      animate-fadeIn
    "
  >
    {/* Title */}
    <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800">
      Are you sure you want to logout?
    </h3>

    {/* Description (hide on very small screens) */}
    <p className="text-sm text-gray-500 mb-6 hidden sm:block">
      You will be redirected to the admin login page.
    </p>

    {/* Actions */}
    <div className="flex flex-col sm:flex-row justify-end gap-3">
      <button
        onClick={() => setShowLogoutModal(false)}
        className="w-full sm:w-auto px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
      >
        Cancel
      </button>

      <button
        onClick={() => {
          localStorage.removeItem("collexa_token"); 
  setShowLogoutModal(false);
  router.replace("/admin");
        }}
        className="w-full sm:w-auto px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  </div>
</div>

)}

{/* ================= VIEW CAMPUS COURSE MODAL ================= */}
{showViewCampusCourseModal && viewCampusCourse && (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative animate-fadeIn">
      <button
        onClick={() => setShowViewCampusCourseModal(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>

      <h3 className="text-xl font-bold text-blue-800 mb-1">{viewCampusCourse.title}</h3>
      <p className="text-sm text-gray-500 mb-4">{viewCampusCourse.university}</p>

      <div className="space-y-3 text-sm text-gray-700">
        <p><strong>Type:</strong> {viewCampusCourse.type}</p>
        <p><strong>Category:</strong> {viewCampusCourse.category}</p>
        <p><strong>Level:</strong> {viewCampusCourse.level}</p>
        <p><strong>Duration:</strong> {viewCampusCourse.duration}</p>
        <p><strong>Rating:</strong> {viewCampusCourse.rating} ★</p>
        <p><strong>Enrolled:</strong> {viewCampusCourse.enrolled}</p>
        <div className="bg-gray-50 p-3 rounded-lg border mt-2">
          <strong>Description:</strong>
          <p className="mt-1 text-gray-600">{viewCampusCourse.desc}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={() => setShowViewCampusCourseModal(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Close</button>
      </div>
    </div>
  </div>
)}


          
        </div>

        {/* ================= MOBILE SIDEBAR ================= */}
{mobileMenuOpen && (
  <div className="fixed inset-0 z-50 md:hidden">
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/50"
      onClick={() => setMobileMenuOpen(false)}
    />

    {/* Sidebar */}
    <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl p-4 animate-slideIn">
      {/* Logo */}
      <div className="mb-6 flex justify-center">
        <img src="./logo.png" className="h-12 w-auto" alt="Logo" />
      </div>

      {/* Menu */}
      <div className="space-y-1">
        {[
          { label: "Dashboard", key: "dashboard", icon: LayoutDashboard },
          { label: "Users", key: "users", icon: Users },
          { label: "Leads", key: "leads", icon: PhoneCall },
          { label: "Packages", key: "packages", icon: Package },
          { label: "Admissions", key: "admissions", icon: GraduationCap },
          { label: "Courses", key: "courses", icon: BookOpen },
          { label: "companies", key: "companies", icon: FileText },
          { label: "Reports", key: "reports", icon: FileBarChart },
          { label: "Settings", key: "settings", icon: Settings },
        ].map(({ label, key, icon: Icon }) => (
          <div
            key={key}
            onClick={() => {
              setScreen(key as Screen);
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
              ${
                screen === key
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </aside>
  </div>
)}

      </main>
    </div>
  );
}
