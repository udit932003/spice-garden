import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(8, "Enter a valid phone number"),
  date: z.string().min(1, "Please pick a date"),
  time: z.string().min(1, "Please pick a time"),
  guests: z.coerce.number().int().min(1).max(20, "For 20+ guests please call us"),
  notes: z.string().optional(),
});

export const menuItemSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  description: z.string().min(5, "Description is too short"),
  price: z.coerce.number().positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Must be a valid image URL"),
  isVeg: z.coerce.boolean().optional(),
  spicy: z.coerce.boolean().optional(),
  featured: z.coerce.boolean().optional(),
});
