"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { venues } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import StarRating from "@/components/StarRating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Clock, Calendar as CalendarIcon, Tag, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM",
];

export default function VenueDetailsPage({ params }: { params: { id: string } }) {
  const venue = venues.find((v) => v.id === parseInt(params.id));
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingConfirmationOpen, setBookingConfirmationOpen] = useState(false);

  if (!venue) {
    notFound();
  }
  
  const handleBooking = () => {
    if (date && selectedTime) {
      setBookingConfirmationOpen(true);
    }
  };

  return (
    <div className="space-y-12">
      <Card>
        <CardHeader>
          <h1 className="text-4xl font-bold font-headline text-primary">{venue.name}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <StarRating rating={venue.rating} size="md" />
            <span>{venue.rating.toFixed(1)} ({venue.reviews.length} reviews)</span>
          </div>
        </CardHeader>
        <CardContent>
          <Carousel className="w-full mb-8">
            <CarouselContent>
              {venue.photos.map((photo, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={photo}
                    alt={`${venue.name} photo ${index + 1}`}
                    width={1200}
                    height={600}
                    className="w-full h-96 object-cover rounded-lg"
                    data-ai-hint="sports facility"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold font-headline mb-4">Description</h2>
                <p className="text-lg text-muted-foreground">{venue.description}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold font-headline mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {venue.amenities.map((amenity) => (
                    <div key={amenity.id} className="flex items-center gap-3 bg-secondary/50 p-3 rounded-md">
                      <amenity.icon className="w-6 h-6 text-primary" />
                      <span className="font-medium">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
               <div>
                <h2 className="text-2xl font-bold font-headline mb-4">Reviews</h2>
                <div className="space-y-6">
                  {venue.reviews.slice(0, 2).map((review) => (
                    <div key={review.id} className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={review.userAvatar} alt={review.user} data-ai-hint="person portrait" />
                        <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-bold">{review.user}</p>
                          <StarRating rating={review.rating} size="sm" />
                        </div>
                        <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                        <p className="mt-2">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
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
            </div>
          </div>
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
            <p className="flex items-center gap-2"><Tag className="w-4 h-4 text-primary" /> <strong>Venue:</strong> {venue.name}</p>
            <p className="flex items-center gap-2"><CalendarIcon className="w-4 h-4 text-primary" /> <strong>Date:</strong> {date?.toLocaleDateString()}</p>
            <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> <strong>Time:</strong> {selectedTime}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setBookingConfirmationOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
