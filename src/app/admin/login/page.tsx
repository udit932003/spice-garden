"use client";

import { useFormState, useFormStatus } from "react-dom";
import { UtensilsCrossed, Loader2 } from "lucide-react";
import { login } from "@/app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full">
      {pending ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : "Sign in"}
    </button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(login, { error: "" });

  return (
    <div className="grid min-h-screen place-items-center bg-stone-900 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex items-center justify-center gap-2 text-white">
          <UtensilsCrossed size={22} className="text-brand-500" />
          <span className="font-serif text-2xl font-bold">Spice Garden</span>
        </div>
        <div className="card p-8">
          <h1 className="text-xl font-bold text-stone-900">Staff Login</h1>
          <p className="mt-1 text-sm text-stone-500">Manage reservations & menu</p>
          <form action={formAction} className="mt-6 space-y-4">
            {state?.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
            <div>
              <label className="label">Password</label>
              <input name="password" type="password" required className="input" defaultValue="admin123" />
            </div>
            <SubmitButton />
          </form>
          <p className="mt-4 rounded-lg bg-stone-50 p-3 text-center text-xs text-stone-500">
            Demo password pre-filled: <span className="font-mono">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
