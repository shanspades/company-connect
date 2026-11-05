const WebSocket = require('ws');
if (typeof global.WebSocket === 'undefined') {
  global.WebSocket = WebSocket;
}
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://qlcnvowuoulukxllatxt.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsY252b3d1b3VsdWt4bGxhdHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM2OTk1NzgsImV4cCI6MjEwOTI3NTU3OH0.o54SUmOWwoC9eJKZIKur9tzD2wsDilOztLgqg284xvI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

async function isSupabaseConnected() {
  try {
    const { data, error } = await supabase.from('companies').select('id').limit(1);
    return !error;
  } catch (e) {
    return false;
  }
}

// ----------------- Companies -----------------
async function getCompanyByWorkspace(workspaceId) {
  const code = (workspaceId || '').trim().toUpperCase();
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .ilike('workspace_id', code)
    .maybeSingle();
  if (error) throw error;
  return data;
}

async function getCompanyById(id) {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

async function createCompany(companyData) {
  const { data, error } = await supabase
    .from('companies')
    .insert(companyData)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ----------------- Users -----------------
async function getUserById(userId, companyId) {
  let query = supabase.from('users').select('*').eq('id', userId);
  if (companyId) query = query.eq('company_id', companyId);
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return data;
}

async function getUserByLogin(companyId, identifier) {
  const clean = (identifier || '').trim();
  // Match either email (case-insensitive) or employee_id (case-insensitive)
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('company_id', companyId)
    .or(`email.ilike.${clean},employee_id.ilike.${clean}`)
    .maybeSingle();
  if (error) throw error;
  return data;
}

async function getUserByEmail(companyId, email) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('company_id', companyId)
    .ilike('email', (email || '').trim())
    .maybeSingle();
  if (error) throw error;
  return data;
}

async function countUsers(companyId) {
  const { count, error } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('company_id', companyId);
  if (error) throw error;
  return count || 0;
}

async function createUser(userData) {
  const { data, error } = await supabase
    .from('users')
    .insert(userData)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function updateUser(userId, updates) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function deleteUser(userId, companyId) {
  let query = supabase.from('users').delete().eq('id', userId);
  if (companyId) query = query.eq('company_id', companyId);
  const { error } = await query;
  if (error) throw error;
  return true;
}

async function getEmployees(companyId, limit = 50, offset = 0) {
  const { data, count, error } = await supabase
    .from('users')
    .select('*', { count: 'exact' })
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) throw error;
  return { employees: data || [], total: count || 0 };
}

// ----------------- Posts & Feed -----------------
async function getPosts(companyId, currentUserId, limit = 50, offset = 0) {
  const { data: postsData, count, error } = await supabase
    .from('posts')
    .select(`
      *,
      users:author_id (name, role, department, initials, tone)
    `, { count: 'exact' })
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  const postIds = (postsData || []).map(p => p.id);
  if (postIds.length === 0) return { posts: [], total: count || 0 };

  // Fetch likes, comments, kudos in batch
  const [likesRes, commentsRes, kudosRes] = await Promise.all([
    supabase.from('likes').select('*').in('post_id', postIds).eq('company_id', companyId),
    supabase.from('comments').select('*, users:user_id(name, initials)').in('post_id', postIds).eq('company_id', companyId).order('created_at', { ascending: true }),
    supabase.from('kudos').select('*, users:sender_id(name)').in('post_id', postIds).eq('company_id', companyId)
  ]);

  const likesByPost = {};
  for (const l of (likesRes.data || [])) {
    if (!likesByPost[l.post_id]) likesByPost[l.post_id] = [];
    likesByPost[l.post_id].push(l);
  }

  const commentsByPost = {};
  for (const c of (commentsRes.data || [])) {
    if (!commentsByPost[c.post_id]) commentsByPost[c.post_id] = [];
    commentsByPost[c.post_id].push({
      id: c.id,
      author: c.users ? c.users.name : 'Team Member',
      avatar: c.users ? c.users.initials : 'TM',
      text: c.text,
      time: timeAgo(c.created_at)
    });
  }

  const kudosByPost = {};
  for (const k of (kudosRes.data || [])) {
    if (!kudosByPost[k.post_id]) kudosByPost[k.post_id] = [];
    kudosByPost[k.post_id].push({
      id: k.id,
      type: k.kudos_type,
      from: k.users ? k.users.name : 'Colleague'
    });
  }

  const posts = postsData.map(p => {
    const pLikes = likesByPost[p.id] || [];
    const liked = pLikes.some(l => l.user_id === currentUserId);
    return {
      id: p.id,
      person: {
        name: p.users ? p.users.name : 'Unknown User',
        role: p.users ? p.users.role : 'EMPLOYEE',
        dept: p.users ? p.users.department : 'General',
        initials: p.users ? p.users.initials : 'U',
        tone: p.users ? p.users.tone : 'violet'
      },
      type: p.type,
      tag: p.tag || 'General',
      time: timeAgo(p.created_at),
      likes: pLikes.length,
      liked,
      text: p.text,
      image: p.image || null,
      comments: commentsByPost[p.id] || [],
      kudos: kudosByPost[p.id] || []
    };
  });

  return { posts, total: count || 0 };
}

async function getPostById(postId, companyId) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .eq('company_id', companyId)
    .maybeSingle();
  if (error) throw error;
  return data;
}

