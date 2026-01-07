"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { FiBriefcase } from "react-icons/fi";
import { FiZap } from "react-icons/fi";




export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSub, setOpenSub] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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
            <HiOutlineAcademicCap className="text-gray-900 text-xl" /> Campus Courses <ChevronDown size={16} />

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
                

                <Link href="#" className="block mt-1 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  B.Tech Computer Science
                </Link>

                <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  B.Tech Electronics
                </Link>

                <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  B.Tech Mechanical
                </Link>

                <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  M.Tech Programs
                </Link>

                <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  B.Tech Mechanical
                </Link>

                

              </div>
            )}

             {/* ⭐ SUB Management — SHOWS ON RIGHT */}
            {openSub === "management" && openMenu === "campus" && (
              <div className="absolute top-8 text-lg font-light left-65 rounded-r-md bg-white shadow-md  p-11.5 text-nowrap">
                

                <Link href="#" className="block mt-1 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  MBA Programs
                </Link>

                <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  BBA Programs
                </Link>

                <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  PGDM
                </Link>

                <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  Executive MBA
                </Link>               
              

              </div>
            )}

            {/* ⭐ SUB computer — SHOWS ON RIGHT */}
            {openSub === "computer" && openMenu === "campus" && (
              <div className="absolute top-8 text-lg font-light left-65 rounded-r-md bg-white shadow-md  p-11.5 text-nowrap">
            
                <Link href="#" className="block mt-1 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  B.Sc Computer Science
                </Link>

                <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  M.Sc Computer Science
                </Link>

                <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  BCA
                </Link>

                <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  MCA
                </Link>               
              

              </div>
            )}

            {/* ⭐ SUB data  — SHOWS ON RIGHT */}
            {openSub === "data" && openMenu === "campus" && (
              <div className="absolute top-8 text-lg font-light left-65 rounded-r-md bg-white shadow-md  p-11.5 text-nowrap">                  

                <Link href="#" className="block mt-1 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  B.Sc Data Science
                </Link>

                <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  M.Sc Data Science
                </Link>

                <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  AI/ML Programs
                </Link>

                <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
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
  <FiBriefcase className="text-gray-900 text-lg mr-2" /> Earning <ChevronDown size={16} />

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

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        Software Development
      </Link>

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        Web Development
      </Link>

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        Mobile App Development
      </Link>

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        Data Science
      </Link>

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        AI / ML
      </Link>

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        Cybersecurity
      </Link>
    </div>
  )}

    {/* MARKETING SUB MENU ⭐ */}

  {openSub === "marketing" && openMenu === "earning" && (
    <div className="absolute top-8 left-50 bg-white shadow-md rounded-md p-8 text-nowrap">

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        Digital Marketing
      </Link>

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        Content Creation
      </Link>

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        Social Media Marketing
      </Link>

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        SEO/SEM
      </Link>

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        Brand Management
      </Link>

      
    </div>
  )}
    {/* FINANCE SUB MENU ⭐ */}

  {openSub === "finance" && openMenu === "earning" && (
    <div className="absolute top-8 left-50 bg-white shadow-md rounded-md p-8 text-nowrap">

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        Investment Banking
      </Link>

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        Financial Analysis
      </Link>

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        Risk Management
      </Link>

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        Corporate Finance
      </Link>

      

      
    </div>
  )}
    {/* DESIGN SUB MENU ⭐ */}
   {openSub === "design" && openMenu === "earning" && (
    <div className="absolute top-8 left-50 bg-white shadow-md rounded-md p-8 text-nowrap">

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        UI/UX Design
      </Link>

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        Graphic Design
      </Link>

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        Product Design
      </Link>

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        Web Design
      </Link>

      

      
    </div>
  )}
    {/* BUSINESS SUB MENU ⭐ */}
    {openSub === "business" && openMenu === "earning" && (
    <div className="absolute top-8 left-50 bg-white shadow-md rounded-md p-8 text-nowrap">
            
      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        Business Development
      </Link>

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        Operations
      </Link>

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
        Strategy
      </Link>

      <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
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


    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      Work from Home
    </Link>

    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      Jobs in Delhi
    </Link>

    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      Jobs in Mumbai
    </Link>

    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      Jobs in Bangalore
    </Link>

    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      Jobs in Hyderabad
    </Link>

    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      Jobs in Kolkata
    </Link>

    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      Jobs in Chennai
    </Link><Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      Jobs in Pune
    </Link><Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      Jobs in Jaipur
    </Link>
  </div>
)}

