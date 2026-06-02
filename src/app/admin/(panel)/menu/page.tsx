import { prisma } from "@/lib/prisma";
import MenuManager from "@/components/admin/MenuManager";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const items = await prisma.menuItem.findMany({ orderBy: { createdAt: "desc" } });
  return <MenuManager items={items} />;
}
