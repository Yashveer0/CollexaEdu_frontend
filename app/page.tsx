"use client";
import "./globals.css";
import Link from "next/link";
import { FiUsers, FiHome, FiGlobe, FiBriefcase } from "react-icons/fi";
import Image from "next/image";
import { useRef } from "react";
import EnquiryPopup from "./(components)/EnquiryPopup";
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
  const { getPublicJobs, getPublicInternships , getPublicCampusCourses, getCertificationCourses } = useAuth();

  const internshipTabs = [
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

  const [activeInternshipTab, setActiveInternshipTab] = useState("Big brands");

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
    bg: "/bg_Unbiased_Guidance.jpeg",
  },
  {
    title: "Expert Insights",
    desc: "Get advice and direction shaped by industry experts who understand real-world skills, hiring trends, and career pathways.",
    icon: UserCheck,
    bg: "/bg_Expert_Insights.jpeg",
  },
  {
    title: "AI-Powered Intelligence",
    desc: "Our AI analyzes your profile, preferences, and goals to match you with the most relevant opportunities faster and smarter.",
    icon: Brain,
    bg: "/bg_AI-Powered_Intelligence.jpeg",
  },
  {
    title: "End-to-End Solutions",
    desc: "From exploration and shortlisting to application and guidance — Collexa supports you at every step of your journey.",
    icon: Layers,
    bg: "/bg_End-to-End_Solutions.jpeg",
  },
  {
    title: "Strong Industry Connections",
    desc: "Access opportunities through our growing network of trusted companies, universities, and hiring partners.",
    icon: Network,
    bg: "/bg_industry_connections.jpeg",
  },
  {
    title: "Success-Focused Approach",
    desc: "We measure our success by yours — ensuring clarity, confidence, and outcomes that truly move your career forward.",
    icon: BadgeCheck,
    bg: "/bg_success.jpeg",
  },
];


 const images = [
    "/img01.jpeg",
    "/img02.jpeg",
    "/img03.jpeg",
    "/img04.jpeg",
    "/img05.jpeg",
    "/img06.jpeg",
    "/img07.jpeg",
    "/img09.jpeg"
  ];

  const [activeJobTab, setActiveJobTab] = useState("Big brands");
  const [fetchedJobs, setFetchedJobs] = useState<any[]>([]);
  const [fetchedInternships, setFetchedInternships] = useState<any[]>([]);
  const [fetchedCampusCourses, setFetchedCampusCourses] = useState<any[]>([]);
  const [fetchedCertificationCourses, setFetchedCertificationCourses] = useState<any[]>([]);

  const sliderRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const slider = sliderRef.current;
  if (!slider) return;

  const interval = setInterval(() => {
    if (
      slider.scrollLeft + slider.offsetWidth >=
      slider.scrollWidth
    ) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: 350, behavior: "smooth" });
    }
  }, 3000); // 3 seconds

  return () => clearInterval(interval);
}, []);


