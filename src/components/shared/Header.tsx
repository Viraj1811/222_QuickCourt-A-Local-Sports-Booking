
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogOut, LayoutDashboard, UserCircle, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/shared/Logo";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/bookings", label: "My Bookings" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, you'd check a token or session
    if (typeof window !== 'undefined') {
      const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedInStatus);
      if(loggedInStatus) {
        setUserRole(localStorage.getItem("userRole"));
      }
    }
  }, [pathname]); // Rerun on path change to update login status

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole(null);
    router.push("/login");
  };


  const NavLink = ({ href, label, inSheet = false }: { href: string; label: string, inSheet?: boolean }) => {
    const isActive = pathname.startsWith(href) && (href !== '/' || pathname === '/');
    const link = (
        <Link href={href} className={cn(
            "font-medium transition-colors hover:text-primary",
            isActive ? "text-primary" : "text-muted-foreground",
            inSheet ? "text-lg" : "text-sm",
            )}>
          {label}
        </Link>
    );

    if (inSheet) {
        return <SheetClose asChild>{link}</SheetClose>;
    }

    return link;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
          {isLoggedIn && userRole === 'owner' && <NavLink href="/owner/dashboard" label="Owner Dashboard" />}
          {isLoggedIn && userRole === 'admin' && <NavLink href="/admin/dashboard" label="Admin Dashboard" />}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            {isLoggedIn ? (
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Avatar className="cursor-pointer">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="person user"/>
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={userRole === 'owner' ? '/owner/profile' : (userRole === 'admin' ? '/admin/profile' : '/profile')}>
                        <UserCircle className="mr-2"/>Profile
                    </Link>
                  </DropdownMenuItem>
                  {userRole === 'owner' && <DropdownMenuItem asChild><Link href="/owner/dashboard"><LayoutDashboard className="mr-2"/>Owner Dashboard</Link></DropdownMenuItem>}
                  {userRole === 'admin' && <DropdownMenuItem asChild><Link href="/admin/dashboard"><Shield className="mr-2"/>Admin Dashboard</Link></DropdownMenuItem>}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer"><LogOut className="mr-2"/>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button>Login / Sign Up</Button>
              </Link>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-6 pt-10">
                {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} inSheet />
                ))}
                 {isLoggedIn ? (
                   <>
                    <NavLink href={userRole === 'owner' ? '/owner/profile' : (userRole === 'admin' ? '/admin/profile' : '/profile')} label="My Profile" inSheet />
                    {userRole === 'owner' && <NavLink href="/owner/dashboard" label="Owner Dashboard" inSheet />}
                    {userRole === 'admin' && <NavLink href="/admin/dashboard" label="Admin Dashboard" inSheet />}
                    <Button variant="destructive" onClick={() => {
                      const sheetClose = document.querySelector('[data-radix-dialog-close]');
                      (sheetClose as HTMLElement)?.click();
                      handleLogout();
                    }}>Logout</Button>
                   </>
                ) : (
                  <SheetClose asChild>
                    <Link href="/login" className="w-full">
                      <Button className="w-full">Login / Sign Up</Button>
                    </Link>
                  </SheetClose>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
