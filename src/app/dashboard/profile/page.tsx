"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = "anjali.choudhary@example.com"; // replace with session email
        const res = await fetch(`/api/profile?email=${email}`);
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "Failed to load profile!");
        } else {
          setUser(data);
        }
      } catch (error) {
        console.error(error);
        toast.error("⚠️ Error loading profile!");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // ✅ Handlers
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("✅ Profile updated successfully!");
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("🔒 Password changed successfully!");
  };

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
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-md mb-4">
            <Image
              src={user?.avatar || "/default-avatar.png"}
              alt="Profile Avatar"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>

          <h2 className="text-3xl font-bold font-[Poppins]">{user?.name}</h2>
          <p className="text-gray-400">{user?.email}</p>
        </div>

        <div className="border-t border-slate-700 my-6" />

        <div className="space-y-3 text-gray-300">
          <p>
            <span className="font-semibold text-white">📞 Phone:</span>{" "}
            {user?.phone || "Not provided"}
          </p>
          <p>
            <span className="font-semibold text-white">🎂 DOB:</span>{" "}
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
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          {/* 🧩 Edit Profile Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                ✏️ Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 text-white border border-slate-700">
              <DialogHeader>
                <DialogTitle>✏️ Edit Profile</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleProfileUpdate} className="space-y-4 mt-4">
                <input
                  type="text"
                  defaultValue={user?.name}
                  placeholder="Name"
                  className="w-full p-2 rounded bg-slate-700 text-white"
                />
                <input
                  type="text"
                  defaultValue={user?.college}
                  placeholder="College"
                  className="w-full p-2 rounded bg-slate-700 text-white"
                />
                <input
                  type="text"
                  defaultValue={user?.course}
                  placeholder="Course"
                  className="w-full p-2 rounded bg-slate-700 text-white"
                />
                <textarea
                  defaultValue={user?.skills}
                  placeholder="Skills"
                  className="w-full p-2 rounded bg-slate-700 text-white"
                ></textarea>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  💾 Save Changes
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* 🔒 Change Password Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-amber-600 hover:bg-amber-700">
                🔒 Change Password
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 text-white border border-slate-700">
              <DialogHeader>
                <DialogTitle>🔒 Change Password</DialogTitle>
              </DialogHeader>
              <form onSubmit={handlePasswordChange} className="space-y-4 mt-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full p-2 rounded bg-slate-700 text-white"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full p-2 rounded bg-slate-700 text-white"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full p-2 rounded bg-slate-700 text-white"
                />
                <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
                  ✅ Update Password
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