//  job
  useEffect(() => {
    const fetchJobs = async () => {
      if (getPublicJobs) {
        const data = await getPublicJobs({ category: activeJobTab });
        
        
        if (Array.isArray(data)) {
          setFetchedJobs(data);
        } else if (data && data.jobs) {
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
        const data = await getPublicInternships({ category: activeInternshipTab });
        
        
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
  }, [activeInternshipTab, getPublicInternships]);
  

  const [activeCourseTab, setActiveCourseTab] = useState("Engineering");
//  campush courses
  useEffect(() => {
    const fetchCampusCourses = async () => {
      if (getPublicCampusCourses) {
        const data = await getPublicCampusCourses({ category: activeCourseTab });
        
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

  //  certification courses
  useEffect(() => {
    const fetchCertificationCourses = async () => {
      if (getCertificationCourses) {
        try {
          const data = await getCertificationCourses({ category: activeSkillCategory });
          
          let coursesData = [];
          if (Array.isArray(data)) {
            coursesData = data;
          } else if (data && Array.isArray(data.courses)) {
            coursesData = data.courses;
          }
          setFetchedCertificationCourses(coursesData);
        } catch (error) {
          console.error("Failed to fetch certification courses:", error);
          setFetchedCertificationCourses([]);
        }
      }
    };
    fetchCertificationCourses();
  }, [activeSkillCategory, getCertificationCourses]);

  return (
    <div className="bg-[#f7fbff] overflow-hidden ">
      <EnquiryPopup />
      {/* ------------------------------------------------ */}
      {/* ⭐ HERO SECTION */}
      {/* ------------------------------------------------ */}
      <section  className="max-w-7xl mx-auto  px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="md:mt-30 mt-12">
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
            src="/main_img.png"
            width={450}
            height={450}
            alt="learning"           
            className="drop-shadow-lg mt-5"
          />
        </div>
      </section>



      {/* ------------------------------------------------ */}
      {/* ⭐ STATS STRIP */}
      {/* ------------------------------------------------ */}
      <section className="bg-gradient-to-r text-white from-blue-900 to-emerald-400  py-8">
        <div className="max-w-7xl text-white mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Students */}
          <div className="flex flex-col items-center text-center gap-2">
            <FiUsers size={22} className="text-white" />
          <Stat  number="500+" label="Students" />
          </div>

          {/* Institutions */}
          <div className="flex flex-col items-center text-center gap-2">
            <FiHome size={22} className="text-white" />
            <Stat number="150+" label="Institutions" />
          </div>

          {/* Countries */}
          <div className="flex flex-col items-center text-center gap-2">
            <FiGlobe size={22} className="text-text" />
            <Stat number="10+" label="Countries" />
          </div>

          {/* Recruiters */}
          <div className="flex flex-col items-center text-center gap-2">
            <FiBriefcase size={22} className="text-white" />
            <Stat number="100+" label="Recruiters" />
          </div>
        </div>
      </section>


      {/* Universities Marquee */}
      <section className="bg-gray-100 py-10 overflow-hidden">
  <div className="max-w-7xl mx-auto px-4">

    
    

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
            ref={sliderRef}
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
    flex gap-3
    mt-6 px-4
    flex-nowrap md:flex-wrap
    overflow-x-auto md:overflow-visible
    scrollbar-hide
    justify-start md:justify-center
  "
>
  {courseTabs.map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveCourseTab(tab)}
      className={`
        px-5 py-2 rounded-full border text-sm whitespace-nowrap transition shrink-0
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
                className="min-w-80 md:min-w-90 bg-white rounded-2xl border shadow-sm snap-start p-5 hover:shadow-xl transition flex flex-col justify-between h-full"
              >
                <div>
                  {/* HEADER */}
                  <div className="flex justify-between items-start mb-3">
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700 shrink-0">
                        <GraduationCap size={20} />
                      </div>
                      <div className="flex-1 min-w-0 ">
                        <p className="font-bold text-gray-800 text-sm md:truncate">
  {(() => {
    const name = c.university || c.universityName || "University";
    return window.innerWidth < 768 && name.length > 28
      ? name.slice(0, 28) + "..."
      : name;
  })()}
</p>

                        <span className="text-[10px] font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full inline-block mt-0.5">
                          {c.type || "Course"}
                        </span>
                      </div>
                    </div>


                  </div>

                  {/* TITLE */}
                  <h3 className="text-lg text-gray-900 font-bold mt-2 line-clamp-2 leading-tight h-14">
                    {c.title || c.courseName || "Untitled Course"}
                  </h3>
                  <p className="text-gray-500 text-sm mt-0 line-clamp-2 h-10">
                    {c.desc || c.description || "No description available."}
                  </p>

                  {/* INFO ROW */}
                  <div className="flex flex-wrap gap-2 text-gray-600 mt-4 text-xs font-medium">
                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 border border-gray-100 rounded-md">
                      <Star className="text-yellow-500 fill-yellow-500" size={12} /> {c.rating || "4.5"}
                    </div>

                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 border border-gray-100 rounded-md">
                      <Clock3 size={12} /> {c.duration || "Flexible"}
                    </div>

                    <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 border border-gray-100 rounded-md">
                      <Users size={12} /> {c.enrolledCount || "0"} Enrolled
                    </div>
                  </div>
                </div>
                  
                <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center"> 
                  <span className="text-xs font-semibold text-white bg-[#143481] px-4 py-2.5 rounded-md">
                    {c.level || "Beginner"}
                  </span>
                  
                  <JobApplyModal title={c.title || c.courseName} btn_text="Enroll Now" data={c} />
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
    flex gap-3
    mt-6 px-4
    flex-nowrap md:flex-wrap
    overflow-x-auto md:overflow-visible
    scrollbar-hide
    justify-start md:justify-center
  "
>
  {jobTabs.map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveJobTab(tab)}
      className={`
        px-5 py-2 rounded-full border text-sm whitespace-nowrap transition shrink-0
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
    <span className="border text-white bg-[#143481] px-4 py-1.5 rounded-md ">
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
    flex gap-3
    mt-6 px-4
    flex-nowrap md:flex-wrap
    overflow-x-auto md:overflow-visible
    scrollbar-hide
    justify-start md:justify-center
  "
>
  {internshipTabs.map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveInternshipTab(tab)}
      className={`
        px-5 py-2 rounded-full border text-sm whitespace-nowrap
        transition shrink-0
        ${
          activeInternshipTab === tab
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
                  <span className="border text-white bg-[#143481] px-4 py-1.5 rounded-md">
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
    flex gap-3
    mt-6 px-4
    flex-nowrap md:flex-wrap
    overflow-x-auto md:overflow-visible
    scrollbar-hide
    justify-start md:justify-center
  "
>
  {categories.map((cat) => (
    <button
      key={cat}
      onClick={() => setActiveSkillCategory(cat)}
      className={`
        px-5 py-2 rounded-full border text-sm whitespace-nowrap
        transition shrink-0
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
            {fetchedCertificationCourses.length > 0 ? (
              fetchedCertificationCourses.map((c, i) => (
                <div
                  key={c._id || i}
                  className="min-w-75 md:min-w-90 bg-white rounded-2xl border shadow-sm snap-start p-6 hover:shadow-xl transition"
                >
                  {/* TOP TAGS */}
                  <div className="flex justify-between">
                    {c.badge && (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                        {c.badge}
                      </span>
                    )}

                    {c.level && (
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs">
                        {c.level}
                      </span>
                    )}
                  </div>

                  {/* TITLE */}
                  <h3 className="text-lg text-blue-700 font-semibold mt-3">
                    {c.title}
                  </h3>
                  <p className="text-gray-500">{c.instructor}</p>

                  {/* RATING */}
                  <p className="flex items-center gap-1 text-sm text-gray-700 mt-3">
                    <Star size={16} className="text-yellow-400" />
                    {c.rating} ({c.studentsEnrolled} students)
                  </p>

                  {/* DURATION */}
                  <p className="text-sm text-gray-600 mt-2">{c.duration} • {c.category}</p>

                  <hr className="my-4" />

                  {/* PRICE ROW */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xl text-blue-700 font-bold">{c.currency}{c.currentPrice}</p>
                      <p className="text-gray-400 text-sm line-through">
                        {c.currency}{c.originalPrice}
                      </p>
                    </div>

                    <JobApplyModal title={c.title} btn_text="Enroll Now" data={c} />

                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center py-10 text-gray-500">
                No courses found for {activeSkillCategory}
              </div>
            )}
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
          <div className="relative w-full h-40 overflow-hidden">
            <Image
              src={uni.img}
              alt="University campus"
              fill
              className="object-contain"
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
  className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
>

  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-110 transition duration-500"
    style={{ backgroundImage: `url(${item.bg})` }}
  ></div>

  {/* Blur Overlay */}
  <div className="absolute inset-0 bg-black/40 "></div>

  {/* Content */}
  <div className="relative z-10 p-6 text-white">
    
    <div className="w-14 h-14 mb-4 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
      <item.icon className="w-8 h-8 text-white" />
    </div>

    <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-200 transition">
      {item.title}
    </h3>

    <p className="text-md font-semibold text-gray-200 leading-relaxed">
      {item.desc}
    </p>

  </div>
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
      <p className="text-white  font-semibold">{label}</p>
    </div>
  );
}
