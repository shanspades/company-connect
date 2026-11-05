import { useState, useEffect, useRef, type ReactNode } from 'react'

type IconName =
  | 'home' | 'users' | 'building' | 'award' | 'megaphone' | 'folder' | 'user'
  | 'settings' | 'search' | 'bell' | 'chevron' | 'plus' | 'image' | 'heart'
  | 'comment' | 'share' | 'more' | 'spark' | 'calendar' | 'briefcase' | 'chart'
  | 'shield' | 'check' | 'copy' | 'mail' | 'lock' | 'arrow' | 'menu' | 'x'
  | 'edit' | 'trash' | 'filter' | 'help' | 'logout' | 'external' | 'clock' | 'eye' | 'eye-off'

const paths: Record<IconName, ReactNode> = {
  home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  building: <><path d="M3 21h18M6 21V4h12v17M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/></>,
  award: <><circle cx="12" cy="8" r="5"/><path d="M8.5 12 7 22l5-3 5 3-1.5-10"/></>,
  megaphone: <><path d="m3 11 18-5v12L3 14v-3Z"/><path d="m11.6 16 1.4 5H8l-1.5-6"/></>,
  folder: <path d="M3 6h7l2 2h9v11H3V6Z"/>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.1A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.1A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.1A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.36.28.58.68.6 1.1v.1h1v4h-.1a1.7 1.7 0 0 0-1.5.8Z"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
  chevron: <path d="m8 10 4 4 4-4"/>,
  plus: <path d="M12 5v14M5 12h14"/>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 20"/></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/>,
  comment: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/>,
  share: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"/></>,
  more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
  spark: <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3ZM19 17l.7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z"/>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3M3 12h18"/></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  copy: <><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
  arrow: <path d="m5 12 14 0M13 6l6 6-6 6"/>,
  menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
  x: <path d="m6 6 12 12M18 6 6 18"/>,
  edit: <><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/></>,
  trash: <><path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v5M14 11v5"/></>,
  filter: <path d="M4 5h16l-6 7v6l-4 2v-8Z"/>,
  help: <><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.2 2c-1.3 1.3-2.3 1.6-2.3 3M12 18h.01"/></>,
  logout: <><path d="M10 17l5-5-5-5M15 12H3"/><path d="M14 3h7v18h-7"/></>,
  external: <><path d="M14 3h7v7M10 14 21 3"/><path d="M21 14v6H4V3h6"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  eye: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></>,
  'eye-off': <><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 20"/></>,
}

