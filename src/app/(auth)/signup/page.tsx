"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { register } from "../actions";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Eye, EyeOff, MailCheck } from "lucide-react";
import { Logo } from "~/components/logo";
import { GoogleSignInButton } from "../_components/google-sign-in-button";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await register(formData);
      if (result?.error) setError(result.error);
      else if (result?.success) setVerified(true);
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <Logo className="mb-8" />

        <div className="surface-glass rounded-2xl p-8">
          {verified ? (
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <MailCheck className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-medium mb-2">Check your email</h1>
              <p className="text-sm text-muted-foreground mb-6">
                We sent you a confirmation link. Click it to activate your account.
              </p>
              <Link href="/login">
                <Button variant="ghost" className="w-full">Back to sign in</Button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-medium mb-1">Create account</h1>
              <p className="text-sm text-muted-foreground mb-6">Start practicing with AI-powered interviews.</p>

              <GoogleSignInButton />

              <div className="flex items-center gap-3 my-6">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jane Smith"
                    required
                    autoComplete="name"
                  />
                </div>

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

                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      autoComplete="new-password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}

                <Button type="submit" variant="default" className="w-full" disabled={isPending}>
                  {isPending ? "Creating account..." : "Create account"}
                </Button>
              </form>

              <p className="text-sm text-muted-foreground text-center mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