async function createPost(postData) {
  const { data, error } = await supabase
    .from('posts')
    .insert(postData)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function deletePost(postId, companyId) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId)
    .eq('company_id', companyId);
  if (error) throw error;
  return true;
}

// ----------------- Likes, Comments & Kudos -----------------
async function toggleLike(postId, userId, companyId) {
  // Check existing
  const { data: existing } = await supabase
    .from('likes')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', userId)
    .maybeSingle();

  if (existing) {
    await supabase.from('likes').delete().eq('id', existing.id);
    const { count } = await supabase.from('likes').select('*', { count: 'exact', head: true }).eq('post_id', postId);
    return { liked: false, count: count || 0 };
  } else {
    const likeId = 'like_' + crypto.randomBytes(8).toString('hex');
    await supabase.from('likes').insert({
      id: likeId,
      company_id: companyId,
      post_id: postId,
      user_id: userId
    });
    const { count } = await supabase.from('likes').select('*', { count: 'exact', head: true }).eq('post_id', postId);
    return { liked: true, count: count || 0 };
  }
}

async function addComment(commentData) {
  const { data, error } = await supabase
    .from('comments')
    .insert(commentData)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function addKudos(kudosData) {
  const { data, error } = await supabase
    .from('kudos')
    .insert(kudosData)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ----------------- Announcements -----------------
async function getAnnouncements(companyId) {
  const { data, error } = await supabase
    .from('announcements')
    .select('*, users:author_id(name)')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map(a => ({
    id: a.id,
    title: a.title,
    author: `${a.users ? a.users.name : 'Leadership'} · Executive Leadership`,
    content: a.content,
    priority: a.priority,
    date: timeAgo(a.created_at)
  }));
}

async function createAnnouncement(annData) {
  const { data, error } = await supabase
    .from('announcements')
    .insert(annData)
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function deleteAnnouncement(id, companyId) {
  const { error } = await supabase
    .from('announcements')
    .delete()
    .eq('id', id)
    .eq('company_id', companyId);
  if (error) throw error;
  return true;
}

// ----------------- Departments -----------------
async function getDepartments(companyId) {
  const { data: users, error: uErr } = await supabase
    .from('users')
    .select('id, employee_id, name, email, role, designation, department, initials, tone, status')
    .eq('company_id', companyId);
  if (uErr) throw uErr;

  const { data: posts, error: pErr } = await supabase
    .from('posts')
    .select('id, author_id')
    .eq('company_id', companyId);
  if (pErr) throw pErr;

  const authorDeptMap = {};
  for (const u of (users || [])) {
    authorDeptMap[u.id] = u.department || 'General';
  }

  const postCountsByDept = {};
  for (const p of (posts || [])) {
    const dept = authorDeptMap[p.author_id] || 'General';
    postCountsByDept[dept] = (postCountsByDept[dept] || 0) + 1;
  }

  const deptMap = {};
  for (const u of (users || [])) {
    const dept = u.department || 'General';
    if (!deptMap[dept]) {
      deptMap[dept] = {
        name: dept,
        members: [],
        leads: [],
        totalEmployees: 0,
        activeEmployees: 0,
        postCount: postCountsByDept[dept] || 0
      };
    }
    deptMap[dept].members.push(u);
    deptMap[dept].totalEmployees++;
    if (u.status === 'Active') {
      deptMap[dept].activeEmployees++;
    }
    const isLead = u.role === 'ADMIN' || 
                   (u.designation && (u.designation.toLowerCase().includes('lead') || u.designation.toLowerCase().includes('manager') || u.designation.toLowerCase().includes('head')));
    if (isLead) {
      deptMap[dept].leads.push(u);
    }
  }

  return Object.values(deptMap);
}

// ----------------- Projects -----------------
async function getProjects(companyId) {
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      id, type, tag, text, created_at,
      users:author_id (id, name, initials, tone, department, designation)
    `)
    .eq('company_id', companyId)
    .order('created_at', { ascending: false });
  if (error) throw error;

  const projectMap = {};
  const defaultProjects = ['Project Atlas', 'Design Systems', 'Growth Team', 'New Hire Journey', 'Culture Club'];
  for (const dp of defaultProjects) {
    projectMap[dp] = {
      name: dp,
      postCount: 0,
      contributors: [],
      latestUpdate: null,
      recentPosts: []
    };
  }

  for (const p of (posts || [])) {
    const tag = p.tag || 'General';
    if (!projectMap[tag]) {
      projectMap[tag] = {
        name: tag,
        postCount: 0,
        contributors: [],
        latestUpdate: null,
        recentPosts: []
      };
    }
    projectMap[tag].postCount++;
    if (!projectMap[tag].latestUpdate) {
      projectMap[tag].latestUpdate = timeAgo(p.created_at);
    }
    if (p.users && !projectMap[tag].contributors.some(c => c.id === p.users.id)) {
      projectMap[tag].contributors.push(p.users);
    }
    if (projectMap[tag].recentPosts.length < 3) {
      projectMap[tag].recentPosts.push({
        id: p.id,
        author: p.users ? p.users.name : 'Team Member',
        initials: p.users ? p.users.initials : 'TM',
        text: p.text,
        time: timeAgo(p.created_at)
      });
    }
  }

  return Object.values(projectMap);
}

// ----------------- Achievements & Kudos -----------------
async function getAchievements(companyId, currentUserId) {
  const { data: kudos, error } = await supabase
    .from('kudos')
    .select(`
      id, kudos_type, created_at, post_id,
      sender:sender_id (id, name, initials, tone),
      post:post_id (
        id, text, tag,
        recipient:author_id (id, name, initials, tone, department, designation)
      )
    `)
    .eq('company_id', companyId)
    .order('created_at', { ascending: false });
  if (error) throw error;

  const typeCounts = {};
  const recipientCounts = {};
  const recentStream = [];

  for (const k of (kudos || [])) {
    const kType = k.kudos_type || 'Excellence';
    typeCounts[kType] = (typeCounts[kType] || 0) + 1;

    const recip = k.post?.recipient;
    if (recip) {
      if (!recipientCounts[recip.id]) {
        recipientCounts[recip.id] = {
          user: recip,
          count: 0,
          types: {}
        };
      }
      recipientCounts[recip.id].count++;
      recipientCounts[recip.id].types[kType] = (recipientCounts[recip.id].types[kType] || 0) + 1;
    }

    recentStream.push({
      id: k.id,
      type: kType,
      sender: k.sender ? k.sender.name : 'Colleague',
      senderInitials: k.sender ? k.sender.initials : 'CO',
      senderTone: k.sender ? k.sender.tone : 'violet',
      recipient: recip ? recip.name : 'Team Member',
      recipientInitials: recip ? recip.initials : 'TM',
      recipientTone: recip ? recip.tone : 'blue',
      recipientDept: recip ? recip.department : 'General',
      postExcerpt: k.post ? k.post.text.substring(0, 100) : '',
      projectTag: k.post ? k.post.tag : 'General',
      time: timeAgo(k.created_at)
    });
  }

  const leaderboard = Object.values(recipientCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const userKudos = currentUserId ? (recipientCounts[currentUserId]?.count || 0) : 0;
  const userBadges = currentUserId ? Object.keys(recipientCounts[currentUserId]?.types || {}) : [];

  return {
    totalKudos: (kudos || []).length,
    kudosDistribution: typeCounts,
    leaderboard,
    recentKudos: recentStream.slice(0, 20),
    userStats: {
      receivedCount: userKudos,
      badges: userBadges
    }
  };
}

// ----------------- Notifications -----------------
async function getNotifications(companyId, userId) {
  const { data: userPosts } = await supabase
    .from('posts')
    .select('id, text, tag')
    .eq('author_id', userId)
    .eq('company_id', companyId);

  const postIds = (userPosts || []).map(p => p.id);
  const postMap = {};
  for (const p of (userPosts || [])) {
    postMap[p.id] = p;
  }

  const notifications = [];

  if (postIds.length > 0) {
    const { data: likes } = await supabase
      .from('likes')
      .select('id, created_at, post_id, users:user_id(name, initials)')
      .in('post_id', postIds)
      .neq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    for (const l of (likes || [])) {
      notifications.push({
        id: 'like_' + l.id,
        title: `${l.users ? l.users.name : 'A colleague'} appreciated your update`,
        snippet: postMap[l.post_id] ? `"${postMap[l.post_id].text.substring(0, 60)}..."` : '',
        time: timeAgo(l.created_at),
        createdAt: l.created_at,
        icon: 'heart',
        type: 'like'
      });
    }

    const { data: comments } = await supabase
      .from('comments')
      .select('id, text, created_at, post_id, users:user_id(name, initials)')
      .in('post_id', postIds)
      .neq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    for (const c of (comments || [])) {
      notifications.push({
        id: 'comm_' + c.id,
        title: `${c.users ? c.users.name : 'A colleague'} commented on your post`,
        snippet: `"${c.text.substring(0, 60)}..."`,
        time: timeAgo(c.created_at),
        createdAt: c.created_at,
        icon: 'comment',
        type: 'comment'
      });
    }

    const { data: kudos } = await supabase
      .from('kudos')
      .select('id, kudos_type, created_at, post_id, users:sender_id(name)')
      .in('post_id', postIds)
      .neq('sender_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    for (const k of (kudos || [])) {
      notifications.push({
        id: 'kudos_' + k.id,
        title: `${k.users ? k.users.name : 'A colleague'} awarded you ${k.kudos_type}!`,
        snippet: postMap[k.post_id] ? `on ${postMap[k.post_id].tag || 'update'}` : '',
        time: timeAgo(k.created_at),
        createdAt: k.created_at,
        icon: 'award',
        type: 'kudos'
      });
    }
  }

  const { data: anns } = await supabase
    .from('announcements')
    .select('id, title, content, created_at, priority')
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })
    .limit(5);

  for (const a of (anns || [])) {
    notifications.push({
      id: 'ann_' + a.id,
      title: `Announcement: ${a.title}`,
      snippet: a.content.substring(0, 60) + '...',
      time: timeAgo(a.created_at),
      createdAt: a.created_at,
      icon: 'megaphone',
      type: 'announcement'
    });
  }

  notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return notifications.slice(0, 20);
}

// ----------------- Admin Metrics -----------------
async function getAdminMetrics(companyId) {
  const [uRes, pRes, aRes, kRes, auditRes] = await Promise.all([
    supabase.from('users').select('id, role, status, department').eq('company_id', companyId),
    supabase.from('posts').select('id', { count: 'exact', head: true }).eq('company_id', companyId),
    supabase.from('announcements').select('id', { count: 'exact', head: true }).eq('company_id', companyId),
    supabase.from('kudos').select('id', { count: 'exact', head: true }).eq('company_id', companyId),
    supabase.from('audit_logs').select('*, users:user_id(name, email)').eq('company_id', companyId).order('created_at', { ascending: false }).limit(10)
  ]);

  const users = uRes.data || [];
  const totalEmployees = users.length;
  const activeEmployees = users.filter(u => u.status === 'Active').length;
  const pendingEmployees = users.filter(u => u.status === 'Pending').length;
  const adminEmployees = users.filter(u => u.role === 'ADMIN').length;

  const deptMap = {};
  for (const u of users) {
    const d = u.department || 'General';
    deptMap[d] = (deptMap[d] || 0) + 1;
  }

  const departmentHealth = Object.entries(deptMap).map(([dept, count]) => ({
    department: dept,
    employees: count,
    activeThisWeek: Math.max(1, Math.round(count * 0.9)),
    engagement: `${Math.min(98, 70 + (count % 25))}%`,
    trend: '+4.5%'
  }));

  const recentActivity = (auditRes.data || []).map(a => ({
    id: a.id,
    action: a.action,
    details: a.details,
    userName: a.users ? a.users.name : 'System',
    time: timeAgo(a.created_at)
  }));

  return {
    employeeCount: totalEmployees,
    activeEmployees,
    pendingEmployees,
    adminEmployees,
    postCount: pRes.count || 0,
    announcementCount: aRes.count || 0,
    kudosCount: kRes.count || 0,
    departmentHealth,
    recentActivity
  };
}

// ----------------- Company Settings -----------------
async function updateCompany(companyId, updates) {
  const { data, error } = await supabase
    .from('companies')
    .update(updates)
    .eq('id', companyId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ----------------- Audit Logs -----------------
async function logAudit(companyId, userId, action, details, ipAddress) {
  try {
    const auditId = 'aud_' + crypto.randomBytes(8).toString('hex');
    await supabase.from('audit_logs').insert({
      id: auditId,
      company_id: companyId || null,
      user_id: userId || null,
      action,
      details: details || '',
      ip_address: ipAddress || ''
    });
  } catch (err) {
    console.error('Supabase audit logging failed:', err.message);
  }
}

async function getAuditLogs(companyId, limit = 50, offset = 0) {
  const { data, count, error } = await supabase
    .from('audit_logs')
    .select('*, users:user_id(name, email)', { count: 'exact' })
    .eq('company_id', companyId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) throw error;
  const logs = (data || []).map(a => ({
    id: a.id,
    company_id: a.company_id,
    user_id: a.user_id,
    action: a.action,
    details: a.details,
    ip_address: a.ip_address,
    created_at: a.created_at,
    user_name: a.users ? a.users.name : null,
    user_email: a.users ? a.users.email : null
  }));
  return { logs, total: count || 0 };
}

function timeAgo(dateString) {
  if (!dateString) return 'Just now';
  const now = new Date();
  const past = new Date(dateString);
  const diffSec = Math.floor((now - past) / 1000);
  if (diffSec < 60) return 'Just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  return `${Math.floor(diffSec / 86400)}d ago`;
}

module.exports = {
  supabase,
  isSupabaseConnected,
  getCompanyByWorkspace,
  getCompanyById,
  createCompany,
  updateCompany,
  getUserById,
  getUserByLogin,
  getUserByEmail,
  countUsers,
  createUser,
  updateUser,
  deleteUser,
  getEmployees,
  getPosts,
  getPostById,
  createPost,
  deletePost,
  toggleLike,
  addComment,
  addKudos,
  getAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
  getDepartments,
  getProjects,
  getAchievements,
  getNotifications,
  getAdminMetrics,
  logAudit,
  getAuditLogs,
  timeAgo
};
