
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getReviewsByOwnerId } from "@/lib/data";
import ReviewResponseGenerator from "../dashboard/components/ReviewResponseGenerator";
import type { Review } from '@/lib/types'; 

export default function ReviewsPage() {
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
    <div className="space-y-8">
       <header>
            <h1 className="text-4xl font-bold font-headline">Manage Reviews</h1>
            <p className="text-muted-foreground">Respond to customer feedback and improve your service.</p>
        </header>
        <Card>
          <CardContent className="space-y-6 pt-6">
             {loading ? (
              <p>Loading reviews...</p>
            ) : (
                reviews.map(item => (
                <ReviewResponseGenerator key={`${item.venue.id}-${item.review.id}`} review={item.review} venueName={item.venue.name} />
                ))
            )}
          </CardContent>
        </Card>
    </div>
  );
}
