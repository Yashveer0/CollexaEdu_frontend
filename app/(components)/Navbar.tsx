"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { FiBriefcase } from "react-icons/fi";
import { FiZap } from "react-icons/fi";
import { User, Briefcase } from "lucide-react";

import { HiOutlineHome } from "react-icons/hi";
import { FiChevronDown } from "react-icons/fi";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [activeRole, setActiveRole] = useState<"student" | "employer" | null>(
    null
  );

  const [open, setOpen] = useState<string | null>(null);

  return (
    <nav className="w-full shadow-sm backdrop-blur-md bg-white/60 fixed top-0 left-0 z-40 border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <img src="/logo.png" alt="Collexa Edu" className="h-14 w-auto" />
          </Link>
        </div>

        {/* HAMBURGER — MOBILE ONLY */}
        <button
          className="md:hidden text-gray-900"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* ================= DESKTOP MENU ================= */}
        <ul className="hidden md:flex items-center gap-8 text-md text-gray-800 font-semibold">
          <li
            className="relative flex items-center gap-1 cursor-pointer hover:bg-[#f0f4ffe8] px-4 py-2 rounded-md"
            onMouseEnter={() => setOpenMenu("campus")}
            onMouseLeave={() => {
              setOpenMenu(null);
              setOpenSub(null);
            }}
          >
            <HiOutlineAcademicCap className="text-gray-900 text-xl" /> Campus
            Courses{" "}
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${
                openMenu === "campus" ? "rotate-180" : "rotate-0"
              }`}
            />
            {openMenu === "campus" && (
              <div className="absolute top-8 bg-gray-100 shadow-md rounded-md p-8 text-nowrap gap-2">
                {/* Engineering — HOVER HERE */}
                <p
                  className="block mt-1 px-5 py-2 hover:bg-blue-900 hover:text-white hover:rounded-md cursor-pointer "
                  onMouseEnter={() => setOpenSub("eng")}
                >
                  Engineering Courses
                </p>

                <p
                  className="block mt-1 px-5 py-2 hover:bg-blue-900 hover:text-white hover:rounded-md cursor-pointer "
                  onMouseEnter={() => setOpenSub("management")}
                >
                  Management Courses
                </p>

                <p
                  className="block mt-1 px-5 py-2 hover:bg-blue-900 hover:text-white hover:rounded-md cursor-pointer "
                  onMouseEnter={() => setOpenSub("computer")}
                >
                  Computer Science
                </p>

                <p
                  className="block mt-1 px-5 py-2 hover:bg-blue-900 hover:text-white hover:rounded-md cursor-pointer "
                  onMouseEnter={() => setOpenSub("data")}
                >
                  Data Science
                </p>
              </div>
            )}
            {/* ⭐ SUB COURSES — SHOWS ON RIGHT */}
            {openSub === "eng" && openMenu === "campus" && (
              <div className="absolute top-8 text-lg font-light left-65 rounded-r-md bg-white shadow-md  p-7 text-nowrap">
                <Link
                  href="/campus-courses"
                  className="block mt-1 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  B.Tech Computer Science
                </Link>

                <Link
                  href="/campus-courses"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  B.Tech Electronics
                </Link>

                <Link
                  href="/campus-courses"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  B.Tech Mechanical
                </Link>

                <Link
                  href="/campus-courses"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  M.Tech Programs
                </Link>

                <Link
                  href="/campus-courses"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  B.Tech Mechanical
                </Link>
              </div>
            )}
            {/* ⭐ SUB Management — SHOWS ON RIGHT */}
            {openSub === "management" && openMenu === "campus" && (
              <div className="absolute top-8 text-lg font-light left-65 rounded-r-md bg-white shadow-md  p-11.5 text-nowrap">
                <Link
                  href="/campus-courses"
                  className="block mt-1 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  MBA Programs
                </Link>

                <Link
                  href="/campus-courses"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  BBA Programs
                </Link>

                <Link
                  href="/campus-courses"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  PGDM
                </Link>

                <Link
                  href="/campus-courses"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Executive MBA
                </Link>
              </div>
            )}
            {/* ⭐ SUB computer — SHOWS ON RIGHT */}
            {openSub === "computer" && openMenu === "campus" && (
              <div className="absolute top-8 text-lg font-light left-65 rounded-r-md bg-white shadow-md  p-11.5 text-nowrap">
                <Link
                  href="/campus-courses"
                  className="block mt-1 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  B.Sc Computer Science
                </Link>

                <Link
                  href="/campus-courses"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  M.Sc Computer Science
                </Link>

                <Link
                  href="/campus-courses"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  BCA
                </Link>

                <Link
                  href="/campus-courses"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  MCA
                </Link>
              </div>
            )}
            {/* ⭐ SUB campus-courses data  — SHOWS ON RIGHT */}
            {openSub === "data" && openMenu === "campus" && (
              <div className="absolute top-8 text-lg font-light left-65 rounded-r-md bg-white shadow-md  p-11.5 text-nowrap">
                <Link
                  href="/campus-courses"
                  className="block mt-1 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  B.Sc Data Science
                </Link>

                <Link
                  href="/campus-courses"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  M.Sc Data Science
                </Link>

                <Link
                  href="/campus-courses"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  AI/ML Programs
                </Link>

                <Link
                  href="/campus-courses"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Business Analytics
                </Link>
              </div>
            )}
          </li>

          {/* ⭐ EARNING MENU ⭐ */}
          <li
            className="relative flex items-center gap-1 cursor-pointer hover:bg-[#f0f4ffe8] px-4 py-2 rounded-md"
            onMouseEnter={() => setOpenMenu("earning")}
            onMouseLeave={() => {
              setOpenMenu(null);
              setOpenSub(null);
            }}
          >
            <FiBriefcase className="text-gray-900 text-lg mr-2" /> Earning{" "}
            <ChevronDown size={16} />
            {/* MAIN DROPDOWN */}
            {openMenu === "earning" && (
              <div className="absolute top-8 bg-gray-100 shadow-md rounded-md p-8 text-nowrap gap-2">
                {/* Internships */}
                <p
                  className="block mt-1 px-5 py-2 hover:bg-blue-900 hover:text-white hover:rounded-md cursor-pointer"
                  onMouseEnter={() => setOpenSub("intern")}
                >
                  Internships
                </p>

                {/* Jobs */}
                <p
                  className="block mt-1 px-5 py-2 hover:bg-blue-900 hover:text-white hover:rounded-md cursor-pointer"
                  onMouseEnter={() => setOpenSub("jobs")}
                >
                  Jobs
                </p>
              </div>
            )}
            {/* ⭐ INTERNSHIPS SUB MENU ⭐ */}
            {openSub === "intern" && openMenu === "earning" && (
              <div className="absolute top-8 left-50 text-lg font-light rounded-r-md bg-white shadow-md p-8 text-nowrap">
                <p className="font-semibold mb-2">Internship Categories</p>

                <p
                  className="block mt-1 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md cursor-pointer"
                  onClick={() => setOpenSub("tech")}
                >
                  Tech Internships
                </p>

                <p
                  className="block mt-1 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md cursor-pointer"
                  onClick={() => setOpenSub("marketing")}
                >
                  Marketing Internships
                </p>

                <p
                  className="block mt-1 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md cursor-pointer"
                  onClick={() => setOpenSub("finance")}
                >
                  Finance Internships
                </p>

                <p
                  className="block mt-1 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md cursor-pointer"
                  onClick={() => setOpenSub("design")}
                >
                  Design Internships
                </p>

                <p
                  className="block mt-1 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md cursor-pointer"
                  onClick={() => setOpenSub("business")}
                >
                  Business Internships
                </p>
              </div>
            )}
            {/* TECH SUB MENU — SAME AS BEFORE */}
            {openSub === "tech" && openMenu === "earning" && (
              <div className="absolute top-8 left-50 bg-white shadow-md rounded-md p-8 text-nowrap">
                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Software Development
                </Link>

                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Web Development
                </Link>

                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Mobile App Development
                </Link>

                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Data Science
                </Link>

                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  AI / ML
                </Link>

                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Cybersecurity
                </Link>
              </div>
            )}
            {/* MARKETING SUB MENU ⭐ */}
            {openSub === "marketing" && openMenu === "earning" && (
              <div className="absolute top-8 left-50 bg-white shadow-md rounded-md p-8 text-nowrap">
                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Digital Marketing
                </Link>

                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Content Creation
                </Link>

                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Social Media Marketing
                </Link>

                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  SEO/SEM
                </Link>

                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Brand Management
                </Link>
              </div>
            )}
            {/* FINANCE SUB MENU ⭐ */}
            {openSub === "finance" && openMenu === "earning" && (
              <div className="absolute top-8 left-50 bg-white shadow-md rounded-md p-8 text-nowrap">
                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Investment Banking
                </Link>

                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Financial Analysis
                </Link>

                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Risk Management
                </Link>

                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Corporate Finance
                </Link>
              </div>
            )}
            {/* DESIGN SUB MENU ⭐ */}
            {openSub === "design" && openMenu === "earning" && (
              <div className="absolute top-8 left-50 bg-white shadow-md rounded-md p-8 text-nowrap">
                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  UI/UX Design
                </Link>

                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Graphic Design
                </Link>

                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Product Design
                </Link>

                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Web Design
                </Link>
              </div>
            )}
            {/* BUSINESS SUB MENU ⭐ */}
            {openSub === "business" && openMenu === "earning" && (
              <div className="absolute top-8 left-50 bg-white shadow-md rounded-md p-8 text-nowrap">
                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Business Development
                </Link>

                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Operations
                </Link>

                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Strategy
                </Link>

                <Link
                  href="/internship"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Consulting
                </Link>
              </div>
            )}
            {/* ⭐ JOBS SUB MENU ⭐ */}
            {openSub === "jobs" && openMenu === "earning" && (
              <div className="absolute top-8 left-50 bg-white shadow-md rounded-md p-8 text-nowrap">
                <p
                  className="block mt-1 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md cursor-pointer"
                  onClick={() => setOpenSub("locations")}
                >
                  Top Locations
                </p>

                <p
                  className="block mt-1 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md cursor-pointer"
                  onClick={() => setOpenSub("categories")}
                >
                  Top Categories
                </p>

                <p
                  className="block mt-1 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md cursor-pointer"
                  onClick={() => setOpenSub("more_jobs")}
                >
                  Explore More Jobs
                </p>

                <p
                  className="block mt-1 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md cursor-pointer"
                  onClick={() => setOpenSub("placement")}
                >
                  Placement Courses with AI
                </p>
              </div>
            )}
            {/* ⭐ LOCATIONS SUB MENU ⭐ */}
            {openSub === "locations" && openMenu === "earning" && (
              <div className="absolute top-8 left-50 bg-white shadow-md rounded-md p-8 text-nowrap">
                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Work from Home
                </Link>

                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Jobs in Delhi
                </Link>

                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Jobs in Mumbai
                </Link>

                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Jobs in Bangalore
                </Link>

                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Jobs in Hyderabad
                </Link>

                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Jobs in Kolkata
                </Link>

                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Jobs in Chennai
                </Link>
                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Jobs in Pune
                </Link>
                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Jobs in Jaipur
                </Link>
              </div>
            )}
            {/* ⭐ CATEGORIES SUB MENU ⭐ */}
            {openSub === "categories" && openMenu === "earning" && (
              <div className="absolute top-8 left-50 bg-white shadow-md rounded-md p-8 text-nowrap">
                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Software Engineer
                </Link>

                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Data Analyst
                </Link>

                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Product Manager
                </Link>

                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Marketing Specialist
                </Link>

                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  UI/UX Designer
                </Link>

                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  DevOps Engineer
                </Link>

                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Business Analyst
                </Link>
                <Link
                  href=""
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Sales Executive
                </Link>
              </div>
            )}
            {/* ⭐ MORE JOBS SUB MENU ⭐ */}
            {openSub === "more_jobs" && openMenu === "earning" && (
              <div className="absolute top-8 left-50 bg-white shadow-md rounded-md p-8 text-nowrap">
                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  View all jobs
                </Link>

                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Remote Jobs
                </Link>

                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Part-time Jobs
                </Link>

                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Freelance Jobs
                </Link>
              </div>
            )}
            {/* ⭐ PLACEMENT COURSES SUB MENU ⭐ */}
            {openSub === "placement" && openMenu === "earning" && (
              <div className="absolute top-8 left-50 bg-white shadow-md rounded-md p-8 text-nowrap">
                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  AI Placement Course
                </Link>

                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Data Science Bootcamp
                </Link>

                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Full Stack Development
                </Link>

                <Link
                  href="/jobs"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Digital Marketing
                </Link>
              </div>
            )}
          </li>

          {/* ⚡ Learn Skills */}
          <li
            className="relative flex items-center gap-1 cursor-pointer hover:bg-[#f0f4ffe8] px-4 py-2 rounded-md"
            onMouseEnter={() => setOpenMenu("learn")}
            onMouseLeave={() => {
              setOpenMenu(null);
              setOpenSub(null);
            }}
          >
            <FiZap className="text-gray-900 text-lg mr-2" /> Learn Skills{" "}
            <ChevronDown size={16} />
            {openMenu === "learn" && (
              <div className="absolute top-8 bg-gray-100 shadow-md rounded-md p-8 text-nowrap gap-2">
                {/* Engineering — HOVER HERE */}

                <p
                  className="block mt-1 px-5 py-2 hover:bg-blue-900 hover:text-white hover:rounded-md cursor-pointer "
                  onMouseEnter={() => setOpenSub("programming")}
                >
                  Programming Languages
                </p>

                <p
                  className="block mt-1 px-5 py-2 hover:bg-blue-900 hover:text-white hover:rounded-md cursor-pointer "
                  onMouseEnter={() => setOpenSub("web")}
                >
                  Web Development
                </p>

                <p
                  className="block mt-1 px-5 py-2 hover:bg-blue-900 hover:text-white hover:rounded-md cursor-pointer "
                  onMouseEnter={() => setOpenSub("data")}
                >
                  Data Science & AI
                </p>

                <p
                  className="block mt-1 px-5 py-2 hover:bg-blue-900 hover:text-white hover:rounded-md cursor-pointer "
                  onMouseEnter={() => setOpenSub("marketing")}
                >
                  Digital Marketing
                </p>

                <p
                  className="block mt-1 px-5 py-2 hover:bg-blue-900 hover:text-white hover:rounded-md cursor-pointer "
                  onMouseEnter={() => setOpenSub("design")}
                >
                  Design Skills
                </p>
              </div>
            )}
            {/* ⭐ SUB COURSES — SHOWS ON RIGHT */}
            {openSub === "programming" && openMenu === "learn" && (
              <div className="absolute top-8 text-lg font-light left-75 rounded-r-md bg-white shadow-md  p-7 text-nowrap">
                <Link
                  href="#"
                  className="block mt-1 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Python Masterclass
                </Link>

                <Link
                  href="#"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  JavaScript Deep Dive
                </Link>

                <Link
                  href="#"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Java Programming
                </Link>

                <Link
                  href="#"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  C++ Programming
                </Link>

                <Link
                  href="#"
                  className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Go Programming
                </Link>
              </div>
            )}
            {/* ⭐ SUB web — SHOWS ON RIGHT */}
            {openSub === "web" && openMenu === "learn" && (
              <div className="absolute top-8 text-lg font-light left-75 rounded-r-md bg-white shadow-md  p-8 text-nowrap">
                <Link
                  href="#"
                  className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  React Development
                </Link>

                <Link
                  href="#"
                  className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Node.js Backend
                </Link>

                <Link
                  href="#"
                  className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Full Stack Development
                </Link>

                <Link
                  href="#"
                  className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Next.js Framework
                </Link>

                <Link
                  href="#"
                  className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Vue.js Development
                </Link>
              </div>
            )}
            {/* ⭐ SUB data — SHOWS ON RIGHT */}
            {openSub === "data" && openMenu === "learn" && (
              <div className="absolute top-8 text-lg font-light left-75 rounded-r-md bg-white shadow-md  p-8 text-nowrap">
                <Link
                  href="#"
                  className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Machine Learning
                </Link>

                <Link
                  href="#"
                  className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Deep Learning
                </Link>

                <Link
                  href="#"
                  className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Data Analytics
                </Link>

                <Link
                  href="#"
                  className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Big Data
                </Link>

                <Link
                  href="#"
                  className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  AI Fundamentals
                </Link>
              </div>
            )}
            {/* ⭐ SUB marketing  — SHOWS ON RIGHT */}
            {openSub === "marketing" && openMenu === "learn" && (
              <div className="absolute top-8 text-lg font-light left-75 rounded-r-md bg-white shadow-md  p-8 text-nowrap">
                <Link
                  href="#"
                  className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  SEO Mastery
                </Link>

                <Link
                  href="#"
                  className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Google Ads
                </Link>

                <Link
                  href="#"
                  className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Social Media Marketing
                </Link>

                <Link
                  href="#"
                  className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Content Marketing
                </Link>

                <Link
                  href="#"
                  className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Email Marketing
                </Link>
              </div>
            )}
            {/* ⭐ SUB design  — SHOWS ON RIGHT */}
            {openSub === "design" && openMenu === "learn" && (
              <div className="absolute top-8 text-lg font-light left-75 rounded-r-md bg-white shadow-md  p-8 text-nowrap">
                <Link
                  href="#"
                  className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  UI/UX Design
                </Link>

                <Link
                  href="#"
                  className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Figma Mastery
                </Link>

                <Link
                  href="#"
                  className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Adobe Creative Suite
                </Link>

                <Link
                  href="#"
                  className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Web Design
                </Link>

                <Link
                  href="#"
                  className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md"
                >
                  Motion Graphics
                </Link>
              </div>
            )}
          </li>
        </ul>

        {/* DESKTOP BUTTONS */}
        <div className="hidden md:flex relative">
          {/* Login Button */}
          <button
            onClick={() => setShowLoginDropdown(!showLoginDropdown)}
            className="w-full mt-4 bg-gradient-to-r from-blue-900 to-emerald-400
  text-white font-bold py-3 px-8 rounded-lg
  flex items-center justify-center gap-2 transition"
          >
            Login
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${
                showLoginDropdown ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {/* Dropdown */}
          <div className="relative">
            {/* Main Login Button */}

            {/* Dropdown */}
            {showLoginDropdown && (
              <div className="absolute right-0   top-full mt-16 w-64 bg-white border rounded-xl shadow-lg z-50 p-3">
                <p className="text-md font-semibold text-gray-900 mb-3 text-center">
                  Login As
                </p>

                {/* Buttons */}
                <div className="flex gap-2">
                  <Link
                    href="/student-login"
                    onClick={() => {
                      setActiveRole("student");
                      setShowLoginDropdown(false);
                    }}
                    className={`flex-1 p-2 flex items-center justify-center gap-2 py-2.5  rounded-lg
              text-sm font-medium transition
              ${
                activeRole === "student"
                  ? "bg-blue-900 text-white"
                  : "bg-blue-900 text-white hover:bg-blue-600"
              }`}
                  >
                    <User size={16} />
                    Student
                  </Link>

                  <Link
                    href="/employer-login"
                    onClick={() => {
                      setActiveRole("employer");
                      setShowLoginDropdown(false);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg
              text-sm font-medium transition
              ${
                activeRole === "employer"
                  ? "bg-blue-900 text-white"
                  : "bg-blue-900 text-white hover:bg-blue-600"
              }`}
                  >
                    <Briefcase size={16} />
                    Employer
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-5 py-4 space-y-4 text-sm font-medium text-gray-800">
            {/* HOME */}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-emerald-600 font-semibold"
            >
              <HiOutlineHome className="text-xl" />
              Home
            </Link>

            {/* CAMPUS COURSES */}
            <div>
              <button
                onClick={() => setOpen(open === "campus" ? null : "campus")}
                className="flex w-full items-center justify-between py-2"
              >
                <span className="flex items-center gap-3">
                  <HiOutlineAcademicCap className="text-xl" />
                  Campus Courses
                </span>
                <FiChevronDown
                  className={`transition-transform ${
                    open === "campus" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === "campus" ? "max-h-[1000px]" : "max-h-0"
                }`}
              >
                {/* ENGINEERING */}
                <div className="pl-5 py-3">
                  <div className="flex gap-3 mb-2">
                    <span className="w-1 h-5 bg-[#163683] rounded" />
                    <p className="text-xs font-semibold text-[#163683]">
                      ENGINEERING COURSES
                    </p>
                  </div>
                  <div className="pl-4 space-y-2">
                    {[
                      ["B.Tech Computer Science", "/btech-cs"],
                      ["B.Tech Electronics", "/btech-ece"],
                      ["B.Tech Mechanical", "/btech-mech"],
                      ["M.Tech Programs", "/mtech"],
                      ["Diploma Engineering", "/diploma"],
                    ].map(([label, href]) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-sm hover:text-emerald-600"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* MANAGEMENT */}
                <div className="pl-5 py-3">
                  <div className="flex gap-3 mb-2">
                    <span className="w-1 h-5 bg-[#163683] rounded" />
                    <p className="text-xs font-semibold text-[#163683]">
                      MANAGEMENT COURSES
                    </p>
                  </div>
                  <div className="pl-4 space-y-2">
                    {[
                      ["MBA Programs", "/mba"],
                      ["BBA Programs", "/bba"],
                      ["PGDM", "/pgdm"],
                      ["Executive MBA", "/executive-mba"],
                    ].map(([label, href]) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-sm hover:text-emerald-600"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* DATA SCIENCE */}
                <div className="pl-5 py-3">
                  <div className="flex gap-3 mb-2">
                    <span className="w-1 h-5 bg-[#163683] rounded" />
                    <p className="text-xs font-semibold text-[#163683]">
                      DATA SCIENCE
                    </p>
                  </div>
                  <div className="pl-4 space-y-2">
                    {[
                      ["B.Sc Data Science", "/bsc-ds"],
                      ["M.Sc Data Science", "/msc-ds"],
                      ["AI / ML Programs", "/ai-ml"],
                      ["Business Analytics", "/business-analytics"],
                    ].map(([label, href]) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-sm hover:text-emerald-600"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* jobs */}
            {/* ================= JOBS ================= */}
            <div>
              <button
                onClick={() => setOpen(open === "jobs" ? null : "jobs")}
                className="flex w-full items-center justify-between py-2"
              >
                <span className="flex items-center gap-3">
                  <FiBriefcase className="text-lg" />
                  Jobs
                </span>
                <FiChevronDown
                  className={`transition-transform ${
                    open === "jobs" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === "jobs" ? "max-h-300" : "max-h-0"
                }`}
              >
                {/* TOP LOCATIONS */}
                <div className="pl-5 py-3">
                  <div className="flex gap-3 mb-2">
                    <span className="w-1 h-5 bg-[#163683] rounded" />
                    <p className="text-xs font-semibold text-[#163683]">
                      TOP LOCATIONS
                    </p>
                  </div>
                  <div className="pl-4 space-y-2">
                    {[
                      ["Work from Home", "/jobs"],
                      ["Jobs in Delhi", "/jobs"],
                      ["Jobs in Mumbai", "/jobs"],
                      ["Jobs in Bangalore", "/jobs"],
                      ["Jobs in Hyderabad", "/jobs"],
                      ["Jobs in Kolkata", "/jobs"],
                      ["Jobs in Chennai", "/jobs"],
                      ["Jobs in Pune", "/jobs"],
                      ["Jobs in Jaipur", "/jobs"],
                    ].map(([label, href]) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-sm hover:text-emerald-600"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* TOP CATEGORIES */}
                <div className="pl-5 py-3">
                  <div className="flex gap-3 mb-2">
                    <span className="w-1 h-5 bg-[#163683] rounded" />
                    <p className="text-xs font-semibold text-[#163683]">
                      TOP CATEGORIES
                    </p>
                  </div>
                  <div className="pl-4 space-y-2">
                    {[
                      "Software Engineer",
                      "Data Analyst",
                      "Product Manager",
                      "Marketing Specialist",
                      "UI/UX Designer",
                      "DevOps Engineer",
                      "Business Analyst",
                      "Sales Executive",
                    ].map((label) => (
                      <Link
                        key={label}
                        href={`/jobs/${label
                          .toLowerCase()
                          .replace(/\s/g, "-")}`}
                        onClick={() => setMobileOpen(false)}
                        className="block text-sm hover:text-emerald-600"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* EXPLORE MORE JOBS */}
                <div className="pl-5 py-3">
                  <div className="flex gap-3 mb-2">
                    <span className="w-1 h-5 bg-[#163683] rounded" />
                    <p className="text-xs font-semibold text-[#163683]">
                      EXPLORE MORE JOBS
                    </p>
                  </div>
                  <div className="pl-4 space-y-2">
                    {[
                      ["View all jobs", "/jobs"],
                      ["Remote Jobs", "/jobs/remote"],
                      ["Part-time Jobs", "/jobs/part-time"],
                      ["Freelance Jobs", "/jobs/freelance"],
                    ].map(([label, href]) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-sm hover:text-emerald-600"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* PLACEMENT COURSES WITH AI */}
                <div className="pl-5 py-3">
                  <div className="flex gap-3 mb-2">
                    <span className="w-1 h-5 bg-[#163683] rounded" />
                    <p className="text-xs font-semibold text-[#163683]">
                      PLACEMENT COURSES WITH AI
                    </p>
                  </div>
                  <div className="pl-4 space-y-2">
                    {[
                      ["AI Placement Course", "/campus-courses"],
                      ["Data Science Bootcamp", "/campus-courses"],
                      ["Full Stack Development", "/campus-courses"],
                      ["Digital Marketing", "/campus-courses"],
                    ].map(([label, href]) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-sm hover:text-emerald-600"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* INTERNSHIPS */}
            <div>
              <button
                onClick={() =>
                  setOpen(open === "internships" ? null : "internships")
                }
                className="flex w-full items-center justify-between py-2"
              >
                <span className="flex items-center gap-3">
                  <FiBriefcase className="text-lg" />
                  Internships
                </span>
                <FiChevronDown
                  className={`transition-transform ${
                    open === "internships" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === "internships" ? "max-h-[800px]" : "max-h-0"
                }`}
              >
                <div className="pl-5 py-3">
                  <div className="flex gap-3 mb-2">
                    <span className="w-1 h-5 bg-[#163683] rounded" />
                    <p className="text-xs font-semibold text-[#163683]">
                      TECH INTERNSHIPS
                    </p>
                  </div>
                  <div className="pl-4 space-y-2">
                    {[
                      ["Software Development", "/internships/software"],
                      ["Web Development", "/internships/web"],
                      ["Data Science", "/internships/data"],
                      ["AI / ML", "/internships/ai"],
                    ].map(([label, href]) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-sm hover:text-emerald-600"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* LEARN SKILLS */}
            <Link
              href="/skills"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 py-2"
            >
              <FiZap className="text-lg" />
              Learn Skills
            </Link>

            {/* LOGIN */}
            <div className="pt-4 border-t">
              <Link
                href="/student-login"
                onClick={() => setMobileOpen(false)}
                className="block text-center py-2 rounded-md bg-[#163683] text-white"
              >
                Student Login
              </Link>
            </div>
            <div className="pt-4 ">
              <Link
                href="/employer-login"
                onClick={() => setMobileOpen(false)}
                className="block text-center py-2 rounded-md bg-[#163683] text-white"
              >
                Employer Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
