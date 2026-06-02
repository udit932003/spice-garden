"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/reservations", label: "Reservations" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-white">
            <UtensilsCrossed size={18} />
          </span>
          <span className="font-serif text-xl font-bold text-stone-900">
            Spice <span className="text-brand-600">Garden</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                pathname === l.href ? "text-brand-600" : "text-stone-600 hover:text-brand-600"
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/reservations" className="btn-primary ml-2 hidden sm:inline-flex">
            Book a table
          </Link>
        </nav>
      </div>
    </header>
  );
}
