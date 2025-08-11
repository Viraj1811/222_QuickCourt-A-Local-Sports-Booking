
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Upload, X } from "lucide-react";
import Image from "next/image";

const amenities = [
    { id: "parking", label: "Parking" },
    { id: "wifi", label: "WiFi" },
    { id: "showers", label: "Showers" },
    { id: "cafe", label: "Cafe/Restaurant" },
    { id: "lockers", label: "Lockers" },
    { id: "equipment", label: "Equipment Rental" },
];

const sports = [
    { id: "tennis", label: "Tennis" },
    { id: "badminton", label: "Badminton" },
    { id: "basketball", label: "Basketball" },
    { id: "football", label: "Football" },
    { id: "squash", label: "Squash" },
];

export default function FacilityManagementPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-4xl font-bold font-headline">Facility Management</h1>
                <p className="text-muted-foreground">Update your facility's details, amenities, and photos.</p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="facility-name">Facility Name</Label>
                        <Input id="facility-name" defaultValue="Grand Slam Tennis Club" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue="Mumbai, Maharashtra" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" rows={5} defaultValue="Experience world-class tennis facilities at Grand Slam Tennis Club. We offer state-of-the-art clay and hard courts suitable for all levels of players." />
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                 <CardHeader>
                    <CardTitle>Sports Offered</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {sports.map(sport => (
                         <div key={sport.id} className="flex items-center space-x-2">
                            <Checkbox id={`sport-${sport.id}`} defaultChecked={["tennis", "badminton"].includes(sport.id)} />
                            <Label htmlFor={`sport-${sport.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {sport.label}
                            </Label>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                 <CardHeader>
                    <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {amenities.map(amenity => (
                         <div key={amenity.id} className="flex items-center space-x-2">
                            <Checkbox id={amenity.id} defaultChecked={["parking", "wifi", "showers"].includes(amenity.id)} />
                            <Label htmlFor={amenity.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {amenity.label}
                            </Label>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Photos</CardTitle>
                    <CardDescription>Upload images of your facility. The first image will be the main display picture.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="relative group">
                                <Image src={`https://placehold.co/400x300.png`} alt={`Facility Photo ${i}`} width={400} height={300} className="rounded-lg object-cover" data-ai-hint="sports facility" />
                                <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                         <label htmlFor="photo-upload" className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF</p>
                            </div>
                            <Input id="photo-upload" type="file" className="hidden" multiple />
                        </label>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button size="lg">Save Changes</Button>
            </div>
        </div>
    )
}
