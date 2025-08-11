
"use client";

import { Button } from "@/components/ui/button"; 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { User, Shield, UserCog, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
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
       Send OTP
    </Button>
  );
}


export default function LoginPage() {
  const { toast } = useToast();
  const [role, setRole] = useState<'player' | 'owner' | 'admin'>('player');
  const [state, formAction] = useActionState(sendOtpAction, initialState);

  useEffect(() => {
    if (state?.message) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-lg shadow-xl">
       <form action={formAction}>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Welcome Back!</CardTitle>
          <CardDescription>Login to continue to CourtLink</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="name@example.com" defaultValue="player@example.com" required/>
              </div>
            </div>
            
            <div className="space-y-2">
                <Label>Select your role</Label>
                 <input type="hidden" name="role" value={role} />
                <div className="grid grid-cols-3 gap-4">
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
                        Owner
                    </Button>
                     <Button 
                       type="button"
                       variant={role === 'admin' ? 'default' : 'outline'}
                       onClick={() => setRole('admin')}
                       className="h-14 text-lg"
                    >
                        <UserCog className="mr-2" />
                        Admin
                    </Button>
                </div>
            </div>
            
            <SubmitButton />
        </CardContent>
        </form>
        <CardFooter className="text-center text-sm text-muted-foreground justify-center">
            Don't have an account? <Link href="/signup" prefetch={false} className="text-primary hover:underline ml-1">Sign up</Link>
        </CardFooter>
      </Card>
    </div>
  );
}

