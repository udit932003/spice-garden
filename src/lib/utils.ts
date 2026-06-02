import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number) {
  return "₹" + price.toLocaleString("en-IN");
}

export function formatDate(date: Date | string) {
  return format(new Date(date), "EEE, MMM d, yyyy");
}

export const MENU_CATEGORIES = [
  { key: "STARTERS", label: "Starters" },
  { key: "MAINS", label: "Main Course" },
  { key: "BIRYANI", label: "Biryani & Rice" },
  { key: "DESSERTS", label: "Desserts" },
  { key: "DRINKS", label: "Drinks" },
];

export const RES_STATUS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  CONFIRMED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

export const TIME_SLOTS = [
  "12:00", "12:30", "13:00", "13:30", "14:00",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
];
