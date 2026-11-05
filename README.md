# COMPANY CONNECT — Full-Stack Private Enterprise Social Network

A modern, highly polished internal social media and employee collaboration platform built for enterprise companies, featuring a complete persistent backend with multi-tenant company isolation, SQLite database, and cryptographic authentication.

Combines:
- **LinkedIn + Facebook**: Professional corporate identity, directory, team structure, and workplace atmosphere.
- **Instagram**: Rich social feed layout, photo attachments, appreciations, kudos badges, and expandable comment threads.
- **Duolingo**: Catchy, friendly onboarding, interactive workspace setup, and celebration states.
- **Apple**: Elegant minimalism, glassmorphism, responsive spring transitions, and refined micro-interactions.

---

## ⚡ Instant Quick Start

The backend and frontend are unified into a single full-stack Node.js Express server running persistent SQLite:

```powershell
cd "C:\Users\shanv\.gemini\antigravity\scratch\company-connect"
node server.js
```
*Or double-click `start.bat`.*

Then open your browser at:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🔑 Demo Accounts & Multi-Tenant Credentials

### Primary Tenant: Innovix Technologies (`INX-48291`)
| Role | Email | Password | Workspace ID | Permissions |
|---|---|---|---|---|
| **Company Administrator** | `admin@innovix.com` | `demo123` | `INX-48291` | Full admin management, employee CRUD, announcements |
| **Employee** | `employee@innovix.com` | `demo123` | `INX-48291` | Social feed, posts, comments, likes, kudos, directory |

### Secondary Tenant (Strict Isolation Test): Nexus Dynamics (`NEX-78901`)
| Role | Email | Password | Workspace ID | Note |
|---|---|---|---|---|
| **Company Administrator** | `admin@nexus.com` | `demo123` | `NEX-78901` | Completely isolated workspace; cannot view or modify Innovix data |

> 💡 **Tip:** The login screen includes a **1-Click Demo Credentials** button to instantly prefill credentials!

---

## 🏗️ Backend Technology & Architecture

| Component | Technology | Description |
|---|---|---|
| **Web Server** | **Express.js 4.x** (Node.js) | High-performance REST API routing with CORS and static file serving |
| **Database** | **SQLite 3** (`better-sqlite3`) | Persistent relational database stored locally at `data/company_connect.db` |
| **Password Security** | **Scrypt + Random Salt** (`node:crypto`) | Cryptographic password hashing (`salt:derivedKey`) with timing-safe validation |
| **Authentication** | **HMAC-SHA256 JWT** | Stateless signed bearer tokens with 7-day expiration |
| **Multi-Tenancy** | **Row-Level Tenant Isolation** | Every database query filters by `company_id`; cross-tenant access returns 404/403 |
| **Duplicate Prevention** | **SQL UNIQUE Constraints** | `UNIQUE(post_id, user_id)` guarantees likes cannot be duplicated |

---

## 🗄️ Database Schema & Data Models

Database file location: `data/company_connect.db`

1. **`companies`**: `id` (PK), `workspace_id` (UNIQUE), `name`, `industry`, `company_size`, `email`, `website`, `created_at`
2. **`users`**: `id` (PK), `company_id` (FK), `employee_id`, `name`, `email`, `password_hash`, `role` (`ADMIN` \| `EMPLOYEE`), `designation`, `department`, `initials`, `tone`, `status`, `created_at`
   - Constraints: `UNIQUE(company_id, email)`, `UNIQUE(company_id, employee_id)`
3. **`posts`**: `id` (PK), `company_id` (FK), `author_id` (FK), `type`, `tag`, `text`, `image`, `created_at`
4. **`likes`**: `id` (PK), `company_id`, `post_id` (FK), `user_id` (FK), `created_at`
   - Constraints: `UNIQUE(post_id, user_id)`
5. **`comments`**: `id` (PK), `company_id`, `post_id` (FK), `user_id` (FK), `text`, `created_at`
6. **`kudos`**: `id` (PK), `company_id`, `post_id` (FK), `sender_id` (FK), `kudos_type`, `created_at`
7. **`announcements`**: `id` (PK), `company_id` (FK), `author_id` (FK), `title`, `content`, `priority`, `created_at`

---

## 📡 REST API Reference

### Authentication
- `POST /api/auth/register` — Register company, generate unique workspace ID (e.g. `STA-39670`), create admin account
- `POST /api/auth/login` — Sign in with `{ workspaceId, email, password }`, returns JWT token
- `GET /api/auth/me` — Retrieve active user session and company workspace info

### Company Feed & Posts
- `GET /api/posts` — Fetch company social feed (scoped to authenticated user's company)
- `POST /api/posts` — Create a new post in the company feed
- `DELETE /api/posts/:id` — Delete post (author or admin only)

### Social Interactions
- `POST /api/posts/:id/like` — Toggle like/unlike (enforces company check & prevents duplicates)
- `GET /api/posts/:id/comments` — Fetch post comments thread
- `POST /api/posts/:id/comments` — Post a new comment
- `POST /api/posts/:id/kudos` — Award peer recognition kudos (Innovation, High Velocity, Team Player, Problem Solver)

### People Operations & Employee Directory
- `GET /api/employees` — List all company employees (scoped to tenant)
- `POST /api/employees` — Create new employee account (Admin only, returns generated credentials)
- `PUT /api/employees/:id` — Update employee role or details (Admin only)
- `DELETE /api/employees/:id` — Deactivate / delete employee (Admin only)

### Announcements
- `GET /api/announcements` — Retrieve company announcements
- `POST /api/announcements` — Broadcast new announcement (Admin only)

---

## 🔒 Multi-Tenant Security & Isolation Verification

Strict multi-tenant boundaries are enforced on the backend:
- Users belonging to Company A (`Innovix`) cannot view, like, comment, or delete posts from Company B (`Nexus Dynamics`).
- Querying posts, comments, or directory tables always binds `WHERE company_id = req.user.companyId`.
- Employees attempting to perform administrative actions (e.g. creating employees, publishing announcements) receive `403 Forbidden`.
- Data persists across server restarts in `data/company_connect.db`.

---

## 🧪 Automated Testing

Comprehensive test suites verify both API security and browser interactions:

```powershell
# Run backend API, RBAC, and multi-tenant isolation tests (27 assertions):
node C:\Users\shanv\.gemini\antigravity\scratch\test_backend_apis.js

# Verify SQLite database persistence across process restart:
node C:\Users\shanv\.gemini\antigravity\scratch\test_persistence.js
```
