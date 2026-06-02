import { CalendarCheck, Clock, Users, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import ResStatusSelect from "@/components/admin/ResStatusSelect";

export const dynamic = "force-dynamic";

export default async function AdminReservationsPage() {
  const reservations = await prisma.reservation.findMany({
    orderBy: { date: "asc" },
  });

  const total = reservations.length;
  const pending = reservations.filter((r) => r.status === "PENDING").length;
  const confirmed = reservations.filter((r) => r.status === "CONFIRMED").length;
  const guests = reservations
    .filter((r) => r.status === "CONFIRMED")
    .reduce((s, r) => s + r.guests, 0);

  const stats = [
    { label: "Total bookings", value: total, icon: CalendarCheck, tint: "bg-brand-50 text-brand-600" },
    { label: "Pending", value: pending, icon: Clock, tint: "bg-amber-50 text-amber-600" },
    { label: "Confirmed", value: confirmed, icon: CheckCircle2, tint: "bg-green-50 text-green-600" },
    { label: "Confirmed guests", value: guests, icon: Users, tint: "bg-blue-50 text-blue-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900">Reservations</h1>
      <p className="mt-1 text-sm text-stone-500">Review and manage table bookings</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <span className={`grid h-10 w-10 place-items-center rounded-lg ${s.tint}`}>
              <s.icon size={20} />
            </span>
            <p className="mt-3 text-2xl font-bold text-stone-900">{s.value}</p>
            <p className="text-sm text-stone-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="card mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-left text-xs uppercase text-stone-500">
              <tr>
                <th className="px-5 py-3 font-medium">Guest</th>
                <th className="px-5 py-3 font-medium">Date & time</th>
                <th className="px-5 py-3 font-medium">Party</th>
                <th className="px-5 py-3 font-medium">Contact</th>
                <th className="px-5 py-3 font-medium">Notes</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {reservations.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-12 text-center text-stone-400">No reservations yet</td></tr>
              )}
              {reservations.map((r) => (
                <tr key={r.id} className="hover:bg-stone-50">
                  <td className="px-5 py-4 font-medium text-stone-800">{r.name}</td>
                  <td className="px-5 py-4 text-stone-600">{formatDate(r.date)}<br /><span className="text-xs text-stone-400">{r.time}</span></td>
                  <td className="px-5 py-4 text-stone-600">{r.guests} guests</td>
                  <td className="px-5 py-4 text-stone-500"><span className="block">{r.phone}</span><span className="block text-xs">{r.email}</span></td>
                  <td className="px-5 py-4 max-w-[180px] text-stone-500">{r.notes || <span className="text-stone-300">—</span>}</td>
                  <td className="px-5 py-4"><ResStatusSelect id={r.id} current={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
