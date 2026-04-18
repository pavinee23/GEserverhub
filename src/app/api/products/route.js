import { PRODUCTS, CATEGORIES } from "@/lib/mockProducts";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || "all";
  const search = (searchParams.get("search") || "").toLowerCase();
  const sort = searchParams.get("sort") || "default";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");

  let results = [...PRODUCTS];

  if (category && category !== "all") {
    results = results.filter((p) => p.category === category);
  }

  if (search) {
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.nameEn.toLowerCase().includes(search) ||
        p.sku.toLowerCase().includes(search) ||
        p.desc.toLowerCase().includes(search)
    );
  }

  if (sort === "price_asc") results.sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") results.sort((a, b) => b.price - a.price);
  else if (sort === "sold") results.sort((a, b) => b.sold - a.sold);
  else if (sort === "rating") results.sort((a, b) => b.rating - a.rating);

  const total = results.length;
  const paginated = results.slice((page - 1) * limit, page * limit);

  return NextResponse.json({
    products: paginated,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    categories: CATEGORIES,
  });
}
