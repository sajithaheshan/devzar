import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@db/index";
import { contactMessages } from "@db/schema";

const schema = z.object({
  name: z.string().min(2).max(160),
  email: z.string().email().max(200),
  subject: z.string().min(2).max(200).default("General"),
  message: z.string().min(10).max(4000),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please fill in all fields correctly." }, { status: 400 });
  }

  await db.insert(contactMessages).values(parsed.data);

  return NextResponse.json({ ok: true });
}
