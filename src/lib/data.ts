import type { Venue, Booking, Review, Amenity, Court } from "@/lib/types";
import * as lucideIcons from "lucide-react";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    Car: lucideIcons.Car,
    Wifi: lucideIcons.Wifi,
    ShowerHead: lucideIcons.ShowerHead,
    UtensilsCrossed: lucideIcons.UtensilsCrossed,
    Gamepad2: lucideIcons.Gamepad2,
    default: lucideIcons.Star,
}; 

const mockReviews: Review[] = [
    { id: 1, user: 'Alice', userAvatar: 'https://placehold.co/100x100.png', rating: 5, comment: 'Amazing facility, clean and well-maintained. Will definitely come back!', date: '2023-10-01', response: 'Thank you, Alice! We are glad you enjoyed your visit.' },
    { id: 2, user: 'Bob', userAvatar: 'https://placehold.co/100x100.png', rating: 4, comment: 'Great courts, but the booking process was a bit confusing.', date: '2023-09-25' },
    { id: 3, user: 'Charlie', userAvatar: 'https://placehold.co/100x100.png', rating: 5, comment: 'Top-notch amenities and friendly staff.', date: '2023-09-20' },
];

const mockAmenities: Amenity[] = [
    { id: 'parking', name: 'Parking', icon: iconMap.Car },
    { id: 'wifi', name: 'Free WiFi', icon: iconMap.Wifi },
    { id: 'showers', name: 'Showers', icon: iconMap.ShowerHead },
    { id: 'cafe', name: 'Cafe', icon: iconMap.UtensilsCrossed },
];

const mockCourts: Court[] = [
    { id: 1, name: 'Clay Court 1', sport: 'Tennis' },
    { id: 2, name: 'Hard Court 2', sport: 'Tennis' },
    { id: 3, name: 'Badminton Court A', sport: 'Badminton' },
    { id: 4, name: 'Main Basketball Court', sport: 'Basketball' },
    { id: 5, name: '5-a-side Pitch', sport: 'Football' },
];

const mockVenues: Venue[] = [
  {
    id: 1,
    name: "Grand Slam Tennis Club",
    location: "Mumbai, Maharashtra",
    rating: 4.8,
    photos: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    description: "Experience world-class tennis facilities at Grand Slam Tennis Club. We offer state-of-the-art clay and hard courts suitable for all levels of players.",
    amenities: mockAmenities.slice(0,3),
    courts: mockCourts.slice(0, 2),
    reviews: mockReviews,
    owner: { id: 101, name: 'Mr. Owner' }
  },
  {
    id: 2,
    name: "Shuttle Smash Arena",
    location: "Delhi, NCR",
    rating: 4.5,
    photos: ["https://placehold.co/600x400.png"],
    description: "The best place for badminton enthusiasts in Delhi. Our courts are equipped with professional-grade lighting and flooring.",
    amenities: mockAmenities,
    courts: [mockCourts[2]],
    reviews: [mockReviews[1]],
    owner: { id: 101, name: 'Mr. Owner' }
  },
  {
    id: 3,
    name: "Dunk City Basketball",
    location: "Bengaluru, Karnataka",
    rating: 4.9,
    photos: ["https://placehold.co/600x400.png"],
    description: "The premier destination for basketball lovers. Full-sized indoor courts with FIBA-approved standards.",
    amenities: [mockAmenities[0], mockAmenities[2]],
    courts: [mockCourts[3]],
    reviews: [mockReviews[0]],
    owner: { id: 102, name: 'Ms. Proprietor' }
  },
];

const mockBookings: (Omit<Booking, 'venue'> & {venueId: number})[] = [
    { id: 1, userId: 1, venueId: 1, courtId: 1, date: '2024-08-15', time: '10:00 AM', status: 'Upcoming' },
    { id: 2, userId: 1, venueId: 2, courtId: 3, date: '2024-07-20', time: '06:00 PM', status: 'Completed' },
    { id: 3, userId: 1, venueId: 3, courtId: 4, date: '2024-07-10', time: '07:00 PM', status: 'Cancelled' },
];

export async function getAllVenues(): Promise<Venue[]> {
    return Promise.resolve(mockVenues);
}

export async function getVenueById(id: number): Promise<Venue | null> {
    const venue = mockVenues.find(v => v.id === id);
    return Promise.resolve(venue || null);
}

export async function getBookingsByUserId(userId: number): Promise<Booking[]> {
  const userBookings = mockBookings.filter(b => b.userId === userId);
  const result: Booking[] = userBookings.map(b => {
      const venue = mockVenues.find(v => v.id === b.venueId)!;
      const court = venue.courts.find(c => c.id === b.courtId)!;
      return {
          id: b.id,
          venue: {
              id: venue.id,
              name: venue.name,
              photos: venue.photos,
          },
          court: court,
          date: b.date,
          time: b.time,
          status: b.status,
      };
  });
  return Promise.resolve(result);
}

export async function searchVenues(query: string, sport?: string): Promise<Venue[]> {
    let filteredVenues = mockVenues;
    if(query){
       filteredVenues = mockVenues.filter(venue =>
        venue.name.toLowerCase().includes(query.toLowerCase()) ||
        venue.location.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (sport && sport !== "all") {
        filteredVenues = filteredVenues.filter(venue => venue.courts.some(c => c.sport.toLowerCase() === sport.toLowerCase()));
    }
    
    return Promise.resolve(filteredVenues);
}


export async function getReviewsByOwnerId(ownerId: number) {
    const ownerVenues = mockVenues.filter(v => v.owner.id === ownerId);
    const ownerReviews = ownerVenues.flatMap(v =>
        v.reviews.map(review => ({
            review: review,
            venue: {
                id: v.id,
                name: v.name,
            }
        }))
    );
    return Promise.resolve(ownerReviews);
}
