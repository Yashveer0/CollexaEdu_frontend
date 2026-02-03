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
  const { user, applyForJob, applyForCampusCourse } = useAuth();
  const router = useRouter();
  const isCampusCourse = !!data?.rating;

  const isCertificationCourse = !!data?.currentPrice && !!data?.instructor;
const isJobOrInternship = !isCampusCourse && !isCertificationCourse;

  const handleOpen = () => {
    if (!user && !isCampusCourse) {
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
const [loading, setLoading] = useState(false);

const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phoneNumber: "",
  whyHireYou: "", 
  phone: "",
  coverLetter: "",
  resume: "",
  state: "",
});

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Resume required only for Job / Internship
  if (!resumeFile && !isCampusCourse && !isCertificationCourse) {
    Swal.fire("Warning", "Please upload your resume.", "warning");
    return;
  }

  setLoading(true);
  try {
    // ✅ CERTIFICATION COURSE
    if (isCertificationCourse) {
      await applyForCampusCourse({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        course: data.title,
        state: formData.state,
        termsAccepted: true,
      });

      Swal.fire("Success", "Certification Enquiry Submitted!", "success");
    }

    // ✅ CAMPUS COURSE
    else if (isCampusCourse) {
      await applyForCampusCourse({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        course: data.courseName,
        state: formData.state,
        termsAccepted: true,
      });

      Swal.fire("Success", "Campus Course Enquiry Submitted!", "success");
    }

    // ✅ JOB / INTERNSHIP
    else {
      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("email", formData.email);
      payload.append("phoneNumber", formData.phoneNumber);
      payload.append("whyHireYou", formData.coverLetter);
      if (resumeFile) payload.append("resume", resumeFile);

      await applyForJob(data._id, payload);
      Swal.fire("Success", "Application Submitted Successfully!", "success");
    }

    // Reset
    setOpen(false);
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      coverLetter: "",
      state: "",
      whyHireYou: "",
      phone: "",
      resume: "",
    });
    setResumeFile(null);

  } catch (error: any) {
    Swal.fire(
      "Error",
      error.response?.data?.message || "Failed to submit application",
      "error"
    );
  } finally {
    setLoading(false);
  }
};

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
                {isCertificationCourse
  ? "Certification Course Details & Enquiry"
  : isCampusCourse
  ? "Campus Course Details & Enquiry"
  : data.mode
  ? "Internship Details & Application"
  : "Job Details & Application"}


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
                    {/* <h3 className="text-2xl font-bold">{data.title}</h3>
                    <p className="text-blue-700 flex items-center gap-1">
                      <Building2 size={16} />
                      {data.companyName || data.company?.name}
                    </p> */}

                    <h3 className="text-2xl font-bold">
  <h3 className="text-2xl font-bold">
  {isCertificationCourse
    ? data.title
    : isCampusCourse
    ? data.courseName
    : data.title}
</h3>



</h3>

<p className="text-blue-700 flex items-center gap-1">
  <Building2 size={16} />
  {isCertificationCourse
    ? data.instructor
    : isCampusCourse
    ? data.universityName
    : data.companyName || data.company?.name}
</p>

                    
                  </div>

                  
  <div className="grid grid-cols-2 gap-3 text-sm">
  {/* Location / Category */}
  <p className="flex items-center gap-2">
    <MapPin size={16} />
    {isCertificationCourse ? data.category : data.location}
  </p>

  {/* Level / Type */}
  <p className="flex items-center gap-2">
    <Briefcase size={16} />
    {isCertificationCourse ? data.level : isCampusCourse ? data.level : data.type || data.mode}
  </p>

  {/* Price / Salary / Degree */}
  <p className="flex items-center gap-2">
    <DollarSign size={16} />
    {isCertificationCourse
      ? `${data.currency || "₹"}${data.currentPrice}`
      : isCampusCourse
      ? data.degreeType
      : `₹${data.salaryMin || data.stipendMin || 0} - ₹${
          data.salaryMax || data.stipendMax || 0
        }`}
  </p>

  {/* Duration */}
  <p className="flex items-center gap-2">
    <Clock size={16} />
    {data.duration}
  </p>

  {/* Students / Vacancies */}
  <p className="flex items-center gap-2">
    <Users size={16} />
    {isCertificationCourse
      ? `Students: ${data.studentsEnrolled}`
      : isCampusCourse
      ? `Enrolled: ${data.enrolledCount ?? 0}`
      : `Vacancies: ${data.openings ?? 0}`}
  </p>

  {/* Date */}
  <p className="flex items-center gap-2">
    <Calendar size={16} />
    Posted: {formatDate(data.createdAt)}
  </p>
</div>


                  

    {!isCampusCourse && data.skillsRequired?.length > 0 && (
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
  {isCertificationCourse
    ? "Certification Course Description"
    : isCampusCourse
    ? "Course Description"
    : data.mode
    ? "Internship Description"
    : "Job Description"}
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
  onSubmit={handleSubmit}
>
  {/* Full Name */}
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      Full Name <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      name="fullName"
      value={formData.fullName}
      onChange={handleInputChange}
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
      name="email"
      value={formData.email}
      onChange={handleInputChange}
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
      name="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleInputChange}
      required
      placeholder="Enter your phone number"
      className="rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* State / City for Campus Course */}
  {isCampusCourse && (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        City / State <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleInputChange}
        required
        placeholder="e.g. Noida"
        className="rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )}

  {/* Resume Upload */}
  {!isCampusCourse && (
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
  )}

  {/* Why Hire You */}
  {!isCampusCourse && (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">
      Why should we hire you? <span className="text-red-500">*</span>
    </label>
    <textarea
      name="coverLetter"
      value={formData.coverLetter}
      onChange={handleInputChange}
      required
      placeholder="Briefly explain your skills and experience"
      className="min-h-[100px] rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  )}

  {/* Submit */}
  <button
    type="submit"
    disabled={loading}
    className={`mt-3 rounded-xl py-2.5 text-sm font-semibold text-white transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
  >
    {loading ? "Submitting..." : "Submit Application"}
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
