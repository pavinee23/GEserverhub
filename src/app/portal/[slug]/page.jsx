import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import PortalClient from "@/components/PortalClient";

export const dynamic = "force-dynamic";

async function getClient(slug) {
  const backendUrl =
    process.env.BACKEND_URL || "http://127.0.0.1:8000";
  try {
    const res = await fetch(`${backendUrl}/api/clients`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return (data.clients ?? []).find((c) => c.slug === slug) ?? null;
  } catch {
    return null;
  }
}

async function getProducts(slug) {
  const backendUrl =
    process.env.BACKEND_URL || "http://127.0.0.1:8000";
  try {
    const res = await fetch(
      `${backendUrl}/api/products?client_slug=${encodeURIComponent(slug)}&limit=12`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.products ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const client = await getClient(params.slug);
  return {
    title: client ? `${client.name} — Portal` : "Portal",
  };
}

export default async function PortalPage({ params }) {
  const session = await auth();
  if (!session) redirect("/login");

  const [client, products] = await Promise.all([
    getClient(params.slug),
    getProducts(params.slug),
  ]);

  if (!client) {
    return (
      <main className="d-flex align-items-center justify-content-center vh-100 bg-dark text-white">
        <div className="text-center">
          <h2>ไม่พบระบบ</h2>
          <p className="text-muted">ไม่พบข้อมูลลูกค้า: {params.slug}</p>
          <a href="/portal" className="btn btn-outline-light mt-3">
            กลับหน้า Portal
          </a>
        </div>
      </main>
    );
  }

  return <PortalClient client={client} products={products} session={session} />;
}
