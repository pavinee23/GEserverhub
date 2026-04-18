import prisma from "@/lib/prisma";
import { fallbackServices } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await prisma.service.findMany({
      where: { active: true },
      orderBy: { createdAt: "asc" },
    });

    if (rows.length === 0) {
      return Response.json({ services: fallbackServices });
    }

    return Response.json({
      services: rows.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        highlight: s.highlight,
      })),
    });
  } catch {
    return Response.json({ services: fallbackServices });
  }
}
