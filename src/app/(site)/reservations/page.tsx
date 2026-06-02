import Image from "next/image";
import { Phone, Clock, Users } from "lucide-react";
import ReservationForm from "@/components/ReservationForm";

export default function ReservationsPage() {
  return (
    <div>
      <section className="bg-stone-900 py-16 text-center text-white">
        <p className="font-serif text-lg italic text-brand-300">We can&apos;t wait to host you</p>
        <h1 className="mt-1 font-serif text-4xl font-bold">Book a Table</h1>
      </section>

      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 lg:grid-cols-2">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80"
              alt="Dining table"
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-6 space-y-3 text-sm text-stone-600">
            <p className="flex items-center gap-2"><Clock size={18} className="text-brand-600" /> Open daily, 12:00 PM – 11:00 PM</p>
            <p className="flex items-center gap-2"><Users size={18} className="text-brand-600" /> Parties of 1–20 — for larger groups, call us</p>
            <p className="flex items-center gap-2"><Phone size={18} className="text-brand-600" /> +91 98765 43210</p>
          </div>
          <div className="mt-4 rounded-lg bg-brand-50 p-4 text-sm text-stone-700">
            Tables are held for 15 minutes past the reserved time. You&apos;ll receive a
            confirmation once our team reviews your request.
          </div>
        </div>

        <div>
          <ReservationForm />
        </div>
      </div>
    </div>
  );
}
