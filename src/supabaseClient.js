import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ofozgznjuyyofckjafsy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mb3pnem5qdXl5b2Zja2phZnN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3OTYwMTMsImV4cCI6MjA5MTM3MjAxM30.X6LeYAVyOX08BBCmEt7q5qOyPlep5xPVktuDtwmVPwM';

export const supabase = createClient(supabaseUrl, supabaseKey);