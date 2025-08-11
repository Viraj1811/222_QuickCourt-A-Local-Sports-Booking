"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { User, Bell, Save } from "lucide-react";

export default function ProfilePage() {
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
        <h1 className="text-4xl font-bold font-headline">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and notification settings.</p>
      </header>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your photo and personal details here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
             <Avatar className="h-20 w-20">
              <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="person portrait"/>
              <AvatarFallback><User className="h-10 w-10" /></AvatarFallback>
            </Avatar>
            <Button variant="outline">Change Avatar</Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Ravi Kumar" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="ravi.kumar@example.com" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
            </div>
          </div>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications about bookings and promotions via email.</p>
              </div>
              <Input type="checkbox" id="email-notifications" className="w-5 h-5" defaultChecked/>
           </div>
           <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-notifications" className="font-medium">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Get booking reminders and alerts via text message.</p>
              </div>
              <Input type="checkbox" id="sms-notifications" className="w-5 h-5"/>
           </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg" onClick={handleSaveChanges}><Save className="mr-2"/>Save Changes</Button>
      </div>
    </div>
  );
}
