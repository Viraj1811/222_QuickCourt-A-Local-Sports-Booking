
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { searchVenues } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Search } from "lucide-react";
import StarRating from "@/components/StarRating";
import { Suspense } from "react";

async function SearchResults({ query, sport }: { query: string; sport?: string }) {
    const filteredVenues = await searchVenues(query, sport);

    return (
        <div className="space-y-12">
        <section className="text-center bg-card p-8 rounded-xl shadow-md">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
            Search Results
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {filteredVenues.length > 0 ? `Showing results for "${query}" ${sport ? `in ${sport}` : ''}` : 'No venues found matching your criteria.'}
            </p>
             <form action="/search" method="GET" className="mt-8 max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-background p-4 rounded-lg border">
                    <Input
                    type="text"
                    name="q"
                    placeholder="Search by name or area..."
                    className="md:col-span-2 h-12 text-base"
                    defaultValue={query}
                    />
                    <Select name="sport" defaultValue={sport || undefined}>
                    <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select a sport" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Sports</SelectItem>
                        <SelectItem value="tennis">Tennis</SelectItem>
                        <SelectItem value="badminton">Badminton</SelectItem>
                        <SelectItem value="basketball">Basketball</SelectItem>
                        <SelectItem value="football">Football</SelectItem>
                    </SelectContent>
                    </Select>
                    <Button type="submit" size="lg" className="h-12 text-base bg-accent hover:bg-accent/90">
                    <Search className="mr-2 h-5 w-5" />
                    Search
                    </Button>
                </div>
            </form>
        </section>
        
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVenues.map((venue) => (
                <Card key={venue.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                    <Image
                    src={venue.photos[0]}
                    alt={venue.name}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                    data-ai-hint="sports court"
                    />
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                    <CardTitle className="font-headline text-2xl mb-2">{venue.name}</CardTitle>
                    <CardDescription className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    {venue.location}
                    </CardDescription>
                    <div className="flex items-center">
                    <StarRating rating={venue.rating} />
                    <span className="ml-2 text-sm text-muted-foreground">({venue.reviews.length} reviews)</span>
                    </div>
                </CardContent>
                <CardFooter className="p-6 bg-secondary/30">
                    <Link href={`/venues/${venue.id}`} className="w-full">
                    <Button className="w-full" variant="outline">View Details</Button>
                    </Link>
                </CardFooter>
                </Card>
            ))}
            </div>
        </section>
        </div>
    );
}

export default function SearchPage({ searchParams }: { searchParams: { q: string, sport: string }}) {
    const { q, sport } = searchParams;
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResults query={q} sport={sport === 'all' ? undefined : sport} />
        </Suspense>
    )
}
