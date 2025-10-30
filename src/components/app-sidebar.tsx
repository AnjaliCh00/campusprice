"use client";
import * as React from "react";
import {
  LayoutDashboard,
  LogOut,
  User,
  Users,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// ✅ Navigation items
const data = {
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Started",
      url: "/dashboard/something",
      icon: Users,
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: User,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("/api/profile");
        if (response.ok) {
          const user = await response.json();
          setUserInfo(user);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Sidebar
      {...props}
      className="bg-slate-900 text-slate-100 border-r border-slate-800"
    >
      {/* Header */}
      <SidebarHeader className="bg-slate-900">
        <SidebarMenu className="bg-slate-900">
          <SidebarMenuItem className="bg-slate-900">
           <SidebarMenuButton
  size="lg"
  asChild
  className="group hover:bg-slate-800 transition-all duration-200"
>
  <a
    href="#"
    className="flex items-center gap-3 bg-slate-800 rounded-lg"
  >
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex aspect-square size-10 items-center justify-center rounded-xl shadow-md group-hover:scale-105 transition-all">
      <Sparkles className="size-5" />
    </div>
    <div className="flex flex-col leading-none">
      <span className="font-semibold text-white transition-colors">
        Campus Price
      </span>
      <span className="text-xs text-slate-400">v1.0.0</span>
    </div>
  </a>
</SidebarMenuButton>

          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="bg-slate-900">
        <NavMain
          items={data.navMain.map((item) => ({
            ...item,
            className:
              "text-slate-300 hover:text-indigo-400 hover:bg-slate-800 rounded-md transition-all",
          }))}
        />
      </SidebarContent>

      {/* Footer (User Info + Logout) */}
      <SidebarFooter className="bg-slate-900 border-t border-slate-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="relative">
              <SidebarMenuButton
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={cn(
                  "group w-full justify-start text-left",
                  "hover:bg-slate-800/70 transition-all duration-200 ease-in-out",
                  "hover:scale-[1.02] hover:shadow-sm",
                  "focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                )}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white flex aspect-square size-8 items-center justify-center rounded-full text-sm font-semibold">
                    {userInfo?.name
                      ? userInfo.name.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate text-slate-100">
                      {userInfo?.name || "User"}
                    </div>
                    <div className="text-xs text-slate-400 truncate">
                      {userInfo?.email || "user@example.com"}
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "size-4 text-slate-400 transition-transform duration-200",
                      showUserMenu && "rotate-180"
                    )}
                  />
                </div>
              </SidebarMenuButton>

              {/* Dropdown */}
              {showUserMenu && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <div className="px-3 py-2 text-sm text-slate-400 border-b border-slate-700">
                      Account
                    </div>
                    <SidebarMenuButton
                      onClick={handleLogout}
                      className={cn(
                        "w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10",
                        "transition-all duration-200 ease-in-out",
                        "focus-visible:ring-2 focus-visible:ring-red-500/40"
                      )}
                    >
                      <LogOut className="size-4" />
                      <span className="font-medium">Logout</span>
                    </SidebarMenuButton>
                  </div>
                </div>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail className="bg-slate-900 border-slate-800" />
    </Sidebar>
  );
}
