"use client";

import { useState } from "react";

/**
 * SINGLE FILE ADMIN PANEL UI
 * Covers ALL 20 requirements (UI only)
 */

import { useRouter } from "next/navigation";
import { Bell,  UserCircle } from "lucide-react";


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
} from "lucide-react";


type Screen =
  | "dashboard"
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
  | "blog-categories"
  | "blogs"
  | "create-blog"
  | "testimonials"
  | "careers"
  | "applications"
  | "settings";

export default function AdminPage() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [loading, setLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  
const router = useRouter();
const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [status, setStatus] = useState<"Pending" | "Approved" | "Rejected">("Pending");
  const [showRequestInfo, setShowRequestInfo] = useState(false);

  const [activeSettingTab, setActiveSettingTab] = useState<
  "General" |
  "Admin Profile" |
  "Password & Security" |
  "Payment" |
  "Notifications" |
  "Roles & Permissions"
>("General");


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
      { label: "Packages", key: "packages", icon: Package },
      { label: "Admission Request", key: "admissions", icon: GraduationCap },
      { label: "Courses", key: "courses", icon: BookOpen },
      { label: "Blog Categories", key: "blog-categories", icon: FolderOpen },
      { label: "Blogs", key: "blogs", icon: FileText },
      { label: "Testimonials", key: "testimonials", icon: Star },
      { label: "Careers", key: "careers", icon: Briefcase },
      { label: "Applications", key: "applications", icon: FileText },
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
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
  {/* LEFT : PAGE TITLE */}
  <div className="font-semibold uppercase text-gray-800 text-lg">
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



        <div className="p-6">
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
        { title: "Total Users", link: "users" },
        { title: "Total Leads", link: "leads" },
        { title: "Total Packages", link: "packages" },
        { title: "Active Subscriptions", link: "packages" },
        { title: "Monthly Revenue", link: "packages" },
      ].map((item) => (
        <div
          key={item.title}
          onClick={() => setScreen(item.link as any)}
          className="bg-white p-4 rounded-xl shadow cursor-pointer hover:shadow-md transition"
        >
          <p className="text-sm text-gray-500">{item.title}</p>
          <h2 className="text-2xl font-bold mt-2">0</h2>
          <p className="text-xs text-blue-600 mt-1">
            View details →
          </p>
        </div>
      ))}
    </div>

    {/* ================= CHARTS ================= */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-3">
          User Growth
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-400 border rounded-lg">
          Line Chart Placeholder
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-3">
          Leads vs Conversions
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-400 border rounded-lg">
          Bar Chart Placeholder
        </div>
      </div>
    </div>

    {/* ================= BOTTOM TABLES ================= */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Users */}
      <div className="bg-white p-6 rounded-xl shadow">
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
      <div className="bg-white p-6 rounded-xl shadow">
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
          placeholder="Search by name, email..."
          className="border rounded-lg px-4 py-2 text-sm"
        />

        <select className="border rounded-lg px-3 py-2 text-sm">
          <option>All Roles</option>
          <option>Student</option>
          <option>Employer</option>
        </select>

        <select className="border rounded-lg px-3 py-2 text-sm">
          <option>All Status</option>
          <option>Active</option>
          <option>Blocked</option>
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
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Registered</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i} className="hover:bg-gray-50">
              {/* Profile */}
              <td className="px-4 py-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                  U
                </div>
              </td>

              {/* Name */}
              <td className="px-4 py-3 font-medium">
                User Name {i}
              </td>

              {/* Email */}
              <td className="px-4 py-3 text-gray-600">
                user{i}@gmail.com
              </td>

              {/* Phone */}
              <td className="px-4 py-3">
                987654321{i}
              </td>

              {/* Role */}
              <td className="px-4 py-3">
                <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-700">
                  Student
                </span>
              </td>

              {/* Status */}
              <td className="px-4 py-3">
                <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                  Active
                </span>
              </td>

              {/* Date */}
              <td className="px-4 py-3 text-gray-500">
                12 Jan 2026
              </td>

              {/* Actions */}
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setScreen("user-detail")}
                    className="text-blue-600 text-xs"
                  >
                    View
                  </button>

                  <button className="text-yellow-600 text-xs">
                    Block
                  </button>

                  <button className="text-red-600 text-xs">
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
        Showing 1–5 of 50 users
      </p>

      <div className="flex gap-2">
        <button className="px-3 py-1 border rounded">
          Prev
        </button>
        <button className="px-3 py-1 border rounded bg-blue-600 text-white">
          1
        </button>
        <button className="px-3 py-1 border rounded">
          2
        </button>
        <button className="px-3 py-1 border rounded">
          Next
        </button>
      </div>
    </div>
  </>
)}

