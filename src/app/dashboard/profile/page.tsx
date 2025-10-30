"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogOut, Pencil, Lock } from "lucide-react";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.error || "Failed to load profile!");
          if (res.status === 401) router.push("/login");
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
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (response.ok) {
        toast.success("Logged out successfully!");
        router.push("/login");
      } else toast.error("Logout failed!");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed!");
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const body = {
      name: (formData.get("name") as string) || "",
      email: (formData.get("email") as string) || "",
      phone: (formData.get("phone") as string) || null,
      dob: (formData.get("dob") as string) || null,
      college: (formData.get("college") as string) || null,
      course: (formData.get("course") as string) || null,
      skills: (formData.get("skills") as string) || null,
      message: (formData.get("message") as string) || null,
    };

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Profile updated successfully!");
        setUser(data);
        setIsEditModalOpen(false);
      } else {
        toast.error(data.error || "Failed to update profile!");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile!");
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }

    try {
      const res = await fetch("/api/profile/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Password changed successfully!");
        (e.target as HTMLFormElement).reset();
        setIsPasswordModalOpen(false);
      } else {
        toast.error(data.error || "Failed to change password!");
      }
    } catch (error) {
      console.error("Password change error:", error);
      toast.error("Failed to change password!");
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-300">
        <p>Loading profile...</p>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-10 text-slate-200">
      <div className="max-w-3xl mx-auto px-5 space-y-8">
        {/* Header */}
        <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 p-6 flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
            {user?.name ? user.name[0].toUpperCase() : "U"}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">{user?.name}</h1>
            <p className="text-slate-400">{user?.email}</p>
          </div>
        </div>

        {/* Details */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold border-b border-slate-700 pb-2 mb-3">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div>
                <span className="text-slate-400">Phone:</span>{" "}
                <span className="text-slate-200">{user?.phone || "Not provided"}</span>
              </div>
              <div>
                <span className="text-slate-400">Date of Birth:</span>{" "}
                <span className="text-slate-200">
                  {user?.dob ? new Date(user.dob).toLocaleDateString() : "Not provided"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold border-b border-slate-700 pb-2 mb-3">
              Academic Details
            </h2>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div>
                <span className="text-slate-400">College:</span>{" "}
                <span className="text-slate-200">{user?.college || "Not provided"}</span>
              </div>
              <div>
                <span className="text-slate-400">Course:</span>{" "}
                <span className="text-slate-200">{user?.course || "Not provided"}</span>
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <h2 className="text-lg font-semibold border-b border-slate-700 pb-2 mb-3">
              Message
            </h2>
            <p className="text-sm text-slate-300 bg-slate-700/50 p-3 rounded-lg">
              {user?.message || "No message provided"}
            </p>
          </div>

          {/* Skills */}
          {user?.skills && (
            <div>
              <h2 className="text-lg font-semibold border-b border-slate-700 pb-2 mb-3">
                Skills
              </h2>
              <p className="text-sm text-slate-300 bg-slate-700/50 p-3 rounded-lg">{user.skills}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg p-5 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2">
                  <Pencil className="w-4 h-4 mr-2" /> Edit Profile
                </Button>
              </DialogTrigger>

              <DialogContent className="bg-slate-800 text-slate-200 border border-slate-700">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-slate-100">
                    <Pencil className="w-4 h-4" /> Edit Profile
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleProfileUpdate} className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      defaultValue={user?.name}
                      placeholder="Full Name"
                      required
                      className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                      type="email"
                      name="email"
                      defaultValue={user?.email}
                      placeholder="Email"
                      required
                      className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  <input
                    type="tel"
                    name="phone"
                    defaultValue={user?.phone || ""}
                    placeholder="Phone"
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-blue-400"
                  />

                  <input
                    type="date"
                    name="dob"
                    defaultValue={user?.dob ? new Date(user.dob).toISOString().split("T")[0] : ""}
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-blue-400"
                  />

                  <input
                    type="text"
                    name="college"
                    defaultValue={user?.college || ""}
                    placeholder="College / University"
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-blue-400"
                  />

                  <input
                    type="text"
                    name="course"
                    defaultValue={user?.course || ""}
                    placeholder="Course"
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-blue-400"
                  />

                  <textarea
                    name="skills"
                    defaultValue={user?.skills || ""}
                    placeholder="Skills (comma-separated)"
                    rows={3}
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-blue-400 resize-none"
                  />

                  {/* Message field added */}
                  <textarea
                    name="message"
                    defaultValue={user?.message || ""}
                    placeholder="Personal message or bio"
                    rows={3}
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-blue-400 resize-none"
                  />

                  <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    <Pencil className="w-4 h-4 mr-2" /> Save Changes
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2">
                  <Lock className="w-4 h-4 mr-2" /> Change Password
                </Button>
              </DialogTrigger>

              <DialogContent className="bg-slate-800 text-slate-200 border border-slate-700">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-slate-100">
                    <Lock className="w-4 h-4" /> Change Password
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handlePasswordChange} className="space-y-4 mt-4">
                  <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    required
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    required
                    minLength={6}
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-blue-400"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-blue-400"
                  />
                  <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    <Lock className="w-4 h-4 mr-2" /> Update Password
                  </Button>  
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Button onClick={handleLogout} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 mt-3">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
