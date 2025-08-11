
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { User, Shield, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendOtpAction } from "@/app/actions";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="lg" className="w-full h-12 text-lg" type="submit" disabled={pending}>
       {pending ? <Loader2 className="mr-2 animate-spin" /> : null}
       Sign Up
    </Button>
  );
}

export default function SignupPage() {
  const { toast } = useToast();
  const [role, setRole] = useState<'player' | 'owner'>('player');
  const [state, formAction] = useActionState(sendOtpAction, initialState);

  if (state?.message && state.message !== initialState.message) {
      toast({
          title: "Error",
          description: state.message,
          variant: "destructive"
      });
  }

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <form action={formAction}>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">Create an Account</CardTitle>
            <CardDescription>Join CourtLink today!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
              <div className="space-y-4">
                 <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" type="text" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="name@example.com" required />
                </div>
              </div>
              
              <div className="space-y-2">
                  <Label>I am a...</Label>
                  <input type="hidden" name="role" value={role} />
                  <div className="grid grid-cols-2 gap-4">
                      <Button 
                        type="button"
                        variant={role === 'player' ? 'default' : 'outline'}
                        onClick={() => setRole('player')}
                        className="h-14 text-lg"
                      >
                          <User className="mr-2" />
                          Player
                      </Button>
                      <Button
                         type="button"
                         variant={role === 'owner' ? 'default' : 'outline'}
                         onClick={() => setRole('owner')}
                         className="h-14 text-lg"
                      >
                          <Shield className="mr-2" />
                          Venue Owner
                      </Button>
                  </div>
              </div>
              
              <SubmitButton />
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground justify-center">
              Already have an account? <Link href="/login" prefetch={false} className="text-primary hover:underline ml-1">Login</Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
