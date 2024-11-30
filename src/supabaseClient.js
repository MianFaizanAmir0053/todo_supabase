import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dweekbltlvarqvsuvmff.supabase.co"; // Replace with your Supabase URL
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZWVrYmx0bHZhcnF2c3V2bWZmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjk4ODUwMywiZXhwIjoyMDQ4NTY0NTAzfQ.fuNwxRwiBAhk6hyFd1ifZbI6YfDZ3RhD_BezuqXd36o"; // Replace with your anon key
export const supabase = createClient(supabaseUrl, supabaseKey);
