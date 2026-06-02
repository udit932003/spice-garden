import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "sg_admin";
const SECRET = process.env.AUTH_SECRET || "dev-secret-change-me";

function sign(value: string) {
  const hmac = crypto.createHmac("sha256", SECRET).update(value).digest("hex");
  return `${value}.${hmac}`;
}

function verify(signed: string) {
  const [value, hmac] = signed.split(".");
  if (!value || !hmac) return null;
  const expected = crypto.createHmac("sha256", SECRET).update(value).digest("hex");
  const a = Buffer.from(hmac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  return value;
}

export function checkPassword(password: string) {
  return password === (process.env.ADMIN_PASSWORD || "admin123");
}

export function createSession() {
  cookies().set(COOKIE_NAME, sign(`admin:${Date.now()}`), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export function destroySession() {
  cookies().delete(COOKIE_NAME);
}

export function isAuthenticated() {
  const cookie = cookies().get(COOKIE_NAME);
  return cookie ? verify(cookie.value) !== null : false;
}
