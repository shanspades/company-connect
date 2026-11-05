const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');
const crypto = require('crypto');

// Ensure data directory exists
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'company_connect.db');
const db = new Database(dbPath);

// Enable Foreign Key support
db.pragma('foreign_keys = ON');

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(':')) return false;
  const [salt, key] = storedHash.split(':');
  const keyBuffer = Buffer.from(key, 'hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(keyBuffer, derivedKey);
}

function validatePasswordStrength(password) {
  if (!password || typeof password !== 'string') {
    return { valid: false, message: 'Password is required.' };
  }
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters long.' };
  }
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain both letters and numbers.' };
  }
  return { valid: true };
}

function logAudit(companyId, userId, action, details, ipAddress) {
  try {
    const auditId = 'aud_' + crypto.randomBytes(8).toString('hex');
    db.prepare(`
      INSERT INTO audit_logs (id, company_id, user_id, action, details, ip_address, created_at)
      VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
    `).run(auditId, companyId || null, userId || null, action, details || '', ipAddress || '');
  } catch (err) {
    console.error('Local audit logging failed:', err.message);
  }

  // Asynchronous write to Supabase
  try {
    const supabaseDb = require('./supabaseClient');
    supabaseDb.logAudit(companyId, userId, action, details, ipAddress).catch(() => {});
  } catch (err) {}
}

