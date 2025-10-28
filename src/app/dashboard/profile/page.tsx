"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 👇 Replace this with actual logged-in user's email
        const email = "anjali.choudhary@example.com";

        const res = await fetch(`/api/profile?email=${email}`);
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "Failed to load profile!");
        } else {
          setUser(data);
          toast.success("✅ Profile loaded successfully!");
        }
      } catch (error) {
        toast.error("⚠️ Error loading profile!");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-900">
        <p className="text-gray-300">Loading profile...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-900 px-6 py-16">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-lg text-white w-full max-w-2xl border border-slate-700">
        <div className="flex flex-col items-center mb-6">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-md mb-4">
            <Image
              src={user?.avatar || "/default-avatar.png"} // Default avatar
              alt="Profile Avatar"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>

          <h2 className="text-3xl font-bold font-[Poppins]">
            {user?.name || "User Name"}
          </h2>
          <p className="text-gray-400">{user?.email || "user@email.com"}</p>
        </div>

        <div className="border-t border-slate-700 my-6" />

        {/* Info Section */}
        <div className="space-y-3 text-gray-300">
          <p>
            <span className="font-semibold text-white">📞 Phone:</span>{" "}
            {user?.phone || "Not provided"}
          </p>
          <p>
            <span className="font-semibold text-white">🎂 Date of Birth:</span>{" "}
            {user?.dob ? new Date(user.dob).toLocaleDateString() : "Not provided"}
          </p>
          <p>
            <span className="font-semibold text-white">🏫 College:</span>{" "}
            {user?.college || "Not provided"}
          </p>
          <p>
            <span className="font-semibold text-white">🎓 Course:</span>{" "}
            {user?.course || "Not provided"}
          </p>
          <p>
            <span className="font-semibold text-white">💼 Skills:</span>{" "}
            {user?.skills || "Not specified"}
          </p>
          <p>
            <span className="font-semibold text-white">🗓 Joined:</span>{" "}
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "Unknown"}
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
            ✏️ Edit Profile
          </Button>
          <Button className="flex-1 bg-amber-600 hover:bg-amber-700">
            🔒 Change Password
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
