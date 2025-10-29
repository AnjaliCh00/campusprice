"use client"

import { MoreHorizontal, type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const { isMobile } = useSidebar()
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          // Debug: Log the pathname and item URL
          console.log('Pathname:', pathname, 'Item URL:', item.url, 'Match:', pathname === item.url)
          
          // Simple exact match logic
          const isActive = pathname === item.url
          
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                isActive={isActive}
                className={cn(
                  "group relative transition-all duration-200 ease-in-out",
                  "hover:bg-accent/50 hover:scale-[1.02]",
                  "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isActive && "bg-primary/10 text-primary shadow-sm border-l-2 border-primary"
                )}
              >
                <Link 
                  href={item.url} 
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg",
                    "transition-all duration-200 ease-in-out",
                    "hover:translate-x-1",
                    isActive && "font-semibold"
                  )}
                >
                  {item.icon && (
                    <item.icon 
                      className={cn(
                        "size-4 transition-all duration-200",
                        isActive && "text-primary scale-110",
                        "group-hover:scale-110 group-hover:text-primary"
                      )} 
                    />
                  )}
                  <span className="truncate">{item.title}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
