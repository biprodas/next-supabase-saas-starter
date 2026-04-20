import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Logo } from "~/components/logo";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <Logo className="mb-8" />

        <div className="surface-glass rounded-2xl p-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
            <CircleCheck className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-xl font-medium mb-2">Email verified</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Your email has been confirmed. Your account is now active.
          </p>
          <Link href="/login">
            <Button variant="default" className="w-full">Continue to sign in</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
