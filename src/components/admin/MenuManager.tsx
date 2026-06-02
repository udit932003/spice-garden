"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Trash2, Loader2, X } from "lucide-react";
import { createMenuItem, toggleMenuAvailable, deleteMenuItem } from "@/app/actions";
import { formatPrice, MENU_CATEGORIES } from "@/lib/utils";

type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVeg: boolean;
  spicy: boolean;
  available: boolean;
};

export default function MenuManager({ items }: { items: Item[] }) {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [pending, startTransition] = useTransition();

  async function handleCreate(formData: FormData) {
    setError("");
    setSaving(true);
    const res = await createMenuItem(formData);
    if (res.ok) {
      setShowForm(false);
    } else {
      setError(res.error || "Failed to add item");
    }
    setSaving(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Menu</h1>
          <p className="mt-1 text-sm text-stone-500">{items.length} dishes</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus size={18} /> Add dish
        </button>
      </div>

      <div className="card mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-left text-xs uppercase text-stone-500">
              <tr>
                <th className="px-5 py-3 font-medium">Dish</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Available</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                        <Image src={item.image} alt={item.name} fill sizes="44px" className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-stone-800">{item.name}</p>
                        <p className="text-xs text-stone-400">{item.isVeg ? "Veg" : "Non-veg"}{item.spicy ? " · Spicy" : ""}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-stone-600">
                    {MENU_CATEGORIES.find((c) => c.key === item.category)?.label ?? item.category}
                  </td>
                  <td className="px-5 py-3 font-semibold">{formatPrice(item.price)}</td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => startTransition(() => { toggleMenuAvailable(item.id, !item.available); })}
                      disabled={pending}
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.available ? "bg-green-100 text-green-700" : "bg-stone-200 text-stone-500"}`}
                    >
                      {item.available ? "Available" : "Hidden"}
                    </button>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={() => startTransition(() => { deleteMenuItem(item.id); })}
                      disabled={pending}
                      className="text-stone-400 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-stone-900/50 p-4" onClick={() => setShowForm(false)}>
          <div className="card w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-stone-900">Add a dish</h2>
              <button onClick={() => setShowForm(false)} className="text-stone-400 hover:text-stone-600"><X size={20} /></button>
            </div>
            <form action={handleCreate} className="mt-4 space-y-4">
              {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
              <div>
                <label className="label">Dish name</label>
                <input name="name" required className="input" placeholder="Butter Chicken" />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea name="description" required rows={2} className="input resize-none" placeholder="Tender chicken in a creamy tomato gravy." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Price (₹)</label>
                  <input name="price" type="number" step="0.01" required className="input" placeholder="420" />
                </div>
                <div>
                  <label className="label">Category</label>
                  <select name="category" required defaultValue="" className="input">
                    <option value="" disabled>Select</option>
                    {MENU_CATEGORIES.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Image URL</label>
                <input name="image" required className="input" placeholder="https://..." />
              </div>
              <div className="flex gap-5 text-sm">
                <label className="flex items-center gap-2"><input name="isVeg" type="checkbox" defaultChecked className="h-4 w-4" /> Vegetarian</label>
                <label className="flex items-center gap-2"><input name="spicy" type="checkbox" className="h-4 w-4" /> Spicy</label>
                <label className="flex items-center gap-2"><input name="featured" type="checkbox" className="h-4 w-4" /> Featured</label>
              </div>
              <button type="submit" disabled={saving} className="btn-primary w-full">
                {saving ? <><Loader2 size={16} className="animate-spin" /> Adding...</> : "Add dish"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
