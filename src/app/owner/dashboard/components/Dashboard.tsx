
"use client"; 

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getReviewsByOwnerId } from "@/lib/data";
import ReviewResponseGenerator from "./ReviewResponseGenerator";
import type { Review } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const [reviews, setReviews] = useState<{review: Review, venue: {id: number, name: string}}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd get the logged-in owner's ID
    const ownerId = 101; 
    getReviewsByOwnerId(ownerId).then(data => {
        setReviews(data.slice(0, 2)); // Show only a couple of recent reviews on the dashboard
        setLoading(false);
    });
  }, []);


  return (
    <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
            <CardDescription>A quick look at the latest feedback from your customers.</CardDescription>
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
          <div className="p-6 border-t">
              <Link href="/owner/reviews">
                  <Button variant="outline" className="w-full">View All Reviews</Button>
              </Link>
          </div>
        </Card>
    </div>
  );
}