function Icon({ name, size = 18, fill = 'none' }: { name: IconName; size?: number; fill?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

interface Person {
  id?: string
  employeeId?: string
  name: string
  initials: string
  role: string
  dept: string
  tone: string
  email?: string
  status?: string
}

const initialPeople: Person[] = [
  { id: 'user_olivia', employeeId: 'EMP-1024', name: 'Olivia Martin', initials: 'OM', role: 'Senior Product Designer', dept: 'Product Design', tone: 'violet', email: 'employee@innovix.com', status: 'Active' },
  { id: 'user_marcus', employeeId: 'EMP-1025', name: 'Marcus Chen', initials: 'MC', role: 'Engineering Lead', dept: 'Engineering', tone: 'blue', email: 'marcus@innovix.com', status: 'Active' },
  { id: 'user_priya', employeeId: 'EMP-1026', name: 'Priya Nair', initials: 'PN', role: 'People Operations', dept: 'People & Culture', tone: 'coral', email: 'priya@innovix.com', status: 'Active' },
  { id: 'user_daniel', employeeId: 'EMP-1027', name: 'Daniel Kim', initials: 'DK', role: 'Product Manager', dept: 'Infrastructure', tone: 'green', email: 'daniel@innovix.com', status: 'Active' },
  { id: 'user_sophia', employeeId: 'EMP-1028', name: 'Sophia Patel', initials: 'SP', role: 'Senior Product Manager', dept: 'Product Management', tone: 'amber', email: 'sophia@innovix.com', status: 'Active' },
  { id: 'user_james', employeeId: 'EMP-1029', name: 'James Wilson', initials: 'JW', role: 'Frontend Platform Engineer', dept: 'Engineering', tone: 'violet', email: 'james@innovix.com', status: 'Active' },
]

function Avatar({ person = initialPeople[0], size = 'md' }: { person?: Person; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  return <span className={`avatar avatar-${size} avatar-${person.tone || 'violet'}`}>{person.initials}</span>
}

function Logo({ light = false }: { light?: boolean }) {
  return <div className={`brand ${light ? 'brand-light' : ''}`}><span className="brand-mark"><i/><i/><i/></span><span>Company <b>Connect</b></span></div>
}

type Screen = 'home' | 'employees' | 'roles' | 'announcements' | 'profile' | 'admin' | 'projects' | 'departments' | 'achievements' | 'settings'
type AuthScreen = 'portal' | 'employee-login' | 'admin-login' | 'register' | 'workspace' | 'employee-register' | null

const employeeNav: { label: string; icon: IconName; screen: Screen }[] = [
  { label: 'Home', icon: 'home', screen: 'home' },
  { label: 'Company Feed', icon: 'spark', screen: 'home' },
  { label: 'Employees', icon: 'users', screen: 'employees' },
  { label: 'Departments', icon: 'building', screen: 'departments' },
  { label: 'Projects', icon: 'folder', screen: 'projects' },
  { label: 'Announcements', icon: 'megaphone', screen: 'announcements' },
  { label: 'Achievements', icon: 'award', screen: 'achievements' },
  { label: 'Profile', icon: 'user', screen: 'profile' },
  { label: 'Settings', icon: 'settings', screen: 'settings' },
]

const adminNav: { label: string; icon: IconName; screen: Screen }[] = [
  { label: 'Overview', icon: 'chart', screen: 'admin' },
  { label: 'Employees', icon: 'users', screen: 'employees' },
  { label: 'Roles & Permissions', icon: 'shield', screen: 'roles' },
  { label: 'Departments', icon: 'building', screen: 'departments' },
  { label: 'Company Posts', icon: 'folder', screen: 'home' },
  { label: 'Announcements', icon: 'megaphone', screen: 'announcements' },
  { label: 'Analytics', icon: 'spark', screen: 'admin' },
  { label: 'Workspace Settings', icon: 'settings', screen: 'settings' },
]

interface CommentItem {
  id: string
  author: string
  avatar: string
  time: string
  text: string
}

interface KudosItem {
  type: string
  from: string
}

interface PostData {
  id: string
  person: Person
  type: string
  time: string
  tag: string
  likes: number
  liked?: boolean
  kudos?: KudosItem[]
  comments: CommentItem[]
  text: string
  image?: string
}

const initialPostsData: PostData[] = [
  {
    id: 'post-1',
    person: initialPeople[1],
    type: 'PROJECT PROGRESS',
    time: '42 min ago',
    tag: 'Project Atlas',
    likes: 38,
    liked: false,
    kudos: [{ type: 'Innovation Catalyst', from: 'Olivia Martin' }],
    text: 'A big milestone for Atlas today! We have completed the new analytics architecture and cut dashboard query latencies by 62%. Huge thanks to the platform team for the thoughtful PR reviews.',
    image: 'https://images.unsplash.com/photo-1573879409095-e47e5759ed0f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=1200&h=620',
    comments: [
      { id: 'c1', author: 'Olivia Martin', avatar: 'OM', time: '28 min ago', text: 'Incredible performance leap Marcus! The chart interactions feel instantaneous now.' },
      { id: 'c2', author: 'Daniel Kim', avatar: 'DK', time: '14 min ago', text: 'Customers in the pilot are going to love this speed. Kudos team!' }
    ]
  },
  {
    id: 'post-2',
    person: initialPeople[4],
    type: 'TEAM CELEBRATION',
    time: '2 hr ago',
    tag: 'Growth Team',
    likes: 64,
    liked: false,
    kudos: [{ type: 'Team Player & Collaboration', from: 'Marcus Chen' }],
    text: 'The spring campaign is live! From the first creative workshop to multi-channel deployment, this was true cross-functional collaboration. Proud of what our team shipped together.',
    image: 'https://images.unsplash.com/photo-1573879403319-4412126a561b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=1200&h=620',
    comments: [
      { id: 'c3', author: 'Priya Nair', avatar: 'PN', time: '1 hr ago', text: 'The energy on this project was contagious! Beautifully executed.' }
    ]
  }
]


// ==========================================
// BACKEND API CLIENT
// ==========================================
const API_BASE = '/api';

async function apiCall(endpoint: string, method = 'GET', body?: any) {
  const token = localStorage.getItem('cc_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }
  const res = await fetch(API_BASE + endpoint, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });
  let data: any;
  try {
    data = await res.json();
  } catch (e) {
    data = {};
  }
  if (!res.ok) {
    throw new Error(data.error || 'Server error (' + res.status + ')');
  }
  return data;
}

export default function App() {
  const [auth, setAuth] = useState<AuthScreen>('portal')
  const [adminMode, setAdminMode] = useState(false)
  const [screen, setScreen] = useState<Screen>('home')
  const [mobileNav, setMobileNav] = useState(false)
  const [modal, setModal] = useState<string | null>(null)
  const [kudosPost, setKudosPost] = useState<PostData | null>(null)
  const [profileMenu, setProfileMenu] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [registeredWorkspace, setRegisteredWorkspace] = useState<any>(null)
  const [editingEmployee, setEditingEmployee] = useState<Person | null>(null)
  const [currentUser, setCurrentUser] = useState<any>({
    name: 'Olivia Martin',
    role: 'Lead Product Designer',
    dept: 'Product Design',
    initials: 'OM',
    tone: 'violet'
  })
  const [currentCompany, setCurrentCompany] = useState<any>({
    workspaceId: 'INX-48291',
    name: 'Innovix Technologies'
  })

  // Central Application Data States
  const [posts, setPosts] = useState<PostData[]>(initialPostsData)
  const [employees, setEmployees] = useState<Person[]>(initialPeople)
  const [announcements, setAnnouncements] = useState<any[]>([
    { id: 'a1', title: 'Q2 All-Hands Meeting & Global Strategy', author: 'Alicia Rodriguez · Executive Office', content: 'Join us for company updates, customer stories, and a live Q&A with the leadership team.', priority: 'COMPANY', date: 'May 26' },
    { id: 'a2', title: 'New Employee Wellness & Mental Health Benefit', author: 'Priya Nair · People & Culture', content: 'Your updated benefits now include a monthly fitness stipend and full Headspace premium membership.', priority: 'BENEFITS', date: 'May 20' },
  ])
  const [departments, setDepartments] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [achievements, setAchievements] = useState<any>(null)
  const [notifications, setNotifications] = useState<any[]>([])
  const [adminMetrics, setAdminMetrics] = useState<any>(null)
  const [rolesList, setRolesList] = useState<any[]>([])
  const [workspaceSettings, setWorkspaceSettings] = useState<any>(null)
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('All')

  // Fetch live backend data
  const refreshData = async () => {
    try {
      const [feedData, empData, annData, deptData, projData, achData, notifData, metricsData, rolesData, wsData] = await Promise.all([
        apiCall('/posts').catch(() => null),
        apiCall('/employees').catch(() => null),
        apiCall('/announcements').catch(() => null),
        apiCall('/departments').catch(() => null),
        apiCall('/projects').catch(() => null),
        apiCall('/achievements').catch(() => null),
        apiCall('/notifications').catch(() => null),
        apiCall('/admin/metrics').catch(() => null),
        apiCall('/roles').catch(() => null),
        apiCall('/workspace/settings').catch(() => null)
      ]);
      if (feedData && feedData.posts) setPosts(feedData.posts);
      if (empData && empData.employees) {
        setEmployees(empData.employees.map((e: any) => ({
          id: e.id,
          employeeId: e.employeeId,
          name: e.name,
          email: e.email,
          role: e.designation || e.role,
          dept: e.department || 'General',
          tone: e.tone || 'violet',
          initials: e.initials || 'EM',
          status: e.status || 'Active'
        })));
      }
      if (annData && annData.announcements) setAnnouncements(annData.announcements);
      if (deptData && deptData.departments) setDepartments(deptData.departments);
      if (projData && projData.projects) setProjects(projData.projects);
      if (achData) setAchievements(achData);
      if (notifData && notifData.notifications) setNotifications(notifData.notifications);
      if (metricsData) setAdminMetrics(metricsData);
      if (rolesData && rolesData.roles) setRolesList(rolesData.roles);
      if (wsData) setWorkspaceSettings(wsData);
    } catch (e) {
      console.warn('Backend sync notice (using local cache):', e);
    }
  };

  // Restore authenticated session on mount
  useEffect(() => {
    const token = localStorage.getItem('cc_token');
    if (token) {
      apiCall('/auth/me')
        .then(res => {
          if (res.user && res.company) {
            setCurrentUser(res.user);
            setCurrentCompany(res.company);
            const isAdm = res.user.role === 'ADMIN';
            setAdminMode(isAdm);
            setAuth(null);
            setScreen(isAdm ? 'admin' : 'home');
            refreshData();
          }
        })
        .catch(() => {
          localStorage.removeItem('cc_token');
          setAuth('portal');
        });
    }
  }, []);

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const navigate = (next: Screen) => { setScreen(next); setMobileNav(false) }

  // Social interactions (Real SQLite Backend Sync)
  const handleLike = async (postId: string) => {
    // Optimistic UI update
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isLiked = !p.liked
        return { ...p, liked: isLiked, likes: isLiked ? p.likes + 1 : p.likes - 1 }
      }
      return p
    }));

    try {
      const res = await apiCall('/posts/' + postId + '/like', 'POST');
      if (res.success) {
        setPosts(prev => prev.map(p => p.id === postId ? { ...p, liked: res.liked, likes: res.likes } : p));
      }
    } catch (err: any) {
      console.warn('Backend like sync:', err.message);
    }
  }

  const handleAwardKudos = async (postId: string, kudosType: string) => {
    const sender = currentUser?.name || (adminMode ? 'Alicia Rodriguez (Admin)' : 'Olivia Martin');
    
    // Optimistic update
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const existingKudos = p.kudos || []
        return {
          ...p,
          likes: p.likes + 1,
          kudos: [...existingKudos, { type: kudosType, from: sender }]
        }
      }
      return p
    }));
    showToast(`🌟 ${kudosType} awarded to ${kudosPost?.person.name || 'colleague'}!`);
    setModal(null);

    try {
      await apiCall('/posts/' + postId + '/kudos', 'POST', { kudosType });
    } catch (err: any) {
      console.warn('Backend kudos sync:', err.message);
    }
  }

  const handleAddComment = async (postId: string, text: string) => {
    if (!text.trim()) return
    const sender = currentUser?.name || (adminMode ? 'Alicia Rodriguez (Admin)' : 'Olivia Martin');
    const avatar = currentUser?.initials || (adminMode ? 'AR' : 'OM');
    
    const newComment: CommentItem = {
      id: 'c_' + Date.now(),
      author: sender,
      avatar: avatar,
      time: 'Just now',
      text: text.trim()
    }
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, comments: [...p.comments, newComment] }
      }
      return p
    }));
    showToast('Comment published! 💬');

    try {
      const res = await apiCall('/posts/' + postId + '/comments', 'POST', { text });
      if (res.success && res.comment) {
        setPosts(prev => prev.map(p => p.id === postId ? {
          ...p,
          comments: p.comments.map(c => c.id === newComment.id ? res.comment : c)
        } : p));
      }
    } catch (err: any) {
      console.warn('Backend comment sync:', err.message);
    }
  }

  const handleCreatePost = async (newPost: { text: string; type: string; tag: string; image?: string }) => {
    const sender = currentUser || (adminMode ? { name: 'Alicia Rodriguez', initials: 'AR', role: 'Company Admin', dept: 'Executive Office', tone: 'slate' } : initialPeople[0]);
    const created: PostData = {
      id: 'post_' + Date.now(),
      person: {
        name: sender.name,
        role: sender.designation || sender.role,
        dept: sender.department || sender.dept || 'Engineering',
        initials: sender.initials || 'EM',
        tone: sender.tone || 'violet'
      },
      type: newPost.type.toUpperCase(),
      time: 'Just now',
      tag: newPost.tag,
      likes: 1,
      liked: true,
      text: newPost.text,
      image: newPost.image,
      comments: [],
      kudos: []
    };
    setPosts([created, ...posts]);
    showToast('Post published to Company Feed! 🚀');

    try {
      const res = await apiCall('/posts', 'POST', newPost);
      if (res.success && res.post) {
        setPosts(prev => prev.map(p => p.id === created.id ? res.post : p));
      }
    } catch (err: any) {
      console.warn('Backend post sync:', err.message);
      showToast('Could not save post to database: ' + err.message);
    }
  }

  const handleAddEmployee = async (newEmp: { name: string; email: string; dept: string; role: string; designation: string; id: string }) => {
    const initials = newEmp.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'EM'
    const added: Person = {
      id: newEmp.id || ('EMP-' + Date.now()),
      name: newEmp.name,
      initials,
      role: newEmp.designation,
      dept: newEmp.dept,
      tone: ['violet', 'blue', 'coral', 'green', 'amber'][employees.length % 5],
      email: newEmp.email
    }
    setEmployees([...employees, added]);
    showToast(`Employee ${newEmp.name} added successfully! 👤`);

    try {
      const res = await apiCall('/employees', 'POST', {
        name: newEmp.name,
        email: newEmp.email,
        designation: newEmp.designation,
        department: newEmp.dept,
        role: newEmp.role,
        employeeId: newEmp.id
      });
      if (res.success && res.employee) {
        setEmployees(prev => prev.map(e => e.email === newEmp.email ? { ...e, id: res.employee.id } : e));
      }
    } catch (err: any) {
      showToast('Backend notice: ' + err.message);
    }
  }

  const handleDeleteEmployee = async (id: string) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
    showToast('Employee account removed.');
    try {
      await apiCall('/employees/' + id, 'DELETE');
      refreshData();
    } catch (err: any) {
      console.warn('Backend employee delete:', err.message);
    }
  }

  const handleUpdateEmployee = async (empData: any) => {
    try {
      const res = await apiCall('/employees/' + empData.id, 'PUT', empData);
      if (res.success && res.employee) {
        setEmployees(prev => prev.map(e => e.id === empData.id ? {
          ...e,
          employeeId: res.employee.employeeId,
          name: res.employee.name,
          email: res.employee.email,
          role: res.employee.designation || res.employee.role,
          dept: res.employee.department,
          status: res.employee.status
        } : e));
        showToast(`Employee ${res.employee.name} updated successfully! 💾`);
        refreshData();
      }
    } catch (err: any) {
      showToast('Update error: ' + (err.message || 'Failed to update employee'));
    }
  }

  const handleApproveEmployee = async (id: string) => {
    try {
      const res = await apiCall(`/employees/${id}/approve`, 'POST');
      if (res.success) {
        showToast(res.message || 'Employee approved! They can now log in. ✅');
        refreshData();
      }
    } catch (err: any) {
      showToast('Approve error: ' + (err.message || 'Failed to approve'));
    }
  }

  const handleRejectEmployee = async (id: string) => {
    try {
      const res = await apiCall(`/employees/${id}/reject`, 'POST');
      if (res.success) {
        showToast(res.message || 'Employee registration rejected.');
        refreshData();
      }
    } catch (err: any) {
      showToast('Reject error: ' + (err.message || 'Failed to reject'));
    }
  }

  const handleEmployeeSelfRegister = async (form: any): Promise<boolean> => {
    try {
      const res = await apiCall('/auth/employee-register', 'POST', form);
      if (res.success) {
        showToast(res.message || 'Registration submitted! Please wait for admin approval. 📋');
        return true;
      }
      return false;
    } catch (err: any) {
      showToast('Registration error: ' + (err.message || 'Registration failed'));
      return false;
    }
  }

  const handleAddAnnouncement = async (ann: { title: string; priority: string; content: string }) => {
    const newAnn = {
      id: 'a_' + Date.now(),
      title: ann.title,
      author: (currentUser?.name || 'Executive Office') + ' · Executive Leadership',
      content: ann.content,
      priority: ann.priority.toUpperCase(),
      date: 'Today'
    }
    setAnnouncements([newAnn, ...announcements]);
    showToast('Company Announcement broadcasted! 📢');

    try {
      const res = await apiCall('/announcements', 'POST', ann);
      if (res.success && res.announcement) {
        setAnnouncements(prev => prev.map(a => a.id === newAnn.id ? res.announcement : a));
      }
    } catch (err: any) {
      console.warn('Backend announcement broadcast:', err.message);
    }
  }

  const handleDeleteAnnouncement = async (annId: string) => {
    try {
      await apiCall('/announcements/' + annId, 'DELETE');
      setAnnouncements(prev => prev.filter(a => a.id !== annId));
      showToast('Announcement removed.');
    } catch (err: any) {
      showToast('Failed to delete announcement: ' + (err.message || 'Error'));
    }
  }

  const handleUpdateProfile = async (profileData: any): Promise<boolean> => {
    try {
      const res = await apiCall('/auth/profile', 'PUT', profileData);
      if (res.success && res.user) {
        setCurrentUser((prev: any) => ({ ...prev, ...res.user }));
        showToast('Profile updated successfully! 👤');
        refreshData();
        return true;
      }
      return false;
    } catch (err: any) {
      showToast('Profile error: ' + (err.message || 'Failed to update profile'));
      return false;
    }
  }

  const handleChangePassword = async (passwords: { currentPassword: string; newPassword: string }): Promise<boolean> => {
    try {
      const res = await apiCall('/auth/change-password', 'PUT', passwords);
      if (res.success) {
        if (res.token) localStorage.setItem('cc_token', res.token);
        showToast('Password updated successfully! 🔒');
        return true;
      }
      return false;
    } catch (err: any) {
      showToast('Password error: ' + (err.message || 'Failed to update password'));
      return false;
    }
  }

  const handleUpdateWorkspace = async (wsData: any): Promise<boolean> => {
    try {
      const res = await apiCall('/workspace/settings', 'PUT', wsData);
      if (res.success && res.company) {
        setCurrentCompany(res.company);
        showToast('Workspace settings saved! 🏢');
        refreshData();
        return true;
      }
      return false;
    } catch (err: any) {
      showToast('Workspace settings error: ' + (err.message || 'Failed to update settings'));
      return false;
    }
  }

  const handleMarkNotificationsRead = async () => {
    try {
      await apiCall('/notifications/read', 'POST');
      setNotifications([]);
      showToast('All notifications marked as read.');
    } catch (err: any) {
      console.warn('Mark notifications read notice:', err);
    }
  }

  const handleCreateRole = async (roleData: any) => {
    showToast(`Custom role ${roleData.name || ''} created with assigned permissions! 🛡️`);
    setRolesList((prev: any[]) => [...prev, { name: roleData.name, desc: roleData.desc, count: 0, permissions: roleData.permissions?.length || 5 }]);
    setModal(null);
  }

  // Real Backend Auth Handlers
  const handleBackendLogin = async (wsId: string, emailStr: string, passStr: string, isAdm: boolean): Promise<boolean> => {
    try {
      const res = await apiCall('/auth/login', 'POST', {
        workspaceId: wsId,
        email: emailStr,
        password: passStr,
        roleExpected: isAdm ? 'ADMIN' : undefined
      });
      if (res.success && res.token) {
        localStorage.setItem('cc_token', res.token);
        setCurrentUser(res.user);
        setCurrentCompany(res.company);
        setAdminMode(res.user.role === 'ADMIN');
        setAuth(null);
        setScreen(res.user.role === 'ADMIN' ? 'admin' : 'home');
        showToast(`Welcome back to ${res.company.name}! ✨`);
        refreshData();
        return true;
      }
      return false;
    } catch (err: any) {
      showToast('Login error: ' + (err.message || 'Authentication failed'));
      return false;
    }
  }

  const handleBackendRegister = async (form: any): Promise<boolean> => {
    try {
      const res = await apiCall('/auth/register', 'POST', form);
      if (res.success && res.token) {
        localStorage.setItem('cc_token', res.token);
        setRegisteredWorkspace(res);
        setCurrentUser(res.user);
        setCurrentCompany(res.company);
        setAuth('workspace');
        showToast(`Workspace ${res.workspaceId} created successfully! 🎉`);
        return true;
      }
      return false;
    } catch (err: any) {
      showToast('Registration error: ' + (err.message || 'Setup failed'));
      return false;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('cc_token');
    setAuth('portal');
    setProfileMenu(false);
    showToast('Signed out of workspace.');
  }

  if (auth) {
    return (
      <AuthFlow
        screen={auth}
        setScreen={setAuth}
        enter={(isAdmin) => {
          setAuth(null);
          setAdminMode(isAdmin);
          setScreen(isAdmin ? 'admin' : 'home');
          showToast(`Welcome to ${currentCompany?.name || 'Innovix'} ${isAdmin ? 'Admin Console' : 'Workspace'}! ✨`);
          refreshData();
        }}
        onLogin={handleBackendLogin}
        onRegister={handleBackendRegister}
        onEmployeeRegister={handleEmployeeSelfRegister}
        workspaceData={registeredWorkspace}
      />
    )
  }

  const nav = adminMode ? adminNav : employeeNav

  return (
    <div className={`app-shell ${adminMode ? 'admin-mode' : ''}`}>
      {toast && (
        <div className="toast-notice">
          <Icon name="check" size={16}/>
          <span>{toast}</span>
        </div>
      )}

      <aside className={`sidebar ${mobileNav ? 'mobile-open' : ''}`}>
        <div className="sidebar-top">
          <Logo/>
          <button className="icon-button mobile-only" onClick={() => setMobileNav(false)}>
            <Icon name="x"/>
          </button>
        </div>
        <div className="workspace-mini" onClick={() => setModal('workspace')} style={{ cursor: 'pointer' }}>
          <span className="workspace-logo">IN</span>
          <div><strong>{currentCompany?.name || "Innovix"}</strong><small>{currentCompany?.workspaceId || "INX-48291"}</small></div>
          <Icon name="chevron" size={16}/>
        </div>
        <nav>
          <small className="nav-heading">{adminMode ? 'MANAGEMENT' : 'WORKSPACE'}</small>
          {nav.map(item => (
            <button
              key={item.label}
              className={screen === item.screen ? 'active' : ''}
              onClick={() => navigate(item.screen)}
            >
              <Icon name={item.icon}/>
              <span>{item.label}</span>
              {item.label === 'Announcements' && <em>{announcements.length}</em>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="role-card">
            <span><Icon name={adminMode ? 'shield' : 'spark'} size={16}/></span>
            <div><small>ACTIVE ROLE</small><strong>{adminMode ? 'Company Admin' : 'Employee'}</strong></div>
          </div>
          <button
            className="mode-switch"
            onClick={() => {
              const nextMode = !adminMode
              setAdminMode(nextMode)
              setScreen(nextMode ? 'admin' : 'home')
              showToast(`Switched to ${nextMode ? 'Admin Management' : 'Employee Experience'}`)
            }}
          >
            <Icon name={adminMode ? 'user' : 'shield'}/>
            {adminMode ? 'Employee experience' : 'Admin console'}
            <Icon name="arrow" size={15}/>
          </button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setMobileNav(true)}><Icon name="menu"/></button>
          <div className="search-box">
            <Icon name="search"/>
            <input
              placeholder="Search people, posts, and projects"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <kbd>⌘ K</kbd>
          </div>
          <div className="top-actions">
            <button className="workspace-pill desktop-only" onClick={() => setModal('workspace')}>
              <span className="workspace-logo tiny">IN</span>
              <span>{currentCompany?.name || "Innovix Technologies"}</span>
              <Icon name="chevron" size={15}/>
            </button>
            <button className="icon-button notification-button" onClick={() => setModal('notifications')}>
              <Icon name="bell"/>
              {notifications.length > 0 && (
                <i style={{ minWidth: '16px', height: '16px', padding: '0 4px', borderRadius: '10px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {notifications.length}
                </i>
              )}
            </button>
            <div className="profile-trigger">
              <button onClick={() => setProfileMenu(!profileMenu)}>
                <Avatar person={currentUser ? { name: currentUser.name, initials: currentUser.initials, role: currentUser.role, dept: currentUser.department || currentUser.dept, tone: currentUser.tone } : (adminMode ? { name: 'Alicia Rodriguez', initials: 'AR', role: 'Admin', dept: 'Executive', tone: 'slate' } : initialPeople[0])} size="sm"/>
                <span className="desktop-only">
                  <b>{currentUser?.name || (adminMode ? 'Alicia Rodriguez' : 'Olivia Martin')}</b>
                  <small>{currentUser?.designation || currentUser?.role || (adminMode ? 'Company Admin' : 'Product Design')}</small>
                </span>
                <Icon name="chevron" size={15}/>
              </button>
              {profileMenu && (
                <div className="profile-menu">
                  <button onClick={() => { navigate('profile'); setProfileMenu(false) }}><Icon name="user"/>View profile</button>
                  <button onClick={() => { navigate('settings'); setProfileMenu(false) }}><Icon name="settings"/>Settings</button>
                  <hr/>
                  <button onClick={handleLogout}><Icon name="logout"/>Sign out</button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="page-content">
          {screen === 'home' && (
            <Home
              posts={searchQuery ? posts.filter(p => p.text.toLowerCase().includes(searchQuery.toLowerCase()) || p.person.name.toLowerCase().includes(searchQuery.toLowerCase()) || (p.tag && p.tag.toLowerCase().includes(searchQuery.toLowerCase()))) : posts}
              announcements={announcements}
              onPost={() => setModal('post')}
              onLike={handleLike}
              onComment={handleAddComment}
              onShare={(p) => {
                navigator.clipboard?.writeText(window.location.href)
                showToast(`Link to ${p.person.name}'s update copied! 📋`)
              }}
              onGiveKudos={(p) => {
                setKudosPost(p)
                setModal('kudos')
              }}
              navigate={navigate}
              currentUser={currentUser}
              currentCompany={currentCompany}
            />
          )}
          {screen === 'admin' && (
            <AdminOverview
              navigate={navigate}
              onAnnouncement={() => setModal('announcement')}
              metrics={adminMetrics}
              employeeCount={employees.length}
              postCount={posts.length}
            />
          )}
          {screen === 'employees' && (
            <Employees
              employees={employees}
              onAdd={() => setModal('employee')}
              onDelete={handleDeleteEmployee}
              onEdit={(p) => { setEditingEmployee(p); setModal('edit-employee'); }}
              onApprove={handleApproveEmployee}
              onReject={handleRejectEmployee}
              adminMode={adminMode}
              initialDeptFilter={selectedDeptFilter}
            />
          )}
          {screen === 'roles' && <Roles roles={rolesList} onAdd={() => setModal('role')}/>}
          {screen === 'announcements' && (
            <Announcements
              announcements={announcements}
              canCreate={adminMode}
              onAdd={() => setModal('announcement')}
              onDelete={handleDeleteAnnouncement}
            />
          )}
          {screen === 'profile' && (
            <Profile
              currentUser={currentUser}
              currentCompany={currentCompany}
              userPosts={posts.filter(p => p.person.name === currentUser?.name)}
              achievements={achievements}
              onEdit={() => setModal('edit-profile')}
            />
          )}
          {screen === 'departments' && (
            <DepartmentsView
              departments={departments}
              navigate={navigate}
              onSelectDept={(dept) => {
                setSelectedDeptFilter(dept);
                navigate('employees');
              }}
            />
          )}
          {screen === 'projects' && (
            <ProjectsView
              projects={projects}
              navigate={navigate}
              onSelectTag={(tag) => {
                setSearchQuery(tag);
                navigate('home');
              }}
              onNewPost={(tag) => {
                setModal('post');
              }}
            />
          )}
          {screen === 'achievements' && (
            <AchievementsView
              achievements={achievements}
              onGiveKudos={() => setModal('kudos')}
            />
          )}
          {screen === 'settings' && (
            <SettingsView
              currentUser={currentUser}
              currentCompany={currentCompany}
              workspaceSettings={workspaceSettings}
              onUpdateProfile={handleUpdateProfile}
              onChangePassword={handleChangePassword}
              onUpdateWorkspace={handleUpdateWorkspace}
              showToast={showToast}
              refreshData={refreshData}
            />
          )}
        </div>
      </main>

      {mobileNav && <button className="nav-backdrop" onClick={() => setMobileNav(false)} aria-label="Close navigation"/>}
      
      {modal && (
        <Modal
          type={modal}
          close={() => { setModal(null); setEditingEmployee(null); }}
          onCreatePost={handleCreatePost}
          onAddEmployee={handleAddEmployee}
          onAddAnnouncement={handleAddAnnouncement}
          kudosPost={kudosPost}
          onAwardKudos={handleAwardKudos}
          editingEmployee={editingEmployee}
          onUpdateEmployee={handleUpdateEmployee}
          currentUser={currentUser}
          currentCompany={currentCompany}
          onUpdateProfile={handleUpdateProfile}
          notifications={notifications}
          onMarkAllRead={handleMarkNotificationsRead}
          onCreateRole={handleCreateRole}
        />
      )}
    </div>
  )
}

function Home({
  posts,
  announcements,
  onPost,
  onLike,
  onComment,
  onShare,
  onGiveKudos,
  navigate,
  currentUser,
  currentCompany
}: {
  posts: PostData[]
  announcements: { id: string; title: string; content: string }[]
  onPost: () => void
  onLike: (id: string) => void
  onComment: (id: string, text: string) => void
  onShare: (p: PostData) => void
  onGiveKudos: (p: PostData) => void
  navigate: (s: Screen) => void
  currentUser?: any
  currentCompany?: any
}) {
  const [filter, setFilter] = useState<'forYou' | 'following'>('forYou')

  return (
    <div className="dashboard-grid">
      <section className="feed-column">
        <div className="greeting">
          <div>
            <span className="eyebrow">MONDAY, MAY 26</span>
            <h1>Good morning, {currentUser ? currentUser.name.split(' ')[0] : 'Olivia'}.</h1>
            <p>Here's what's happening at {currentCompany?.name || 'Innovix'} today.</p>
          </div>
          <button className="primary-button" onClick={onPost}><Icon name="plus"/>Create post</button>
        </div>

        <div className="composer card" onClick={onPost}>
          <Avatar person={currentUser ? { initials: currentUser.initials, tone: currentUser.tone } : undefined}/>
          <button>Share an update, milestone, or celebration...</button>
          <span><Icon name="image"/>Photo</span>
          <span><Icon name="award"/>Kudos</span>
          <span><Icon name="help"/>Ask for help</span>
        </div>

        {announcements.length > 0 && (
          <div className="announcement-strip card" onClick={() => navigate('announcements')}>
            <span className="announcement-icon"><Icon name="megaphone"/></span>
            <div>
              <small>LATEST COMPANY ANNOUNCEMENT</small>
              <strong>{announcements[0].title}</strong>
              <p>{announcements[0].content}</p>
            </div>
            <span className="read-link">Read all ({announcements.length}) <Icon name="arrow" size={14}/></span>
          </div>
        )}

        <div className="feed-filter">
          <div>
            <button className={filter === 'forYou' ? 'active' : ''} onClick={() => setFilter('forYou')}>For you</button>
            <button className={filter === 'following' ? 'active' : ''} onClick={() => setFilter('following')}>Following</button>
          </div>
          <button><Icon name="filter" size={15}/> Latest first</button>
        </div>

        {posts.map(post => (
          <Post
            key={post.id}
            post={post}
            onLike={() => onLike(post.id)}
            onComment={(txt) => onComment(post.id, txt)}
            onShare={() => onShare(post)}
            onGiveKudos={() => onGiveKudos(post)}
          />
        ))}

        <HelpPost onRespond={() => alert('Thanks for offering to help! A direct thread has been started.')}/>
      </section>

      <aside className="right-rail">
        <PulseCard/>
        <div className="rail-card card">
          <div className="card-title"><span>Today at Innovix</span><button><Icon name="more"/></button></div>
          <div className="timeline-item"><span className="dot violet"/><div><small>10:30 AM</small><strong>Design critique & system tokens</strong><p>Product Design · Studio 2</p></div></div>
          <div className="timeline-item"><span className="dot blue"/><div><small>2:00 PM</small><strong>Project Atlas sprint sync</strong><p>Engineering · Google Meet</p></div></div>
          <div className="timeline-item"><span className="dot coral"/><div><small>4:30 PM</small><strong>Welcome social & new hires</strong><p>Culture Club · Terrace 4th Floor</p></div></div>
        </div>

        <div className="rail-card card">
          <div className="card-title"><span>Celebrations</span><button>See all</button></div>
          <div className="celebration">
            <Avatar person={initialPeople[2]} size="sm"/>
            <div><strong>Priya's birthday 🎂</strong><p>Today · Wish her well</p></div>
            <span className="mini-badge"><Icon name="spark" size={15}/></span>
          </div>
          <div className="celebration">
            <Avatar person={initialPeople[3]} size="sm"/>
            <div><strong>Daniel · 3 years</strong><p>Work anniversary today</p></div>
            <span className="mini-badge blue"><Icon name="award" size={15}/></span>
          </div>
        </div>
      </aside>
    </div>
  )
}

function Post({
  post,
  onLike,
  onComment,
  onShare,
  onGiveKudos
}: {
  post: PostData
  onLike: () => void
  onComment: (text: string) => void
  onShare: () => void
  onGiveKudos: () => void
}) {
  const [showComments, setShowComments] = useState(false)
  const [commentInput, setCommentInput] = useState('')

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentInput.trim()) return
    onComment(commentInput)
    setCommentInput('')
  }

  return (
    <article className="post-card card">
      <div className="post-head">
        <Avatar person={post.person}/>
        <div>
          <strong>{post.person.name}</strong>
          <p>{post.person.role} · {post.person.dept}</p>
          <small>{post.time} · <Icon name="building" size={12}/> Innovix</small>
        </div>
        <button className="icon-button"><Icon name="more"/></button>
      </div>

      <div className="post-body">
        <div className="post-tags">
          <span>{post.type}</span>
          <span>{post.tag}</span>
        </div>
        {post.kudos && post.kudos.length > 0 && (
          <div className="post-kudos-row">
            {post.kudos.map((k, idx) => (
              <span key={idx} className="kudos-chip">
                <Icon name="award" size={13}/>
                <b>{k.type}</b> · from {k.from}
              </span>
            ))}
          </div>
        )}
        <p>{post.text}</p>
      </div>

      {post.image && (
        <div className="post-image">
          <img src={post.image} alt={post.tag}/>
          <div className="image-caption">
            <span><Icon name="folder" size={14}/> {post.tag}</span>
            <b>View project <Icon name="arrow" size={14}/></b>
          </div>
        </div>
      )}

      <div className="post-meta">
        <span><b>{post.likes}</b> appreciations</span>
        <span>{post.comments.length} comments · 4 shares</span>
      </div>

      <div className="post-actions">
        <button className={post.liked ? 'liked' : ''} onClick={onLike}>
          <Icon name="heart" fill={post.liked ? 'currentColor' : 'none'}/>
          {post.liked ? 'Appreciated' : 'Appreciate'}
        </button>
        <button onClick={() => setShowComments(!showComments)}>
          <Icon name="comment"/>
          Comment {post.comments.length > 0 && `(${post.comments.length})`}
        </button>
        <button className="kudos-btn" onClick={onGiveKudos}><Icon name="award"/>Give Kudos {post.kudos && post.kudos.length > 0 && `(${post.kudos.length})`}</button>
        <button onClick={onShare}><Icon name="share"/>Share</button>
      </div>

      {showComments && (
        <div className="comment-section">
          {post.comments.map(c => (
            <div key={c.id} className="comment-item">
              <span className="avatar avatar-sm avatar-violet">{c.avatar}</span>
              <div className="comment-bubble">
                <b>{c.author}</b>
                <p>{c.text}</p>
                <small>{c.time}</small>
              </div>
            </div>
          ))}

          <form onSubmit={submitComment} className="comment-input-row">
            <input
              placeholder="Write a supportive comment..."
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>
        </div>
      )}
    </article>
  )
}

function HelpPost({ onRespond }: { onRespond: () => void }) {
  return (
    <article className="post-card help-post card">
      <div className="post-head">
        <Avatar person={initialPeople[3]}/>
        <div>
          <strong>{initialPeople[3].name}</strong>
          <p>{initialPeople[3].role} · {initialPeople[3].dept}</p>
          <small>3 hr ago</small>
        </div>
        <span className="help-label"><Icon name="help" size={15}/> HELP NEEDED</span>
      </div>
      <div className="post-body">
        <h3>Looking for a React accessibility expert</h3>
        <p>We are validating the new onboarding flow this week. I would love a second pair of eyes on keyboard navigation, ARIA announcements, and screen reader ergonomics.</p>
        <div className="skill-row">
          <span>Required skill <b>React · Accessibility (a11y)</b></span>
          <span>Project <b>New Hire Journey</b></span>
        </div>
        <button className="secondary-button" onClick={onRespond}>Offer help <Icon name="arrow" size={15}/></button>
      </div>
    </article>
  )
}

function PulseCard() {
  return (
    <div className="pulse-card">
      <div className="pulse-top">
        <span><Icon name="spark"/> Company Pulse</span>
        <small>THIS WEEK</small>
      </div>
      <h3>Your teams are making momentum.</h3>
      <div className="pulse-score">
        <div className="ring"><span>88<small>%</small></span></div>
        <div><strong>High activity</strong><p>142 active today · Up 14% from last week</p></div>
      </div>
      <div className="pulse-stats">
        <div><b>14</b><span>Milestones</span></div>
        <div><b>36</b><span>Kudos sent</span></div>
        <div><b>8</b><span>Wins shared</span></div>
      </div>
      <button onClick={() => alert('Company Pulse: 94% on-track velocity across 6 active departments.')}>
        Explore company pulse <Icon name="arrow" size={15}/>
      </button>
    </div>
  )
}

function AdminOverview({
  navigate,
  onAnnouncement,
  metrics,
  employeeCount,
  postCount
}: {
  navigate: (s: Screen) => void
  onAnnouncement: () => void
  metrics?: any
  employeeCount: number
  postCount: number
}) {
  const stats = [
    ['Total employees', String(metrics?.employeeCount ?? employeeCount), `${metrics?.activeEmployees ?? employeeCount} active in workspace`, 'users'],
    ['Pending approvals', String(metrics?.pendingEmployees ?? 0), 'Awaiting admin verification', 'spark'],
    ['Company posts', String(metrics?.postCount ?? postCount), '+18.4% monthly activity', 'folder'],
    ['Recognition kudos', String(metrics?.kudosCount ?? 6), 'Peer kudos awarded', 'award'],
  ] as const

  return (
    <div className="wide-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">ADMIN CONSOLE</span>
          <h1>Workspace overview</h1>
          <p>Monitor your people, engagement, and company activity.</p>
        </div>
        <div>
          <button className="secondary-button" onClick={onAnnouncement}>
            <Icon name="megaphone"/>New announcement
          </button>
          <button className="primary-button" onClick={() => navigate('employees')}>
            <Icon name="plus"/>Add employee
          </button>
        </div>
      </div>

      <div className="stat-grid">
        {stats.map(([label, value, sub, icon]) => (
          <div className="stat-card card" key={label}>
            <span><Icon name={icon}/></span>
            <small>{label}</small>
            <strong>{value}</strong>
            <p>{sub}</p>
          </div>
        ))}
      </div>

      <div className="admin-grid">
        <section className="card engagement-card">
          <div className="section-head">
            <div><h2>Employee engagement</h2><p>Weekly active participation</p></div>
            <select><option>Last 8 weeks</option></select>
          </div>
          <div className="chart-wrap">
            <div className="chart-y"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div>
            <div className="chart">
              <div className="chart-line">
                <svg viewBox="0 0 600 180" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5c5ce2" stopOpacity=".26"/>
                      <stop offset="100%" stopColor="#5c5ce2" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path className="area" d="M0 135 C80 120 80 90 150 100 S240 60 300 75 S390 35 450 55 S530 20 600 28 L600 180 L0 180Z"/>
                  <path d="M0 135 C80 120 80 90 150 100 S240 60 300 75 S390 35 450 55 S530 20 600 28"/>
                </svg>
              </div>
              <div className="chart-x">
                <span>Apr 7</span><span>Apr 14</span><span>Apr 21</span><span>Apr 28</span><span>May 5</span><span>May 12</span><span>May 19</span>
              </div>
            </div>
          </div>
          <div className="chart-legend">
            <span><i/>Post engagement <b>78.4%</b></span>
            <span><i/>Weekly change <b className="positive">+6.2%</b></span>
          </div>
        </section>

        <section className="card activity-card">
          <div className="section-head">
            <div><h2>Recent activity & audit</h2><p>Live security & workspace log</p></div>
            <button onClick={() => navigate('home')}>View feed</button>
          </div>
          {(metrics?.recentActivity && metrics.recentActivity.length > 0 ? metrics.recentActivity : [
            { userName: 'Alicia Rodriguez', action: 'LOGIN_SUCCESS', details: 'Admin console authenticated', time: 'Just now' },
            { userName: 'Marcus Chen', action: 'CREATE_POST', details: 'Published update on Project Atlas', time: '14m ago' },
            { userName: 'Olivia Martin', action: 'AWARD_KUDOS', details: 'Recognized peer with Innovation Kudos', time: '1h ago' },
            { userName: 'Priya Nair', action: 'ANNOUNCEMENT', details: 'Broadcasted wellness benefit notice', time: '2h ago' }
          ]).slice(0, 5).map((a: any, i: number) => (
            <div className="activity-row" key={a.id || i}>
              <Avatar person={{ name: a.userName || 'System', initials: (a.userName || 'SY').split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase(), role: 'Member', dept: 'General', tone: ['purple', 'gold', 'green', 'blue', 'coral'][i % 5] }} size="sm"/>
              <p>
                <b>{a.userName || 'System'}</b> {a.details || a.action}
                <small>{a.time || 'Recently'}</small>
              </p>
              <span className={['purple', 'gold', 'green', 'blue', 'coral'][i % 5]}>
                <Icon name={a.action?.includes('POST') ? 'folder' : a.action?.includes('KUDOS') ? 'award' : a.action?.includes('EMPLOYEE') ? 'users' : 'spark'} size={15}/>
              </span>
            </div>
          ))}
        </section>
      </div>

      <section className="card team-table">
        <div className="section-head">
          <div><h2>Department health</h2><p>Headcount and participation by team</p></div>
          <button onClick={() => navigate('employees')}>Manage employees <Icon name="arrow" size={14}/></button>
        </div>
        <table>
          <thead>
            <tr><th>Department</th><th>Employees</th><th>Active this week</th><th>Engagement</th><th>Trend</th></tr>
          </thead>
          <tbody>
            {(metrics?.departmentHealth && metrics.departmentHealth.length > 0 ? metrics.departmentHealth : [
              { department: 'Engineering', employees: 12, activeThisWeek: 11, engagement: '92%', trend: '+4.2%' },
              { department: 'Product Design', employees: 5, activeThisWeek: 5, engagement: '95%', trend: '+6.1%' },
              { department: 'Executive Leadership', employees: 3, activeThisWeek: 3, engagement: '100%', trend: '+1.0%' }
            ]).map((r: any) => (
              <tr key={r.department}>
                <td><span className="dept-icon">{(r.department || 'DE').slice(0, 2).toUpperCase()}</span><b>{r.department}</b></td>
                <td>{r.employees}</td>
                <td>{r.activeThisWeek || r.employees}</td>
                <td><span className="progress"><i style={{ width: r.engagement || '85%' }}/></span>{r.engagement || '85%'}</td>
                <td className="positive">{r.trend || '+3.5%'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

function Employees({
  employees,
  onAdd,
  onDelete,
  onEdit,
  onApprove,
  onReject,
  adminMode,
  initialDeptFilter
}: {
  employees: Person[]
  onAdd: () => void
  onDelete: (id: string) => void
  onEdit: (p: Person) => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
  adminMode: boolean
  initialDeptFilter?: string
}) {
  const [deptFilter, setDeptFilter] = useState(initialDeptFilter || 'All')
  useEffect(() => {
    if (initialDeptFilter) setDeptFilter(initialDeptFilter);
  }, [initialDeptFilter]);
  const [statusFilter, setStatusFilter] = useState('All')
  const [roleFilter, setRoleFilter] = useState('All')
  const [keyword, setKeyword] = useState('')

  const pendingCount = employees.filter(e => e.status === 'Pending').length

  const filtered = employees.filter(e => {
    if (deptFilter !== 'All' && e.dept !== deptFilter) return false
    if (statusFilter !== 'All' && (e.status || 'Active') !== statusFilter) return false
    if (roleFilter !== 'All') {
      const isAdm = e.role === 'ADMIN' || e.role === 'Company Admin'
      if (roleFilter === 'Admin' && !isAdm) return false
      if (roleFilter === 'Employee' && isAdm) return false
    }
    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase()
      const matchName = e.name.toLowerCase().includes(kw)
      const matchEmail = (e.email || '').toLowerCase().includes(kw)
      const matchEmpId = (e.employeeId || e.id || '').toLowerCase().includes(kw)
      const matchDept = e.dept.toLowerCase().includes(kw)
      if (!matchName && !matchEmail && !matchEmpId && !matchDept) return false
    }
    return true
  })

  return (
    <div className="wide-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">{adminMode ? 'PEOPLE OPERATIONS' : 'DIRECTORY'}</span>
          <h1>{adminMode ? 'Employee management' : 'People at Innovix'}</h1>
          <p>{adminMode ? 'Manage employee access, edit login IDs & credentials, and approve registrations.' : 'Find and connect with colleagues across the company.'}</p>
        </div>
        {adminMode && (
          <button className="primary-button" onClick={onAdd}><Icon name="plus"/>Add employee</button>
        )}
      </div>

      {adminMode && pendingCount > 0 && (
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '14px 18px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fef3c7', color: '#b45309', display: 'grid', placeItems: 'center', fontWeight: 'bold' }}>⏳</span>
            <div>
              <b style={{ fontSize: '13px', color: '#92400e' }}>{pendingCount} Pending Employee Registration{pendingCount > 1 ? 's' : ''} Awaiting Approval</b>
              <small style={{ display: 'block', fontSize: '11px', color: '#b45309', marginTop: '2px' }}>Review and approve new team members below so they can access their workspace.</small>
            </div>
          </div>
          <button
            style={{ padding: '6px 12px', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: '7px', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
            onClick={() => setStatusFilter('Pending')}
          >
            Show Pending Only ({pendingCount})
          </button>
        </div>
      )}

      <div className="directory-tools card">
        <div className="table-search">
          <Icon name="search"/>
          <input
            placeholder="Search by name, employee ID, or email..."
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
        </div>
        <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
          <option value="All">All departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Product Design">Product Design</option>
          <option value="Product">Product</option>
          <option value="Marketing">Marketing</option>
          <option value="People & Culture">People & Culture</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Product Management">Product Management</option>
          <option value="Executive Office">Executive Office</option>
        </select>
        {adminMode && (
          <>
            <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
              <option value="All">All roles</option>
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="All">All statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending ({pendingCount})</option>
              <option value="Rejected">Rejected</option>
            </select>
          </>
        )}
      </div>

      <div className="employee-table card">
        <div className="table-summary">
          <span><b>{filtered.length} employees</b> in this view</span>
          <button onClick={() => {
            const header = 'Name,Email,Employee ID,Department,Designation,Role,Status\n';
            const rows = filtered.map(e => `"${e.name}","${e.email}","${e.employeeId || ''}","${e.department || ''}","${e.designation || ''}","${e.role}","${e.status}"`).join('\n');
            const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `company_directory_${new Date().toISOString().slice(0, 10)}.csv`;
            a.click();
            URL.revokeObjectURL(url);
          }}><Icon name="external" size={15}/>Export CSV</button>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Employee ID (Login ID)</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Role</th>
                {adminMode && <><th>Status</th><th style={{ textAlign: 'center' }}>Actions</th></>}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id || p.name + i}>
                  <td>
                    <div className="person-cell">
                      <Avatar person={p} size="sm"/>
                      <div>
                        <b>{p.name}</b>
                        <small>{p.email || `${p.name.toLowerCase().replace(' ', '.')}@innovix.com`}</small>
                      </div>
                    </div>
                  </td>
                  <td className="mono" style={{ fontWeight: 600 }}>{p.employeeId || p.id || `EMP-${1024 + i}`}</td>
                  <td>{p.dept}</td>
                  <td>{p.role}</td>
                  <td>
                    <span className="role-tag">
                      {p.role === 'ADMIN' || p.role === 'Company Admin' ? 'Company Admin' : p.role}
                    </span>
                  </td>
                  {adminMode && (
                    <>
                      <td>
                        <span className={`status ${(p.status || 'Active').toLowerCase()}`}>
                          <i/>{p.status || 'Active'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center' }}>
                          {p.status === 'Pending' && (
                            <>
                              <button
                                className="action-pill approve-pill"
                                title="Approve employee account"
                                onClick={() => onApprove(p.id || '')}
                              >
                                <Icon name="check" size={12}/> Approve
                              </button>
                              <button
                                className="action-pill reject-pill"
                                title="Reject registration"
                                onClick={() => onReject(p.id || '')}
                              >
                                <Icon name="x" size={12}/> Reject
                              </button>
                            </>
                          )}
                          <button
                            className="icon-button"
                            title="Edit employee ID, credentials & details"
                            onClick={() => onEdit(p)}
                            style={{ color: 'var(--brand)' }}
                          >
                            <Icon name="edit" size={15}/>
                          </button>
                          <button
                            className="icon-button"
                            title="Remove employee"
                            onClick={() => {
                              if (confirm(`Are you sure you want to remove ${p.name}?`)) {
                                onDelete(p.id || '')
                              }
                            }}
                          >
                            <Icon name="trash" size={15}/>
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const permissionGroups = [
  {
    title: 'Social permissions',
    items: ['Create posts', 'Like posts', 'Comment on posts', 'Edit own posts', 'Delete own posts', "Delete others' posts"]
  },
  {
    title: 'Employee permissions',
    items: ['View employee directory', 'Create employee accounts', 'Edit employee details', 'Deactivate employee accounts', 'Assign employee roles']
  },
  {
    title: 'Company permissions',
    items: ['Create announcements', 'Manage departments', 'View company analytics', 'Manage workspace settings']
  },
]

function Roles({ roles: rolesProp, onAdd }: { roles?: any[]; onAdd: () => void }) {
  const defaultRoles = [
    ['Company Admin', 'Full workspace management and security control', '1'],
    ['HR Manager', 'People, departments & announcements', '1'],
    ['Department Manager', 'Department and team project management', '4'],
    ['Team Lead', 'Team updates & limited moderation', '3'],
    ['Employee', 'Core social feed, recognition, and profile access', '22'],
  ]
  const activeRoles = (rolesProp && rolesProp.length > 0)
    ? rolesProp.map(r => [r.name, r.desc, String(r.count || 0)])
    : defaultRoles;

  const [selected, setSelected] = useState(activeRoles[0]?.[0] || 'Company Admin')
  const [roles, setRoles] = useState(activeRoles)

  useEffect(() => {
    if (rolesProp && rolesProp.length > 0) {
      setRoles(rolesProp.map(r => [r.name, r.desc, String(r.count || 0)]))
    }
  }, [rolesProp])

  return (
    <div className="wide-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">ACCESS CONTROL</span>
          <h1>Roles & permissions</h1>
          <p>Give people the right access without unnecessary complexity.</p>
        </div>
        <button className="primary-button" onClick={onAdd}><Icon name="plus"/>Create custom role</button>
      </div>

      <div className="roles-layout">
        <aside className="roles-list card">
          <div className="roles-list-head"><b>Workspace roles</b><span>{roles.length} roles</span></div>
          {roles.map(([name, desc, count]) => (
            <button
              className={selected === name ? 'selected' : ''}
              onClick={() => setSelected(name)}
              key={name}
            >
              <span className="role-icon"><Icon name={name === 'Company Admin' ? 'shield' : 'user'} size={17}/></span>
              <div><b>{name}</b><small>{desc}</small></div>
              <em>{count}</em>
            </button>
          ))}
        </aside>

        <section className="permissions-panel card">
          <div className="permissions-head">
            <div>
              <span className="role-icon large"><Icon name="users"/></span>
              <div>
                <h2>{selected}</h2>
                <p>{roles.find(r => r[0] === selected)?.[1]}</p>
              </div>
            </div>
            <div>
              <button className="secondary-button" onClick={() => alert(`Role configuration for ${selected} is active.`)}><Icon name="edit" size={15}/>Edit role</button>
            </div>
          </div>

          <div className="permission-summary">
            <div>
              <strong>{roles.find(r => r[0] === selected)?.[2] || '1'} employees</strong>
              <span>assigned this role in this workspace</span>
            </div>
            <div className="progress"><i style={{ width: '74%' }}/></div>
            <p>Changes apply immediately to all employees assigned this role.</p>
          </div>

          {permissionGroups.map((g, gi) => (
            <div className="permission-group" key={g.title}>
              <h3>{g.title}<span>{g.items.length}</span></h3>
              {g.items.map((item, i) => (
                <div className="permission-row" key={item}>
                  <div>
                    <b>{item}</b>
                    <p>{permissionDescription(item)}</p>
                  </div>
                  <Toggle initial={i < (gi === 0 ? 5 : gi === 1 ? 3 : 2)}/>
                </div>
              ))}
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

function permissionDescription(item: string) {
  const map: Record<string, string> = {
    'Create posts': 'Publish updates and milestones to the company feed',
    'Like posts': 'React and appreciate colleague updates',
    'Comment on posts': 'Join conversations and offer suggestions',
    'Edit own posts': 'Modify text and attachments after publishing',
    'Delete own posts': 'Remove your updates from the workspace feed',
    "Delete others' posts": 'Moderate feed content across all departments',
    'View employee directory': 'Browse employee profiles, skills, and contact details',
    'Create employee accounts': 'Generate invitations and temporary credentials',
    'Edit employee details': 'Update designations, departments, and reporting lines',
    'Deactivate employee accounts': 'Suspend account access and workspace tokens',
    'Assign employee roles': 'Elevate or restrict permissions for employees',
    'Create announcements': 'Broadcast company-wide notices and banner alerts',
    'Manage departments': 'Add, merge, or archive organizational departments',
    'View company analytics': 'Inspect engagement metrics, sentiment, and retention stats',
    'Manage workspace settings': 'Configure company branding, SSO, and retention policies',
  }
  return map[item] || 'Grant permission for this workspace capability'
}

function Toggle({ initial = false }: { initial?: boolean }) {
  const [on, setOn] = useState(initial)
  return (
    <button
      className={`toggle ${on ? 'on' : ''}`}
      onClick={() => setOn(!on)}
      role="switch"
      aria-checked={on}
    >
      <i/>
    </button>
  )
}

function Announcements({
  announcements,
  canCreate,
  onAdd,
  onDelete
}: {
  announcements: { id: string; title: string; author: string; content: string; priority: string; date: string }[]
  canCreate: boolean
  onAdd: () => void
  onDelete?: (id: string) => void
}) {
  return (
    <div className="narrow-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">COMPANY NEWS</span>
          <h1>Announcements</h1>
          <p>Important updates and official bulletins from Innovix Technologies.</p>
        </div>
        {canCreate && (
          <button className="primary-button" onClick={onAdd}><Icon name="plus"/>New announcement</button>
        )}
      </div>

      <div className="announcement-feature">
        <span><Icon name="megaphone"/></span>
        <div>
          <small>PINNED · LEADERSHIP</small>
          <h2>A note from our CEO: Building what matters</h2>
          <p>As we enter the second half of the fiscal year, I want to thank every team for the focus, craft, and care you bring to our clients and each other.</p>
          <button onClick={() => alert('Executive address: Thank you to all teams for building impactful products and delighting our enterprise customers!')}>
            Read the full message <Icon name="arrow" size={15}/>
          </button>
        </div>
      </div>

      <div className="announcement-list">
        {announcements.map((a, i) => (
          <article className="announcement-card card" key={a.id || a.title}>
            <div className={`priority p${i % 3}`}>
              <span>{a.priority}</span>
              <small>{a.date}</small>
              {canCreate && onDelete && (
                <button
                  type="button"
                  className="icon-button"
                  title="Delete announcement"
                  style={{ color: '#e85f5f', marginLeft: 'auto', padding: '2px 6px' }}
                  onClick={() => {
                    if (confirm(`Delete announcement "${a.title}"?`)) onDelete(a.id);
                  }}
                >
                  <Icon name="trash" size={14}/>
                </button>
              )}
            </div>
            <h2>{a.title}</h2>
            <p>{a.content}</p>
            <div>
              <Avatar person={initialPeople[(i + 1) % initialPeople.length]} size="sm"/>
              <span>
                <b>{a.author.split(' · ')[0]}</b>
                <small>{a.author.split(' · ')[1] || 'Innovix'}</small>
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function Profile({
  currentUser,
  currentCompany,
  userPosts = [],
  achievements,
  onEdit
}: {
  currentUser: any
  currentCompany: any
  userPosts: PostData[]
  achievements?: any
  onEdit: () => void
}) {
  const [tab, setTab] = useState<'overview' | 'posts' | 'achievements'>('overview')

  const userName = currentUser?.name || 'Olivia Martin';
  const userRole = currentUser?.designation || currentUser?.role || 'Senior Product Designer';
  const userDept = currentUser?.department || currentUser?.dept || 'Product Design';
  const userBio = currentUser?.bio || `${userRole} at ${currentCompany?.name || 'Innovix Technologies'}. Passionate about design systems, scalable software, and high-impact collaboration.`;
  const skillsList = currentUser?.skills
    ? (typeof currentUser.skills === 'string' ? currentUser.skills.split(',').map((s: string) => s.trim()).filter(Boolean) : currentUser.skills)
    : ['Product Strategy', 'UI/UX Design', 'TypeScript', 'Cross-Team Collaboration'];

  const userKudosReceived = achievements?.userStats?.receivedCount || 0;
  const userBadges = achievements?.userStats?.badges || ['Innovation Catalyst', 'Team Player'];

  return (
    <div className="profile-page">
      <div className="profile-hero card">
        <div className="cover"><div className="cover-shape one"/><div className="cover-shape two"/></div>
        <div className="profile-info">
          <Avatar person={currentUser ? { name: userName, initials: currentUser.initials, role: userRole, dept: userDept, tone: currentUser.tone } : initialPeople[0]} size="xl"/>
          <div>
            <h1>{userName}</h1>
            <p>{userRole} · {userDept}</p>
            <span><Icon name="building" size={14}/> {currentCompany?.name || 'Innovix Technologies'} <i/> {currentCompany?.workspaceId || 'INX-48291'}</span>
          </div>
          <button className="secondary-button" onClick={onEdit}><Icon name="edit"/>Edit profile</button>
        </div>
        <div className="profile-tabs">
          <button className={tab === 'overview' ? 'active' : ''} onClick={() => setTab('overview')}>Overview</button>
          <button className={tab === 'posts' ? 'active' : ''} onClick={() => setTab('posts')}>Posts <span>{userPosts.length}</span></button>
          <button className={tab === 'achievements' ? 'active' : ''} onClick={() => setTab('achievements')}>Recognition <span>{userKudosReceived}</span></button>
        </div>
      </div>

      <div className="profile-grid">
        <div>
          {tab === 'overview' && (
            <>
              <section className="card profile-section">
                <h2>About</h2>
                <p>{userBio}</p>
              </section>

              <section className="card profile-section">
                <div className="section-head">
                  <h2>Recent updates from {userName}</h2>
                </div>
                {userPosts.length === 0 ? (
                  <p style={{ color: 'var(--muted)', fontSize: '13px' }}>No posts published yet. Share a daily update or project win to get started!</p>
                ) : (
                  userPosts.slice(0, 3).map((p) => (
                    <article className="post-card card" key={p.id} style={{ boxShadow: 'none', border: '1px solid var(--border)', marginBottom: '12px' }}>
                      <div className="post-head">
                        <Avatar person={p.person} size="sm"/>
                        <div>
                          <strong>{p.person.name}</strong>
                          <p>{p.person.dept}</p>
                          <small>{p.time}</small>
                        </div>
                      </div>
                      <div className="post-body">
                        <div className="post-tags">
                          <span>{p.type}</span>
                          <span>{p.tag}</span>
                        </div>
                        <p>{p.text}</p>
                        {p.image && (
                          <div style={{ marginTop: '10px', borderRadius: '8px', overflow: 'hidden' }}>
                            <img src={p.image} alt="Attachment" style={{ width: '100%', maxHeight: '240px', objectFit: 'cover' }}/>
                          </div>
                        )}
                      </div>
                    </article>
                  ))
                )}
              </section>
            </>
          )}

          {tab === 'posts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {userPosts.length === 0 ? (
                <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--muted)' }}>
                  <p>You haven't published any posts yet.</p>
                </div>
              ) : (
                userPosts.map(p => (
                  <article className="post-card card" key={p.id}>
                    <div className="post-head">
                      <Avatar person={p.person} size="sm"/>
                      <div>
                        <strong>{p.person.name}</strong>
                        <p>{p.person.dept}</p>
                        <small>{p.time}</small>
                      </div>
                    </div>
                    <div className="post-body">
                      <div className="post-tags">
                        <span>{p.type}</span>
                        <span>{p.tag}</span>
                      </div>
                      <p>{p.text}</p>
                      {p.image && (
                        <div style={{ marginTop: '10px', borderRadius: '8px', overflow: 'hidden' }}>
                          <img src={p.image} alt="Attachment" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}/>
                        </div>
                      )}
                    </div>
                  </article>
                ))
              )}
            </div>
          )}

          {tab === 'achievements' && (
            <div className="card" style={{ padding: '24px' }}>
              <h2>Recognition & Badges</h2>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '14px' }}>
                {userBadges.map((badge: string) => (
                  <div key={badge} style={{ padding: '12px 18px', background: 'var(--surface)', borderRadius: '10px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>🌟</span>
                    <div>
                      <b style={{ display: 'block', fontSize: '13px' }}>{badge}</b>
                      <small style={{ color: 'var(--muted)', fontSize: '11px' }}>Awarded by colleagues</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside>
          <section className="card profile-section">
            <h2>Details</h2>
            <dl>
              <dt>Employee ID</dt><dd className="mono">{currentUser?.employeeId || currentUser?.id || 'EMP-001'}</dd>
              <dt>Department</dt><dd>{userDept}</dd>
              <dt>Role / Access</dt><dd>{currentUser?.role || 'EMPLOYEE'}</dd>
              <dt>Work Email</dt><dd style={{ wordBreak: 'break-all' }}>{currentUser?.email || `${userName.toLowerCase().replace(' ', '.')}@innovix.com`}</dd>
            </dl>
          </section>

          <section className="card profile-section">
            <h2>Skills & Endorsements</h2>
            <div className="chips">
              {skillsList.map((skill: string) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </section>

          <section className="card profile-section">
            <h2>Recognition</h2>
            <div className="recognition-row">
              <span><Icon name="spark"/></span>
              <div><b>Innovation Catalyst</b><p>{userKudosReceived || 4} peer kudos</p></div>
            </div>
            <div className="recognition-row">
              <span className="coral"><Icon name="heart"/></span>
              <div><b>Team Collaboration</b><p>{(userKudosReceived || 4) + 6} peer kudos</p></div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

function DepartmentsView({
  departments = [],
  navigate,
  onSelectDept
}: {
  departments: any[]
  navigate: (s: Screen) => void
  onSelectDept: (dept: string) => void
}) {
  const [search, setSearch] = useState('')

  const defaultDepts = [
    { name: 'Engineering', totalEmployees: 12, activeEmployees: 11, postCount: 14, leads: [{ name: 'Marcus Chen', initials: 'MC', tone: 'blue' }] },
    { name: 'Product Design', totalEmployees: 5, activeEmployees: 5, postCount: 8, leads: [{ name: 'Olivia Martin', initials: 'OM', tone: 'violet' }] },
    { name: 'People & Culture', totalEmployees: 4, activeEmployees: 4, postCount: 5, leads: [{ name: 'Priya Nair', initials: 'PN', tone: 'coral' }] },
    { name: 'Executive Leadership', totalEmployees: 3, activeEmployees: 3, postCount: 4, leads: [{ name: 'Alicia Rodriguez', initials: 'AR', tone: 'slate' }] },
  ];

  const list = departments.length > 0 ? departments : defaultDepts;
  const filtered = list.filter(d => (d.name || '').toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="wide-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">ORGANIZATION</span>
          <h1>Company Departments</h1>
          <p>Explore cross-functional teams, department leads, and employee distributions.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="secondary-button" onClick={() => navigate('employees')}>
            <Icon name="users" size={15}/> Directory
          </button>
        </div>
      </div>

      <div className="directory-tools card" style={{ marginBottom: '20px' }}>
        <div className="table-search" style={{ flex: 1 }}>
          <Icon name="search"/>
          <input
            placeholder="Search departments..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <span style={{ fontSize: '13px', color: 'var(--muted)', alignSelf: 'center' }}>
          <b>{filtered.length}</b> departments active
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px' }}>
        {filtered.map((d, i) => (
          <div className="card" key={d.name || i} style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className={`feature-icon f${i % 4}`} style={{ width: '40px', height: '40px', display: 'grid', placeItems: 'center', borderRadius: '10px' }}>
                  <Icon name="building" size={20}/>
                </span>
                <div>
                  <h2 style={{ fontSize: '17px', margin: 0, fontWeight: 700 }}>{d.name}</h2>
                  <small style={{ color: 'var(--muted)', fontSize: '12px' }}>{d.totalEmployees || 0} employees · {d.activeEmployees || 0} active</small>
                </div>
              </div>
              <span className="role-tag">{d.postCount || 0} posts</span>
            </div>

            {d.leads && d.leads.length > 0 && (
              <div style={{ background: 'var(--surface)', padding: '10px 14px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Avatar person={d.leads[0]} size="sm"/>
                <div>
                  <small style={{ display: 'block', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', fontWeight: 600 }}>Department Lead</small>
                  <b style={{ fontSize: '13px' }}>{d.leads[0].name}</b>
                </div>
              </div>
            )}

            {d.members && d.members.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: 'auto' }}>
                <div style={{ display: 'flex', marginLeft: '6px' }}>
                  {d.members.slice(0, 5).map((m: any, mi: number) => (
                    <span key={m.id || mi} style={{ marginLeft: mi === 0 ? 0 : '-8px', border: '2px solid var(--surface-card, #fff)', borderRadius: '50%' }}>
                      <Avatar person={m} size="sm"/>
                    </span>
                  ))}
                </div>
                {d.members.length > 5 && (
                  <small style={{ fontSize: '11px', color: 'var(--muted)', marginLeft: '4px' }}>+{d.members.length - 5} more</small>
                )}
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <button
                className="secondary-button"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => onSelectDept(d.name)}
              >
                <Icon name="users" size={14}/> View Members
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectsView({
  projects = [],
  navigate,
  onSelectTag,
  onNewPost
}: {
  projects: any[]
  navigate: (s: Screen) => void
  onSelectTag: (tag: string) => void
  onNewPost: (tag: string) => void
}) {
  const [search, setSearch] = useState('')

  const defaultProjects = [
    { name: 'Project Atlas', postCount: 9, latestUpdate: '14m ago', contributors: [{ name: 'Marcus Chen', initials: 'MC', tone: 'blue' }, { name: 'Daniel Kim', initials: 'DK', tone: 'green' }] },
    { name: 'Design Systems', postCount: 6, latestUpdate: '1h ago', contributors: [{ name: 'Olivia Martin', initials: 'OM', tone: 'violet' }] },
    { name: 'Growth Team', postCount: 5, latestUpdate: '2h ago', contributors: [{ name: 'Sophia Patel', initials: 'SP', tone: 'amber' }] },
    { name: 'New Hire Journey', postCount: 4, latestUpdate: 'Yesterday', contributors: [{ name: 'Priya Nair', initials: 'PN', tone: 'coral' }] },
  ];

  const list = projects.length > 0 ? projects : defaultProjects;
  const filtered = list.filter(p => (p.name || '').toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="wide-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">COLLABORATION</span>
          <h1>Active Projects</h1>
          <p>Track initiatives, cross-team milestones, and project discussions across the company.</p>
        </div>
        <button className="primary-button" onClick={() => onNewPost('Project Atlas')}>
          <Icon name="plus"/> Share Project Update
        </button>
      </div>

      <div className="directory-tools card" style={{ marginBottom: '20px' }}>
        <div className="table-search" style={{ flex: 1 }}>
          <Icon name="search"/>
          <input
            placeholder="Search projects by initiative tag..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <span style={{ fontSize: '13px', color: 'var(--muted)', alignSelf: 'center' }}>
          <b>{filtered.length}</b> projects active
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px' }}>
        {filtered.map((proj, i) => (
          <div className="card" key={proj.name || i} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className={`feature-icon f${(i + 1) % 4}`} style={{ width: '40px', height: '40px', display: 'grid', placeItems: 'center', borderRadius: '10px' }}>
                  <Icon name="folder" size={20}/>
                </span>
                <div>
                  <h2 style={{ fontSize: '17px', margin: 0, fontWeight: 700 }}>{proj.name}</h2>
                  <small style={{ color: 'var(--muted)', fontSize: '12px' }}>
                    {proj.latestUpdate ? `Updated ${proj.latestUpdate}` : 'Active initiative'}
                  </small>
                </div>
              </div>
              <span className="role-tag">{proj.postCount || 0} updates</span>
            </div>

            {proj.recentPosts && proj.recentPosts.length > 0 && (
              <div style={{ background: 'var(--surface)', padding: '10px 14px', borderRadius: '10px', fontSize: '12px' }}>
                <b style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>Latest update by {proj.recentPosts[0].author}:</b>
                <p style={{ margin: 0, color: 'var(--text)', fontStyle: 'italic', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  "{proj.recentPosts[0].text}"
                </p>
              </div>
            )}

            {proj.contributors && proj.contributors.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <small style={{ fontSize: '11px', color: 'var(--muted)' }}>Contributors:</small>
                <div style={{ display: 'flex', marginLeft: '4px' }}>
                  {proj.contributors.slice(0, 5).map((c: any, ci: number) => (
                    <span key={c.id || ci} style={{ marginLeft: ci === 0 ? 0 : '-8px', border: '2px solid var(--surface-card, #fff)', borderRadius: '50%' }}>
                      <Avatar person={c} size="sm"/>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <button
                className="secondary-button"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => onSelectTag(proj.name)}
              >
                <Icon name="spark" size={14}/> View Feed
              </button>
              <button
                className="secondary-button"
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => onNewPost(proj.name)}
              >
                <Icon name="plus" size={14}/> Post Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AchievementsView({
  achievements,
  onGiveKudos
}: {
  achievements: any
  onGiveKudos: () => void
}) {
  const totalKudos = achievements?.totalKudos || 6;
  const leaderboard = achievements?.leaderboard || [];
  const distribution = achievements?.kudosDistribution || {
    'Innovation Catalyst': 3,
    'Team Player & Collaboration': 2,
    'Customer Champion': 1
  };
  const stream = achievements?.recentKudos || [];

  return (
    <div className="wide-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">CULTURE & RECOGNITION</span>
          <h1>Achievements & Kudos</h1>
          <p>Celebrate peer contributions, milestone wins, and company impact.</p>
        </div>
        <button className="primary-button" onClick={onGiveKudos}>
          <Icon name="award"/> Award Kudos
        </button>
      </div>

      <div className="stat-grid" style={{ marginBottom: '20px' }}>
        <div className="stat-card card">
          <span><Icon name="award"/></span>
          <small>Total Kudos Awarded</small>
          <strong>{totalKudos}</strong>
          <p>Recognitions across teams</p>
        </div>
        <div className="stat-card card">
          <span><Icon name="spark"/></span>
          <small>Top Recognized</small>
          <strong>{leaderboard[0]?.user?.name || 'Marcus Chen'}</strong>
          <p>{leaderboard[0]?.count || 3} peer recognitions</p>
        </div>
        <div className="stat-card card">
          <span><Icon name="heart"/></span>
          <small>Active Kudos Badges</small>
          <strong>{Object.keys(distribution).length}</strong>
          <p>Recognition categories</p>
        </div>
        <div className="stat-card card">
          <span><Icon name="users"/></span>
          <small>Team Participation</small>
          <strong>96%</strong>
          <p>Engagement in appreciation</p>
        </div>
      </div>

      <div className="roles-layout">
        <aside className="roles-list card" style={{ padding: '20px' }}>
          <div className="roles-list-head" style={{ marginBottom: '14px' }}>
            <b>Recognition Leaderboard</b>
            <span>Top Contributors</span>
          </div>
          {leaderboard.length === 0 ? (
            <p style={{ color: 'var(--muted)', fontSize: '13px' }}>Start recognizing teammates in the company feed!</p>
          ) : (
            leaderboard.map((item: any, idx: number) => (
              <div
                key={item.user?.id || idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  background: idx === 0 ? 'var(--surface-highlight, rgba(92, 92, 226, 0.08))' : 'transparent',
                  border: idx === 0 ? '1px solid rgba(92, 92, 226, 0.2)' : 'none',
                  marginBottom: '6px'
                }}
              >
                <span style={{ fontWeight: 800, fontSize: '14px', width: '20px', color: idx === 0 ? '#f59e0b' : idx === 1 ? '#94a3b8' : '#b45309' }}>
                  #{idx + 1}
                </span>
                <Avatar person={item.user} size="sm"/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <b style={{ display: 'block', fontSize: '13px' }}>{item.user?.name}</b>
                  <small style={{ color: 'var(--muted)', fontSize: '11px' }}>{item.user?.department}</small>
                </div>
                <span className="role-tag" style={{ background: '#fef3c7', color: '#92400e', fontWeight: 700 }}>
                  🌟 {item.count}
                </span>
              </div>
            ))
          )}

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
            <b style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '10px' }}>Badge Types</b>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {Object.entries(distribution).map(([type, count]) => (
                <div key={type} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>{type}</span>
                  <b>{count as number}</b>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <section className="permissions-panel card">
          <div className="section-head" style={{ marginBottom: '16px' }}>
            <div>
              <h2>Recent Recognition Stream</h2>
              <p>Real-time celebrations and peer appreciation feed</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {stream.length === 0 ? (
              <p style={{ color: 'var(--muted)', fontSize: '13px' }}>No kudos awarded yet. Click "Award Kudos" to be the first!</p>
            ) : (
              stream.map((k: any, i: number) => (
                <div
                  key={k.id || i}
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    background: 'var(--surface)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '20px' }}>🌟</span>
                      <div>
                        <span style={{ fontSize: '13px' }}>
                          <b>{k.sender}</b> awarded <strong>{k.type}</strong> to <b>{k.recipient}</b>
                        </span>
                        <small style={{ display: 'block', color: 'var(--muted)', fontSize: '11px' }}>{k.recipientDept} · {k.time}</small>
                      </div>
                    </div>
                    <span className="role-tag">{k.projectTag || 'Project'}</span>
                  </div>
                  {k.postExcerpt && (
                    <div style={{ fontStyle: 'italic', fontSize: '12px', color: 'var(--text)', background: 'var(--surface-card, #fff)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      "{k.postExcerpt}"
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

function SettingsView({
  currentUser,
  currentCompany,
  workspaceSettings,
  onUpdateProfile,
  onChangePassword,
  onUpdateWorkspace,
  showToast,
  refreshData
}: {
  currentUser: any
  currentCompany: any
  workspaceSettings: any
  onUpdateProfile: (data: any) => Promise<boolean>
  onChangePassword: (data: any) => Promise<boolean>
  onUpdateWorkspace: (data: any) => Promise<boolean>
  showToast: (msg: string) => void
  refreshData: () => void
}) {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'workspace' | 'database'>('profile')

  // Profile Form State
  const [pName, setPName] = useState(currentUser?.name || '')
  const [pDesignation, setPDesignation] = useState(currentUser?.designation || currentUser?.role || '')
  const [pDepartment, setPDepartment] = useState(currentUser?.department || currentUser?.dept || 'Engineering')
  const [pBio, setPBio] = useState(currentUser?.bio || '')
  const [pSkills, setPSkills] = useState(currentUser?.skills || 'Design Systems, TypeScript, Full-Stack')
  const [savingProfile, setSavingProfile] = useState(false)

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [savingPassword, setSavingPassword] = useState(false)

  // Workspace Form State
  const [wsName, setWsName] = useState(currentCompany?.name || '')
  const [wsIndustry, setWsIndustry] = useState(workspaceSettings?.company?.industry || 'Enterprise Software')
  const [wsSize, setWsSize] = useState(workspaceSettings?.company?.companySize || '250-500 employees')
  const [wsWebsite, setWsWebsite] = useState(workspaceSettings?.company?.website || 'https://innovix.tech')
  const [savingWs, setSavingWs] = useState(false)

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSavingProfile(true)
    await onUpdateProfile({
      name: pName,
      designation: pDesignation,
      department: pDepartment,
      bio: pBio,
      skills: pSkills
    })
    setSavingProfile(false)
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match.')
      return
    }
    setSavingPassword(true)
    const ok = await onChangePassword({ currentPassword, newPassword })
    setSavingPassword(false)
    if (ok) {
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  const handleWorkspaceSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSavingWs(true)
    await onUpdateWorkspace({
      name: wsName,
      industry: wsIndustry,
      companySize: wsSize,
      website: wsWebsite
    })
    setSavingWs(false)
  }

  const testDb = async () => {
    try {
      const res = await apiCall('/database-status')
      showToast(`Database: ${res.primary} · Supabase Connected: ${res.supabase?.connected ? 'YES' : 'NO'}`)
      refreshData()
    } catch (e: any) {
      showToast('DB Status check failed: ' + e.message)
    }
  }

  return (
    <div className="wide-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">PREFERENCES & SYSTEM</span>
          <h1>Workspace Settings</h1>
          <p>Manage your account credentials, workspace configurations, and database infrastructure.</p>
        </div>
      </div>

      <div className="roles-layout">
        <aside className="roles-list card">
          <div className="roles-list-head"><b>Settings Menu</b></div>
          <button className={activeTab === 'profile' ? 'selected' : ''} onClick={() => setActiveTab('profile')}>
            <span className="role-icon"><Icon name="user"/></span>
            <div><b>Profile & Bio</b><small>Personal details and title</small></div>
          </button>
          <button className={activeTab === 'security' ? 'selected' : ''} onClick={() => setActiveTab('security')}>
            <span className="role-icon"><Icon name="lock"/></span>
            <div><b>Security & Auth</b><small>Change login password</small></div>
          </button>
          <button className={activeTab === 'workspace' ? 'selected' : ''} onClick={() => setActiveTab('workspace')}>
            <span className="role-icon"><Icon name="building"/></span>
            <div><b>Company Workspace</b><small>Organization info</small></div>
          </button>
          <button className={activeTab === 'database' ? 'selected' : ''} onClick={() => setActiveTab('database')}>
            <span className="role-icon"><Icon name="shield"/></span>
            <div><b>Database & Cloud</b><small>Supabase PostgreSQL status</small></div>
          </button>
        </aside>

        <section className="permissions-panel card" style={{ padding: '24px' }}>
          {activeTab === 'profile' && (
            <div>
              <div className="section-head" style={{ marginBottom: '18px' }}>
                <div>
                  <h2>Personal Profile Details</h2>
                  <p>Update your public identity displayed across the company network.</p>
                </div>
              </div>
              <form onSubmit={handleProfileSubmit} className="form-grid one">
                <label>
                  Full name
                  <input value={pName} onChange={e => setPName(e.target.value)} required />
                </label>
                <div className="field-row">
                  <label>
                    Designation / Role
                    <input value={pDesignation} onChange={e => setPDesignation(e.target.value)} />
                  </label>
                  <label>
                    Department
                    <select value={pDepartment} onChange={e => setPDepartment(e.target.value)}>
                      <option>Engineering</option>
                      <option>Product Design</option>
                      <option>Product</option>
                      <option>Marketing</option>
                      <option>People & Culture</option>
                      <option>Infrastructure</option>
                      <option>Executive Leadership</option>
                      <option>Executive Office</option>
                      <option>General</option>
                    </select>
                  </label>
                </div>
                <label>
                  Professional bio
                  <textarea rows={3} value={pBio} onChange={e => setPBio(e.target.value)} placeholder="Summary of what you do..." />
                </label>
                <label>
                  Skills & specialties
                  <input value={pSkills} onChange={e => setPSkills(e.target.value)} placeholder="Comma-separated skills" />
                </label>
                <div style={{ marginTop: '14px' }}>
                  <button type="submit" className="primary-button" disabled={savingProfile}>
                    {savingProfile ? 'Saving...' : 'Save Profile Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <div className="section-head" style={{ marginBottom: '18px' }}>
                <div>
                  <h2>Change Password</h2>
                  <p>Update your credentials with timing-safe validation and session refresh.</p>
                </div>
              </div>
              <form onSubmit={handlePasswordSubmit} className="form-grid one" style={{ maxWidth: '480px' }}>
                <label>
                  Current password
                  <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
                </label>
                <label>
                  New password (at least 6 characters with letters and numbers)
                  <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                </label>
                <label>
                  Confirm new password
                  <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                </label>
                <div style={{ marginTop: '14px' }}>
                  <button type="submit" className="primary-button" disabled={savingPassword}>
                    {savingPassword ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'workspace' && (
            <div>
              <div className="section-head" style={{ marginBottom: '18px' }}>
                <div>
                  <h2>Workspace Information</h2>
                  <p>Organization code and parameters for {currentCompany?.name}.</p>
                </div>
              </div>
              <form onSubmit={handleWorkspaceSubmit} className="form-grid one">
                <div className="field-row">
                  <label>
                    Company Name
                    <input value={wsName} onChange={e => setWsName(e.target.value)} required />
                  </label>
                  <label>
                    Workspace Code
                    <input value={currentCompany?.workspaceId || 'INX-48291'} readOnly style={{ background: 'var(--surface)', fontWeight: 'bold' }} />
                  </label>
                </div>
                <div className="field-row">
                  <label>
                    Industry
                    <input value={wsIndustry} onChange={e => setWsIndustry(e.target.value)} />
                  </label>
                  <label>
                    Company Size
                    <select value={wsSize} onChange={e => setWsSize(e.target.value)}>
                      <option>10-50 employees</option>
                      <option>50-100 employees</option>
                      <option>100-250 employees</option>
                      <option>250-500 employees</option>
                      <option>500+ employees</option>
                    </select>
                  </label>
                </div>
                <label>
                  Company Website
                  <input value={wsWebsite} onChange={e => setWsWebsite(e.target.value)} />
                </label>
                <div style={{ marginTop: '14px' }}>
                  <button type="submit" className="primary-button" disabled={savingWs}>
                    {savingWs ? 'Saving...' : 'Save Workspace Settings'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'database' && (
            <div>
              <div className="section-head" style={{ marginBottom: '18px' }}>
                <div>
                  <h2>Database & Infrastructure Status</h2>
                  <p>Dual-resilience database architecture: Supabase PostgreSQL + Local SQLite fallback.</p>
                </div>
                <button className="secondary-button" onClick={testDb}>
                  <Icon name="spark" size={15}/> Ping Database
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ padding: '16px', background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}/>
                    <b style={{ color: '#15803d', fontSize: '14px' }}>Primary Database: Supabase PostgreSQL 17 (ACTIVE_HEALTHY)</b>
                  </div>
                  <p style={{ margin: '8px 0 0 22px', fontSize: '12px', color: '#166534' }}>
                    Connected to remote PostgreSQL cluster on project <strong className="mono">qlcnvowuoulukxllatxt</strong> (Region: ap-northeast-2).
                  </p>
                </div>

                <div style={{ padding: '16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}>
                  <b style={{ fontSize: '13px' }}>Infrastructure Details</b>
                  <dl style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '8px', fontSize: '12px', marginTop: '10px' }}>
                    <dt style={{ color: 'var(--muted)' }}>Project Reference</dt>
                    <dd className="mono">qlcnvowuoulukxllatxt</dd>
                    <dt style={{ color: 'var(--muted)' }}>Supabase URL</dt>
                    <dd className="mono">https://qlcnvowuoulukxllatxt.supabase.co</dd>
                    <dt style={{ color: 'var(--muted)' }}>Database Version</dt>
                    <dd>PostgreSQL 17.6</dd>
                    <dt style={{ color: 'var(--muted)' }}>Offline Fallback</dt>
                    <dd>SQLite (data/company_connect.db) · Active Sync</dd>
                  </dl>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

function Modal({
  type,
  close,
  onCreatePost,
  onAddEmployee,
  onAddAnnouncement,
  kudosPost,
  onAwardKudos,
  editingEmployee,
  onUpdateEmployee,
  currentUser,
  currentCompany,
  onUpdateProfile,
  notifications,
  onMarkAllRead,
  onCreateRole
}: {
  type: string
  close: () => void
  onCreatePost: (p: { text: string; type: string; tag: string; image?: string }) => void
  onAddEmployee: (e: any) => void
  onAddAnnouncement: (a: any) => void
  kudosPost?: PostData | null
  onAwardKudos?: (postId: string, type: string) => void
  editingEmployee?: Person | null
  onUpdateEmployee?: (e: any) => void
  currentUser?: any
  currentCompany?: any
  onUpdateProfile?: (data: any) => Promise<boolean>
  notifications?: any[]
  onMarkAllRead?: () => void
  onCreateRole?: (role: any) => void
}) {
  const [done, setDone] = useState(false)
  const [closing, setClosing] = useState(false)

  // Post form state
  const [postText, setPostText] = useState('')
  const [postType, setPostType] = useState('Daily Work Update')
  const [postTag, setPostTag] = useState('Project Atlas')
  const [postImage, setPostImage] = useState<string | undefined>(undefined)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [urlInputValue, setUrlInputValue] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        alert('Photo must be under 25MB.')
        return
      }
      const reader = new FileReader()
      reader.onload = (ev) => {
        const raw = ev.target?.result as string
        if (!raw) return
        const img = new Image()
        img.onload = () => {
          const maxDim = 1600
          let w = img.width
          let h = img.height
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w)
              w = maxDim
            } else {
              w = Math.round((w * maxDim) / h)
              h = maxDim
            }
          }
          try {
            const canvas = document.createElement('canvas')
            canvas.width = w
            canvas.height = h
            const ctx = canvas.getContext('2d')
            if (ctx) {
              ctx.drawImage(img, 0, 0, w, h)
              const compressed = canvas.toDataURL('image/jpeg', 0.88)
              setPostImage(compressed)
              return
            }
          } catch (err) {}
          setPostImage(raw)
        }
        img.onerror = () => {
          setPostImage(raw)
        }
        img.src = raw
      }
      reader.readAsDataURL(file)
    }
    if (e.target) e.target.value = ''
  }

  const requestClose = () => {
    if (closing) return
    setClosing(true)
    window.setTimeout(close, 180)
  }

  const titles: Record<string, string> = {
    post: 'Create a post',
    employee: 'Add employee',
    'edit-employee': 'Edit Employee & Login Credentials',
    role: 'Create custom role',
    announcement: 'New announcement',
    notifications: 'Notifications',
    workspace: 'Switch workspace',
    kudos: 'Recognize a Colleague with Kudos',
    'edit-profile': 'Edit Profile'
  }

  return (
    <div
      className={`modal-backdrop ${closing ? 'is-closing' : ''}`}
      onMouseDown={requestClose}
    >
      <div
        className={`modal ${type === 'post' ? 'post-modal' : ''}`}
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="modal-head">
          <div>
            <h2>{done && type === 'employee' ? 'Employee created' : titles[type] || 'Dialog'}</h2>
            {type === 'employee' && !done && <p>Create an account and generate temporary credentials.</p>}
          </div>
          <button className="icon-button" onClick={requestClose}><Icon name="x"/></button>
        </div>

        {type === 'post' && (
          <>
            <div className="modal-user">
              <Avatar person={currentUser ? { initials: currentUser.initials, tone: currentUser.tone } : undefined}/>
              <div>
                <b>{currentUser ? currentUser.name : 'Olivia Martin'}</b>
                <span><Icon name="building" size={13}/> Everyone at {currentCompany?.name || 'Innovix'} <Icon name="chevron" size={13}/></span>
              </div>
            </div>

            <textarea
              className="post-editor"
              placeholder="What would you like to share? Work update, project win, or request for collaboration..."
              value={postText}
              onChange={e => setPostText(e.target.value)}
              rows={4}
            />

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />

            <div className="upload-zone" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                <Icon name="image" size={24}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <b style={{ display: 'block', fontSize: '13px' }}>Image Attachment</b>
                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted)' }}>
                    {postImage ? 'Photo attached · Ready to publish' : 'Select a photo from your computer or paste an image link'}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <Icon name="image" size={14}/> {postImage ? 'Change photo' : 'Upload photo'}
                  </button>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    Paste URL
                  </button>
                  {postImage && (
                    <button
                      type="button"
                      className="icon-button"
                      title="Remove photo"
                      onClick={() => setPostImage(undefined)}
                      style={{ color: '#e85f5f' }}
                    >
                      <Icon name="trash" size={16}/>
                    </button>
                  )}
                </div>
              </div>

              {showUrlInput && (
                <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '6px' }}>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/... or paste image URL"
                    value={urlInputValue}
                    onChange={e => setUrlInputValue(e.target.value)}
                    style={{ flex: 1, padding: '7px 11px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', fontSize: '12px' }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && urlInputValue.trim()) {
                        e.preventDefault();
                        setPostImage(urlInputValue.trim());
                        setShowUrlInput(false);
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => {
                      if (urlInputValue.trim()) {
                        setPostImage(urlInputValue.trim());
                        setShowUrlInput(false);
                      }
                    }}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {postImage && (
              <div style={{ position: 'relative', marginTop: '-8px', marginBottom: '16px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', background: '#000' }}>
                <img src={postImage} alt="Attachment preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', display: 'block' }}/>
                <button
                  type="button"
                  onClick={() => setPostImage(undefined)}
                  style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', color: '#fff', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="field-row">
              <label>
                Post type
                <select value={postType} onChange={e => setPostType(e.target.value)}>
                  <option>Daily Work Update</option>
                  <option>Project Progress</option>
                  <option>Employee Achievement</option>
                  <option>Team Celebration</option>
                  <option>Help Needed</option>
                </select>
              </label>
              <label>
                Project tag
                <select value={postTag} onChange={e => setPostTag(e.target.value)}>
                  <option>Project Atlas</option>
                  <option>Design Systems</option>
                  <option>Growth Team</option>
                  <option>New Hire Journey</option>
                  <option>Culture Club</option>
                </select>
              </label>
            </div>

            <div className="modal-footer">
              <button className="text-button" onClick={requestClose}>Cancel</button>
              <button
                className="primary-button"
                onClick={() => {
                  if (!postText.trim() && !postImage) {
                    alert('Please write a message or attach a photo to publish.')
                    return
                  }
                  onCreatePost({
                    text: postText.trim() || 'Shared a photo update.',
                    type: postType,
                    tag: postTag,
                    image: postImage
                  })
                  requestClose()
                }}
              >
                Publish post <Icon name="arrow" size={15}/>
              </button>
            </div>
          </>
        )}

        {type === 'employee' && (
          done ? (
            <CredentialSuccess close={requestClose}/>
          ) : (
            <FormFields
              type="employee"
              submit={(data) => {
                onAddEmployee(data)
                setDone(true)
              }}
              close={requestClose}
            />
          )
        )}

        {type === 'kudos' && kudosPost && (
          <KudosModal
            target={kudosPost}
            close={requestClose}
            onAward={(kType) => {
              if (onAwardKudos) onAwardKudos(kudosPost.id, kType)
              requestClose()
            }}
          />
        )}
        {type === 'role' && <CreateRoleModal close={requestClose} onSave={onCreateRole || (() => {})} />}
        {type === 'announcement' && (
          <FormFields
            type="announcement"
            submit={(data) => {
              onAddAnnouncement(data)
              requestClose()
            }}
            close={requestClose}
          />
        )}
        {type === 'edit-employee' && editingEmployee && (
          <EditEmployeeForm
            employee={editingEmployee}
            submit={(data) => {
              if (onUpdateEmployee) onUpdateEmployee(data)
              requestClose()
            }}
            close={requestClose}
          />
        )}
        {type === 'notifications' && <NotificationPanel notifications={notifications} onMarkAllRead={onMarkAllRead} close={requestClose}/>}
        {type === 'workspace' && <WorkspaceSwitch close={requestClose}/>}
        {type === 'edit-profile' && <EditProfileModal currentUser={currentUser} close={requestClose} onSave={onUpdateProfile || (async () => false)} />}
      </div>
    </div>
  )
}

function EditEmployeeForm({
  employee,
  submit,
  close
}: {
  employee: Person
  submit: (data: any) => void
  close: () => void
}) {
  const [name, setName] = useState(employee.name || '')
  const [employeeId, setEmployeeId] = useState(employee.employeeId || employee.id || '')
  const [email, setEmail] = useState(employee.email || '')
  const [dept, setDept] = useState(employee.dept || 'Engineering')
  const [designation, setDesignation] = useState(employee.role || 'Team Member')
  const [role, setRole] = useState(employee.role === 'ADMIN' || employee.role === 'Company Admin' ? 'ADMIN' : 'EMPLOYEE')
  const [status, setStatus] = useState(employee.status || 'Active')
  const [newPassword, setNewPassword] = useState('')

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      submit({
        id: employee.id,
        name: name.trim(),
        employeeId: employeeId.trim(),
        email: email.trim(),
        department: dept,
        designation: designation.trim(),
        role,
        status,
        password: newPassword.trim() || undefined
      });
    }}>
      <div className="form-grid">
        <label>
          Full name
          <input value={name} onChange={e => setName(e.target.value)} required/>
        </label>
        <label>
          Employee Login ID
          <input
            value={employeeId}
            onChange={e => setEmployeeId(e.target.value)}
            placeholder="e.g. EMP-1024"
            required
          />
          <small style={{ fontSize: '8px', color: 'var(--muted)', display: 'block', marginTop: '2px' }}>Used for employee sign-in credentials</small>
        </label>
        <label>
          Work email address
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
        </label>
        <label>
          Department
          <select value={dept} onChange={e => setDept(e.target.value)}>
            <option>Engineering</option>
            <option>Product Design</option>
            <option>Product</option>
            <option>Marketing</option>
            <option>People & Culture</option>
            <option>Infrastructure</option>
            <option>Product Management</option>
            <option>Executive Office</option>
          </select>
        </label>
        <label>
          Designation / Title
          <input value={designation} onChange={e => setDesignation(e.target.value)} required/>
        </label>
        <label>
          System role
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="EMPLOYEE">Employee</option>
            <option value="ADMIN">Company Administrator</option>
          </select>
        </label>
        <label>
          Account status
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="Active">Active (Permitted to log in)</option>
            <option value="Pending">Pending (Awaiting approval)</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>
        <label>
          Reset password (Optional)
          <input
            type="password"
            placeholder="Leave blank to keep current password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </label>
      </div>
      <div className="modal-footer">
        <button type="button" className="text-button" onClick={close}>Cancel</button>
        <button type="submit" className="primary-button">
          Save Credentials & Details <Icon name="check" size={14}/>
        </button>
      </div>
    </form>
  )
}

function FormFields({
  type,
  submit,
  close
}: {
  type: string
  submit: (data?: any) => void
  close?: () => void
}) {
  const [empName, setEmpName] = useState('Alex Morgan')
  const [empId, setEmpId] = useState('INX-2048')
  const [empEmail, setEmpEmail] = useState('alex.morgan@innovix.com')
  const [empDept, setEmpDept] = useState('Engineering')
  const [empRole, setEmpRole] = useState('Senior Software Engineer')
  const [empAssignedRole, setEmpAssignedRole] = useState('Employee')
  const [tempPassword, setTempPassword] = useState('Inx!24-Launch')

  const [annTitle, setAnnTitle] = useState('')
  const [annPriority, setAnnPriority] = useState('STANDARD')
  const [annMessage, setAnnMessage] = useState('')

  if (type === 'role') {
    return (
      <>
        <div className="form-grid one">
          <label>Role name<input placeholder="e.g. Project Coordinator"/></label>
          <label>Role description<textarea placeholder="Describe what this role is responsible for"/></label>
        </div>
        <div className="modal-permissions">
          <h3>Starting permissions</h3>
          {['Create posts', 'View employee directory', 'Create announcements', 'View company analytics'].map((x, i) => (
            <div key={x}>
              <span><b>{x}</b><small>{permissionDescription(x)}</small></span>
              <Toggle initial={i < 2}/>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button className="text-button" onClick={close}>Cancel</button>
          <button className="primary-button" onClick={() => submit()}>Save role</button>
        </div>
      </>
    )
  }

  if (type === 'announcement') {
    return (
      <>
        <div className="form-grid one">
          <label>
            Announcement title
            <input
              placeholder="What should everyone know?"
              value={annTitle}
              onChange={e => setAnnTitle(e.target.value)}
            />
          </label>
          <div className="field-row">
            <label>Audience<select><option>Entire company</option><option>Engineering only</option></select></label>
            <label>
              Priority
              <select value={annPriority} onChange={e => setAnnPriority(e.target.value)}>
                <option value="STANDARD">Standard</option>
                <option value="HIGH">High priority</option>
                <option value="URGENT">Urgent alert</option>
              </select>
            </label>
          </div>
          <label>
            Message
            <textarea
              rows={4}
              placeholder="Write a clear, helpful company announcement..."
              value={annMessage}
              onChange={e => setAnnMessage(e.target.value)}
            />
          </label>
        </div>
        <div className="modal-footer">
          <button className="text-button" onClick={close}>Save draft</button>
          <button
            className="primary-button"
            onClick={() => {
              if (!annTitle.trim()) { alert('Please enter an announcement title.'); return }
              submit({ title: annTitle, priority: annPriority, content: annMessage || 'Official company announcement.' })
            }}
          >
            Publish announcement
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="form-grid">
        <label>Full name<input value={empName} onChange={e => setEmpName(e.target.value)}/></label>
        <label>Employee ID<input value={empId} onChange={e => setEmpId(e.target.value)}/></label>
        <label>Employee email<input value={empEmail} onChange={e => setEmpEmail(e.target.value)}/></label>
        <label>
          Department
          <select value={empDept} onChange={e => setEmpDept(e.target.value)}>
            <option>Engineering</option>
            <option>Product Design</option>
            <option>Product</option>
            <option>Marketing</option>
            <option>People & Culture</option>
          </select>
        </label>
        <label>Designation<input value={empRole} onChange={e => setEmpRole(e.target.value)}/></label>
        <label>
          Assigned role
          <select value={empAssignedRole} onChange={e => setEmpAssignedRole(e.target.value)}>
            <option>Employee</option>
            <option>Team Lead</option>
            <option>HR Manager</option>
            <option>Company Admin</option>
          </select>
        </label>
        <label className="full">
          Temporary password
          <div className="input-action">
            <input value={tempPassword} readOnly/>
            <button
              type="button"
              onClick={() => setTempPassword('Inx!' + Math.floor(10 + Math.random() * 89) + '-Pass')}
            >
              <Icon name="spark" size={15}/>Generate
            </button>
          </div>
        </label>
      </div>
      <div className="modal-footer">
        <button className="text-button" onClick={close}>Cancel</button>
        <button
          className="primary-button"
          onClick={() => {
            submit({
              name: empName,
              id: empId,
              email: empEmail,
              dept: empDept,
              designation: empRole,
              role: empAssignedRole
            })
          }}
        >
          Create employee account
        </button>
      </div>
    </>
  )
}

function CredentialSuccess({ close }: { close: () => void }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="credential-success">
      <span className="success-icon"><Icon name="check" size={26}/></span>
      <h3>Alex is ready to join Innovix</h3>
      <p>Share these temporary credentials securely. Alex will choose a new password upon first login.</p>
      <div className="credential-box">
        <div><small>EMPLOYEE EMAIL</small><b>alex.morgan@innovix.com</b></div>
        <div><small>WORKSPACE ID</small><b>INX-48291</b></div>
        <div><small>TEMPORARY PASSWORD</small><b className="mono">Inx!24-Launch</b></div>
        <div><small>LOGIN URL</small><b>companyconnect.app/innovix</b></div>
      </div>
      <div className="credential-actions">
        <button
          className="secondary-button"
          onClick={() => {
            navigator.clipboard?.writeText('Email: alex.morgan@innovix.com | Workspace: INX-48291 | Pass: Inx!24-Launch')
            setCopied(true)
          }}
        >
          <Icon name={copied ? 'check' : 'copy'}/>
          {copied ? 'Copied to clipboard!' : 'Copy credentials'}
        </button>
        <button className="primary-button" onClick={close}>
          <Icon name="mail"/>Send invitation
        </button>
      </div>
    </div>
  )
}

function EditProfileModal({
  currentUser,
  close,
  onSave
}: {
  currentUser: any
  close: () => void
  onSave: (data: any) => Promise<boolean>
}) {
  const [name, setName] = useState(currentUser?.name || '')
  const [designation, setDesignation] = useState(currentUser?.designation || currentUser?.role || '')
  const [department, setDepartment] = useState(currentUser?.department || currentUser?.dept || 'Engineering')
  const [bio, setBio] = useState(currentUser?.bio || '')
  const [skills, setSkills] = useState(currentUser?.skills || 'Design Systems, Accessibility, Collaboration')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const ok = await onSave({ name, designation, department, bio, skills })
    setSaving(false)
    if (ok) close()
  }

  return (
    <form onSubmit={handleSubmit} className="form-grid one" style={{ padding: '8px 0' }}>
      <label>
        Full name
        <input value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <div className="field-row">
        <label>
          Designation / Job Title
          <input value={designation} onChange={e => setDesignation(e.target.value)} />
        </label>
        <label>
          Department
          <select value={department} onChange={e => setDepartment(e.target.value)}>
            <option>Engineering</option>
            <option>Product Design</option>
            <option>Product</option>
            <option>Marketing</option>
            <option>People & Culture</option>
            <option>Infrastructure</option>
            <option>Executive Leadership</option>
            <option>Executive Office</option>
            <option>General</option>
          </select>
        </label>
      </div>
      <label>
        About bio
        <textarea
          rows={3}
          value={bio}
          onChange={e => setBio(e.target.value)}
          placeholder="What do you work on? What drives your work?"
        />
      </label>
      <label>
        Skills & Endorsements (comma separated)
        <input
          value={skills}
          onChange={e => setSkills(e.target.value)}
          placeholder="TypeScript, PostgreSQL, UI/UX, Cloud"
        />
      </label>
      <div className="modal-footer">
        <button type="button" className="text-button" onClick={close}>Cancel</button>
        <button type="submit" className="primary-button" disabled={saving}>
          {saving ? 'Saving...' : 'Save Profile Changes'}
        </button>
      </div>
    </form>
  )
}

function CreateRoleModal({
  close,
  onSave
}: {
  close: () => void
  onSave: (role: any) => void
}) {
  const [roleName, setRoleName] = useState('')
  const [roleDesc, setRoleDesc] = useState('')
  const [permissions, setPermissions] = useState<string[]>([
    'Create posts',
    'Like posts',
    'Comment on posts',
    'View employee directory'
  ])

  const togglePermission = (perm: string) => {
    if (permissions.includes(perm)) {
      setPermissions(permissions.filter(p => p !== perm))
    } else {
      setPermissions([...permissions, perm])
    }
  }

  const allPerms = [
    'Create posts', 'Like posts', 'Comment on posts', 'Delete own posts',
    'View employee directory', 'Create employee accounts', 'Edit employee details',
    'Create announcements', 'Manage departments', 'View company analytics'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!roleName.trim()) {
      alert('Please enter a role name.')
      return
    }
    onSave({ name: roleName.trim(), desc: roleDesc.trim() || 'Custom workspace role', permissions })
    close()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid one">
        <label>Role name<input value={roleName} onChange={e => setRoleName(e.target.value)} placeholder="e.g. Project Coordinator" required /></label>
        <label>Role description<textarea value={roleDesc} onChange={e => setRoleDesc(e.target.value)} placeholder="Describe what this role is responsible for" /></label>
      </div>
      <div className="modal-permissions" style={{ maxHeight: '200px', overflowY: 'auto', marginTop: '12px' }}>
        <h3>Permissions ({permissions.length} selected)</h3>
        {allPerms.map((x) => (
          <div key={x} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
            <span><b>{x}</b><small style={{ display: 'block', fontSize: '11px', color: 'var(--muted)' }}>{permissionDescription(x)}</small></span>
            <button
              type="button"
              className={`toggle ${permissions.includes(x) ? 'on' : ''}`}
              onClick={() => togglePermission(x)}
              role="switch"
              aria-checked={permissions.includes(x)}
            >
              <i/>
            </button>
          </div>
        ))}
      </div>
      <div className="modal-footer">
        <button type="button" className="text-button" onClick={close}>Cancel</button>
        <button type="submit" className="primary-button">Create Role</button>
      </div>
    </form>
  )
}

function NotificationPanel({
  notifications = [],
  onMarkAllRead,
  close
}: {
  notifications?: any[]
  onMarkAllRead?: () => void
  close?: () => void
}) {
  const displayNotifs = notifications && notifications.length > 0 ? notifications : [
    { title: 'Welcome to Company Connect!', snippet: 'Your workspace is active and connected to Supabase.', time: 'Just now', icon: 'spark' },
    { title: 'Database Connected', snippet: 'Supabase PostgreSQL (ACTIVE_HEALTHY) is online.', time: '1m ago', icon: 'shield' }
  ];

  return (
    <div className="notifications">
      {displayNotifs.map((n, i) => (
        <button key={n.id || i} style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className={`notification-icon n${i % 4}`}>
            <Icon name={(n.icon || 'bell') as IconName}/>
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <b style={{ display: 'block', fontSize: '13px' }}>{n.title}</b>
            {n.snippet && <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', marginTop: '2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{n.snippet}</span>}
            <small style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>{n.time}</small>
          </div>
          {i === 0 && <i style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--brand)' }}/>}
        </button>
      ))}
      <button className="view-all" onClick={() => { if (onMarkAllRead) onMarkAllRead(); if (close) close(); }}>
        Mark all as read
      </button>
    </div>
  )
}

function WorkspaceSwitch({ close }: { close: () => void }) {
  return (
    <div className="workspace-switch">
      <p>You can switch between verified company workspaces.</p>
      <button className="selected">
        <span className="workspace-logo">IN</span>
        <div><b>Innovix Technologies</b><small>INX-48291 · Current workspace</small></div>
        <Icon name="check"/>
      </button>
      <button onClick={() => alert('Switched to Northstar Labs guest profile')}>
        <span className="workspace-logo alt">NS</span>
        <div><b>Northstar Labs</b><small>NSL-38420 · Guest collaborator</small></div>
        <Icon name="arrow"/>
      </button>
      <div className="modal-footer">
        <button className="secondary-button" onClick={close}>Cancel</button>
        <button className="primary-button" onClick={close}>Confirm workspace</button>
      </div>
    </div>
  )
}

function AuthFlow({
  screen,
  setScreen,
  enter,
  onLogin,
  onRegister,
  onEmployeeRegister,
  workspaceData
}: {
  screen: Exclude<AuthScreen, null>
  setScreen: (s: AuthScreen) => void
  enter: (admin: boolean) => void
  onLogin?: (ws: string, em: string, pw: string, isAdm: boolean) => Promise<boolean>
  onRegister?: (form: any) => Promise<boolean>
  onEmployeeRegister?: (form: any) => Promise<boolean>
  workspaceData?: any
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [workspaceId, setWorkspaceId] = useState('INX-48291')
  const [remember, setRemember] = useState(true)

  if (screen === 'portal') {
    return (
      <div className="auth-portal">
        <div className="portal-panel">
          <Logo light/>
          <div className="portal-copy">
            <span>YOUR ENTERPRISE, CONNECTED</span>
            <h1>Work feels better<br/>when everyone belongs.</h1>
            <p>A private, secure internal social media platform where employees celebrate achievements, share progress, and collaborate across teams.</p>
            <div className="portal-proof">
              <div className="avatar-stack">
                {initialPeople.slice(0, 4).map(p => <Avatar key={p.name} person={p} size="sm"/>)}
              </div>
              <span>Trusted by forward-thinking companies<br/><b>Private · Modern · Secure</b></span>
            </div>
          </div>
          <div className="portal-visual">
            <div className="floating-card fc1">
              <Avatar person={initialPeople[1]} size="sm"/>
              <p><b>Marcus Chen shipped Atlas v2</b><span>Engineering · Just now</span></p>
              <Icon name="check"/>
            </div>
            <div className="floating-card fc2">
              <span><Icon name="award"/></span>
              <p><b>Innovation Kudos</b><span>Olivia → Maya Lin</span></p>
            </div>
          </div>
        </div>

        <div className="auth-options">
          <div className="auth-options-inner">
            <div className="auth-mobile-brand"><Logo/></div>
            <span className="eyebrow">WELCOME TO COMPANY CONNECT</span>
            <h2>Choose your experience</h2>
            <p>Select your portal to enter your company network.</p>

            <button className="login-option primary-option" onClick={() => { setEmail(''); setPassword(''); setScreen('employee-login') }}>
              <span><Icon name="user"/></span>
              <div>
                <b>Employee Login</b>
                <small>Social feed, achievements, kudos & team updates</small>
              </div>
              <Icon name="arrow"/>
            </button>

            <button className="login-option" onClick={() => { setEmail(''); setPassword(''); setScreen('admin-login') }}>
              <span><Icon name="shield"/></span>
              <div>
                <b>Company Admin Login</b>
                <small>Manage employees, roles, announcements & analytics</small>
              </div>
              <Icon name="arrow"/>
            </button>

            <div className="auth-divider"><i/>New to Company Connect?<i/></div>

            <button className="create-workspace" onClick={() => setScreen('register')}>
              <Icon name="building"/>Create a company workspace
            </button>

            <button className="create-workspace" style={{ marginTop: '8px' }} onClick={() => setScreen('employee-register')}>
              <Icon name="user"/>Register as an employee
            </button>

            <small className="legal">Private internal enterprise environment · ISO-27001 compliant</small>
          </div>
        </div>
      </div>
    )
  }

  if (screen === 'register') return <Registration setScreen={setScreen} onRegister={onRegister}/>
  if (screen === 'employee-register') return <EmployeeRegistration setScreen={setScreen} onRegister={onEmployeeRegister}/>
  if (screen === 'workspace') return <WorkspaceCreated enter={() => enter(true)} workspaceData={workspaceData}/>

  const isAdmin = screen === 'admin-login'

  const handleDemoFill = (type: 'employee' | 'admin') => {
    if (type === 'admin') {
      setEmail('admin@innovix.com')
      setPassword('demo123')
      setWorkspaceId('INX-48291')
    } else {
      setEmail('employee@innovix.com')
      setPassword('demo123')
      setWorkspaceId('INX-48291')
    }
  }

  return (
    <div className="login-page">
      <div className="login-top">
        <Logo/>
        <button onClick={() => setScreen('portal')}><Icon name="arrow" size={15}/>Back to portal</button>
      </div>

      <div className="login-card card">
        <div className={`login-icon ${isAdmin ? 'admin' : ''}`}>
          <Icon name={isAdmin ? 'shield' : 'user'} size={26}/>
        </div>
        <span className="eyebrow">{isAdmin ? 'COMPANY MANAGEMENT' : 'EMPLOYEE WORKSPACE'}</span>
        <h1>{isAdmin ? 'Admin Sign In' : 'Employee Sign In'}</h1>
        <p>Enter your company credentials to access your workspace.</p>

        <div className="demo-badge-row">
          <button type="button" className="demo-pill" onClick={() => handleDemoFill(isAdmin ? 'admin' : 'employee')}>
            ⚡ 1-Click Demo Credentials ({isAdmin ? 'admin@innovix.com' : 'employee@innovix.com'})
          </button>
        </div>

        <div className="identified-workspace">
          <span className="workspace-logo">IN</span>
          <div>
            <b>Innovix Technologies</b>
            <small>Workspace: {workspaceId} · companyconnect.app/innovix</small>
          </div>
          <Icon name="check"/>
        </div>

        <form onSubmit={async (e) => {
          e.preventDefault();
          if (onLogin) {
            const ok = await onLogin(workspaceId, email, password, isAdmin);
            if (!ok) return;
          } else {
            enter(isAdmin);
          }
        }}>
          <label>
            Workspace ID
            <div className="input-icon">
              <Icon name="building"/>
              <input
                type="text"
                value={workspaceId}
                onChange={e => setWorkspaceId(e.target.value)}
                placeholder="e.g. INX-48291"
                required
              />
            </div>
          </label>

          <label>
            {isAdmin ? 'Admin email or ID' : 'Work email or Employee ID'}
            <div className="input-icon">
              <Icon name="mail"/>
              <input
                type="text"
                placeholder={isAdmin ? 'admin@innovix.com or EMP-001' : 'employee@innovix.com or EMP-1024'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </label>

          <label>
            Password
            <a href="#forgot" onClick={e => { e.preventDefault(); alert('Please contact your administrator to reset your credentials.'); }}>Forgot password?</a>
            <div className="input-icon" style={{ position: 'relative' }}>
              <Icon name="lock"/>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: 10, background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
                title={showPass ? 'Hide password' : 'Show password'}
              >
                <Icon name={showPass ? 'eye-off' : 'eye'} size={16}/>
              </button>
            </div>
          </label>

          <label className="checkbox">
            <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}/>
            Remember me on this trusted device
          </label>

          <button className="primary-button auth-submit">
            Sign in securely <Icon name="arrow"/>
          </button>
        </form>

        <div className="switch-login">
          Not an {isAdmin ? 'admin' : 'employee'}?{' '}
          <button onClick={() => setScreen(isAdmin ? 'employee-login' : 'admin-login')}>
            Switch to {isAdmin ? 'employee' : 'admin'} login
          </button>
        </div>
        {!isAdmin && (
          <div className="switch-login" style={{ marginTop: '8px' }}>
            New to the company?{' '}
            <button onClick={() => setScreen('employee-register')}>
              Register as employee
            </button>
          </div>
        )}
      </div>

      <div className="security-note">
        <Icon name="lock" size={15}/>Enterprise grade encryption & strict privacy
      </div>
    </div>
  )
}

function EmployeeRegistration({
  setScreen,
  onRegister
}: {
  setScreen: (s: AuthScreen) => void
  onRegister?: (form: any) => Promise<boolean>
}) {
  const [workspaceId, setWorkspaceId] = useState('INX-48291')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [dept, setDept] = useState('Engineering')
  const [designation, setDesignation] = useState('Senior Software Engineer')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (submitted) {
    return (
      <div className="login-page">
        <div className="login-card card" style={{ maxWidth: '520px', padding: '36px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fef3c7', color: '#b45309', display: 'grid', placeItems: 'center', margin: '0 auto 16px', fontSize: '24px' }}>
            ⏳
          </div>
          <span className="eyebrow" style={{ color: '#b45309' }}>REGISTRATION SUBMITTED</span>
          <h1 style={{ fontSize: '22px' }}>Awaiting Admin Approval</h1>
          <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: '1.6', margin: '10px 0 20px' }}>
            Thank you, <b>{name}</b>! Your account has been registered for workspace <b>{workspaceId}</b> with status <b>Pending</b>.
            Your company administrator has been notified to review and approve your access.
          </p>
          <div style={{ background: '#f8f9fc', border: '1px solid var(--line)', borderRadius: '10px', padding: '14px', textAlign: 'left', marginBottom: '20px', fontSize: '12px' }}>
            <div><strong>Registered Email:</strong> <span style={{ color: 'var(--brand)' }}>{email}</span></div>
            <div style={{ marginTop: '4px' }}><strong>Department:</strong> {dept} · {designation}</div>
            <div style={{ marginTop: '4px' }}><strong>Status:</strong> <span style={{ color: '#d97706', fontWeight: 600 }}>Pending Approval</span></div>
          </div>
          <button
            className="primary-button"
            style={{ width: '100%' }}
            onClick={() => setScreen('employee-login')}
          >
            Go to Employee Login <Icon name="arrow" size={14}/>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="login-page">
      <div className="login-top">
        <Logo/>
        <button onClick={() => setScreen('portal')}><Icon name="arrow" size={15}/>Back to portal</button>
      </div>

      <div className="login-card card" style={{ maxWidth: '520px', padding: '32px' }}>
        <div className="login-icon">
          <Icon name="user" size={26}/>
        </div>
        <span className="eyebrow">EMPLOYEE JOIN REQUEST</span>
        <h1>Register as Employee</h1>
        <p>Create your profile. Your administrator will verify and approve your account.</p>

        <form onSubmit={async (e) => {
          e.preventDefault()
          if (password !== confirmPassword) {
            alert('Passwords do not match. Please verify.')
            return
          }
          if (password.length < 6) {
            alert('Password must be at least 6 characters.')
            return
          }
          setSubmitting(true)
          if (onRegister) {
            const ok = await onRegister({
              workspaceId,
              name,
              email,
              department: dept,
              designation,
              password
            })
            setSubmitting(false)
            if (ok) {
              setSubmitted(true)
            }
          } else {
            setSubmitting(false)
            setSubmitted(true)
          }
        }}>
          <label>
            Company Workspace ID
            <div className="input-icon">
              <Icon name="building"/>
              <input
                value={workspaceId}
                onChange={e => setWorkspaceId(e.target.value)}
                placeholder="e.g. INX-48291"
                required
              />
            </div>
          </label>

          <label>
            Full Name
            <div className="input-icon">
              <Icon name="user"/>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Taylor Swift"
                required
              />
            </div>
          </label>

          <label>
            Corporate Work Email
            <div className="input-icon">
              <Icon name="mail"/>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="e.g. taylor@innovix.com"
                required
              />
            </div>
          </label>

          <div className="field-row" style={{ marginTop: '12px' }}>
            <label>
              Department
              <select value={dept} onChange={e => setDept(e.target.value)}>
                <option>Engineering</option>
                <option>Product Design</option>
                <option>Product</option>
                <option>Marketing</option>
                <option>People & Culture</option>
                <option>Infrastructure</option>
                <option>Product Management</option>
              </select>
            </label>
            <label>
              Designation / Role
              <input
                value={designation}
                onChange={e => setDesignation(e.target.value)}
                placeholder="e.g. Systems Engineer"
                style={{ width: '100%', border: '1px solid #dfe0e5', borderRadius: '8px', padding: '9px 10px', fontSize: '10px', marginTop: '5px' }}
                required
              />
            </label>
          </div>

          <label style={{ marginTop: '12px' }}>
            Password
            <div className="input-icon">
              <Icon name="lock"/>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Choose a password (min 6 characters)"
                required
              />
            </div>
          </label>

          <label>
            Confirm Password
            <div className="input-icon">
              <Icon name="lock"/>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
          </label>

          <button className="primary-button auth-submit" disabled={submitting} style={{ marginTop: '18px' }}>
            {submitting ? 'Submitting Registration...' : 'Submit Registration for Approval'} <Icon name="arrow"/>
          </button>
        </form>

        <div className="switch-login">
          Already have an approved account?{' '}
          <button onClick={() => setScreen('employee-login')}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  )
}

function Registration({ setScreen, onRegister }: { setScreen: (s: AuthScreen) => void; onRegister?: (f: any) => Promise<boolean> }) {
  const [step, setStep] = useState(1)
  const [compName, setCompName] = useState('Innovix Technologies')
  const [industry, setIndustry] = useState('Technology & Software')
  const [compSize, setCompSize] = useState('201–500 employees')
  const [compEmail, setCompEmail] = useState('hello@innovix.com')
  const [compWebsite, setCompWebsite] = useState('https://innovix.com')
  const [adminName, setAdminName] = useState('Alicia Rodriguez')
  const [adminEmail, setAdminEmail] = useState('alicia@innovix.com')

  return (
    <div className="registration-page">
      <header>
        <Logo/>
        <button onClick={() => setScreen('portal')}>Exit setup <Icon name="x" size={16}/></button>
      </header>

      <div className="registration-shell">
        <aside>
          <span className="eyebrow">WORKSPACE SETUP</span>
          <h1>Create your company space.</h1>
          <p>A secure, private home for your people, culture, and projects.</p>
          <div className="step-list">
            {[
              ['Company information', 'Tell us about your organization'],
              ['Administrator account', 'Create your master admin access'],
              ['Launch workspace', 'Generate Workspace ID & invite team']
            ].map((x, i) => (
              <div className={`${step === i + 1 ? 'active' : ''} ${step > i + 1 ? 'done' : ''}`} key={x[0]}>
                <span>{step > i + 1 ? <Icon name="check" size={15}/> : i + 1}</span>
                <div><b>{x[0]}</b><small>{x[1]}</small></div>
              </div>
            ))}
          </div>
        </aside>

        <main>
          <div className="form-title">
            <span>STEP {step} OF 3</span>
            <h2>{step === 1 ? 'Company Details' : step === 2 ? 'Master Admin Account' : 'Confirm & Launch Workspace'}</h2>
            <p>{step === 1 ? 'This information customizes your private company social network.' : step === 2 ? 'You will use this administrator account to manage your workspace.' : 'Review your company setup before generating your unique Workspace ID.'}</p>
          </div>

          {step === 1 ? (
            <div className="form-grid">
              <label className="full">
                Company logo
                <div className="logo-upload">
                  <span><Icon name="image"/></span>
                  <div><b>Upload your company logo</b><small>PNG, JPG, or SVG · Max 5 MB</small></div>
                  <button type="button" onClick={() => alert('Logo uploaded successfully!')}>Choose file</button>
                </div>
              </label>
              <label className="full">Company name<input value={compName} onChange={e => setCompName(e.target.value)}/></label>
              <label>
                Industry
                <select value={industry} onChange={e => setIndustry(e.target.value)}>
                  <option>Technology & Software</option>
                  <option>Healthcare & Biotech</option>
                  <option>Financial Services</option>
                  <option>Creative & Media</option>
                </select>
              </label>
              <label>
                Company size
                <select value={compSize} onChange={e => setCompSize(e.target.value)}>
                  <option>1–50 employees</option>
                  <option>51–200 employees</option>
                  <option>201–500 employees</option>
                  <option>500+ employees</option>
                </select>
              </label>
              <label>Company email<input value={compEmail} onChange={e => setCompEmail(e.target.value)}/></label>
              <label>Company website<input value={compWebsite} onChange={e => setCompWebsite(e.target.value)}/></label>
              <label className="full">Company description<textarea defaultValue="Building innovative tools for modern enterprise collaboration."/></label>
            </div>
          ) : step === 2 ? (
            <div className="form-grid one">
              <label>Administrator full name<input value={adminName} onChange={e => setAdminName(e.target.value)}/></label>
              <label>Admin email<input value={adminEmail} onChange={e => setAdminEmail(e.target.value)}/></label>
              <label>Password<input type="password" defaultValue="demo1234"/></label>
              <label>Confirm password<input type="password" defaultValue="demo1234"/></label>
              <div className="password-hint">
                <span><Icon name="check" size={14}/>8+ characters</span>
                <span><Icon name="check" size={14}/>One number</span>
                <span><Icon name="check" size={14}/>One symbol</span>
              </div>
            </div>
          ) : (
            <div className="review-card">
              <span className="workspace-logo large">IN</span>
              <div>
                <small>REGISTERED COMPANY</small>
                <b>{compName}</b>
                <p>{industry} · {compSize}</p>
              </div>
              <hr/>
              <div>
                <small>MASTER ADMINISTRATOR</small>
                <b>{adminName}</b>
                <p>{adminEmail}</p>
              </div>
              <div className="secure-callout">
                <Icon name="shield"/>
                <span>
                  <b>Your workspace is 100% private by default</b>
                  <small>Only verified domain emails or invited users can access your company feed.</small>
                </span>
              </div>
            </div>
          )}

          <div className="registration-actions">
            <button className="secondary-button" onClick={() => step === 1 ? setScreen('portal') : setStep(step - 1)}>
              Back
            </button>
            <button className="primary-button" onClick={async () => {
              if (step < 3) {
                setStep(step + 1);
              } else {
                if (onRegister) {
                  await onRegister({
                    companyName: compName,
                    industry,
                    companySize: compSize,
                    companyEmail: compEmail,
                    website: compWebsite,
                    adminName,
                    adminEmail,
                    password: 'password123'
                  });
                } else {
                  setScreen('workspace');
                }
              }
            }}>
              {step === 3 ? 'Generate Workspace' : 'Continue'} <Icon name="arrow" size={15}/>
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

function WorkspaceCreated({ enter, workspaceData }: { enter: () => void; workspaceData?: any }) {
  const [copied, setCopied] = useState(false)
  const currentWsId = workspaceData?.workspaceId || 'INX-48291';
  const compTitle = workspaceData?.company?.name || 'Innovix Technologies';
  const compDetails = (workspaceData?.company?.industry || 'Technology & Software') + ' · ' + (workspaceData?.company?.companySize || 'Enterprise');
  return (
    <div className="created-page">
      <div className="created-card card">
        <div className="celebrate-icon"><Icon name="check" size={30}/></div>
        <span className="eyebrow">WORKSPACE CREATED SUCCESSFULLY</span>
        <h1>Welcome to Company Connect.</h1>
        <p>Your private {compTitle} workspace is now live. Share the Workspace ID with your employees.</p>
        <div className="created-company">
          <span className="workspace-logo large">{compTitle.slice(0, 2).toUpperCase()}</span>
          <div><b>{compTitle}</b><small>{compDetails}</small></div>
        </div>
        <div className="workspace-id">
          <small>YOUR COMPANY WORKSPACE ID</small>
          <strong>{currentWsId}</strong>
          <button onClick={() => { navigator.clipboard?.writeText(currentWsId); setCopied(true) }}>
            <Icon name={copied ? 'check' : 'copy'} size={16}/>{copied ? 'Copied!' : 'Copy ID'}
          </button>
        </div>
        <div className="workspace-url">
          <span><Icon name="external"/></span>
          <div><small>WORKSPACE ACCESS PORTAL</small><b>{window.location.host || 'localhost:3000'}</b></div>
          <button onClick={() => { navigator.clipboard?.writeText(window.location.origin); alert('Portal link copied to clipboard!') }}><Icon name="copy"/></button>
        </div>
        <div className="info-note">
          <Icon name="help"/>
          <p>Employees use this Workspace ID ({currentWsId}) to register and log in. It is safe to share across your corporate channels.</p>
        </div>
        <div className="created-actions">
          <button className="secondary-button" onClick={enter}><Icon name="user-check"/>Manage employees</button>
          <button className="primary-button" onClick={enter}>Continue to admin dashboard <Icon name="arrow"/></button>
        </div>
      </div>
    </div>
  )
}


function KudosModal({
  target,
  close,
  onAward
}: {
  target: PostData
  close: () => void
  onAward: (type: string) => void
}) {
  const [selectedType, setSelectedType] = useState('Innovation Catalyst')
  const options = [
    { type: 'Innovation Catalyst', icon: 'spark', desc: 'For breakthrough thinking, creative solutions, and technical craft' },
    { type: 'Team Player & Collaboration', icon: 'heart', desc: 'For seamless cross-team support and lifting the team up' },
    { type: 'High Velocity & Impact', icon: 'award', desc: 'For moving fast with quality and delivering on commitments' },
    { type: 'Problem Solver', icon: 'check', desc: 'For debugging complex issues and finding clean solutions' },
  ]

  return (
    <div style={{ padding: '8px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', padding: '12px 14px', background: 'var(--soft)', borderRadius: '10px' }}>
        <Avatar person={target.person} size="md"/>
        <div>
          <b style={{ fontSize: '13px', color: 'var(--ink)' }}>Recognize {target.person.name}</b>
          <p style={{ margin: '2px 0 0', fontSize: '11px', color: 'var(--muted)' }}>{target.person.role} · {target.person.dept}</p>
        </div>
      </div>

      <p style={{ fontSize: '11px', color: 'var(--muted)', margin: '0 0 10px' }}>Choose a kudos badge to celebrate on this update:</p>

      <div className="kudos-modal-grid">
        {options.map(opt => (
          <div
            key={opt.type}
            className={`kudos-option-card ${selectedType === opt.type ? 'selected' : ''}`}
            onClick={() => setSelectedType(opt.type)}
          >
            <span className="kudos-option-icon"><Icon name={opt.icon as IconName} size={18}/></span>
            <div>
              <b>{opt.type}</b>
              <p>{opt.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="modal-footer" style={{ marginTop: '20px' }}>
        <button className="text-button" onClick={close}>Cancel</button>
        <button className="primary-button" onClick={() => onAward(selectedType)}>
          <Icon name="award" size={16}/>Award Kudos to {target.person.name.split(' ')[0]}
        </button>
      </div>
    </div>
  )
}
