"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";
import { emptyToNull, formBoolean, formNumber } from "@/lib/form";
import { createClient } from "@/lib/supabase/server";

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
  }
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}

export async function saveProfile(formData: FormData) {
  const { supabase } = await requireAdmin();
  const payload = {
    full_name: String(formData.get("full_name") ?? ""),
    headline: emptyToNull(formData.get("headline")),
    bio: emptyToNull(formData.get("bio")),
    location: emptyToNull(formData.get("location")),
    headshot_url: emptyToNull(formData.get("headshot_url")),
    resume_url: emptyToNull(formData.get("resume_url")),
    updated_at: new Date().toISOString(),
  };
  const id = emptyToNull(formData.get("id"));
  const query = id
    ? supabase.from("profiles").update(payload).eq("id", id)
    : supabase.from("profiles").insert(payload);
  const { error } = await query;
  if (error) throw new Error(error.message);
  refresh();
}

export async function saveSettings(formData: FormData) {
  const { supabase } = await requireAdmin();
  const payload = {
    site_title: String(formData.get("site_title") ?? "Portfolio"),
    tagline: emptyToNull(formData.get("tagline")),
    seo_description: emptyToNull(formData.get("seo_description")),
    contact_email: emptyToNull(formData.get("contact_email")),
    availability: emptyToNull(formData.get("availability")),
    updated_at: new Date().toISOString(),
  };
  const id = emptyToNull(formData.get("id"));
  const query = id
    ? supabase.from("site_settings").update(payload).eq("id", id)
    : supabase.from("site_settings").insert(payload);
  const { error } = await query;
  if (error) throw new Error(error.message);
  refresh();
}

export async function saveSkill(formData: FormData) {
  const { supabase } = await requireAdmin();
  const payload = {
    name: String(formData.get("name") ?? ""),
    category: String(formData.get("category") ?? "General"),
    level: formNumber(formData.get("level"), 3),
    sort_order: formNumber(formData.get("sort_order")),
    published: formBoolean(formData, "published"),
  };
  const id = emptyToNull(formData.get("id"));
  const { error } = id
    ? await supabase.from("skills").update(payload).eq("id", id)
    : await supabase.from("skills").insert(payload);
  if (error) throw new Error(error.message);
  refresh();
}

export async function deleteSkill(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const { error } = await supabase.from("skills").delete().eq("id", id);
  if (error) throw new Error(error.message);
  refresh();
}

export async function saveExperience(formData: FormData) {
  const { supabase } = await requireAdmin();
  const payload = {
    company: String(formData.get("company") ?? ""),
    role: String(formData.get("role") ?? ""),
    location: emptyToNull(formData.get("location")),
    start_date: emptyToNull(formData.get("start_date")),
    end_date: emptyToNull(formData.get("end_date")),
    highlights: emptyToNull(formData.get("highlights")),
    sort_order: formNumber(formData.get("sort_order")),
    published: formBoolean(formData, "published"),
  };
  const id = emptyToNull(formData.get("id"));
  const { error } = id
    ? await supabase.from("experiences").update(payload).eq("id", id)
    : await supabase.from("experiences").insert(payload);
  if (error) throw new Error(error.message);
  refresh();
}

export async function deleteExperience(formData: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("experiences").delete().eq("id", String(formData.get("id") ?? ""));
  if (error) throw new Error(error.message);
  refresh();
}

export async function saveProject(formData: FormData) {
  const { supabase } = await requireAdmin();
  const payload = {
    title: String(formData.get("title") ?? ""),
    summary: emptyToNull(formData.get("summary")),
    description: emptyToNull(formData.get("description")),
    stack: emptyToNull(formData.get("stack")),
    live_url: emptyToNull(formData.get("live_url")),
    repo_url: emptyToNull(formData.get("repo_url")),
    image_url: emptyToNull(formData.get("image_url")),
    featured: formBoolean(formData, "featured"),
    sort_order: formNumber(formData.get("sort_order")),
    published: formBoolean(formData, "published"),
  };
  const id = emptyToNull(formData.get("id"));
  const { error } = id
    ? await supabase.from("projects").update(payload).eq("id", id)
    : await supabase.from("projects").insert(payload);
  if (error) throw new Error(error.message);
  refresh();
}

export async function deleteProject(formData: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("projects").delete().eq("id", String(formData.get("id") ?? ""));
  if (error) throw new Error(error.message);
  refresh();
}

export async function saveEducation(formData: FormData) {
  const { supabase } = await requireAdmin();
  const payload = {
    institution: String(formData.get("institution") ?? ""),
    credential: emptyToNull(formData.get("credential")),
    start_date: emptyToNull(formData.get("start_date")),
    end_date: emptyToNull(formData.get("end_date")),
    details: emptyToNull(formData.get("details")),
    sort_order: formNumber(formData.get("sort_order")),
    published: formBoolean(formData, "published"),
  };
  const id = emptyToNull(formData.get("id"));
  const { error } = id
    ? await supabase.from("education").update(payload).eq("id", id)
    : await supabase.from("education").insert(payload);
  if (error) throw new Error(error.message);
  refresh();
}

export async function deleteEducation(formData: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("education").delete().eq("id", String(formData.get("id") ?? ""));
  if (error) throw new Error(error.message);
  refresh();
}

export async function saveLink(formData: FormData) {
  const { supabase } = await requireAdmin();
  const payload = {
    label: String(formData.get("label") ?? ""),
    url: String(formData.get("url") ?? ""),
    sort_order: formNumber(formData.get("sort_order")),
    published: formBoolean(formData, "published"),
  };
  const id = emptyToNull(formData.get("id"));
  const { error } = id
    ? await supabase.from("social_links").update(payload).eq("id", id)
    : await supabase.from("social_links").insert(payload);
  if (error) throw new Error(error.message);
  refresh();
}

export async function deleteLink(formData: FormData) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("social_links").delete().eq("id", String(formData.get("id") ?? ""));
  if (error) throw new Error(error.message);
  refresh();
}
