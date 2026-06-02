import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf, Award, Clock, Flame } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await prisma.menuItem.findMany({
    where: { featured: true, available: true },
    take: 4,
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80"
            alt="Restaurant interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-stone-900/65" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-28 text-center text-white md:py-40">
          <p className="font-serif text-lg italic text-brand-300">Since 1998</p>
          <h1 className="mt-2 font-serif text-4xl font-bold leading-tight md:text-6xl">
            A Taste of Authentic India
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-stone-200">
            Hand-ground spices, time-honoured recipes, and warm hospitality —
            served fresh at the heart of Pune.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/reservations" className="btn-primary">
              Book a table <ArrowRight size={18} />
            </Link>
            <Link href="/menu" className="btn border border-white/30 text-white hover:bg-white/10">
              View menu
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4">
        {[
          { icon: Leaf, title: "Farm Fresh", sub: "Locally sourced daily" },
          { icon: Award, title: "Award Winning", sub: "Best Indian 2023" },
          { icon: Flame, title: "Authentic Spices", sub: "Ground in-house" },
          { icon: Clock, title: "Open Daily", sub: "12 PM – 11 PM" },
        ].map((h) => (
          <div key={h.title} className="text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-50 text-brand-600">
              <h.icon size={22} />
            </span>
            <p className="mt-3 font-semibold text-stone-900">{h.title}</p>
            <p className="text-sm text-stone-500">{h.sub}</p>
          </div>
        ))}
      </section>

      {/* About */}
      <section className="bg-stone-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=900&q=80"
              alt="Indian thali"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-serif text-lg italic text-brand-600">Our story</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-stone-900">
              Recipes passed down through generations
            </h2>
            <p className="mt-4 leading-relaxed text-stone-600">
              At Spice Garden, every dish tells a story. Our chefs blend traditional
              techniques with the freshest ingredients to bring you the rich,
              diverse flavours of India — from creamy butter chicken to fragrant
              Hyderabadi biryani.
            </p>
            <Link href="/menu" className="btn-outline mt-6">
              Explore our menu <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured dishes */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <p className="font-serif text-lg italic text-brand-600">Chef&apos;s picks</p>
          <h2 className="mt-1 font-serif text-3xl font-bold text-stone-900">Signature Dishes</h2>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {featured.map((item) => (
            <div key={item.id} className="card overflow-hidden">
              <div className="relative aspect-square">
                <Image src={item.image} alt={item.name} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-stone-900">{item.name}</h3>
                  <span className={`mt-1 h-3 w-3 shrink-0 rounded-sm border ${item.isVeg ? "border-green-600" : "border-red-600"}`}>
                    <span className={`block h-1.5 w-1.5 translate-x-[3px] translate-y-[3px] rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`} />
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-stone-500">{item.description}</p>
                <p className="mt-2 font-bold text-brand-600">{formatPrice(item.price)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/reservations" className="btn-primary">Reserve your table now</Link>
        </div>
      </section>
    </div>
  );
}
