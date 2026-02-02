import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: "Missing Supabase credentials" }, { status: 500 });
  }

  // Get the full pathname and extract everything after /po/
  const pathname = new URL(req.url).pathname;
  let objectPath = pathname.replace(/^\/po\//, '');
  objectPath = decodeURIComponent(objectPath);
  
  // Normalize double po/ prefix if it exists
  if (objectPath.startsWith('po/')) {
    // Already has po/ prefix, keep as is
  } else if (!objectPath.includes('/')) {
    // No path separator, might be just filename, add po/ prefix
    objectPath = 'po/' + objectPath;
  }

  if (!objectPath) {
    return NextResponse.json({ error: "Missing file path" }, { status: 400 });
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const { data, error } = await supabase.storage
    .from("purchase-orders")
    .createSignedUrl(objectPath, 60 * 60 * 24 * 7);

  if (error || !data?.signedUrl) {
    return NextResponse.json({ 
      error: "File not found", 
      path: objectPath,
      details: error?.message 
    }, { status: 404 });
  }

  return NextResponse.redirect(data.signedUrl, 302);
}
