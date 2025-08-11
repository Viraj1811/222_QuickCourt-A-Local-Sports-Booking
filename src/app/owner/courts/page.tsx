
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
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const courts = [
    { id: 1, name: "Clay Court 1", sport: "Tennis", price: 500, hours: "9 AM - 9 PM" },
    { id: 2, name: "Hard Court 2", sport: "Tennis", price: 600, hours: "9 AM - 9 PM" },
    { id: 3, name: "Indoor Court A", sport: "Badminton", price: 400, hours: "8 AM - 10 PM" },
];

function CourtDialog({ trigger, court }: { trigger: React.ReactNode, court?: typeof courts[0] }) {
    const isEditMode = !!court;

    return (
         <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{isEditMode ? "Edit Court" : "Add New Court"}</DialogTitle>
                <DialogDescription>
                    {isEditMode ? "Update the details of this court." : "Fill in the details for the new court."}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 grid gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="court-name">Court Name</Label>
                    <Input id="court-name" defaultValue={court?.name} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="sport">Sport</Label>
                     <Select defaultValue={court?.sport.toLowerCase()}>
                        <SelectTrigger id="sport">
                            <SelectValue placeholder="Select a sport" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="tennis">Tennis</SelectItem>
                            <SelectItem value="badminton">Badminton</SelectItem>
                            <SelectItem value="basketball">Basketball</SelectItem>
                            <SelectItem value="football">Football</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="price">Price (per hour)</Label>
                        <Input id="price" type="number" defaultValue={court?.price} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="hours">Operating Hours</Label>
                        <Input id="hours" defaultValue={court?.hours} />
                    </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button>{isEditMode ? "Save Changes" : "Add Court"}</Button>
              </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function CourtManagementPage() {
  return (
    <div className="space-y-8">
       <header className="flex items-center justify-between">
            <div>
                <h1 className="text-4xl font-bold font-headline">Court Management</h1>
                <p className="text-muted-foreground">Add, edit, or delete courts in your facility.</p>
            </div>
             <CourtDialog 
                trigger={<Button><PlusCircle className="mr-2 h-4 w-4" />Add New Court</Button>}
            />
        </header>

        <Card>
            <CardContent className="p-0">
                 <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Court Name</TableHead>
                        <TableHead>Sport</TableHead>
                        <TableHead>Price/Hour (INR)</TableHead>
                        <TableHead>Operating Hours</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courts.map(court => (
                            <TableRow key={court.id}>
                                <TableCell className="font-medium">{court.name}</TableCell>
                                <TableCell><Badge variant="secondary">{court.sport}</Badge></TableCell>
                                <TableCell>{court.price}</TableCell>
                                <TableCell>{court.hours}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <CourtDialog
                                        court={court}
                                        trigger={<Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>}
                                    />
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                        <Trash2 className="h-4 w-4" />
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
