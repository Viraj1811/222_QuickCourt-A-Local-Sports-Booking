
"use client"

import { useState } from 'react'; 
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock } from 'lucide-react';

const bookings = [
    { id: 1, user: 'Alice', court: 'Clay Court 1', date: '2024-08-15', time: '10:00 AM', status: 'Upcoming' },
    { id: 2, user: 'Bob', court: 'Hard Court 2', date: '2024-08-15', time: '11:00 AM', status: 'Upcoming' },
    { id: 3, user: 'Charlie', court: 'Clay Court 1', date: '2024-08-10', time: '02:00 PM', status: 'Completed' },
    { id: 4, user: 'David', court: 'Indoor Court A', date: '2024-08-05', time: '06:00 PM', status: 'Completed' },
    { id: 5, user: 'Eve', court: 'Hard Court 2', date: '2024-07-25', time: '09:00 AM', status: 'Cancelled' },
];

export default function BookingOverviewPage() {
  const upcomingBookings = bookings.filter((b) => b.status === 'Upcoming');
  const pastBookings = bookings.filter((b) => b.status === 'Completed' || b.status === 'Cancelled');


  const BookingTable = ({ bookings, showStatus = false }: { bookings: typeof pastBookings, showStatus?: boolean }) => (
    <Card>
        <CardContent className="p-0">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Court</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    {showStatus && <TableHead>Status</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings.map(booking => (
                        <TableRow key={booking.id}>
                            <TableCell className="font-medium flex items-center"><User className="h-4 w-4 mr-2 text-muted-foreground"/>{booking.user}</TableCell>
                            <TableCell>{booking.court}</TableCell>
                            <TableCell className="flex items-center"><Calendar className="h-4 w-4 mr-2 text-muted-foreground"/>{booking.date}</TableCell>
                            <TableCell className="flex items-center"><Clock className="h-4 w-4 mr-2 text-muted-foreground"/>{booking.time}</TableCell>
                             {showStatus && (
                                <TableCell>
                                    <Badge variant={
                                        booking.status === 'Completed' ? 'default' : 
                                        booking.status === 'Cancelled' ? 'destructive' : 'secondary'
                                    } className={booking.status === 'Completed' ? 'bg-green-600' : ''}>
                                        {booking.status}
                                    </Badge>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
        <header>
            <h1 className="text-4xl font-bold font-headline">Booking Overview</h1>
            <p className="text-muted-foreground">View and manage all bookings for your facility.</p>
        </header>

        <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming Bookings</TabsTrigger>
            <TabsTrigger value="past">Past Bookings</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="mt-6">
                <BookingTable bookings={upcomingBookings} />
            </TabsContent>
            <TabsContent value="past" className="mt-6">
                <BookingTable bookings={pastBookings} showStatus={true} />
            </TabsContent>
        </Tabs>
    </div>
  );
}
