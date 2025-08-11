
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold font-headline">Settings</h1>
                <p className="text-muted-foreground">Manage your account and notification settings.</p>
            </header>

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

            <Card>
                <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage how you receive notifications about your facility.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="new-booking-notifications" className="font-medium">New Booking Alerts</Label>
                        <p className="text-sm text-muted-foreground">Receive an email for every new booking.</p>
                    </div>
                    <Switch id="new-booking-notifications" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="cancellation-notifications" className="font-medium">Cancellation Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified when a user cancels a booking.</p>
                    </div>
                    <Switch id="cancellation-notifications" defaultChecked />
                </div>
                 <Separator />
                <div className="flex items-center justify-between">
                    <div>
                        <Label htmlFor="review-notifications" className="font-medium">New Review Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified when a customer leaves a review.</p>
                    </div>
                    <Switch id="review-notifications" />
                </div>
                </CardContent>
            </Card>
        </div>
    );
}
