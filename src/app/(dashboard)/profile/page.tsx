import { redirect } from "next/navigation";
import { Shield, Trash2, KeyRound } from "lucide-react";
import { createClient } from "~/lib/supabase/server";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { ProfileForm } from "~/app/(dashboard)/profile/_components/profile-form";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Fetch profile + interview count + feedback scores in parallel
  const { data: profile } =
    await supabase
      .from("profiles")
      .select("full_name, avatar_url, created_at")
      .eq("id", user.id)
      .single();

  const name = profile?.full_name ?? user.user_metadata?.full_name ?? "";
  const email = user.email ?? "";
  const avatarUrl = profile?.avatar_url ?? user.user_metadata?.avatar_url ?? null;
  const joinedAt = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  // Detect auth providers
  const identities = user.identities ?? [];
  const providers = identities.map((i) => i.provider);

  return (
    <div className="flex flex-col flex-1">
      <main className="max-w-2xl mx-auto w-full px-6 py-10 space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-medium mb-1">Profile</h1>
          <p className="text-sm text-muted-foreground">
            Manage your personal information and account settings.
          </p>
        </div>

        {/* ── Profile form ─────────────────────────────────────── */}
        <section className="space-y-4">
          <SectionHeader label="Personal info" />
          <div className="surface-glass rounded-xl p-6">
            <ProfileForm
              userId={user.id}
              initialName={name}
              initialAvatarUrl={avatarUrl}
              email={email}
            />
          </div>
        </section>

        {/* ── Account details ───────────────────────────────────── */}
        <section className="space-y-4">
          <SectionHeader label="Account" />
          <div className="surface-glass rounded-xl divide-y divide-border/50">
            <Row label="User ID">
              <span className="font-mono text-xs text-muted-foreground truncate max-w-xs">
                {user.id}
              </span>
            </Row>
            {joinedAt && (
              <Row label="Member since">
                <span className="text-sm text-muted-foreground">{joinedAt}</span>
              </Row>
            )}
            <Row label="Sign-in method">
              <div className="flex gap-1.5 flex-wrap justify-end">
                {providers.length > 0 ? (
                  providers.map((p) => (
                    <Badge key={p} variant="outline" className="text-[10px] font-mono capitalize">
                      {p}
                    </Badge>
                  ))
                ) : (
                  <Badge variant="outline" className="text-[10px] font-mono">email</Badge>
                )}
              </div>
            </Row>
          </div>
        </section>

        {/* ── Security ──────────────────────────────────────────── */}
        <section className="space-y-4">
          <SectionHeader label="Security" icon={<Shield className="size-3.5 text-muted-foreground" />} />
          <div className="surface-glass rounded-xl divide-y divide-border/50">
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="flex items-center gap-3">
                <KeyRound className="size-4 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-sm font-medium">Password</p>
                  <p className="text-xs text-muted-foreground">
                    {providers.includes("google")
                      ? "You sign in via Google — no password is set."
                      : "Change your account password."}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" disabled className="shrink-0 text-xs">
                {providers.includes("google") ? "N/A" : "Change"}
              </Button>
            </div>
          </div>
        </section>

        {/* ── Danger zone ───────────────────────────────────────── */}
        <section className="space-y-4">
          <SectionHeader
            label="Danger Zone"
            icon={<Trash2 className="size-3.5 text-destructive/70" />}
            className="text-destructive/70"
          />
          <div className="surface-glass rounded-xl border-destructive/20 px-5 py-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Delete account</p>
              <p className="text-xs text-muted-foreground">
                Permanently remove your account and all associated data. This cannot be undone.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="shrink-0 border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50"
            >
              Delete
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

// ── Small helpers ──────────────────────────────────────────────────

function SectionHeader({
  label,
  icon,
  className,
}: {
  label: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      {icon}
      <h2 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
        {label}
      </h2>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
      <p className="text-sm text-muted-foreground shrink-0">{label}</p>
      {children}
    </div>
  );
}
