import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: { path?: string[] } }
) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Missing Supabase credentials" }, { status: 500 });
  }

  const segments = Array.isArray(params?.path) ? params.path : [];
  const objectPath = segments.filter(Boolean).join("/");

  if (!objectPath) {
    return NextResponse.json({ error: "Missing file path" }, { status: 400 });
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const { data, error } = await supabase.storage
    .from("purchase-orders")
    .createSignedUrl(objectPath, 60 * 60 * 24 * 7);

  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  return NextResponse.redirect(data.signedUrl, 302);
}
