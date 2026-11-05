const {
  isSupabaseConnected,
  getCompanyByWorkspace,
  getUserByLogin,
  getEmployees,
  getPosts,
  getAnnouncements,
  getAuditLogs
} = require('./src/backend/supabaseClient');

async function testSupabaseClient() {
  console.log('Testing supabaseClient.js against remote Supabase...');
  const connected = await isSupabaseConnected();
  console.log('1. Supabase Connected:', connected);
  if (!connected) throw new Error('Supabase not connected');

  const comp = await getCompanyByWorkspace('INX-48291');
  console.log('2. Retrieved Company:', comp.name, `(${comp.workspace_id})`);

  const admin = await getUserByLogin(comp.id, 'admin@innovix.com');
  console.log('3. Retrieved User by Email:', admin.name, `(${admin.role})`);

  const emp = await getUserByLogin(comp.id, 'EMP-1024');
  console.log('4. Retrieved User by Employee ID:', emp.name, `(${emp.employee_id})`);

  const { employees, total: empTotal } = await getEmployees(comp.id, 5, 0);
  console.log('5. Retrieved Employees:', employees.length, 'Total:', empTotal);

  const { posts, total: postTotal } = await getPosts(comp.id, admin.id, 5, 0);
  console.log('6. Retrieved Posts:', posts.length, 'Total:', postTotal);
  if (posts.length > 0) {
    console.log('   Sample Post Author:', posts[0].person.name, 'Likes:', posts[0].likes, 'Liked by admin:', posts[0].liked);
  }

  const announcements = await getAnnouncements(comp.id);
  console.log('7. Retrieved Announcements:', announcements.length);

  const { logs, total: logTotal } = await getAuditLogs(comp.id, 5, 0);
  console.log('8. Retrieved Audit Logs:', logs.length, 'Total:', logTotal);

  console.log('\n🎉 ALL SUPABASE CLIENT TESTS PASSED WITH 100% SUCCESS!');
}

testSupabaseClient().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
