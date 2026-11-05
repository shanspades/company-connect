const http = require('http');
const assert = require('assert');

function request(path, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(`http://localhost:3000${path}`, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(data); } catch (e) { json = data; }
        resolve({ status: res.statusCode, data: json });
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// We will start server programmatically if not running, or test against existing
async function runTests() {
  console.log('🧪 Starting Admin Dashboard & Employee Approval Backend Tests...');
  const { app, server } = require('./server.js');

  try {
    // 1. Admin Login
    console.log('1. Testing Admin Login...');
    const adminLogin = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      workspaceId: 'INX-48291',
      email: 'admin@innovix.com',
      password: 'demo123',
      roleExpected: 'ADMIN'
    });
    assert.strictEqual(adminLogin.status, 200, 'Admin login failed');
    const adminToken = adminLogin.data.token;
    assert(adminToken, 'Admin token missing');
    console.log('✅ Admin login OK');

    // 2. Employee Self-Registration (Pending)
    const testEmail = `newbie.${Date.now()}@innovix.com`;
    console.log('2. Testing Employee Self-Registration...');
    const regRes = await request('/api/auth/employee-register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      workspaceId: 'INX-48291',
      name: 'Taylor Swift',
      email: testEmail,
      password: 'Password123!',
      designation: 'Sound Architect',
      department: 'Engineering'
    });
    assert.strictEqual(regRes.status, 201, 'Registration failed');
    assert.strictEqual(regRes.data.employee.status, 'Pending', 'Status should be Pending');
    const newbieId = regRes.data.employee.id;
    const newbieEmpId = regRes.data.employee.employeeId;
    console.log(`✅ Employee registered with ID ${newbieId}, EmployeeID ${newbieEmpId}, Status: Pending`);

    // 3. Pending employee cannot log in
    console.log('3. Verifying Pending employee cannot log in...');
    const pendingLogin = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      workspaceId: 'INX-48291',
      email: testEmail,
      password: 'Password123!'
    });
    assert.strictEqual(pendingLogin.status, 403, 'Pending user must not be able to log in');
    assert(pendingLogin.data.error.includes('pending'), 'Expected pending error message');
    console.log('✅ Pending employee login correctly blocked (403)');

    // 4. Admin lists employees and sees Pending status
    console.log('4. Admin listing employees...');
    const empListRes = await request('/api/employees', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    assert.strictEqual(empListRes.status, 200);
    const foundNewbie = empListRes.data.employees.find(e => e.id === newbieId);
    assert(foundNewbie, 'New employee should be in list');
    assert.strictEqual(foundNewbie.status, 'Pending');
    console.log('✅ Pending employee visible in admin employee list');

    // 5. Admin edits employee login ID (employeeId)
    console.log('5. Admin editing employee login ID...');
    const updatedEmpId = `INX-EDITED-${Date.now().toString().slice(-4)}`;
    const editRes = await request(`/api/employees/${newbieId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      }
    }, {
      employeeId: updatedEmpId,
      designation: 'Lead Sound Architect'
    });
    assert.strictEqual(editRes.status, 200, 'Edit employee failed');
    assert.strictEqual(editRes.data.employee.employeeId, updatedEmpId, 'Employee ID should be updated');
    console.log(`✅ Employee ID updated to: ${updatedEmpId}`);

    // 6. Admin approves employee
    console.log('6. Admin approving employee...');
    const approveRes = await request(`/api/employees/${newbieId}/approve`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    assert.strictEqual(approveRes.status, 200, 'Approve failed');
    assert.strictEqual(approveRes.data.employee.status, 'Active', 'Status should be Active');
    console.log('✅ Employee approved successfully');

    // 7. Approved employee logs in using email
    console.log('7. Approved employee logging in with email...');
    const approvedLoginEmail = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      workspaceId: 'INX-48291',
      email: testEmail,
      password: 'Password123!'
    });
    assert.strictEqual(approvedLoginEmail.status, 200, 'Approved login with email failed');
    console.log('✅ Approved employee logged in with email');

    // 8. Approved employee logs in using edited Employee ID (Login ID)
    console.log('8. Approved employee logging in with edited Employee ID...');
    const approvedLoginEmpId = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      workspaceId: 'INX-48291',
      email: updatedEmpId, // using login ID in the login field
      password: 'Password123!'
    });
    assert.strictEqual(approvedLoginEmpId.status, 200, 'Approved login with Employee ID failed');
    console.log('✅ Approved employee logged in with new Employee ID');

    // 9. Admin rejects an employee test
    console.log('9. Testing reject flow on another user...');
    const rejectEmail = `reject.${Date.now()}@innovix.com`;
    const regRes2 = await request('/api/auth/employee-register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      workspaceId: 'INX-48291',
      name: 'Bad Actor',
      email: rejectEmail,
      password: 'Password123!'
    });
    const rejectId = regRes2.data.employee.id;

    const rejectRes = await request(`/api/employees/${rejectId}/reject`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    assert.strictEqual(rejectRes.status, 200);
    assert.strictEqual(rejectRes.data.employee.status, 'Rejected');

    const rejectLogin = await request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      workspaceId: 'INX-48291',
      email: rejectEmail,
      password: 'Password123!'
    });
    assert.strictEqual(rejectLogin.status, 403);
    assert(rejectLogin.data.error.includes('not approved'));
    console.log('✅ Reject flow verified and login rejected (403)');

    console.log('\n🎉 ALL 9 TEST SUITES PASSED PERFECTLY!');
  } finally {
    server.close();
  }
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
