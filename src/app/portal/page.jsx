import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const metadata = { title: "Portal — GOEUN SERVER HUB" };

const STATUS_LABEL = {
  online: "พร้อมใช้งาน",
  maintenance: "กำลังบำรุงรักษา",
  "coming-soon": "เตรียมเปิดใช้งาน",
};

const STATUS_CLASS = {
  online: "success",
  maintenance: "warning",
  "coming-soon": "secondary",
};

async function getClients() {
  const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:8000";
  try {
    const res = await fetch(`${backendUrl}/api/clients`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.clients ?? [];
  } catch {
    return [];
  }
}

export default async function PortalIndexPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const clients = await getClients();
  const userRole = session?.user?.role;

  // กรองตาม role: ADMIN/SUPER_ADMIN เห็นทั้งหมด, CLIENT เห็นเฉพาะ online
  const visible =
    userRole === "ADMIN" || userRole === "SUPER_ADMIN"
      ? clients
      : clients.filter((c) => c.status === "online");

  return (
    <div className="min-vh-100 bg-dark text-white">
      <nav className="navbar px-4 py-3 border-bottom border-secondary" style={{ background: "#111" }}>
        <Link href="/" className="navbar-brand fw-bold text-white">
          GOEUN SERVER HUB
        </Link>
        <span className="text-muted small">
          {session?.user?.name || session?.user?.email}
        </span>
      </nav>

      <div className="container py-5">
        <h1 className="h3 fw-bold mb-1">Portal ลูกค้า</h1>
        <p className="text-muted mb-4">เลือกระบบที่ต้องการเข้าใช้งาน</p>

        {visible.length === 0 ? (
          <p className="text-muted">ยังไม่มีระบบที่พร้อมใช้งาน</p>
        ) : (
          <div className="row g-4">
            {visible.map((client) => (
              <div key={client.slug} className="col-12 col-md-6 col-xl-4">
                <div
                  className="card bg-black border-secondary h-100"
                  style={{ borderLeft: `3px solid ${client.accent_color || "#1F7A8C"}` }}
                >
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title fw-bold mb-0">{client.name}</h5>
                      <span className={`badge bg-${STATUS_CLASS[client.status] ?? "secondary"}`}>
                        {STATUS_LABEL[client.status] ?? client.status}
                      </span>
                    </div>
                    <p className="card-text text-muted small flex-grow-1">
                      {client.description}
                    </p>
                    <div className="mt-3">
                      <Link
                        href={`/portal/${client.slug}`}
                        className="btn btn-sm btn-outline-light w-100"
                      >
                        เข้าสู่ Portal
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
