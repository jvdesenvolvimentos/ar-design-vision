
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://blqccpfpmuwlcrcoscpe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJscWNjcGZwbXV3bGNyY29zY3BlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0NjE0NzgsImV4cCI6MjA2NDAzNzQ3OH0.Zk6vQf3alGXuC7QjMtPGB6GYYQHTbfWE6hHWm9odLmc'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})
