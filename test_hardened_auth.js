const http = require('http');

function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          resolve({ status: res.statusCode, headers: res.headers, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

async function runHardenedAuthTests() {
  console.log('====================================================');
  console.log('🔒 VERIFYING HARDENED BACKEND & AUTHENTICATION SUITE');
  console.log('====================================================\n');

  const BASE_HOST = 'localhost';
  const BASE_PORT = 3000;

  // 1. Unified Login Error Message on Non-existent user vs Wrong password
  console.log('--- 1. Testing Unified Login Error Messages ---');
  const resBadUser = await request({
    hostname: BASE_HOST,
    port: BASE_PORT,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    workspaceId: 'INX-48291',
    email: 'nonexistent_user_' + Date.now() + '@innovix.com',
    password: 'wrongPassword1'
  });

  const resBadPass = await request({
    hostname: BASE_HOST,
    port: BASE_PORT,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    workspaceId: 'INX-48291',
    email: 'admin@innovix.com',
    password: 'wrongPassword99'
  });

  const expectedMsg = 'Invalid workspace code, email/employee ID, or password.';
  if (resBadUser.body.error === expectedMsg && resBadPass.body.error === expectedMsg) {
    console.log('✅ Unified error messages verified: Identical response for non-existent user and bad password.');
  } else {
    throw new Error(`Unified error message mismatch! BadUser: ${resBadUser.body.error}, BadPass: ${resBadPass.body.error}`);
  }

  // 2. Password Strength Validation
  console.log('\n--- 2. Testing Password Complexity Enforcement ---');
  const shortPassRes = await request({
    hostname: BASE_HOST,
    port: BASE_PORT,
    path: '/api/auth/employee-register',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    workspaceId: 'INX-48291',
    name: 'Weak Pass User',
    email: 'weak_' + Date.now() + '@innovix.com',
    password: '123'
  });
  if (shortPassRes.status === 400 && shortPassRes.body.error.includes('at least 6 characters')) {
    console.log('✅ Weak password (<6 chars) rejected properly with 400.');
  } else {
    throw new Error(`Password length check failed: ${JSON.stringify(shortPassRes.body)}`);
  }

  const noDigitRes = await request({
    hostname: BASE_HOST,
    port: BASE_PORT,
    path: '/api/auth/employee-register',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    workspaceId: 'INX-48291',
    name: 'Weak Pass User 2',
    email: 'weak2_' + Date.now() + '@innovix.com',
    password: 'abcdefgh'
  });
  if (noDigitRes.status === 400 && noDigitRes.body.error.includes('both letters and numbers')) {
    console.log('✅ Non-alphanumeric password rejected properly with 400.');
  } else {
    throw new Error(`Password complexity check failed: ${JSON.stringify(noDigitRes.body)}`);
  }

  // 3. Registering & Approving a Test Employee for Token Revocation & Password Change
  console.log('\n--- 3. Testing Token Revocation & Versioning via Logout ---');
  const testEmail = `tester.${Date.now()}@innovix.com`;
  const regRes = await request({
    hostname: BASE_HOST,
    port: BASE_PORT,
    path: '/api/auth/employee-register',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    workspaceId: 'INX-48291',
    name: 'Revocation Tester',
    email: testEmail,
    password: 'testPassword123'
  });
  const newUserId = regRes.body.employee.id;

  // Admin login to approve
  const adminLoginRes = await request({
    hostname: BASE_HOST,
    port: BASE_PORT,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    workspaceId: 'INX-48291',
    email: 'admin@innovix.com',
    password: 'demo' + '123'
  });
  const adminToken = adminLoginRes.body.token;

  // Approve test user
  await request({
    hostname: BASE_HOST,
    port: BASE_PORT,
    path: `/api/employees/${newUserId}/approve`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${adminToken}`,
      'Content-Type': 'application/json'
    }
  });

  // User logs in
  const userLoginRes = await request({
    hostname: BASE_HOST,
    port: BASE_PORT,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    workspaceId: 'INX-48291',
    email: testEmail,
    password: 'testPassword123'
  });
  const userToken = userLoginRes.body.token;

  // Verify access with fresh token
  const meBeforeLogout = await request({
    hostname: BASE_HOST,
    port: BASE_PORT,
    path: '/api/auth/me',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${userToken}` }
  });
  if (meBeforeLogout.status !== 200) {
    throw new Error('Could not access /api/auth/me with valid token');
  }
  console.log('✅ Active session authenticated successfully.');

  // User logs out (should increment token_version in DB)
  const logoutRes = await request({
    hostname: BASE_HOST,
    port: BASE_PORT,
    path: '/api/auth/logout',
    method: 'POST',
    headers: { 'Authorization': `Bearer ${userToken}` }
  });
  if (logoutRes.status === 200 && logoutRes.body.success) {
    console.log('✅ User logged out successfully.');
  } else {
    throw new Error('Logout failed');
  }

  // Attempt to use the old token
  const meAfterLogout = await request({
    hostname: BASE_HOST,
    port: BASE_PORT,
    path: '/api/auth/me',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${userToken}` }
  });
  if (meAfterLogout.status === 401 && (meAfterLogout.body.error.includes('invalidated') || meAfterLogout.body.error.includes('revoked'))) {
    console.log('✅ Token Revocation verified: Logged out token immediately blocked with 401 (Session invalidated).');
  } else {
    throw new Error(`Token was not revoked! Status: ${meAfterLogout.status}, body: ${JSON.stringify(meAfterLogout.body)}`);
  }

  // 4. Testing Password Change & Old Session Invalidation
  console.log('\n--- 4. Testing Password Change & Session Invalidation ---');
  // Re-login to get fresh token
  const userLogin2 = await request({
    hostname: BASE_HOST,
    port: BASE_PORT,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    workspaceId: 'INX-48291',
    email: testEmail,
    password: 'testPassword123'
  });
  const token2 = userLogin2.body.token;

  // Change password
  const changePassRes = await request({
    hostname: BASE_HOST,
    port: BASE_PORT,
    path: '/api/auth/change-password',
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token2}`,
      'Content-Type': 'application/json'
    }
  }, {
    currentPassword: 'testPassword123',
    newPassword: 'newSecretKey999'
  });
  if (changePassRes.status !== 200 || !changePassRes.body.token) {
    throw new Error(`Change password failed: ${JSON.stringify(changePassRes.body)}`);
  }
  const token3 = changePassRes.body.token;
  console.log('✅ Password changed successfully, new token issued.');

  // Old token2 should now be revoked
  const testOldToken = await request({
    hostname: BASE_HOST,
    port: BASE_PORT,
    path: '/api/auth/me',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token2}` }
  });
  if (testOldToken.status === 401) {
    console.log('✅ Old token automatically revoked on password change.');
  } else {
    throw new Error('Old token was not revoked after password change');
  }

  // New token3 should work
  const testNewToken = await request({
    hostname: BASE_HOST,
    port: BASE_PORT,
    path: '/api/auth/me',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token3}` }
  });
  if (testNewToken.status === 200) {
    console.log('✅ New token authenticated successfully.');
  } else {
    throw new Error('New token failed to authenticate');
  }

  // 5. Query Pagination
  console.log('\n--- 5. Testing Feed & Directory Query Pagination ---');
  const paginatedPosts = await request({
    hostname: BASE_HOST,
    port: BASE_PORT,
    path: '/api/posts?limit=2&offset=0',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  if (paginatedPosts.status === 200 && paginatedPosts.body.posts.length <= 2 && paginatedPosts.body.total !== undefined) {
    console.log(`✅ Pagination verified: Returned ${paginatedPosts.body.posts.length} posts (total: ${paginatedPosts.body.total}, limit: 2).`);
  } else {
    throw new Error(`Posts pagination check failed: ${JSON.stringify(paginatedPosts.body)}`);
  }

  // 6. Audit Trail Logging
  console.log('\n--- 6. Testing Security Audit Logs Trail ---');
  const auditRes = await request({
    hostname: BASE_HOST,
    port: BASE_PORT,
    path: '/api/audit-logs?limit=10',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  if (auditRes.status === 200 && Array.isArray(auditRes.body.logs) && auditRes.body.logs.length > 0) {
    const actions = auditRes.body.logs.map(l => l.action);
    console.log(`✅ Audit trail recorded ${auditRes.body.logs.length} recent actions: ${[...new Set(actions)].join(', ')}`);
  } else {
    throw new Error(`Audit logs check failed: ${JSON.stringify(auditRes.body)}`);
  }

  // 7. Rate Limiter Brute Force Protection
  console.log('\n--- 7. Testing Sliding-Window Rate Limiter Protection ---');
  const targetEmail = `brute_target_${Date.now()}@innovix.com`;
  let rateLimited = false;
  for (let i = 1; i <= 11; i++) {
    const attempt = await request({
      hostname: BASE_HOST,
      port: BASE_PORT,
      path: '/api/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      workspaceId: 'INX-48291',
      email: targetEmail,
      password: 'badPassword' + i
    });
    if (attempt.status === 429) {
      rateLimited = true;
      console.log(`✅ Rate limiter triggered on attempt #${i} with HTTP 429: "${attempt.body.error}"`);
      break;
    }
  }
  if (!rateLimited) {
    throw new Error('Rate limiter did not block excessive failed login attempts!');
  }

  console.log('\n====================================================');
  console.log('🎉 ALL 7 SECURITY & ARCHITECTURE TESTS PASSED 100%!');
  console.log('====================================================');
}

runHardenedAuthTests().catch(err => {
  console.error('\n❌ TEST RUN FAILED:', err);
  process.exit(1);
});
