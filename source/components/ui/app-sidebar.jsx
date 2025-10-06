"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  CalendarClock,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboardIcon,
  Map,
  MessagesSquare,
  NotebookPenIcon,
  PieChart,
  Settings2,
  ShieldUser,
  SquareTerminal,
  User,
  Users2,
} from "lucide-react"

import { NavMain } from "@/components/ui/nav-main"
import { NavProjects } from "@/components/ui/nav-projects"
import { NavUser } from "@/components/ui/nav-user"
import { TeamSwitcher } from "@/components/ui/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.


export function AppSidebar({ onClick, ...props }) {
  const userData = localStorage.getItem("user-data");
  const parsedData = JSON.parse(userData ?? "{}");

  const userRole = parsedData?.role ?? "";

  const hasAccessToServices = ["Admin", "Provider"];
  const isAdmin = userRole === "Admin" || userRole === "Staff";

  const navLinks = [
    {
      title: "Dashboard",
      url: "",
      icon: LayoutDashboardIcon,
      isActive: true,
    },
    {
      title: "Services",
      url: "services",
      icon: NotebookPenIcon,
      hide: hasAccessToServices.every((role) => role !== userRole),
    },
    {
      title: "Bookings",
      url: "bookings",
      icon: CalendarClock,
    },
    {
      title: "Messages",
      url: "messages",
      icon: MessagesSquare,
    },
    {
      title: "Profile",
      url: "profile",
      icon: User,
    },
    {
      title: "Admin",
      url: "admin",
      icon: ShieldUser,
      hide: !isAdmin,
    }
  ].filter((item) => !item.hide);

  const data = {
    user: {
      name: "Alfred Jay V. Ngujo",
      email: "team@gmail.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "EasyVent",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
    ],
    navMain: navLinks,
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain onClick={onClick} items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
