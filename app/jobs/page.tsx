"use client";
import { useState } from "react";
import { FaRocket, FaBuilding, FaUserFriends } from "react-icons/fa";
import { FiSearch , FiUser , FiSend  , FiFilter } from "react-icons/fi";

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

    // demo data 
    
  const demoInternships = [
    { id: 1, role: "Frontend Developer Intern", company: "Google", location: "Remote" },
    { id: 2, role: "MERN Stack Intern", company: "Amazon", location: "Bangalore" },
    { id: 3, role: "React JS Intern", company: "Microsoft", location: "Hyderabad" },
  ];

  const [search, setSearch] = useState("");

  const filtered = demoInternships.filter(j =>
    j.role.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="w-full bg-[#F7FBFF] py-12 md:py-20">
      <div className="max-w-7xl mt-20 mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-3xl text-blue-700 md:text-5xl font-bold leading-tight">
            Discover top <br />
            <span className="text-emerald-500">career opportunities</span> <br />
            that match your skills
          </h1>

          <p className="mt-6 text-gray-600 text-base md:text-lg max-w-xl">
            Explore thousands of verified jobs and internships from leading companies. Whether you're a student, fresher, or experienced professional — find your next big role effortlessly.
          </p>

          {/* TAGS */}
          <div className="mt-8 space-y-3">

            <div className="flex text-gray-700 flex-wrap gap-3">
              <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-sm font-medium">
                  Verified employers
                </span>
              </div>

              <div className="flex  items-center gap-2 border rounded-lg px-3 py-1.5 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                <span className="text-sm  font-medium">
                  Smart job matches
                </span>
              </div>
            </div>

            <div className="flex text-gray-700">
              <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-sm font-medium">
                  Real-time alerts
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
        Active listings
      </p>
      <p className="text-sm text-gray-500 font-semibold text-center">
        2,800+ jobs
      </p>
    </div>

    {/* BADGE 2 */}
    <div
      className="bg-white shadow-xl border rounded-xl px-6 py-3
      transition-all duration-700 ease-[cubic-bezier(.17,.67,.27,1)]
      hover:scale-110 active:scale-105 cursor-pointer w-fit mx-auto md:mx-0"
    >
      <p className="text-lg text-black text-center">
        Companies hiring
      </p>
      <p className="text-sm text-gray-500 font-semibold text-center">
        500+ verified
      </p>
    </div>
  </div>

</div>


      </div>

      {/* part 2 */}
      <div className="w-full py-12 md:py-16 bg-white">
  <div className="max-w-7xl mx-auto px-4">

    {/* Heading */}
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-[#0B2B6B]">
        How It <span className="text-emerald-500">Works </span>
      </h2>
      <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
        A quick and simple process to land your next opportunity.
      </p>
    </div>

   {/* Cards Wrapper */}
<div className="flex justify-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-4">

    {/* Card 1 */}
    <div className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition p-6 text-center">
      <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
        <FiSearch className="text-emerald-600 text-lg" />
      </div>
      <h3 className="font-semibold text-lg text-[#0B2B6B]">
        Browse Openings
      </h3>
      <p className="text-gray-600 text-sm mt-2">
        Explore the latest fresher jobs and internships tailored to your interests.
      </p>
    </div>

    {/* Card 2 */}
    <div className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition p-6 text-center">
      <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
        <FiFilter className="text-indigo-700 text-lg" />
      </div>
      <h3 className="font-semibold text-lg text-[#0B2B6B]">
        Refine with Filters
      </h3>
      <p className="text-gray-600 text-sm mt-2">
        Use smart filters to find the roles that best match your skills and goals.
      </p>
    </div>

    {/* Card 3 */}
    <div className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition p-6 text-center">
      <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
        <FiSend className="text-blue-700 text-lg" />
      </div>
      <h3 className="font-semibold text-lg text-[#0B2B6B]">
        Apply Effortlessly
      </h3>
      <p className="text-gray-600 text-sm mt-2">
        Submit applications quickly with a simple and guided process.
      </p>
    </div>

  </div>
</div>



  </div>
</div>

    {/* part 3 */}
     <div className="w-full py-12 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2B6B]">
            Discover Campus Jobs
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Find the perfect fresher roles and internships curated specifically for students like you.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto">
          <div className="border rounded-lg px-4 py-3 flex items-center shadow-sm">
            <span className="text-gray-500 mr-2"><FiSearch className="text-gray-500 text-lg" /></span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by role, company, or skills..."
              className="w-full outline-none bg-transparent text-gray-700"
            />
          </div>

          <div className="flex items-center justify-between mt-3 text-sm">
            <button className="border text-gray-600 px-3 py-1.5 rounded-lg flex items-center justify-center gap-1">
              <FiFilter /> Advanced Filters
            </button>

            <p className="text-gray-500">
              {filtered.length} internships found
            </p>
          </div>
        </div>

        {/* Search Button */}
        <div className="text-center mt-8">
          <button className="bg-[#0B2B6B] hover:bg-[#123c9c] text-white px-6 py-2 rounded-lg shadow">
            Search Jobs →
          </button>
        </div>

        {/* INTERNSHIP LIST */}
        <div className="max-w-4xl mx-auto mt-10 grid gap-4">

          {filtered.map(job => (
            <div
              key={job.id}
              className="border rounded-xl shadow-sm p-4 flex justify-between hover:shadow-md transition"
            >
              <div>
                <p className="font-semibold text-[#0B2B6B]">{job.role}</p>
                <p className="text-gray-600 text-sm">{job.company} · {job.location}</p>
              </div>

              <button className="text-[#0B2B6B] font-medium">
                Apply →
              </button>
            </div>
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-gray-500 py-10">
              No internships match your search
            </p>
          )}
        </div>

      </div>
    </div>

    {/* part 4 */}
    <div className="w-full bg-white py-16 px-4">
      {/* Container */}
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-[#0B2B6B]">
          Why Choose <span className="text-emerald-500">CareerLink</span>?
        </h2>
        <p className="text-gray-600 mt-3 text-sm max-w-xl mx-auto">
          Designed to help you find verified opportunities faster, smarter, and easier.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

          {/* Card 1 */}
          <div className="group bg-white border rounded-xl p-6 text-left transition-all duration-300 hover:shadow-lg hover:border-emerald-500">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-900 text-white mb-4">
              <FiTrendingUp size={22} />
            </div>
            <h3 className="font-semibold text-[#0B2B6B]">Fast-Growing Roles</h3>
            <p className="text-sm text-gray-600 mt-2">
              Discover opportunities in cutting-edge industries and fast-scaling startups.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white border rounded-xl p-6 text-left transition-all duration-300 hover:shadow-lg hover:border-emerald-500">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-900 text-white mb-4">
              <FiCheckCircle size={22} />
            </div>
            <h3 className="font-semibold text-[#0B2B6B]">Trusted Employers</h3>
            <p className="text-sm text-gray-600 mt-2">
              Partnered with verified organizations across India and abroad.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-white border rounded-xl p-6 text-left transition-all duration-300 hover:shadow-lg hover:border-emerald-500">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-900 text-white mb-4">
              <FiMapPin size={22} />
            </div>
            <h3 className="font-semibold text-[#0B2B6B]">Work Anywhere</h3>
            <p className="text-sm text-gray-600 mt-2">
              Explore on-site, hybrid, and remote roles that fit your lifestyle.
            </p>
          </div>

          {/* Card 4 */}
          <div className="group bg-white border rounded-xl p-6 text-left transition-all duration-300 hover:shadow-lg hover:border-emerald-500">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-900 text-white mb-4">
              <FiUsers size={22} />
            </div>
            <h3 className="font-semibold text-[#0B2B6B]">Student Friendly</h3>
            <p className="text-sm text-gray-600 mt-2">
              Internships and full-time roles designed specifically for freshers.
            </p>
          </div>

          {/* Card 5 */}
          <div className="group bg-white border rounded-xl p-6 text-left transition-all duration-300 hover:shadow-lg hover:border-emerald-500">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-900 text-white mb-4">
              <FiBarChart2 size={22} />
            </div>
            <h3 className="font-semibold text-[#0B2B6B]">Career Growth</h3>
            <p className="text-sm text-gray-600 mt-2">
              Upskill and get mentorship to accelerate your professional journey.
            </p>
          </div>

          {/* Card 6 */}
          <div className="group bg-white border rounded-xl p-6 text-left transition-all duration-300 hover:shadow-lg hover:border-emerald-500">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-900 text-white mb-4">
              <FiZap size={22} />
            </div>
            <h3 className="font-semibold text-[#0B2B6B]">Smart Matching</h3>
            <p className="text-sm text-gray-600 mt-2">
              AI-powered filters connect you with the most relevant openings.
            </p>
          </div>

        </div>
      </div>
    </div>
    </section>
  );
}
