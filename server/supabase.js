const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

console.log('--- Supabase Init ---');
console.log('URL Detected:', !!supabaseUrl);
console.log('Anon Key Detected:', !!supabaseAnonKey);
if (supabaseUrl) console.log('URL:', supabaseUrl);
console.log('---------------------');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = { supabase };