{screen === "user-detail" && (
  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
    {/* ================= LEFT PANEL ================= */}
    <div className="bg-white rounded-xl shadow p-6">
      {/* Profile */}
      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-700">
          U
        </div>

        <h2 className="mt-4 font-semibold text-lg">
          Rahul Verma
        </h2>

        <span className="mt-1 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
          Active
        </span>
      </div>

      {/* Contact */}
      <div className="mt-6 text-sm text-gray-600 space-y-2">
        <p>
          <span className="font-medium">Email:</span>{" "}
          rahul@gmail.com
        </p>
        <p>
          <span className="font-medium">Phone:</span>{" "}
          9876543210
        </p>
        <p>
          <span className="font-medium">Role:</span>{" "}
          Student
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-2">
        <button className="w-full border rounded-lg py-2 text-sm">
          Edit User
        </button>

        <button className="w-full bg-yellow-100 text-yellow-700 rounded-lg py-2 text-sm">
          Block User
        </button>
      </div>
    </div>

    {/* ================= RIGHT PANEL ================= */}
    <div className="lg:col-span-3 text-gray-800 bg-white rounded-xl shadow p-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b mb-6 text-sm">
        {[
          "Overview",
          "Enrolled Courses",
          "Subscriptions",
          "Activity Logs",
          
        ].map((tab) => (
          <button
            key={tab}
            className="pb-2 border-b-2 border-transparent hover:border-blue-600 hover:text-blue-600"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="text-sm text-gray-600 space-y-4">
        <p>
          <span className="font-medium">User ID:</span>{" "}
          #USR1023
        </p>
        <p>
          <span className="font-medium">Registered On:</span>{" "}
          12 Jan 2026
        </p>
        <p>
          <span className="font-medium">Last Login:</span>{" "}
          Today at 10:30 AM
        </p>

        <div className="border mt-16 rounded-lg p-4  text-gray-700">
          Selected tab data will appear here
        </div>
      </div>
    </div>
  </div>
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
    <div className="bg-white rounded-xl shadow p-6">
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
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold mb-3">
          Course Interest
        </h3>
        <p className="text-sm text-gray-600">
          MBA – Marketing (Delhi University)
        </p>
      </div>

      {/* Notes Timeline */}
      <div className="bg-white rounded-xl shadow p-6">
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
      <div className="bg-white rounded-xl shadow p-6">
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
                    className="bg-white p-6 rounded-xl shadow"
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
  <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 md:p-8">
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
        <div className="bg-white rounded-xl shadow p-6">
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
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-3">Course Details</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p><b>Course:</b> MBA – Marketing</p>
            <p><b>University:</b> Delhi University</p>
            <p><b>Intake:</b> 2026</p>
            <p><b>Mode:</b> Full Time</p>
          </div>
        </div>

        {/* ================= DOCUMENTS ================= */}
        <div className="bg-white rounded-xl shadow p-6">
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
      <div className="bg-white rounded-xl shadow p-6">
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
        onClick={() => setScreen("add-course")}
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
            <th className="px-4 py-3 text-left">Course Name</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Duration</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Created Date</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {[
            { name: "MBA", cat: "PG", dur: "2 Years", status: "Active" },
            { name: "B.Tech", cat: "UG", dur: "4 Years", status: "Active" },
            { name: "MCA", cat: "PG", dur: "2 Years", status: "Inactive" },
            { name: "Diploma in CS", cat: "Diploma", dur: "1 Year", status: "Active" },
          ].map((course, i) => (
            <tr
              key={i}
              className="hover:bg-blue-50 transition"
            >
              {/* Course Name */}
              <td className="px-4 py-3 font-medium">
                {course.name}
              </td>

              {/* Category */}
              <td className="px-4 py-3">
                {course.cat}
              </td>

              {/* Duration */}
              <td className="px-4 py-3">
                {course.dur}
              </td>

              {/* Status */}
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs rounded
                    ${
                      course.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {course.status}
                </span>
              </td>

              {/* Created Date */}
              <td className="px-4 py-3 text-gray-500">
                15 Jan 2026
              </td>

              {/* Action */}
              <td className="px-4 py-3">
                <button
                  onClick={() => setScreen("add-course")}
                  className="text-blue-600 text-xs hover:underline"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
)}


{screen === "add-course" && (
  <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 md:p-8">
    {/* ================= HEADER ================= */}
    <div className="mb-6">
      <h2 className="text-xl font-bold">
        Add / Edit Course
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
          placeholder="e.g. MBA"
          className="w-full mt-1 border rounded-lg px-4 py-2
            focus:ring-2 focus:ring-blue-600 outline-none transition"
        />
        <p className="text-xs text-gray-400 mt-1">
          Course name is required
        </p>
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-medium">
          Category
        </label>
        <select
          className="w-full mt-1 border rounded-lg px-4 py-2
            hover:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition"
        >
          <option>UG</option>
          <option>PG</option>
          <option>Diploma</option>
        </select>
      </div>

      {/* Duration */}
      <div>
        <label className="text-sm font-medium">
          Duration
        </label>
        <input
          placeholder="e.g. 2 Years"
          className="w-full mt-1 border rounded-lg px-4 py-2
            focus:ring-2 focus:ring-blue-600 outline-none transition"
        />
      </div>

      {/* Status Toggle */}
      <div className="flex items-end">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            defaultChecked
            className="accent-blue-600 scale-110"
          />
          <span className="text-sm font-medium">
            Active Course
          </span>
        </label>
      </div>
    </div>

    {/* Eligibility */}
    <div className="mt-6">
      <label className="text-sm font-medium">
        Eligibility
      </label>
      <input
        placeholder="e.g. Graduation in any discipline"
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
        rows={4}
        placeholder="Brief description about the course..."
        className="w-full mt-1 border rounded-lg px-4 py-2
          focus:ring-2 focus:ring-blue-600 outline-none transition"
      />
    </div>

    {/* ================= ACTIONS ================= */}
    <div className="mt-8 flex justify-end gap-3">
      <button
        onClick={() => setScreen("courses")}
        className="px-5 py-2 rounded-lg border hover:bg-gray-100 transition"
      >
        Cancel
      </button>

      <button
        className="px-6 py-2 rounded-lg bg-blue-600 text-white
          hover:bg-blue-700 transition shadow"
      >
        Save Course
      </button>
    </div>
  </div>
)}

{screen === "blog-categories" && (
  <>
    {/* ================= HEADER ================= */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h2 className="text-xl font-bold">
          Blog Categories
        </h2>
        <p className="text-sm text-gray-500">
          Manage blog categories and visibility
        </p>
      </div>

      <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
        + Add Category
      </button>
    </div>

    {/* ================= TABLE ================= */}
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Category Name</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Created Date</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {[
            { name: "Admissions", status: "Active" },
            { name: "Career Guidance", status: "Active" },
            { name: "Scholarships", status: "Inactive" },
            { name: "Study Abroad", status: "Active" },
          ].map((cat, i) => (
            <tr
              key={i}
              className="hover:bg-blue-50 transition"
            >
              {/* Category Name */}
              <td className="px-4 py-3 font-medium">
                {cat.name}
              </td>

              {/* Status */}
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs rounded cursor-pointer
                    ${
                      cat.status === "Active"
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }
                  `}
                >
                  {cat.status}
                </span>
              </td>

              {/* Created Date */}
              <td className="px-4 py-3 text-gray-500">
                18 Jan 2026
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

{screen === "blogs" && (
  <>
    {/* ================= HEADER ================= */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h2 className="text-xl font-bold">
          Blogs
        </h2>
        <p className="text-sm text-gray-500">
          Manage published and draft blogs
        </p>
      </div>

      <button
        onClick={() => setScreen("create-blog")}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        + Create Blog
      </button>
    </div>

    {/* ================= TABLE ================= */}
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Author</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Publish Date</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {[
            {
              title: "How to Choose the Right MBA College",
              category: "Admissions",
              author: "Admin",
              status: "Published",
            },
            {
              title: "Top Scholarships in India",
              category: "Scholarships",
              author: "Editor",
              status: "Draft",
            },
            {
              title: "Career Options After B.Tech",
              category: "Career Guidance",
              author: "Admin",
              status: "Published",
            },
          ].map((blog, i) => (
            <tr
              key={i}
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

              {/* Author */}
              <td className="px-4 py-3 text-gray-600">
                {blog.author}
              </td>

              {/* Status */}
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs rounded
                    ${
                      blog.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {blog.status}
                </span>
              </td>

              {/* Publish Date */}
              <td className="px-4 py-3 text-gray-500">
                20 Jan 2026
              </td>

              {/* Action */}
              <td className="px-4 py-3">
                <div className="flex gap-3 text-xs">
                  <button
                    onClick={() => setScreen("create-blog")}
                    className="text-blue-600 hover:underline"
                  >
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

{screen === "create-blog" && (
  <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6 md:p-8">
    {/* ================= HEADER ================= */}
    <div className="mb-6">
      <h2 className="text-xl font-bold">
        Create / Edit Blog
      </h2>
      <p className="text-sm text-gray-500">
        Write and publish blog content
      </p>
    </div>

    {/* ================= FORM ================= */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* ================= LEFT CONTENT ================= */}
      <div className="lg:col-span-2 space-y-5">
        {/* Title */}
        <div>
          <label className="text-sm font-medium">
            Blog Title <span className="text-red-500">*</span>
          </label>
          <input
            placeholder="Enter blog title"
            className="w-full mt-1 border rounded-lg px-4 py-2
              focus:ring-2 focus:ring-blue-600 outline-none transition"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="text-sm font-medium">
            Slug
          </label>
          <input
            placeholder="blog-url-slug"
            className="w-full mt-1 border rounded-lg px-4 py-2
              focus:ring-2 focus:ring-blue-600 outline-none transition"
          />
          <p className="text-xs text-gray-400 mt-1">
            URL friendly slug (auto-generated if empty)
          </p>
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium">
            Category
          </label>
          <select
            className="w-full mt-1 border rounded-lg px-4 py-2
              hover:border-blue-600 focus:ring-2 focus:ring-blue-600 outline-none transition"
          >
            <option>Admissions</option>
            <option>Career Guidance</option>
            <option>Scholarships</option>
          </select>
        </div>

        {/* Featured Image */}
        <div>
          <label className="text-sm font-medium">
            Featured Image
          </label>

          <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-600 transition cursor-pointer">
            <p className="text-sm text-gray-500">
              Click to upload image
            </p>
            <p className="text-xs text-gray-400">
              JPG, PNG up to 2MB
            </p>
          </div>
        </div>

        {/* Rich Text Editor */}
        <div>
          <label className="text-sm font-medium">
            Blog Content
          </label>
          <textarea
            rows={10}
            placeholder="Write blog content here..."
            className="w-full mt-1 border rounded-lg px-4 py-2
              focus:ring-2 focus:ring-blue-600 outline-none transition"
          />
        </div>
      </div>

      {/* ================= RIGHT SIDEBAR ================= */}
      <div className="space-y-6">
        {/* SEO */}
        <div className="bg-gray-50 rounded-xl p-5 border">
          <h3 className="font-semibold mb-3">
            SEO Settings
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">
                Meta Title
              </label>
              <input
                placeholder="SEO meta title"
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Meta Description
              </label>
              <textarea
                rows={3}
                placeholder="SEO meta description"
                className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Publish */}
        <div className="bg-white border rounded-xl p-5">
          <label className="flex items-center gap-3 cursor-pointer mb-4">
            <input
              type="checkbox"
              defaultChecked
              className="accent-blue-600 scale-110"
            />
            <span className="text-sm font-medium">
              Publish Blog
            </span>
          </label>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setScreen("blogs")}
              className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              className="px-4 py-2 rounded-lg bg-blue-600 text-white
                hover:bg-blue-700 transition shadow"
            >
              Save Blog
            </button>
          </div>
        </div>
      </div>
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

{screen === "careers" && (
  <>
    {/* ================= HEADER ================= */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div>
        <h2 className="text-xl font-bold">
          Careers
        </h2>
        <p className="text-sm text-gray-500">
          Manage job openings and hiring status
        </p>
      </div>

      <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
        + Add Job
      </button>
    </div>

    {/* ================= TABLE ================= */}
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">Job Title</th>
            <th className="px-4 py-3 text-left">Department</th>
            <th className="px-4 py-3 text-left">Location</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Posted Date</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {[
            {
              title: "MERN Stack Developer",
              dept: "Engineering",
              location: "Delhi",
              status: "Open",
            },
            {
              title: "Admission Counselor",
              dept: "Admissions",
              location: "Noida",
              status: "Open",
            },
            {
              title: "Content Writer",
              dept: "Marketing",
              location: "Remote",
              status: "Closed",
            },
          ].map((job, i) => (
            <tr
              key={i}
              className="hover:bg-blue-50 transition"
            >
              {/* Job Title */}
              <td className="px-4 py-3 font-medium">
                {job.title}
              </td>

              {/* Department */}
              <td className="px-4 py-3">
                {job.dept}
              </td>

              {/* Location */}
              <td className="px-4 py-3 text-gray-600">
                {job.location}
              </td>

              {/* Status */}
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs rounded
                    ${
                      job.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {job.status}
                </span>
              </td>

              {/* Posted Date */}
              <td className="px-4 py-3 text-gray-500">
                25 Jan 2026
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


{screen === "settings" && (
  <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6 md:p-8">
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
              "Manage Blogs",
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
  <div className="fixed  p-12 m-16 inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-white rounded-2xl shadow-lg w-[50%]  p-6 animate-fadeIn">
      <h3 className="text-lg font-semibold mb-2">
        Are you sure you want to logout?
      </h3>

      <p className="text-sm text-gray-500 mb-6">
        You will be redirected to the admin login page.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowLogoutModal(false)}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setShowLogoutModal(false);
            router.push("/admin");
          }}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
)}


          
        </div>
      </main>
    </div>
  );
}
