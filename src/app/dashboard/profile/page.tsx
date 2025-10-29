"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// ✅ Lucide icons
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
          if (res.status === 401) {
            router.push("/login");
          }
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

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      
      if (response.ok) {
        toast.success("Logged out successfully!");
        router.push("/login");
      } else {
        toast.error("Logout failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Logout failed!");
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const dob = formData.get("dob") as string;
    const college = formData.get("college") as string;
    const course = formData.get("course") as string;
    const skills = formData.get("skills") as string;

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name, 
          email, 
          phone: phone || null, 
          dob: dob || null, 
          college: college || null, 
          course: course || null, 
          skills: skills || null 
        }),
      });

      if (response.ok) {
        toast.success("Profile updated successfully!");
        // Refresh user data
        const updatedUser = await response.json();
        setUser(updatedUser);
        // Close modal
        setIsEditModalOpen(false);
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to update profile!");
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
      const response = await fetch("/api/profile/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.ok) {
        toast.success("Password changed successfully!");
        // Reset form
        (e.target as HTMLFormElement).reset();
        // Close modal
        setIsPasswordModalOpen(false);
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to change password!");
      }
    } catch (error) {
      console.error("Password change error:", error);
      toast.error("Failed to change password!");
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading profile...</p>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-3xl mx-auto px-4">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full border-2 border-white bg-white flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
                <p className="text-blue-100">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Info */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-lg border-b border-gray-200 pb-1">
                  Personal
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="text-gray-900">{user?.phone || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">DOB:</span>
                    <span className="text-gray-900">
                      {user?.dob ? new Date(user.dob).toLocaleDateString() : "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-lg border-b border-gray-200 pb-1">
                  Academic
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">College:</span>
                    <span className="text-gray-900 truncate max-w-32">
                      {user?.college || "Not provided"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Course:</span>
                    <span className="text-gray-900 truncate max-w-32">
                      {user?.course || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            {user?.skills && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">Skills</h3>
                <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {user.skills}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* ✏️ Edit Profile Dialog */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 py-2">
                  <Pencil className="w-4 h-4" /> Edit Profile
                </Button>
              </DialogTrigger>
            <DialogContent className="bg-white text-gray-900 border border-gray-200">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
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
                    className="w-full p-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    defaultValue={user?.email}
                    placeholder="Email Address"
                    className="w-full p-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={user?.phone || ""}
                    placeholder="Phone Number"
                    className="w-full p-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <input
                    type="date"
                    name="dob"
                    defaultValue={user?.dob ? new Date(user.dob).toISOString().split('T')[0] : ""}
                    placeholder="Date of Birth"
                    className="w-full p-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="college"
                    defaultValue={user?.college || ""}
                    placeholder="College/University"
                    className="w-full p-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <input
                    type="text"
                    name="course"
                    defaultValue={user?.course || ""}
                    placeholder="Course/Program"
                    className="w-full p-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                
                <textarea
                  name="skills"
                  defaultValue={user?.skills || ""}
                  placeholder="Skills (comma-separated)"
                  rows={3}
                  className="w-full p-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
                />
                
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <Pencil className="w-4 h-4" /> Save Changes
                </Button>
              </form>
            </DialogContent>
          </Dialog>

            {/* 🔒 Change Password Dialog */}
            <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1 bg-amber-600 hover:bg-amber-700 flex items-center justify-center gap-2 py-2">
                  <Lock className="w-4 h-4" /> Change Password
                </Button>
              </DialogTrigger>
            <DialogContent className="bg-white text-gray-900 border border-gray-200">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Change Password
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handlePasswordChange} className="space-y-4 mt-4">
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  className="w-full p-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  className="w-full p-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                  minLength={6}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  className="w-full p-2 rounded bg-gray-50 text-gray-900 border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" /> Update Password
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          </div>

          {/* 🚪 Logout Button */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <Button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center justify-center gap-2 py-2"
            >
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
