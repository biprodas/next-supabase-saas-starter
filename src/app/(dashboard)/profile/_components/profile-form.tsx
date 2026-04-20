"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Camera } from "lucide-react";
import { createClient } from "~/lib/supabase/client";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import { Separator } from "~/components/ui/separator";

interface ProfileFormProps {
  userId: string;
  initialName: string;
  initialAvatarUrl: string | null;
  email: string;
}

export function ProfileForm({
  userId,
  initialName,
  initialAvatarUrl,
  email,
}: ProfileFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(initialName);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialAvatarUrl);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const [isSaving, startSave] = useTransition();
  const [isUploading, startUpload] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initials = (name.charAt(0) || email.charAt(0) || "U").toUpperCase();
  const displayAvatar = avatarPreview ?? avatarUrl;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be under 2 MB.");
      return;
    }

    setPendingFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setError(null);

    // Upload immediately on select
    startUpload(async () => {
      const supabase = createClient();
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${userId}/avatar.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true, contentType: file.type });

      if (uploadError) {
        setError(uploadError.message);
        setAvatarPreview(null);
        setPendingFile(null);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(path);

      setAvatarUrl(publicUrl);
      setAvatarPreview(null);
      setPendingFile(null);
    });
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Name cannot be empty.");
      return;
    }

    startSave(async () => {
      const supabase = createClient();

      const { error: profileError } = await supabase
        .from("profiles")
        .update({ full_name: trimmedName, avatar_url: avatarUrl })
        .eq("id", userId);

      if (profileError) {
        setError(profileError.message);
        return;
      }

      // Keep auth metadata in sync so user-button shows updated name
      await supabase.auth.updateUser({ data: { full_name: trimmedName } });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="relative group">
          <button
            type="button"
            className="relative flex size-20 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 overflow-hidden focus-visible:ring-2 focus-visible:ring-ring outline-none"
            onClick={() => fileInputRef.current?.click()}
            title="Change avatar"
          >
            {displayAvatar ? (
              <Image
                src={displayAvatar}
                alt="Avatar"
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <span className="text-primary font-mono font-semibold text-2xl">
                {initials}
              </span>
            )}
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
              {isUploading ? (
                <Spinner className="size-4 text-white" />
              ) : (
                <Camera className="size-4 text-white" />
              )}
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="space-y-0.5">
          <p className="text-sm font-medium">{name || "—"}</p>
          <p className="text-xs text-muted-foreground font-mono">{email}</p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs text-primary hover:underline mt-1 block"
          >
            {isUploading ? "Uploading…" : "Change photo"}
          </button>
        </div>
      </div>

      <Separator />

      {/* Fields */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="full-name" className="text-xs font-medium">
            Full name
          </Label>
          <Input
            id="full-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={80}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-medium">
            Email address
          </Label>
          <Input
            id="email"
            value={email}
            readOnly
            className="bg-muted/50 text-muted-foreground font-mono cursor-not-allowed"
          />
          <p className="text-[11px] text-muted-foreground">
            Email cannot be changed here.
          </p>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex items-center gap-3">
        <Button
          type="submit"
          variant="default"
          size="sm"
          disabled={isSaving || isUploading}
          className="gap-1.5"
        >
          {isSaving && <Spinner className="size-3.5" />}
          Save changes
        </Button>
        {saved && (
          <p className="text-xs text-green-500">Changes saved.</p>
        )}
      </div>
    </form>
  );
}
