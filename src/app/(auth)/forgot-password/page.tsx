"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { createClient } from "~/lib/supabase/client";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Logo } from "~/components/logo";
import { CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;

    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });
      if (error) setError(error.message);
      else setSent(true);
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <Logo className="mb-8" />

        <div className="surface-glass rounded-2xl p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-medium mb-2">Check your email</h1>
              <p className="text-sm text-muted-foreground mb-6">
                We sent a password reset link to your email.
              </p>
              <Link href="/login">
                <Button variant="ghost" className="w-full">Back to sign in</Button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-medium mb-1">Forgot password?</h1>
              <p className="text-sm text-muted-foreground mb-6">
                Enter your email and we'll send you a reset link.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                  />
                </div>

                {error && (
                  <p className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <Button type="submit" variant="default" className="w-full" disabled={isPending}>
                  {isPending ? "Sending..." : "Send reset link"}
                </Button>
              </form>

              <p className="text-sm text-muted-foreground text-center mt-6">
                Remember it?{" "}
                <Link href="/login" className="text-primary hover:underline">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
