"use client";

import { useAuth } from "@/app/context_api/AuthContext";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Pencil,
  FileText,
  X,
  Check,
  User,
  Camera,
} from "lucide-react";
import Swal from "sweetalert2";

export default function NaukriProfileUI() {
  const router = useRouter();



  const { user, loading, updateProfile } = useAuth();

  // profile states
  const [hydrated, setHydrated] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  // edit modes
  const [editBasic, setEditBasic] = useState(false);
  const [editHeadline, setEditHeadline] = useState(false);
  const [editSkills, setEditSkills] = useState(false);
  const [editBio, setEditBio] = useState(false);

  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
  if (!loading && !user) {
    Swal.fire({
      icon: "warning",
      title: "Login required",
      text: "Please login first",
      confirmButtonText: "Go to home",
      allowOutsideClick: false,
    }).then(() => {
      router.replace("/"); // home page
    });
  }
}, [loading, user, router]);


  /* SYNC API DATA */
  
useEffect(() => {
  if (!loading) {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhoneNumber(user.phoneNumber || "");
      setLocation(user.profile?.location || "");
      setHeadline(user.profile?.headline || "");
      setBio(user.profile?.bio || "");
      setResumeUrl(user.profile?.resumeUrl || "");
      setSkills(user.profile?.skills || []);

      if (user.profile?.profileImage) {
        setProfileImage(user.profile.profileImage);
      }
    }

    
    setHydrated(true);
  }
}, [loading, user]);


  if (!hydrated) return null;

  
  /* SAVE PROFILE */
  const saveProfile = async () => {
    try {
      setSaving(true);

      await updateProfile({
        firstName,
        lastName,
        phoneNumber,
        profile: {
          location,
          headline,
          bio,
          resumeUrl,
          skills,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Profile updated",
        timer: 1200,
        showConfirmButton: false,
      });

      setEditBasic(false);
      setEditHeadline(false);
      setEditSkills(false);
      setEditBio(false);
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    const croppedImage = await cropImageToSquare(file);
    setProfileImage(croppedImage); // ✅ ALWAYS fixed square
  };

  const addSkill = () => {
    if (!newSkill.trim() || skills.includes(newSkill)) return;
    setSkills([...skills, newSkill.trim()]);
    setNewSkill("");
  };

  const removeSkill = (s: string) => setSkills(skills.filter((i) => i !== s));

  const cropImageToSquare = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const minSize = Math.min(img.width, img.height);

        // fixed output canvas
        const canvas = document.createElement("canvas");
        canvas.width = 200;
        canvas.height = 200;

        const ctx = canvas.getContext("2d")!;

        // center crop source
        const sx = (img.width - minSize) / 2;
        const sy = (img.height - minSize) / 2;

        // draw cropped + resized
        ctx.drawImage(img, sx, sy, minSize, minSize, 0, 0, 300, 300);

        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
    });
  };

   
  return (
    <div className="bg-gray-50 min-h-screen py-6 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 text-gray-700">
        {/* LEFT LINKS */}

        {/* MAIN */}
        <main className="flex-1 mb-10 space-y-6 mt-25">
          {/* PROFILE HEADER */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start relative">
            {/* IMAGE */}
            <div className="relative flex-shrink-0">
              <div
                className="
    w-32 h-32 
    md:w-40 md:h-40
    rounded-full 
    overflow-hidden 
    flex items-center justify-center 
    bg-gray-100 
    border-2 border-white 
    shadow-sm
    aspect-square
  "
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="profile"
                    className="
          block
          w-full
          h-full
          max-w-full
          max-h-full
          object-cover
        "
                  />
                ) : (
                  <User className="w-12 h-12 text-gray-400" />
                )}
              </div>

              {/* CAMERA */}
              <label
                className="
    absolute bottom-1 right-1
    bg-white rounded-full p-1.5
    shadow cursor-pointer hover:bg-gray-100
  "
              >
                <Camera className="w-4 h-4 text-gray-700" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* BASIC DETAILS */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {firstName} {lastName}
                  </h2>

                  <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-gray-600 mt-2">
                    {location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Mail size={14} /> {user?.emailId || ""}
                    </span>
                    {phoneNumber && (
                      <span className="flex items-center gap-1">
                        <Phone size={14} /> {phoneNumber}
                      </span>
                    )}
                  </div>
                </div>

                <Pencil
                  size={18}
                  className="cursor-pointer text-gray-500 hover:text-black"
                  onClick={() => setEditBasic(true)}
                />
              </div>

              {/* EDIT BASIC INFO */}
              {editBasic && (
                <EditBox onSave={saveProfile} saving={saving}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name"
                      className="border rounded-lg px-3 py-2"
                    />
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last name"
                      className="border rounded-lg px-3 py-2"
                    />

                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Location"
                      className="border rounded-lg px-3 py-2"
                    />
                  </div>
                </EditBox>
              )}
            </div>
          </div>

          {/* BIO / ABOUT */}
          <Section title="Profile summary" onEdit={() => setEditBio(true)}>
            {!editBio ? (
              <p className={bio ? "text-gray-700" : "text-gray-400"}>
                {bio || "Add your profile summary"}
              </p>
            ) : (
              <EditBox onSave={saveProfile} saving={saving}>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Write something about yourself..."
                  className="w-full border rounded-lg px-3 py-2"
                />
              </EditBox>
            )}
          </Section>

          {/* HEADLINE */}
          <Section title="Resume headline" onEdit={() => setEditHeadline(true)}>
            {!editHeadline ? (
              <p>{headline || "Add resume headline"}</p>
            ) : (
              <EditBox onSave={saveProfile} saving={saving}>
                <input
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </EditBox>
            )}
          </Section>

          {/* SKILLS */}
          <Section title="Key skills" onEdit={() => setEditSkills(true)}>
            {!editSkills ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              <EditBox onSave={saveProfile} saving={saving}>
                <div className="flex gap-2">
                  <input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-2"
                    placeholder="Add skill"
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 bg-blue-900 text-white rounded-lg"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm flex gap-1"
                    >
                      {s}
                      <X
                        size={14}
                        className="cursor-pointer"
                        onClick={() => removeSkill(s)}
                      />
                    </span>
                  ))}
                </div>
              </EditBox>
            )}
          </Section>
        </main>
      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function Section({ title, children, onEdit }: any) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">{title}</h3>
        {onEdit && (
          <Pencil
            size={16}
            className="cursor-pointer text-gray-500 hover:text-black"
            onClick={onEdit}
          />
        )}
      </div>
      {children}
    </div>
  );
}

function EditBox({ children, onSave, saving }: any) {
  return (
    <div className="space-y-3 mt-3">
      {children}
      <button
        onClick={onSave}
        disabled={saving}
        className="px-6 py-2 bg-gradient-to-r from-blue-900 to-emerald-400 text-white rounded-lg flex items-center gap-2"
      >
        <Check size={16} />
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
