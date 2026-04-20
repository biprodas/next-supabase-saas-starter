import { NextRequest, NextResponse } from "next/server";
import { createClient } from "~/lib/supabase/server";

function toSlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function ensureDefaultOrg(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  // Check if the user already belongs to any organization
  const { data: existing } = await supabase
    .from("organization_members")
    .select("org_id")
    .eq("user_id", user.id)
    .limit(1);

  if (existing && existing.length > 0) return;

  // Build name and slug from user metadata
  const displayName =
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email?.split("@")[0] ??
    "My";

  const orgName = `${displayName}'s Workspace`;
  const slug =
    toSlug(displayName) + "-" + user.id.replace(/-/g, "").substring(0, 8);

  await supabase.from("organizations").insert({
    name: orgName,
    slug,
    owner_id: user.id,
  });
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (!code) {
    return NextResponse.redirect(new URL("/auth/error", origin));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("exchangeCodeForSession error:", error.message);
    return NextResponse.redirect(new URL("/auth/error", origin));
  }

  // Session is now established — create default org for new users
  await ensureDefaultOrg(supabase);

  return NextResponse.redirect(new URL(next, origin));
}
