"use client";
import "./globals.css";
import Link from "next/link";
import { FiUsers, FiHome, FiGlobe, FiBriefcase } from "react-icons/fi";
import Image from "next/image";
import { useRef } from "react";

import { useState } from "react";
import {
  
  Users,
  Star,
 
  TrendingUp,
  GraduationCap,
  Building2,
  Award,
  Clock3,
  MapPin,
  Wallet,
  ChevronLeft,
  ChevronRight,
  Globe,
  BrainCircuit,
} from "lucide-react";
 import {
  Scale,
  UserCheck,
  Brain,
  Layers,
  Network,
  BadgeCheck,
} from "lucide-react";
import { useEffect } from "react";

import TestimonialsMarquee from "./(components)/TestimonialsMarquee";
import JobApplyModal from "./(components)/JobApplyModal";
import { useAuth } from "./context_api/AuthContext";

export default function Home() {
  const { getPublicJobs, getPublicInternships , getPublicCampusCourses } = useAuth();

  const tabs = [
    "Big brands",
    "Work from home",
    "Part-time",
    "MBA",
    "Engineering",
    "Media",
    "Design",
    "Data Science",
    "Accounting",
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

  const [activeSkillCategory, setActiveSkillCategory] =
    useState("Digital Skills");

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

  const universities = [
  { img: "/assect/img1.JPG", logo: "/assect/logo1.JPG", name: "Jain University Online" },
  { img: "/assect/img2.JPG", logo: "/assect/logo2.JPG", name: "LPU Online" },
  { img: "/assect/img3.JPG", logo: "/assect/logo3.JPG", name: "Online Manipal" },
  { img: "/assect/img4.JPG", logo: "/assect/logo4.JPG", name: "Chandigarh University Online" },
  { img: "/assect/img5.JPG", logo: "/assect/logo5.JPG", name: "Amity University Online" },
  { img: "/assect/img6.JPG", logo: "/assect/logo6.JPG", name: "SMU Online" },
  { img: "/assect/img7.JPG", logo: "/assect/logo7.JPG", name: "Uttaranchal University Online" },
  { img: "/assect/img8.JPG", logo: "/assect/logo8.JPG", name: "DPU Online" },
  { img: "/assect/img9.JPG", logo: "/assect/logo9.JPG", name: "UPES Online" },
  { img: "/assect/img10.JPG", logo: "/assect/logo10.JPG", name: "VGU Online" },
  { img: "/assect/img11.JPG", logo: "/assect/logo11.JPG", name: "Vignan University Online" },
  { img: "/assect/img12.JPG", logo: "/assect/logo12.JPG", name: "Shoolini University Online" },
  ];

 const logos = [
  "/assect/logo1.JPG",
  "/assect/logo2.JPG",
  "/assect/logo3.JPG",
  "/assect/logo4.JPG",
  "/assect/logo5.JPG",
  "/assect/logo6.JPG",
  "/assect/logo7.JPG",
  "/assect/logo8.JPG",
  "/assect/logo9.JPG",
  "/assect/logo10.JPG",
  "/assect/logo11.JPG",
  "/assect/logo12.JPG",
 ];


 const features = [
  {
    title: "Unbiased Guidance",
    desc: "We provide transparent and honest recommendations, focused only on what’s best for your career — no hidden agendas, no favoritism.",
    icon: Scale,
  },
  {
    title: "Expert Insights",
    desc: "Get advice and direction shaped by industry experts who understand real-world skills, hiring trends, and career pathways.",
    icon: UserCheck,
  },
  {
    title: "AI-Powered Intelligence",
    desc: "Our AI analyzes your profile, preferences, and goals to match you with the most relevant opportunities faster and smarter.",
    icon: Brain,
  },
  {
    title: "End-to-End Solutions",
    desc: "From exploration and shortlisting to application and guidance — Collexa supports you at every step of your journey.",
    icon: Layers,
  },
  {
    title: "Strong Industry Connections",
    desc: "Access opportunities through our growing network of trusted companies, universities, and hiring partners.",
    icon: Network,
  },
  {
    title: "Success-Focused Approach",
    desc: "We measure our success by yours — ensuring clarity, confidence, and outcomes that truly move your career forward.",
    icon: BadgeCheck,
  },
 ];

 const images = [
    "/img1.jpeg",
    "/img2.jpeg",
    "/img3.jpeg",
    "/img4.jpeg",
    "/img5.jpeg",
    "/img6.jpeg",
    "/img7.jpeg",
    "/img9.jpeg"
  ];

  const [activeJobTab, setActiveJobTab] = useState("Work from home");
  const [fetchedJobs, setFetchedJobs] = useState<any[]>([]);
  const [fetchedInternships, setFetchedInternships] = useState<any[]>([]);
  const [fetchedCampusCourses, setFetchedCampusCourses] = useState<any[]>([]);

//  job
  useEffect(() => {
    const fetchJobs = async () => {
      if (getPublicJobs) {
        const data = await getPublicJobs({ keyword: activeJobTab });
        console.log(data);
        if (data && data.jobs) {
          setFetchedJobs(data.jobs);
        } else {
          setFetchedJobs([]);
        }
      }
    };
    fetchJobs();
  }, [activeJobTab, getPublicJobs]);
// intership
  useEffect(() => {
    const fetchInternships = async () => {
      if (getPublicInternships) {
        const data = await getPublicInternships({ keyword: active });
        console.log(data);
        if (Array.isArray(data)) {
          setFetchedInternships(data);
        } else if (data && data.internships) {
          setFetchedInternships(data.internships);
        } else {
          setFetchedInternships([]);
        }
      }
    };
    fetchInternships();
  }, [active, getPublicInternships]);
  

  const [activeCourseTab, setActiveCourseTab] = useState("Engineering");
//  campush courses
  useEffect(() => {
    const fetchCampusCourses = async () => {
      if (getPublicCampusCourses) {
        const data = await getPublicCampusCourses({ category: activeCourseTab });
        console.log( "campus " ,data);
        if (Array.isArray(data)) {
          setFetchedCampusCourses(data);
        } else if (data && data.campusCourses) {
          setFetchedCampusCourses(data.campusCourses);
        } else {
          setFetchedCampusCourses([]);
        }
      }
    };
    fetchCampusCourses();
  }, [activeCourseTab, getPublicCampusCourses]);

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
            Explore career opportunities, connect with leading employers, and
            access world-class learning programs.
          </p>

          <div className="mt-6 flex md:flex-row flex-col gap-4">
            <Link href="/campus-courses">
              <button className="bg-blue-900 text-white px-6 py-3 cursor-pointer rounded-lg">
                Explore Courses
              </button>
            </Link>

            <Link href="/jobs">
              <button className="border px-6 py-3 hover:bg-blue-900 hover:text-white  border-gray-700 text-gray-700 cursor-pointer rounded-lg">
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
      <section className="bg-[#83e0c6]  py-8">
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
      {/* Universities Marquee */}
      <section className="bg-gray-100 py-10 overflow-hidden">
  <div className="max-w-7xl mx-auto px-4">

    {/* Heading (optional – hata bhi sakte ho) */}
    

    {/* Marquee Container */}
    <div className="relative w-full overflow-hidden">
      <div className="flex w-max marquee gap-10">

        {/* First set */}
        {logos.map((logo, index) => (
          <div
            key={`logo-1-${index}`}
            className="flex items-center justify-center min-w-[160px]"
          >
            <img
              src={logo}
              alt="University Logo"
              className="h-14 object-contain transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}

        {/* Duplicate set for seamless loop */}
        {logos.map((logo, index) => (
          <div
            key={`logo-2-${index}`}
            className="flex items-center justify-center min-w-[160px]"
          >
            <img
              src={logo}
              alt="University Logo"
              className="h-14 object-contain transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}

      </div>
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
            className="hidden md:flex absolute text-white -left-4 top-1/2 -translate-y-1/2 bg-blue-900 shadow-lg p-2 rounded-full z-10"
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
                <Image
                  src={src}
                  alt="Home_hero_image"
                  width={1400}
                  height={700}
                  priority
                  className="w-full h-full md:h-full object-cover rounded-2xl shadow-sm"
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
            className="hidden md:flex text-white absolute -right-4 top-1/2 -translate-y-1/2 bg-blue-900 shadow-lg p-2 rounded-full z-10"
          >
            <ChevronRight />
          </button>
        </div>
      </section>

      

      {/* ⭐ CAMPUS COURSES */}
      
      <div className="w-full bg-[#f8fbff] py-14">
        
        <div className="text-center px-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0c2c66]">
            Campus Courses
          </h1>
          <p className="text-gray-500 mt-2">
            Discover courses and certifications from industry experts for your
            campus
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
            className="hidden md:flex text-white absolute left-0 top-1/2 -translate-y-1/2 bg-[#153483] shadow-md p-2 rounded-full z-10"
          >
            ◀
          </button>

          {/* SLIDER */}
          <div
            id="campus-slider"
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 scrollbar-hide"
          >
            {fetchedCampusCourses.length > 0 ? (
              fetchedCampusCourses.map((c, i) => (
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

                  <span className="text-gray-700 text-xs ">🔝 Top</span>
                </div>

                {/* TITLE */}
                <h3 className="text-lg text-gray-700 font-bold mt-3">
                  {c.title}
                </h3>
                <p className="text-gray-500 text-sm">{c.desc}</p>

                {/* INFO ROW */}
                <div className="flex gap-3 text-gray-700 mt-4 text-sm">
                  <div className="flex text-gray-700 items-center gap-1 px-3 py-2 border rounded-lg">
                    <Star className="text-yellow-400" size={16} /> {c.rating}{" "}
                    Rating
                  </div>

                  <div className="flex items-center  gap-1 px-3 py-2 border rounded-lg">
                    <Clock3 size={16} /> {c.duration}
                  </div>

                  <div className="flex items-center gap-1 px-3 py-2 border rounded-lg">
                    <Users size={16} /> {c.enrolled} Enrolled
                  </div>
                </div>
                  
                  <div className="mt-4 flex justify-between "> 
                <div className="mt-5   text-gray-700">
                  <span className="border px-2 py-1 rounded-full text-xs">
                    {c.level}
                  </span>
                  
                  
                </div>
                <JobApplyModal title={c.title} btn_text="Enroll Now" />
              </div>

              </div>
            ))
            ) : (
              <div className="w-full text-center py-10 text-gray-500">
                No courses found for {activeCourseTab}
              </div>
            )}
          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={() =>
              document.getElementById("campus-slider")?.scrollBy({
                left: 340,
                behavior: "smooth",
              })
            }
            className="hidden md:flex text-white absolute right-0 top-1/2 -translate-y-1/2 bg-[#153483] shadow-md p-2 rounded-full z-10"
          >
            ▶
          </button>
        </div>
      </div>{" "}

       
       {/* job section  */}
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
            className="hidden md:flex text-white absolute left-0 top-1/2 -translate-y-1/2 bg-[#153483] shadow-md p-2 rounded-full z-10"
          >
            ◀
          </button>

          {/* SLIDER */}
          <div
            id="jobs-slider"
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
          >
            {fetchedJobs.length > 0 ? fetchedJobs.map((job, i) => (
              <div
  key={i}
  className="min-w-75 md:min-w-90 bg-white rounded-2xl border shadow-sm snap-start p-6 hover:shadow-xl transition"
>
  {/* COMPANY LOGO (ONE IMAGE ONLY) */}
  
  {/* HIRING TAG */}
  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs">
    🟢 Actively hiring
  </span>

  {/* TITLE */}
  <h3 className="text-lg text-gray-700 font-semibold mt-3">
    {job.jobTitle || job.title}
  </h3>
  <p className="text-gray-500">{job.company?.name}</p>

  {/* DETAILS */}
  <div className="mt-4 space-y-2 text-sm text-gray-600">
    <p className="flex gap-2">
      <MapPin size={16} className="text-blue-500" />
      {job.jobType || job.type}
    </p>

    <p className="flex gap-2">
      <Wallet size={16} className="text-purple-600" />
      {job.salaryMin} - {job.salaryMax}
    </p>
  </div>

  <hr className="my-4" />

  {/* CTA ROW */}
  <div className="flex justify-between items-center">
    <span className="border px-3 text-gray-700 py-1 rounded-full text-xs">
      Job
    </span>

    <JobApplyModal
      title={job.jobTitle || job.title}
      btn_text="Apply"
      data={job}
    />
  </div>
</div>


            )) : (
              <div className="w-full text-center py-10 text-gray-500">
                No jobs found for {activeJobTab}
              </div>
            )}

            
          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={() =>
              document.getElementById("jobs-slider")?.scrollBy({
                left: 340,
                behavior: "smooth",
              })
            }
            className="hidden md:flex text-white absolute right-0 top-1/2 -translate-y-1/2 bg-[#153483] shadow-md p-2 rounded-full z-10"
          >
            ▶
          </button>
        </div>
      </div>



      {/* intership*/}
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
              document
                .getElementById("intern-slider")
                ?.scrollBy({ left: -320, behavior: "smooth" })
            }
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-[#153483] text-white shadow-md p-2 rounded-full z-10"
          >
            ◀
          </button>

          {/* SLIDER */}
          <div
            id="intern-slider"
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
          >
            {fetchedInternships.length > 0 ? fetchedInternships.map((intern, i) => (
              <div
                key={i}
                className="min-w-75 md:min-w-90 bg-white rounded-2xl border shadow-sm snap-start p-6 hover:shadow-xl transition"
              >
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs">
                  Actively hiring
                </span>

                <h3 className="text-lg font-semibold text-gray-600 mt-3">
                  {intern.title || intern.role || "Internship Role"}
                </h3>
                <p className="text-gray-500">{intern.company?.name || "Company Name"}</p>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-blue-500" />
                    {intern.location || intern.city || "Location"}
                  </p>
                  <p className="flex items-center gap-2">
                    <Wallet size={16} className="text-purple-600" />
                    {intern.stipendMin && intern.stipendMax
                      ? `${intern.stipendMin} - ${intern.stipendMax}`
                      : intern.stipend || intern.salary || "Unpaid"}
                  </p>
                  <p className="flex items-center gap-2">
                    {intern.duration || "Duration N/A"}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <span className="border text-purple-700 px-3 py-1 rounded-full text-xs">
                    Internship
                  </span>

                  <JobApplyModal title={intern.title || intern.role} btn_text="Apply" data={intern} />
                </div>
              </div>
            )) : (
              <div className="w-full text-center py-10 text-gray-500">
                No internships found
              </div>
            )}
          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={() =>
              document
                .getElementById("intern-slider")
                ?.scrollBy({ left: 320, behavior: "smooth" })
            }
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-[#153483] shadow-md p-2 rounded-full z-10 text-white"
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
            Master professional skills and boost your career with expert-led
            courses
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
            className="hidden md:flex text-white absolute left-0 top-1/2 -translate-y-1/2 bg-[#153483] shadow-md p-2 rounded-full z-10"
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
                <h3 className="text-lg text-blue-700 font-semibold mt-3">
                  {c.title}
                </h3>
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
                    <p className="text-gray-400 text-sm line-through">
                      {c.old}
                    </p>
                  </div>

                  <JobApplyModal title={c.title} btn_text="Enroll Now" />

                  
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
            className="hidden md:flex text-white absolute right-0 top-1/2 -translate-y-1/2 bg-[#153483] shadow-md p-2 rounded-full z-10"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Universities Section */}
      <section className="bg-white py-16">
  <div className="max-w-7xl mx-auto px-4 ">

    {/* Heading */}
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-bold text-[#0b3c5d]">
        Top Online & Distance Education Universities in 2026
      </h2>
      <p className="mt-3 text-gray-700 max-w-4xl mx-auto text-sm md:text-base">
        Explore updated information about leading UGC-DEB-approved universities
        offering online & distance education in the January 2026 academic session.
      </p>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {universities.map((uni, index) => (
        <div
          key={index}
          className="border border-gray-200 bg-white"
        >
          {/* University Image */}
          <div className="relative w-full h-36 overflow-hidden">
            <Image
              src={uni.img}
              alt="University campus"
              fill
              className="object-cover"
            />
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center py-3 bg-white">
            <Image
              src={uni.logo}
              alt="University logo"
              width={90}
              height={40}
              className="object-contain"
            />
          </div>
        </div>
      ))}
    </div>

  </div>
</section>



      {/* why chose collexa ? */}
      <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-12">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
    Why Choose <span className="text-blue-600">Collexa</span>?
  </h2>
  <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
    A smarter, unbiased, and technology-driven platform built to guide you from
    discovery to success — without confusion or compromise.
  </p>
</div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <div className="w-14 h-14 mb-4 rounded-xl bg-blue-50 flex items-center justify-center">
                <item.icon className="w-8 h-8 text-blue-600" />
              </div>

              {/* Text */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
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
