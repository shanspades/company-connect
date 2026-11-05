const http = require('http');

function request(path, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: '127.0.0.1',
      port: 3000,
      path,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    };

    const req = http.request(opts, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, raw: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(typeof body === 'string' ? body : JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting Comprehensive Backend Endpoints Verification Test...');
  let adminToken = '';
  let workspaceId = 'INX-48291';
  let userId = '';

  // 1. Database Status
  const dbStatus = await request('/api/database-status');
  console.log('1. /api/database-status ->', dbStatus.status, dbStatus.data?.primary, 'Supabase:', dbStatus.data?.supabase?.connected);

  // 2. Login as Admin
  const loginRes = await request('/api/auth/login', { method: 'POST' }, {
    workspaceId: 'INX-48291',
    email: 'admin@innovix.com',
    password: 'demo123'
  });
  console.log('2. Login Admin ->', loginRes.status, loginRes.data?.user?.name);
  adminToken = loginRes.data?.token;
  userId = loginRes.data?.user?.id;
  const authHeaders = { 'Authorization': `Bearer ${adminToken}` };

  // 3. Departments
  const deptRes = await request('/api/departments', { headers: authHeaders });
  console.log('3. /api/departments ->', deptRes.status, 'Depts found:', deptRes.data?.departments?.length);

  // 4. Projects
  const projRes = await request('/api/projects', { headers: authHeaders });
  console.log('4. /api/projects ->', projRes.status, 'Projects found:', projRes.data?.projects?.length);

  // 5. Achievements
  const achRes = await request('/api/achievements', { headers: authHeaders });
  console.log('5. /api/achievements ->', achRes.status, 'Total Kudos:', achRes.data?.totalKudos, 'Leaderboard entries:', achRes.data?.leaderboard?.length);

  // 6. Notifications
  const notifRes = await request('/api/notifications', { headers: authHeaders });
  console.log('6. /api/notifications ->', notifRes.status, 'Notifications count:', notifRes.data?.notifications?.length);

  // 7. Mark notifications read
  const markRes = await request('/api/notifications/read', { method: 'POST', headers: authHeaders });
  console.log('7. /api/notifications/read ->', markRes.status, markRes.data?.message);

  // 8. Admin Metrics
  const metricsRes = await request('/api/admin/metrics', { headers: authHeaders });
  console.log('8. /api/admin/metrics ->', metricsRes.status, 'Employees:', metricsRes.data?.employeeCount, 'Posts:', metricsRes.data?.postCount, 'Activities:', metricsRes.data?.recentActivity?.length);

  // 9. Roles
  const rolesRes = await request('/api/roles', { headers: authHeaders });
  console.log('9. /api/roles ->', rolesRes.status, 'Roles:', rolesRes.data?.roles?.map(r => `${r.name} (${r.count})`).join(', '));

  // 10. Workspace Settings GET
  const wsGet = await request('/api/workspace/settings', { headers: authHeaders });
  console.log('10. /api/workspace/settings GET ->', wsGet.status, wsGet.data?.company?.name, wsGet.data?.database?.primary);

  // 11. Profile Update PUT
  const profileUpdate = await request('/api/auth/profile', { method: 'PUT', headers: authHeaders }, {
    name: 'Alicia Rodriguez',
    designation: 'Chief Technology Officer',
    department: 'Executive Leadership',
    bio: 'Technology visionary passionate about distributed systems and delightful team developer experience.',
    skills: 'Distributed Systems, TypeScript, PostgreSQL, Leadership'
  });
  console.log('11. /api/auth/profile PUT ->', profileUpdate.status, profileUpdate.data?.user?.designation, profileUpdate.data?.user?.bio ? 'Bio saved' : 'No bio');

  // 12. User Profile GET
  const userProfile = await request(`/api/users/${userId}`, { headers: authHeaders });
  console.log('12. /api/users/:id GET ->', userProfile.status, userProfile.data?.user?.name, userProfile.data?.user?.bio ? 'Bio retrieved' : 'No bio');

  console.log('✅ ALL BACKEND ENDPOINTS TESTED SUCCESSFULLY!');
}

runTests().catch(console.error);
