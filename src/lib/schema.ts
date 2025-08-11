import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  real,
  date,
  pgEnum,
  timestamp,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const userRoleEnum = pgEnum('user_role', ['player', 'owner']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  role: userRoleEnum('role').notNull(),
  avatarUrl: text('avatar_url'),
});

export const venues = pgTable('venues', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  rating: real('rating').notNull(),
  description: text('description').notNull(),
  ownerId: integer('owner_id')
    .notNull()
    .references(() => users.id),
});

export const venuePhotos = pgTable('venue_photos', {
    id: serial('id').primaryKey(),
    venueId: integer('venue_id').notNull().references(() => venues.id, { onDelete: 'cascade' }),
    url: text('url').notNull(),
});

export const amenities = pgTable('amenities', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  name: varchar('name', { length: 100 }).notNull(),
  iconName: varchar('icon_name', { length: 50 }).notNull(),
});

export const venueAmenities = pgTable('venue_amenities', {
  venueId: integer('venue_id').notNull().references(() => venues.id, { onDelete: 'cascade' }),
  amenityId: integer('amenity_id').notNull().references(() => amenities.id, { onDelete: 'cascade' }),
});

export const courts = pgTable('courts', {
  id: serial('id').primaryKey(),
  venueId: integer('venue_id').notNull().references(() => venues.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull(),
  sport: text('sport', { enum: ['Tennis', 'Badminton', 'Basketball', 'Football']}).notNull(),
});

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  venueId: integer('venue_id').notNull().references(() => venues.id, { onDelete: 'cascade' }),
  userId: integer('user_id').notNull().references(() => users.id),
  rating: integer('rating').notNull(),
  comment: text('comment').notNull(),
  date: timestamp('date', { mode: 'date' }).notNull().defaultNow(),
  response: text('response'),
});

export const bookingStatusEnum = pgEnum('booking_status', ['Upcoming', 'Completed', 'Cancelled']);

export const bookings = pgTable('bookings', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id),
    venueId: integer('venue_id').notNull().references(() => venues.id),
    courtId: integer('court_id').notNull().references(() => courts.id),
    date: date('date').notNull(),
    time: varchar('time', {length: 50}).notNull(),
    status: bookingStatusEnum('status').notNull(),
});


// RELATIONS

export const usersRelations = relations(users, ({ one, many }) => ({
  reviews: many(reviews),
  bookings: many(bookings),
  venues: many(venues),
}));

export const venuesRelations = relations(venues, ({ one, many }) => ({
  owner: one(users, {
    fields: [venues.ownerId],
    references: [users.id],
  }),
  photos: many(venuePhotos),
  amenities: many(venueAmenities),
  courts: many(courts),
  reviews: many(reviews),
  bookings: many(bookings),
}));

export const venuePhotosRelations = relations(venuePhotos, ({ one }) => ({
    venue: one(venues, {
        fields: [venuePhotos.venueId],
        references: [venues.id],
    }),
}));

export const amenitiesRelations = relations(amenities, ({ many }) => ({
  venues: many(venueAmenities),
}));

export const venueAmenitiesRelations = relations(venueAmenities, ({ one }) => ({
  venue: one(venues, {
    fields: [venueAmenities.venueId],
    references: [venues.id],
  }),
  amenity: one(amenities, {
    fields: [venueAmenities.amenityId],
    references: [amenities.id],
  }),
}));

export const courtsRelations = relations(courts, ({ one, many }) => ({
  venue: one(venues, {
    fields: [courts.venueId],
    references: [venues.id],
  }),
  bookings: many(bookings),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  venue: one(venues, {
    fields: [reviews.venueId],
    references: [venues.id],
  }),
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
    user: one(users, {
        fields: [bookings.userId],
        references: [users.id],
    }),
    venue: one(venues, {
        fields: [bookings.venueId],
        references: [venues.id],
    }),
    court: one(courts, {
        fields: [bookings.courtId],
        references: [courts.id],
    }),
}));
