
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, FileText } from "lucide-react";
import Image from "next/image";

const pendingFacilities = [
    { id: 4, name: "Net Busters Arena", owner: "Emily White", sport: "Football", location: "Kolkata, West Bengal", date: "2024-08-10", photo: "https://placehold.co/400x300.png" },
    { id: 5, name: "Hoop Dreams Complex", owner: "Michael Green", sport: "Basketball", location: "Chennai, Tamil Nadu", date: "2024-08-09", photo: "https://placehold.co/400x300.png" },
    { id: 6, name: "Racquet Revolution", owner: "Sarah Black", sport: "Squash", location: "Pune, Maharashtra", date: "2024-08-08", photo: "https://placehold.co/400x300.png" },
];

export default function FacilityApprovalPage() {
  return (
    <div className="space-y-8">
       <header className="flex items-center justify-between">
            <div>
                <h1 className="text-4xl font-bold font-headline">Facility Approvals</h1>
                <p className="text-muted-foreground">Review and approve or reject new facility listings.</p>
            </div>
        </header>

        <Card>
            <CardContent className="p-0">
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Facility</TableHead>
                            <TableHead>Owner</TableHead>
                            <TableHead>Sport</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Submitted On</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pendingFacilities.map(facility => (
                            <TableRow key={facility.id}>
                                <TableCell className="font-medium flex items-center gap-3">
                                    <Image src={facility.photo} alt={facility.name} width={64} height={48} className="rounded-md object-cover" data-ai-hint="sports venue" />
                                    <span>{facility.name}</span>
                                </TableCell>
                                <TableCell>{facility.owner}</TableCell>
                                <TableCell><Badge variant="secondary">{facility.sport}</Badge></TableCell>
                                <TableCell>{facility.location}</TableCell>
                                <TableCell>{facility.date}</TableCell>
                                <TableCell className="text-right space-x-2">
                                     <Button variant="ghost" size="icon">
                                        <FileText className="h-4 w-4" />
                                        <span className="sr-only">View Details</span>
                                     </Button>
                                     <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700">
                                        <Check className="h-4 w-4" />
                                        <span className="sr-only">Approve</span>
                                     </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Reject</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
