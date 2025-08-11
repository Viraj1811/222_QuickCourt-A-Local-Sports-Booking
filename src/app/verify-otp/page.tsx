
"use client";

import { Button } from "@/components/ui/button";
import {
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyOtpPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Verification Successful",
      description: "You have been successfully logged in.",
    });

    const role = localStorage.getItem("userRole");
    localStorage.setItem("isLoggedIn", "true");
    
    if (role === 'owner') {
      router.push("/owner/dashboard");
    } else {
      router.push("/bookings");
    }
  };
  
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = () => {
    setCountdown(60);
    toast({
      title: "OTP Resent",
      description: "A new OTP has been sent to your email/phone.",
    });
  }

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <form onSubmit={handleVerify}>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">Verify Your Identity</CardTitle>
            <CardDescription>
              An OTP has been sent to your registered email/phone. Please enter it below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">One-Time Password (OTP)</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter your 6-digit OTP"
                required
                maxLength={6}
                pattern="\d{6}"
              />
            </div>
            <Button type="submit" className="w-full">
              Verify & Proceed
            </Button>
          </CardContent>
          <CardFooter className="flex-col text-center text-sm text-muted-foreground justify-center">
            <p>Didn't receive the OTP?</p>
            <Button
              type="button"
              variant="link"
              onClick={handleResend}
              disabled={countdown > 0}
            >
              {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
