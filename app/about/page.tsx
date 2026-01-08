"use client"

import {
  FiUsers,
  FiBookOpen,
  FiBriefcase,
  FiTarget,
} from "react-icons/fi";

import {
  FiFlag,
  FiTrendingUp,
  FiHeart,
  FiAward,
} from "react-icons/fi";
import { FiCircle } from "react-icons/fi";
export default function AboutPage() {
  return (
    <div className="w-full bg-[#F7F9FC]">

      {/* Hero Section */}
      <section className="w-full  py-20 px-4 bg-white">
        <div className="max-w-5xl mt-25 mx-auto text-center">

          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Our Story
          </span>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2B6B] leading-tight">
            Reimagining the journey from
            <br />
            campus curiosity to career confidence
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto mt-6">
            Collexa is a career acceleration platform built for the next generation
            of talent. We combine curated learning paths, verified opportunities,
            and human mentorship so students can thrive with clarity.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1 */}
          <div className="bg-white border rounded-xl p-8 text-center hover:shadow-lg transition">
            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-blue-700 mb-4">
              <FiUsers size={22} />
            </div>
            <h3 className="text-xl font-bold text-[#0B2B6B]">50,000+</h3>
            <p className="text-gray-500 text-sm mt-1">Learners empowered</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border rounded-xl p-8 text-center hover:shadow-lg transition">
            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-blue-700 mb-4">
              <FiBookOpen size={22} />
            </div>
            <h3 className="text-xl font-bold text-[#0B2B6B]">120+</h3>
            <p className="text-gray-500 text-sm mt-1">Campus partners</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border rounded-xl p-8 text-center hover:shadow-lg transition">
            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-blue-700 mb-4">
              <FiBriefcase size={22} />
            </div>
            <h3 className="text-xl font-bold text-[#0B2B6B]">350+</h3>
            <p className="text-gray-500 text-sm mt-1">Hiring partners</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border rounded-xl p-8 text-center hover:shadow-lg transition">
            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-blue-100 text-blue-700 mb-4">
              <FiTarget size={22} />
            </div>
            <h3 className="text-xl font-bold text-[#0B2B6B]">25,000+</h3>
            <p className="text-gray-500 text-sm mt-1">Career matches</p>
          </div>

        </div>

      </section>
        {/* Mission & Values Section */}
      <div className="w-full bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-2xl font-bold text-[#0B2B6B] mb-4">
            Our mission
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed max-w-md">
            Every student deserves a clear career plan, a support system, and
            pathways to meaningful work. We collaborate with universities and
            employers to build that ecosystem—personalized, measurable, and
            deeply human.
          </p>

          {/* Focus Box */}
          <div className="mt-8 bg-[#F7F9FC] border rounded-xl p-6 max-w-md">
            <div className="flex items-center gap-2 mb-3">
              <FiFlag className="text-blue-700" />
              <h4 className="font-semibold text-[#0B2B6B]">
                Where we focus
              </h4>
            </div>

            <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
              <li>Skill programs co-created with industry mentors</li>
              <li>Career studios for resumes, mock interviews, and branding</li>
              <li>Curated hiring pipelines aligned with students' strengths</li>
            </ul>
          </div>
        </div>

        {/* RIGHT CARDS */}
        <div className="space-y-6">

          {/* Card 1 */}
          <div className="bg-white border rounded-xl p-6 flex gap-4 hover:shadow-md transition">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <FiTrendingUp size={18} />
            </div>
            <div>
              <h4 className="font-semibold text-[#0B2B6B]">
                Ambitious Vision
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                We design every experience to help students unlock world-class
                opportunities without boundaries.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border rounded-xl p-6 flex gap-4 hover:shadow-md transition">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <FiHeart size={18} />
            </div>
            <div>
              <h4 className="font-semibold text-[#0B2B6B]">
                Learner-First
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Product decisions always begin with empathy for students,
                mentors, and hiring teams.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border rounded-xl p-6 flex gap-4 hover:shadow-md transition">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <FiAward size={18} />
            </div>
            <div>
              <h4 className="font-semibold text-[#0B2B6B]">
                Quality Obsessed
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                We obsess over curriculum, tooling, and guidance so every
                interaction feels premium.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div className="w-full bg-[#D9DADB] py-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-2xl font-bold text-[#0B2B6B]">
            How we got here
          </h2>
          <p className="text-sm text-gray-600 mt-2 max-w-xl mx-auto">
            From a small cohort of students to a nationwide ecosystem—here are
            the moments that shaped Collexa.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical Line */}
          <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gray-300" />

          {/* Item 1 */}
          <div className="flex gap-6 mb-8 relative">
            <div className="z-10">
              <div className="w-5 h-5 rounded-full bg-white border border-gray-400 flex items-center justify-center">
                <FiCircle size={8} className="text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 w-full">
              <span className="text-xs text-gray-500">2021</span>
              <h4 className="text-sm font-semibold text-blue-700 mt-1">
                Collexa is born
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Our founders left their corporate roles to fix the broken campus
                to career journey.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex gap-6 mb-8 relative">
            <div className="z-10">
              <div className="w-5 h-5 rounded-full bg-white border border-gray-400 flex items-center justify-center">
                <FiCircle size={8} className="text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 w-full">
              <span className="text-xs text-gray-500">2022</span>
              <h4 className="text-sm font-semibold text-blue-700 mt-1">
                First 10 universities
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                We partnered with pioneering colleges and launched mentorship
                pods for their students.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex gap-6 mb-8 relative">
            <div className="z-10">
              <div className="w-5 h-5 rounded-full bg-white border border-gray-400 flex items-center justify-center">
                <FiCircle size={8} className="text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 w-full">
              <span className="text-xs text-gray-500">2023</span>
              <h4 className="text-sm font-semibold text-blue-700 mt-1">
                Marketplace expansion
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Jobs, internships, and upskilling programs came under one roof
                for the first time.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex gap-6 relative">
            <div className="z-10">
              <div className="w-5 h-5 rounded-full bg-white border border-gray-400 flex items-center justify-center">
                <FiCircle size={8} className="text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 w-full">
              <span className="text-xs text-gray-500">Today</span>
              <h4 className="text-sm font-semibold text-blue-700 mt-1">
                National community
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Collexa now supports learners across India with programs that
                scale with their ambition.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div className="w-full bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2B6B]">
            People behind Collexa
          </h2>
          <p className="text-gray-600 text-sm mt-3 max-w-xl mx-auto">
            We’re a crew of educators, technologists, and talent leaders obsessed
            with student success.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-white border rounded-2xl p-8 hover:shadow-lg transition">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-[#0B2B6B] font-semibold mb-4">
              RK
            </div>

            <h4 className="font-semibold text-[#0B2B6B]">
              Rhea Kapoor
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              Co-founder & CEO
            </p>

            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              Product strategist with a decade scaling edtech companies across
              APAC.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border rounded-2xl p-8 hover:shadow-lg transition">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-[#0B2B6B] font-semibold mb-4">
              AM
            </div>

            <h4 className="font-semibold text-[#0B2B6B]">
              Arjun Mehta
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              Co-founder & CTO
            </p>

            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              Built talent platforms for Fortune 500 firms; now focused on
              equitable hiring tech.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border rounded-2xl p-8 hover:shadow-lg transition">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-[#0B2B6B] font-semibold mb-4">
              NS
            </div>

            <h4 className="font-semibold text-[#0B2B6B]">
              Neha Sharma
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              Head of University Success
            </p>

            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              Former dean of student success, championing career readiness at
              scale.
            </p>
          </div>

        </div>
      </div>
    </div>

    </div>
  );
}
