import { z } from "zod";

// Zod schema for a single sponsor
const sponsorSchema = z.object({
  id: z.number().positive("ID must be a positive number"),
  name: z.string().min(1, "Name is required"),
  url: z.string().url("Invalid URL"),
});

// Zod schema for the array of sponsors
const sponsorsSchema = z.array(sponsorSchema).min(1, "At least one sponsor is required");

// Zod schema for the main event object
const eventSchema = z.object({
  eventname: z.string().min(1, "Event name is required"),
  description: z.string().min(1, "Description is required"),
  banner: z.instanceof(File).nullable(),
  hostname: z.string().min(1, "Host name is required"),
  eventdate: z.string().min(1, "Event date is required"),
  email: z.string().email("Invalid email address"),
  country: z.string().min(1, "Country is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postal: z.string().min(1, "Postal code is required"),
  audience: z.string().min(1, "Audience is required"),
  type: z.enum(["In Person", "Virtual"]),
  attendees: z.number().min(0, "Attendees must be a positive number"),
  price: z.number().min(0, "Price must be a positive number"),
  tech: z.enum(["Yes", "No"]),
  agenda: z.string().min(1, "Agenda is required"),
  approval: z.string().min(1, "Approval status is required"),
  twitter: z.string().url().optional(),
  website: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  instagram: z.string().url().optional(),
  sponsors: sponsorsSchema, // Integrating the sponsors schema
});

export default eventSchema;
