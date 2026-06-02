"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { createReservation } from "@/app/actions";
import { TIME_SLOTS } from "@/lib/utils";

export default function ReservationForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const result = await createReservation({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      date: fd.get("date"),
      time: fd.get("time"),
      guests: fd.get("guests"),
      notes: fd.get("notes") || undefined,
    });
    if (result.ok) {
      setDone(true);
    } else {
      setError(result.error || "Something went wrong");
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="card grid place-items-center p-10 text-center">
        <CheckCircle2 size={48} className="text-green-600" />
        <h2 className="mt-4 font-serif text-2xl font-bold text-stone-900">Reservation requested!</h2>
        <p className="mt-2 text-stone-500">
          Thank you. Our team will confirm your booking shortly via email or phone.
        </p>
        <button onClick={() => { setDone(false); setLoading(false); }} className="btn-outline mt-6">
          Make another booking
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-6">
      <h2 className="font-serif text-2xl font-bold text-stone-900">Reserve your table</h2>
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div>
        <label className="label">Full name</label>
        <input name="name" required className="input" placeholder="Your name" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Email</label>
          <input name="email" type="email" required className="input" placeholder="you@example.com" />
        </div>
        <div>
          <label className="label">Phone</label>
          <input name="phone" required className="input" placeholder="98765 43210" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="label">Date</label>
          <input name="date" type="date" required min={today} className="input" />
        </div>
        <div>
          <label className="label">Time</label>
          <select name="time" required className="input" defaultValue="">
            <option value="" disabled>Select</option>
            {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Guests</label>
          <input name="guests" type="number" min={1} max={20} required defaultValue={2} className="input" />
        </div>
      </div>
      <div>
        <label className="label">Special requests (optional)</label>
        <textarea name="notes" rows={3} className="input resize-none" placeholder="Allergies, occasion, seating preference..." />
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? <><Loader2 size={18} className="animate-spin" /> Booking...</> : "Request reservation"}
      </button>
    </form>
  );
}
