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
  ListCheck,
  Map,
  MessageSquareText,
  MessagesSquare,
  NotebookPenIcon,
  PieChart,
  Settings,
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

  const hasAccessToStats = ["Provider", "Admin"];
  const hasAccessToServices = ["Provider"];
  const hasAccessToBookings = ["Customer"];
  const hasAccessToAdmin = ["Admin"];
  const hasAccessToServiceListing = ["Admin", "Staff"];
  const hasAccessToMessages = ["Provider", "Customer"];
  const hasAccessToSettings = ["Admin"];

  const navLinks = [
    {
      title: "Dashboard",
      url: "",
      icon: LayoutDashboardIcon,
      isActive: true,
      hide: hasAccessToStats.every((role) => role !== userRole),
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
      hide: hasAccessToBookings.every((role) => role !== userRole),
    },
    {
      title: "Messages",
      url: "messages",
      icon: MessagesSquare,
      hide: hasAccessToMessages.every((role) => role !== userRole),
    },
    {
      title: "Service Listing",
      url: "serviceListing",
      icon: ListCheck,
      hide: hasAccessToServiceListing.every((role) => role !== userRole),
    },
    {
      title: "Feedbacks",
      url: "feedback",
      hide: hasAccessToAdmin.every((role) => role !== userRole),
      icon: MessageSquareText
    },
    {
      title: "Profile",
      url: "profile",
      icon: User,
    },
    {
      title: "Users",
      url: "admin",
      icon: ShieldUser,
      hide: hasAccessToAdmin.every((role) => role !== userRole),
    },
    {
      title: "Settings",
      url: "settings",
      icon: Settings,
      hide: hasAccessToSettings.every((role) => role !== userRole),
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