{/* ⭐ CATEGORIES SUB MENU ⭐ */}
{openSub === "categories" && openMenu === "earning" && (
  <div className="absolute top-8 left-50 bg-white shadow-md rounded-md p-8 text-nowrap">
    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      Software Engineer
    </Link>

    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      Data Analyst
    </Link>

    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      Product Manager
    </Link>

    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      Marketing Specialist
    </Link>

    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      UI/UX Designer
    </Link>

    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      DevOps Engineer
    </Link>

    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      Business Analyst
    </Link><Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      Sales Executive
    </Link>
    
  </div>
)}

{/* ⭐ MORE JOBS SUB MENU ⭐ */}
{openSub === "more_jobs" && openMenu === "earning" && (
  <div className="absolute top-8 left-50 bg-white shadow-md rounded-md p-8 text-nowrap">
    
    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      View all jobs
    </Link>

    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      Remote Jobs
    </Link>

    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      Part-time Jobs
    </Link>

    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      Freelance Jobs
    </Link>
    
  </div>
)}
{/* ⭐ PLACEMENT COURSES SUB MENU ⭐ */}
{openSub === "placement" && openMenu === "earning" && (
  <div className="absolute top-8 left-50 bg-white shadow-md rounded-md p-8 text-nowrap">

    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      AI Placement Course
    </Link>

    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      Data Science Bootcamp
    </Link>

    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
      Full Stack Development
    </Link>

    <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
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
            <FiZap className="text-gray-900 text-lg mr-2" /> Learn Skills <ChevronDown size={16} />

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

                <Link href="#" className="block mt-1 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  Python Masterclass
                </Link>

                <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  JavaScript Deep Dive
                </Link>

                <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  Java Programming
                </Link>

                <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  C++ Programming
                </Link>

                <Link href="#" className="block px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  Go Programming
                </Link>

                

              </div>
            )}

             {/* ⭐ SUB web — SHOWS ON RIGHT */}
            {openSub === "web" && openMenu === "learn" && (
              <div className="absolute top-8 text-lg font-light left-75 rounded-r-md bg-white shadow-md  p-8 text-nowrap">
                

                <Link href="#" className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  React Development
                </Link>

                <Link href="#" className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  Node.js Backend
                </Link>

                <Link href="#" className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  Full Stack Development
                </Link>

                <Link href="#" className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  Next.js Framework
                </Link>

                <Link href="#" className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  Vue.js Development
                </Link>                
              

              </div>
            )}

            {/* ⭐ SUB data — SHOWS ON RIGHT */}
            {openSub === "data" && openMenu === "learn" && (
              <div className="absolute top-8 text-lg font-light left-75 rounded-r-md bg-white shadow-md  p-8 text-nowrap">
            
                <Link href="#" className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  Machine Learning
                </Link>

                <Link href="#" className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  Deep Learning
                </Link>

                <Link href="#" className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  Data Analytics
                </Link>

                <Link href="#" className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  Big Data
                </Link>   
                          
              <Link href="#" className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  AI Fundamentals  
                </Link> 

              </div>
            )}

            {/* ⭐ SUB marketing  — SHOWS ON RIGHT */}
            {openSub === "marketing" && openMenu === "learn" && (
              <div className="absolute top-8 text-lg font-light left-75 rounded-r-md bg-white shadow-md  p-8 text-nowrap">             

                <Link href="#" className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  SEO Mastery
                </Link>

                <Link href="#" className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  Google Ads
                </Link>

                <Link href="#" className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  Social Media Marketing
                </Link>

                <Link href="#" className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  Content Marketing
                </Link>   

                <Link href="#" className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  Email Marketing  
                </Link>             
              

              </div>
            )}


            {/* ⭐ SUB design  — SHOWS ON RIGHT */}
            {openSub === "design" && openMenu === "learn" && (
              <div className="absolute top-8 text-lg font-light left-75 rounded-r-md bg-white shadow-md  p-8 text-nowrap">             
                <Link href="#" className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  UI/UX Design
                </Link>

                <Link href="#" className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  Figma Mastery
                </Link>

                <Link href="#" className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  Adobe Creative Suite
                </Link>

                <Link href="#" className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  Web Design
                </Link>   

                <Link href="#" className="block mt-2 px-3 py-1 hover:bg-gray-100 hover:text-green-400 hover:rounded-md">
                  Motion Graphics  
                </Link>             
              

              </div>
            )}

          </li>
            

          
        </ul>
        
        {/* DESKTOP BUTTONS */}
        <div className="hidden md:flex gap-4">
          <Link href="/student-login" className="px-5 py-2 rounded-md bg-[#163683] text-white text-md">
            Student Login
          </Link>
          <Link href="/employer-login" className="px-5 py-2 rounded-md bg-[#163683] text-white text-md">
            Employer Login
          </Link>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg border-t animate-slideDown">

  <div className="px-6 py-3 space-y-4 text-gray-800 font-medium">

    {/* Campus */}
    <details>
      <summary className="cursor-pointer py-2 flex items-center gap-2">
        <HiOutlineAcademicCap className="text-gray-900 text-xl" />
        <span>Campus Courses</span>
      </summary>

      <div className="pl-8 py-2 space-y-2 text-sm">

        <Link href="/engineering-courses" onClick={() => setMobileOpen(false)} className="block hover:text-blue-700">
          Engineering Courses
        </Link>

        <Link href="/management-courses" onClick={() => setMobileOpen(false)} className="block hover:text-blue-700">
          Management Courses
        </Link>

        <Link href="/computer-science" onClick={() => setMobileOpen(false)} className="block hover:text-blue-700">
          Computer Science
        </Link>

        <Link href="/data-science" onClick={() => setMobileOpen(false)} className="block hover:text-blue-700">
          Data Science
        </Link>

      </div>
    </details>


    {/* Earning */}
    <details>
      <summary className="cursor-pointer py-2 flex items-center gap-2">
        <FiBriefcase className="text-gray-900 text-lg" />
        <span>Earning</span>
      </summary>

      <div className="pl-8 py-2 space-y-2 text-sm">

        <Link href="/internship" onClick={() => setMobileOpen(false)} className="block hover:text-blue-700">
          Internships
        </Link>

        <Link href="/jobs" onClick={() => setMobileOpen(false)} className="block hover:text-blue-700">
          Jobs
        </Link>

        <Link href="/placement-courses" onClick={() => setMobileOpen(false)} className="block hover:text-blue-700">
          Placement Courses
        </Link>

      </div>
    </details>


    {/* Learn */}
    <details>
      <summary className="cursor-pointer py-2 flex items-center gap-2">
        <FiZap className="text-gray-900 text-lg" />
        <span>Learn Skills</span>
      </summary>

      <div className="pl-8 py-2 space-y-2 text-sm">

        <Link href="/skills/programming" onClick={() => setMobileOpen(false)} className="block hover:text-blue-700">
          Programming
        </Link>

        <Link href="/skills/web-development" onClick={() => setMobileOpen(false)} className="block hover:text-blue-700">
          Web Dev
        </Link>

        <Link href="/skills/data-ai" onClick={() => setMobileOpen(false)} className="block hover:text-blue-700">
          Data & AI
        </Link>

        <Link href="/skills/marketing" onClick={() => setMobileOpen(false)} className="block hover:text-blue-700">
          Marketing
        </Link>

        <Link href="/skills/design" onClick={() => setMobileOpen(false)} className="block hover:text-blue-700">
          Design
        </Link>

      </div>
    </details>


    {/* LOGIN BUTTONS */}
    <div className="pt-4 flex flex-col gap-3">

      <Link
        href="/student-login"
        onClick={() => setMobileOpen(false)}
        className="w-full text-center px-5 py-2 rounded-md bg-[#163683] text-white"
      >
        Student Login
      </Link>

      <Link
        href="/employer-login"
        onClick={() => setMobileOpen(false)}
        className="w-full text-center px-5 py-2 rounded-md bg-[#163683] text-white"
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
