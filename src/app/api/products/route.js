import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { CATEGORIES } from "@/lib/mockProducts";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || "all";
  const search = (searchParams.get("search") || "").toLowerCase();
  const sort = searchParams.get("sort") || "default";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const all = searchParams.get("all") === "1"; // admin: fetch all including inactive

  const where = {
    ...(all ? {} : { active: true }),
    ...(category && category !== "all" ? { category } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search } },
            { nameEn: { contains: search } },
            { sku: { contains: search } },
            { desc: { contains: search } },
          ],
        }
      : {}),
  };

  const orderBy =
    sort === "price_asc"
      ? { price: "asc" }
      : sort === "price_desc"
      ? { price: "desc" }
      : sort === "sold"
      ? { sold: "desc" }
      : sort === "rating"
      ? { rating: "desc" }
      : { id: "asc" };

  const total = await prisma.product.count({ where });
  const products = await prisma.product.findMany({
    where,
    orderBy,
    skip: (page - 1) * limit,
    take: limit,
  });

  return NextResponse.json({
    products,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    categories: CATEGORIES,
  });
}

export async function POST(req) {
  const session = await auth();
  if (!session?.user || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { sku, category, name, nameEn, nameZh, price, priceWholesale, unit, minOrder, minWholesale, desc, img, stock } = body;

  if (!sku || !category || !name || !price) {
    return NextResponse.json({ error: "Missing required fields: sku, category, name, price" }, { status: 400 });
  }

  const existing = await prisma.product.findUnique({ where: { sku } });
  if (existing) {
    return NextResponse.json({ error: "SKU นี้มีอยู่แล้ว" }, { status: 409 });
  }

  const product = await prisma.product.create({
    data: {
      sku,
      category,
      name,
      nameEn: nameEn || name,
      nameZh: nameZh || name,
      price: parseFloat(price),
      priceWholesale: parseFloat(priceWholesale || price),
      unit: unit || "ชิ้น",
      minOrder: parseInt(minOrder || 1),
      minWholesale: parseInt(minWholesale || 10),
      desc: desc || null,
      img: img || null,
      stock: parseInt(stock || 0),
      rating: 5.0,
      sold: 0,
      active: true,
    },
  });

  return NextResponse.json(product, { status: 201 });
}
