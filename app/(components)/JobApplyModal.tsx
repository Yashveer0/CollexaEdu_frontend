"use client";
import React, { useState } from "react";
import { useAuth } from "../context_api/AuthContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  Building2,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Users,
  Calendar,
} from "lucide-react";




const JobApplyModal = ({
  title,
  btn_text = "Apply",
  data,
}: {
  title: string;
  btn_text?: string;
  data?: any;
}) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleOpen = () => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to apply for this job.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) router.push("/student-login");
      });
      return;
    }
    setOpen(true);
  };

  const formatDate = (date: string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
const [showFullJD, setShowFullJD] = useState(false);
const [resumeFile, setResumeFile] = useState<File | null>(null);

  return (
    
    <>
      {/* Apply Button */}
      <button
        onClick={handleOpen}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        {btn_text} →
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="w-full text-gray-800 max-w-4xl rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between border-b pb-3">
              <h2 className="text-xl font-semibold text-blue-900">
                Job Details & Application
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-xl text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* CONTENT GRID */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* LEFT: JOB DETAILS */}
              {data && (
                <div className="bg-blue-50 p-5 rounded-xl space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">{data.title}</h3>
                    <p className="text-blue-700 flex items-center gap-1">
                      <Building2 size={16} />
                      {data.companyName || data.company?.name}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <p className="flex items-center gap-2">
                      <MapPin size={16} /> {data.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <Briefcase size={16} /> {data.type}
                    </p>
                    <p className="flex items-center gap-2">
                      <DollarSign size={16} /> ₹{data.salaryMin || 0} - ₹
                      {data.salaryMax || 0}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock size={16} /> {data.experienceLevel}
                    </p>
                    <p className="flex items-center gap-2">
                      <Users size={16} /> Vacancies: {data.openings ?? 0}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar size={16} /> Posted:
                      {formatDate(data.createdAt)}
                    </p>
                  </div>

                  {/* Skills */}
                  {data.skillsRequired?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {data.skillsRequired.map((skill: string, i: number) => (
                        <span
                          key={i}
                          className="bg-white border text-blue-700 px-2 py-1 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  
                  {/* Description */}
<div>
  <h4 className="font-semibold text-sm text-gray-900 mb-1">
    Job Description
  </h4>

  <p
    className={`text-sm text-gray-600 whitespace-pre-line transition-all ${
      showFullJD ? "" : "line-clamp-4"
    }`}
  >
    {data.description}
  </p>

  {data.description?.length > 150 && (
    <button
      onClick={() => setShowFullJD(!showFullJD)}
      className="mt-1 text-sm font-medium text-blue-600 hover:underline"
    >
      {showFullJD ? "Read Less" : "Read More"}
    </button>
  )}
</div>

                </div>
              )}

              {/* RIGHT: APPLY FORM */}
              <form
  className="flex flex-col gap-4"
  onSubmit={(e) => {
    e.preventDefault();
    Swal.fire("Success", "Application Submitted!", "success");
    setOpen(false);
  }}
>
  {/* Full Name */}
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      Full Name <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      required
      placeholder="Enter your full name"
      className="rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Email */}
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      Email Address <span className="text-red-500">*</span>
    </label>
    <input
      type="email"
      required
      placeholder="Enter your email"
      className="rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Phone */}
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      Phone Number <span className="text-red-500">*</span>
    </label>
    <input
      type="tel"
      required
      placeholder="Enter your phone number"
      className="rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Resume Upload */}
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      Upload Resume (PDF / DOC) <span className="text-red-500">*</span>
    </label>

    <input
      type="file"
      accept=".pdf,.doc,.docx"
      required
      className="rounded-lg border px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        if (!allowedTypes.includes(file.type)) {
          Swal.fire(
            "Invalid Resume Format",
            "Please upload resume only in PDF or DOC format.",
            "warning"
          );
          e.target.value = "";
          setResumeFile(null);
          return;
        }

        setResumeFile(file);
      }}
    />

    <p className="text-xs text-gray-500">
      Only PDF or DOC files. Max size recommended: 2MB.
    </p>
  </div>

  {/* Why Hire You */}
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      Why should we hire you? <span className="text-red-500">*</span>
    </label>
    <textarea
      required
      placeholder="Briefly explain your skills and experience"
      className="min-h-[100px] rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Submit */}
  <button
    type="submit"
    className="mt-3 rounded-xl bg-green-600 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition"
  >
    Submit Application
  </button>
</form>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobApplyModal;
