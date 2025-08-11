
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

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [role, setRole] = useState<'player' | 'owner'>('player');

  const handleSignup = () => {
    // In a real app, this would involve creating a new user.
    // For this simulation, we'll just show a toast and redirect to OTP.
    toast({
        title: "OTP Sent!",
        description: "An OTP has been sent to your email/phone.",
      });
    router.push("/verify-otp");
  };

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Create an Account</CardTitle>
          <CardDescription>Join CourtLink today!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
            </div>
            
            <div className="space-y-2">
                <Label>I am a...</Label>
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
            
            <Button size="lg" className="w-full h-12 text-lg" onClick={handleSignup}>
              Sign Up
            </Button>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground justify-center">
            Already have an account? <Link href="/login" prefetch={false} className="text-primary hover:underline ml-1">Login</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
