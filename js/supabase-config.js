/* =========================================================
   JM NEXUS STUDIOS — Supabase Connection (full)
   Safe for browser: only publishable key is used.
   ========================================================= */

// 🔴 REPLACE WITH YOUR OWN VALUES 🔴
const SUPABASE_URL = "https://jkiyyqgoymujuyhgauqy.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpraXl5cWdveW11anV5aGdhdXF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5MzE4MjcsImV4cCI6MjEwNjUwNzgyN30.nlTtUVa-2eznJYRQb579XauejhvrgfWG9w-9qRl9_m8";

// Init client
const { createClient } = supabase;
window.JM_SUPABASE = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("✓ Supabase connected to:", SUPABASE_URL);

/* =========================================================
   DATA HELPERS — all reads go through these
   ========================================================= */
window.JM_DB = {

  /* Fetch all active services */
  async getServices() {
    const { data, error } = await window.JM_SUPABASE
      .from("services")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });
    if (error) { console.error("getServices:", error); return []; }
    return data;
  },

  /* Fetch stats */
  async getStats() {
    const { data, error } = await window.JM_SUPABASE
      .from("stats")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) { console.error("getStats:", error); return []; }
    return data;
  },

  /* Fetch founder */
  async getFounder() {
    const { data, error } = await window.JM_SUPABASE
      .from("founder")
      .select("*")
      .eq("id", 1)
      .single();
    if (error) { console.error("getFounder:", error); return null; }
    return data;
  },

  /* Fetch socials */
  async getSocials() {
    const { data, error } = await window.JM_SUPABASE
      .from("socials")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) { console.error("getSocials:", error); return []; }
    return data;
  },

  /* Upload a single file to a bucket */
  async uploadFile(bucket, file) {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { data, error } = await window.JM_SUPABASE
      .storage
      .from(bucket)
      .upload(path, file, { cacheControl: "3600", upsert: false });
    if (error) { console.error("uploadFile:", error); return null; }

    const { data: pub } = window.JM_SUPABASE
      .storage
      .from(bucket)
      .getPublicUrl(data.path);

    return { path: data.path, url: pub.publicUrl, name: file.name };
  },

  /* Save a service request */
  async saveRequest(payload) {
    const { data, error } = await window.JM_SUPABASE
      .from("service_requests")
      .insert([payload])
      .select();
    if (error) { console.error("saveRequest:", error); return { ok: false, error }; }
    return { ok: true, data };
  }
};