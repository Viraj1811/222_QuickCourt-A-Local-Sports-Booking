"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { venues } from "@/lib/data";
import ReviewResponseGenerator from "./ReviewResponseGenerator";

const ownerVenues = venues.filter(v => v.owner.id === 101);

export default function Dashboard() {
  const allReviews = ownerVenues.flatMap(venue => 
    venue.reviews.map(review => ({...review, venueId: venue.id, venueName: venue.name}))
  );

  return (
    <Tabs defaultValue="reviews" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="venues">My Venues</TabsTrigger>
        <TabsTrigger value="bookings">Bookings</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>A summary of your facility's performance.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">Overview content will be displayed here.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="venues" className="mt-6">
        <Card>
           <CardHeader>
            <CardTitle>My Venues</CardTitle>
            <CardDescription>Manage your listed venues.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">Venue management interface will be displayed here.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="bookings" className="mt-6">
        <Card>
           <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>View and manage bookings for your venues.</CardDescription>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">Bookings list will be displayed here.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reviews" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Manage Reviews</CardTitle>
            <CardDescription>Respond to customer feedback and improve your service.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {allReviews.map(review => (
              <ReviewResponseGenerator key={`${review.venueId}-${review.id}`} review={review} venueName={review.venueName} />
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
