const backendBaseUrl =
  process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const { path } = await params;
  const pathParts = Array.isArray(path) ? path : [];
  const backendUrl = new URL(`/api/${pathParts.join("/")}`, backendBaseUrl);

  request.nextUrl.searchParams.forEach((value, key) => {
    backendUrl.searchParams.append(key, value);
  });

  try {
    const response = await fetch(backendUrl, {
      cache: "no-store",
      headers: {
        accept: request.headers.get("accept") || "application/json",
      },
    });

    const contentType = response.headers.get("content-type");
    const payload = await response.arrayBuffer();
    const headers = new Headers();

    if (contentType) {
      headers.set("content-type", contentType);
    }

    return new Response(payload, {
      status: response.status,
      headers,
    });
  } catch {
    return Response.json(
      {
        error: "Backend unavailable",
      },
      { status: 502 },
    );
  }
}
