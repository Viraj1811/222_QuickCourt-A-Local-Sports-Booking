import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Logo from "@/components/shared/Logo";
import { LayoutDashboard, Star, BookOpen, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
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
                   <Link href="/owner/dashboard"><LayoutDashboard /><span>Dashboard</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Reviews">
                    <Link href="/owner/dashboard"><Star /><span>Reviews</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Bookings">
                   <Link href="/owner/dashboard"><BookOpen /><span>Bookings</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                   <Link href="/owner/dashboard"><Settings /><span>Settings</span></Link>
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
