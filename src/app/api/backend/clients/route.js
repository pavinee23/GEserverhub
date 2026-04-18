import prisma from "@/lib/prisma";
import { fallbackClients } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await prisma.client.findMany({
      orderBy: { createdAt: "asc" },
    });

    if (rows.length === 0) {
      return Response.json({ clients: fallbackClients });
    }

    return Response.json({
      clients: rows.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        status: c.status.toLowerCase().replace(/_/g, "-"),
        contact_email: c.contactEmail,
        contact_phone: c.contactPhone,
        system_url: c.systemUrl,
        thumbnail: c.logoUrl,
      })),
    });
  } catch {
    return Response.json({ clients: fallbackClients });
  }
}
