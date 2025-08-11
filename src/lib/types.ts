export interface Review {
  id: number;
  user: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  response?: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Court {
  id: number;
  name: string;
  sport: "Tennis" | "Badminton" | "Basketball" | "Football";
}

export interface Venue {
  id: number;
  name: string;
  location: string;
  rating: number;
  photos: string[];
  description: string;
  amenities: Amenity[];
  courts: Court[];
  reviews: Review[];
  owner: {
    id: number;
    name: string;
  };
}

export interface Booking {
  id: number;
  venue: Pick<Venue, 'id' | 'name' | 'photos'>;
  court: Court;
  date: string;
  time: string;
  status: "Upcoming" | "Completed" | "Cancelled";
}
