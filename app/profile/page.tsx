"use client";

import { useAuth } from "@/app/context_api/AuthContext";
import { useState } from "react";
import { User as UserIcon } from "lucide-react";


export default function ProfilePage() {
  const { user } = useAuth();

  // Guard
  if (!user) return null;

  // Local editable state (future API ke liye)
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [gender, setGender] = useState(user.gender || "");
  const [skills, setSkills] = useState<string[]>(user.skills || []);
  const [newSkill, setNewSkill] = useState("");

  // 🔥 add skill
  const addSkill = () => {
    if (!newSkill.trim()) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill("");
  };

  // ❌ remove skill
  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // 🚀 SAVE (future API hit)
  const handleSave = () => {
    const payload = {
      firstName,
      lastName,
      gender,
      skills,
      // profileImage later
    };

    console.log("PROFILE UPDATE PAYLOAD 👉", payload);

    // 🔜 later:
    // await updateProfile(payload)
    // update user in AuthContext
  };

  return (
    <div className="max-w-5xl mt-20 mx-auto px-6 py-10 text-gray-700">
      <h1 className="text-3xl font-bold mb-8 text-white">My Profile</h1>

      <div className="bg-white rounded-2xl shadow p-8 space-y-8">
        {/* PROFILE IMAGE */}
       {/* PROFILE IMAGE */}
<div className="flex items-center gap-6">
  {user.profileImage ? (
    <img
      src={user.profileImage}
      alt="Profile"
      className="w-24 h-24 rounded-full object-cover border"
    />
  ) : (
    <div className="w-24 h-24 rounded-full bg-gray-200 border
flex items-center justify-center p-2">
  <UserIcon size={18} className="text-gray-400 " />
</div>

  )}

  <button className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50">
    Change Photo
  </button>
</div>


        {/* BASIC INFO */}
        <div className="grid mt-4 grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold">First Name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Last Name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              value={user.emailId}
              disabled
              className="w-full border rounded-lg px-4 py-2 mt-1 bg-gray-100"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Role</label>
            <input
              value={user.role}
              disabled
              className="w-full border rounded-lg px-4 py-2 mt-1 bg-gray-100"
            />
          </div>

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

        {/* SKILLS */}
        <div>
          <label className="text-sm font-semibold">Skills</label>

          <div className="flex gap-2 mt-2">
            <input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
              className="flex-1 border rounded-lg px-4 py-2"
            />
            <button
              onClick={addSkill}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg"
            >
              Add
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
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* SAVE BUTTON */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gradient-to-r from-blue-900 to-emerald-400 text-white rounded-lg font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
