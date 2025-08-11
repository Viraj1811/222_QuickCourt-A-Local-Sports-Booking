
"use client"; 

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBookingsByUserId } from "@/lib/data";
import type { Booking } from "@/lib/types";
import Image from "next/image";
import { Calendar, Clock, Edit, Ban } from 'lucide-react';
import StarRating from '@/components/StarRating';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";

function BookingCard({ booking }: { booking: Booking }) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const { toast } = useToast();

  const handleReviewSubmit = () => {
     toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback.",
      });
      setIsReviewOpen(false);
  };
  
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="flex">
        <div className="w-1/3">
           <Image
              src={booking.venue.photos[0]}
              alt={booking.venue.name}
              width={200}
              height={200}
              className="object-cover h-full w-full"
              data-ai-hint="sports venue"
            />
        </div>
        <div className="w-2/3">
          <CardHeader>
            <CardTitle className="font-headline">{booking.venue.name}</CardTitle>
            <CardDescription>{booking.court.name} ({booking.court.sport})</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              <span>{booking.time}</span>
            </div>
          </CardContent>
          <CardFooter>
            {booking.status === 'Upcoming' && <Button variant="destructive" size="sm"><Ban className="mr-2 h-4 w-4" />Cancel Booking</Button>}
            {booking.status === 'Completed' && (
              <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4" />Write a Review</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Write a Review for {booking.venue.name}</DialogTitle>
                    <DialogDescription>Share your experience to help others.</DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <div>
                      <label className="font-medium">Your Rating</label>
                      <StarRating rating={rating} onRatingChange={setRating} size="lg" />
                    </div>
                    <div>
                      <label htmlFor="review-comment" className="font-medium">Your Comment</label>
                      <Textarea id="review-comment" placeholder="Tell us about your visit..." rows={4}/>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleReviewSubmit}>Submit Review</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd get the logged-in user's ID
    const userId = 1; // Assuming user ID is 1 for now
    getBookingsByUserId(userId).then(data => {
        setBookings(data as Booking[]);
        setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  const upcomingBookings = bookings.filter((b) => b.status === 'Upcoming');
  const completedBookings = bookings.filter((b) => b.status === 'Completed');
  const cancelledBookings = bookings.filter((b) => b.status === 'Cancelled');

  const BookingList = ({ bookings }: { bookings: Booking[] }) => (
    <div className="space-y-6">
      {bookings.length > 0 ? (
        bookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
      ) : (
        <p className="text-muted-foreground text-center py-8">No bookings in this category.</p>
      )}
    </div>
  );

  return (
    <div>
      <h1 className="text-4xl font-bold font-headline mb-8">My Bookings</h1>
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-6">
          <BookingList bookings={upcomingBookings} />
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <BookingList bookings={completedBookings} />
        </TabsContent>
        <TabsContent value="cancelled" className="mt-6">
          <BookingList bookings={cancelledBookings} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
