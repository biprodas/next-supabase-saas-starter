-- ── Avatars storage bucket ────────────────────────────────────────
-- Public bucket: avatars are readable by anyone (no signed URLs needed).
-- Each user stores their avatar at "{user_id}/avatar" with upsert.

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  2097152,   -- 2 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Authenticated users can manage files inside their own folder
CREATE POLICY "Users manage own avatar"
  ON storage.objects FOR ALL
  TO authenticated
  USING  (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
