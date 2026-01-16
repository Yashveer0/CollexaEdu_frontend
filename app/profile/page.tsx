"use client";

import { useAuth } from "@/app/context_api/AuthContext";
import { useState, useEffect } from "react";
import {
  User,
  MapPin,
  FileText,
  Briefcase,
  Plus,
  X,
} from "lucide-react";
import Swal from "sweetalert2";

export default function ProfilePage() {
  const { user, loading, updateProfile } = useAuth();

  // basic info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");

  // profile details (as per backend image)
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");

  // skills
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const [saving, setSaving] = useState(false);

  // sync user → form
  useEffect(() => {
    if (!user) return;

    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setGender(user.gender || "");

    setHeadline(user.profile?.headline || "");
    setBio(user.profile?.bio || "");
    setLocation(user.profile?.location || "");
    setResumeUrl(user.profile?.resumeUrl || "");
    setSkills(user.profile?.skills || []);
  }, [user]);

  if (loading || !user) return null;

  const addSkill = () => {
    if (!newSkill.trim()) return;
    if (skills.includes(newSkill.trim())) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill("");
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        firstName,
        lastName,
        gender,
        profile: {
          headline,
          bio,
          location,
          resumeUrl,
          skills,
        },
      };

      await updateProfile(payload);

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        timer: 1600,
        showConfirmButton: false,
        
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          err?.response?.data?.message ||
          "Something went wrong while updating profile",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mt-20 mx-auto px-6 py-10 text-gray-700">
      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-8 text-white">My Profile</h1>

      <div className="bg-white rounded-2xl shadow p-8 space-y-10">
        {/* HEADER */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 border flex items-center justify-center">
            <User size={32} className="text-gray-500" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              {firstName} {lastName}
            </h2>
            <p className="text-sm text-gray-500">{user.emailId}</p>
            <p className="text-sm text-gray-400 capitalize">{user.role}</p>
          </div>
        </div>

        {/* BASIC INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="First Name" value={firstName} setValue={setFirstName} />
          <Input label="Last Name" value={lastName} setValue={setLastName} />

          <div>
            <label className="text-sm font-semibold">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mt-1"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* PROFESSIONAL INFO */}
        <div className="space-y-6">
          <Input
            label="Professional Headline"
            icon={<Briefcase size={16} />}
            value={headline}
            setValue={setHeadline}
            placeholder="Software Developer"
          />

          <div>
            <label className="text-sm font-semibold">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="Passionate about web development..."
              className="w-full border rounded-lg px-4 py-2 mt-1 resize-none"
            />
          </div>

          <Input
            label="Location"
            icon={<MapPin size={16} />}
            value={location}
            setValue={setLocation}
            placeholder="New York"
          />

          <Input
            label="Resume URL"
            icon={<FileText size={16} />}
            value={resumeUrl}
            setValue={setResumeUrl}
            placeholder="https://..."
          />
        </div>

        {/* SKILLS */}
        <div>
          <label className="text-sm font-semibold">Skills</label>

          <div className="flex gap-2 mt-2">
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill"
              className="flex-1 border rounded-lg px-4 py-2"
            />
            <button
              onClick={addSkill}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg flex items-center gap-1"
            >
              <Plus size={16} /> Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-red-500"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* SAVE */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 bg-gradient-to-r from-blue-900 to-emerald-400
            text-white rounded-lg font-semibold disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Small reusable input */
function Input({
  label,
  value,
  setValue,
  placeholder,
  icon,
}: any) {
  return (
    <div>
      <label className="text-sm font-semibold flex items-center gap-1">
        {icon} {label}
      </label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full border rounded-lg px-4 py-2 mt-1"
      />
    </div>
  );
}
