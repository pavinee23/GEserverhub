import { fallbackProfile } from "@/lib/data";

export async function GET() {
  return Response.json({ profile: fallbackProfile });
}
