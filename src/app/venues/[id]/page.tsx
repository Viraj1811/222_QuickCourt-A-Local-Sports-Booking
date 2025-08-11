
import Image from "next/image";
import { notFound } from "next/navigation";
import { getVenueById } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
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
import VenueBookingClient from './VenueBookingClient';


export default async function VenueDetailsPage({ params }: { params: { id: string } }) {
  const venueId = parseInt(params.id);
  if (isNaN(venueId)) {
      notFound();
  }
  const venue = await getVenueById(venueId);

  if (!venue) {
    notFound();
  }

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
                <VenueBookingClient venueName={venue.name} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
