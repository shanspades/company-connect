const http = require('http');

function api(path, method = 'GET', data = null, token = null) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : '';
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: headers
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(body); } catch (e) { json = body; }
        resolve({ status: res.statusCode, headers: res.headers, data: json });
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function runOfficialTests() {
  console.log('====================================================');
  console.log('🧪 OFFICIAL TEST SUITE: COMPANY CONNECT ADMIN DASHBOARD');
  console.log('====================================================\n');

  // ==========================================
  // TEST A: Edit Employee Login ID & Credentials Persistence
  // ==========================================
  console.log('>>> RUNNING TEST A: EDIT EMPLOYEE LOGIN ID & PERSISTENCE <<<');

  // Step 1: Log in as admin
  console.log('Step 1: Logging in as Administrator (admin@innovix.com)...');
  const adminLogin = await api('/api/auth/login', 'POST', {
    workspaceId: 'INX-48291',
    email: 'admin@innovix.com',
    password: 'demo123',
    roleExpected: 'ADMIN'
  });
  if (adminLogin.status !== 200 || !adminLogin.data.token) {
    throw new Error('Admin login failed: ' + JSON.stringify(adminLogin.data));
  }
  const adminToken = adminLogin.data.token;
  console.log('  -> Admin authenticated. Token received.');

  // Step 2: Open employee management (Fetch employees)
  console.log('Step 2: Fetching employee list from management console...');
  const empList = await api('/api/employees', 'GET', null, adminToken);
  if (empList.status !== 200) {
    throw new Error('Failed to fetch employee list: ' + JSON.stringify(empList.data));
  }
  console.log(`  -> Fetched ${empList.data.employees.length} employees.`);
  
  // Pick an active employee to edit (e.g. user_marcus or user_olivia)
  const targetEmployee = empList.data.employees.find(e => e.status === 'Active' && e.role !== 'ADMIN') || empList.data.employees[0];
  console.log(`  -> Selected employee for test: ${targetEmployee.name} (Current ID: ${targetEmployee.employeeId})`);

  // Step 3: Edit employee login ID & details
  const updatedLoginId = `EMP-INX-${Date.now().toString().slice(-5)}`;
  console.log(`Step 3: Editing login ID to: '${updatedLoginId}'...`);
  const updateRes = await api(`/api/employees/${targetEmployee.id}`, 'PUT', {
    employeeId: updatedLoginId,
    designation: 'Principal Staff Engineer',
    department: 'Engineering'
  }, adminToken);

  if (updateRes.status !== 200 || !updateRes.data.success) {
    throw new Error('Failed to update employee: ' + JSON.stringify(updateRes.data));
  }
  console.log(`  -> Server confirmed update. New employeeId: ${updateRes.data.employee.employeeId}`);

  // Step 4 & 5: Save changes & Refresh (Query again from database)
  console.log('Step 4 & 5: Refreshing and re-querying database...');
  const verifyList = await api('/api/employees', 'GET', null, adminToken);
  const reloadedEmployee = verifyList.data.employees.find(e => e.id === targetEmployee.id);

  // Step 6: Verify new ID remains saved
  console.log(`Step 6: Verifying persisted login ID in database...`);
  if (reloadedEmployee.employeeId !== updatedLoginId) {
    throw new Error(`Persistence failure: expected ${updatedLoginId}, got ${reloadedEmployee.employeeId}`);
  }
  console.log(`  -> Verified in database: ${reloadedEmployee.employeeId} === ${updatedLoginId}`);
  console.log('✅ TEST A RESULT: SUCCESS! Employee Login ID successfully edited and persisted across queries.\n');

  // ==========================================
  // TEST B: Register New Employee & Admin Approval
  // ==========================================
  console.log('>>> RUNNING TEST B: EMPLOYEE REGISTRATION & ADMIN APPROVAL <<<');

  const randomStamp = Date.now().toString().slice(-4);
  const newEmpEmail = `candidate.${randomStamp}@innovix.com`;
  const newEmpPass = 'SecureHire#2026';
  const newEmpName = `Elena Rostova ${randomStamp}`;

  // Step 1: Register a new employee
  console.log(`Step 1: Registering new employee: ${newEmpName} (${newEmpEmail})...`);
  const registerRes = await api('/api/auth/employee-register', 'POST', {
    workspaceId: 'INX-48291',
    name: newEmpName,
    email: newEmpEmail,
    password: newEmpPass,
    designation: 'Senior Cloud Architect',
    department: 'Engineering'
  });

  if (registerRes.status !== 201 || !registerRes.data.success) {
    throw new Error('Employee registration failed: ' + JSON.stringify(registerRes.data));
  }
  const newEmpId = registerRes.data.employee.id;
  const initialEmpCode = registerRes.data.employee.employeeId;
  console.log(`  -> Registration created account ${newEmpId} with status: '${registerRes.data.employee.status}' and ID: '${initialEmpCode}'`);

  // Verify that pending employee cannot log in yet
  console.log('  -> Verifying pending employee cannot log in yet...');
  const prematureLogin = await api('/api/auth/login', 'POST', {
    workspaceId: 'INX-48291',
    email: newEmpEmail,
    password: newEmpPass
  });
  if (prematureLogin.status !== 403) {
    throw new Error(`Security breach: Pending employee was allowed to log in! Status: ${prematureLogin.status}`);
  }
  console.log(`  -> Correctly blocked with HTTP 403: "${prematureLogin.data.error}"`);

  // Step 2 & 3: Log in as admin & Find pending employee
  console.log('Step 2 & 3: Admin checking employee list for Pending registration...');
  const pendingCheck = await api('/api/employees', 'GET', null, adminToken);
  const foundPending = pendingCheck.data.employees.find(e => e.id === newEmpId);
  if (!foundPending || foundPending.status !== 'Pending') {
    throw new Error('Pending employee not found with status Pending in admin dashboard list!');
  }
  console.log(`  -> Found in admin list: ${foundPending.name} | Status: ${foundPending.status}`);

  // Step 4: Admin approves the employee
  console.log(`Step 4: Administrator approving employee ${newEmpId}...`);
  const approveRes = await api(`/api/employees/${newEmpId}/approve`, 'POST', null, adminToken);
  if (approveRes.status !== 200 || !approveRes.data.success) {
    throw new Error('Approval API call failed: ' + JSON.stringify(approveRes.data));
  }
  console.log(`  -> Approved: "${approveRes.data.message}"`);

  // Step 5: Verify the database status changed to Active
  console.log('Step 5: Verifying database status changed to Active...');
  const postApproveList = await api('/api/employees', 'GET', null, adminToken);
  const approvedEmp = postApproveList.data.employees.find(e => e.id === newEmpId);
  if (approvedEmp.status !== 'Active') {
    throw new Error(`Database status mismatch: expected Active, got ${approvedEmp.status}`);
  }
  console.log(`  -> Confirmed in database: status is now '${approvedEmp.status}'`);

  // Step 6: Log in using the approved employee's credentials
  console.log('Step 6: Logging in using approved employee credentials...');
  // A) Login with Email
  const empLoginEmail = await api('/api/auth/login', 'POST', {
    workspaceId: 'INX-48291',
    email: newEmpEmail,
    password: newEmpPass
  });
  if (empLoginEmail.status !== 200 || !empLoginEmail.data.token) {
    throw new Error('Approved employee login with email failed: ' + JSON.stringify(empLoginEmail.data));
  }
  console.log(`  -> A) Login with Email (${newEmpEmail}) SUCCESSFUL! Token: ${empLoginEmail.data.token.slice(0, 20)}...`);

  // B) Login with Employee ID (Login ID)
  const empLoginId = await api('/api/auth/login', 'POST', {
    workspaceId: 'INX-48291',
    email: initialEmpCode, // Passing Employee Login ID into login field
    password: newEmpPass
  });
  if (empLoginId.status !== 200 || !empLoginId.data.token) {
    throw new Error('Approved employee login with Employee ID failed: ' + JSON.stringify(empLoginId.data));
  }
  console.log(`  -> B) Login with Employee Login ID (${initialEmpCode}) SUCCESSFUL!`);
  console.log('✅ TEST B RESULT: SUCCESS! Employee registration creates pending account, admin approves, status becomes Active, and employee logs in with credentials.\n');

  console.log('====================================================');
  console.log('🎉 ALL TESTS PASSED WITH 100% SUCCESS!');
  console.log('====================================================');
}

runOfficialTests().catch(err => {
  console.error('❌ Test failed with error:', err);
  process.exit(1);
});
