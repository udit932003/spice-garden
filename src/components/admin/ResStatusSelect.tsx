"use client";

import { useTransition } from "react";
import { updateReservationStatus } from "@/app/actions";
import { RES_STATUS } from "@/lib/utils";

export default function ResStatusSelect({ id, current }: { id: string; current: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={current}
      disabled={pending}
      onChange={(e) => startTransition(() => { updateReservationStatus(id, e.target.value); })}
      className={`cursor-pointer rounded-full border-0 px-2.5 py-1 text-xs font-semibold outline-none ring-1 ring-inset ring-stone-200 ${RES_STATUS[current]} ${pending ? "opacity-50" : ""}`}
    >
      <option value="PENDING">PENDING</option>
      <option value="CONFIRMED">CONFIRMED</option>
      <option value="CANCELLED">CANCELLED</option>
    </select>
  );
}
