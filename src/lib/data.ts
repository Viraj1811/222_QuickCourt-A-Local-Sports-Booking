import { db } from './db';
import { venues as venuesTable, reviews as reviewsTable, bookings as bookingsTable, users as usersTable, courts as courtsTable, venuePhotos as venuePhotosTable } from './schema';
import { eq, and, or, sql } from 'drizzle-orm';
import type { Venue, Booking, Review, Amenity, Court } from "@/lib/types";
import * as lucideIcons from "lucide-react";

const iconMap = {
    Car: lucideIcons.Car,
    Wifi: lucideIcons.Wifi,
    ShowerHead: lucideIcons.ShowerHead,
    UtensilsCrossed: lucideIcons.UtensilsCrossed,
    Gamepad2: lucideIcons.Gamepad2,
    default: lucideIcons.Star,
};

export async function getAllVenues() {
    const venues = await db.query.venues.findMany({
        with: {
            photos: true,
            reviews: {
                with: {
                    user: true
                }
            },
            amenities: {
                with: {
                    amenity: true
                }
            },
            courts: true,
            owner: true
        }
    });

    return venues.map(v => ({
      ...v,
      photos: v.photos.map(p => p.url),
      reviews: v.reviews.map(r => ({
          id: r.id,
          user: r.user.name,
          userAvatar: r.user.avatarUrl ?? 'https://placehold.co/100x100.png',
          rating: r.rating,
          comment: r.comment,
          date: r.date.toISOString(),
          response: r.response ?? undefined,
      })),
      amenities: v.amenities.map(a => ({
          id: a.amenity.slug,
          name: a.amenity.name,
          icon: iconMap[a.amenity.iconName as keyof typeof iconMap] || iconMap.default
      })),
    }));
}

export async function getVenueById(id: number) {
    const venue = await db.query.venues.findFirst({
        where: eq(venuesTable.id, id),
        with: {
            photos: true,
            reviews: {
                 with: {
                    user: true
                }
            },
            amenities: {
                with: {
                    amenity: true
                }
            },
            courts: true,
            owner: true
        }
    });

    if (!venue) return null;

    return {
      ...venue,
      photos: venue.photos.map(p => p.url),
      reviews: venue.reviews.map(r => ({
          id: r.id,
          user: r.user.name,
          userAvatar: r.user.avatarUrl ?? 'https://placehold.co/100x100.png',
          rating: r.rating,
          comment: r.comment,
          date: r.date.toISOString(),
          response: r.response ?? undefined,
      })),
      amenities: venue.amenities.map(a => ({
          id: a.amenity.slug,
          name: a.amenity.name,
          icon: iconMap[a.amenity.iconName as keyof typeof iconMap] || iconMap.default
      })),
    }
}


export async function getBookingsByUserId(userId: number) {
    const userBookings = await db.query.bookings.findMany({
        where: eq(bookingsTable.userId, userId),
        with: {
            venue: {
                with: {
                    photos: {
                        limit: 1
                    }
                }
            },
            court: true,
        },
        orderBy: (bookings, { desc }) => [desc(bookings.date)],
    });

    return userBookings.map(b => ({
        id: b.id,
        venue: {
            id: b.venue.id,
            name: b.venue.name,
            photos: b.venue.photos.map(p => p.url),
        },
        court: {
            id: b.court.id,
            name: b.court.name,
            sport: b.court.sport as Court['sport'],
        },
        date: b.date,
        time: b.time,
        status: b.status as Booking['status'],
    }))
}

export async function searchVenues(query: string, sport?: string) {
    const venues = await db.query.venues.findMany({
        where: and(
            or(
                sql.raw(`LOWER(${venuesTable.name.name}) LIKE LOWER('%${query}%')`),
                sql.raw(`LOWER(${venuesTable.location.name}) LIKE LOWER('%${query}%')`)
            ),
            sport ? sql`${sport} = ANY (SELECT ${courtsTable.sport} FROM ${courtsTable} WHERE ${courtsTable.venueId} = ${venuesTable.id})` : undefined
        ),
        with: {
            photos: true,
            reviews: true,
            courts: true,
        }
    });

     return venues.map(v => ({
      ...v,
      photos: v.photos.map(p => p.url),
      reviews: [], // simplified for search results
      amenities: [], // simplified for search results
      courts: v.courts,
    }));
}

export async function getReviewsByOwnerId(ownerId: number) {
    const reviews = await db.select()
        .from(reviewsTable)
        .innerJoin(venuesTable, eq(reviewsTable.venueId, venuesTable.id))
        .innerJoin(usersTable, eq(reviewsTable.userId, usersTable.id))
        .where(eq(venuesTable.ownerId, ownerId));

    return reviews.map(r => ({
        review: {
            id: r.reviews.id,
            user: r.users.name,
            userAvatar: r.users.avatarUrl ?? 'https://placehold.co/100x100.png',
            rating: r.reviews.rating,
            comment: r.reviews.comment,
            date: r.reviews.date!.toISOString(),
            response: r.reviews.response ?? undefined,
        },
        venue: {
            id: r.venues.id,
            name: r.venues.name,
        }
    }));
}
