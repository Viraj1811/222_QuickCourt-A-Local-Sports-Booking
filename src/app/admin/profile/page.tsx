
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Save } from "lucide-react";

export default function AdminProfilePage() {
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <div className="space-y-8">
       <header>
        <h1 className="text-4xl font-bold font-headline">Admin Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and account security.</p>
      </header>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your photo and personal details here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
             <Avatar className="h-20 w-20">
              <AvatarImage src="https://placehold.co/100x100.png" alt="Admin" data-ai-hint="person portrait"/>
              <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
            </Avatar>
            <Button variant="outline">Change Avatar</Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Admin User" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="admin@example.com" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+91 12345 67890" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
        <CardTitle>Account Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
            </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
            </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
            </div>
            <Button>Update Password</Button>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" onClick={handleSaveChanges}><Save className="mr-2"/>Save Changes</Button>
      </div>
    </div>
  );
}
