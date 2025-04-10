// src/supabase.js
import { createClient } from '@supabase/supabase-js'

// Supabase project URL and API key
const supabaseUrl = 'https://anxxwcmwxhgebqahhzam.supabase.co' // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFueHh3Y213eGhnZWJxYWhoemFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MTgyNTUsImV4cCI6MjA1ODk5NDI1NX0.clV-yFN07Dw_Keu7sFRntb2BqhcfA0rZ6jYN2g9EBcI'                // Replace with your Supabase anon key

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase