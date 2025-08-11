"use client";

import { useState } from "react"; 
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Clock, Calendar as CalendarIcon, Tag, CheckCircle } from "lucide-react";
import type { Venue } from "@/lib/types";


const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM",
];

export default function VenueBookingClient({ venueName }: { venueName: string }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingConfirmationOpen, setBookingConfirmationOpen] = useState(false);

  const handleBooking = () => {
    if (date && selectedTime) {
      setBookingConfirmationOpen(true);
    }
  };

  return (
      <>
        <Card className="shadow-lg">
            <CardHeader>
            <CardTitle className="font-headline text-2xl text-center">Book Your Slot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border p-0"
                disabled={(d) => d < new Date(new Date().setDate(new Date().getDate() - 1))}
            />
            <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(time => (
                <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                >
                    {time}
                </Button>
                ))}
            </div>
            <Button size="lg" className="w-full bg-accent hover:bg-accent/90" onClick={handleBooking} disabled={!date || !selectedTime}>
                Book Now
            </Button>
            </CardContent>
        </Card>
        
        <Dialog open={bookingConfirmationOpen} onOpenChange={setBookingConfirmationOpen}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl text-accent">
                <CheckCircle />
                Booking Successful!
                </DialogTitle>
                <DialogDescription className="pt-4 text-base">
                Your booking has been confirmed. You can view your booking details in the 'My Bookings' section.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 mt-4">
                <p className="flex items-center gap-2"><Tag className="w-4 h-4 text-primary" /> <strong>Venue:</strong> {venueName}</p>
                <p className="flex items-center gap-2"><CalendarIcon className="w-4 h-4 text-primary" /> <strong>Date:</strong> {date?.toLocaleDateString()}</p>
                <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> <strong>Time:</strong> {selectedTime}</p>
            </div>
            <DialogFooter>
                <Button onClick={() => setBookingConfirmationOpen(false)}>Close</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
  );
}
