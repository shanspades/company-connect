const WebSocket = require('ws');
global.WebSocket = WebSocket;
const path = require('path');
const Database = require('better-sqlite3');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://qlcnvowuoulukxllatxt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsY252b3d1b3VsdWt4bGxhdHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM2OTk1NzgsImV4cCI6MjEwOTI3NTU3OH0.o54SUmOWwoC9eJKZIKur9tzD2wsDilOztLgqg284xvI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const dbPath = path.join(__dirname, 'data/company_connect.db');
const sqlite = new Database(dbPath);

async function migrate() {
  console.log('====================================================');
  console.log('🚀 MIGRATING DATA FROM SQLITE TO SUPABASE POSTGRESQL');
  console.log('====================================================');

  // 1. Companies
  const companies = sqlite.prepare('SELECT * FROM companies').all();
  console.log(`Migrating ${companies.length} companies...`);
  for (const c of companies) {
    const { error } = await supabase.from('companies').upsert({
      id: c.id,
      workspace_id: c.workspace_id,
      name: c.name,
      industry: c.industry,
      company_size: c.company_size,
      email: c.email,
      website: c.website,
      created_at: c.created_at
    });
    if (error) console.error('Error inserting company:', c.id, error);
  }

  // 2. Users
  const users = sqlite.prepare('SELECT * FROM users').all();
  console.log(`Migrating ${users.length} users...`);
  for (const u of users) {
    const { error } = await supabase.from('users').upsert({
      id: u.id,
      company_id: u.company_id,
      employee_id: u.employee_id,
      name: u.name,
      email: u.email,
      password_hash: u.password_hash,
      role: u.role,
      designation: u.designation,
      department: u.department,
      initials: u.initials,
      tone: u.tone,
      status: u.status,
      token_version: u.token_version || 1,
      created_at: u.created_at
    });
    if (error) console.error('Error inserting user:', u.id, error);
  }

  // 3. Posts
  const posts = sqlite.prepare('SELECT * FROM posts').all();
  console.log(`Migrating ${posts.length} posts...`);
  for (const p of posts) {
    const { error } = await supabase.from('posts').upsert({
      id: p.id,
      company_id: p.company_id,
      author_id: p.author_id,
      type: p.type,
      tag: p.tag,
      text: p.text,
      image: p.image,
      created_at: p.created_at
    });
    if (error) console.error('Error inserting post:', p.id, error);
  }

  // 4. Likes
  const likes = sqlite.prepare('SELECT * FROM likes').all();
  console.log(`Migrating ${likes.length} likes...`);
  for (const l of likes) {
    const { error } = await supabase.from('likes').upsert({
      id: l.id,
      company_id: l.company_id,
      post_id: l.post_id,
      user_id: l.user_id,
      created_at: l.created_at
    });
    if (error) console.error('Error inserting like:', l.id, error);
  }

  // 5. Comments
  const comments = sqlite.prepare('SELECT * FROM comments').all();
  console.log(`Migrating ${comments.length} comments...`);
  for (const cm of comments) {
    const { error } = await supabase.from('comments').upsert({
      id: cm.id,
      company_id: cm.company_id,
      post_id: cm.post_id,
      user_id: cm.user_id,
      text: cm.text,
      created_at: cm.created_at
    });
    if (error) console.error('Error inserting comment:', cm.id, error);
  }

  // 6. Kudos
  const kudos = sqlite.prepare('SELECT * FROM kudos').all();
  console.log(`Migrating ${kudos.length} kudos...`);
  for (const k of kudos) {
    const { error } = await supabase.from('kudos').upsert({
      id: k.id,
      company_id: k.company_id,
      post_id: k.post_id,
      sender_id: k.sender_id,
      kudos_type: k.kudos_type,
      created_at: k.created_at
    });
    if (error) console.error('Error inserting kudo:', k.id, error);
  }

  // 7. Announcements
  const announcements = sqlite.prepare('SELECT * FROM announcements').all();
  console.log(`Migrating ${announcements.length} announcements...`);
  for (const a of announcements) {
    const { error } = await supabase.from('announcements').upsert({
      id: a.id,
      company_id: a.company_id,
      author_id: a.author_id,
      title: a.title,
      content: a.content,
      priority: a.priority,
      created_at: a.created_at
    });
    if (error) console.error('Error inserting announcement:', a.id, error);
  }

  // 8. Audit logs
  const auditLogs = sqlite.prepare('SELECT * FROM audit_logs').all();
  console.log(`Migrating ${auditLogs.length} audit logs...`);
  for (const al of auditLogs) {
    const { error } = await supabase.from('audit_logs').upsert({
      id: al.id,
      company_id: al.company_id,
      user_id: al.user_id,
      action: al.action,
      details: al.details,
      ip_address: al.ip_address,
      created_at: al.created_at
    });
    if (error) console.error('Error inserting audit log:', al.id, error);
  }

  console.log('\n====================================================');
  console.log('🎉 ALL DATA MIGRATED TO SUPABASE POSTGRESQL SUCCESSFULLY!');
  console.log('====================================================');
}

migrate().catch(console.error);
