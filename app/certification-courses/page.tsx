"use client";
import { useState, useEffect } from "react";
import { FaRocket, FaStar } from "react-icons/fa";
import Link from "next/link";
import { FiSearch, FiFilter, FiChevronDown, FiHelpCircle, FiAward, FiBookOpen, FiCheckCircle, FiUsers, FiShield } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth, CertificationCourseType } from "../context_api/AuthContext";
import JobApplyModal from "../(components)/JobApplyModal";

export default function CertificationCoursesPage() {
  const { getCertificationCourses } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
const [showFilters, setShowFilters] = useState(false);

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

  const [courses, setCourses] = useState<CertificationCourseType[]>([]);
  const [loading, setLoading] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await getCertificationCourses({ keyword: search,
  category: category,});
      if (Array.isArray(data)) {
        setCourses(data);
      } else if (data?.courses) {
        setCourses(data.courses);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching certification courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchCourses();
}, [category]);


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
          <h4 className="font-semibold text-[#0B2B6B]">{title}</h4>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">{desc}</p>
        </div>
      </div>
    );
  }

  const faqs = [
    {
      q: "Are these certifications industry-recognized?",
      a: "Yes, our certifications are designed in collaboration with industry experts and are recognized by top employers.",
    },
    {
      q: "How do I access the course material?",
      a: "Once enrolled, you will get lifetime access to the course materials through our learning portal.",
    },
    {
      q: "Is there a refund policy?",
      a: "We offer a 7-day money-back guarantee if you are not satisfied with the course content.",
    },
    {
      q: "Do I get a certificate upon completion?",
      a: "Yes, you will receive a verified certificate upon successful completion of the course and assessments.",
    },
  ];

  return (
    <section className="w-full bg-[#F7FBFF] py-12 md:py-20">
      <div className="max-w-7xl mt-20 mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-3xl text-blue-700 md:text-5xl font-bold leading-tight">
            Master new skills with <br />
            <span className="text-emerald-500">Professional Certifications</span>
          </h1>

          <p className="mt-6 text-gray-600 text-base md:text-lg max-w-xl">
            Upskill yourself with our premium certification courses designed by industry experts. 
            Advance your career and stand out in the job market.
          </p>

          {/* TAGS */}
          <div className="mt-8 space-y-3">
            <div className="flex text-gray-700 flex-wrap gap-3">
              <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-sm font-medium">Industry-ready curriculum</span>
              </div>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                <span className="text-sm font-medium">Expert Mentors</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="relative">
          <div className="rounded-2xl shadow-xl bg-gray-100 w-full h-[340px] md:h-[380px] overflow-hidden group">
            <img
              src="/certification-courses.jpeg"
              alt="Certification Illustration"
              className="w-full h-full object-contain md:object-cover transition-all duration-[1200ms] ease-[cubic-bezier(.17,.67,.27,1)] group-hover:scale-[1.03]"
            />
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="w-full bg-[#F7FAFF] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2B6B]">
              Why Choose Our <span className="text-emerald-500">Certifications</span>?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
              Get certified and gain the competitive edge you need in today's job market.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<FiAward />}
              title="Recognized Certificates"
              desc="Earn certificates that add value to your resume and LinkedIn profile."
            />
            <FeatureCard
              icon={<FiUsers />}
              title="Expert Instructors"
              desc="Learn directly from professionals working in top companies."
            />
            <FeatureCard
              icon={<FiBookOpen />}
              title="Practical Learning"
              desc="Hands-on projects and assignments to apply what you learn."
            />
          </div>
        </div>
      </div>

      {/* COURSES LIST SECTION */}
      <div className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B2B6B]">
              Explore Certification Courses
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Find the perfect course to upgrade your skills
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="border rounded-lg px-4 py-3 flex items-center shadow-sm">
              <span className="text-gray-500 mr-2"><FiSearch className="text-gray-500 text-lg" /></span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by course title, instructor, or category..."
                className="w-full outline-none bg-transparent text-gray-700"
              />
            </div>

            <div className="flex items-center justify-between mt-3 text-sm">
             <button
  onClick={() => setShowFilters(!showFilters)}
  className={`border px-3 py-1.5 rounded-lg flex items-center gap-1 transition ${
    showFilters
      ? "bg-blue-50 border-blue-200 text-blue-700"
      : "text-gray-600 hover:bg-gray-50"
  }`}
>
  <FiFilter /> Advanced Filters
</button>

              <p className="text-gray-500">{courses.length} Courses found</p>
            </div>
          </div>
<AnimatePresence>
  {showFilters && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div className="mt-4 p-5 bg-white border rounded-xl shadow-sm">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Filter by Category
        </p>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("")}
            className={`px-4 py-1.5 text-xs rounded-full border ${
              category === ""
                ? "bg-[#0B2B6B] text-white border-[#0B2B6B]"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-700"
            }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 text-xs rounded-full border ${
                category === cat
                  ? "bg-[#0B2B6B] text-white border-[#0B2B6B]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
          {/* Search Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => fetchCourses()}
              className="bg-[#0B2B6B] hover:bg-[#123c9c] text-white px-6 py-2 rounded-lg shadow"
            >
              Search Courses →
            </button>
          </div>
          

          {/* COURSES GRID */}
          <div className="max-w-6xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p className="col-span-full text-center text-gray-500 py-10">Loading courses...</p>
            ) : courses.length > 0 ? (
              courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                      {course.badge && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-medium">
                          {course.badge}
                        </span>
                      )}
                      <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                        {course.level}
                      </span>
                    </div>

                    <h3 className="font-semibold text-[#0B2B6B] text-lg leading-tight">
                      {course.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      by {course.instructor}
                    </p>

                    {/* Rating & Students */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-3">
                      <span className="flex items-center gap-1 text-yellow-500 font-medium">
                        <FaStar /> {course.rating}
                      </span>
                      <span>• {course.studentsEnrolled} students</span>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                      <span>○ {course.duration}</span>
                      <span>○ {course.category}</span>
                    </div>

                    {/* Price */}
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-lg font-bold text-[#0B2B6B]">
                        {course.currency}{course.currentPrice}
                      </span>
                      {course.originalPrice > course.currentPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {course.currency}{course.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t">
                    <JobApplyModal title={course.title} btn_text="Enroll Now" data={course} />
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 py-10">
                No certification courses match your search
              </p>
            )}
          </div>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="w-full bg-[#F2F6FF] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
              <FiHelpCircle size={22} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2B6B]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="bg-white border rounded-xl overflow-hidden transition">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex justify-between items-center text-left px-6 py-4 text-[#0B2B6B] font-medium"
                  >
                    <span>{item.q}</span>
                    <FiChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
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

          <div className="text-center mt-12">
            <Link href="/contact">
              <button className="bg-[#0B2B6B] hover:bg-[#123c9c] text-white px-6 py-2 rounded-lg shadow transition">
                Contact Support
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
