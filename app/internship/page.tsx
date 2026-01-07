"use client";
import { useState } from "react";
import { FaRocket, FaBuilding, FaUserFriends } from "react-icons/fa";
import { FiSearch , FiUser , FiSend , FiTrendingUp  } from "react-icons/fi";



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
            Launch your career with <br />
            <span className="text-emerald-500">real-world internships</span> <br />
            from top companies
          </h1>

          <p className="mt-6 text-gray-600 text-base md:text-lg max-w-xl">
            Gain hands-on experience, build your portfolio, and kickstart 
            your professional journey with internships from leading 
            companies. Perfect for students and fresh graduates.
          </p>

          {/* TAGS */}
          <div className="mt-8 space-y-3">

            <div className="flex text-gray-700 flex-wrap gap-3">
              <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-sm font-medium">
                  Hands-on experience
                </span>
              </div>

              <div className="flex  items-center gap-2 border rounded-lg px-3 py-1.5 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                <span className="text-sm  font-medium">
                  Mentorship programs
                </span>
              </div>
            </div>

            <div className="flex text-gray-700">
              <div className="flex items-center gap-2 border rounded-lg px-3 py-1.5 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-sm font-medium">
                  Certificate of completion
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
        Active internships
      </p>
      <p className="text-sm text-gray-500 font-semibold text-center">
        1,200+ opportunities
      </p>
    </div>

    {/* BADGE 2 */}
    <div
      className="bg-white shadow-xl border rounded-xl px-6 py-3
      transition-all duration-700 ease-[cubic-bezier(.17,.67,.27,1)]
      hover:scale-110 active:scale-105 cursor-pointer w-fit mx-auto md:mx-0"
    >
      <p className="text-lg text-black text-center">
        Partner companies
      </p>
      <p className="text-sm text-gray-500 font-semibold text-center">
        300+ verified
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
        How Our Internship Platform Works
      </h2>
      <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
        Follow these simple steps to find, apply, and get selected for internships that boost your
        career.
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {/* Card 1 */}
      <div className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
          <span className="text-blue-700 text-2xl"><FiUser className="text-gray-900 text-lg" /></span>
        </div>
        <h3 className="font-semibold text-lg text-[#0B2B6B]">
          Create Your Profile
        </h3>
        <p className="text-gray-600 text-sm mt-2">
          Fill in your details, education, skills, and interests to get personalized internship
          suggestions.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <span className="text-emerald-600 text-2xl"><FiSearch className="text-gray-500 text-lg" /></span>
        </div>
        <h3 className="font-semibold text-lg text-[#0B2B6B]">
          Browse Internships
        </h3>
        <p className="text-gray-600 text-sm mt-2">
          Explore verified internships from startups, unicorns, and global companies.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
          <span className="text-gray-800 text-2xl"><FiSend className="text-gray-900 text-lg" /></span>
        </div>
        <h3 className="font-semibold text-lg text-[#0B2B6B]">
          Apply Easily
        </h3>
        <p className="text-gray-600 text-sm mt-2">
          Submit your application in just a few clicks directly from our platform.
        </p>
      </div>

      {/* Card 4 */}
      <div className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
          <span className="text-indigo-700 text-2xl"><FiTrendingUp className="text-gray-900 text-lg" /></span>
        </div>
        <h3 className="font-semibold text-lg text-[#0B2B6B]">
          Grow Your Career
        </h3>
        <p className="text-gray-600 text-sm mt-2">
          Get selected, gain real-world experience, and accelerate your career journey.
        </p>
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
            Discover Campus Internships
          </h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Find the perfect internships and opportunities curated specifically for students like you
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
            <button className="border text-gray-600 px-3 py-1.5 rounded-lg flex items-center gap-1">
              ⚙ Advanced Filters
            </button>

            <p className="text-gray-500">
              {filtered.length} internships found
            </p>
          </div>
        </div>

        {/* Search Button */}
        <div className="text-center mt-8">
          <button className="bg-[#0B2B6B] hover:bg-[#123c9c] text-white px-6 py-2 rounded-lg shadow">
            Search Internships →
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
    <div className="w-full py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADING */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B2B6B]">
            Why Choose Our Internship Platform
          </h2>

          <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
            Our platform is designed to help students find the best internship opportunities
            and accelerate their career growth.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* CARD 1 */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition text-center">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <FaRocket className="text-blue-700 text-2xl" />
            </div>

            <h3 className="font-semibold text-lg text-[#0B2B6B]">
              Fast Track Your Career
            </h3>

            <p className="text-gray-600 text-sm mt-2">
              Gain real-world experience and boost your resume with curated internships.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <FaBuilding className="text-emerald-600 text-2xl" />
            </div>

            <h3 className="font-semibold text-lg text-[#0B2B6B]">
              Top Companies
            </h3>

            <p className="text-gray-600 text-sm mt-2">
              Intern with startups, unicorns, and global corporations handpicked for students.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition text-center">
            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
              <MdMenuBook className="text-indigo-700 text-2xl" />
            </div>

            <h3 className="font-semibold text-lg text-[#0B2B6B]">
              Skill Development
            </h3>

            <p className="text-gray-600 text-sm mt-2">
              Learn industry-relevant skills with mentorship and guided projects.
            </p>
          </div>

          {/* CARD 4 */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition text-center">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <FaUserFriends className="text-blue-700 text-2xl" />
            </div>

            <h3 className="font-semibold text-lg text-[#0B2B6B]">
              Networking Opportunities
            </h3>

            <p className="text-gray-600 text-sm mt-2">
              Connect with industry professionals and fellow interns worldwide.
            </p>
          </div>

        </div>
      </div>
    </div>
    </section>
  );
}
