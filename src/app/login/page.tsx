"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { User, Shield } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (role: 'player' | 'owner') => {
    // In a real app, this would involve an actual authentication flow.
    // For this simulation, we'll use localStorage.
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", role);
    
    if (role === 'owner') {
      router.push("/owner/dashboard");
    } else {
      router.push("/bookings");
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Welcome to CourtLink</CardTitle>
          <CardDescription>Select your role to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <p className="text-center text-muted-foreground">This is a simulated login. Choose a role to explore the app's features from different perspectives.</p>
            <div className="grid grid-cols-1 gap-4">
                <Button size="lg" className="h-14 text-lg" onClick={() => handleLogin('player')}>
                    <User className="mr-2" />
                    Continue as a Player
                </Button>
                <Button size="lg" variant="secondary" className="h-14 text-lg" onClick={() => handleLogin('owner')}>
                    <Shield className="mr-2" />
                    Continue as a Venue Owner
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
