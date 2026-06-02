"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAuthenticated, checkPassword, createSession, destroySession } from "@/lib/auth";
import { reservationSchema, menuItemSchema } from "@/lib/validators";

export type Result = { ok: boolean; error?: string };

/* -------- Public: reservations -------- */
export async function createReservation(
  data: unknown
): Promise<Result & { id?: string }> {
  const parsed = reservationSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  try {
    const r = await prisma.reservation.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        date: new Date(parsed.data.date),
        time: parsed.data.time,
        guests: parsed.data.guests,
        notes: parsed.data.notes,
      },
    });
    revalidatePath("/admin");
    return { ok: true, id: r.id };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Could not create reservation. Please try again." };
  }
}

/* -------- Admin: auth -------- */
export async function login(_prev: unknown, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) return { error: "Incorrect password" };
  createSession();
  redirect("/admin");
}

export async function logout() {
  destroySession();
  redirect("/admin/login");
}

/* -------- Admin: reservations -------- */
export async function updateReservationStatus(id: string, status: string): Promise<Result> {
  if (!isAuthenticated()) return { ok: false, error: "Unauthorized" };
  if (!["PENDING", "CONFIRMED", "CANCELLED"].includes(status))
    return { ok: false, error: "Invalid status" };
  await prisma.reservation.update({ where: { id }, data: { status } });
  revalidatePath("/admin");
  return { ok: true };
}

/* -------- Admin: menu -------- */
export async function createMenuItem(formData: FormData): Promise<Result> {
  if (!isAuthenticated()) return { ok: false, error: "Unauthorized" };
  const parsed = menuItemSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    category: formData.get("category"),
    image: formData.get("image"),
    isVeg: formData.get("isVeg") === "on",
    spicy: formData.get("spicy") === "on",
    featured: formData.get("featured") === "on",
  });
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  await prisma.menuItem.create({
    data: {
      name: parsed.data.name,
      description: parsed.data.description,
      price: parsed.data.price,
      category: parsed.data.category,
      image: parsed.data.image,
      isVeg: parsed.data.isVeg ?? true,
      spicy: parsed.data.spicy ?? false,
      featured: parsed.data.featured ?? false,
    },
  });
  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  return { ok: true };
}

export async function toggleMenuAvailable(id: string, available: boolean): Promise<Result> {
  if (!isAuthenticated()) return { ok: false, error: "Unauthorized" };
  await prisma.menuItem.update({ where: { id }, data: { available } });
  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  return { ok: true };
}

export async function deleteMenuItem(id: string): Promise<Result> {
  if (!isAuthenticated()) return { ok: false, error: "Unauthorized" };
  await prisma.menuItem.delete({ where: { id } });
  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  return { ok: true };
}
