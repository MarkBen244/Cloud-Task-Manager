
// Supabase project credentials

const SUPABASE_URL = "https://aovzplzutkcqnabagmfr.supabase.co";
const SUPABASE_KEY = "sb_publishable_91zpfGvdmHUwNrOrlv961g_QY9_bEMv";

// Create Supabase client
const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
