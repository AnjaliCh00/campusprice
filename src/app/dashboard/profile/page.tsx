"use client";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 👇 Replace this with the actual email from your login session
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
        <Toaster position="top-center" />
        <p className="text-gray-300">Loading profile...</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-900 px-6 py-20">
      <Toaster position="top-center" />
      <div className="bg-slate-800 p-8 rounded-2xl shadow-lg text-white w-full max-w-md border border-slate-700">
        <h2 className="text-3xl font-bold mb-6 text-center font-[Poppins]">
          👤 My Profile
        </h2>

        {user ? (
          <>
            <p className="mb-4">
              <span className="font-semibold text-gray-300">Name:</span>{" "}
              {user.name}
            </p>
            <p className="mb-4">
              <span className="font-semibold text-gray-300">Email:</span>{" "}
              {user.email}
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Change Password
            </Button>
          </>
        ) : (
          <p className="text-gray-400 text-center">No user found</p>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
