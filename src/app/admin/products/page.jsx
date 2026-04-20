import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminProductsClient from "./AdminProductsClient";

export const metadata = { title: "จัดการสินค้า — Admin" };

export default async function AdminProductsPage() {
  const session = await auth();
  if (!session?.user || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
    redirect("/login");
  }
  return <AdminProductsClient />;
}
