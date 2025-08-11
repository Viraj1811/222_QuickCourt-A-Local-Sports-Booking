import type { Venue, Booking, Amenity, Review, Court } from "@/lib/types";
import { ShowerHead, Wifi, Car, UtensilsCrossed, Gamepad2 } from "lucide-react";

export const amenities: Record<string, Amenity> = {
  parking: { id: "parking", name: "Parking", icon: Car },
  wifi: { id: "wifi", name: "Free Wi-Fi", icon: Wifi },
  showers: { id: "showers", name: "Showers", icon: ShowerHead },
  cafe: { id: "cafe", name: "Cafe", icon: UtensilsCrossed },
  equipment: { id: "equipment", name: "Equipment Rental", icon: Gamepad2 },
};

const reviews: Review[] = [
  {
    id: 1,
    user: "Ravi Kumar",
    userAvatar: "https://placehold.co/100x100.png",
    rating: 5,
    comment: "Excellent courts and great facilities. The staff was very helpful. Will definitely come back!",
    date: "2024-07-15",
    response: "Thank you, Ravi! We're thrilled you had a great experience. See you on the court soon!",
  },
  {
    id: 2,
    user: "Priya Sharma",
    userAvatar: "https://placehold.co/100x100.png",
    rating: 4,
    comment: "Good venue, but the booking process was a bit confusing. The courts are well-maintained though.",
    date: "2024-07-10",
  },
  {
    id: 3,
    user: "Amit Singh",
    userAvatar: "https://placehold.co/100x100.png",
    rating: 3,
    comment: "The place is decent, but can get very crowded on weekends. Wish there were more slots available.",
    date: "2024-06-28",
  },
];

const courts: Court[] = [
  { id: 1, name: "Clay Court 1", sport: "Tennis" },
  { id: 2, name: "Hard Court 2", sport: "Tennis" },
  { id: 3, name: "Wooden Court 1", sport: "Badminton" },
  { id: 4, name: "Indoor Court A", sport: "Basketball" },
  { id: 5, name: "5-a-side Pitch", sport: "Football" },
];

export const venues: Venue[] = [
  {
    id: 1,
    name: "Mumbai Sports Arena",
    location: "Andheri, Mumbai",
    rating: 4.8,
    photos: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    description: "State-of-the-art multi-sport facility in the heart of Mumbai. We offer world-class courts for tennis, badminton, and basketball, along with premium amenities.",
    amenities: [amenities.parking, amenities.wifi, amenities.showers, amenities.cafe],
    courts: [courts[0], courts[1], courts[2], courts[3]],
    reviews: reviews,
    owner: { id: 101, name: "Sports Facility Owner" },
  },
  {
    id: 2,
    name: "Delhi Racquet Club",
    location: "Hauz Khas, Delhi",
    rating: 4.5,
    photos: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    description: "Delhi's premier destination for racquet sports. Featuring professional-grade tennis and badminton courts.",
    amenities: [amenities.parking, amenities.showers, amenities.equipment],
    courts: [courts[0], courts[1], courts[2]],
    reviews: [reviews[1], reviews[2]],
    owner: { id: 101, name: "Sports Facility Owner" },
  },
  {
    id: 3,
    name: "Bangalore Football Center",
    location: "Koramangala, Bangalore",
    rating: 4.7,
    photos: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    description: "The best place for 5-a-side football in Bangalore. Perfect for corporate events and friendly matches.",
    amenities: [amenities.parking, amenities.cafe],
    courts: [courts[4]],
    reviews: [reviews[0]],
    owner: { id: 102, name: "Other Owner" },
  },
];

export const bookings: Booking[] = [
  {
    id: 1,
    venue: { id: 1, name: "Mumbai Sports Arena", photos: venues[0].photos },
    court: courts[0],
    date: "2024-08-10",
    time: "10:00 AM",
    status: "Upcoming",
  },
  {
    id: 2,
    venue: { id: 2, name: "Delhi Racquet Club", photos: venues[1].photos },
    court: courts[2],
    date: "2024-08-12",
    time: "05:00 PM",
    status: "Upcoming",
  },
  {
    id: 3,
    venue: { id: 1, name: "Mumbai Sports Arena", photos: venues[0].photos },
    court: courts[3],
    date: "2024-07-05",
    time: "07:00 PM",
    status: "Completed",
  },
  {
    id: 4,
    venue: { id: 3, name: "Bangalore Football Center", photos: venues[2].photos },
    court: courts[4],
    date: "2024-06-20",
    time: "08:00 PM",
    status: "Completed",
  },
  {
    id: 5,
    venue: { id: 2, name: "Delhi Racquet Club", photos: venues[1].photos },
    court: courts[1],
    date: "2024-07-01",
    time: "09:00 AM",
    status: "Cancelled",
  },
];
