"use client";
import JoditEditor from "jodit-react";
import { useState, useEffect, useRef } from "react";

import Swal from "sweetalert2";

import { useRouter } from "next/navigation";
import { Bell,  UserCircle } from "lucide-react";
import { useAuth } from "../context_api/AuthContext";
import { API } from "../lib/axios";

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
  // | "packages"
  | "create-package"
  | "admissions"
  | "admission-detail"
  | "certification-admissions"
  | "certification-admission-detail"
  | "courses"
  | "certification-courses"
  | "add-certification-course"
  | "add-course"
  | "create-blog"
  | "blog-categories"
  | "companies"
  | "create-company" 
  | "testimonials"
  | "Jobs"
  | "Internships"
  | "internship-applications"
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

  // admissions / leads
  const [admissionLeads, setAdmissionLeads] = useState<any[]>([]);
  const [admissionLeadsLoading, setAdmissionLeadsLoading] = useState(false);
  const [selectedAdmissionLead, setSelectedAdmissionLead] = useState<any>(null);

  // certification leads
  const [certificationLeads, setCertificationLeads] = useState<any[]>([]);
  const [certificationLeadsLoading, setCertificationLeadsLoading] = useState(false);
  const [selectedCertificationLead, setSelectedCertificationLead] = useState<any>(null);

  // contact leads
  const [contactLeads, setContactLeads] = useState<any[]>([]);
  const [contactLeadsLoading, setContactLeadsLoading] = useState(false);
  const [selectedContactLead, setSelectedContactLead] = useState<any>(null);

  const { addJob, addCompany, updateCompany , updateJob , deleteJob, getJobApplications } = useAuth();


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
  courseName: "",
  universityName: "",
  degreeType: "",
  description: "",
  rating: "",
  duration: "",
  enrolledCount: "",
  level: "",
  category: "Engineering",
  isTop: false,
  location: "",
});

// certification courses
const [certificationCourses, setCertificationCourses] = useState<any[]>([]);
const [certificationCoursesLoading, setCertificationCoursesLoading] = useState(false);
const [editingCertificationCourse, setEditingCertificationCourse] = useState<any>(null);
const [viewCertificationCourse, setViewCertificationCourse] = useState<any>(null);
const [showViewCertificationCourseModal, setShowViewCertificationCourseModal] = useState(false);
const [certificationCourseForm, setCertificationCourseForm] = useState({
  title: "",
  courseName: "",
  providerName: "",
  instructor: "",
  level: "Beginner",
  badge: "",
  rating: "",
  studentsEnrolled: "",
  duration: "",
  category: "",
  currentPrice: "",
  originalPrice: "",
  image: "",
  enrollLink: "",
});

const [dashboardStats, setDashboardStats] = useState({
  totalUsers: 0,
  totalLeads: 0,
  totalJobApplications: 0,
  totalInternshipApplications: 0,
  totalCampusLeads: 0,
  totalCertificationLeads: 0,
});



// dashboard 
const [userGrowthData, setUserGrowthData] = useState([
  { name: "Jan", users: 0 },
]);

