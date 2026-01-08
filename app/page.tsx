"use client";
import "./globals.css";
import Link from "next/link";
import { FiUsers, FiHome, FiGlobe, FiBriefcase } from "react-icons/fi";

import { useState } from "react";
import {
  Briefcase,
  BookOpen,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  GraduationCap,
  Building2,
  Award, Clock3 , MapPin, Wallet , ChevronLeft, ChevronRight
} from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";

import TestimonialsMarquee from "./(components)/TestimonialsMarquee";

export default function Home() {
  const [activeTab, setActiveTab] = useState("engineering");
  const [activeInternTab, setActiveInternTab] = useState("tech");

  const tabs = [
    "Big brands",
    "Work from home",
    "Part-time",
    "MBA",
    "Engineering",
    "Media",
    "Design",
    "Data Science",
  ];

  const [active, setActive] = useState("Big brands");

  const categories = [
    "Digital Skills",
    "Communication",
    "Leadership",
    "Technical Skills",
    "Creative Skills",
    "Business Skills",
    "Personal Development",
    "Industry Specific",
  ];

  const [activeSkillCategory, setActiveSkillCategory] = useState("Digital Skills");


  const courses = [
    {
      tag: "Popular",
      level: "Beginner",
      title: "Digital Marketing Complete Course",
      institute: "Digital Pro Institute",
      rating: "4.7 (18.4k students)",
      duration: "8 weeks • Digital Marketing",
      price: "₹1,999",
      old: "₹5,999",
    },
    {
      tag: "Popular",
      level: "Intermediate",
      title: "Social Media Marketing Mastery",
      institute: "Social Experts",
      rating: "4.6 (12.3k students)",
      duration: "6 weeks • Social Media",
      price: "₹1,499",
      old: "₹3,999",
    },
    {
      tag: "Popular",
      level: "Intermediate",
      title: "Social Media Marketing Mastery",
      institute: "Social Experts",
      rating: "4.6 (12.3k students)",
      duration: "6 weeks • Social Media",
      price: "₹1,499",
      old: "₹3,999",
    },
    {
      tag: "Popular",
      level: "Intermediate",
      title: "Social Media Marketing Mastery",
      institute: "Social Experts",
      rating: "4.6 (12.3k students)",
      duration: "6 weeks • Social Media",
      price: "₹1,499",
      old: "₹3,999",
    },
    {
      tag: "Beginner",
      level: "Beginner",
      title: "Google Analytics & SEO Fundamentals",
      institute: "SEO Academy",
      rating: "4.5 (9.9k students)",
      duration: "7 weeks • Analytics",
      price: "₹1,799",
      old: "₹4,499",
    },
  ];

   const courseTabs = [
    "Engineering",
    "Management",
    "Technology",
    "Business",
    "Design",
    "Healthcare",
    "Arts",
    "Science",
  ];

  const jobTabs = [
    "Big brands",
    "Work from home",
    "Part-time",
    "MBA",
    "Engineering",
    "Media",
    "Design",
    "Data Science",
  ];

  const [activeJobTab, setActiveJobTab] = useState("Work from home");

  const jobs = [
    {
      title: "Graphic Designer And Video Editor",
      company: "Glasscard",
      type: "Work From Home",
      salary: "₹4,80,000 - 6,60,000 /year",
    },
    {
      title: "B2C Sales Associate",
      company: "AI Certs",
      type: "Work From Home",
      salary: "₹2,00,000 - 3,00,000 /year",
    },
    {
      title: "Machine Learning & Deep Learning Developer",
      company: "Qriocity Ventures Private Limited",
      type: "Work From Home",
      salary: "₹3,00,000 - 3,50,000 /year",
    },
    {
      title: "B2C Sales Associate",
      company: "AI Certs",
      type: "Work From Home",
      salary: "₹2,00,000 - 3,00,000 /year",
    },
    {
      title: "Machine Learning & Deep Learning Developer",
      company: "Qriocity Ventures Private Limited",
      type: "Work From Home",
      salary: "₹3,00,000 - 3,50,000 /year",
    },
    {
      title: "B2C Sales Associate",
      company: "AI Certs",
      type: "Work From Home",
      salary: "₹2,00,000 - 3,00,000 /year",
    },
    {
      title: "Machine Learning & Deep Learning Developer",
      company: "Qriocity Ventures Private Limited",
      type: "Work From Home",
      salary: "₹3,00,000 - 3,50,000 /year",
    },
  ];

  const [activeCourseTab, setActiveCourseTab] = useState("Engineering");

  const courses2 = [
    
      
    {
      university: "IIT Bombay",
      type: "B.Tech",
      title: "B.Tech Mechanical",
      desc: "Learn design, manufacturing, and thermal systems",
      rating: "4.8",
      duration: "4 Years",
      enrolled: "950",
      level: "Undergraduate",
    },
    {
      university: "IIT Madras",
      type: "B.Tech",
      title: "B.Tech Civil",
      desc: "Build infrastructure and construction expertise",
      rating: "4.7",
      duration: "4 Years",
      enrolled: "800",
      level: "Undergraduate",
    },
    {
      university: "IIT Delhi",
      type: "B.Tech",
      title: "B.Tech Computer Science",
      desc: "Master programming, algorithms, and software development",
      rating: "4.9",
      duration: "4 Years",
      enrolled: "1.2k",
      level: "Undergraduate",
    },
    {
      university: "IIT Bombay",
      type: "B.Tech",
      title: "B.Tech Mechanical",
      desc: "Learn design, manufacturing, and thermal systems",
      rating: "4.8",
      duration: "4 Years",
      enrolled: "950",
      level: "Undergraduate",
    },
    {
      university: "IIT Madras",
      type: "B.Tech",
      title: "B.Tech Civil",
      desc: "Build infrastructure and construction expertise",
      rating: "4.7",
      duration: "4 Years",
      enrolled: "800",
      level: "Undergraduate",
    },
  ];

    const images = [
    "/photo1-min.png",
    "/photo2-min.png",
    "/photo1-min.png",
    "/photo2-min.png",
    "/photo1-min.png",
    "/photo2-min.png",
  ];

  return (
    <div className="bg-[#f7fbff] overflow-hidden">

      {/* ------------------------------------------------ */}
      {/* ⭐ HERO SECTION */}
      {/* ------------------------------------------------ */}
      <section className="max-w-7xl mx-auto  px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        <div className="mt-30">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Launch your career <br />
            with <span className="text-blue-700">Collexa</span>
          </h1>

          <p className="text-gray-600 max-w-lg mt-4">
            Explore career opportunities, connect with leading employers,
            and access world-class learning programs.
          </p>

          <div className="mt-6 flex md:flex-row flex-col gap-4">
            <Link href="/campus-courses">
            <button className="bg-blue-900 text-white px-6 py-3 cursor-pointer rounded-lg">
              Explore Courses           
            </button>
            </Link>
            
            <Link href="/jobs">
            <button className="border px-6 py-3 hover:text-green-500 border-gray-700 text-gray-700 cursor-pointer rounded-lg">
              Find Jobs
            </button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src="/Home1.png"
            width={450}
            height={450}
            alt="learning"
            className="drop-shadow-lg"
          />
        </div>

      </section>

      {/* ------------------------------------------------ */}
      {/* ⭐ STATS STRIP */}
      {/* ------------------------------------------------ */}
     <section className="bg-white border-y py-8">
  <div className="max-w-7xl text-gray-700 mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">

    {/* Students */}
    <div className="flex flex-col items-center text-center gap-2">
      <FiUsers size={22} className="text-[#163683]" />
      <Stat number="500+" label="Students" />
    </div>

    {/* Institutions */}
    <div className="flex flex-col items-center text-center gap-2">
      <FiHome size={22} className="text-[#163683]" />
      <Stat number="150+" label="Institutions" />
    </div>

    {/* Countries */}
    <div className="flex flex-col items-center text-center gap-2">
      <FiGlobe size={22} className="text-[#163683]" />
      <Stat number="10+" label="Countries" />
    </div>

    {/* Recruiters */}
    <div className="flex flex-col items-center text-center gap-2">
      <FiBriefcase size={22} className="text-[#163683]" />
      <Stat number="100+" label="Recruiters" />
    </div>

  </div>
</section>



      {/* ------------------------------------------------ */}
      {/* ⭐ TRENDING NOW */}
      {/* ------------------------------------------------ */}

     <section className="w-full bg-[#f8fbff] py-14">
      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-[#0c2c66] flex items-center justify-center gap-2 px-4">
        Trending now <TrendingUp className="text-blue-600" />
      </h1>

      {/* SLIDER WRAPPER */}
      <div className="relative max-w-6xl mx-auto mt-10 px-6">

        {/* LEFT BTN (Desktop only) */}
        <button
          onClick={() =>
            document.getElementById("trending-slider")?.scrollBy({
              left: -350,
              behavior: "smooth",
            })
          }
          className="hidden md:flex absolute text-gray-700 -left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full z-10" 
        >
          <ChevronLeft />
        </button>

        {/* SLIDER */}
        <div
          id="trending-slider"
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="min-w-65 sm:min-w-75 md:min-w-85 snap-start"
            >
              <img
                src={src}
                alt="Trending"
                className="w-full h-[180px] md:h-[220px] object-cover rounded-2xl shadow-sm hover:shadow-xl transition"
              />
            </div>
          ))}
        </div>

        {/* RIGHT BTN */}
        <button
          onClick={() =>
            document.getElementById("trending-slider")?.scrollBy({
              left: 350,
              behavior: "smooth",
            })
          }
          className="hidden md:flex text-gray-700 absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full z-10"
        >
          <ChevronRight />
        </button>
      </div>
    </section>

      {/* ------------------------------------------------ */}
      {/* ⭐ CAMPUS COURSES */}
      {/* ------------------------------------------------ */}
      
