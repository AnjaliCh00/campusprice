"use client"

import { MoreHorizontal, type LucideIcon } from "lucide-react"

import {
  DropdownMenu,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarMenu,

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

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <DropdownMenu key={item.title}>
            <SidebarMenuItem>
             <Link href={item.url}>
                  {item.title}
               </Link>
             
            </SidebarMenuItem>
          </DropdownMenu>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
