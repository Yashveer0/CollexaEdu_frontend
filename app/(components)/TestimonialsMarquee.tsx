"use client";

import { FiStar } from "react-icons/fi";
import "../globals.css";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "@rahuldev",
    text: "Got placed at Google after completing their Full Stack course. The mentorship was game-changing!",
  },
  {
    name: "Priya Patel",
    role: "@priyapatel",
    text: "From zero coding to landing a ₹12 LPA job at Microsoft in 8 months. Incredible journey!",
  },
  {
    name: "Amit Kumar",
    role: "@amitml",
    text: "The Data Science program helped me switch from mechanical engineering to ML engineer.",
  },
  {
    name: "Sneha Gupta",
    role: "@snehatech",
    text: "Very structured curriculum. Got internship during course itself!",
  },
  {
    name: "Vikash Singh",
    role: "@vikashcloud",
    text: "DevOps track completely transformed my career. Highly recommended.",
  },
  {
    name: "Divya Shah",
    role: "@divyacyber",
    text: "Cybersecurity course helped me move into Security Analyst role with 80% hike.",
  },
  {
    name: "Rohit Verma",
    role: "@rohitjava",
    text: "Mock interviews were extremely realistic. Cracked TCS confidently.",
  },
  {
    name: "Kavya Reddy",
    role: "@kavyai",
    text: "AI/ML specialization opened research opportunities for me.",
  },
];

export default function TestimonialsMarquee() {
  return (
    <div className="w-full bg-white py-20 overflow-hidden">

      {/* Heading */}
      <div className="text-center mb-14 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2B6B]">
          Thousands Trained. Careers Transformed.
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Real stories from learners who changed their careers
        </p>
      </div>

      {/* ROW 1 (Right → Left) */}
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-6 animate-marquee-left">
          {[...testimonials, ...testimonials].map((item, i) => (
            <TestimonialCard key={`top-${i}`} {...item} />
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="h-8" />

      {/* ROW 2 (Left → Right) */}
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-6 animate-marquee-right">
          {[...testimonials, ...testimonials].map((item, i) => (
            <TestimonialCard key={`bottom-${i}`} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* CARD */
function TestimonialCard({
  name,
  role,
  text,
}: {
  name: string;
  role: string;
  text: string;
}) {
  return (
    <div className="min-w-[280px] max-w-[280px] bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0B2B6B] flex items-center justify-center font-semibold">
          {name[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#0B2B6B]">
            {name}
          </p>
          <p className="text-xs text-gray-500">
            {role}
          </p>
        </div>
      </div>

      <div className="flex gap-1 text-yellow-400 mb-2">
        {[...Array(5)].map((_, i) => (
          <FiStar key={i} size={14} />
        ))}
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">
        {text}
      </p>
    </div>
  );
}
