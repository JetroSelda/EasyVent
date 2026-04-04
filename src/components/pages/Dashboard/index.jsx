import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import NavigationMenu from "../../custom-ui/NavigationMenu";
import { useEffect, useState } from "react";

import { Outlet, useNavigate } from 'react-router-dom';

const paths = [
  { path: "/dashboard/admin", role: ["Admin", "Staff"] },
  { path: "/dashboard/services", role: ["Provider"] },
  { path: "/dashboard/services/form", role: ["Provider"] },
  { path: "/dashboard/services/details", role: ["Provider"] },
  { path: "/dashboard/bookings", role: ["Customer"] },
  { path: "/dashboard/profile", role: ["Customer", "Provider", "Admin", "Staff"] },
  { path: "/dashboard/messages", role: ["Customer", "Provider"] },
  { path: "/dashboard/feedback", role: ["Admin", "Staff"] },
  { path: "/dashboard/serviceListing", role: ["Admin", "Staff"] },
  { path: "/dashboard/admin/service", role: ["Admin", "Staff"] },
  { path: "/dashboard/settings", role: ["Admin"] },
];

const Dashboard = () => {
  const [pageSelected, setPageSelected] = useState("Dashboard");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user-data");

    const parsedUserData = JSON.parse(userData ?? null) || {};

    const { expiration, role } = parsedUserData;

    const path = window.location.pathname;

    console.log("Path/Admin", path, role);

    const currentPath = paths.find((item) => item.path === path);

    if (path !== "/dashboard" && (!currentPath || !currentPath.role.includes(role))) {
      window.location.href = "/dashboard";
      return;
    }

    if (path === "/dashboard/services" && role !== "Provider") {
      window.location.href = "/dashboard";
      return;
    }

    const today = new Date();

    const hasExpired = expiration < today.getTime();

    if (!userData || !expiration || hasExpired) {
      localStorage.removeItem("user-data");
      navigate("/");

      return;
    }

    setIsLoading(false);
  }, []);

  if (isLoading) return null;


  return (
    <div className="w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden relative">
      <NavigationMenu />
      <SidebarProvider>
        <AppSidebar onClick={setPageSelected} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" /> <span className="block md:hidden">Menu</span>
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbPage href="#">
                      {pageSelected}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
};

export default Dashboard;