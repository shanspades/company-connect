const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const { db } = require('./db');
const { getUserById, getCompanyById } = require('./supabaseClient');

// Ensure unique, cryptographically random secret key per installation
function getSecretKey() {
  if (process.env.JWT_SECRET && process.env.JWT_SECRET.trim().length >= 16) {
    return process.env.JWT_SECRET.trim();
  }
  const secretPath = path.join(__dirname, '../../data/.jwt_secret');
  try {
    if (fs.existsSync(secretPath)) {
      const secret = fs.readFileSync(secretPath, 'utf8').trim();
      if (secret.length >= 32) return secret;
    }
    const newSecret = crypto.randomBytes(64).toString('hex');
    fs.writeFileSync(secretPath, newSecret, { mode: 0o600 });
    return newSecret;
  } catch (err) {
    return 'fallback_sec_' + crypto.randomBytes(32).toString('hex');
  }
}

const JWT_SECRET = getSecretKey();

function generateToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  // 7 days expiration with explicit tokenVersion tracking
  const body = Buffer.from(JSON.stringify({
    ...payload,
    tokenVersion: payload.tokenVersion || 1,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000
  })).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  return `${header}.${body}.${signature}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url');
  
  // Timing-safe constant-time comparison to prevent timing attacks
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch (e) {
    return null;
  }
}

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    // Secure header parsing (query string token transmission removed to prevent log leakage)
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : (req.headers['x-access-token'] || '');

    if (!token) {
      return res.status(401).json({ error: 'Authentication token missing. Please sign in.' });
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId || !decoded.companyId) {
      return res.status(401).json({ error: 'Invalid or expired session. Please sign in again.' });
    }

    // Try Supabase first, fallback to SQLite if offline
    let user = null;
    let company = null;
    try {
      user = await getUserById(decoded.userId, decoded.companyId);
      if (user) {
        company = await getCompanyById(decoded.companyId);
      }
    } catch (e) {
      user = null;
    }

    if (!user) {
      // Fetch live user and company from SQLite fallback
      const local = db.prepare(`
        SELECT u.id, u.company_id, u.employee_id, u.name, u.email, u.role, u.designation, u.department, u.initials, u.tone, u.status, u.token_version,
               c.workspace_id, c.name as company_name
        FROM users u
        JOIN companies c ON u.company_id = c.id
        WHERE u.id = ? AND u.company_id = ?
      `).get(decoded.userId, decoded.companyId);

      if (local) {
        user = local;
        company = {
          id: local.company_id,
          workspace_id: local.workspace_id,
          name: local.company_name
        };
      }
    }

    if (!user) {
      return res.status(401).json({ error: 'User account or company not found.' });
    }

    if (user.status !== 'Active') {
      return res.status(403).json({ error: 'User account has been deactivated.' });
    }

    // Server-side token version verification (instant revocation on logout/password change)
    if (decoded.tokenVersion && decoded.tokenVersion !== (user.token_version || 1)) {
      return res.status(401).json({ error: 'Session has been invalidated. Please sign in again.' });
    }

    req.user = {
      id: user.id,
      companyId: user.company_id,
      employeeId: user.employee_id,
      name: user.name,
      email: user.email,
      role: user.role,
      designation: user.designation,
      department: user.department,
      initials: user.initials,
      tone: user.tone,
      status: user.status,
      tokenVersion: user.token_version || 1
    };

    req.company = company ? {
      id: company.id,
      workspaceId: company.workspace_id,
      name: company.name
    } : {
      id: user.company_id,
      workspaceId: user.workspace_id,
      name: user.company_name
    };

    next();
  } catch (err) {
    console.error('authMiddleware error:', err);
    res.status(500).json({ error: 'Authentication middleware error: ' + err.message });
  }
}

function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Access denied. Administrator privileges required.' });
  }
  next();
}

module.exports = {
  generateToken,
  verifyToken,
  authMiddleware,
  adminMiddleware
};
