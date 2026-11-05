const WebSocket = require('ws');
global.WebSocket = WebSocket;
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://qlcnvowuoulukxllatxt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsY252b3d1b3VsdWt4bGxhdHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM2OTk1NzgsImV4cCI6MjEwOTI3NTU3OH0.o54SUmOWwoC9eJKZIKur9tzD2wsDilOztLgqg284xvI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testConnection() {
  console.log('Testing Supabase Connection...');
  const { data, error } = await supabase.from('companies').select('*');
  if (error) {
    console.error('Supabase query error:', error);
    process.exit(1);
  }
  console.log('Successfully queried Supabase companies table! Rows found:', data.length);
}

testConnection();