<div className="w-full bg-[#f8fbff] py-14">

      {/* TITLE */}
      <div className="text-center px-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0c2c66]">
          Campus Courses
        </h1>
        <p className="text-gray-500 mt-2">
          Discover courses and certifications from industry experts for your campus
        </p>
      </div>

      {/* TABS */}
      <div
        className="
          flex gap-3 justify-center md:justify-center
          mt-6 px-6
          flex-nowrap md:flex-wrap
          overflow-x-auto md:overflow-visible
          scrollbar-hide
        "
      >
        {courseTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveCourseTab(tab)}
            className={`
              px-5 py-2 rounded-full border text-sm whitespace-nowrap transition
              ${
                activeCourseTab === tab
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* SLIDER CONTAINER */}
      <div className="relative max-w-7xl mx-auto mt-10 px-6">

        {/* LEFT BUTTON */}
        <button
          onClick={() =>
            document.getElementById("campus-slider")?.scrollBy({
              left: -340,
              behavior: "smooth",
            })
          }
          className="hidden md:flex text-gray-700 absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          ◀
        </button>

        {/* SLIDER */}
        <div
          id="campus-slider"
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 scrollbar-hide"
        >
          {courses2.map((c, i) => (
            <div
              key={i}
              className="min-w-80 md:min-w-90 bg-white rounded-2xl border shadow-sm snap-start p-4 hover:shadow-xl transition"
            >
              {/* HEADER */}
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold text-gray-700 flex items-center gap-1">
                    <GraduationCap size={18} /> {c.university}
                  </p>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {c.type}
                  </span>
                </div>

                <span className="text-gray-700 text-xs ">
                  🔝 Top
                </span>
              </div>

              {/* TITLE */}
              <h3 className="text-lg text-gray-700 font-bold mt-3">{c.title}</h3>
              <p className="text-gray-500 text-sm">{c.desc}</p>

              {/* INFO ROW */}
              <div className="flex gap-3 text-gray-700 mt-4 text-sm">

                <div className="flex text-gray-700 items-center gap-1 px-3 py-2 border rounded-lg">
                  <Star className="text-yellow-400" size={16} /> {c.rating} Rating
                </div>

                <div className="flex items-center  gap-1 px-3 py-2 border rounded-lg">
                  <Clock3 size={16} /> {c.duration}
                </div>

                <div className="flex items-center gap-1 px-3 py-2 border rounded-lg">
                  <Users size={16} /> {c.enrolled} Enrolled
                </div>

              </div>

              <div className="mt-5 text-gray-700">
                <span className="border px-3 py-1 rounded-full text-xs">
                  {c.level}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={() =>
            document.getElementById("campus-slider")?.scrollBy({
              left: 340,
              behavior: "smooth",
            })
          }
          className="hidden md:flex text-gray-700 absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          ▶
        </button>
      </div>

      
    </div>      {/* -------------------Find Your Next Career Opportunity ----------------------------- */}
<div className="w-full bg-[#f8fbff] py-14">

      {/* TITLE */}
      <div className="text-center px-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0c2c66]">
          Find Your Next Career Opportunity
        </h1>
        <p className="text-gray-500 mt-2">
          Discover jobs from top companies across India
        </p>
      </div>

      {/* TABS */}
      <div
        className="
          flex gap-3 justify-center md:justify-center
          mt-6 px-6
          flex-nowrap md:flex-wrap
          overflow-x-auto md:overflow-visible
          scrollbar-hide
        "
      >
        {jobTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveJobTab(tab)}
            className={`
              px-5 py-2 rounded-full border text-sm whitespace-nowrap transition
              ${
                activeJobTab === tab
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* SLIDER CONTAINER */}
      <div className="relative max-w-7xl mx-auto mt-10 px-6">

        {/* LEFT BUTTON */}
        <button
          onClick={() =>
            document.getElementById("jobs-slider")?.scrollBy({
              left: -340,
              behavior: "smooth",
            })
          }
          className="hidden md:flex text-gray-700 absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          ◀
        </button>

        {/* SLIDER */}
        <div
          id="jobs-slider"
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
        >
          {jobs.map((job, i) => (
            <div
              key={i}
              className="min-w-75 md:min-w-90 bg-white rounded-2xl border shadow-sm snap-start p-6 hover:shadow-xl transition"
            >
              {/* HIRING TAG */}
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs">
                🟢 Actively hiring
              </span>

              {/* TITLE */}
              <h3 className="text-lg text-gray-700 font-semibold mt-3">{job.title}</h3>
              <p className="text-gray-500">{job.company}</p>

              {/* DETAILS */}
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p className="flex gap-2">
                  <MapPin size={16} className="text-blue-500" /> {job.type}
                </p>

                <p className="flex gap-2">
                  <Wallet size={16} className="text-purple-600" />{" "}
                  {job.salary}
                </p>
              </div>

              <hr className="my-4" />

              {/* CTA ROW */}
              <div className="flex justify-between items-center">
                <span className="border px-3 text-gray-700 py-1 rounded-full text-xs">
                  Job
                </span>

                <button className="text-purple-700 font-medium">
                  View details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={() =>
            document.getElementById("jobs-slider")?.scrollBy({
              left: 340,
              behavior: "smooth",
            })
          }
          className="hidden md:flex text-gray-700 absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          ▶
        </button>
      </div>
    </div>
    
            {/* ------------------------------------------------ */}
      <div className="w-full bg-[#f8fbff] py-14">

  {/* TITLE */}
  <div className="text-center px-6">
    <h1 className="text-3xl md:text-4xl font-extrabold text-[#0c2c66]">
      Launch Your Career With Internships
    </h1>
    <p className="text-gray-500 mt-2">
      Gain practical experience with leading companies
    </p>
  </div>

  {/* FILTER TABS */}
   <div
      className="
        flex gap-3 justify-center md:justify-center
        mt-6 
        flex-nowrap md:flex-wrap
        overflow-x-auto md:overflow-visible
        scrollbar-hide
      "
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`
            px-5 py-2  rounded-full border text-sm whitespace-nowrap
            transition
            ${
              active === tab
                ? "bg-emerald-500 text-white border-emerald-500"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>

  {/* SLIDER WRAPPER */}
  <div className="relative max-w-7xl mx-auto mt-10 px-6">

    {/* LEFT BUTTON */}
    <button
      onClick={() =>
        document.getElementById("intern-slider")?.scrollBy({ left: -320, behavior: "smooth" })
      }
      className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white text-gray-600 shadow-md p-2 rounded-full z-10"
    >
      ◀
    </button>

    {/* SLIDER */}
    <div
      id="intern-slider"
      className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
    >
      {[
        {
          role: "Software Engineering Intern",
          company: "Google",
          city: "Bangalore",
          salary: "₹50,000 - 80,000 /month",
          duration: "6 Months",
        },
        {
          role: "Product Management Intern",
          company: "Amazon",
          city: "Mumbai",
          salary: "₹40,000 - 60,000 /month",
          duration: "4 Months",
        },
        {
          role: "Data Science Intern",
          company: "Microsoft",
          city: "Hyderabad",
          salary: "₹45,000 - 70,000 /month",
          duration: "6 Months",
        },
        {
          role: "ML Research Intern",
          company: "NVIDIA",
          city: "Pune",
          salary: "₹60,000 - 90,000 /month",
          duration: "6 Months",
        },
      ].map((job, i) => (
        <div
          key={i}
          className="min-w-[300px] md:min-w-[360px] bg-white rounded-2xl border shadow-sm snap-start p-6 hover:shadow-xl transition"
        >
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs">
            Actively hiring
          </span>

          <h3 className="text-lg font-semibold text-gray-600 mt-3">{job.role}</h3>
          <p className="text-gray-500">{job.company}</p>

          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>📍 {job.city}</p>
            <p>💰 {job.salary}</p>
            <p>⏳ {job.duration}</p>
          </div>

          <div className="flex justify-between items-center mt-6">
            <span className="border text-purple-700 px-3 py-1 rounded-full text-xs">
              Internship
            </span>

            <button className="text-purple-700 font-medium flex items-center gap-1">
              Apply Now →
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* RIGHT BUTTON */}
    <button
      onClick={() =>
        document.getElementById("intern-slider")?.scrollBy({ left: 320, behavior: "smooth" })
      }
      className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10 text-gray-600"
    >
      ▶
    </button>
  </div>

</div>
<div className="w-full bg-[#f8fbff] py-14">

  {/* TITLE */}
  <div className="text-center px-6">
    <h1 className="text-3xl md:text-4xl font-extrabold text-[#0c2c66]">
      What skills do you want to develop?
    </h1>
    <p className="text-gray-500 mt-2">
      Master professional skills and boost your career with expert-led courses
    </p>
  </div>

  {/* TABS */}
  <div className="
      flex gap-3 justify-center md:justify-center
      mt-6 px-6
      flex-nowrap md:flex-wrap
      overflow-x-auto md:overflow-visible
      scrollbar-hide
    "
  >
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => setActiveSkillCategory(cat)}
        className={`
          px-5 py-2 rounded-full border text-sm whitespace-nowrap transition
          ${
            activeSkillCategory === cat
              ? "bg-emerald-500 text-white border-emerald-500"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }
        `}
      >
        {cat}
      </button>
    ))}
  </div>

  {/* SLIDER CONTAINER */}
  <div className="relative max-w-7xl mx-auto mt-10 px-6">

    {/* LEFT BUTTON */}
    <button
      onClick={() =>
        document.getElementById("skills-slider")?.scrollBy({
          left: -340,
          behavior: "smooth",
        })
      }
      className="hidden md:flex text-gray-700 absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
    >
      ◀
    </button>

    {/* SLIDER */}
    <div
      id="skills-slider"
      className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
    >
      {courses.map((c, i) => (
        <div
          key={i}
          className="min-w-75 md:min-w-90 bg-white rounded-2xl border shadow-sm snap-start p-6 hover:shadow-xl transition"
        >
          {/* TOP TAGS */}
          <div className="flex justify-between">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
              {c.tag}
            </span>

            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs">
              {c.level}
            </span>
          </div>

          {/* TITLE */}
          <h3 className="text-lg text-blue-700 font-semibold mt-3">{c.title}</h3>
          <p className="text-gray-500">{c.institute}</p>

          {/* RATING */}
          <p className="flex items-center gap-1 text-sm text-gray-700 mt-3">
            <Star size={16} className="text-yellow-400" />
            {c.rating}
          </p>

          {/* DURATION */}
          <p className="text-sm text-gray-600 mt-2">{c.duration}</p>

          <hr className="my-4" />

          {/* PRICE ROW */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl text-blue-700 font-bold">{c.price}</p>
              <p className="text-gray-400 text-sm line-through">{c.old}</p>
            </div>

            <button className="text-purple-700 font-medium">
              Enroll Now →
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* RIGHT BUTTON */}
    <button
      onClick={() =>
        document.getElementById("skills-slider")?.scrollBy({
          left: 340,
          behavior: "smooth",
        })
      }
      className="hidden md:flex text-gray-700 absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
    >
      ▶
    </button>
  </div>
</div>


      {/* Testimonials Marquee */}

      

        <TestimonialsMarquee />

      
    </div>
  );
}

/* ===================================================================
   REUSABLE COMPONENTS
=================================================================== */

function Stat({ number, label }: { number: string; label: string }) {
  const numericValue = parseInt(number.replace(/\D/g, ""), 10);
  const suffix = number.replace(/[0-9]/g, "");

  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // animation duration (ms)
    const increment = Math.ceil(numericValue / (duration / 16));

    const counter = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(counter);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(counter);
  }, [numericValue]);

  return (
    <div>
      <h3 className="text-2xl font-bold">
        {count}
        {suffix}
      </h3>
      <p className="text-gray-500">{label}</p>
    </div>
  );
}


