"use client"
import * as React from "react";
import { LayoutDashboard, GalleryVerticalEnd, LogOut, User, Users, Sparkles, ChevronDown } from "lucide-react";
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

// This is sample data.
const data = {
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
     {
      title: " Started",
      url: "/dashboard/somthing",
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

  // Fetch user info on component mount
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
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      
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
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              size="lg" 
              asChild
              className="group hover:bg-accent/50 transition-all duration-200"
            >
              <a href="#" className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex aspect-square size-10 items-center justify-center rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                  <Sparkles className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    Campus Price
                  </span>
                  <span className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors duration-200">
                    v1.0.0
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="relative">
              <SidebarMenuButton 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={cn(
                  "group w-full justify-start text-left",
                  "hover:bg-accent/50 transition-all duration-200 ease-in-out",
                  "hover:scale-[1.02] hover:shadow-sm",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white flex aspect-square size-8 items-center justify-center rounded-full text-sm font-semibold">
                    {userInfo?.name ? userInfo.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">
                      {userInfo?.name || "User"}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {userInfo?.email || "user@example.com"}
                    </div>
                  </div>
                  <ChevronDown className={cn(
                    "size-4 transition-transform duration-200",
                    showUserMenu && "rotate-180"
                  )} />
                </div>
              </SidebarMenuButton>
              
              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-background border rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <div className="px-3 py-2 text-sm text-muted-foreground border-b">
                      Account
                    </div>
                    <SidebarMenuButton 
                      onClick={handleLogout} 
                      className={cn(
                        "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50/50",
                        "transition-all duration-200 ease-in-out",
                        "focus-visible:ring-2 focus-visible:ring-red-500/20"
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
      <SidebarRail />
    </Sidebar>
  );
}
