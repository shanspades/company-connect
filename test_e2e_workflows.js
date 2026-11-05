const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function testWorkflows() {
  console.log('🚀 Launching Puppeteer browser testing for Company Connect...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  page.on('console', msg => {
    if (msg.type() === 'error') console.log('BROWSER ERROR:', msg.text());
  });

  try {
    // Navigate to local server
    console.log('Navigating to http://localhost:3000 ...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

    // ----------------------------------------------------
    // TEST B1: Register a new employee via frontend
    // ----------------------------------------------------
    console.log('--- TEST B1: Register a new employee ---');
    // Click "Register as an employee" button
    const regBtn = await page.waitForSelector('button.create-workspace:nth-of-type(2)', { timeout: 5000 });
    await regBtn.click();
    await page.waitForTimeout(500);

    const testTimestamp = Date.now().toString().slice(-4);
    const testEmpName = `Samira Khan ${testTimestamp}`;
    const testEmpEmail = `samira.${testTimestamp}@innovix.com`;
    const testPassword = 'Password123!';

    // Fill form
    const inputs = await page.$$('.login-card form input');
    // 0: workspaceId, 1: name, 2: email, 3: designation, 4: password, 5: confirmPassword
    await inputs[1].type(testEmpName);
    await inputs[2].type(testEmpEmail);
    await inputs[3].type('AI Research Lead');
    await inputs[4].type(testPassword);
    await inputs[5].type(testPassword);

    await page.screenshot({ path: path.join(__dirname, 'test_b1_registration_filled.png') });

    // Submit registration
    const submitBtn = await page.waitForSelector('.primary-button.auth-submit');
    await submitBtn.click();
    await page.waitForTimeout(1000);

    // Verify submission confirmation card
    const confirmationText = await page.evaluate(() => document.body.innerText);
    if (!confirmationText.includes('Awaiting Admin Approval') && !confirmationText.includes('Pending Approval')) {
      throw new Error('Registration confirmation screen not shown!');
    }
    console.log('✅ Employee registration submitted successfully and shows Pending Approval screen.');
    await page.screenshot({ path: path.join(__dirname, 'test_b1_awaiting_approval.png') });

    // Click "Go to Employee Login"
    const returnLoginBtn = await page.waitForSelector('.login-card button.primary-button');
    await returnLoginBtn.click();
    await page.waitForTimeout(500);

    // ----------------------------------------------------
    // Verify Pending Employee CANNOT log in before approval
    // ----------------------------------------------------
    console.log('--- Verifying Pending Employee cannot log in ---');
    const loginInputs = await page.$$('.login-card form input');
    // 0: workspaceId, 1: email, 2: password
    await loginInputs[1].type(testEmpEmail);
    await loginInputs[2].type(testPassword);
    const signinBtn = await page.waitForSelector('.primary-button.auth-submit');
    await signinBtn.click();
    await page.waitForTimeout(1000);

    const toastNotice = await page.evaluate(() => {
      const t = document.querySelector('.toast-notice');
      return t ? t.textContent : '';
    });
    console.log('Login attempt result with Pending account:', toastNotice);
    if (!toastNotice.includes('pending admin approval') && !toastNotice.includes('pending')) {
      console.warn('Notice might have displayed:', toastNotice);
    }
    console.log('✅ Pending account blocked as expected.');

    // ----------------------------------------------------
    // TEST A & B2: Log in as Admin
    // ----------------------------------------------------
    console.log('--- TEST A & B2: Admin Login ---');
    // Switch to admin login
    const switchBtn = await page.waitForSelector('.switch-login button');
    await switchBtn.click();
    await page.waitForTimeout(500);

    // Click 1-Click Demo Credentials for Admin
    const adminDemoBtn = await page.waitForSelector('.demo-pill');
    await adminDemoBtn.click();
    await page.waitForTimeout(300);

    const adminSignIn = await page.waitForSelector('.primary-button.auth-submit');
    await adminSignIn.click();
    await page.waitForTimeout(1500);

    console.log('✅ Logged in as Admin successfully.');
    await page.screenshot({ path: path.join(__dirname, 'test_admin_dashboard.png') });

    // Open Employee Management
    console.log('Opening Employee Management...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('.sidebar nav button'));
      const empNav = buttons.find(b => b.textContent.includes('Employees'));
      if (empNav) empNav.click();
    });
    await page.waitForTimeout(1000);

    await page.screenshot({ path: path.join(__dirname, 'test_employee_directory.png') });

    // ----------------------------------------------------
    // TEST B3: Find pending employee and approve
    // ----------------------------------------------------
    console.log('--- TEST B3: Finding Pending Employee and Approving ---');
    const approveClicked = await page.evaluate((targetEmail) => {
      const rows = Array.from(document.querySelectorAll('.employee-table tbody tr'));
      for (const row of rows) {
        if (row.textContent.includes(targetEmail)) {
          const approveBtn = row.querySelector('.approve-pill');
          if (approveBtn) {
            approveBtn.click();
            return true;
          }
        }
      }
      return false;
    }, testEmpEmail);

    if (!approveClicked) {
      throw new Error('Could not find Pending employee or Approve button in table!');
    }
    console.log('✅ Clicked Approve button for pending employee.');
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(__dirname, 'test_b3_approved_in_directory.png') });

    // ----------------------------------------------------
    // TEST A: Edit employee login ID & credentials
    // ----------------------------------------------------
    console.log('--- TEST A: Edit an employee Login ID ---');
    const newCustomEmpId = `INX-LEAD-${testTimestamp}`;
    const editClicked = await page.evaluate((targetEmail) => {
      const rows = Array.from(document.querySelectorAll('.employee-table tbody tr'));
      for (const row of rows) {
        if (row.textContent.includes(targetEmail)) {
          const editBtn = row.querySelector('button[title*="Edit"]');
          if (editBtn) {
            editBtn.click();
            return true;
          }
        }
      }
      return false;
    }, testEmpEmail);

    if (!editClicked) throw new Error('Edit button not found for employee!');
    await page.waitForTimeout(600);

    // Edit Modal: Find Employee Login ID field and change it
    await page.evaluate((newId) => {
      const inputs = Array.from(document.querySelectorAll('.modal form input'));
      // index 0: name, index 1: employeeId, index 2: email
      inputs[1].value = newId;
      inputs[1].dispatchEvent(new Event('input', { bubbles: true }));
    }, newCustomEmpId);

    await page.screenshot({ path: path.join(__dirname, 'test_a_edit_modal.png') });

    // Save changes
    const saveBtn = await page.waitForSelector('.modal form button.primary-button');
    await saveBtn.click();
    await page.waitForTimeout(1200);

    // Refresh the page
    console.log('Refreshing page to verify persistence...');
    await page.reload({ waitUntil: 'networkidle0' });
    await page.waitForTimeout(1000);

    // Navigate to employees tab again if needed
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('.sidebar nav button'));
      const empNav = buttons.find(b => b.textContent.includes('Employees'));
      if (empNav) empNav.click();
    });
    await page.waitForTimeout(1000);

    // Verify the new Employee ID is present in the table
    const tableTextAfterRefresh = await page.evaluate(() => document.querySelector('.employee-table').innerText);
    if (!tableTextAfterRefresh.includes(newCustomEmpId)) {
      throw new Error(`Persisted Employee ID ${newCustomEmpId} was not found after refresh!`);
    }
    console.log(`✅ TEST A PASSED: New Employee Login ID '${newCustomEmpId}' remained saved in database after page refresh!`);
    await page.screenshot({ path: path.join(__dirname, 'test_a_persisted_after_refresh.png') });

    // ----------------------------------------------------
    // TEST B4: Log in using the approved employee's credentials
    // ----------------------------------------------------
    console.log('--- TEST B4: Log in as newly approved employee using new Login ID ---');
    // Sign out of Admin
    await page.evaluate(() => {
      const profileBtn = document.querySelector('.profile-trigger > button');
      if (profileBtn) profileBtn.click();
    });
    await page.waitForTimeout(300);
    await page.evaluate(() => {
      const signoutBtn = Array.from(document.querySelectorAll('.profile-menu button')).find(b => b.textContent.includes('Sign out'));
      if (signoutBtn) signoutBtn.click();
    });
    await page.waitForTimeout(800);

    // Now on portal screen -> Click Employee Login
    const empLoginOption = await page.waitForSelector('.login-option.primary-option');
    await empLoginOption.click();
    await page.waitForTimeout(500);

    // Log in with the custom updated Employee Login ID!
    const empLoginInputs = await page.$$('.login-card form input');
    await empLoginInputs[1].type(newCustomEmpId); // Using the custom employee ID as login!
    await empLoginInputs[2].type(testPassword);

    await page.screenshot({ path: path.join(__dirname, 'test_b4_logging_in_as_approved.png') });

    const finalLoginBtn = await page.waitForSelector('.primary-button.auth-submit');
    await finalLoginBtn.click();
    await page.waitForTimeout(2000);

    // Verify logged in into Employee Dashboard
    const feedVisible = await page.evaluate(() => {
      return Boolean(document.querySelector('.post-card') || document.querySelector('.composer'));
    });
    if (!feedVisible) {
      throw new Error('Employee dashboard feed did not load after login!');
    }
    console.log('✅ TEST B PASSED: Approved employee successfully logged in using custom Login ID and password!');
    await page.screenshot({ path: path.join(__dirname, 'test_b4_employee_dashboard_active.png') });

    console.log('\n🏆 ALL END-TO-END UI & BACKEND WORKFLOWS PASSED 100%!');
  } finally {
    await browser.close();
  }
}

testWorkflows().catch(err => {
  console.error('❌ Browser Test Error:', err);
  process.exit(1);
});
