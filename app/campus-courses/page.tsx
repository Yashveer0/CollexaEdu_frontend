"use client";
import { useState } from "react";
import { FaRocket, FaBuilding, FaUserFriends } from "react-icons/fa";
import Link from "next/link";
import { FiSearch , FiUser , FiSend  , FiFilter } from "react-icons/fi";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiUserCheck,
  
  FiBookOpen,
  
  FiAward,
  FiShield,
} from "react-icons/fi";

import {
  FiTrendingUp,
  FiCheckCircle,
  FiMapPin,
  FiUsers,
  FiBarChart2,
  FiZap,
} from "react-icons/fi";





import { MdMenuBook } from "react-icons/md";
export default function InternshipHero() {

 const demoCourses = [
  {
    id: 1,
    title: "BCA - Bachelor of Computer Applications",
    university: "Online University A",
    level: "UG",
    duration: "3 Years",
    mode: "Online",
    tags: ["Programming", "IT", "Software"],
  },
  {
    id: 2,
    title: "BBA - Bachelor of Business Administration",
    university: "Online University B",
    level: "UG",
    duration: "3 Years",
    mode: "Online",
    tags: ["Management", "Marketing", "Finance"],
  },
  {
    id: 3,
    title: "B.Com - Bachelor of Commerce",
    university: "Open University",
    level: "UG",
    duration: "3 Years",
    mode: "Distance",
    tags: ["Accounting", "Finance"],
  },
  {
    id: 4,
    title: "MCA - Master of Computer Applications",
    university: "Tech University",
    level: "PG",
    duration: "2 Years",
    mode: "Online",
    tags: ["Software", "AI", "Data Science"],
  },
  {
    id: 5,
    title: "MBA - General",
    university: "Business School X",
    level: "PG",
    duration: "2 Years",
    mode: "Online",
    tags: ["HR", "Marketing", "Finance"],
  },
  {
    id: 6,
    title: "MBA - Business Analytics",
    university: "Business School X",
    level: "PG",
    duration: "2 Years",
    mode: "Online",
    tags: ["Analytics", "Data", "BI"],
  },
];


  const [search, setSearch] = useState("");

  const filtered = demoCourses.filter((course) =>
  `${course.title} ${course.university} ${course.tags.join(" ")}`
    .toLowerCase()
    .includes(search.toLowerCase())
);
  
  /* Reusable Card */
function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group bg-white border rounded-2xl p-6 flex gap-4 items-start transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]">
      <div className="w-16 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center group-hover:bg-blue-800 transition">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-[#0B2B6B]">
          {title}
        </h4>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

const faqs = [
    {
      q: "Are online and distance learning degrees recognized?",
      a: "Yes. All listed online and distance learning programs are offered by UGC-approved universities and recognized institutions, ensuring their validity for higher education and employment.",
    },
    {
      q: "How do I apply for a course?",
      a: "You can apply directly through the course page by submitting your details and required documents. Our team will guide you through the admission process step by step.",
    },
    {
      q: "What is the eligibility criteria for different courses?",
      a: "Eligibility varies by program. Undergraduate courses usually require completion of 10+2, while postgraduate programs require a relevant bachelor’s degree.",
    },
    {
      q: "Can I switch specializations or courses after enrollment?",
      a: "In some cases, switching specializations is allowed within a defined time window. This depends on the university and course guidelines.",
    },
    {
      q: "What is the fee structure and payment options?",
      a: "Fees vary by course and university. Most programs offer flexible payment options including semester-wise or installment-based payments.",
    },
    {
      q: "How are classes conducted in online/distance learning?",
      a: "Classes are delivered through live sessions, recorded lectures, digital study material, discussion forums, and virtual assessments.",
    },
    {
      q: "What support services are available for students?",
      a: "Students receive academic support, technical assistance, mentor guidance, and dedicated counselors throughout the course duration.",
    },
    {
      q: "How are exams conducted and what is the evaluation process?",
      a: "Exams may be conducted online or at designated centers depending on the university. Evaluation includes assignments, quizzes, and final examinations.",
    },
    {
      q: "Will I receive placement assistance after course completion?",
      a: "Yes, many programs include career support such as resume building, interview preparation, and access to placement opportunities.",
    },
    {
      q: "Can I pursue these courses while working full-time?",
      a: "Absolutely. These programs are designed for flexibility, allowing working professionals to balance studies with their jobs.",
    },
    {
      q: "What documents are required for admission?",
      a: "Common documents include academic certificates, ID proof, photographs, and any course-specific requirements set by the university.",
    },
    {
      q: "How long does it take to complete a course?",
      a: "Course duration depends on the program. Undergraduate courses usually take 3 years, while postgraduate courses typically take 2 years.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="w-full bg-[#F7FBFF] py-12 md:py-20">
      <div className="max-w-7xl mt-20 mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-3xl text-blue-700 md:text-5xl font-bold leading-tight">
            Discover top <br />
            <span className="text-emerald-500">campus courses</span> <br />
            to accelerate your learning
          </h1>

          <p className="mt-6 text-gray-600 text-base md:text-lg max-w-xl">
            Explore a curated selection of verified courses from leading educators. Whether you're looking to upskill, explore a new field, or advance your academic journey — find the perfect course for you.
          </p>

          {/* TAGS */}
          <div className="mt-8 space-y-3">

            <div className="flex text-gray-700 flex-wrap gap-3">
              <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-sm font-medium">Expert instructors
                </span>
              </div>

              <div className="flex  items-center gap-2 border rounded-lg px-3 py-1.5 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                <span className="text-sm  font-medium">
                  Campus-verified content
                </span>
              </div>
            </div>

            <div className="flex text-gray-700">
              <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-sm font-medium">
                  Certification on completion
                </span>
              </div>
            </div>

          </div>
        </div>

{/* RIGHT IMAGE SECTION */}
<div className="relative">

  {/* IMAGE CONTAINER */}
  <div className="rounded-2xl shadow-xl bg-gray-100 w-full h-[340px] md:h-[380px] overflow-hidden group">
    <img
      src="/course.jpg"
      alt="Internship Illustration"
      className="w-full h-full object-contain md:object-cover transition-all duration-[1200ms] ease-[cubic-bezier(.17,.67,.27,1)] group-hover:scale-[1.03]"
    />
  </div>

  {/* BADGES WRAPPER */}
  <div className="
    mt-6 
    flex flex-col gap-3 
    md:mt-0 md:flex-row md:gap-6
    md:absolute md:-bottom-6 md:left-0 md:right-0 
    md:justify-between md:px-10
  ">

    {/* BADGE 1 */}
    <div
      className="bg-white shadow-xl border rounded-xl px-6 py-3
      transition-all duration-700 ease-[cubic-bezier(.17,.67,.27,1)]
      hover:scale-110 active:scale-105 cursor-pointer w-fit mx-auto md:mx-0"
    > 

      <p className="text-lg text-black text-center">
        Available courses
      </p>
      <p className="text-sm text-gray-500 font-semibold text-center">
        1,200+ options
      </p>
    </div>

    {/* BADGE 2 */}
    <div
      className="bg-white shadow-xl border rounded-xl px-6 py-3
      transition-all duration-700 ease-[cubic-bezier(.17,.67,.27,1)]
      hover:scale-110 active:scale-105 cursor-pointer w-fit mx-auto md:mx-0"
    >
      <p className="text-lg text-black text-center">
        Campuses collaborating
      </p>
      <p className="text-sm text-gray-500 font-semibold text-center">
        100+ institutions
      </p>
    </div>
  </div>

</div>


      </div>

      {/* compus-courses part 2 */}
      <div className="w-full bg-[#F7FAFF] py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2B6B]">
            Why Explore <span className="text-emerald-500">Campus Courses</span>?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            Curated courses from leading campuses, designed to accelerate your
            learning and support your academic journey.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1 */}
          <FeatureCard
            icon={<FiUserCheck />}
            title="Expert Instructors"
            desc="Learn from top campus faculty and industry leaders who bring real-world experience."
          />

          {/* Card 2 */}
          <FeatureCard
            icon={<FiCheckCircle />}
            title="Verified Curriculum"
            desc="Courses thoroughly vetted and approved by participating institutions."
          />

          {/* Card 3 */}
          <FeatureCard
            icon={<FiBookOpen />}
            title="Diverse Subjects"
            desc="Choose from a wide range of academic disciplines and skill-based offerings."
          />

          {/* Card 4 */}
          <FeatureCard
            icon={<FiUsers />}
            title="Collaborative Learning"
            desc="Engage and connect with peers through group projects and discussions."
          />

          {/* Card 5 */}
          <FeatureCard
            icon={<FiAward />}
            title="Certification"
            desc="Earn credible certificates on successful completion to boost your CV."
          />

          {/* Card 6 */}
          <FeatureCard
            icon={<FiShield />}
            title="Campus Recognition"
            desc="Courses recognized and supported by top universities and colleges."
          />

        </div>
      </div>
    </div>

      
    {/* part 3 */}
     <div className="w-full py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2B6B]">
            Discover Campus Courses
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Find the perfect courses and programs from top universities and institutions
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto">
          <div className="border rounded-lg px-4 py-3 flex items-center shadow-sm">
            <span className="text-gray-500 mr-2"><FiSearch className="text-gray-500 text-lg" /></span>
            <input    
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by course, university, or specialization..."
              className="w-full outline-none bg-transparent text-gray-700"
            />
          </div>

          <div className="flex items-center justify-between mt-3 text-sm">
            <button className="border text-gray-600 px-3 py-1.5 rounded-lg flex items-center justify-center gap-1">
              <FiFilter /> Advanced Filters
            </button>

            <p className="text-gray-500">
              {filtered.length} Courses found
            </p>
          </div>
        </div>

        {/* Search Button */}
        <div className="text-center mt-8">
          <button className="bg-[#0B2B6B] hover:bg-[#123c9c] text-white px-6 py-2 rounded-lg shadow">
            Search Courses →
          </button>
        </div>
<div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {filtered.map((course) => (
    <div
      key={course.id}
      className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-[#0B2B6B] text-sm">
          {course.title}
        </h3>
        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
          {course.level}
        </span>
      </div>

      {/* University */}
      <p className="text-xs text-gray-500 mt-1">
        ○ {course.university}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mt-3">
        <span>○ {course.duration}</span>
        <span>○ {course.mode}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {course.tags.map((tag, i) => (
          <span
            key={i}
            className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="text-right mt-4">
        <button className="text-sm text-[#0B2B6B] font-medium hover:underline">
          View details →
        </button>
      </div>
    </div>
  ))}

  {filtered.length === 0 && (
    <p className="col-span-full text-center text-gray-500 py-10">
      No courses match your search
    </p>
  )}
</div>

      </div>
    </div>

    {/* part 4 */}
    <div className="w-full bg-[#F2F6FF] py-20 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
            <FiHelpCircle size={22} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2B6B]">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Find answers to common questions about our campus courses, admission
            process, and more.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border rounded-xl overflow-hidden transition"
              >
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="w-full flex justify-between items-center text-left px-6 py-4 text-[#0B2B6B] font-medium"
                >
                  <span>{item.q}</span>
                  <FiChevronDown
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
      className="px-6 pb-5 text-sm text-gray-600 leading-relaxed overflow-hidden"
    >
      {item.a}
    </motion.div>
  )}
</AnimatePresence>


              </div>
            );
          })}
        </div>

        {/* Support CTA */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-600 mb-4">
            Still have questions?
          </p>
          <button className="bg-[#0B2B6B] hover:bg-[#123c9c] text-white px-6 py-2 rounded-lg shadow transition">
            Contact Our Support Team
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <h3 className="text-2xl font-bold text-[#0B2B6B]">
            Ready to Start Your Learning Journey?
          </h3>
          <p className="text-gray-600 text-sm mt-3 max-w-xl mx-auto">
            Explore courses from top universities and take the next step in your
            career.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link href="/campus-courses">
              <button className="bg-[#0B2B6B] text-white px-6 py-2 rounded-lg shadow hover:bg-[#123c9c] transition">
                Browse Courses →
              </button>
            </Link>

            <Link href="/contact">
            <button className="border border-[#0B2B6B] text-[#0B2B6B] px-6 py-2 rounded-lg hover:bg-blue-50 transition">
              Talk to Counselor
            </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
    </section>
  );
}
