import Link from "next/link";
import { UtensilsCrossed, MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-stone-900 text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-white">
            <UtensilsCrossed size={20} className="text-brand-500" />
            <span className="font-serif text-xl font-bold">Spice Garden</span>
          </div>
          <p className="mt-3 text-sm text-stone-400">
            Authentic Indian cuisine crafted with love and the finest spices since 1998.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <h4 className="font-semibold text-white">Visit us</h4>
          <p className="flex items-center gap-2"><MapPin size={16} className="text-brand-500" /> 24 Garden Road, Pune 411001</p>
          <p className="flex items-center gap-2"><Phone size={16} className="text-brand-500" /> +91 98765 43210</p>
          <p className="flex items-center gap-2"><Clock size={16} className="text-brand-500" /> 12:00 PM – 11:00 PM, daily</p>
        </div>
        <div className="space-y-2 text-sm">
          <h4 className="font-semibold text-white">Links</h4>
          <p><Link href="/menu" className="hover:text-brand-400">Our Menu</Link></p>
          <p><Link href="/reservations" className="hover:text-brand-400">Book a Table</Link></p>
          <p><Link href="/admin" className="hover:text-brand-400">Staff Login</Link></p>
        </div>
      </div>
      <div className="border-t border-stone-800 py-4 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} Spice Garden · Portfolio demo · Next.js + Prisma + SQLite
      </div>
    </footer>
  );
}
