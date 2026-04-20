"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "~/lib/supabase/client";
import { logout } from "~/app/(auth)/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { LogOut, HomeIcon, UserIcon } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { ThemeSegmentControl } from "~/components/theme-segment-control";

export function UserButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />;
  }

  if (!user) {
    return (
      <Link href="/login">
        <Button variant="outline" size="sm">Sign in</Button>
      </Link>
    );
  }

  const initials = (
    user.user_metadata?.full_name?.charAt(0) ||
    user.email?.charAt(0) ||
    "U"
  ).toUpperCase();

  const email = user.email ?? "";
  const name = user.user_metadata?.full_name ?? email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono text-sm font-semibold hover:bg-primary/20 transition-colors outline-none">
          {initials}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52 space-y-1">
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium truncate">{name}</p>
          <p className="text-xs text-muted-foreground truncate">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="font-normal">
          <ThemeSegmentControl />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="gap-2 cursor-pointer">
            <UserIcon className="size-4" />
            My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="gap-2 cursor-pointer">
            <HomeIcon className="size-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2 text-destructive focus:text-destructive cursor-pointer"
          onSelect={() => logout()}
        >
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
