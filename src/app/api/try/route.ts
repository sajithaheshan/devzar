import { NextRequest, NextResponse } from "next/server";
import { allApis } from "@/content/apis";

export const dynamic = "force-dynamic";

// Only allow proxying requests to base URLs we ourselves listed as
// "isTestable" — prevents this route being abused as an open SSRF proxy.
const allowedBaseUrls = new Set(allApis.filter((a) => a.isTestable).map((a) => a.baseUrl));

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url || !allowedBaseUrls.has(url)) {
    return NextResponse.json({ error: "This endpoint is not whitelisted for live testing." }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json", "User-Agent": "devzar.netlify.app-live-tester" },
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    const text = await res.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = text.slice(0, 2000);
    }
    return NextResponse.json({ status: res.status, data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "The upstream API did not respond in time." },
      { status: 502 },
    );
  }
}
