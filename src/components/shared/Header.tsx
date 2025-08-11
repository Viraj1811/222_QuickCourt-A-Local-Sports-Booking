"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/shared/Logo";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/bookings", label: "My Bookings" },
  { href: "/owner/dashboard", label: "For Owners" },
];

export default function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // In a real app, you'd check a token or session
    if (typeof window !== 'undefined') {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    }
  }, []);

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} className={cn("text-lg font-medium transition-colors hover:text-primary", isActive ? "text-primary" : "text-muted-foreground")}>
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center space-x-6 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            {isLoggedIn ? (
              <Avatar>
                <AvatarImage src="https://placehold.co/100x100.png" alt="User" />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
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
                  <NavLink key={link.href} {...link} />
                ))}
                 {isLoggedIn ? (
                  <Button variant="outline">My Account</Button>
                ) : (
                  <Link href="/login" className="w-full">
                    <Button className="w-full">Login / Sign Up</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
