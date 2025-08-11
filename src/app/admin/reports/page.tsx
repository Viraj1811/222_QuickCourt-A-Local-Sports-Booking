
"use client";

import {
  Card,
  CardContent,
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
import { Check, Trash2, Eye } from "lucide-react";


const flaggedItems = [
    { id: 1, type: "Facility", name: "Grand Slam Tennis Club", reportedBy: "Priya S.", reason: "Inappropriate photos uploaded.", date: "2024-08-11" },
    { id: 2, type: "User", name: "UserX123", reportedBy: "Mr. Owner", reason: "Spamming reviews section.", date: "2024-08-10" },
    { id: 3, type: "Review", name: "On 'Shuttle Smash Arena'", reportedBy: "Alice", reason: "Abusive language.", date: "2024-08-09" },
];

export default function ReportsAndModerationPage() {
  return (
    <div className="space-y-8">
       <header>
            <h1 className="text-4xl font-bold font-headline">Reports & Moderation</h1>
            <p className="text-muted-foreground">Handle flagged facilities, users, and reviews.</p>
        </header>

        <Card>
            <CardContent className="p-0">
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Reported Item</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Reported By</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {flaggedItems.map(item => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell><Badge variant="secondary">{item.type}</Badge></TableCell>
                                <TableCell>{item.reportedBy}</TableCell>
                                <TableCell className="max-w-xs truncate">{item.reason}</TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="ghost" size="icon">
                                        <Eye className="h-4 w-4" />
                                        <span className="sr-only">View Details</span>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700">
                                        <Check className="h-4 w-4" />
                                         <span className="sr-only">Dismiss</span>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                         <span className="sr-only">Take Action</span>
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
