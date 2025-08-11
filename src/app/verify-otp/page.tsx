
"use client";

import { Suspense } from "react";
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
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { verifyOtpAction } from "@/app/actions";
import { Loader2 } from "lucide-react";

const initialState = {
  message: "",
};

function VerifyButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
       {pending ? <Loader2 className="mr-2 animate-spin" /> : null}
       Verify & Proceed
    </Button>
  );
}

function VerifyOtpForm() {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const role = searchParams.get('role');
    const otp_secret = searchParams.get('otp_secret'); // This is insecure, for demo only
    
    const [state, formAction] = useActionState(verifyOtpAction, initialState);

    if (state?.message && state.message !== initialState.message) {
      toast({
          title: "Error",
          description: state.message,
          variant: "destructive"
      });
      // Clear message after showing toast
      initialState.message = state.message;
    }

    if (!email || !role || !otp_secret) {
        return (
            <div className="text-center text-destructive">
                <p>Invalid verification link.</p>
                <p>Please try signing in again.</p>
            </div>
        )
    }

    return (
        <form action={formAction}>
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="role" value={role} />
            <input type="hidden" name="otp_secret" value={otp_secret} />
            <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">Verify Your Identity</CardTitle>
            <CardDescription>
                An OTP has been sent to <strong>{email}</strong>. Please enter it below.
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="otp">One-Time Password (OTP)</Label>
                <Input
                id="otp"
                name="otp"
                type="text"
                placeholder="Enter your 6-digit OTP"
                required
                maxLength={6}
                pattern="\d{6}"
                />
            </div>
            <VerifyButton />
            </CardContent>
            <CardFooter className="flex-col text-center text-sm text-muted-foreground justify-center">
            <p>Didn't receive the OTP? Please try again.</p>
            </CardFooter>
        </form>
    )
}

export default function VerifyOtpPage() {
  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyOtpForm />
        </Suspense>
      </Card>
    </div>
  );
}
