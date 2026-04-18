import { getOrder } from "@/lib/orderStore";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const order = getOrder(params.id);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(order);
}