function initDb() {
  console.log('📦 Initializing Company Connect SQLite database at:', dbPath);

  // 1. Companies Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS companies (
      id TEXT PRIMARY KEY,
      workspace_id TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      industry TEXT,
      company_size TEXT,
      email TEXT,
      website TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Users Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      employee_id TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL, -- 'ADMIN' or 'EMPLOYEE'
      designation TEXT,
      department TEXT,
      initials TEXT,
      tone TEXT DEFAULT 'violet',
      status TEXT DEFAULT 'Active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
      UNIQUE(company_id, email),
      UNIQUE(company_id, employee_id)
    );
  `);

  // 3. Posts Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      author_id TEXT NOT NULL,
      type TEXT NOT NULL,
      tag TEXT,
      text TEXT NOT NULL,
      image TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
      FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // 4. Likes Table (UNIQUE post_id + user_id prevents duplicate likes)
  db.exec(`
    CREATE TABLE IF NOT EXISTS likes (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      post_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(post_id, user_id)
    );
  `);

  // 5. Comments Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      post_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      text TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // 6. Kudos Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS kudos (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      post_id TEXT NOT NULL,
      sender_id TEXT NOT NULL,
      kudos_type TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
      FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // 7. Announcements Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS announcements (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL,
      author_id TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      priority TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
      FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // 8. Security Audit Logs Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      company_id TEXT,
      user_id TEXT,
      action TEXT NOT NULL,
      details TEXT,
      ip_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Migration: Ensure users table has token_version column for server-side session revocation
  try {
    db.exec('ALTER TABLE users ADD COLUMN token_version INTEGER DEFAULT 1');
  } catch (err) {
    // Column already exists
  }

  // Migration: Ensure users table has bio and skills columns
  try {
    db.exec('ALTER TABLE users ADD COLUMN bio TEXT');
  } catch (err) {}
  try {
    db.exec('ALTER TABLE users ADD COLUMN skills TEXT');
  } catch (err) {}

  // Seed default demo data if companies table is empty
  const companyCount = db.prepare('SELECT COUNT(*) as count FROM companies').get().count;
  if (companyCount === 0) {
    seedInitialData();
  } else {
    console.log('✅ SQLite database already contains data.');
  }
}

function seedInitialData() {
  console.log('🌱 Seeding initial demo companies, users, and social feed...');

  const defaultPasswordHash = hashPassword('demo123');

  // Seed Company 1: Innovix Technologies (INX-48291)
  const comp1Id = 'comp_innovix';
  db.prepare(`
    INSERT INTO companies (id, workspace_id, name, industry, company_size, email, website)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    comp1Id,
    'INX-48291',
    'Innovix Technologies',
    'Enterprise Software',
    '250-500 employees',
    'contact@innovix.com',
    'https://innovix.com'
  );

  // Seed Company 1 Admin: Alicia Rodriguez
  const admin1Id = 'user_alicia';
  db.prepare(`
    INSERT INTO users (id, company_id, employee_id, name, email, password_hash, role, designation, department, initials, tone, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    admin1Id,
    comp1Id,
    'EMP-001',
    'Alicia Rodriguez',
    'admin@innovix.com',
    defaultPasswordHash,
    'ADMIN',
    'VP of Operations',
    'Executive Office',
    'AR',
    'slate',
    'Active'
  );

  // Seed Company 1 Employees
  const emp1Id = 'user_olivia';
  db.prepare(`
    INSERT INTO users (id, company_id, employee_id, name, email, password_hash, role, designation, department, initials, tone, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    emp1Id,
    comp1Id,
    'EMP-1024',
    'Olivia Martin',
    'employee@innovix.com',
    defaultPasswordHash,
    'EMPLOYEE',
    'Lead Product Designer',
    'Product Design',
    'OM',
    'violet',
    'Active'
  );

  const employeesSeed = [
    { id: 'user_marcus', empId: 'EMP-1025', name: 'Marcus Chen', email: 'marcus@innovix.com', role: 'EMPLOYEE', designation: 'Staff Systems Architect', dept: 'Engineering', initials: 'MC', tone: 'blue' },
    { id: 'user_priya', empId: 'EMP-1026', name: 'Priya Nair', email: 'priya@innovix.com', role: 'EMPLOYEE', designation: 'Head of People & Culture', dept: 'Human Resources', initials: 'PN', tone: 'coral' },
    { id: 'user_daniel', empId: 'EMP-1027', name: 'Daniel Kim', email: 'daniel@innovix.com', role: 'EMPLOYEE', designation: 'Principal Security Lead', dept: 'Infrastructure', initials: 'DK', tone: 'green' },
    { id: 'user_sophia', empId: 'EMP-1028', name: 'Sophia Patel', email: 'sophia@innovix.com', role: 'EMPLOYEE', designation: 'Senior Product Manager', dept: 'Product Management', initials: 'SP', tone: 'amber' },
    { id: 'user_james', empId: 'EMP-1029', name: 'James Wilson', email: 'james@innovix.com', role: 'EMPLOYEE', designation: 'Frontend Platform Engineer', dept: 'Engineering', initials: 'JW', tone: 'violet' }
  ];

  for (const emp of employeesSeed) {
    db.prepare(`
      INSERT INTO users (id, company_id, employee_id, name, email, password_hash, role, designation, department, initials, tone, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      emp.id,
      comp1Id,
      emp.empId,
      emp.name,
      emp.email,
      defaultPasswordHash,
      emp.role,
      emp.designation,
      emp.dept,
      emp.initials,
      emp.tone,
      'Active'
    );
  }

  // Seed Company 1 Posts
  const post1Id = 'post_1';
  db.prepare(`
    INSERT INTO posts (id, company_id, author_id, type, tag, text, image, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now', '-2 hours'))
  `).run(
    post1Id,
    comp1Id,
    'user_marcus',
    'PROJECT PROGRESS',
    'Project Atlas',
    'Thrilled to announce that the Project Atlas architecture migration completed with 0 downtime and 42% lower latency. Massive kudos to the platform & infra team for pulling this off smoothly over the weekend!',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
  );

  const post2Id = 'post_2';
  db.prepare(`
    INSERT INTO posts (id, company_id, author_id, type, tag, text, image, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now', '-5 hours'))
  `).run(
    post2Id,
    comp1Id,
    'user_olivia',
    'ACHIEVEMENT',
    'Design System v3',
    'Just finalized the new accessibility color audit across all 80+ components in our design tokens library! Every single contrast ratio meets WCAG AAA standards. Sneak peek of the token palette below 🎨',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80'
  );

  const post3Id = 'post_3';
  db.prepare(`
    INSERT INTO posts (id, company_id, author_id, type, tag, text, image, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now', '-1 days'))
  `).run(
    post3Id,
    comp1Id,
    'user_priya',
    'TEAM CELEBRATION',
    'People & Culture',
    'Huge congratulations to Daniel Kim for celebrating his 3rd work anniversary at Innovix! Daniel has been the cornerstone of our cloud infrastructure and a stellar mentor to our new engineers. Thank you Daniel! 🚀',
    null
  );

  // Seed Likes (prevent duplicate with UNIQUE(post_id, user_id))
  db.prepare('INSERT INTO likes (id, company_id, post_id, user_id) VALUES (?, ?, ?, ?)').run('like_1', comp1Id, post1Id, emp1Id);
  db.prepare('INSERT INTO likes (id, company_id, post_id, user_id) VALUES (?, ?, ?, ?)').run('like_2', comp1Id, post1Id, admin1Id);
  db.prepare('INSERT INTO likes (id, company_id, post_id, user_id) VALUES (?, ?, ?, ?)').run('like_3', comp1Id, post1Id, 'user_priya');
  db.prepare('INSERT INTO likes (id, company_id, post_id, user_id) VALUES (?, ?, ?, ?)').run('like_4', comp1Id, post2Id, 'user_marcus');
  db.prepare('INSERT INTO likes (id, company_id, post_id, user_id) VALUES (?, ?, ?, ?)').run('like_5', comp1Id, post2Id, emp1Id);

  // Seed Comments
  db.prepare('INSERT INTO comments (id, company_id, post_id, user_id, text, created_at) VALUES (?, ?, ?, ?, ?, datetime(\'now\', \'-1 hours\'))').run('c_1', comp1Id, post1Id, 'user_olivia', 'Incredible work team! The latency reduction is already noticeable in our dashboard tests.');
  db.prepare('INSERT INTO comments (id, company_id, post_id, user_id, text, created_at) VALUES (?, ?, ?, ?, ?, datetime(\'now\', \'-30 minutes\'))').run('c_2', comp1Id, post1Id, admin1Id, 'Outstanding execution. Forwarding these numbers to our exec board sync.');
  db.prepare('INSERT INTO comments (id, company_id, post_id, user_id, text, created_at) VALUES (?, ?, ?, ?, ?, datetime(\'now\', \'-4 hours\'))').run('c_3', comp1Id, post2Id, 'user_marcus', 'The new contrast tokens are so much easier to read in dark mode. Huge win!');

  // Seed Kudos
  db.prepare('INSERT INTO kudos (id, company_id, post_id, sender_id, kudos_type) VALUES (?, ?, ?, ?, ?)').run('k_1', comp1Id, post1Id, emp1Id, 'High Velocity');
  db.prepare('INSERT INTO kudos (id, company_id, post_id, sender_id, kudos_type) VALUES (?, ?, ?, ?, ?)').run('k_2', comp1Id, post2Id, 'user_marcus', 'Innovation');

  // Seed Announcements
  db.prepare(`
    INSERT INTO announcements (id, company_id, author_id, title, content, priority, created_at)
    VALUES (?, ?, ?, ?, ?, ?, datetime('now', '-1 days'))
  `).run(
    'ann_1',
    comp1Id,
    admin1Id,
    'Q2 All-Hands Meeting & Global Strategy',
    'Join us for company updates, customer stories, and a live Q&A with the leadership team.',
    'COMPANY'
  );

  db.prepare(`
    INSERT INTO announcements (id, company_id, author_id, title, content, priority, created_at)
    VALUES (?, ?, ?, ?, ?, ?, datetime('now', '-3 days'))
  `).run(
    'ann_2',
    comp1Id,
    'user_priya',
    'New Employee Wellness & Mental Health Benefit',
    'Your updated benefits now include a monthly fitness stipend and full Headspace premium membership.',
    'BENEFITS'
  );

  // Seed Company 2: Nexus Dynamics (NEX-78901) to test strict Multi-Tenant Isolation
  const comp2Id = 'comp_nexus';
  db.prepare(`
    INSERT INTO companies (id, workspace_id, name, industry, company_size, email, website)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    comp2Id,
    'NEX-78901',
    'Nexus Dynamics',
    'Artificial Intelligence',
    '50-100 employees',
    'info@nexusdynamics.com',
    'https://nexusdynamics.com'
  );

  const admin2Id = 'user_nexus_admin';
  db.prepare(`
    INSERT INTO users (id, company_id, employee_id, name, email, password_hash, role, designation, department, initials, tone, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    admin2Id,
    comp2Id,
    'NEX-001',
    'Ethan Vance',
    'admin@nexus.com',
    defaultPasswordHash,
    'ADMIN',
    'Chief Executive Officer',
    'Leadership',
    'EV',
    'slate',
    'Active'
  );

  const postNexusId = 'post_nexus_1';
  db.prepare(`
    INSERT INTO posts (id, company_id, author_id, type, tag, text, image, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now', '-1 hours'))
  `).run(
    postNexusId,
    comp2Id,
    admin2Id,
    'DAILY UPDATE',
    'Confidential Alpha',
    'CONFIDENTIAL TO NEXUS DYNAMICS: Closed Series B round today! Innovix members must NEVER be able to see this post.',
    null
  );

  console.log('✅ Seeding complete. 2 separate company workspaces initialized.');
}

module.exports = {
  db,
  initDb,
  hashPassword,
  verifyPassword,
  validatePasswordStrength,
  logAudit
};
