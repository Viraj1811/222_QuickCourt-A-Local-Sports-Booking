
"use client";

import { Button } from "@/components/ui/button"; 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Shield } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [role, setRole] = useState<'player' | 'owner' | null>(null);

  const handleLogin = () => {
    if (!role) {
      toast({
        title: "Error",
        description: "Please select a role.",
        variant: "destructive"
      })
      return;
    }
    // In a real app, this would involve an actual authentication flow.
    // For this simulation, we'll just redirect to OTP verification.
    localStorage.setItem("userRole", role);
    router.push("/verify-otp");
  };

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Welcome Back!</CardTitle>
          <CardDescription>Login to continue to CourtLink</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" defaultValue="player@example.com" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" prefetch={false} className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" defaultValue="password" />
              </div>
            </div>
            
            <div className="space-y-2">
                <Label>Select your role</Label>
                <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant={role === 'player' ? 'default' : 'outline'}
                      onClick={() => setRole('player')}
                      className="h-14 text-lg"
                    >
                        <User className="mr-2" />
                        Player
                    </Button>
                    <Button 
                       variant={role === 'owner' ? 'default' : 'outline'}
                       onClick={() => setRole('owner')}
                       className="h-14 text-lg"
                    >
                        <Shield className="mr-2" />
                        Venue Owner
                    </Button>
                </div>
            </div>
            
            <Button size="lg" className="w-full h-12 text-lg" onClick={handleLogin}>
              Send OTP
            </Button>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground justify-center">
            Don't have an account? <Link href="/signup" prefetch={false} className="text-primary hover:underline ml-1">Sign up</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
