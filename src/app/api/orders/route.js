import { createOrder, getAllOrders } from "@/lib/orderStore";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(getAllOrders());
}

export async function POST(req) {
  const body = await req.json();
  const { items, customer, shippingAddress, note } = body;

  if (!items?.length || !customer?.name || !customer?.phone || !shippingAddress) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const order = createOrder({ items, customer, shippingAddress, note, total });

  return NextResponse.json(order, { status: 201 });
}