const [leadsData, setLeadsData] = useState([
  { name: "Contact", value: 0 },
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

// applications
const [applications, setApplications] = useState<any[]>([]);
const [applicationsLoading, setApplicationsLoading] = useState(false);
const [selectedJobIdForApp, setSelectedJobIdForApp] = useState<string>("");

// internship applications
const [internshipApplications, setInternshipApplications] = useState<any[]>([]);
const [internshipApplicationsLoading, setInternshipApplicationsLoading] = useState(false);
const [selectedInternshipIdForApp, setSelectedInternshipIdForApp] = useState<string>("");


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
  category: "",
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
  category: "",
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
    category: "",
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

    

    const data =
      res.data?.users ||
      res.data?.data?.users ||
      res.data?.data ||
      [];

    

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

const fetchCertificationLeads = async () => {
  try {
    setCertificationLeadsLoading(true);
    const token = localStorage.getItem("collexa_token");
    const res = await API.get("/api/certificatecourses/leads", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data?.leads || res.data?.data || [];
    setCertificationLeads(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Fetch certification leads failed", err);
    setCertificationLeads([]);
  } finally {
    setCertificationLeadsLoading(false);
  }
};

const handleDeleteCertificationLead = async (id: string) => {
  const result = await Swal.fire({
    title: "Delete Lead?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Delete",
  });

  if (!result.isConfirmed) return;

  try {
    const token = localStorage.getItem("collexa_token");
    await API.delete(`/api/certificatecourses/leads/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    Swal.fire("Deleted!", "Lead has been deleted.", "success");
    fetchCertificationLeads();
  } catch (err: any) {
    Swal.fire("Error", err.response?.data?.message || "Delete failed", "error");
  }
};

const fetchContactLeads = async () => {
  try {
    setContactLeadsLoading(true);
    const token = localStorage.getItem("collexa_token");
    const res = await API.get("/api/contactus", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data?.contacts || res.data?.leads || res.data?.data || res.data?.contactUs || [];
    
    setContactLeads(data);
  } catch (err) {
    console.error("Fetch contact leads failed", err);
    setContactLeads([]);
  } finally {
    setContactLeadsLoading(false);
  }
};


const handleDeleteContactLead = async (id: string) => {
  const result = await Swal.fire({
    title: "Delete Lead?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Delete",
  });

  if (!result.isConfirmed) return;

  try {
    const token = localStorage.getItem("collexa_token");
    await API.delete(`/api/contactus/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    Swal.fire("Deleted!", "Lead has been deleted.", "success");
    fetchContactLeads();
  } catch (err: any) {
    Swal.fire("Error", err.response?.data?.message || "Delete failed", "error");
  }
};

const fetchAdmissionLeads = async () => {
  try {
    setAdmissionLeadsLoading(true);
    const token = localStorage.getItem("collexa_token");
    const res = await API.get("/api/campuscourses/leads", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAdmissionLeads(res.data?.leads || []);
  } catch (err) {
    console.error("Fetch admission leads failed", err);
    setAdmissionLeads([]);
  } finally {
    setAdmissionLeadsLoading(false);
  }
};

const handleDeleteAdmissionLead = async (id: string) => {
  const result = await Swal.fire({
    title: "Delete Lead?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Delete",
  });

  if (!result.isConfirmed) return;

  try {
    const token = localStorage.getItem("collexa_token");
    await API.delete(`/api/campuscourses/leads/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    Swal.fire("Deleted!", "Lead has been deleted.", "success");
    fetchAdmissionLeads();
  } catch (err: any) {
    Swal.fire("Error", err.response?.data?.message || "Delete failed", "error");
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
    const data =
      res.data?.campusCourses ||
      res.data?.courses ||
      res.data?.data ||
      [];
    setCampusCourses(Array.isArray(data) ? data : []);
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
  if (!campusCourseForm.courseName || !campusCourseForm.universityName) {
    Swal.fire("Error", "Course Name and University Name are required", "warning");
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

const fetchCertificationCourses = async () => {
  try {
    setCertificationCoursesLoading(true);
    // The GET endpoint for all courses is /api/certificatecourses/listAll
    const res = await API.get("/api/certificatecourses/listAll");
    const data =
      res.data?.courses ||
      res.data?.certificateCourses ||
      res.data?.data ||
      res.data ||
      [];
      console.log("Certification Courses", data)
    setCertificationCourses(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("Fetch certification courses failed", err);
    setCertificationCourses([]);
  } finally {
    setCertificationCoursesLoading(false);
  }
};

const handleDeleteCertificationCourse = async (id: string) => {
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
    await API.delete(`/api/certificatecourses/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    Swal.fire("Deleted!", "Course has been deleted.", "success");
    fetchCertificationCourses();
  } catch (err: any) {
    Swal.fire("Error", err.response?.data?.message || "Delete failed", "error");
  }
};

const handleSaveCertificationCourse = async () => {
  if (!certificationCourseForm.title || !certificationCourseForm.instructor) {
    Swal.fire("Error", "Course Name and Instructor are required", "warning");
    return;
  }

  try {
    const token = localStorage.getItem("collexa_token");
    const payload = {
        ...certificationCourseForm,
        rating: Number(certificationCourseForm.rating) || 0,
        studentsEnrolled: Number(certificationCourseForm.studentsEnrolled) || 0,
        currentPrice: Number(certificationCourseForm.currentPrice) || 0,
        originalPrice: Number(certificationCourseForm.originalPrice) || 0,
    };

    if (editingCertificationCourse) {
      await API.patch(`/api/certificatecourses/update/${editingCertificationCourse._id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Success", "Course updated successfully", "success");
    } else {
      await API.post(`/api/certificatecourses/add`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Success", "Course created successfully", "success");
    }
    setScreen("certification-courses");
    fetchCertificationCourses();
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
    const headers = { Authorization: `Bearer ${token}` };

    const [
      usersRes,
      leadsRes,
      jobAppsRes,
      internAppsRes,
      campusLeadsRes,
      certLeadsRes
    ] = await Promise.all([
      API.get("/api/admin/users", { headers }).catch(() => ({ data: {} })),
      API.get("/api/contactus", { headers }).catch(() => ({ data: {} })),
      API.get("/api/applications", { headers }).catch(() => ({ data: {} })),
      API.get("/api/internship-applications", { headers }).catch(() => ({ data: {} })),
      API.get("/api/campuscourses/leads", { headers }).catch(() => ({ data: {} })),
      API.get("/api/certificatecourses/leads", { headers }).catch(() => ({ data: {} }))
    ]);

    const usersData = usersRes.data?.users || usersRes.data?.data?.users || [];
    const leadsData = leadsRes.data?.contacts || leadsRes.data?.leads || leadsRes.data?.data || leadsRes.data?.contactUs || [];
    const jobAppsData = jobAppsRes.data?.applications || jobAppsRes.data?.data || [];
    const internAppsData = internAppsRes.data?.applications || internAppsRes.data?.data || [];
    const campusLeadsData = campusLeadsRes.data?.leads || campusLeadsRes.data?.data || [];
    const certLeadsData = certLeadsRes.data?.leads || certLeadsRes.data?.data || [];

    setDashboardStats({
      totalUsers: usersData.length,
      totalLeads: leadsData.length,
      totalJobApplications: jobAppsData.length,
      totalInternshipApplications: internAppsData.length,
      totalCampusLeads: campusLeadsData.length,
      totalCertificationLeads: certLeadsData.length,
    });

    setUsers(usersData);
    setAdmissionLeads(campusLeadsData);

    // Process User Growth (Monthly)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentYear = new Date().getFullYear();
    const userCounts = new Array(12).fill(0);
    usersData.forEach((u: any) => {
      const d = new Date(u.createdAt);
      if (d.getFullYear() === currentYear) {
        userCounts[d.getMonth()]++;
      }
    });
    setUserGrowthData(months.map((m, i) => ({ name: m, users: userCounts[i] })));

    // Process Applications Data (Bar Chart)
    setLeadsData([
      { name: "Contact", value: leadsData.length },
      { name: "Job Apps", value: jobAppsData.length },
      { name: "Intern Apps", value: internAppsData.length },
      { name: "Campus", value: campusLeadsData.length },
      { name: "Cert", value: certLeadsData.length },
    ]);

  } catch (err) {
    console.error("Dashboard data fetch failed", err);
  }
};

const handleUpdateApplicationStatus = async (appId: string, newStatus: string) => {
  try {
    const token = localStorage.getItem("collexa_token");
    await API.patch(`/api/applications/status/${appId}`, { status: newStatus }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    setApplications((prev) => 
      prev.map((app) => app._id === appId ? { ...app, status: newStatus } : app)
    );
    
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    
    Toast.fire({
      icon: 'success',
      title: `Status updated to ${newStatus}`
    });

  } catch (err: any) {
    console.error("Update status failed", err);
    Swal.fire("Error", err.response?.data?.message || "Failed to update status", "error");
  }
};

const fetchInternshipApplications = async (internshipId: string) => {
  if (!internshipId) return;
  try {
    setInternshipApplicationsLoading(true);
    const token = localStorage.getItem("collexa_token");
    const res = await API.get(`/api/internship-applications/all-applications/${internshipId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setInternshipApplications(res.data.applications || []);
    console.log("Internship Applications API RESPONSE 👉", res.data);
  } catch (err: any) {
    console.error("Fetch internship applications failed", err);
    Swal.fire("Error", err.response?.data?.message || "Failed to fetch internship applications", "error");
    setInternshipApplications([]);
  } finally {
    setInternshipApplicationsLoading(false);
  }
};

const handleUpdateInternshipApplicationStatus = async (appId: string, newStatus: string) => {
  try {
    const token = localStorage.getItem("collexa_token");
    await API.patch(`/api/internship-applications/status/${appId}`, { status: newStatus }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    setInternshipApplications((prev) => 
      prev.map((app) => app._id === appId ? { ...app, status: newStatus } : app)
    );
    
    const Toast = Swal.mixin({
      toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true,
    });
    
    Toast.fire({ icon: 'success', title: `Status updated to ${newStatus}` });
  } catch (err: any) {
    console.error("Update internship application status failed", err);
    Swal.fire("Error", err.response?.data?.message || "Failed to update status", "error");
  }
};

const fetchApplications = async (jobId: string) => {
  if (!jobId) return;
  try {
    setApplicationsLoading(true);
    const data = await getJobApplications(jobId);
    setApplications(data.applications || []);
  } catch (err: any) {
    console.error("Fetch applications failed", err);
    Swal.fire("Error", err.response?.data?.message || "Failed to fetch applications", "error");
    setApplications([]);
  } finally {
    setApplicationsLoading(false);
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
  if (screen === "add-certification-course" && editingCertificationCourse) {
    setCertificationCourseForm({
      title: editingCertificationCourse.title || "",
      courseName: editingCertificationCourse.courseName || "",
      providerName: editingCertificationCourse.providerName || "",
      instructor: editingCertificationCourse.instructor || "",
      level: editingCertificationCourse.level || "Beginner",
      badge: editingCertificationCourse.badge || "",
      rating: String(editingCertificationCourse.rating || ""),
      studentsEnrolled: String(editingCertificationCourse.studentsEnrolled || ""),
      duration: editingCertificationCourse.duration || "",
      category: editingCertificationCourse.category || "",
      currentPrice: String(editingCertificationCourse.currentPrice || ""),
      originalPrice: String(editingCertificationCourse.originalPrice || ""),
      image: editingCertificationCourse.image || "",
      enrollLink: editingCertificationCourse.enrollLink || "",
    });
  }
}, [screen, editingCertificationCourse]);


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
  if (screen === "admissions") {
    fetchAdmissionLeads();
  }
}, [screen]);

useEffect(() => {
  if (screen === "leads") {
    fetchContactLeads();
  }
}, [screen]);

useEffect(() => {
  if (screen === "certification-admissions") {
    fetchCertificationLeads();
  }
}, [screen]);

useEffect(() => {
  if (screen === "courses") {
    fetchCampusCourses();
  }
}, [screen]);

useEffect(() => {
  if (screen === "certification-courses") {
    fetchCertificationCourses();
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

useEffect(() => {
  if (screen === "applications") {
    if (selectedJobIdForApp) {
      fetchApplications(selectedJobIdForApp);
    } else if (jobs.length === 0) {
      fetchJobs(); // Fetch jobs to populate dropdown if no job selected
    }
  }
}, [screen, selectedJobIdForApp]);

useEffect(() => {
  if (screen === "internship-applications") {
    if (internships.length === 0) {
      fetchInternships();
    }
    if (selectedInternshipIdForApp) {
      fetchInternshipApplications(selectedInternshipIdForApp);
    }
  }
}, [screen, selectedInternshipIdForApp]);


const resetJobForm = () => {
  setJobForm({
    title: "",
    description: "",
    companyId: "",
    companyName: "",
    category: "",
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
    universityName: "",
    courseName: "",
    degreeType: "",
    description: "",
    rating: "",
    duration: "",
    enrolledCount: "",
    level: "",
    category: "Engineering",
    isTop: false,
    location: "",
  });
  setEditingCampusCourse(null);
};

const resetCertificationCourseForm = () => {
  setCertificationCourseForm({
    title: "",
    courseName: "",
    providerName: "",
    instructor: "",
    level: "Beginner",
    badge: "",
    rating: "",
    studentsEnrolled: "",
    duration: "",
    category: "",
    currentPrice: "",
    originalPrice: "",
    image: "",
    enrollLink: "",
  });
  setEditingCertificationCourse(null);
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

    fetchBlogs(); // Re-fetch blogs to ensure UI is in sync with the database
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
      !internshipForm.category ||
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
      
      category: internshipForm.category,
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

    fetchCompanies(); // Re-fetch companies to ensure UI is in sync with the database

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

const handleSaveJob = async () => {
  try {
    // 🔎 Frontend validation
    if (
      !jobForm.title ||
      !jobForm.description ||
      !jobForm.companyId ||
      !jobForm.category ||
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
      company: jobForm.companyId,
          category: jobForm.category?.trim(),
      companyName: jobForm.companyName,
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

    if (editingJob) {
      await updateJob(editingJob._id, payload);
      await Swal.fire("Job Updated", "Job details updated successfully.", "success");
    } else {
      await addJob(payload);
      await Swal.fire("Job Created", "Job has been added successfully.", "success");
    }

    await fetchJobs();
    resetJobForm();
    setShowAddJobModal(false);
  } catch (err: any) {
    console.error("Add/Update job failed 👉", err.response?.data || err.message);
    Swal.fire("Operation Failed", err.response?.data?.message || "Failed to save job", "error");
  } finally {
    setLoading(false);
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
      case "campus-courses":
        endpoint = "/api/campuscourses";
        break;
      case "campus-leads":
        endpoint = "/api/campuscourses/leads";
        break;
      case "certification-courses":
        endpoint = "/api/certificatecourses/listAll";
        break;
      case "certification-leads":
        endpoint = "/api/certificatecourses/leads";
        break;
      case "job-applications":
        endpoint = "/api/applications";
        break;
      case "internship-applications":
        endpoint = "/api/internship-applications";
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
    else if (reportType === "campus-courses") data = res.data?.campusCourses || res.data?.courses || res.data?.data || [];
    else if (reportType === "campus-leads") data = res.data?.leads || res.data?.data || [];
    else if (reportType === "certification-courses") data = res.data?.courses || res.data?.certificateCourses || res.data?.data || [];
    else if (reportType === "certification-leads") data = res.data?.leads || res.data?.data || [];
    else if (reportType === "job-applications") data = res.data?.applications || res.data?.data || [];
    else if (reportType === "internship-applications") data = res.data?.applications || res.data?.data || [];

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
      { label: "Job Applications", key: "applications", icon: FileText },
      { label: "Internships", key: "Internships", icon: Briefcase },
      { label: "Internship Applications", key: "internship-applications", icon: FileText },
      { label: "Create Blog", key: "create-blog", icon: FileText },
      { label: "Blog Categories", key: "blog-categories", icon: FolderOpen },
      // { label: "Packages", key: "packages", icon: Package },
      { label: "Campus Courses", key: "courses", icon: BookOpen },   
      { label: " Campus Admission", key: "admissions", icon: GraduationCap },      
      
      { label: "Certification Courses", key: "certification-courses", icon: BookOpen },
      { label: "Certification Admission", key: "certification-admissions", icon: GraduationCap },
      
     
      
      
      { label: "Reports", key: "reports", icon: FileBarChart },
      { label: "Settings", key: "settings", icon: Settings },
    ].map(({ label, key, icon: Icon }) => (
      <div
        key={key}
        onClick={() => setScreen(key as Screen)}
        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
          ${
            screen === key
              ? " bg-[#143481] text-white font-medium"
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
      <h2 className="text-xl font-bold text-[#143481]">Dashboard Overview</h2>
    </div>

    {/* ================= STATS CARDS ================= */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {[
        { title: "Total Users", value: dashboardStats.totalUsers, link: "users" },
        { title: "Total Leads", value: dashboardStats.totalLeads, link: "leads" },
        { title: "Job Applications", value: dashboardStats.totalJobApplications, link: "applications" },
        { title: "Internship Applications", value: dashboardStats.totalInternshipApplications, link: "internship-applications" },
        { title: "Campus Course Leads", value: dashboardStats.totalCampusLeads, link: "admissions" },
        { title: "Certification Leads", value: dashboardStats.totalCertificationLeads, link: "certification-admissions" },
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
          Applications Overview
        </h3>
        <div className="h-64">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={leadsData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#2563eb" />
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
          {users.slice(0, 5).map((u: any) => (
            <p key={u._id}>• {u.firstName} {u.lastName} ({u.role})</p>
          ))}
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
      <h2 className="text-xl font-bold text-[#143481]">Users</h2>

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
      <h2 className="text-xl font-bold text-[#143481]">Leads</h2>
      
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
            <th className="px-4 py-3 text-left">Lead Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Subject</th>
            <th className="px-4 py-3 text-left">Message</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {contactLeadsLoading ? (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                Loading leads...
              </td>
            </tr>
          ) : contactLeads.length === 0 ? (
            
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                No leads found
              </td>
            </tr>
          ) : (
            contactLeads.map((lead: any) => (
            <tr
              key={lead._id}
              className="hover:bg-blue-50 transition"
            >
              <td className="px-4 py-3 font-medium">
                {lead.fullName}
              </td>

              <td className="px-4 py-3 text-gray-600">
                {lead.email}
              </td>

              <td className="px-4 py-3">
                {lead.phoneNumber}
              </td>

              <td className="px-4 py-3">
                {lead.subject}
              </td>

              <td className="px-4 py-3">
                <div className="truncate max-w-xs" title={lead.message}>
                  {lead.message}
                </div>
              </td>

              <td className="px-4 py-3">
                <div className="flex gap-3 text-xs">
                <button
                  onClick={() => {
                    setSelectedContactLead(lead);
                    setScreen("lead-detail");
                  }}
                  className="text-blue-600 text-xs hover:underline"
                >
                  View
                </button>
                <button
                  onClick={() => handleDeleteContactLead(lead._id)}
                  className="text-red-600 text-xs hover:underline"
                >
                  Delete
                </button>
                </div>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
    </div>
    
    <div className="flex justify-between items-center mt-6 text-sm">
      <p className="text-gray-500">
        Total Leads: {contactLeads.length}
      </p>
    </div>
  </>
)}


{screen === "lead-detail" && (
  selectedContactLead ? (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* ================= LEFT ================= */}
    <div className="bg-white rounded-xl shadow p-3 sm:p-4 md:p-6">
      <h3 className="font-semibold mb-4 text-[#143481]">
        Lead Information
      </h3>

      <div className="text-sm text-gray-600 space-y-2">
        <p><b>Name:</b> {selectedContactLead.fullName}</p>
        <p><b>Email:</b> {selectedContactLead.email}</p>
        <p><b>Phone:</b> {selectedContactLead.phoneNumber}</p>
        <p><b>Date:</b> {selectedContactLead.createdAt ? new Date(selectedContactLead.createdAt).toLocaleString() : "—"}</p>
      </div>

      {/* Actions */}
      <div className="mt-6 space-y-2">
        <button 
          onClick={() => setScreen("leads")}
          className="w-full border rounded-lg py-2 text-sm hover:bg-gray-50"
        >
          Back to Leads
        </button>
      </div>
    </div>

    {/* ================= RIGHT ================= */}
    <div className="lg:col-span-2 space-y-6">
      {/* Subject & Message */}
      <div className="bg-white rounded-xl shadow p-3 sm:p-4 md:p-6">
        <h3 className="font-semibold mb-3">
          Inquiry Details
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold">Subject</p>
            <p className="text-gray-800">{selectedContactLead.subject}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold">Message</p>
            <p className="text-gray-800 whitespace-pre-wrap">{selectedContactLead.message}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  ) : (
    <div className="text-center py-10 text-gray-500">
      No lead selected. <button onClick={() => setScreen("leads")} className="text-blue-600 hover:underline">Go back</button>
    </div>
  )
)}


          {/* ================= PACKAGES (IMAGE MATCH) ================= */}
          {/* {screen === "packages" && (
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
          )} */}

          {/* ================= CREATE / EDIT PACKAGE ================= */}
{/* ================= CREATE / EDIT PACKAGE ================= */}
{screen === "create-package" && (
  <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-3 sm:p-4  md:p-8">
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
      <h2 className="text-xl font-bold text-[#143481]">
       Campus Courses Admission Requests
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
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Course</th>
            <th className="px-4 py-3 text-left">State</th>
            <th className="px-4 py-3 text-left">Request Date</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {admissionLeadsLoading ? (
            <tr>
              <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                Loading requests...
              </td>
            </tr>
          ) : admissionLeads.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                No admission requests found
              </td>
            </tr>
          ) : (
            admissionLeads.map((lead: any) => (
            <tr
              key={lead._id}
              className="hover:bg-blue-50 transition"
            >
              <td className="px-4 py-3 font-medium">
                {lead.name}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {lead.email}
              </td>
              <td className="px-4 py-3">
                {lead.phone}
              </td>
              <td className="px-4 py-3">
                {lead.course}
              </td>
              <td className="px-4 py-3">
                {lead.state}
              </td>
              <td className="px-4 py-3 text-gray-500">
                {new Date(lead.createdAt).toLocaleDateString()}
              </td>

              {/* Action */}
              <td className="px-4 py-3">
                <div className="flex gap-3 text-xs">
                <button
                  onClick={() => {
                    setSelectedAdmissionLead(lead);
                    setScreen("admission-detail");
                  }}
                  className="text-blue-600 text-xs hover:underline"
                >
                  View
                </button>
                <button
                  onClick={() => handleDeleteAdmissionLead(lead._id)}
                  className="text-red-600 text-xs hover:underline"
                >
                  Delete
                </button>
                </div>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
    </div>

    {/* ================= PAGINATION ================= */}
    <div className="flex justify-between items-center mt-6 text-sm">
      <p className="text-gray-500">
        Total Requests: {admissionLeads.length}
      </p>
    </div>
  </>
)}



{screen === "admission-detail" && (() => {
  const lead = selectedAdmissionLead;
  if (!lead) return <div className="p-6">No lead selected</div>;
  

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#143481]">
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
              {lead.name?.[0] || "S"}
            </div>
            <div>
              <h3 className="font-semibold">{lead.name}</h3>
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
            <p><b>Email:</b> {lead.email}</p>
            <p><b>Phone:</b> {lead.phone}</p>
            <p><b>State:</b> {lead.state}</p>
            <p><b>Source:</b> {lead.source}</p>
          </div>
        </div>

        {/* ================= COURSE ================= */}
        <div className="bg-white rounded-xl shadow p-3 sm:p-4 md:p-6">
          <h3 className="font-semibold mb-3">Course Details</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p><b>Course:</b> {lead.course}</p>
            <p><b>Terms Accepted:</b> {lead.termsAccepted ? "Yes" : "No"}</p>
            <p><b>Date:</b> {new Date(lead.createdAt).toLocaleDateString()}</p>
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

{screen === "certification-admissions" && (
  <>
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <h2 className="text-xl font-bold text-[#143481]">
       Certification Admission Requests
      </h2>
      <input
        placeholder="Search by student or course..."
        className="border rounded-lg px-4 py-2 text-sm max-w-xs focus:ring-2 focus:ring-blue-600 outline-none transition"
      />
    </div>
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Course</th>
            <th className="px-4 py-3 text-left">City/State</th>
            <th className="px-4 py-3 text-left">Request Date</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {certificationLeadsLoading ? (
            <tr><td colSpan={7} className="px-4 py-6 text-center text-gray-500">Loading requests...</td></tr>
          ) : certificationLeads.length === 0 ? (
            <tr><td colSpan={7} className="px-4 py-6 text-center text-gray-500">No admission requests found</td></tr>
          ) : (
            certificationLeads.map((lead: any) => (
            <tr key={lead._id} className="hover:bg-blue-50 transition">
              <td className="px-4 py-3 font-medium">{lead.fullName}</td>
              <td className="px-4 py-3 text-gray-600">{lead.email}</td>
              <td className="px-4 py-3">{lead.phoneNumber}</td>
              <td className="px-4 py-3">{lead.courseName}</td>
              <td className="px-4 py-3">{lead.cityState}</td>
              <td className="px-4 py-3 text-gray-500">{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "—"}</td>
              <td className="px-4 py-3">
                <div className="flex gap-3 text-xs">
                
                <button
                  onClick={() => handleDeleteCertificationLead(lead._id)}
                  className="text-red-600 text-xs hover:underline"
                >
                  Delete
                </button>
                </div>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  </>
)}

{screen === "certification-admission-detail" && (() => {
  const lead = selectedCertificationLead;
  if (!lead) return <div className="p-6">No lead selected</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#143481]">Certification Admission Request Details</h2>
          <p className="text-sm text-gray-500">Review student profile and application</p>
        </div>
        <div className="flex gap-3 flex-wrap">
           <button onClick={() => setScreen("certification-admissions")} className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition">Back</button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-3 sm:p-4 md:p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-700">{lead.fullName?.[0] || "S"}</div>
            <div><h3 className="font-semibold">{lead.fullName}</h3><p className="text-sm text-gray-500">Student</p></div>
          </div>
          <div className="text-sm text-gray-600 space-y-2"><p><b>Email:</b> {lead.email}</p><p><b>Phone:</b> {lead.phoneNumber}</p><p><b>City/State:</b> {lead.cityState}</p></div>
        </div>
        <div className="bg-white rounded-xl shadow p-3 sm:p-4 md:p-6">
          <h3 className="font-semibold mb-3">Course Details</h3>
          <div className="text-sm text-gray-600 space-y-2"><p><b>Course Name:</b> {lead.courseName}</p><p><b>Course ID:</b> {lead.courseId}</p><p><b>Request Date:</b> {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "—"}</p></div>
        </div>
      </div>
    </div>
  );
})()}


{screen === "courses" && (
  <>
    {/* ================= HEADER ================= */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <h2 className="text-xl font-bold text-[#143481]">Courses Courses</h2>

      <button
        onClick={() => {
          resetCampusCourseForm();
          setScreen("add-course");
        }}
        className="px-4 py-2 rounded-lg bg-[#143481] text-white "
      >
        + Add Course
      </button>
    </div>

    {/* ================= TABLE ================= */}
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">University</th>
            <th className="px-4 py-3 text-left">Course</th>
            <th className="px-4 py-3 text-left">Degree</th>
            <th className="px-4 py-3 text-left">Duration</th>
            <th className="px-4 py-3 text-left">Level</th>
            <th className="px-4 py-3 text-left">Rating</th>
            <th className="px-4 py-3 text-left">Enrolled</th>
            <th className="px-4 py-3 text-left">Location</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {campusCoursesLoading && (
            <tr>
              <td colSpan={9} className="px-4 py-6 text-center text-gray-500">
                Loading courses...
              </td>
            </tr>
          )}

          {!campusCoursesLoading && campusCourses.length === 0 && (
            <tr>
              <td colSpan={9} className="px-4 py-6 text-center text-gray-500">
                No courses found
              </td>
            </tr>
          )}

          {!campusCoursesLoading &&
            campusCourses.map((course: any) => (
              <tr
                key={course._id}
                className="hover:bg-blue-50 transition"
              >
                <td className="px-4 py-3">{course.universityName}</td>
                <td className="px-4 py-3 font-medium">
                  {course.courseName}
                  {course.isTop && (
                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                      TOP
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">{course.degreeType}</td>
                <td className="px-4 py-3">{course.duration}</td>
                <td className="px-4 py-3">{course.level}</td>
                <td className="px-4 py-3">⭐ {course.rating}</td>
                <td className="px-4 py-3">{course.enrolledCount}</td>
                <td className="px-4 py-3">{course.location}</td>

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
                          universityName: course.universityName || "",
                          courseName: course.courseName || "",
                          degreeType: course.degreeType || "",
                          description: course.description || "",
                          rating: course.rating || "",
                          duration: course.duration || "",
                          enrolledCount: course.enrolledCount || "",
                          level: course.level || "",
                          location: course.location || "",
                          isTop: course.isTop || false,
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

{screen === "certification-courses" && (
  <>
    {/* ================= HEADER ================= */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <h2 className="text-xl font-bold text-[#143481]">Certification Courses</h2>

      <button
        onClick={() => {
          resetCertificationCourseForm();
          setEditingCertificationCourse(null);
          setScreen("add-certification-course");
        }}
        className="px-4 py-2 rounded-lg bg-[#143481] text-white "
      >
        + Add Certification Course
      </button>
    </div>

    {/* ================= TABLE ================= */}
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Instructor</th>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Duration</th>
            <th className="px-4 py-3 text-left">Level</th>
            <th className="px-4 py-3 text-left">Rating</th>
            <th className="px-4 py-3 text-left">Students</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {certificationCoursesLoading && (
            <tr>
              <td colSpan={9} className="px-4 py-6 text-center text-gray-500">
                Loading certification courses...
              </td>
            </tr>
          )}

          {!certificationCoursesLoading && certificationCourses.length === 0 && (
            <tr>
              <td colSpan={9} className="px-4 py-6 text-center text-gray-500">
                No certification courses found
              </td>
            </tr>
          )}

          {!certificationCoursesLoading &&
            certificationCourses.map((course: any) => (
              <tr key={course._id} className="hover:bg-blue-50 transition">
                <td className="px-4 py-3">{course.instructor}</td>

                <td className="px-4 py-3 font-medium">
                  {course.title}
                  {course.badge && (
                    <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                      {course.badge}
                    </span>
                  )}
                </td>

                <td className="px-4 py-3">{course.category}</td>
                <td className="px-4 py-3">{course.duration}</td>
                <td className="px-4 py-3">{course.level}</td>
                <td className="px-4 py-3">⭐ {course.rating}</td>
                <td className="px-4 py-3">{course.studentsEnrolled}</td>

                <td className="px-4 py-3">
                  ₹{course.currentPrice}
                  {course.originalPrice > course.currentPrice && (
                    <span className="ml-2 text-xs line-through text-gray-400">
                      ₹{course.originalPrice}
                    </span>
                  )}
                </td>

                {/* ================= ACTION ================= */}
                <td className="px-4 py-3">
                  <div className="flex gap-3 text-xs">
                    <button
                      onClick={() => {
                        setViewCertificationCourse(course);
                        setShowViewCertificationCourseModal(true);
                      }}
                      className="text-green-600 hover:underline"
                    >
                      View
                    </button>

                    <button
                      onClick={() => {
                        setEditingCertificationCourse(course);
                        setScreen("add-certification-course");
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteCertificationCourse(course._id)}
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

{screen === "add-certification-course" && (
  <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-3 sm:p-4 md:p-6 md:p-8">
    <div className="mb-6">
      <h2 className="text-xl font-bold text-[#143481]">
        {editingCertificationCourse ? "Edit Certification Course" : "Add Certification Course"}
      </h2>
      <p className="text-sm text-gray-500">
        Manage certification course details
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="text-sm font-medium">Title <span className="text-red-500">*</span></label>
        <input
          value={certificationCourseForm.title}
          onChange={(e) => setCertificationCourseForm({ ...certificationCourseForm, title: e.target.value })}
          className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
          placeholder="e.g. Advanced React Patterns"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Provider Name</label>
        <input
          value={certificationCourseForm.providerName}
          onChange={(e) => setCertificationCourseForm({ ...certificationCourseForm, providerName: e.target.value })}
          className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
          placeholder="e.g. Coursera"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Instructor <span className="text-red-500">*</span></label>
        <input
          value={certificationCourseForm.instructor}
          onChange={(e) => setCertificationCourseForm({ ...certificationCourseForm, instructor: e.target.value })}
          className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
          placeholder="e.g. John Doe"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Category</label>
        <input
          value={certificationCourseForm.category}
          onChange={(e) => setCertificationCourseForm({ ...certificationCourseForm, category: e.target.value })}
          className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
          placeholder="e.g. Development"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Duration</label>
        <input
          value={certificationCourseForm.duration}
          onChange={(e) => setCertificationCourseForm({ ...certificationCourseForm, duration: e.target.value })}
          className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
          placeholder="e.g. 10 Hours"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Level</label>
        <select
          value={certificationCourseForm.level}
          onChange={(e) => setCertificationCourseForm({ ...certificationCourseForm, level: e.target.value })}
          className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium">Rating</label>
        <input
          type="number"
          step="0.1"
          value={certificationCourseForm.rating}
          onChange={(e) => setCertificationCourseForm({ ...certificationCourseForm, rating: e.target.value })}
          className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
          placeholder="e.g. 4.5"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Students Enrolled</label>
        <input
          type="number"
          value={certificationCourseForm.studentsEnrolled}
          onChange={(e) => setCertificationCourseForm({ ...certificationCourseForm, studentsEnrolled: e.target.value })}
          className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
          placeholder="e.g. 1000"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Current Price</label>
        <input
          type="number"
          value={certificationCourseForm.currentPrice}
          onChange={(e) => setCertificationCourseForm({ ...certificationCourseForm, currentPrice: e.target.value })}
          className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
          placeholder="e.g. 499"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Original Price</label>
        <input
          type="number"
          value={certificationCourseForm.originalPrice}
          onChange={(e) => setCertificationCourseForm({ ...certificationCourseForm, originalPrice: e.target.value })}
          className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
          placeholder="e.g. 999"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Badge</label>
        <input
          value={certificationCourseForm.badge}
          onChange={(e) => setCertificationCourseForm({ ...certificationCourseForm, badge: e.target.value })}
          className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
          placeholder="e.g. Bestseller"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Enroll Link</label>
        <input
          value={certificationCourseForm.enrollLink}
          onChange={(e) => setCertificationCourseForm({ ...certificationCourseForm, enrollLink: e.target.value })}
          className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
          placeholder="https://..."
        />
      </div>
    </div>

    <div className="mt-6">
      <label className="text-sm font-medium">Image URL</label>
      <input
        value={certificationCourseForm.image}
        onChange={(e) => setCertificationCourseForm({ ...certificationCourseForm, image: e.target.value })}
        className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
        placeholder="https://..."
      />
    </div>

    <div className="mt-8 flex justify-end gap-3">
      <button
        onClick={() => {
          resetCertificationCourseForm();
          setScreen("certification-courses");
        }}
        className="px-5 py-2 rounded-lg border hover:bg-gray-100 transition"
      >
        Cancel
      </button>
      <button
        onClick={handleSaveCertificationCourse}
        className="px-6 py-2 rounded-lg bg-[#143481] text-white"
      >
        {editingCertificationCourse ? "Update Course" : "Save Course"}
      </button>
    </div>
  </div>
)}


{screen === "add-course" && (
  <div className="max-w-4xl mx-auto  bg-white rounded-2xl shadow p-3 sm:p-4 md:p-6 md:p-8">
    {/* ================= HEADER ================= */}
    <div className="mb-6">
      <h2 className="text-xl font-bold text-[#143481]">
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
          Course Name <span className="text-red-500">*</span>
        </label>
        <input
          value={campusCourseForm.courseName}
          onChange={(e) => setCampusCourseForm({ ...campusCourseForm, courseName: e.target.value })}
          placeholder="e.g. B.Tech Mechanical"
          className="w-full mt-1 border rounded-lg px-4 py-2
            focus:ring-2 focus:ring-blue-600 outline-none transition"
        />
        <p className="text-xs text-gray-400 mt-1">
          Course name is required.
        </p>
      </div>

      {/* University */}
      <div>
        <label className="text-sm font-medium">
          University Name <span className="text-red-500">*</span>
        </label>
        <input
          value={campusCourseForm.universityName}
          onChange={(e) => setCampusCourseForm({ ...campusCourseForm, universityName: e.target.value })}
          placeholder="e.g. IIT Bombay"
          className="w-full mt-1 border rounded-lg px-4 py-2
            focus:ring-2 focus:ring-blue-600 outline-none transition"
        />
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

      {/* Degree Type */}
      <div>
        <label className="text-sm font-medium">
          Degree Type
        </label>
        <input
          value={campusCourseForm.degreeType}
          onChange={(e) => setCampusCourseForm({ ...campusCourseForm, degreeType: e.target.value })}
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
        value={campusCourseForm.description}
        onChange={(e) => setCampusCourseForm({ ...campusCourseForm, description: e.target.value })}
        rows={4}
        placeholder="Brief description about the course..."
        className="w-full mt-1 border rounded-lg px-4 py-2
          focus:ring-2 focus:ring-blue-600 outline-none transition"
      />
    </div>

    {/* Extra Fields */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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
          value={campusCourseForm.enrolledCount}
          onChange={(e) => setCampusCourseForm({ ...campusCourseForm, enrolledCount: e.target.value })}
          placeholder="e.g. 950"
          className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Location</label>
        <input
          value={campusCourseForm.location}
          onChange={(e) => setCampusCourseForm({ ...campusCourseForm, location: e.target.value })}
          placeholder="e.g. Chennai, India"
          className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
        />
      </div>
    </div>

    {/* isTop Toggle */}
    <div className="mt-6 flex items-center gap-3">
      <input
        type="checkbox"
        checked={campusCourseForm.isTop}
        onChange={(e) => setCampusCourseForm({ ...campusCourseForm, isTop: e.target.checked })}
        className="accent-blue-600 scale-110"
      />
      <span className="text-sm font-medium">Mark as Top Course</span>
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
        className="px-6 py-2 rounded-lg bg-[#143481] text-white"
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
      <h2 className="text-xl font-bold text-[#143481]" >
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
            className="w-full bg-[#143481] text-white rounded-lg py-2 "
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

{screen === "internship-applications" && (
  <>
    {/* ================= HEADER ================= */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h2 className="text-xl font-bold text-[#143481]">
          Internship Applications
        </h2>
        <p className="text-sm text-gray-500">
          Review internship applications and candidates
        </p>
      </div>

      {/* Internship Selector */}
      <div>
        <select
          className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
          value={selectedInternshipIdForApp}
          onChange={(e) => setSelectedInternshipIdForApp(e.target.value)}
        >
          <option value="">-- Select Internship to View Applications --</option>
          {internships.map((internship) => (
            <option key={internship._id} value={internship._id}>
              {internship.title} ({internship.company?.name})
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* ================= TABLE ================= */}
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Candidate Name</th>
            <th className="px-4 py-3 text-left">Internship Title</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Phone</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Applied Date</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {internshipApplicationsLoading ? (
            <tr>
              <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                Loading applications...
              </td>
            </tr>
          ) : internshipApplications.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                {selectedInternshipIdForApp ? "No applications found for this internship" : "Select an internship to view applications"}
              </td>
            </tr>
          ) : (
            internshipApplications.map((app: any) => (
              <tr
                key={app._id}
                className="hover:bg-blue-50 transition"
              >
                <td className="px-4 py-3 font-medium">
                  {app.fullName || (app.user ? `${app.user.firstName} ${app.user.lastName || ""}` : "Unknown")}
                </td>
                
                <td className="px-4 py-3">
                  {app.internship?.title || "—"}
                </td>

                <td className="px-4 py-3 text-gray-600">
                  {app.email || app.user?.emailId || "—"}
                </td>

                <td className="px-4 py-3">
                  {app.phoneNumber || app.user?.phoneNumber || "—"}
                </td>

                <td className="px-4 py-3">
                  <select
                    value={app.status}
                    onChange={(e) => handleUpdateInternshipApplicationStatus(app._id, e.target.value)}
                    className={`px-2 py-1 text-xs rounded border-0 cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none
                      ${(app.status === "New" || app.status === "Applied") ? "bg-yellow-100 text-yellow-700" : (app.status === "Reviewed" || app.status === "Shortlisted") ? "bg-blue-100 text-blue-700" : app.status === "Hired" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {['Applied', 'Shortlisted', 'Hired', 'Rejected'].map(s => (
                      <option key={s} value={s} className="bg-white text-gray-800">{s}</option>
                    ))}
                  </select>
                </td>

                <td className="px-4 py-3 text-gray-500">
                  {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "—"}
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-3 text-xs">
                    <button 
                      onClick={() => handleUpdateInternshipApplicationStatus(app._id, 'Rejected')}
                      className="text-red-600 hover:underline"
                    >
                      Reject
                    </button>
                    {app.resumeUrl && (
                      <a 
                        href={app.resumeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Resume
                      </a>
                    )}
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

{screen === "blog-categories" && (
  <>
    {/* ================= HEADER ================= */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h2 className="text-xl font-bold text-[#143481]">
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
        className="px-4 py-2 rounded-lg bg-[#143481] text-white "
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
        <h2 className="text-xl font-bold text-[#143481]">Companies</h2>
        <p className="text-sm text-gray-500">
          Manage registered companies
        </p>
      </div>

      <button
        onClick={() => {
          setSelectedCompany(null);
          setScreen("create-company");
        }}
        className="px-4 py-2 rounded-lg bg-[#143481] text-white  transition"
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
                    bg-[#143481] text-white text-sm  transition"
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
                      className="text-[#143481] hover:underline"
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
      <h2 className="text-xl font-bold text-[#143481]">
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
        className="px-6 py-2 rounded-lg bg-[#143481] text-white
           transition disabled:opacity-60"
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



{screen === "Jobs" && (
  <>
    {/* ================= HEADER ================= */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h2 className="text-xl font-bold text-[#143481]">Jobs</h2>
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
        className="px-4 py-2 rounded-lg bg-[#143481] text-white "
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
                          companyId: job.company?._id || job.company || "",
                          companyName: job.company?.name || job.companyName || "",
                          category: job.category || job.jobCategory || "",
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

{/* job form */}
{showAddJobModal && (
  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
    
    <div className="bg-white text-black w-full max-w-xl rounded-xl shadow-xl p-5 relative max-h-[90vh] overflow-y-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-[#0A1A40]">
          {editingJob ? "Update Job" : "Add New Job"}
        </h3>
        <button
          onClick={() => setShowAddJobModal(false)}
          className="text-gray-400 hover:text-gray-700 transition"
        >
          ✕
        </button>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

        {/* Job Title */}
        <div>
          <label className="block text-xs font-medium mb-1">Job Title</label>
          <input
            placeholder="Enter job title"
            className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#0A1A40] outline-none transition"
            value={jobForm.title}
            onChange={(e) =>
              setJobForm({ ...jobForm, title: e.target.value })
            }
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-xs font-medium mb-1">Company</label>
          <select
            className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#0A1A40] outline-none transition"
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
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-medium mb-1">Location</label>
          <input
            placeholder="Enter location"
            className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#0A1A40] outline-none transition"
            value={jobForm.location}
            onChange={(e) =>
              setJobForm({ ...jobForm, location: e.target.value })
            }
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-xs font-medium mb-1">Job Type</label>
          <select
            className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#0A1A40] outline-none transition"
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
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-medium mb-1">Category</label>
          <select
            className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#0A1A40] outline-none transition"
            value={jobForm.category}
            onChange={(e) =>
              setJobForm({ ...jobForm, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            <option value="Big brands">Big brands</option>
            <option value="Work from home">Work from home</option>
            <option value="Part-time">Part-time</option>
            <option value="MBA">MBA</option>
            <option value="Engineering">Engineering</option>
            <option value="Media">Media</option>
            <option value="Design">Design</option>
            <option value="Data Science">Data Science</option>
           
          </select>
        </div>

        {/* Salary Min */}
        <div>
          <label className="block text-xs font-medium mb-1">Salary Min</label>
          <input
            className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#0A1A40] outline-none transition"
            value={jobForm.salaryMin}
            onChange={(e) =>
              setJobForm({ ...jobForm, salaryMin: e.target.value })
            }
          />
        </div>

        {/* Salary Max */}
        <div>
          <label className="block text-xs font-medium mb-1">Salary Max</label>
          <input
            className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#0A1A40] outline-none transition"
            value={jobForm.salaryMax}
            onChange={(e) =>
              setJobForm({ ...jobForm, salaryMax: e.target.value })
            }
          />
        </div>

        {/* Openings */}
        <div>
          <label className="block text-xs font-medium mb-1">Openings</label>
          <input
            className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#0A1A40] outline-none transition"
            value={jobForm.openings}
            onChange={(e) =>
              setJobForm({ ...jobForm, openings: e.target.value })
            }
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-xs font-medium mb-1">
            Experience Level
          </label>
          <select
            className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#0A1A40] outline-none transition"
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
      </div>

      {/* Description */}
      <div className="mt-3">
        <label className="block text-xs font-medium mb-1">
          Job Description
        </label>
        <textarea
          rows={2}
          className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#0A1A40] outline-none transition resize-none"
          value={jobForm.description}
          onChange={(e) =>
            setJobForm({ ...jobForm, description: e.target.value })
          }
        />
      </div>

      {/* Skills */}
      <div className="mt-3">
        <label className="block text-xs font-medium mb-1">
          Skills (separate with commas) 
        </label>
        <input
          className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#0A1A40] outline-none transition"
          value={jobForm.skillsRequired}
          onChange={(e) =>
            setJobForm({ ...jobForm, skillsRequired: e.target.value })
          }
        />
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 mt-5">
        <button
          onClick={() => setShowAddJobModal(false)}
          className="px-4 py-1.5 text-sm rounded-md border hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          disabled={loading}
          onClick={handleSaveJob}
          className="px-5 py-1.5 text-sm rounded-md text-white bg-[#0A1A40] hover:opacity-90 transition disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : editingJob
            ? "Update Job"
            : "Create Job"}
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
        <h2 className="text-xl font-bold text-[#143481]">Internships</h2>
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
        className="px-4 py-2 rounded-lg bg-[#143481] text-white "
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
                          
                          
                          companyId: internship.company?._id || internship.company || "",
                          companyName: internship.company?.name || internship.companyName || "",
                          category: internship.category || "",
                          location: internship.location || "",
                          stipendMin: internship.stipendMin || "",
                          stipendMax: internship.stipendMax || "",
                          duration: internship.duration || "",
                          
                          startDate: internship.startDate
                            ? new Date(internship.startDate).toISOString().split("T")[0]
                            : "",
                          openings: internship.openings || "",
                          mode: internship.mode || "remote",
                          skillsRequired:
                            internship.skillsRequired?.join(", ") || "",
                        });
                        setShowAddInternshipModal(true);
                      }}
                      className="text-[#143481] hover:underline"
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
        <h3 className="text-2xl font-bold text-[#143481] ">
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

          {/* Category */}
          <div className="mt-5">
            <label className="text-sm font-medium text-gray-600">
              Category *
            </label>
            <select
              className="mt-1 w-full rounded-xl border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              value={internshipForm.category}
              onChange={(e) =>
                setInternshipForm({ ...internshipForm, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {[
                "Big brands", "Work from home", "Part-time", "MBA",
                "Engineering", "Media", "Design", "Data Science", "Accounting"
              ].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
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
          className="px-6 py-2 rounded-xl bg-[#143481] text-white font-medium  disabled:opacity-60"
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
        <h2 className="text-xl font-bold text-[#143481]">
          Job Applications
        </h2>
        <p className="text-sm text-gray-500">
          Review job applications and candidates
        </p>
      </div>

      {/* Job Selector */}
      <div>
        <select
          className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
          value={selectedJobIdForApp}
          onChange={(e) => setSelectedJobIdForApp(e.target.value)}
        >
          <option value="">-- Select Job to View Applications --</option>
          {jobs.map((job) => (
            <option key={job._id} value={job._id}>
              {job.title} ({job.company?.name})
            </option>
          ))}
        </select>
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
          {applicationsLoading ? (
            <tr>
              <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                Loading applications...
              </td>
            </tr>
          ) : applications.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                {selectedJobIdForApp ? "No applications found for this job" : "Select a job to view applications"}
              </td>
            </tr>
          ) : (
            applications.map((app: any) => (
              <tr
                key={app._id}
                className="hover:bg-blue-50 transition"
              >
                {/* Candidate */}
                <td className="px-4 py-3 font-medium">
                  {app.fullName || (app.user ? `${app.user.firstName} ${app.user.lastName || ""}` : "Unknown")}
                </td>
                
                {/* Job */}
                <td className="px-4 py-3">
                  {app.job?.title || app.jobTitle || "—"}
                </td>

                {/* Email */}
                <td className="px-4 py-3 text-gray-600">
                  {app.email || app.user?.emailId || "—"}
                </td>

                {/* Phone */}
                <td className="px-4 py-3">
                  {app.phone || app.phoneNumber || app.user?.phoneNumber || "—"}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <select
                    value={app.status}
                    onChange={(e) => handleUpdateApplicationStatus(app._id, e.target.value)}
                    className={`px-2 py-1 text-xs rounded border-0 cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none
                      ${
                        (app.status === "New" || app.status === "Applied")
                          ? "bg-yellow-100 text-yellow-700"
                          : (app.status === "Reviewed" || app.status === "Shortlisted")
                          ? "bg-blue-100 text-blue-700"
                          : app.status === "Hired"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {[ 'Applied', 'Shortlisted', 'Hired', 'Rejected'].map(s => (
                      <option key={s} value={s} className="bg-white text-gray-800">{s}</option>
                    ))}
                  </select>
                </td>

                {/* Date */}
                <td className="px-4 py-3 text-gray-500">
                  {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "—"}
                </td>

                {/* Action */}
                <td className="px-4 py-3">
                  <div className="flex gap-3 text-xs">
                    
                    <button 
                      onClick={() => handleUpdateApplicationStatus(app._id, 'Rejected')}
                      className="text-red-600 hover:underline"
                    >
                      Reject
                    </button>
                    {app.resumeUrl && (
                      <a 
                        href={app.resumeUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Resume
                      </a>
                    )}
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

{screen === "reports" && (
  <div className="max-w-6xl mx-auto space-y-6">
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold text-[#143481]">Reports</h2>
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
          <option value="campus-courses">Campus Courses Report</option>
          <option value="campus-leads">Campus Leads Report</option>
          <option value="certification-courses">Certification Courses Report</option>
          <option value="certification-leads">Certification Leads Report</option>
          <option value="job-applications">Job Applications Report</option>
          <option value="internship-applications">Internship Applications Report</option>
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
          className="flex-1 bg-[#143481] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#0f2a6a] transition disabled:opacity-60"
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
      <h2 className="text-xl font-bold text-[#143481]">Settings</h2>
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

          <button className="mt-4 px-4 py-2 bg-[#143481] text-white rounded-lg transition">
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
      <button className="px-6 py-2 rounded-lg bg-[#143481] text-white  ">
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

      <h3 className="text-xl font-bold text-blue-800 mb-1">{viewCampusCourse.courseName}</h3>
      <p className="text-sm text-gray-500 mb-4">{viewCampusCourse.universityName}</p>

      <div className="space-y-3 text-sm text-gray-700">
        <p><strong>Degree:</strong> {viewCampusCourse.degreeType}</p>     
        <p><strong>Level:</strong> {viewCampusCourse.level}</p>
        <p><strong>Duration:</strong> {viewCampusCourse.duration}</p>
        <p><strong>Location:</strong> {viewCampusCourse.location}</p>
        <p><strong>Rating:</strong> {viewCampusCourse.rating} ★</p>
        <p><strong>Enrolled:</strong> {viewCampusCourse.enrolledCount}</p>
        <p><strong>Top Course:</strong> {viewCampusCourse.isTop ? 'Yes' : 'No'}</p>
        <div className="bg-gray-50 p-3 rounded-lg border mt-2">
          <strong>Description:</strong>
          <p className="mt-1 text-gray-600">{viewCampusCourse.description}</p>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={() => setShowViewCampusCourseModal(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Close</button>
      </div>
    </div>
  </div>
)}

{/* ================= VIEW CERTIFICATION COURSE MODAL ================= */}
{showViewCertificationCourseModal && viewCertificationCourse && (
  <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 relative animate-fadeIn">
      <button
        onClick={() => setShowViewCertificationCourseModal(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>

      <h3 className="text-xl font-bold text-blue-800 mb-1">{viewCertificationCourse.title}</h3>
      <p className="text-sm text-gray-500 mb-4">{viewCertificationCourse.instructor}</p>

      <div className="space-y-3 text-sm text-gray-700">
        <p><strong>Instructor:</strong> {viewCertificationCourse.instructor}</p>
        <p><strong>Category:</strong> {viewCertificationCourse.category}</p>
        <p><strong>Level:</strong> {viewCertificationCourse.level}</p>
        <p><strong>Duration:</strong> {viewCertificationCourse.duration}</p>
        <p><strong>Rating:</strong> {viewCertificationCourse.rating} ★</p>
        <p><strong>Students:</strong> {viewCertificationCourse.studentsEnrolled}</p>
        <p><strong>Price:</strong> ₹{viewCertificationCourse.currentPrice} <span className="line-through text-gray-400">₹{viewCertificationCourse.originalPrice}</span></p>
        <p><strong>Badge:</strong> {viewCertificationCourse.badge}</p>
        {viewCertificationCourse.enrollLink && (
          <p><strong>Link:</strong> <a href={viewCertificationCourse.enrollLink} target="_blank" rel="noreferrer" className="text-blue-600 underline">Enroll Here</a></p>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button onClick={() => setShowViewCertificationCourseModal(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Close</button>
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
          { label: "Companies", key: "companies", icon: Factory },
          { label: "Jobs", key: "Jobs", icon: Briefcase },
          { label: "Internships", key: "Internships", icon: Briefcase },
          { label: "Internship Applications", key: "internship-applications", icon: FileText },
          { label: "Create Blog", key: "create-blog", icon: FileText },
          { label: "Blog Categories", key: "blog-categories", icon: FolderOpen },
          // { label: "Packages", key: "packages", icon: Package },
          { label: "Campus Admission Request", key: "admissions", icon: GraduationCap },
          { label: "Certification Admission", key: "certification-admissions", icon: GraduationCap },
          { label: "Certification Courses", key: "certification-courses", icon: BookOpen },
          { label: "Campus Courses", key: "courses", icon: BookOpen },
          // { label: "Testimonials", key: "testimonials", icon: Star },
          { label: "Job Applications", key: "applications", icon: FileText },
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
 
