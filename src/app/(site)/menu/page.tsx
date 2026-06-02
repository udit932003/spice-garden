import Link from "next/link";
import Image from "next/image";
import { Flame } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice, MENU_CATEGORIES } from "@/lib/utils";
import VegBadge from "@/components/VegBadge";

export const dynamic = "force-dynamic";

export default async function MenuPage({
  searchParams,
}: {
  searchParams: { diet?: string };
}) {
  const diet = searchParams.diet;
  const where: { available: boolean; isVeg?: boolean } = { available: true };
  if (diet === "veg") where.isVeg = true;
  if (diet === "nonveg") where.isVeg = false;

  const items = await prisma.menuItem.findMany({
    where,
    orderBy: { name: "asc" },
  });

  const filters = [
    { key: undefined, label: "All" },
    { key: "veg", label: "🟢 Veg" },
    { key: "nonveg", label: "🔴 Non-Veg" },
  ];

  return (
    <div>
      <section className="bg-stone-900 py-16 text-center text-white">
        <p className="font-serif text-lg italic text-brand-300">Crafted with care</p>
        <h1 className="mt-1 font-serif text-4xl font-bold">Our Menu</h1>
        <p className="mx-auto mt-3 max-w-md px-4 text-stone-300">
          Authentic Indian dishes prepared fresh to order.
        </p>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* Diet filter */}
        <div className="mb-10 flex justify-center gap-2">
          {filters.map((f) => {
            const active = (diet ?? undefined) === f.key;
            return (
              <Link
                key={f.label}
                href={f.key ? `/menu?diet=${f.key}` : "/menu"}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${active ? "bg-brand-600 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}
              >
                {f.label}
              </Link>
            );
          })}
        </div>

        {MENU_CATEGORIES.map((cat) => {
          const catItems = items.filter((i) => i.category === cat.key);
          if (catItems.length === 0) return null;
          return (
            <section key={cat.key} className="mb-12">
              <h2 className="mb-1 font-serif text-2xl font-bold text-stone-900">{cat.label}</h2>
              <div className="mb-6 h-px w-16 bg-brand-500" />
              <div className="space-y-5">
                {catItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                      <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                    </div>
                    <div className="flex-1 border-b border-dashed border-stone-200 pb-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <VegBadge isVeg={item.isVeg} />
                          <h3 className="font-semibold text-stone-900">{item.name}</h3>
                          {item.spicy && <Flame size={14} className="text-brand-600" />}
                        </div>
                        <span className="whitespace-nowrap font-bold text-brand-600">{formatPrice(item.price)}</span>
                      </div>
                      <p className="mt-1 text-sm text-stone-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {items.length === 0 && (
          <p className="py-16 text-center text-stone-400">No dishes match this filter.</p>
        )}
      </div>
    </div>
  );
}
