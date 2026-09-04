"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  name: string;
  defaultValue?: string | null;
  folder: string;
};

export function ImageUploadField({ name, defaultValue, folder }: Props) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [status, setStatus] = useState<string | null>(null);

  async function onFile(file: File | undefined) {
    if (!file) return;
    const supabase = createClient();
    if (!supabase) {
      setStatus("Supabase is not configured.");
      return;
    }
    setStatus("Uploading…");
    const path = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from("portfolio").upload(path, file, {
      upsert: true,
    });
    if (error) {
      setStatus(error.message);
      return;
    }
    const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
    setUrl(data.publicUrl);
    setStatus("Uploaded");
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm text-muted">Image URL</label>
      <input
        name={name}
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        className="w-full rounded-xl border border-line bg-background px-3 py-2"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(event) => onFile(event.target.files?.[0])}
        className="text-sm text-muted"
      />
      {status ? <p className="text-xs text-muted">{status}</p> : null}
    </div>
  );
}
