"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LayoutDashboardIcon,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button";

export function NavUser({
  user,
}) {
  const navigate = useNavigate();

  const userData = localStorage.getItem("user-data");
  const parsedUserData = JSON.parse(userData ?? "{}");

  const { personal_name = "", last_name = "", email, display_picture } = parsedUserData || {};

  const fallbackName = [personal_name[0], last_name[0]].filter(Boolean).join("");
  const userName = [personal_name, last_name].filter(Boolean).join(" ");

  const userImage = display_picture ? `${import.meta.env.VITE_API_URL}/uploads/${display_picture}` : "";

  const handleLogout = () => {
    localStorage.removeItem("user-data");
    navigate("/");
  }

  const navigateProfile = () => {
    navigate("/dashboard/profile");
  }

  const navigateDashboard = () => {
    navigate("/dashboard");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback className="rounded-lg">{fallbackName}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={userImage} alt={userName} />
              <AvatarFallback className="rounded-lg">{fallbackName}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{userName}</span>
              <span className="truncate text-xs">{email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={navigateDashboard}>
            <LayoutDashboardIcon/>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={navigateProfile}>
            <BadgeCheck />
            Account
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
