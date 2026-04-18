import { PRODUCTS } from "@/lib/mockProducts";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const p = PRODUCTS.find((x) => x.id === parseInt(params.id));
  if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(p);
}
