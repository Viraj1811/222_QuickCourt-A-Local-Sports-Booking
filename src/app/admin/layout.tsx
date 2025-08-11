
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Logo from "@/components/shared/Logo";
import { LayoutDashboard, ShieldCheck, Users, Flag, User, Settings, LogOut, FileCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,

  
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-10rem)]">
        <Sidebar className="md:border-r" side="left">
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                   <Link href="/admin/dashboard"><LayoutDashboard /><span>Dashboard</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Facility Approvals">
                    <Link href="/admin/facility-approval"><FileCheck /><span>Approvals</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="User Management">
                   <Link href="/admin/user-management"><Users /><span>Users</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Reports & Moderation">
                   <Link href="/admin/reports"><Flag /><span>Reports</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Admin Profile">
                   <Link href="/admin/profile"><User /><span>Profile</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <div className="p-4">
             <Button variant="ghost" className="w-full justify-start gap-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
             </Button>
          </div>
        </Sidebar>
        <main className="flex-1 p-6 bg-background rounded-lg">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
