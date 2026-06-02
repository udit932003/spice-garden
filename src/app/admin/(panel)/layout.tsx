import Link from "next/link";
import { redirect } from "next/navigation";
import { CalendarCheck, UtensilsCrossed, LogOut, Store } from "lucide-react";
import { isAuthenticated } from "@/lib/auth";
import { logout } from "@/app/actions";

export const dynamic = "force-dynamic";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <UtensilsCrossed size={20} className="text-brand-600" />
            <span className="font-serif text-lg font-bold text-stone-900">Spice Garden Admin</span>
          </div>
          <nav className="flex items-center gap-1">
            <Link href="/admin" className="btn-ghost"><CalendarCheck size={16} /> Reservations</Link>
            <Link href="/admin/menu" className="btn-ghost"><UtensilsCrossed size={16} /> Menu</Link>
            <Link href="/" className="btn-ghost"><Store size={16} /> Site</Link>
            <form action={logout}>
              <button type="submit" className="btn-ghost text-red-600"><LogOut size={16} /> Logout</button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-4 lg:p-6">{children}</main>
    </div>
  );
}
