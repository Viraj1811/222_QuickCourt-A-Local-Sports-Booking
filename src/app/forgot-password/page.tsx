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
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password Reset Link Sent",
      description: "If an account exists with that email, a reset link has been sent.",
    });
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <form onSubmit={handleSubmit}>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">Forgot Password</CardTitle>
            <CardDescription>
              Enter your email and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground justify-center">
              Remembered your password? <Link href="/login" prefetch={false} className="text-primary hover:underline ml-1">Login</Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
