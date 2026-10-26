import { NextResponse } from "next/server";
import { SITE_ORIGIN } from "@/lib/siteConfig";

/** Legacy endpoint — mirrors /sitemap-index.xml */
export async function GET() {
  return NextResponse.redirect(`${SITE_ORIGIN}/sitemap-index.xml`, 308);
}
