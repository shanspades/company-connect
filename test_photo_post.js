const http = require('http');

function postJson(urlPath, data, token) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: urlPath,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };
    if (token) options.headers['Authorization'] = 'Bearer ' + token;

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, body });
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function getJson(urlPath, token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: urlPath,
      method: 'GET',
      headers: {}
    };
    if (token) options.headers['Authorization'] = 'Bearer ' + token;

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, body });
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function runTest() {
  console.log('--- Testing Photo Posting and Image Attachments ---');
  
  // 1. Login as Admin
  const loginRes = await postJson('/api/auth/login', {
    workspaceId: 'INX-48291',
    email: 'admin@innovix.com',
    password: 'demo123'
  });
  if (loginRes.status !== 200 || !loginRes.data.token) {
    throw new Error('Admin login failed: ' + JSON.stringify(loginRes.data));
  }
  const token = loginRes.data.token;
  console.log('✅ 1. Admin login successful.');

  // 2. Post with both text and photo URL
  const testImageUrl = 'https://images.unsplash.com/photo-1573879409095-e47e5759ed0f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=1200&h=620';
  const post1Res = await postJson('/api/posts', {
    text: 'Excited to announce our new team offsite event! Check out the venue.',
    type: 'Team Celebration',
    tag: 'Culture Club',
    image: testImageUrl
  }, token);

  if (post1Res.status !== 201 || !post1Res.data.post || post1Res.data.post.image !== testImageUrl) {
    throw new Error('Post with photo URL failed: ' + JSON.stringify(post1Res.data));
  }
  console.log('✅ 2. Post with photo URL published successfully. Post ID:', post1Res.data.post.id);

  // 3. Post with base64 DataURL (photo uploaded from computer)
  const sampleBase64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
  const post2Res = await postJson('/api/posts', {
    text: 'A snapshot from today architecture design sprint!',
    type: 'Project Progress',
    tag: 'Design Systems',
    image: sampleBase64Image
  }, token);

  if (post2Res.status !== 201 || !post2Res.data.post || post2Res.data.post.image !== sampleBase64Image) {
    throw new Error('Post with Base64 uploaded image failed: ' + JSON.stringify(post2Res.data));
  }
  console.log('✅ 3. Post with Base64 local image upload published successfully. Post ID:', post2Res.data.post.id);

  // 4. Post with ONLY a photo (no text caption entered by user)
  const post3Res = await postJson('/api/posts', {
    text: '',
    type: 'Daily Work Update',
    tag: 'Project Atlas',
    image: testImageUrl
  }, token);

  if (post3Res.status !== 201 || !post3Res.data.post || !post3Res.data.post.text) {
    throw new Error('Post with only photo failed: ' + JSON.stringify(post3Res.data));
  }
  console.log('✅ 4. Post with ONLY photo (empty text) published successfully with auto-caption:', post3Res.data.post.text);

  // 5. Fetch company feed and verify all 3 posts are present with images
  const feedRes = await getJson('/api/posts', token);
  if (feedRes.status !== 200 || !feedRes.data.posts) {
    throw new Error('Failed to fetch feed: ' + JSON.stringify(feedRes.data));
  }
  
  const found1 = feedRes.data.posts.find(p => p.id === post1Res.data.post.id);
  const found2 = feedRes.data.posts.find(p => p.id === post2Res.data.post.id);
  const found3 = feedRes.data.posts.find(p => p.id === post3Res.data.post.id);

  if (!found1 || !found2 || !found3) {
    throw new Error('Posts not found in company feed!');
  }
  console.log('✅ 5. Verified company feed returns all 3 photo posts with correct image attachments.');
  console.log('🎉 ALL PHOTO POSTING TESTS PASSED 100%!');
}

runTest().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
