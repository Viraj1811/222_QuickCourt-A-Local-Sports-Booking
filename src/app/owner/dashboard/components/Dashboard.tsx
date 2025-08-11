"use client";

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getReviewsByOwnerId } from "@/lib/data";
import ReviewResponseGenerator from "./ReviewResponseGenerator";
import type { Review } from '@/lib/types';

export default function Dashboard() {
  const [reviews, setReviews] = useState<{review: Review, venue: {id: number, name: string}}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd get the logged-in owner's ID
    const ownerId = 101; 
    getReviewsByOwnerId(ownerId).then(data => {
        setReviews(data);
        setLoading(false);
    });
  }, []);


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
             {loading ? (
              <p>Loading reviews...</p>
            ) : (
                reviews.map(item => (
                <ReviewResponseGenerator key={`${item.venue.id}-${item.review.id}`} review={item.review} venueName={item.venue.name} />
                ))
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
