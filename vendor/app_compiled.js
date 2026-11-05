var useState = React.useState;
var useMemo = React.useMemo;
var useEffect = React.useEffect;
var useRef = React.useRef;
const paths = {
  home: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "m3 11 9-8 9 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 10v10h14V10M9 20v-6h6v6"
  })),
  users: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "7",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
  })),
  building: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 21h18M6 21V4h12v17M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"
  })),
  award: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 12 7 22l5-3 5 3-1.5-10"
  })),
  megaphone: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "m3 11 18-5v12L3 14v-3Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m11.6 16 1.4 5H8l-1.5-6"
  })),
  folder: /*#__PURE__*/React.createElement("path", {
    d: "M3 6h7l2 2h9v11H3V6Z"
  }),
  user: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 21a8 8 0 0 1 16 0"
  })),
  settings: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.1A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.1A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.1A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.36.28.58.68.6 1.1v.1h1v4h-.1a1.7 1.7 0 0 0-1.5.8Z"
  })),
  search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m20 20-4-4"
  })),
  bell: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"
  })),
  chevron: /*#__PURE__*/React.createElement("path", {
    d: "m8 10 4 4 4-4"
  }),
  plus: /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  }),
  image: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "16",
    rx: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "9",
    r: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 15-5-5L5 20"
  })),
  heart: /*#__PURE__*/React.createElement("path", {
    d: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
  }),
  comment: /*#__PURE__*/React.createElement("path", {
    d: "M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
  }),
  share: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "5",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "19",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m8.6 10.5 6.8-4M8.6 13.5l6.8 4"
  })),
  more: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "12",
    r: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "12",
    r: "1"
  })),
  spark: /*#__PURE__*/React.createElement("path", {
    d: "m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3ZM19 17l.7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z"
  }),
  calendar: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "5",
    width: "18",
    height: "16",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 3v4M8 3v4M3 10h18"
  })),
  briefcase: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "7",
    width: "18",
    height: "13",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 7V4h6v3M3 12h18"
  })),
  chart: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M4 20V10M10 20V4M16 20v-7M22 20H2"
  })),
  shield: /*#__PURE__*/React.createElement("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
  }),
  check: /*#__PURE__*/React.createElement("path", {
    d: "m5 12 4 4L19 6"
  }),
  copy: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "9",
    y: "9",
    width: "11",
    height: "11",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3"
  })),
  mail: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "5",
    width: "18",
    height: "14",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m3 7 9 6 9-6"
  })),
  lock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
    x: "4",
    y: "10",
    width: "16",
    height: "11",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 10V7a4 4 0 0 1 8 0v3"
  })),
  arrow: /*#__PURE__*/React.createElement("path", {
    d: "m5 12 14 0M13 6l6 6-6 6"
  }),
  menu: /*#__PURE__*/React.createElement("path", {
    d: "M4 7h16M4 12h16M4 17h16"
  }),
  x: /*#__PURE__*/React.createElement("path", {
    d: "m6 6 12 12M18 6 6 18"
  }),
  edit: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 20h9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"
  })),
  trash: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v5M14 11v5"
  })),
  filter: /*#__PURE__*/React.createElement("path", {
    d: "M4 5h16l-6 7v6l-4 2v-8Z"
  }),
  help: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.1 9a3 3 0 1 1 5.2 2c-1.3 1.3-2.3 1.6-2.3 3M12 18h.01"
  })),
  logout: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M10 17l5-5-5-5M15 12H3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 3h7v18h-7"
  })),
  external: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M14 3h7v7M10 14 21 3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 14v6H4V3h6"
  })),
  clock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7v5l3 2"
  })),
  eye: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  })),
  'eye-off': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 20"
  }))
};
function Icon({
  name,
  size = 18,
  fill = 'none'
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill,
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true"
  }, paths[name]);
}
const initialPeople = [{
  id: 'user_olivia',
  employeeId: 'EMP-1024',
  name: 'Olivia Martin',
  initials: 'OM',
  role: 'Senior Product Designer',
  dept: 'Product Design',
  tone: 'violet',
  email: 'employee@innovix.com',
  status: 'Active'
}, {
  id: 'user_marcus',
  employeeId: 'EMP-1025',
  name: 'Marcus Chen',
  initials: 'MC',
  role: 'Engineering Lead',
  dept: 'Engineering',
  tone: 'blue',
  email: 'marcus@innovix.com',
  status: 'Active'
}, {
  id: 'user_priya',
  employeeId: 'EMP-1026',
  name: 'Priya Nair',
  initials: 'PN',
  role: 'People Operations',
  dept: 'People & Culture',
  tone: 'coral',
  email: 'priya@innovix.com',
  status: 'Active'
}, {
  id: 'user_daniel',
  employeeId: 'EMP-1027',
  name: 'Daniel Kim',
  initials: 'DK',
  role: 'Product Manager',
  dept: 'Infrastructure',
  tone: 'green',
  email: 'daniel@innovix.com',
  status: 'Active'
}, {
  id: 'user_sophia',
  employeeId: 'EMP-1028',
  name: 'Sophia Patel',
  initials: 'SP',
  role: 'Senior Product Manager',
  dept: 'Product Management',
  tone: 'amber',
  email: 'sophia@innovix.com',
  status: 'Active'
}, {
  id: 'user_james',
  employeeId: 'EMP-1029',
  name: 'James Wilson',
  initials: 'JW',
  role: 'Frontend Platform Engineer',
  dept: 'Engineering',
  tone: 'violet',
  email: 'james@innovix.com',
  status: 'Active'
}];
function Avatar({
  person = initialPeople[0],
  size = 'md'
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: `avatar avatar-${size} avatar-${person.tone || 'violet'}`
  }, person.initials);
}
function Logo({
  light = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `brand ${light ? 'brand-light' : ''}`
  }, /*#__PURE__*/React.createElement("span", {
    className: "brand-mark"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), /*#__PURE__*/React.createElement("span", null, "Company ", /*#__PURE__*/React.createElement("b", null, "Connect")));
}
const employeeNav = [{
  label: 'Home',
  icon: 'home',
  screen: 'home'
}, {
  label: 'Company Feed',
  icon: 'spark',
  screen: 'home'
}, {
  label: 'Employees',
  icon: 'users',
  screen: 'employees'
}, {
  label: 'Departments',
  icon: 'building',
  screen: 'departments'
}, {
  label: 'Projects',
  icon: 'folder',
  screen: 'projects'
}, {
  label: 'Announcements',
  icon: 'megaphone',
  screen: 'announcements'
}, {
  label: 'Achievements',
  icon: 'award',
  screen: 'achievements'
}, {
  label: 'Profile',
  icon: 'user',
  screen: 'profile'
}, {
  label: 'Settings',
  icon: 'settings',
  screen: 'settings'
}];
const adminNav = [{
  label: 'Overview',
  icon: 'chart',
  screen: 'admin'
}, {
  label: 'Employees',
  icon: 'users',
  screen: 'employees'
}, {
  label: 'Roles & Permissions',
  icon: 'shield',
  screen: 'roles'
}, {
  label: 'Departments',
  icon: 'building',
  screen: 'departments'
}, {
  label: 'Company Posts',
  icon: 'folder',
  screen: 'home'
}, {
  label: 'Announcements',
  icon: 'megaphone',
  screen: 'announcements'
}, {
  label: 'Analytics',
  icon: 'spark',
  screen: 'admin'
}, {
  label: 'Workspace Settings',
  icon: 'settings',
  screen: 'settings'
}];
const initialPostsData = [{
  id: 'post-1',
  person: initialPeople[1],
  type: 'PROJECT PROGRESS',
  time: '42 min ago',
  tag: 'Project Atlas',
  likes: 38,
  liked: false,
  kudos: [{
    type: 'Innovation Catalyst',
    from: 'Olivia Martin'
  }],
  text: 'A big milestone for Atlas today! We have completed the new analytics architecture and cut dashboard query latencies by 62%. Huge thanks to the platform team for the thoughtful PR reviews.',
  image: 'https://images.unsplash.com/photo-1573879409095-e47e5759ed0f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=1200&h=620',
  comments: [{
    id: 'c1',
    author: 'Olivia Martin',
    avatar: 'OM',
    time: '28 min ago',
    text: 'Incredible performance leap Marcus! The chart interactions feel instantaneous now.'
  }, {
    id: 'c2',
    author: 'Daniel Kim',
    avatar: 'DK',
    time: '14 min ago',
    text: 'Customers in the pilot are going to love this speed. Kudos team!'
  }]
}, {
  id: 'post-2',
  person: initialPeople[4],
  type: 'TEAM CELEBRATION',
  time: '2 hr ago',
  tag: 'Growth Team',
  likes: 64,
  liked: false,
  kudos: [{
    type: 'Team Player & Collaboration',
    from: 'Marcus Chen'
  }],
  text: 'The spring campaign is live! From the first creative workshop to multi-channel deployment, this was true cross-functional collaboration. Proud of what our team shipped together.',
  image: 'https://images.unsplash.com/photo-1573879403319-4412126a561b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=1200&h=620',
  comments: [{
    id: 'c3',
    author: 'Priya Nair',
    avatar: 'PN',
    time: '1 hr ago',
    text: 'The energy on this project was contagious! Beautifully executed.'
  }]
}];

// ==========================================
// BACKEND API CLIENT
// ==========================================
const API_BASE = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port === '3000' ? '/api' : 'https://company-connect-api.onrender.com/api';
async function apiCall(endpoint, method = 'GET', body) {
  const token = localStorage.getItem('cc_token');
  const headers = {
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
  let data;
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
function App() {
  const [auth, setAuth] = useState('portal');
  const [adminMode, setAdminMode] = useState(false);
  const [screen, setScreen] = useState('home');
  const [mobileNav, setMobileNav] = useState(false);
  const [modal, setModal] = useState(null);
  const [kudosPost, setKudosPost] = useState(null);
  const [profileMenu, setProfileMenu] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [registeredWorkspace, setRegisteredWorkspace] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: 'Olivia Martin',
    role: 'Lead Product Designer',
    dept: 'Product Design',
    initials: 'OM',
    tone: 'violet'
  });
  const [currentCompany, setCurrentCompany] = useState({
    workspaceId: 'INX-48291',
    name: 'Innovix Technologies'
  });

  // Central Application Data States
  const [posts, setPosts] = useState(initialPostsData);
  const [employees, setEmployees] = useState(initialPeople);
  const [announcements, setAnnouncements] = useState([{
    id: 'a1',
    title: 'Q2 All-Hands Meeting & Global Strategy',
    author: 'Alicia Rodriguez · Executive Office',
    content: 'Join us for company updates, customer stories, and a live Q&A with the leadership team.',
    priority: 'COMPANY',
    date: 'May 26'
  }, {
    id: 'a2',
    title: 'New Employee Wellness & Mental Health Benefit',
    author: 'Priya Nair · People & Culture',
    content: 'Your updated benefits now include a monthly fitness stipend and full Headspace premium membership.',
    priority: 'BENEFITS',
    date: 'May 20'
  }]);
  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [adminMetrics, setAdminMetrics] = useState(null);
  const [rolesList, setRolesList] = useState([]);
  const [workspaceSettings, setWorkspaceSettings] = useState(null);
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');

  // Fetch live backend data
  const refreshData = async () => {
    try {
      const [feedData, empData, annData, deptData, projData, achData, notifData, metricsData, rolesData, wsData] = await Promise.all([apiCall('/posts').catch(() => null), apiCall('/employees').catch(() => null), apiCall('/announcements').catch(() => null), apiCall('/departments').catch(() => null), apiCall('/projects').catch(() => null), apiCall('/achievements').catch(() => null), apiCall('/notifications').catch(() => null), apiCall('/admin/metrics').catch(() => null), apiCall('/roles').catch(() => null), apiCall('/workspace/settings').catch(() => null)]);
      if (feedData && feedData.posts) setPosts(feedData.posts);
      if (empData && empData.employees) {
        setEmployees(empData.employees.map(e => ({
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
      apiCall('/auth/me').then(res => {
        if (res.user && res.company) {
          setCurrentUser(res.user);
          setCurrentCompany(res.company);
          const isAdm = res.user.role === 'ADMIN';
          setAdminMode(isAdm);
          setAuth(null);
          setScreen(isAdm ? 'admin' : 'home');
          refreshData();
        }
      }).catch(() => {
        localStorage.removeItem('cc_token');
        setAuth('portal');
      });
    }
  }, []);
  const showToast = msg => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };
  const navigate = next => {
    setScreen(next);
    setMobileNav(false);
  };

  // Social interactions (Real SQLite Backend Sync)
  const handleLike = async postId => {
    // Optimistic UI update
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isLiked = !p.liked;
        return {
          ...p,
          liked: isLiked,
          likes: isLiked ? p.likes + 1 : p.likes - 1
        };
      }
      return p;
    }));
    try {
      const res = await apiCall('/posts/' + postId + '/like', 'POST');
      if (res.success) {
        setPosts(prev => prev.map(p => p.id === postId ? {
          ...p,
          liked: res.liked,
          likes: res.likes
        } : p));
      }
    } catch (err) {
      console.warn('Backend like sync:', err.message);
    }
  };
  const handleAwardKudos = async (postId, kudosType) => {
    const sender = currentUser?.name || (adminMode ? 'Alicia Rodriguez (Admin)' : 'Olivia Martin');

    // Optimistic update
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const existingKudos = p.kudos || [];
        return {
          ...p,
          likes: p.likes + 1,
          kudos: [...existingKudos, {
            type: kudosType,
            from: sender
          }]
        };
      }
      return p;
    }));
    showToast(`🌟 ${kudosType} awarded to ${kudosPost?.person.name || 'colleague'}!`);
    setModal(null);
    try {
      await apiCall('/posts/' + postId + '/kudos', 'POST', {
        kudosType
      });
    } catch (err) {
      console.warn('Backend kudos sync:', err.message);
    }
  };
  const handleAddComment = async (postId, text) => {
    if (!text.trim()) return;
    const sender = currentUser?.name || (adminMode ? 'Alicia Rodriguez (Admin)' : 'Olivia Martin');
    const avatar = currentUser?.initials || (adminMode ? 'AR' : 'OM');
    const newComment = {
      id: 'c_' + Date.now(),
      author: sender,
      avatar: avatar,
      time: 'Just now',
      text: text.trim()
    };
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    }));
    showToast('Comment published! 💬');
    try {
      const res = await apiCall('/posts/' + postId + '/comments', 'POST', {
        text
      });
      if (res.success && res.comment) {
        setPosts(prev => prev.map(p => p.id === postId ? {
          ...p,
          comments: p.comments.map(c => c.id === newComment.id ? res.comment : c)
        } : p));
      }
    } catch (err) {
      console.warn('Backend comment sync:', err.message);
    }
  };
  const handleCreatePost = async newPost => {
    const sender = currentUser || (adminMode ? {
      name: 'Alicia Rodriguez',
      initials: 'AR',
      role: 'Company Admin',
      dept: 'Executive Office',
      tone: 'slate'
    } : initialPeople[0]);
    const created = {
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
    } catch (err) {
      console.warn('Backend post sync:', err.message);
      showToast('Could not save post to database: ' + err.message);
    }
  };
  const handleAddEmployee = async newEmp => {
    const initials = newEmp.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'EM';
    const added = {
      id: newEmp.id || 'EMP-' + Date.now(),
      name: newEmp.name,
      initials,
      role: newEmp.designation,
      dept: newEmp.dept,
      tone: ['violet', 'blue', 'coral', 'green', 'amber'][employees.length % 5],
      email: newEmp.email
    };
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
        setEmployees(prev => prev.map(e => e.email === newEmp.email ? {
          ...e,
          id: res.employee.id
        } : e));
      }
    } catch (err) {
      showToast('Backend notice: ' + err.message);
    }
  };
  const handleDeleteEmployee = async id => {
    setEmployees(prev => prev.filter(e => e.id !== id));
    showToast('Employee account removed.');
    try {
      await apiCall('/employees/' + id, 'DELETE');
      refreshData();
    } catch (err) {
      console.warn('Backend employee delete:', err.message);
    }
  };
  const handleUpdateEmployee = async empData => {
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
    } catch (err) {
      showToast('Update error: ' + (err.message || 'Failed to update employee'));
    }
  };
  const handleApproveEmployee = async id => {
    try {
      const res = await apiCall(`/employees/${id}/approve`, 'POST');
      if (res.success) {
        showToast(res.message || 'Employee approved! They can now log in. ✅');
        refreshData();
      }
    } catch (err) {
      showToast('Approve error: ' + (err.message || 'Failed to approve'));
    }
  };
  const handleRejectEmployee = async id => {
    try {
      const res = await apiCall(`/employees/${id}/reject`, 'POST');
      if (res.success) {
        showToast(res.message || 'Employee registration rejected.');
        refreshData();
      }
    } catch (err) {
      showToast('Reject error: ' + (err.message || 'Failed to reject'));
    }
  };
  const handleEmployeeSelfRegister = async form => {
    try {
      const res = await apiCall('/auth/employee-register', 'POST', form);
      if (res.success) {
        showToast(res.message || 'Registration submitted! Please wait for admin approval. 📋');
        return true;
      }
      return false;
    } catch (err) {
      showToast('Registration error: ' + (err.message || 'Registration failed'));
      return false;
    }
  };
  const handleAddAnnouncement = async ann => {
    const newAnn = {
      id: 'a_' + Date.now(),
      title: ann.title,
      author: (currentUser?.name || 'Executive Office') + ' · Executive Leadership',
      content: ann.content,
      priority: ann.priority.toUpperCase(),
      date: 'Today'
    };
    setAnnouncements([newAnn, ...announcements]);
    showToast('Company Announcement broadcasted! 📢');
    try {
      const res = await apiCall('/announcements', 'POST', ann);
      if (res.success && res.announcement) {
        setAnnouncements(prev => prev.map(a => a.id === newAnn.id ? res.announcement : a));
      }
    } catch (err) {
      console.warn('Backend announcement broadcast:', err.message);
    }
  };
  const handleDeleteAnnouncement = async annId => {
    try {
      await apiCall('/announcements/' + annId, 'DELETE');
      setAnnouncements(prev => prev.filter(a => a.id !== annId));
      showToast('Announcement removed.');
    } catch (err) {
      showToast('Failed to delete announcement: ' + (err.message || 'Error'));
    }
  };
  const handleUpdateProfile = async profileData => {
    try {
      const res = await apiCall('/auth/profile', 'PUT', profileData);
      if (res.success && res.user) {
        setCurrentUser(prev => ({
          ...prev,
          ...res.user
        }));
        showToast('Profile updated successfully! 👤');
        refreshData();
        return true;
      }
      return false;
    } catch (err) {
      showToast('Profile error: ' + (err.message || 'Failed to update profile'));
      return false;
    }
  };
  const handleChangePassword = async passwords => {
    try {
      const res = await apiCall('/auth/change-password', 'PUT', passwords);
      if (res.success) {
        if (res.token) localStorage.setItem('cc_token', res.token);
        showToast('Password updated successfully! 🔒');
        return true;
      }
      return false;
    } catch (err) {
      showToast('Password error: ' + (err.message || 'Failed to update password'));
      return false;
    }
  };
  const handleUpdateWorkspace = async wsData => {
    try {
      const res = await apiCall('/workspace/settings', 'PUT', wsData);
      if (res.success && res.company) {
        setCurrentCompany(res.company);
        showToast('Workspace settings saved! 🏢');
        refreshData();
        return true;
      }
      return false;
    } catch (err) {
      showToast('Workspace settings error: ' + (err.message || 'Failed to update settings'));
      return false;
    }
  };
  const handleMarkNotificationsRead = async () => {
    try {
      await apiCall('/notifications/read', 'POST');
      setNotifications([]);
      showToast('All notifications marked as read.');
    } catch (err) {
      console.warn('Mark notifications read notice:', err);
    }
  };
  const handleCreateRole = async roleData => {
    showToast(`Custom role ${roleData.name || ''} created with assigned permissions! 🛡️`);
    setRolesList(prev => [...prev, {
      name: roleData.name,
      desc: roleData.desc,
      count: 0,
      permissions: roleData.permissions?.length || 5
    }]);
    setModal(null);
  };

  // Real Backend Auth Handlers
  const handleBackendLogin = async (wsId, emailStr, passStr, isAdm) => {
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
    } catch (err) {
      showToast('Login error: ' + (err.message || 'Authentication failed'));
      return false;
    }
  };
  const handleBackendRegister = async form => {
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
    } catch (err) {
      showToast('Registration error: ' + (err.message || 'Setup failed'));
      return false;
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('cc_token');
    setAuth('portal');
    setProfileMenu(false);
    showToast('Signed out of workspace.');
  };
  if (auth) {
    return /*#__PURE__*/React.createElement(AuthFlow, {
      screen: auth,
      setScreen: setAuth,
      enter: isAdmin => {
        setAuth(null);
        setAdminMode(isAdmin);
        setScreen(isAdmin ? 'admin' : 'home');
        showToast(`Welcome to ${currentCompany?.name || 'Innovix'} ${isAdmin ? 'Admin Console' : 'Workspace'}! ✨`);
        refreshData();
      },
      onLogin: handleBackendLogin,
      onRegister: handleBackendRegister,
      onEmployeeRegister: handleEmployeeSelfRegister,
      workspaceData: registeredWorkspace
    });
  }
  const nav = adminMode ? adminNav : employeeNav;
  return /*#__PURE__*/React.createElement("div", {
    className: `app-shell ${adminMode ? 'admin-mode' : ''}`
  }, toast && /*#__PURE__*/React.createElement("div", {
    className: "toast-notice"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, toast)), /*#__PURE__*/React.createElement("aside", {
    className: `sidebar ${mobileNav ? 'mobile-open' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-top"
  }, /*#__PURE__*/React.createElement(Logo, null), /*#__PURE__*/React.createElement("button", {
    className: "icon-button mobile-only",
    onClick: () => setMobileNav(false)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "workspace-mini",
    onClick: () => setModal('workspace'),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "workspace-logo"
  }, "IN"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, currentCompany?.name || "Innovix"), /*#__PURE__*/React.createElement("small", null, currentCompany?.workspaceId || "INX-48291")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 16
  })), /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("small", {
    className: "nav-heading"
  }, adminMode ? 'MANAGEMENT' : 'WORKSPACE'), nav.map(item => /*#__PURE__*/React.createElement("button", {
    key: item.label,
    className: screen === item.screen ? 'active' : '',
    onClick: () => navigate(item.screen)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: item.icon
  }), /*#__PURE__*/React.createElement("span", null, item.label), item.label === 'Announcements' && /*#__PURE__*/React.createElement("em", null, announcements.length)))), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "role-card"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: adminMode ? 'shield' : 'spark',
    size: 16
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "ACTIVE ROLE"), /*#__PURE__*/React.createElement("strong", null, adminMode ? 'Company Admin' : 'Employee'))), /*#__PURE__*/React.createElement("button", {
    className: "mode-switch",
    onClick: () => {
      const nextMode = !adminMode;
      setAdminMode(nextMode);
      setScreen(nextMode ? 'admin' : 'home');
      showToast(`Switched to ${nextMode ? 'Admin Management' : 'Employee Experience'}`);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: adminMode ? 'user' : 'shield'
  }), adminMode ? 'Employee experience' : 'Admin console', /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 15
  })))), /*#__PURE__*/React.createElement("main", {
    className: "main-area"
  }, /*#__PURE__*/React.createElement("header", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "icon-button mobile-menu",
    onClick: () => setMobileNav(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "menu"
  })), /*#__PURE__*/React.createElement("div", {
    className: "search-box"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search"
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search people, posts, and projects",
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value)
  }), /*#__PURE__*/React.createElement("kbd", null, "\u2318 K")), /*#__PURE__*/React.createElement("div", {
    className: "top-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "workspace-pill desktop-only",
    onClick: () => setModal('workspace')
  }, /*#__PURE__*/React.createElement("span", {
    className: "workspace-logo tiny"
  }, "IN"), /*#__PURE__*/React.createElement("span", null, currentCompany?.name || "Innovix Technologies"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 15
  })), /*#__PURE__*/React.createElement("button", {
    className: "icon-button notification-button",
    onClick: () => setModal('notifications')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell"
  }), notifications.length > 0 && /*#__PURE__*/React.createElement("i", {
    style: {
      minWidth: '16px',
      height: '16px',
      padding: '0 4px',
      borderRadius: '10px',
      fontSize: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, notifications.length)), /*#__PURE__*/React.createElement("div", {
    className: "profile-trigger"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setProfileMenu(!profileMenu)
  }, /*#__PURE__*/React.createElement(Avatar, {
    person: currentUser ? {
      name: currentUser.name,
      initials: currentUser.initials,
      role: currentUser.role,
      dept: currentUser.department || currentUser.dept,
      tone: currentUser.tone
    } : adminMode ? {
      name: 'Alicia Rodriguez',
      initials: 'AR',
      role: 'Admin',
      dept: 'Executive',
      tone: 'slate'
    } : initialPeople[0],
    size: "sm"
  }), /*#__PURE__*/React.createElement("span", {
    className: "desktop-only"
  }, /*#__PURE__*/React.createElement("b", null, currentUser?.name || (adminMode ? 'Alicia Rodriguez' : 'Olivia Martin')), /*#__PURE__*/React.createElement("small", null, currentUser?.designation || currentUser?.role || (adminMode ? 'Company Admin' : 'Product Design'))), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 15
  })), profileMenu && /*#__PURE__*/React.createElement("div", {
    className: "profile-menu"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      navigate('profile');
      setProfileMenu(false);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user"
  }), "View profile"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      navigate('settings');
      setProfileMenu(false);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings"
  }), "Settings"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    onClick: handleLogout
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "logout"
  }), "Sign out"))))), /*#__PURE__*/React.createElement("div", {
    className: "page-content"
  }, screen === 'home' && /*#__PURE__*/React.createElement(Home, {
    posts: searchQuery ? posts.filter(p => p.text.toLowerCase().includes(searchQuery.toLowerCase()) || p.person.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.tag && p.tag.toLowerCase().includes(searchQuery.toLowerCase())) : posts,
    announcements: announcements,
    onPost: () => setModal('post'),
    onLike: handleLike,
    onComment: handleAddComment,
    onShare: p => {
      navigator.clipboard?.writeText(window.location.href);
      showToast(`Link to ${p.person.name}'s update copied! 📋`);
    },
    onGiveKudos: p => {
      setKudosPost(p);
      setModal('kudos');
    },
    navigate: navigate,
    currentUser: currentUser,
    currentCompany: currentCompany
  }), screen === 'admin' && /*#__PURE__*/React.createElement(AdminOverview, {
    navigate: navigate,
    onAnnouncement: () => setModal('announcement'),
    metrics: adminMetrics,
    employeeCount: employees.length,
    postCount: posts.length
  }), screen === 'employees' && /*#__PURE__*/React.createElement(Employees, {
    employees: employees,
    onAdd: () => setModal('employee'),
    onDelete: handleDeleteEmployee,
    onEdit: p => {
      setEditingEmployee(p);
      setModal('edit-employee');
    },
    onApprove: handleApproveEmployee,
    onReject: handleRejectEmployee,
    adminMode: adminMode,
    initialDeptFilter: selectedDeptFilter
  }), screen === 'roles' && /*#__PURE__*/React.createElement(Roles, {
    roles: rolesList,
    onAdd: () => setModal('role')
  }), screen === 'announcements' && /*#__PURE__*/React.createElement(Announcements, {
    announcements: announcements,
    canCreate: adminMode,
    onAdd: () => setModal('announcement'),
    onDelete: handleDeleteAnnouncement
  }), screen === 'profile' && /*#__PURE__*/React.createElement(Profile, {
    currentUser: currentUser,
    currentCompany: currentCompany,
    userPosts: posts.filter(p => p.person.name === currentUser?.name),
    achievements: achievements,
    onEdit: () => setModal('edit-profile')
  }), screen === 'departments' && /*#__PURE__*/React.createElement(DepartmentsView, {
    departments: departments,
    navigate: navigate,
    onSelectDept: dept => {
      setSelectedDeptFilter(dept);
      navigate('employees');
    }
  }), screen === 'projects' && /*#__PURE__*/React.createElement(ProjectsView, {
    projects: projects,
    navigate: navigate,
    onSelectTag: tag => {
      setSearchQuery(tag);
      navigate('home');
    },
    onNewPost: tag => {
      setModal('post');
    }
  }), screen === 'achievements' && /*#__PURE__*/React.createElement(AchievementsView, {
    achievements: achievements,
    onGiveKudos: () => setModal('kudos')
  }), screen === 'settings' && /*#__PURE__*/React.createElement(SettingsView, {
    currentUser: currentUser,
    currentCompany: currentCompany,
    workspaceSettings: workspaceSettings,
    onUpdateProfile: handleUpdateProfile,
    onChangePassword: handleChangePassword,
    onUpdateWorkspace: handleUpdateWorkspace,
    showToast: showToast,
    refreshData: refreshData
  }))), mobileNav && /*#__PURE__*/React.createElement("button", {
    className: "nav-backdrop",
    onClick: () => setMobileNav(false),
    "aria-label": "Close navigation"
  }), modal && /*#__PURE__*/React.createElement(Modal, {
    type: modal,
    close: () => {
      setModal(null);
      setEditingEmployee(null);
    },
    onCreatePost: handleCreatePost,
    onAddEmployee: handleAddEmployee,
    onAddAnnouncement: handleAddAnnouncement,
    kudosPost: kudosPost,
    onAwardKudos: handleAwardKudos,
    editingEmployee: editingEmployee,
    onUpdateEmployee: handleUpdateEmployee,
    currentUser: currentUser,
    currentCompany: currentCompany,
    onUpdateProfile: handleUpdateProfile,
    notifications: notifications,
    onMarkAllRead: handleMarkNotificationsRead,
    onCreateRole: handleCreateRole
  }));
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
}) {
  const [filter, setFilter] = useState('forYou');
  return /*#__PURE__*/React.createElement("div", {
    className: "dashboard-grid"
  }, /*#__PURE__*/React.createElement("section", {
    className: "feed-column"
  }, /*#__PURE__*/React.createElement("div", {
    className: "greeting"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "MONDAY, MAY 26"), /*#__PURE__*/React.createElement("h1", null, "Good morning, ", currentUser ? currentUser.name.split(' ')[0] : 'Olivia', "."), /*#__PURE__*/React.createElement("p", null, "Here's what's happening at ", currentCompany?.name || 'Innovix', " today.")), /*#__PURE__*/React.createElement("button", {
    className: "primary-button",
    onClick: onPost
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus"
  }), "Create post")), /*#__PURE__*/React.createElement("div", {
    className: "composer card",
    onClick: onPost
  }, /*#__PURE__*/React.createElement(Avatar, {
    person: currentUser ? {
      initials: currentUser.initials,
      tone: currentUser.tone
    } : undefined
  }), /*#__PURE__*/React.createElement("button", null, "Share an update, milestone, or celebration..."), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "image"
  }), "Photo"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "award"
  }), "Kudos"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "help"
  }), "Ask for help")), announcements.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "announcement-strip card",
    onClick: () => navigate('announcements')
  }, /*#__PURE__*/React.createElement("span", {
    className: "announcement-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "megaphone"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "LATEST COMPANY ANNOUNCEMENT"), /*#__PURE__*/React.createElement("strong", null, announcements[0].title), /*#__PURE__*/React.createElement("p", null, announcements[0].content)), /*#__PURE__*/React.createElement("span", {
    className: "read-link"
  }, "Read all (", announcements.length, ") ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 14
  }))), /*#__PURE__*/React.createElement("div", {
    className: "feed-filter"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: filter === 'forYou' ? 'active' : '',
    onClick: () => setFilter('forYou')
  }, "For you"), /*#__PURE__*/React.createElement("button", {
    className: filter === 'following' ? 'active' : '',
    onClick: () => setFilter('following')
  }, "Following")), /*#__PURE__*/React.createElement("button", null, /*#__PURE__*/React.createElement(Icon, {
    name: "filter",
    size: 15
  }), " Latest first")), posts.map(post => /*#__PURE__*/React.createElement(Post, {
    key: post.id,
    post: post,
    onLike: () => onLike(post.id),
    onComment: txt => onComment(post.id, txt),
    onShare: () => onShare(post),
    onGiveKudos: () => onGiveKudos(post)
  })), /*#__PURE__*/React.createElement(HelpPost, {
    onRespond: () => alert('Thanks for offering to help! A direct thread has been started.')
  })), /*#__PURE__*/React.createElement("aside", {
    className: "right-rail"
  }, /*#__PURE__*/React.createElement(PulseCard, null), /*#__PURE__*/React.createElement("div", {
    className: "rail-card card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, "Today at Innovix"), /*#__PURE__*/React.createElement("button", null, /*#__PURE__*/React.createElement(Icon, {
    name: "more"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "timeline-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot violet"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "10:30 AM"), /*#__PURE__*/React.createElement("strong", null, "Design critique & system tokens"), /*#__PURE__*/React.createElement("p", null, "Product Design \xB7 Studio 2"))), /*#__PURE__*/React.createElement("div", {
    className: "timeline-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot blue"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "2:00 PM"), /*#__PURE__*/React.createElement("strong", null, "Project Atlas sprint sync"), /*#__PURE__*/React.createElement("p", null, "Engineering \xB7 Google Meet"))), /*#__PURE__*/React.createElement("div", {
    className: "timeline-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot coral"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "4:30 PM"), /*#__PURE__*/React.createElement("strong", null, "Welcome social & new hires"), /*#__PURE__*/React.createElement("p", null, "Culture Club \xB7 Terrace 4th Floor")))), /*#__PURE__*/React.createElement("div", {
    className: "rail-card card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, /*#__PURE__*/React.createElement("span", null, "Celebrations"), /*#__PURE__*/React.createElement("button", null, "See all")), /*#__PURE__*/React.createElement("div", {
    className: "celebration"
  }, /*#__PURE__*/React.createElement(Avatar, {
    person: initialPeople[2],
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Priya's birthday \uD83C\uDF82"), /*#__PURE__*/React.createElement("p", null, "Today \xB7 Wish her well")), /*#__PURE__*/React.createElement("span", {
    className: "mini-badge"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "spark",
    size: 15
  }))), /*#__PURE__*/React.createElement("div", {
    className: "celebration"
  }, /*#__PURE__*/React.createElement(Avatar, {
    person: initialPeople[3],
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Daniel \xB7 3 years"), /*#__PURE__*/React.createElement("p", null, "Work anniversary today")), /*#__PURE__*/React.createElement("span", {
    className: "mini-badge blue"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "award",
    size: 15
  }))))));
}
function Post({
  post,
  onLike,
  onComment,
  onShare,
  onGiveKudos
}) {
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const submitComment = e => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onComment(commentInput);
    setCommentInput('');
  };
  return /*#__PURE__*/React.createElement("article", {
    className: "post-card card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "post-head"
  }, /*#__PURE__*/React.createElement(Avatar, {
    person: post.person
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, post.person.name), /*#__PURE__*/React.createElement("p", null, post.person.role, " \xB7 ", post.person.dept), /*#__PURE__*/React.createElement("small", null, post.time, " \xB7 ", /*#__PURE__*/React.createElement(Icon, {
    name: "building",
    size: 12
  }), " Innovix")), /*#__PURE__*/React.createElement("button", {
    className: "icon-button"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "post-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "post-tags"
  }, /*#__PURE__*/React.createElement("span", null, post.type), /*#__PURE__*/React.createElement("span", null, post.tag)), post.kudos && post.kudos.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "post-kudos-row"
  }, post.kudos.map((k, idx) => /*#__PURE__*/React.createElement("span", {
    key: idx,
    className: "kudos-chip"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "award",
    size: 13
  }), /*#__PURE__*/React.createElement("b", null, k.type), " \xB7 from ", k.from))), /*#__PURE__*/React.createElement("p", null, post.text)), post.image && /*#__PURE__*/React.createElement("div", {
    className: "post-image"
  }, /*#__PURE__*/React.createElement("img", {
    src: post.image,
    alt: post.tag
  }), /*#__PURE__*/React.createElement("div", {
    className: "image-caption"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "folder",
    size: 14
  }), " ", post.tag), /*#__PURE__*/React.createElement("b", null, "View project ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 14
  })))), /*#__PURE__*/React.createElement("div", {
    className: "post-meta"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, post.likes), " appreciations"), /*#__PURE__*/React.createElement("span", null, post.comments.length, " comments \xB7 4 shares")), /*#__PURE__*/React.createElement("div", {
    className: "post-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: post.liked ? 'liked' : '',
    onClick: onLike
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart",
    fill: post.liked ? 'currentColor' : 'none'
  }), post.liked ? 'Appreciated' : 'Appreciate'), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowComments(!showComments)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "comment"
  }), "Comment ", post.comments.length > 0 && `(${post.comments.length})`), /*#__PURE__*/React.createElement("button", {
    className: "kudos-btn",
    onClick: onGiveKudos
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "award"
  }), "Give Kudos ", post.kudos && post.kudos.length > 0 && `(${post.kudos.length})`), /*#__PURE__*/React.createElement("button", {
    onClick: onShare
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "share"
  }), "Share")), showComments && /*#__PURE__*/React.createElement("div", {
    className: "comment-section"
  }, post.comments.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    className: "comment-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "avatar avatar-sm avatar-violet"
  }, c.avatar), /*#__PURE__*/React.createElement("div", {
    className: "comment-bubble"
  }, /*#__PURE__*/React.createElement("b", null, c.author), /*#__PURE__*/React.createElement("p", null, c.text), /*#__PURE__*/React.createElement("small", null, c.time)))), /*#__PURE__*/React.createElement("form", {
    onSubmit: submitComment,
    className: "comment-input-row"
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Write a supportive comment...",
    value: commentInput,
    onChange: e => setCommentInput(e.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Post"))));
}
function HelpPost({
  onRespond
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: "post-card help-post card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "post-head"
  }, /*#__PURE__*/React.createElement(Avatar, {
    person: initialPeople[3]
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, initialPeople[3].name), /*#__PURE__*/React.createElement("p", null, initialPeople[3].role, " \xB7 ", initialPeople[3].dept), /*#__PURE__*/React.createElement("small", null, "3 hr ago")), /*#__PURE__*/React.createElement("span", {
    className: "help-label"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "help",
    size: 15
  }), " HELP NEEDED")), /*#__PURE__*/React.createElement("div", {
    className: "post-body"
  }, /*#__PURE__*/React.createElement("h3", null, "Looking for a React accessibility expert"), /*#__PURE__*/React.createElement("p", null, "We are validating the new onboarding flow this week. I would love a second pair of eyes on keyboard navigation, ARIA announcements, and screen reader ergonomics."), /*#__PURE__*/React.createElement("div", {
    className: "skill-row"
  }, /*#__PURE__*/React.createElement("span", null, "Required skill ", /*#__PURE__*/React.createElement("b", null, "React \xB7 Accessibility (a11y)")), /*#__PURE__*/React.createElement("span", null, "Project ", /*#__PURE__*/React.createElement("b", null, "New Hire Journey"))), /*#__PURE__*/React.createElement("button", {
    className: "secondary-button",
    onClick: onRespond
  }, "Offer help ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 15
  }))));
}
function PulseCard() {
  return /*#__PURE__*/React.createElement("div", {
    className: "pulse-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pulse-top"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "spark"
  }), " Company Pulse"), /*#__PURE__*/React.createElement("small", null, "THIS WEEK")), /*#__PURE__*/React.createElement("h3", null, "Your teams are making momentum."), /*#__PURE__*/React.createElement("div", {
    className: "pulse-score"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ring"
  }, /*#__PURE__*/React.createElement("span", null, "88", /*#__PURE__*/React.createElement("small", null, "%"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "High activity"), /*#__PURE__*/React.createElement("p", null, "142 active today \xB7 Up 14% from last week"))), /*#__PURE__*/React.createElement("div", {
    className: "pulse-stats"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "14"), /*#__PURE__*/React.createElement("span", null, "Milestones")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "36"), /*#__PURE__*/React.createElement("span", null, "Kudos sent")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "8"), /*#__PURE__*/React.createElement("span", null, "Wins shared"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => alert('Company Pulse: 94% on-track velocity across 6 active departments.')
  }, "Explore company pulse ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 15
  })));
}
function AdminOverview({
  navigate,
  onAnnouncement,
  metrics,
  employeeCount,
  postCount
}) {
  const stats = [['Total employees', String(metrics?.employeeCount ?? employeeCount), `${metrics?.activeEmployees ?? employeeCount} active in workspace`, 'users'], ['Pending approvals', String(metrics?.pendingEmployees ?? 0), 'Awaiting admin verification', 'spark'], ['Company posts', String(metrics?.postCount ?? postCount), '+18.4% monthly activity', 'folder'], ['Recognition kudos', String(metrics?.kudosCount ?? 6), 'Peer kudos awarded', 'award']];
  return /*#__PURE__*/React.createElement("div", {
    className: "wide-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-heading"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "ADMIN CONSOLE"), /*#__PURE__*/React.createElement("h1", null, "Workspace overview"), /*#__PURE__*/React.createElement("p", null, "Monitor your people, engagement, and company activity.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "secondary-button",
    onClick: onAnnouncement
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "megaphone"
  }), "New announcement"), /*#__PURE__*/React.createElement("button", {
    className: "primary-button",
    onClick: () => navigate('employees')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus"
  }), "Add employee"))), /*#__PURE__*/React.createElement("div", {
    className: "stat-grid"
  }, stats.map(([label, value, sub, icon]) => /*#__PURE__*/React.createElement("div", {
    className: "stat-card card",
    key: label
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: icon
  })), /*#__PURE__*/React.createElement("small", null, label), /*#__PURE__*/React.createElement("strong", null, value), /*#__PURE__*/React.createElement("p", null, sub)))), /*#__PURE__*/React.createElement("div", {
    className: "admin-grid"
  }, /*#__PURE__*/React.createElement("section", {
    className: "card engagement-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Employee engagement"), /*#__PURE__*/React.createElement("p", null, "Weekly active participation")), /*#__PURE__*/React.createElement("select", null, /*#__PURE__*/React.createElement("option", null, "Last 8 weeks"))), /*#__PURE__*/React.createElement("div", {
    className: "chart-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chart-y"
  }, /*#__PURE__*/React.createElement("span", null, "100%"), /*#__PURE__*/React.createElement("span", null, "75%"), /*#__PURE__*/React.createElement("span", null, "50%"), /*#__PURE__*/React.createElement("span", null, "25%"), /*#__PURE__*/React.createElement("span", null, "0%")), /*#__PURE__*/React.createElement("div", {
    className: "chart"
  }, /*#__PURE__*/React.createElement("div", {
    className: "chart-line"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 600 180",
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "area",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#5c5ce2",
    stopOpacity: ".26"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#5c5ce2",
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("path", {
    className: "area",
    d: "M0 135 C80 120 80 90 150 100 S240 60 300 75 S390 35 450 55 S530 20 600 28 L600 180 L0 180Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 135 C80 120 80 90 150 100 S240 60 300 75 S390 35 450 55 S530 20 600 28"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "chart-x"
  }, /*#__PURE__*/React.createElement("span", null, "Apr 7"), /*#__PURE__*/React.createElement("span", null, "Apr 14"), /*#__PURE__*/React.createElement("span", null, "Apr 21"), /*#__PURE__*/React.createElement("span", null, "Apr 28"), /*#__PURE__*/React.createElement("span", null, "May 5"), /*#__PURE__*/React.createElement("span", null, "May 12"), /*#__PURE__*/React.createElement("span", null, "May 19")))), /*#__PURE__*/React.createElement("div", {
    className: "chart-legend"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", null), "Post engagement ", /*#__PURE__*/React.createElement("b", null, "78.4%")), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", null), "Weekly change ", /*#__PURE__*/React.createElement("b", {
    className: "positive"
  }, "+6.2%")))), /*#__PURE__*/React.createElement("section", {
    className: "card activity-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Recent activity & audit"), /*#__PURE__*/React.createElement("p", null, "Live security & workspace log")), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('home')
  }, "View feed")), (metrics?.recentActivity && metrics.recentActivity.length > 0 ? metrics.recentActivity : [{
    userName: 'Alicia Rodriguez',
    action: 'LOGIN_SUCCESS',
    details: 'Admin console authenticated',
    time: 'Just now'
  }, {
    userName: 'Marcus Chen',
    action: 'CREATE_POST',
    details: 'Published update on Project Atlas',
    time: '14m ago'
  }, {
    userName: 'Olivia Martin',
    action: 'AWARD_KUDOS',
    details: 'Recognized peer with Innovation Kudos',
    time: '1h ago'
  }, {
    userName: 'Priya Nair',
    action: 'ANNOUNCEMENT',
    details: 'Broadcasted wellness benefit notice',
    time: '2h ago'
  }]).slice(0, 5).map((a, i) => /*#__PURE__*/React.createElement("div", {
    className: "activity-row",
    key: a.id || i
  }, /*#__PURE__*/React.createElement(Avatar, {
    person: {
      name: a.userName || 'System',
      initials: (a.userName || 'SY').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
      role: 'Member',
      dept: 'General',
      tone: ['purple', 'gold', 'green', 'blue', 'coral'][i % 5]
    },
    size: "sm"
  }), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("b", null, a.userName || 'System'), " ", a.details || a.action, /*#__PURE__*/React.createElement("small", null, a.time || 'Recently')), /*#__PURE__*/React.createElement("span", {
    className: ['purple', 'gold', 'green', 'blue', 'coral'][i % 5]
  }, /*#__PURE__*/React.createElement(Icon, {
    name: a.action?.includes('POST') ? 'folder' : a.action?.includes('KUDOS') ? 'award' : a.action?.includes('EMPLOYEE') ? 'users' : 'spark',
    size: 15
  })))))), /*#__PURE__*/React.createElement("section", {
    className: "card team-table"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Department health"), /*#__PURE__*/React.createElement("p", null, "Headcount and participation by team")), /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate('employees')
  }, "Manage employees ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 14
  }))), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Department"), /*#__PURE__*/React.createElement("th", null, "Employees"), /*#__PURE__*/React.createElement("th", null, "Active this week"), /*#__PURE__*/React.createElement("th", null, "Engagement"), /*#__PURE__*/React.createElement("th", null, "Trend"))), /*#__PURE__*/React.createElement("tbody", null, (metrics?.departmentHealth && metrics.departmentHealth.length > 0 ? metrics.departmentHealth : [{
    department: 'Engineering',
    employees: 12,
    activeThisWeek: 11,
    engagement: '92%',
    trend: '+4.2%'
  }, {
    department: 'Product Design',
    employees: 5,
    activeThisWeek: 5,
    engagement: '95%',
    trend: '+6.1%'
  }, {
    department: 'Executive Leadership',
    employees: 3,
    activeThisWeek: 3,
    engagement: '100%',
    trend: '+1.0%'
  }]).map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.department
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "dept-icon"
  }, (r.department || 'DE').slice(0, 2).toUpperCase()), /*#__PURE__*/React.createElement("b", null, r.department)), /*#__PURE__*/React.createElement("td", null, r.employees), /*#__PURE__*/React.createElement("td", null, r.activeThisWeek || r.employees), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "progress"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: r.engagement || '85%'
    }
  })), r.engagement || '85%'), /*#__PURE__*/React.createElement("td", {
    className: "positive"
  }, r.trend || '+3.5%')))))));
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
}) {
  const [deptFilter, setDeptFilter] = useState(initialDeptFilter || 'All');
  useEffect(() => {
    if (initialDeptFilter) setDeptFilter(initialDeptFilter);
  }, [initialDeptFilter]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [keyword, setKeyword] = useState('');
  const pendingCount = employees.filter(e => e.status === 'Pending').length;
  const filtered = employees.filter(e => {
    if (deptFilter !== 'All' && e.dept !== deptFilter) return false;
    if (statusFilter !== 'All' && (e.status || 'Active') !== statusFilter) return false;
    if (roleFilter !== 'All') {
      const isAdm = e.role === 'ADMIN' || e.role === 'Company Admin';
      if (roleFilter === 'Admin' && !isAdm) return false;
      if (roleFilter === 'Employee' && isAdm) return false;
    }
    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      const matchName = e.name.toLowerCase().includes(kw);
      const matchEmail = (e.email || '').toLowerCase().includes(kw);
      const matchEmpId = (e.employeeId || e.id || '').toLowerCase().includes(kw);
      const matchDept = e.dept.toLowerCase().includes(kw);
      if (!matchName && !matchEmail && !matchEmpId && !matchDept) return false;
    }
    return true;
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "wide-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-heading"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, adminMode ? 'PEOPLE OPERATIONS' : 'DIRECTORY'), /*#__PURE__*/React.createElement("h1", null, adminMode ? 'Employee management' : 'People at Innovix'), /*#__PURE__*/React.createElement("p", null, adminMode ? 'Manage employee access, edit login IDs & credentials, and approve registrations.' : 'Find and connect with colleagues across the company.')), adminMode && /*#__PURE__*/React.createElement("button", {
    className: "primary-button",
    onClick: onAdd
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus"
  }), "Add employee")), adminMode && pendingCount > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fffbeb',
      border: '1px solid #fde68a',
      borderRadius: '12px',
      padding: '14px 18px',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '32px',
      height: '32px',
      borderRadius: '8px',
      background: '#fef3c7',
      color: '#b45309',
      display: 'grid',
      placeItems: 'center',
      fontWeight: 'bold'
    }
  }, "\u23F3"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: '13px',
      color: '#92400e'
    }
  }, pendingCount, " Pending Employee Registration", pendingCount > 1 ? 's' : '', " Awaiting Approval"), /*#__PURE__*/React.createElement("small", {
    style: {
      display: 'block',
      fontSize: '11px',
      color: '#b45309',
      marginTop: '2px'
    }
  }, "Review and approve new team members below so they can access their workspace."))), /*#__PURE__*/React.createElement("button", {
    style: {
      padding: '6px 12px',
      background: '#f59e0b',
      color: '#fff',
      border: 'none',
      borderRadius: '7px',
      fontSize: '11px',
      fontWeight: 600,
      cursor: 'pointer'
    },
    onClick: () => setStatusFilter('Pending')
  }, "Show Pending Only (", pendingCount, ")")), /*#__PURE__*/React.createElement("div", {
    className: "directory-tools card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "table-search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search"
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search by name, employee ID, or email...",
    value: keyword,
    onChange: e => setKeyword(e.target.value)
  })), /*#__PURE__*/React.createElement("select", {
    value: deptFilter,
    onChange: e => setDeptFilter(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: "All"
  }, "All departments"), /*#__PURE__*/React.createElement("option", {
    value: "Engineering"
  }, "Engineering"), /*#__PURE__*/React.createElement("option", {
    value: "Product Design"
  }, "Product Design"), /*#__PURE__*/React.createElement("option", {
    value: "Product"
  }, "Product"), /*#__PURE__*/React.createElement("option", {
    value: "Marketing"
  }, "Marketing"), /*#__PURE__*/React.createElement("option", {
    value: "People & Culture"
  }, "People & Culture"), /*#__PURE__*/React.createElement("option", {
    value: "Infrastructure"
  }, "Infrastructure"), /*#__PURE__*/React.createElement("option", {
    value: "Product Management"
  }, "Product Management"), /*#__PURE__*/React.createElement("option", {
    value: "Executive Office"
  }, "Executive Office")), adminMode && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("select", {
    value: roleFilter,
    onChange: e => setRoleFilter(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: "All"
  }, "All roles"), /*#__PURE__*/React.createElement("option", {
    value: "Admin"
  }, "Admin"), /*#__PURE__*/React.createElement("option", {
    value: "Employee"
  }, "Employee")), /*#__PURE__*/React.createElement("select", {
    value: statusFilter,
    onChange: e => setStatusFilter(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: "All"
  }, "All statuses"), /*#__PURE__*/React.createElement("option", {
    value: "Active"
  }, "Active"), /*#__PURE__*/React.createElement("option", {
    value: "Pending"
  }, "Pending (", pendingCount, ")"), /*#__PURE__*/React.createElement("option", {
    value: "Rejected"
  }, "Rejected")))), /*#__PURE__*/React.createElement("div", {
    className: "employee-table card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "table-summary"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, filtered.length, " employees"), " in this view"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const header = 'Name,Email,Employee ID,Department,Designation,Role,Status\n';
      const rows = filtered.map(e => `"${e.name}","${e.email}","${e.employeeId || ''}","${e.department || ''}","${e.designation || ''}","${e.role}","${e.status}"`).join('\n');
      const blob = new Blob([header + rows], {
        type: 'text/csv;charset=utf-8;'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `company_directory_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "external",
    size: 15
  }), "Export CSV")), /*#__PURE__*/React.createElement("div", {
    className: "table-scroll"
  }, /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Employee"), /*#__PURE__*/React.createElement("th", null, "Employee ID (Login ID)"), /*#__PURE__*/React.createElement("th", null, "Department"), /*#__PURE__*/React.createElement("th", null, "Designation"), /*#__PURE__*/React.createElement("th", null, "Role"), adminMode && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'center'
    }
  }, "Actions")))), /*#__PURE__*/React.createElement("tbody", null, filtered.map((p, i) => /*#__PURE__*/React.createElement("tr", {
    key: p.id || p.name + i
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "person-cell"
  }, /*#__PURE__*/React.createElement(Avatar, {
    person: p,
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, p.name), /*#__PURE__*/React.createElement("small", null, p.email || `${p.name.toLowerCase().replace(' ', '.')}@innovix.com`)))), /*#__PURE__*/React.createElement("td", {
    className: "mono",
    style: {
      fontWeight: 600
    }
  }, p.employeeId || p.id || `EMP-${1024 + i}`), /*#__PURE__*/React.createElement("td", null, p.dept), /*#__PURE__*/React.createElement("td", null, p.role), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: "role-tag"
  }, p.role === 'ADMIN' || p.role === 'Company Admin' ? 'Company Admin' : p.role)), adminMode && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: `status ${(p.status || 'Active').toLowerCase()}`
  }, /*#__PURE__*/React.createElement("i", null), p.status || 'Active')), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '6px',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, p.status === 'Pending' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "action-pill approve-pill",
    title: "Approve employee account",
    onClick: () => onApprove(p.id || '')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12
  }), " Approve"), /*#__PURE__*/React.createElement("button", {
    className: "action-pill reject-pill",
    title: "Reject registration",
    onClick: () => onReject(p.id || '')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 12
  }), " Reject")), /*#__PURE__*/React.createElement("button", {
    className: "icon-button",
    title: "Edit employee ID, credentials & details",
    onClick: () => onEdit(p),
    style: {
      color: 'var(--brand)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    size: 15
  })), /*#__PURE__*/React.createElement("button", {
    className: "icon-button",
    title: "Remove employee",
    onClick: () => {
      if (confirm(`Are you sure you want to remove ${p.name}?`)) {
        onDelete(p.id || '');
      }
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 15
  }))))))))))));
}
const permissionGroups = [{
  title: 'Social permissions',
  items: ['Create posts', 'Like posts', 'Comment on posts', 'Edit own posts', 'Delete own posts', "Delete others' posts"]
}, {
  title: 'Employee permissions',
  items: ['View employee directory', 'Create employee accounts', 'Edit employee details', 'Deactivate employee accounts', 'Assign employee roles']
}, {
  title: 'Company permissions',
  items: ['Create announcements', 'Manage departments', 'View company analytics', 'Manage workspace settings']
}];
function Roles({
  roles: rolesProp,
  onAdd
}) {
  const defaultRoles = [['Company Admin', 'Full workspace management and security control', '1'], ['HR Manager', 'People, departments & announcements', '1'], ['Department Manager', 'Department and team project management', '4'], ['Team Lead', 'Team updates & limited moderation', '3'], ['Employee', 'Core social feed, recognition, and profile access', '22']];
  const activeRoles = rolesProp && rolesProp.length > 0 ? rolesProp.map(r => [r.name, r.desc, String(r.count || 0)]) : defaultRoles;
  const [selected, setSelected] = useState(activeRoles[0]?.[0] || 'Company Admin');
  const [roles, setRoles] = useState(activeRoles);
  useEffect(() => {
    if (rolesProp && rolesProp.length > 0) {
      setRoles(rolesProp.map(r => [r.name, r.desc, String(r.count || 0)]));
    }
  }, [rolesProp]);
  return /*#__PURE__*/React.createElement("div", {
    className: "wide-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-heading"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "ACCESS CONTROL"), /*#__PURE__*/React.createElement("h1", null, "Roles & permissions"), /*#__PURE__*/React.createElement("p", null, "Give people the right access without unnecessary complexity.")), /*#__PURE__*/React.createElement("button", {
    className: "primary-button",
    onClick: onAdd
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus"
  }), "Create custom role")), /*#__PURE__*/React.createElement("div", {
    className: "roles-layout"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "roles-list card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "roles-list-head"
  }, /*#__PURE__*/React.createElement("b", null, "Workspace roles"), /*#__PURE__*/React.createElement("span", null, roles.length, " roles")), roles.map(([name, desc, count]) => /*#__PURE__*/React.createElement("button", {
    className: selected === name ? 'selected' : '',
    onClick: () => setSelected(name),
    key: name
  }, /*#__PURE__*/React.createElement("span", {
    className: "role-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: name === 'Company Admin' ? 'shield' : 'user',
    size: 17
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, name), /*#__PURE__*/React.createElement("small", null, desc)), /*#__PURE__*/React.createElement("em", null, count)))), /*#__PURE__*/React.createElement("section", {
    className: "permissions-panel card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "permissions-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "role-icon large"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, selected), /*#__PURE__*/React.createElement("p", null, roles.find(r => r[0] === selected)?.[1]))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "secondary-button",
    onClick: () => alert(`Role configuration for ${selected} is active.`)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    size: 15
  }), "Edit role"))), /*#__PURE__*/React.createElement("div", {
    className: "permission-summary"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, roles.find(r => r[0] === selected)?.[2] || '1', " employees"), /*#__PURE__*/React.createElement("span", null, "assigned this role in this workspace")), /*#__PURE__*/React.createElement("div", {
    className: "progress"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: '74%'
    }
  })), /*#__PURE__*/React.createElement("p", null, "Changes apply immediately to all employees assigned this role.")), permissionGroups.map((g, gi) => /*#__PURE__*/React.createElement("div", {
    className: "permission-group",
    key: g.title
  }, /*#__PURE__*/React.createElement("h3", null, g.title, /*#__PURE__*/React.createElement("span", null, g.items.length)), g.items.map((item, i) => /*#__PURE__*/React.createElement("div", {
    className: "permission-row",
    key: item
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, item), /*#__PURE__*/React.createElement("p", null, permissionDescription(item))), /*#__PURE__*/React.createElement(Toggle, {
    initial: i < (gi === 0 ? 5 : gi === 1 ? 3 : 2)
  }))))))));
}
function permissionDescription(item) {
  const map = {
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
    'Manage workspace settings': 'Configure company branding, SSO, and retention policies'
  };
  return map[item] || 'Grant permission for this workspace capability';
}
function Toggle({
  initial = false
}) {
  const [on, setOn] = useState(initial);
  return /*#__PURE__*/React.createElement("button", {
    className: `toggle ${on ? 'on' : ''}`,
    onClick: () => setOn(!on),
    role: "switch",
    "aria-checked": on
  }, /*#__PURE__*/React.createElement("i", null));
}
function Announcements({
  announcements,
  canCreate,
  onAdd,
  onDelete
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "narrow-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-heading"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "COMPANY NEWS"), /*#__PURE__*/React.createElement("h1", null, "Announcements"), /*#__PURE__*/React.createElement("p", null, "Important updates and official bulletins from Innovix Technologies.")), canCreate && /*#__PURE__*/React.createElement("button", {
    className: "primary-button",
    onClick: onAdd
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus"
  }), "New announcement")), /*#__PURE__*/React.createElement("div", {
    className: "announcement-feature"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "megaphone"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "PINNED \xB7 LEADERSHIP"), /*#__PURE__*/React.createElement("h2", null, "A note from our CEO: Building what matters"), /*#__PURE__*/React.createElement("p", null, "As we enter the second half of the fiscal year, I want to thank every team for the focus, craft, and care you bring to our clients and each other."), /*#__PURE__*/React.createElement("button", {
    onClick: () => alert('Executive address: Thank you to all teams for building impactful products and delighting our enterprise customers!')
  }, "Read the full message ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 15
  })))), /*#__PURE__*/React.createElement("div", {
    className: "announcement-list"
  }, announcements.map((a, i) => /*#__PURE__*/React.createElement("article", {
    className: "announcement-card card",
    key: a.id || a.title
  }, /*#__PURE__*/React.createElement("div", {
    className: `priority p${i % 3}`
  }, /*#__PURE__*/React.createElement("span", null, a.priority), /*#__PURE__*/React.createElement("small", null, a.date), canCreate && onDelete && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "icon-button",
    title: "Delete announcement",
    style: {
      color: '#e85f5f',
      marginLeft: 'auto',
      padding: '2px 6px'
    },
    onClick: () => {
      if (confirm(`Delete announcement "${a.title}"?`)) onDelete(a.id);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 14
  }))), /*#__PURE__*/React.createElement("h2", null, a.title), /*#__PURE__*/React.createElement("p", null, a.content), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Avatar, {
    person: initialPeople[(i + 1) % initialPeople.length],
    size: "sm"
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, a.author.split(' · ')[0]), /*#__PURE__*/React.createElement("small", null, a.author.split(' · ')[1] || 'Innovix')))))));
}
function Profile({
  currentUser,
  currentCompany,
  userPosts = [],
  achievements,
  onEdit
}) {
  const [tab, setTab] = useState('overview');
  const userName = currentUser?.name || 'Olivia Martin';
  const userRole = currentUser?.designation || currentUser?.role || 'Senior Product Designer';
  const userDept = currentUser?.department || currentUser?.dept || 'Product Design';
  const userBio = currentUser?.bio || `${userRole} at ${currentCompany?.name || 'Innovix Technologies'}. Passionate about design systems, scalable software, and high-impact collaboration.`;
  const skillsList = currentUser?.skills ? typeof currentUser.skills === 'string' ? currentUser.skills.split(',').map(s => s.trim()).filter(Boolean) : currentUser.skills : ['Product Strategy', 'UI/UX Design', 'TypeScript', 'Cross-Team Collaboration'];
  const userKudosReceived = achievements?.userStats?.receivedCount || 0;
  const userBadges = achievements?.userStats?.badges || ['Innovation Catalyst', 'Team Player'];
  return /*#__PURE__*/React.createElement("div", {
    className: "profile-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-hero card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cover"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cover-shape one"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cover-shape two"
  })), /*#__PURE__*/React.createElement("div", {
    className: "profile-info"
  }, /*#__PURE__*/React.createElement(Avatar, {
    person: currentUser ? {
      name: userName,
      initials: currentUser.initials,
      role: userRole,
      dept: userDept,
      tone: currentUser.tone
    } : initialPeople[0],
    size: "xl"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, userName), /*#__PURE__*/React.createElement("p", null, userRole, " \xB7 ", userDept), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "building",
    size: 14
  }), " ", currentCompany?.name || 'Innovix Technologies', " ", /*#__PURE__*/React.createElement("i", null), " ", currentCompany?.workspaceId || 'INX-48291')), /*#__PURE__*/React.createElement("button", {
    className: "secondary-button",
    onClick: onEdit
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit"
  }), "Edit profile")), /*#__PURE__*/React.createElement("div", {
    className: "profile-tabs"
  }, /*#__PURE__*/React.createElement("button", {
    className: tab === 'overview' ? 'active' : '',
    onClick: () => setTab('overview')
  }, "Overview"), /*#__PURE__*/React.createElement("button", {
    className: tab === 'posts' ? 'active' : '',
    onClick: () => setTab('posts')
  }, "Posts ", /*#__PURE__*/React.createElement("span", null, userPosts.length)), /*#__PURE__*/React.createElement("button", {
    className: tab === 'achievements' ? 'active' : '',
    onClick: () => setTab('achievements')
  }, "Recognition ", /*#__PURE__*/React.createElement("span", null, userKudosReceived)))), /*#__PURE__*/React.createElement("div", {
    className: "profile-grid"
  }, /*#__PURE__*/React.createElement("div", null, tab === 'overview' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "card profile-section"
  }, /*#__PURE__*/React.createElement("h2", null, "About"), /*#__PURE__*/React.createElement("p", null, userBio)), /*#__PURE__*/React.createElement("section", {
    className: "card profile-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("h2", null, "Recent updates from ", userName)), userPosts.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)',
      fontSize: '13px'
    }
  }, "No posts published yet. Share a daily update or project win to get started!") : userPosts.slice(0, 3).map(p => /*#__PURE__*/React.createElement("article", {
    className: "post-card card",
    key: p.id,
    style: {
      boxShadow: 'none',
      border: '1px solid var(--border)',
      marginBottom: '12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "post-head"
  }, /*#__PURE__*/React.createElement(Avatar, {
    person: p.person,
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, p.person.name), /*#__PURE__*/React.createElement("p", null, p.person.dept), /*#__PURE__*/React.createElement("small", null, p.time))), /*#__PURE__*/React.createElement("div", {
    className: "post-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "post-tags"
  }, /*#__PURE__*/React.createElement("span", null, p.type), /*#__PURE__*/React.createElement("span", null, p.tag)), /*#__PURE__*/React.createElement("p", null, p.text), p.image && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '10px',
      borderRadius: '8px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: p.image,
    alt: "Attachment",
    style: {
      width: '100%',
      maxHeight: '240px',
      objectFit: 'cover'
    }
  }))))))), tab === 'posts' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    }
  }, userPosts.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: '32px',
      textAlign: 'center',
      color: 'var(--muted)'
    }
  }, /*#__PURE__*/React.createElement("p", null, "You haven't published any posts yet.")) : userPosts.map(p => /*#__PURE__*/React.createElement("article", {
    className: "post-card card",
    key: p.id
  }, /*#__PURE__*/React.createElement("div", {
    className: "post-head"
  }, /*#__PURE__*/React.createElement(Avatar, {
    person: p.person,
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, p.person.name), /*#__PURE__*/React.createElement("p", null, p.person.dept), /*#__PURE__*/React.createElement("small", null, p.time))), /*#__PURE__*/React.createElement("div", {
    className: "post-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "post-tags"
  }, /*#__PURE__*/React.createElement("span", null, p.type), /*#__PURE__*/React.createElement("span", null, p.tag)), /*#__PURE__*/React.createElement("p", null, p.text), p.image && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '10px',
      borderRadius: '8px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: p.image,
    alt: "Attachment",
    style: {
      width: '100%',
      maxHeight: '300px',
      objectFit: 'cover'
    }
  })))))), tab === 'achievements' && /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: '24px'
    }
  }, /*#__PURE__*/React.createElement("h2", null, "Recognition & Badges"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      marginTop: '14px'
    }
  }, userBadges.map(badge => /*#__PURE__*/React.createElement("div", {
    key: badge,
    style: {
      padding: '12px 18px',
      background: 'var(--surface)',
      borderRadius: '10px',
      border: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '20px'
    }
  }, "\uD83C\uDF1F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      display: 'block',
      fontSize: '13px'
    }
  }, badge), /*#__PURE__*/React.createElement("small", {
    style: {
      color: 'var(--muted)',
      fontSize: '11px'
    }
  }, "Awarded by colleagues"))))))), /*#__PURE__*/React.createElement("aside", null, /*#__PURE__*/React.createElement("section", {
    className: "card profile-section"
  }, /*#__PURE__*/React.createElement("h2", null, "Details"), /*#__PURE__*/React.createElement("dl", null, /*#__PURE__*/React.createElement("dt", null, "Employee ID"), /*#__PURE__*/React.createElement("dd", {
    className: "mono"
  }, currentUser?.employeeId || currentUser?.id || 'EMP-001'), /*#__PURE__*/React.createElement("dt", null, "Department"), /*#__PURE__*/React.createElement("dd", null, userDept), /*#__PURE__*/React.createElement("dt", null, "Role / Access"), /*#__PURE__*/React.createElement("dd", null, currentUser?.role || 'EMPLOYEE'), /*#__PURE__*/React.createElement("dt", null, "Work Email"), /*#__PURE__*/React.createElement("dd", {
    style: {
      wordBreak: 'break-all'
    }
  }, currentUser?.email || `${userName.toLowerCase().replace(' ', '.')}@innovix.com`))), /*#__PURE__*/React.createElement("section", {
    className: "card profile-section"
  }, /*#__PURE__*/React.createElement("h2", null, "Skills & Endorsements"), /*#__PURE__*/React.createElement("div", {
    className: "chips"
  }, skillsList.map(skill => /*#__PURE__*/React.createElement("span", {
    key: skill
  }, skill)))), /*#__PURE__*/React.createElement("section", {
    className: "card profile-section"
  }, /*#__PURE__*/React.createElement("h2", null, "Recognition"), /*#__PURE__*/React.createElement("div", {
    className: "recognition-row"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "spark"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Innovation Catalyst"), /*#__PURE__*/React.createElement("p", null, userKudosReceived || 4, " peer kudos"))), /*#__PURE__*/React.createElement("div", {
    className: "recognition-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "coral"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "heart"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Team Collaboration"), /*#__PURE__*/React.createElement("p", null, (userKudosReceived || 4) + 6, " peer kudos")))))));
}
function DepartmentsView({
  departments = [],
  navigate,
  onSelectDept
}) {
  const [search, setSearch] = useState('');
  const defaultDepts = [{
    name: 'Engineering',
    totalEmployees: 12,
    activeEmployees: 11,
    postCount: 14,
    leads: [{
      name: 'Marcus Chen',
      initials: 'MC',
      tone: 'blue'
    }]
  }, {
    name: 'Product Design',
    totalEmployees: 5,
    activeEmployees: 5,
    postCount: 8,
    leads: [{
      name: 'Olivia Martin',
      initials: 'OM',
      tone: 'violet'
    }]
  }, {
    name: 'People & Culture',
    totalEmployees: 4,
    activeEmployees: 4,
    postCount: 5,
    leads: [{
      name: 'Priya Nair',
      initials: 'PN',
      tone: 'coral'
    }]
  }, {
    name: 'Executive Leadership',
    totalEmployees: 3,
    activeEmployees: 3,
    postCount: 4,
    leads: [{
      name: 'Alicia Rodriguez',
      initials: 'AR',
      tone: 'slate'
    }]
  }];
  const list = departments.length > 0 ? departments : defaultDepts;
  const filtered = list.filter(d => (d.name || '').toLowerCase().includes(search.toLowerCase()));
  return /*#__PURE__*/React.createElement("div", {
    className: "wide-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-heading"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "ORGANIZATION"), /*#__PURE__*/React.createElement("h1", null, "Company Departments"), /*#__PURE__*/React.createElement("p", null, "Explore cross-functional teams, department leads, and employee distributions.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "secondary-button",
    onClick: () => navigate('employees')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 15
  }), " Directory"))), /*#__PURE__*/React.createElement("div", {
    className: "directory-tools card",
    style: {
      marginBottom: '20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "table-search",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search"
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search departments...",
    value: search,
    onChange: e => setSearch(e.target.value)
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '13px',
      color: 'var(--muted)',
      alignSelf: 'center'
    }
  }, /*#__PURE__*/React.createElement("b", null, filtered.length), " departments active")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '18px'
    }
  }, filtered.map((d, i) => /*#__PURE__*/React.createElement("div", {
    className: "card",
    key: d.name || i,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: `feature-icon f${i % 4}`,
    style: {
      width: '40px',
      height: '40px',
      display: 'grid',
      placeItems: 'center',
      borderRadius: '10px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "building",
    size: 20
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: '17px',
      margin: 0,
      fontWeight: 700
    }
  }, d.name), /*#__PURE__*/React.createElement("small", {
    style: {
      color: 'var(--muted)',
      fontSize: '12px'
    }
  }, d.totalEmployees || 0, " employees \xB7 ", d.activeEmployees || 0, " active"))), /*#__PURE__*/React.createElement("span", {
    className: "role-tag"
  }, d.postCount || 0, " posts")), d.leads && d.leads.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface)',
      padding: '10px 14px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    person: d.leads[0],
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", {
    style: {
      display: 'block',
      fontSize: '10px',
      color: 'var(--muted)',
      textTransform: 'uppercase',
      fontWeight: 600
    }
  }, "Department Lead"), /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: '13px'
    }
  }, d.leads[0].name))), d.members && d.members.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      marginLeft: '6px'
    }
  }, d.members.slice(0, 5).map((m, mi) => /*#__PURE__*/React.createElement("span", {
    key: m.id || mi,
    style: {
      marginLeft: mi === 0 ? 0 : '-8px',
      border: '2px solid var(--surface-card, #fff)',
      borderRadius: '50%'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    person: m,
    size: "sm"
  })))), d.members.length > 5 && /*#__PURE__*/React.createElement("small", {
    style: {
      fontSize: '11px',
      color: 'var(--muted)',
      marginLeft: '4px'
    }
  }, "+", d.members.length - 5, " more")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      marginTop: '6px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "secondary-button",
    style: {
      flex: 1,
      justifyContent: 'center'
    },
    onClick: () => onSelectDept(d.name)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users",
    size: 14
  }), " View Members"))))));
}
function ProjectsView({
  projects = [],
  navigate,
  onSelectTag,
  onNewPost
}) {
  const [search, setSearch] = useState('');
  const defaultProjects = [{
    name: 'Project Atlas',
    postCount: 9,
    latestUpdate: '14m ago',
    contributors: [{
      name: 'Marcus Chen',
      initials: 'MC',
      tone: 'blue'
    }, {
      name: 'Daniel Kim',
      initials: 'DK',
      tone: 'green'
    }]
  }, {
    name: 'Design Systems',
    postCount: 6,
    latestUpdate: '1h ago',
    contributors: [{
      name: 'Olivia Martin',
      initials: 'OM',
      tone: 'violet'
    }]
  }, {
    name: 'Growth Team',
    postCount: 5,
    latestUpdate: '2h ago',
    contributors: [{
      name: 'Sophia Patel',
      initials: 'SP',
      tone: 'amber'
    }]
  }, {
    name: 'New Hire Journey',
    postCount: 4,
    latestUpdate: 'Yesterday',
    contributors: [{
      name: 'Priya Nair',
      initials: 'PN',
      tone: 'coral'
    }]
  }];
  const list = projects.length > 0 ? projects : defaultProjects;
  const filtered = list.filter(p => (p.name || '').toLowerCase().includes(search.toLowerCase()));
  return /*#__PURE__*/React.createElement("div", {
    className: "wide-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-heading"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "COLLABORATION"), /*#__PURE__*/React.createElement("h1", null, "Active Projects"), /*#__PURE__*/React.createElement("p", null, "Track initiatives, cross-team milestones, and project discussions across the company.")), /*#__PURE__*/React.createElement("button", {
    className: "primary-button",
    onClick: () => onNewPost('Project Atlas')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus"
  }), " Share Project Update")), /*#__PURE__*/React.createElement("div", {
    className: "directory-tools card",
    style: {
      marginBottom: '20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "table-search",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search"
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search projects by initiative tag...",
    value: search,
    onChange: e => setSearch(e.target.value)
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '13px',
      color: 'var(--muted)',
      alignSelf: 'center'
    }
  }, /*#__PURE__*/React.createElement("b", null, filtered.length), " projects active")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '18px'
    }
  }, filtered.map((proj, i) => /*#__PURE__*/React.createElement("div", {
    className: "card",
    key: proj.name || i,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: `feature-icon f${(i + 1) % 4}`,
    style: {
      width: '40px',
      height: '40px',
      display: 'grid',
      placeItems: 'center',
      borderRadius: '10px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "folder",
    size: 20
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: '17px',
      margin: 0,
      fontWeight: 700
    }
  }, proj.name), /*#__PURE__*/React.createElement("small", {
    style: {
      color: 'var(--muted)',
      fontSize: '12px'
    }
  }, proj.latestUpdate ? `Updated ${proj.latestUpdate}` : 'Active initiative'))), /*#__PURE__*/React.createElement("span", {
    className: "role-tag"
  }, proj.postCount || 0, " updates")), proj.recentPosts && proj.recentPosts.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface)',
      padding: '10px 14px',
      borderRadius: '10px',
      fontSize: '12px'
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      display: 'block',
      fontSize: '11px',
      color: 'var(--muted)',
      marginBottom: '4px'
    }
  }, "Latest update by ", proj.recentPosts[0].author, ":"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--text)',
      fontStyle: 'italic',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical'
    }
  }, "\"", proj.recentPosts[0].text, "\"")), proj.contributors && proj.contributors.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("small", {
    style: {
      fontSize: '11px',
      color: 'var(--muted)'
    }
  }, "Contributors:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      marginLeft: '4px'
    }
  }, proj.contributors.slice(0, 5).map((c, ci) => /*#__PURE__*/React.createElement("span", {
    key: c.id || ci,
    style: {
      marginLeft: ci === 0 ? 0 : '-8px',
      border: '2px solid var(--surface-card, #fff)',
      borderRadius: '50%'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    person: c,
    size: "sm"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "secondary-button",
    style: {
      flex: 1,
      justifyContent: 'center'
    },
    onClick: () => onSelectTag(proj.name)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "spark",
    size: 14
  }), " View Feed"), /*#__PURE__*/React.createElement("button", {
    className: "secondary-button",
    style: {
      flex: 1,
      justifyContent: 'center'
    },
    onClick: () => onNewPost(proj.name)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14
  }), " Post Update"))))));
}
function AchievementsView({
  achievements,
  onGiveKudos
}) {
  const totalKudos = achievements?.totalKudos || 6;
  const leaderboard = achievements?.leaderboard || [];
  const distribution = achievements?.kudosDistribution || {
    'Innovation Catalyst': 3,
    'Team Player & Collaboration': 2,
    'Customer Champion': 1
  };
  const stream = achievements?.recentKudos || [];
  return /*#__PURE__*/React.createElement("div", {
    className: "wide-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-heading"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "CULTURE & RECOGNITION"), /*#__PURE__*/React.createElement("h1", null, "Achievements & Kudos"), /*#__PURE__*/React.createElement("p", null, "Celebrate peer contributions, milestone wins, and company impact.")), /*#__PURE__*/React.createElement("button", {
    className: "primary-button",
    onClick: onGiveKudos
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "award"
  }), " Award Kudos")), /*#__PURE__*/React.createElement("div", {
    className: "stat-grid",
    style: {
      marginBottom: '20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-card card"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "award"
  })), /*#__PURE__*/React.createElement("small", null, "Total Kudos Awarded"), /*#__PURE__*/React.createElement("strong", null, totalKudos), /*#__PURE__*/React.createElement("p", null, "Recognitions across teams")), /*#__PURE__*/React.createElement("div", {
    className: "stat-card card"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "spark"
  })), /*#__PURE__*/React.createElement("small", null, "Top Recognized"), /*#__PURE__*/React.createElement("strong", null, leaderboard[0]?.user?.name || 'Marcus Chen'), /*#__PURE__*/React.createElement("p", null, leaderboard[0]?.count || 3, " peer recognitions")), /*#__PURE__*/React.createElement("div", {
    className: "stat-card card"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "heart"
  })), /*#__PURE__*/React.createElement("small", null, "Active Kudos Badges"), /*#__PURE__*/React.createElement("strong", null, Object.keys(distribution).length), /*#__PURE__*/React.createElement("p", null, "Recognition categories")), /*#__PURE__*/React.createElement("div", {
    className: "stat-card card"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "users"
  })), /*#__PURE__*/React.createElement("small", null, "Team Participation"), /*#__PURE__*/React.createElement("strong", null, "96%"), /*#__PURE__*/React.createElement("p", null, "Engagement in appreciation"))), /*#__PURE__*/React.createElement("div", {
    className: "roles-layout"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "roles-list card",
    style: {
      padding: '20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "roles-list-head",
    style: {
      marginBottom: '14px'
    }
  }, /*#__PURE__*/React.createElement("b", null, "Recognition Leaderboard"), /*#__PURE__*/React.createElement("span", null, "Top Contributors")), leaderboard.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)',
      fontSize: '13px'
    }
  }, "Start recognizing teammates in the company feed!") : leaderboard.map((item, idx) => /*#__PURE__*/React.createElement("div", {
    key: item.user?.id || idx,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px 12px',
      borderRadius: '10px',
      background: idx === 0 ? 'var(--surface-highlight, rgba(92, 92, 226, 0.08))' : 'transparent',
      border: idx === 0 ? '1px solid rgba(92, 92, 226, 0.2)' : 'none',
      marginBottom: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: '14px',
      width: '20px',
      color: idx === 0 ? '#f59e0b' : idx === 1 ? '#94a3b8' : '#b45309'
    }
  }, "#", idx + 1), /*#__PURE__*/React.createElement(Avatar, {
    person: item.user,
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      display: 'block',
      fontSize: '13px'
    }
  }, item.user?.name), /*#__PURE__*/React.createElement("small", {
    style: {
      color: 'var(--muted)',
      fontSize: '11px'
    }
  }, item.user?.department)), /*#__PURE__*/React.createElement("span", {
    className: "role-tag",
    style: {
      background: '#fef3c7',
      color: '#92400e',
      fontWeight: 700
    }
  }, "\uD83C\uDF1F ", item.count))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '20px',
      paddingTop: '16px',
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      display: 'block',
      fontSize: '12px',
      color: 'var(--muted)',
      textTransform: 'uppercase',
      marginBottom: '10px'
    }
  }, "Badge Types"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }
  }, Object.entries(distribution).map(([type, count]) => /*#__PURE__*/React.createElement("div", {
    key: type,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '12px'
    }
  }, /*#__PURE__*/React.createElement("span", null, type), /*#__PURE__*/React.createElement("b", null, count)))))), /*#__PURE__*/React.createElement("section", {
    className: "permissions-panel card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head",
    style: {
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Recent Recognition Stream"), /*#__PURE__*/React.createElement("p", null, "Real-time celebrations and peer appreciation feed"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    }
  }, stream.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted)',
      fontSize: '13px'
    }
  }, "No kudos awarded yet. Click \"Award Kudos\" to be the first!") : stream.map((k, i) => /*#__PURE__*/React.createElement("div", {
    key: k.id || i,
    style: {
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '14px 18px',
      background: 'var(--surface)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '20px'
    }
  }, "\uD83C\uDF1F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '13px'
    }
  }, /*#__PURE__*/React.createElement("b", null, k.sender), " awarded ", /*#__PURE__*/React.createElement("strong", null, k.type), " to ", /*#__PURE__*/React.createElement("b", null, k.recipient)), /*#__PURE__*/React.createElement("small", {
    style: {
      display: 'block',
      color: 'var(--muted)',
      fontSize: '11px'
    }
  }, k.recipientDept, " \xB7 ", k.time))), /*#__PURE__*/React.createElement("span", {
    className: "role-tag"
  }, k.projectTag || 'Project')), k.postExcerpt && /*#__PURE__*/React.createElement("div", {
    style: {
      fontStyle: 'italic',
      fontSize: '12px',
      color: 'var(--text)',
      background: 'var(--surface-card, #fff)',
      padding: '8px 12px',
      borderRadius: '8px',
      border: '1px solid var(--border)'
    }
  }, "\"", k.postExcerpt, "\"")))))));
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
}) {
  const [activeTab, setActiveTab] = useState('profile');

  // Profile Form State
  const [pName, setPName] = useState(currentUser?.name || '');
  const [pDesignation, setPDesignation] = useState(currentUser?.designation || currentUser?.role || '');
  const [pDepartment, setPDepartment] = useState(currentUser?.department || currentUser?.dept || 'Engineering');
  const [pBio, setPBio] = useState(currentUser?.bio || '');
  const [pSkills, setPSkills] = useState(currentUser?.skills || 'Design Systems, TypeScript, Full-Stack');
  const [savingProfile, setSavingProfile] = useState(false);

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  // Workspace Form State
  const [wsName, setWsName] = useState(currentCompany?.name || '');
  const [wsIndustry, setWsIndustry] = useState(workspaceSettings?.company?.industry || 'Enterprise Software');
  const [wsSize, setWsSize] = useState(workspaceSettings?.company?.companySize || '250-500 employees');
  const [wsWebsite, setWsWebsite] = useState(workspaceSettings?.company?.website || 'https://innovix.tech');
  const [savingWs, setSavingWs] = useState(false);
  const handleProfileSubmit = async e => {
    e.preventDefault();
    setSavingProfile(true);
    await onUpdateProfile({
      name: pName,
      designation: pDesignation,
      department: pDepartment,
      bio: pBio,
      skills: pSkills
    });
    setSavingProfile(false);
  };
  const handlePasswordSubmit = async e => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match.');
      return;
    }
    setSavingPassword(true);
    const ok = await onChangePassword({
      currentPassword,
      newPassword
    });
    setSavingPassword(false);
    if (ok) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };
  const handleWorkspaceSubmit = async e => {
    e.preventDefault();
    setSavingWs(true);
    await onUpdateWorkspace({
      name: wsName,
      industry: wsIndustry,
      companySize: wsSize,
      website: wsWebsite
    });
    setSavingWs(false);
  };
  const testDb = async () => {
    try {
      const res = await apiCall('/database-status');
      showToast(`Database: ${res.primary} · Supabase Connected: ${res.supabase?.connected ? 'YES' : 'NO'}`);
      refreshData();
    } catch (e) {
      showToast('DB Status check failed: ' + e.message);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "wide-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-heading"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "PREFERENCES & SYSTEM"), /*#__PURE__*/React.createElement("h1", null, "Workspace Settings"), /*#__PURE__*/React.createElement("p", null, "Manage your account credentials, workspace configurations, and database infrastructure."))), /*#__PURE__*/React.createElement("div", {
    className: "roles-layout"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "roles-list card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "roles-list-head"
  }, /*#__PURE__*/React.createElement("b", null, "Settings Menu")), /*#__PURE__*/React.createElement("button", {
    className: activeTab === 'profile' ? 'selected' : '',
    onClick: () => setActiveTab('profile')
  }, /*#__PURE__*/React.createElement("span", {
    className: "role-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Profile & Bio"), /*#__PURE__*/React.createElement("small", null, "Personal details and title"))), /*#__PURE__*/React.createElement("button", {
    className: activeTab === 'security' ? 'selected' : '',
    onClick: () => setActiveTab('security')
  }, /*#__PURE__*/React.createElement("span", {
    className: "role-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Security & Auth"), /*#__PURE__*/React.createElement("small", null, "Change login password"))), /*#__PURE__*/React.createElement("button", {
    className: activeTab === 'workspace' ? 'selected' : '',
    onClick: () => setActiveTab('workspace')
  }, /*#__PURE__*/React.createElement("span", {
    className: "role-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "building"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Company Workspace"), /*#__PURE__*/React.createElement("small", null, "Organization info"))), /*#__PURE__*/React.createElement("button", {
    className: activeTab === 'database' ? 'selected' : '',
    onClick: () => setActiveTab('database')
  }, /*#__PURE__*/React.createElement("span", {
    className: "role-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Database & Cloud"), /*#__PURE__*/React.createElement("small", null, "Supabase PostgreSQL status")))), /*#__PURE__*/React.createElement("section", {
    className: "permissions-panel card",
    style: {
      padding: '24px'
    }
  }, activeTab === 'profile' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-head",
    style: {
      marginBottom: '18px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Personal Profile Details"), /*#__PURE__*/React.createElement("p", null, "Update your public identity displayed across the company network."))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleProfileSubmit,
    className: "form-grid one"
  }, /*#__PURE__*/React.createElement("label", null, "Full name", /*#__PURE__*/React.createElement("input", {
    value: pName,
    onChange: e => setPName(e.target.value),
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "field-row"
  }, /*#__PURE__*/React.createElement("label", null, "Designation / Role", /*#__PURE__*/React.createElement("input", {
    value: pDesignation,
    onChange: e => setPDesignation(e.target.value)
  })), /*#__PURE__*/React.createElement("label", null, "Department", /*#__PURE__*/React.createElement("select", {
    value: pDepartment,
    onChange: e => setPDepartment(e.target.value)
  }, /*#__PURE__*/React.createElement("option", null, "Engineering"), /*#__PURE__*/React.createElement("option", null, "Product Design"), /*#__PURE__*/React.createElement("option", null, "Product"), /*#__PURE__*/React.createElement("option", null, "Marketing"), /*#__PURE__*/React.createElement("option", null, "People & Culture"), /*#__PURE__*/React.createElement("option", null, "Infrastructure"), /*#__PURE__*/React.createElement("option", null, "Executive Leadership"), /*#__PURE__*/React.createElement("option", null, "Executive Office"), /*#__PURE__*/React.createElement("option", null, "General")))), /*#__PURE__*/React.createElement("label", null, "Professional bio", /*#__PURE__*/React.createElement("textarea", {
    rows: 3,
    value: pBio,
    onChange: e => setPBio(e.target.value),
    placeholder: "Summary of what you do..."
  })), /*#__PURE__*/React.createElement("label", null, "Skills & specialties", /*#__PURE__*/React.createElement("input", {
    value: pSkills,
    onChange: e => setPSkills(e.target.value),
    placeholder: "Comma-separated skills"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '14px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "primary-button",
    disabled: savingProfile
  }, savingProfile ? 'Saving...' : 'Save Profile Changes')))), activeTab === 'security' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-head",
    style: {
      marginBottom: '18px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Change Password"), /*#__PURE__*/React.createElement("p", null, "Update your credentials with timing-safe validation and session refresh."))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handlePasswordSubmit,
    className: "form-grid one",
    style: {
      maxWidth: '480px'
    }
  }, /*#__PURE__*/React.createElement("label", null, "Current password", /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: currentPassword,
    onChange: e => setCurrentPassword(e.target.value),
    required: true
  })), /*#__PURE__*/React.createElement("label", null, "New password (at least 6 characters with letters and numbers)", /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: newPassword,
    onChange: e => setNewPassword(e.target.value),
    required: true
  })), /*#__PURE__*/React.createElement("label", null, "Confirm new password", /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: confirmPassword,
    onChange: e => setConfirmPassword(e.target.value),
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '14px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "primary-button",
    disabled: savingPassword
  }, savingPassword ? 'Updating...' : 'Update Password')))), activeTab === 'workspace' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-head",
    style: {
      marginBottom: '18px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Workspace Information"), /*#__PURE__*/React.createElement("p", null, "Organization code and parameters for ", currentCompany?.name, "."))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleWorkspaceSubmit,
    className: "form-grid one"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field-row"
  }, /*#__PURE__*/React.createElement("label", null, "Company Name", /*#__PURE__*/React.createElement("input", {
    value: wsName,
    onChange: e => setWsName(e.target.value),
    required: true
  })), /*#__PURE__*/React.createElement("label", null, "Workspace Code", /*#__PURE__*/React.createElement("input", {
    value: currentCompany?.workspaceId || 'INX-48291',
    readOnly: true,
    style: {
      background: 'var(--surface)',
      fontWeight: 'bold'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "field-row"
  }, /*#__PURE__*/React.createElement("label", null, "Industry", /*#__PURE__*/React.createElement("input", {
    value: wsIndustry,
    onChange: e => setWsIndustry(e.target.value)
  })), /*#__PURE__*/React.createElement("label", null, "Company Size", /*#__PURE__*/React.createElement("select", {
    value: wsSize,
    onChange: e => setWsSize(e.target.value)
  }, /*#__PURE__*/React.createElement("option", null, "10-50 employees"), /*#__PURE__*/React.createElement("option", null, "50-100 employees"), /*#__PURE__*/React.createElement("option", null, "100-250 employees"), /*#__PURE__*/React.createElement("option", null, "250-500 employees"), /*#__PURE__*/React.createElement("option", null, "500+ employees")))), /*#__PURE__*/React.createElement("label", null, "Company Website", /*#__PURE__*/React.createElement("input", {
    value: wsWebsite,
    onChange: e => setWsWebsite(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '14px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "primary-button",
    disabled: savingWs
  }, savingWs ? 'Saving...' : 'Save Workspace Settings')))), activeTab === 'database' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-head",
    style: {
      marginBottom: '18px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Database & Infrastructure Status"), /*#__PURE__*/React.createElement("p", null, "Dual-resilience database architecture: Supabase PostgreSQL + Local SQLite fallback.")), /*#__PURE__*/React.createElement("button", {
    className: "secondary-button",
    onClick: testDb
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "spark",
    size: 15
  }), " Ping Database")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px',
      background: 'rgba(34, 197, 94, 0.08)',
      border: '1px solid rgba(34, 197, 94, 0.3)',
      borderRadius: '12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      background: '#22c55e',
      display: 'inline-block'
    }
  }), /*#__PURE__*/React.createElement("b", {
    style: {
      color: '#15803d',
      fontSize: '14px'
    }
  }, "Primary Database: Supabase PostgreSQL 17 (ACTIVE_HEALTHY)")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 0 22px',
      fontSize: '12px',
      color: '#166534'
    }
  }, "Connected to remote PostgreSQL cluster on project ", /*#__PURE__*/React.createElement("strong", {
    className: "mono"
  }, "qlcnvowuoulukxllatxt"), " (Region: ap-northeast-2).")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '12px'
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: '13px'
    }
  }, "Infrastructure Details"), /*#__PURE__*/React.createElement("dl", {
    style: {
      display: 'grid',
      gridTemplateColumns: '180px 1fr',
      gap: '8px',
      fontSize: '12px',
      marginTop: '10px'
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      color: 'var(--muted)'
    }
  }, "Project Reference"), /*#__PURE__*/React.createElement("dd", {
    className: "mono"
  }, "qlcnvowuoulukxllatxt"), /*#__PURE__*/React.createElement("dt", {
    style: {
      color: 'var(--muted)'
    }
  }, "Supabase URL"), /*#__PURE__*/React.createElement("dd", {
    className: "mono"
  }, "https://qlcnvowuoulukxllatxt.supabase.co"), /*#__PURE__*/React.createElement("dt", {
    style: {
      color: 'var(--muted)'
    }
  }, "Database Version"), /*#__PURE__*/React.createElement("dd", null, "PostgreSQL 17.6"), /*#__PURE__*/React.createElement("dt", {
    style: {
      color: 'var(--muted)'
    }
  }, "Offline Fallback"), /*#__PURE__*/React.createElement("dd", null, "SQLite (data/company_connect.db) \xB7 Active Sync"))))))));
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
}) {
  const [done, setDone] = useState(false);
  const [closing, setClosing] = useState(false);

  // Post form state
  const [postText, setPostText] = useState('');
  const [postType, setPostType] = useState('Daily Work Update');
  const [postTag, setPostTag] = useState('Project Atlas');
  const [postImage, setPostImage] = useState(undefined);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState('');
  const fileInputRef = useRef(null);
  const handleFileChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        alert('Photo must be under 25MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = ev => {
        const raw = ev.target?.result;
        if (!raw) return;
        const img = new Image();
        img.onload = () => {
          const maxDim = 1600;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round(h * maxDim / w);
              w = maxDim;
            } else {
              w = Math.round(w * maxDim / h);
              h = maxDim;
            }
          }
          try {
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, w, h);
              const compressed = canvas.toDataURL('image/jpeg', 0.88);
              setPostImage(compressed);
              return;
            }
          } catch (err) {}
          setPostImage(raw);
        };
        img.onerror = () => {
          setPostImage(raw);
        };
        img.src = raw;
      };
      reader.readAsDataURL(file);
    }
    if (e.target) e.target.value = '';
  };
  const requestClose = () => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(close, 180);
  };
  const titles = {
    post: 'Create a post',
    employee: 'Add employee',
    'edit-employee': 'Edit Employee & Login Credentials',
    role: 'Create custom role',
    announcement: 'New announcement',
    notifications: 'Notifications',
    workspace: 'Switch workspace',
    kudos: 'Recognize a Colleague with Kudos',
    'edit-profile': 'Edit Profile'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: `modal-backdrop ${closing ? 'is-closing' : ''}`,
    onMouseDown: requestClose
  }, /*#__PURE__*/React.createElement("div", {
    className: `modal ${type === 'post' ? 'post-modal' : ''}`,
    onMouseDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, done && type === 'employee' ? 'Employee created' : titles[type] || 'Dialog'), type === 'employee' && !done && /*#__PURE__*/React.createElement("p", null, "Create an account and generate temporary credentials.")), /*#__PURE__*/React.createElement("button", {
    className: "icon-button",
    onClick: requestClose
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x"
  }))), type === 'post' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "modal-user"
  }, /*#__PURE__*/React.createElement(Avatar, {
    person: currentUser ? {
      initials: currentUser.initials,
      tone: currentUser.tone
    } : undefined
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, currentUser ? currentUser.name : 'Olivia Martin'), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "building",
    size: 13
  }), " Everyone at ", currentCompany?.name || 'Innovix', " ", /*#__PURE__*/React.createElement(Icon, {
    name: "chevron",
    size: 13
  })))), /*#__PURE__*/React.createElement("textarea", {
    className: "post-editor",
    placeholder: "What would you like to share? Work update, project win, or request for collaboration...",
    value: postText,
    onChange: e => setPostText(e.target.value),
    rows: 4
  }), /*#__PURE__*/React.createElement("input", {
    type: "file",
    ref: fileInputRef,
    accept: "image/*",
    style: {
      display: 'none'
    },
    onChange: handleFileChange
  }), /*#__PURE__*/React.createElement("div", {
    className: "upload-zone",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "image",
    size: 24
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      display: 'block',
      fontSize: '13px'
    }
  }, "Image Attachment"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '11px',
      color: 'var(--muted)'
    }
  }, postImage ? 'Photo attached · Ready to publish' : 'Select a photo from your computer or paste an image link')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "secondary-button",
    onClick: () => fileInputRef.current?.click(),
    style: {
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "image",
    size: 14
  }), " ", postImage ? 'Change photo' : 'Upload photo'), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "secondary-button",
    onClick: () => setShowUrlInput(!showUrlInput),
    style: {
      whiteSpace: 'nowrap'
    }
  }, "Paste URL"), postImage && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "icon-button",
    title: "Remove photo",
    onClick: () => setPostImage(undefined),
    style: {
      color: '#e85f5f'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 16
  })))), showUrlInput && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      width: '100%',
      marginTop: '6px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "https://images.unsplash.com/... or paste image URL",
    value: urlInputValue,
    onChange: e => setUrlInputValue(e.target.value),
    style: {
      flex: 1,
      padding: '7px 11px',
      borderRadius: '8px',
      border: '1px solid var(--border)',
      background: 'var(--surface)',
      fontSize: '12px'
    },
    onKeyDown: e => {
      if (e.key === 'Enter' && urlInputValue.trim()) {
        e.preventDefault();
        setPostImage(urlInputValue.trim());
        setShowUrlInput(false);
      }
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "secondary-button",
    onClick: () => {
      if (urlInputValue.trim()) {
        setPostImage(urlInputValue.trim());
        setShowUrlInput(false);
      }
    }
  }, "Apply"))), postImage && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      marginTop: '-8px',
      marginBottom: '16px',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      background: '#000'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: postImage,
    alt: "Attachment preview",
    style: {
      width: '100%',
      maxHeight: '200px',
      objectFit: 'cover',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setPostImage(undefined),
    style: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.7)',
      color: '#fff',
      border: 'none',
      borderRadius: '50%',
      width: '28px',
      height: '28px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold'
    },
    title: "Remove image"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "field-row"
  }, /*#__PURE__*/React.createElement("label", null, "Post type", /*#__PURE__*/React.createElement("select", {
    value: postType,
    onChange: e => setPostType(e.target.value)
  }, /*#__PURE__*/React.createElement("option", null, "Daily Work Update"), /*#__PURE__*/React.createElement("option", null, "Project Progress"), /*#__PURE__*/React.createElement("option", null, "Employee Achievement"), /*#__PURE__*/React.createElement("option", null, "Team Celebration"), /*#__PURE__*/React.createElement("option", null, "Help Needed"))), /*#__PURE__*/React.createElement("label", null, "Project tag", /*#__PURE__*/React.createElement("select", {
    value: postTag,
    onChange: e => setPostTag(e.target.value)
  }, /*#__PURE__*/React.createElement("option", null, "Project Atlas"), /*#__PURE__*/React.createElement("option", null, "Design Systems"), /*#__PURE__*/React.createElement("option", null, "Growth Team"), /*#__PURE__*/React.createElement("option", null, "New Hire Journey"), /*#__PURE__*/React.createElement("option", null, "Culture Club")))), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "text-button",
    onClick: requestClose
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "primary-button",
    onClick: () => {
      if (!postText.trim() && !postImage) {
        alert('Please write a message or attach a photo to publish.');
        return;
      }
      onCreatePost({
        text: postText.trim() || 'Shared a photo update.',
        type: postType,
        tag: postTag,
        image: postImage
      });
      requestClose();
    }
  }, "Publish post ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 15
  })))), type === 'employee' && (done ? /*#__PURE__*/React.createElement(CredentialSuccess, {
    close: requestClose
  }) : /*#__PURE__*/React.createElement(FormFields, {
    type: "employee",
    submit: data => {
      onAddEmployee(data);
      setDone(true);
    },
    close: requestClose
  })), type === 'kudos' && kudosPost && /*#__PURE__*/React.createElement(KudosModal, {
    target: kudosPost,
    close: requestClose,
    onAward: kType => {
      if (onAwardKudos) onAwardKudos(kudosPost.id, kType);
      requestClose();
    }
  }), type === 'role' && /*#__PURE__*/React.createElement(CreateRoleModal, {
    close: requestClose,
    onSave: onCreateRole || (() => {})
  }), type === 'announcement' && /*#__PURE__*/React.createElement(FormFields, {
    type: "announcement",
    submit: data => {
      onAddAnnouncement(data);
      requestClose();
    },
    close: requestClose
  }), type === 'edit-employee' && editingEmployee && /*#__PURE__*/React.createElement(EditEmployeeForm, {
    employee: editingEmployee,
    submit: data => {
      if (onUpdateEmployee) onUpdateEmployee(data);
      requestClose();
    },
    close: requestClose
  }), type === 'notifications' && /*#__PURE__*/React.createElement(NotificationPanel, {
    notifications: notifications,
    onMarkAllRead: onMarkAllRead,
    close: requestClose
  }), type === 'workspace' && /*#__PURE__*/React.createElement(WorkspaceSwitch, {
    close: requestClose
  }), type === 'edit-profile' && /*#__PURE__*/React.createElement(EditProfileModal, {
    currentUser: currentUser,
    close: requestClose,
    onSave: onUpdateProfile || (async () => false)
  })));
}
function EditEmployeeForm({
  employee,
  submit,
  close
}) {
  const [name, setName] = useState(employee.name || '');
  const [employeeId, setEmployeeId] = useState(employee.employeeId || employee.id || '');
  const [email, setEmail] = useState(employee.email || '');
  const [dept, setDept] = useState(employee.dept || 'Engineering');
  const [designation, setDesignation] = useState(employee.role || 'Team Member');
  const [role, setRole] = useState(employee.role === 'ADMIN' || employee.role === 'Company Admin' ? 'ADMIN' : 'EMPLOYEE');
  const [status, setStatus] = useState(employee.status || 'Active');
  const [newPassword, setNewPassword] = useState('');
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
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
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-grid"
  }, /*#__PURE__*/React.createElement("label", null, "Full name", /*#__PURE__*/React.createElement("input", {
    value: name,
    onChange: e => setName(e.target.value),
    required: true
  })), /*#__PURE__*/React.createElement("label", null, "Employee Login ID", /*#__PURE__*/React.createElement("input", {
    value: employeeId,
    onChange: e => setEmployeeId(e.target.value),
    placeholder: "e.g. EMP-1024",
    required: true
  }), /*#__PURE__*/React.createElement("small", {
    style: {
      fontSize: '8px',
      color: 'var(--muted)',
      display: 'block',
      marginTop: '2px'
    }
  }, "Used for employee sign-in credentials")), /*#__PURE__*/React.createElement("label", null, "Work email address", /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    required: true
  })), /*#__PURE__*/React.createElement("label", null, "Department", /*#__PURE__*/React.createElement("select", {
    value: dept,
    onChange: e => setDept(e.target.value)
  }, /*#__PURE__*/React.createElement("option", null, "Engineering"), /*#__PURE__*/React.createElement("option", null, "Product Design"), /*#__PURE__*/React.createElement("option", null, "Product"), /*#__PURE__*/React.createElement("option", null, "Marketing"), /*#__PURE__*/React.createElement("option", null, "People & Culture"), /*#__PURE__*/React.createElement("option", null, "Infrastructure"), /*#__PURE__*/React.createElement("option", null, "Product Management"), /*#__PURE__*/React.createElement("option", null, "Executive Office"))), /*#__PURE__*/React.createElement("label", null, "Designation / Title", /*#__PURE__*/React.createElement("input", {
    value: designation,
    onChange: e => setDesignation(e.target.value),
    required: true
  })), /*#__PURE__*/React.createElement("label", null, "System role", /*#__PURE__*/React.createElement("select", {
    value: role,
    onChange: e => setRole(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: "EMPLOYEE"
  }, "Employee"), /*#__PURE__*/React.createElement("option", {
    value: "ADMIN"
  }, "Company Administrator"))), /*#__PURE__*/React.createElement("label", null, "Account status", /*#__PURE__*/React.createElement("select", {
    value: status,
    onChange: e => setStatus(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: "Active"
  }, "Active (Permitted to log in)"), /*#__PURE__*/React.createElement("option", {
    value: "Pending"
  }, "Pending (Awaiting approval)"), /*#__PURE__*/React.createElement("option", {
    value: "Rejected"
  }, "Rejected"))), /*#__PURE__*/React.createElement("label", null, "Reset password (Optional)", /*#__PURE__*/React.createElement("input", {
    type: "password",
    placeholder: "Leave blank to keep current password",
    value: newPassword,
    onChange: e => setNewPassword(e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "text-button",
    onClick: close
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "primary-button"
  }, "Save Credentials & Details ", /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 14
  }))));
}
function FormFields({
  type,
  submit,
  close
}) {
  const [empName, setEmpName] = useState('Alex Morgan');
  const [empId, setEmpId] = useState('INX-2048');
  const [empEmail, setEmpEmail] = useState('alex.morgan@innovix.com');
  const [empDept, setEmpDept] = useState('Engineering');
  const [empRole, setEmpRole] = useState('Senior Software Engineer');
  const [empAssignedRole, setEmpAssignedRole] = useState('Employee');
  const [tempPassword, setTempPassword] = useState('Inx!24-Launch');
  const [annTitle, setAnnTitle] = useState('');
  const [annPriority, setAnnPriority] = useState('STANDARD');
  const [annMessage, setAnnMessage] = useState('');
  if (type === 'role') {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "form-grid one"
    }, /*#__PURE__*/React.createElement("label", null, "Role name", /*#__PURE__*/React.createElement("input", {
      placeholder: "e.g. Project Coordinator"
    })), /*#__PURE__*/React.createElement("label", null, "Role description", /*#__PURE__*/React.createElement("textarea", {
      placeholder: "Describe what this role is responsible for"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "modal-permissions"
    }, /*#__PURE__*/React.createElement("h3", null, "Starting permissions"), ['Create posts', 'View employee directory', 'Create announcements', 'View company analytics'].map((x, i) => /*#__PURE__*/React.createElement("div", {
      key: x
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, x), /*#__PURE__*/React.createElement("small", null, permissionDescription(x))), /*#__PURE__*/React.createElement(Toggle, {
      initial: i < 2
    })))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      className: "text-button",
      onClick: close
    }, "Cancel"), /*#__PURE__*/React.createElement("button", {
      className: "primary-button",
      onClick: () => submit()
    }, "Save role")));
  }
  if (type === 'announcement') {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "form-grid one"
    }, /*#__PURE__*/React.createElement("label", null, "Announcement title", /*#__PURE__*/React.createElement("input", {
      placeholder: "What should everyone know?",
      value: annTitle,
      onChange: e => setAnnTitle(e.target.value)
    })), /*#__PURE__*/React.createElement("div", {
      className: "field-row"
    }, /*#__PURE__*/React.createElement("label", null, "Audience", /*#__PURE__*/React.createElement("select", null, /*#__PURE__*/React.createElement("option", null, "Entire company"), /*#__PURE__*/React.createElement("option", null, "Engineering only"))), /*#__PURE__*/React.createElement("label", null, "Priority", /*#__PURE__*/React.createElement("select", {
      value: annPriority,
      onChange: e => setAnnPriority(e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: "STANDARD"
    }, "Standard"), /*#__PURE__*/React.createElement("option", {
      value: "HIGH"
    }, "High priority"), /*#__PURE__*/React.createElement("option", {
      value: "URGENT"
    }, "Urgent alert")))), /*#__PURE__*/React.createElement("label", null, "Message", /*#__PURE__*/React.createElement("textarea", {
      rows: 4,
      placeholder: "Write a clear, helpful company announcement...",
      value: annMessage,
      onChange: e => setAnnMessage(e.target.value)
    }))), /*#__PURE__*/React.createElement("div", {
      className: "modal-footer"
    }, /*#__PURE__*/React.createElement("button", {
      className: "text-button",
      onClick: close
    }, "Save draft"), /*#__PURE__*/React.createElement("button", {
      className: "primary-button",
      onClick: () => {
        if (!annTitle.trim()) {
          alert('Please enter an announcement title.');
          return;
        }
        submit({
          title: annTitle,
          priority: annPriority,
          content: annMessage || 'Official company announcement.'
        });
      }
    }, "Publish announcement")));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "form-grid"
  }, /*#__PURE__*/React.createElement("label", null, "Full name", /*#__PURE__*/React.createElement("input", {
    value: empName,
    onChange: e => setEmpName(e.target.value)
  })), /*#__PURE__*/React.createElement("label", null, "Employee ID", /*#__PURE__*/React.createElement("input", {
    value: empId,
    onChange: e => setEmpId(e.target.value)
  })), /*#__PURE__*/React.createElement("label", null, "Employee email", /*#__PURE__*/React.createElement("input", {
    value: empEmail,
    onChange: e => setEmpEmail(e.target.value)
  })), /*#__PURE__*/React.createElement("label", null, "Department", /*#__PURE__*/React.createElement("select", {
    value: empDept,
    onChange: e => setEmpDept(e.target.value)
  }, /*#__PURE__*/React.createElement("option", null, "Engineering"), /*#__PURE__*/React.createElement("option", null, "Product Design"), /*#__PURE__*/React.createElement("option", null, "Product"), /*#__PURE__*/React.createElement("option", null, "Marketing"), /*#__PURE__*/React.createElement("option", null, "People & Culture"))), /*#__PURE__*/React.createElement("label", null, "Designation", /*#__PURE__*/React.createElement("input", {
    value: empRole,
    onChange: e => setEmpRole(e.target.value)
  })), /*#__PURE__*/React.createElement("label", null, "Assigned role", /*#__PURE__*/React.createElement("select", {
    value: empAssignedRole,
    onChange: e => setEmpAssignedRole(e.target.value)
  }, /*#__PURE__*/React.createElement("option", null, "Employee"), /*#__PURE__*/React.createElement("option", null, "Team Lead"), /*#__PURE__*/React.createElement("option", null, "HR Manager"), /*#__PURE__*/React.createElement("option", null, "Company Admin"))), /*#__PURE__*/React.createElement("label", {
    className: "full"
  }, "Temporary password", /*#__PURE__*/React.createElement("div", {
    className: "input-action"
  }, /*#__PURE__*/React.createElement("input", {
    value: tempPassword,
    readOnly: true
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setTempPassword('Inx!' + Math.floor(10 + Math.random() * 89) + '-Pass')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "spark",
    size: 15
  }), "Generate")))), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "text-button",
    onClick: close
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "primary-button",
    onClick: () => {
      submit({
        name: empName,
        id: empId,
        email: empEmail,
        dept: empDept,
        designation: empRole,
        role: empAssignedRole
      });
    }
  }, "Create employee account")));
}
function CredentialSuccess({
  close
}) {
  const [copied, setCopied] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "credential-success"
  }, /*#__PURE__*/React.createElement("span", {
    className: "success-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 26
  })), /*#__PURE__*/React.createElement("h3", null, "Alex is ready to join Innovix"), /*#__PURE__*/React.createElement("p", null, "Share these temporary credentials securely. Alex will choose a new password upon first login."), /*#__PURE__*/React.createElement("div", {
    className: "credential-box"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "EMPLOYEE EMAIL"), /*#__PURE__*/React.createElement("b", null, "alex.morgan@innovix.com")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "WORKSPACE ID"), /*#__PURE__*/React.createElement("b", null, "INX-48291")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "TEMPORARY PASSWORD"), /*#__PURE__*/React.createElement("b", {
    className: "mono"
  }, "Inx!24-Launch")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "LOGIN URL"), /*#__PURE__*/React.createElement("b", null, "companyconnect.app/innovix"))), /*#__PURE__*/React.createElement("div", {
    className: "credential-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "secondary-button",
    onClick: () => {
      navigator.clipboard?.writeText('Email: alex.morgan@innovix.com | Workspace: INX-48291 | Pass: Inx!24-Launch');
      setCopied(true);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: copied ? 'check' : 'copy'
  }), copied ? 'Copied to clipboard!' : 'Copy credentials'), /*#__PURE__*/React.createElement("button", {
    className: "primary-button",
    onClick: close
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail"
  }), "Send invitation")));
}
function EditProfileModal({
  currentUser,
  close,
  onSave
}) {
  const [name, setName] = useState(currentUser?.name || '');
  const [designation, setDesignation] = useState(currentUser?.designation || currentUser?.role || '');
  const [department, setDepartment] = useState(currentUser?.department || currentUser?.dept || 'Engineering');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [skills, setSkills] = useState(currentUser?.skills || 'Design Systems, Accessibility, Collaboration');
  const [saving, setSaving] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    const ok = await onSave({
      name,
      designation,
      department,
      bio,
      skills
    });
    setSaving(false);
    if (ok) close();
  };
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "form-grid one",
    style: {
      padding: '8px 0'
    }
  }, /*#__PURE__*/React.createElement("label", null, "Full name", /*#__PURE__*/React.createElement("input", {
    value: name,
    onChange: e => setName(e.target.value),
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "field-row"
  }, /*#__PURE__*/React.createElement("label", null, "Designation / Job Title", /*#__PURE__*/React.createElement("input", {
    value: designation,
    onChange: e => setDesignation(e.target.value)
  })), /*#__PURE__*/React.createElement("label", null, "Department", /*#__PURE__*/React.createElement("select", {
    value: department,
    onChange: e => setDepartment(e.target.value)
  }, /*#__PURE__*/React.createElement("option", null, "Engineering"), /*#__PURE__*/React.createElement("option", null, "Product Design"), /*#__PURE__*/React.createElement("option", null, "Product"), /*#__PURE__*/React.createElement("option", null, "Marketing"), /*#__PURE__*/React.createElement("option", null, "People & Culture"), /*#__PURE__*/React.createElement("option", null, "Infrastructure"), /*#__PURE__*/React.createElement("option", null, "Executive Leadership"), /*#__PURE__*/React.createElement("option", null, "Executive Office"), /*#__PURE__*/React.createElement("option", null, "General")))), /*#__PURE__*/React.createElement("label", null, "About bio", /*#__PURE__*/React.createElement("textarea", {
    rows: 3,
    value: bio,
    onChange: e => setBio(e.target.value),
    placeholder: "What do you work on? What drives your work?"
  })), /*#__PURE__*/React.createElement("label", null, "Skills & Endorsements (comma separated)", /*#__PURE__*/React.createElement("input", {
    value: skills,
    onChange: e => setSkills(e.target.value),
    placeholder: "TypeScript, PostgreSQL, UI/UX, Cloud"
  })), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "text-button",
    onClick: close
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "primary-button",
    disabled: saving
  }, saving ? 'Saving...' : 'Save Profile Changes')));
}
function CreateRoleModal({
  close,
  onSave
}) {
  const [roleName, setRoleName] = useState('');
  const [roleDesc, setRoleDesc] = useState('');
  const [permissions, setPermissions] = useState(['Create posts', 'Like posts', 'Comment on posts', 'View employee directory']);
  const togglePermission = perm => {
    if (permissions.includes(perm)) {
      setPermissions(permissions.filter(p => p !== perm));
    } else {
      setPermissions([...permissions, perm]);
    }
  };
  const allPerms = ['Create posts', 'Like posts', 'Comment on posts', 'Delete own posts', 'View employee directory', 'Create employee accounts', 'Edit employee details', 'Create announcements', 'Manage departments', 'View company analytics'];
  const handleSubmit = e => {
    e.preventDefault();
    if (!roleName.trim()) {
      alert('Please enter a role name.');
      return;
    }
    onSave({
      name: roleName.trim(),
      desc: roleDesc.trim() || 'Custom workspace role',
      permissions
    });
    close();
  };
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-grid one"
  }, /*#__PURE__*/React.createElement("label", null, "Role name", /*#__PURE__*/React.createElement("input", {
    value: roleName,
    onChange: e => setRoleName(e.target.value),
    placeholder: "e.g. Project Coordinator",
    required: true
  })), /*#__PURE__*/React.createElement("label", null, "Role description", /*#__PURE__*/React.createElement("textarea", {
    value: roleDesc,
    onChange: e => setRoleDesc(e.target.value),
    placeholder: "Describe what this role is responsible for"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "modal-permissions",
    style: {
      maxHeight: '200px',
      overflowY: 'auto',
      marginTop: '12px'
    }
  }, /*#__PURE__*/React.createElement("h3", null, "Permissions (", permissions.length, " selected)"), allPerms.map(x => /*#__PURE__*/React.createElement("div", {
    key: x,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '6px 0',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, x), /*#__PURE__*/React.createElement("small", {
    style: {
      display: 'block',
      fontSize: '11px',
      color: 'var(--muted)'
    }
  }, permissionDescription(x))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `toggle ${permissions.includes(x) ? 'on' : ''}`,
    onClick: () => togglePermission(x),
    role: "switch",
    "aria-checked": permissions.includes(x)
  }, /*#__PURE__*/React.createElement("i", null))))), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "text-button",
    onClick: close
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "primary-button"
  }, "Create Role")));
}
function NotificationPanel({
  notifications = [],
  onMarkAllRead,
  close
}) {
  const displayNotifs = notifications && notifications.length > 0 ? notifications : [{
    title: 'Welcome to Company Connect!',
    snippet: 'Your workspace is active and connected to Supabase.',
    time: 'Just now',
    icon: 'spark'
  }, {
    title: 'Database Connected',
    snippet: 'Supabase PostgreSQL (ACTIVE_HEALTHY) is online.',
    time: '1m ago',
    icon: 'shield'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "notifications"
  }, displayNotifs.map((n, i) => /*#__PURE__*/React.createElement("button", {
    key: n.id || i,
    style: {
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: `notification-icon n${i % 4}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: n.icon || 'bell'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      display: 'block',
      fontSize: '13px'
    }
  }, n.title), n.snippet && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: '11px',
      color: 'var(--muted)',
      marginTop: '2px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    }
  }, n.snippet), /*#__PURE__*/React.createElement("small", {
    style: {
      fontSize: '10px',
      color: 'var(--muted)',
      marginTop: '2px'
    }
  }, n.time)), i === 0 && /*#__PURE__*/React.createElement("i", {
    style: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: 'var(--brand)'
    }
  }))), /*#__PURE__*/React.createElement("button", {
    className: "view-all",
    onClick: () => {
      if (onMarkAllRead) onMarkAllRead();
      if (close) close();
    }
  }, "Mark all as read"));
}
function WorkspaceSwitch({
  close
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "workspace-switch"
  }, /*#__PURE__*/React.createElement("p", null, "You can switch between verified company workspaces."), /*#__PURE__*/React.createElement("button", {
    className: "selected"
  }, /*#__PURE__*/React.createElement("span", {
    className: "workspace-logo"
  }, "IN"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Innovix Technologies"), /*#__PURE__*/React.createElement("small", null, "INX-48291 \xB7 Current workspace")), /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => alert('Switched to Northstar Labs guest profile')
  }, /*#__PURE__*/React.createElement("span", {
    className: "workspace-logo alt"
  }, "NS"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Northstar Labs"), /*#__PURE__*/React.createElement("small", null, "NSL-38420 \xB7 Guest collaborator")), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow"
  })), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "secondary-button",
    onClick: close
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "primary-button",
    onClick: close
  }, "Confirm workspace")));
}
function AuthFlow({
  screen,
  setScreen,
  enter,
  onLogin,
  onRegister,
  onEmployeeRegister,
  workspaceData
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [workspaceId, setWorkspaceId] = useState('INX-48291');
  const [remember, setRemember] = useState(true);
  if (screen === 'portal') {
    return /*#__PURE__*/React.createElement("div", {
      className: "auth-portal"
    }, /*#__PURE__*/React.createElement("div", {
      className: "portal-panel"
    }, /*#__PURE__*/React.createElement(Logo, {
      light: true
    }), /*#__PURE__*/React.createElement("div", {
      className: "portal-copy"
    }, /*#__PURE__*/React.createElement("span", null, "YOUR ENTERPRISE, CONNECTED"), /*#__PURE__*/React.createElement("h1", null, "Work feels better", /*#__PURE__*/React.createElement("br", null), "when everyone belongs."), /*#__PURE__*/React.createElement("p", null, "A private, secure internal social media platform where employees celebrate achievements, share progress, and collaborate across teams."), /*#__PURE__*/React.createElement("div", {
      className: "portal-proof"
    }, /*#__PURE__*/React.createElement("div", {
      className: "avatar-stack"
    }, initialPeople.slice(0, 4).map(p => /*#__PURE__*/React.createElement(Avatar, {
      key: p.name,
      person: p,
      size: "sm"
    }))), /*#__PURE__*/React.createElement("span", null, "Trusted by forward-thinking companies", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", null, "Private \xB7 Modern \xB7 Secure")))), /*#__PURE__*/React.createElement("div", {
      className: "portal-visual"
    }, /*#__PURE__*/React.createElement("div", {
      className: "floating-card fc1"
    }, /*#__PURE__*/React.createElement(Avatar, {
      person: initialPeople[1],
      size: "sm"
    }), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("b", null, "Marcus Chen shipped Atlas v2"), /*#__PURE__*/React.createElement("span", null, "Engineering \xB7 Just now")), /*#__PURE__*/React.createElement(Icon, {
      name: "check"
    })), /*#__PURE__*/React.createElement("div", {
      className: "floating-card fc2"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
      name: "award"
    })), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("b", null, "Innovation Kudos"), /*#__PURE__*/React.createElement("span", null, "Olivia \u2192 Maya Lin"))))), /*#__PURE__*/React.createElement("div", {
      className: "auth-options"
    }, /*#__PURE__*/React.createElement("div", {
      className: "auth-options-inner"
    }, /*#__PURE__*/React.createElement("div", {
      className: "auth-mobile-brand"
    }, /*#__PURE__*/React.createElement(Logo, null)), /*#__PURE__*/React.createElement("span", {
      className: "eyebrow"
    }, "WELCOME TO COMPANY CONNECT"), /*#__PURE__*/React.createElement("h2", null, "Choose your experience"), /*#__PURE__*/React.createElement("p", null, "Select your portal to enter your company network."), /*#__PURE__*/React.createElement("button", {
      className: "login-option primary-option",
      onClick: () => {
        setEmail('');
        setPassword('');
        setScreen('employee-login');
      }
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
      name: "user"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Employee Login"), /*#__PURE__*/React.createElement("small", null, "Social feed, achievements, kudos & team updates")), /*#__PURE__*/React.createElement(Icon, {
      name: "arrow"
    })), /*#__PURE__*/React.createElement("button", {
      className: "login-option",
      onClick: () => {
        setEmail('');
        setPassword('');
        setScreen('admin-login');
      }
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
      name: "shield"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Company Admin Login"), /*#__PURE__*/React.createElement("small", null, "Manage employees, roles, announcements & analytics")), /*#__PURE__*/React.createElement(Icon, {
      name: "arrow"
    })), /*#__PURE__*/React.createElement("div", {
      className: "auth-divider"
    }, /*#__PURE__*/React.createElement("i", null), "New to Company Connect?", /*#__PURE__*/React.createElement("i", null)), /*#__PURE__*/React.createElement("button", {
      className: "create-workspace",
      onClick: () => setScreen('register')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "building"
    }), "Create a company workspace"), /*#__PURE__*/React.createElement("button", {
      className: "create-workspace",
      style: {
        marginTop: '8px'
      },
      onClick: () => setScreen('employee-register')
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "user"
    }), "Register as an employee"), /*#__PURE__*/React.createElement("small", {
      className: "legal"
    }, "Private internal enterprise environment \xB7 ISO-27001 compliant"))));
  }
  if (screen === 'register') return /*#__PURE__*/React.createElement(Registration, {
    setScreen: setScreen,
    onRegister: onRegister
  });
  if (screen === 'employee-register') return /*#__PURE__*/React.createElement(EmployeeRegistration, {
    setScreen: setScreen,
    onRegister: onEmployeeRegister
  });
  if (screen === 'workspace') return /*#__PURE__*/React.createElement(WorkspaceCreated, {
    enter: () => enter(true),
    workspaceData: workspaceData
  });
  const isAdmin = screen === 'admin-login';
  const handleDemoFill = type => {
    if (type === 'admin') {
      setEmail('admin@innovix.com');
      setPassword('demo123');
      setWorkspaceId('INX-48291');
    } else {
      setEmail('employee@innovix.com');
      setPassword('demo123');
      setWorkspaceId('INX-48291');
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "login-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "login-top"
  }, /*#__PURE__*/React.createElement(Logo, null), /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen('portal')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 15
  }), "Back to portal")), /*#__PURE__*/React.createElement("div", {
    className: "login-card card"
  }, /*#__PURE__*/React.createElement("div", {
    className: `login-icon ${isAdmin ? 'admin' : ''}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: isAdmin ? 'shield' : 'user',
    size: 26
  })), /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, isAdmin ? 'COMPANY MANAGEMENT' : 'EMPLOYEE WORKSPACE'), /*#__PURE__*/React.createElement("h1", null, isAdmin ? 'Admin Sign In' : 'Employee Sign In'), /*#__PURE__*/React.createElement("p", null, "Enter your company credentials to access your workspace."), /*#__PURE__*/React.createElement("div", {
    className: "demo-badge-row"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "demo-pill",
    onClick: () => handleDemoFill(isAdmin ? 'admin' : 'employee')
  }, "\u26A1 1-Click Demo Credentials (", isAdmin ? 'admin@innovix.com' : 'employee@innovix.com', ")")), /*#__PURE__*/React.createElement("div", {
    className: "identified-workspace"
  }, /*#__PURE__*/React.createElement("span", {
    className: "workspace-logo"
  }, "IN"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Innovix Technologies"), /*#__PURE__*/React.createElement("small", null, "Workspace: ", workspaceId, " \xB7 companyconnect.app/innovix")), /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  })), /*#__PURE__*/React.createElement("form", {
    onSubmit: async e => {
      e.preventDefault();
      if (onLogin) {
        const ok = await onLogin(workspaceId, email, password, isAdmin);
        if (!ok) return;
      } else {
        enter(isAdmin);
      }
    }
  }, /*#__PURE__*/React.createElement("label", null, "Workspace ID", /*#__PURE__*/React.createElement("div", {
    className: "input-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "building"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: workspaceId,
    onChange: e => setWorkspaceId(e.target.value),
    placeholder: "e.g. INX-48291",
    required: true
  }))), /*#__PURE__*/React.createElement("label", null, isAdmin ? 'Admin email or ID' : 'Work email or Employee ID', /*#__PURE__*/React.createElement("div", {
    className: "input-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: isAdmin ? 'admin@innovix.com or EMP-001' : 'employee@innovix.com or EMP-1024',
    value: email,
    onChange: e => setEmail(e.target.value),
    required: true
  }))), /*#__PURE__*/React.createElement("label", null, "Password", /*#__PURE__*/React.createElement("a", {
    href: "#forgot",
    onClick: e => {
      e.preventDefault();
      alert('Please contact your administrator to reset your credentials.');
    }
  }, "Forgot password?"), /*#__PURE__*/React.createElement("div", {
    className: "input-icon",
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock"
  }), /*#__PURE__*/React.createElement("input", {
    type: showPass ? 'text' : 'password',
    placeholder: "Enter password",
    value: password,
    onChange: e => setPassword(e.target.value),
    required: true
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowPass(!showPass),
    style: {
      position: 'absolute',
      right: 10,
      background: 'none',
      border: 'none',
      color: '#888',
      cursor: 'pointer'
    },
    title: showPass ? 'Hide password' : 'Show password'
  }, /*#__PURE__*/React.createElement(Icon, {
    name: showPass ? 'eye-off' : 'eye',
    size: 16
  })))), /*#__PURE__*/React.createElement("label", {
    className: "checkbox"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: remember,
    onChange: e => setRemember(e.target.checked)
  }), "Remember me on this trusted device"), /*#__PURE__*/React.createElement("button", {
    className: "primary-button auth-submit"
  }, "Sign in securely ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "switch-login"
  }, "Not an ", isAdmin ? 'admin' : 'employee', "?", ' ', /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen(isAdmin ? 'employee-login' : 'admin-login')
  }, "Switch to ", isAdmin ? 'employee' : 'admin', " login")), !isAdmin && /*#__PURE__*/React.createElement("div", {
    className: "switch-login",
    style: {
      marginTop: '8px'
    }
  }, "New to the company?", ' ', /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen('employee-register')
  }, "Register as employee"))), /*#__PURE__*/React.createElement("div", {
    className: "security-note"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 15
  }), "Enterprise grade encryption & strict privacy"));
}
function EmployeeRegistration({
  setScreen,
  onRegister
}) {
  const [workspaceId, setWorkspaceId] = useState('INX-48291');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('Engineering');
  const [designation, setDesignation] = useState('Senior Software Engineer');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  if (submitted) {
    return /*#__PURE__*/React.createElement("div", {
      className: "login-page"
    }, /*#__PURE__*/React.createElement("div", {
      className: "login-card card",
      style: {
        maxWidth: '520px',
        padding: '36px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: '#fef3c7',
        color: '#b45309',
        display: 'grid',
        placeItems: 'center',
        margin: '0 auto 16px',
        fontSize: '24px'
      }
    }, "\u23F3"), /*#__PURE__*/React.createElement("span", {
      className: "eyebrow",
      style: {
        color: '#b45309'
      }
    }, "REGISTRATION SUBMITTED"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: '22px'
      }
    }, "Awaiting Admin Approval"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--muted)',
        fontSize: '13px',
        lineHeight: '1.6',
        margin: '10px 0 20px'
      }
    }, "Thank you, ", /*#__PURE__*/React.createElement("b", null, name), "! Your account has been registered for workspace ", /*#__PURE__*/React.createElement("b", null, workspaceId), " with status ", /*#__PURE__*/React.createElement("b", null, "Pending"), ". Your company administrator has been notified to review and approve your access."), /*#__PURE__*/React.createElement("div", {
      style: {
        background: '#f8f9fc',
        border: '1px solid var(--line)',
        borderRadius: '10px',
        padding: '14px',
        textAlign: 'left',
        marginBottom: '20px',
        fontSize: '12px'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, "Registered Email:"), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--brand)'
      }
    }, email)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '4px'
      }
    }, /*#__PURE__*/React.createElement("strong", null, "Department:"), " ", dept, " \xB7 ", designation), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '4px'
      }
    }, /*#__PURE__*/React.createElement("strong", null, "Status:"), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#d97706',
        fontWeight: 600
      }
    }, "Pending Approval"))), /*#__PURE__*/React.createElement("button", {
      className: "primary-button",
      style: {
        width: '100%'
      },
      onClick: () => setScreen('employee-login')
    }, "Go to Employee Login ", /*#__PURE__*/React.createElement(Icon, {
      name: "arrow",
      size: 14
    }))));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "login-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "login-top"
  }, /*#__PURE__*/React.createElement(Logo, null), /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen('portal')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 15
  }), "Back to portal")), /*#__PURE__*/React.createElement("div", {
    className: "login-card card",
    style: {
      maxWidth: '520px',
      padding: '32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "login-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user",
    size: 26
  })), /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "EMPLOYEE JOIN REQUEST"), /*#__PURE__*/React.createElement("h1", null, "Register as Employee"), /*#__PURE__*/React.createElement("p", null, "Create your profile. Your administrator will verify and approve your account."), /*#__PURE__*/React.createElement("form", {
    onSubmit: async e => {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert('Passwords do not match. Please verify.');
        return;
      }
      if (password.length < 6) {
        alert('Password must be at least 6 characters.');
        return;
      }
      setSubmitting(true);
      if (onRegister) {
        const ok = await onRegister({
          workspaceId,
          name,
          email,
          department: dept,
          designation,
          password
        });
        setSubmitting(false);
        if (ok) {
          setSubmitted(true);
        }
      } else {
        setSubmitting(false);
        setSubmitted(true);
      }
    }
  }, /*#__PURE__*/React.createElement("label", null, "Company Workspace ID", /*#__PURE__*/React.createElement("div", {
    className: "input-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "building"
  }), /*#__PURE__*/React.createElement("input", {
    value: workspaceId,
    onChange: e => setWorkspaceId(e.target.value),
    placeholder: "e.g. INX-48291",
    required: true
  }))), /*#__PURE__*/React.createElement("label", null, "Full Name", /*#__PURE__*/React.createElement("div", {
    className: "input-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user"
  }), /*#__PURE__*/React.createElement("input", {
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: "e.g. Taylor Swift",
    required: true
  }))), /*#__PURE__*/React.createElement("label", null, "Corporate Work Email", /*#__PURE__*/React.createElement("div", {
    className: "input-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail"
  }), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "e.g. taylor@innovix.com",
    required: true
  }))), /*#__PURE__*/React.createElement("div", {
    className: "field-row",
    style: {
      marginTop: '12px'
    }
  }, /*#__PURE__*/React.createElement("label", null, "Department", /*#__PURE__*/React.createElement("select", {
    value: dept,
    onChange: e => setDept(e.target.value)
  }, /*#__PURE__*/React.createElement("option", null, "Engineering"), /*#__PURE__*/React.createElement("option", null, "Product Design"), /*#__PURE__*/React.createElement("option", null, "Product"), /*#__PURE__*/React.createElement("option", null, "Marketing"), /*#__PURE__*/React.createElement("option", null, "People & Culture"), /*#__PURE__*/React.createElement("option", null, "Infrastructure"), /*#__PURE__*/React.createElement("option", null, "Product Management"))), /*#__PURE__*/React.createElement("label", null, "Designation / Role", /*#__PURE__*/React.createElement("input", {
    value: designation,
    onChange: e => setDesignation(e.target.value),
    placeholder: "e.g. Systems Engineer",
    style: {
      width: '100%',
      border: '1px solid #dfe0e5',
      borderRadius: '8px',
      padding: '9px 10px',
      fontSize: '10px',
      marginTop: '5px'
    },
    required: true
  }))), /*#__PURE__*/React.createElement("label", {
    style: {
      marginTop: '12px'
    }
  }, "Password", /*#__PURE__*/React.createElement("div", {
    className: "input-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock"
  }), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: password,
    onChange: e => setPassword(e.target.value),
    placeholder: "Choose a password (min 6 characters)",
    required: true
  }))), /*#__PURE__*/React.createElement("label", null, "Confirm Password", /*#__PURE__*/React.createElement("div", {
    className: "input-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock"
  }), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: confirmPassword,
    onChange: e => setConfirmPassword(e.target.value),
    placeholder: "Confirm your password",
    required: true
  }))), /*#__PURE__*/React.createElement("button", {
    className: "primary-button auth-submit",
    disabled: submitting,
    style: {
      marginTop: '18px'
    }
  }, submitting ? 'Submitting Registration...' : 'Submit Registration for Approval', " ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "switch-login"
  }, "Already have an approved account?", ' ', /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen('employee-login')
  }, "Sign in"))));
}
function Registration({
  setScreen,
  onRegister
}) {
  const [step, setStep] = useState(1);
  const [compName, setCompName] = useState('');
  const [industry, setIndustry] = useState('Technology & Software');
  const [compSize, setCompSize] = useState('51–200 employees');
  const [compEmail, setCompEmail] = useState('');
  const [compWebsite, setCompWebsite] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [submitting, setSubmitting] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "registration-page"
  }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement(Logo, null), /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen('portal')
  }, "Exit setup ", /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 16
  }))), /*#__PURE__*/React.createElement("div", {
    className: "registration-shell"
  }, /*#__PURE__*/React.createElement("aside", null, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "WORKSPACE SETUP"), /*#__PURE__*/React.createElement("h1", null, "Create your company space."), /*#__PURE__*/React.createElement("p", null, "A secure, private home for your people, culture, and projects."), /*#__PURE__*/React.createElement("div", {
    className: "step-list"
  }, [['Company information', 'Tell us about your organization'], ['Administrator account', 'Create your master admin access'], ['Launch workspace', 'Generate Workspace ID & invite team']].map((x, i) => /*#__PURE__*/React.createElement("div", {
    className: `${step === i + 1 ? 'active' : ''} ${step > i + 1 ? 'done' : ''}`,
    key: x[0]
  }, /*#__PURE__*/React.createElement("span", null, step > i + 1 ? /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 15
  }) : i + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, x[0]), /*#__PURE__*/React.createElement("small", null, x[1])))))), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("div", {
    className: "form-title"
  }, /*#__PURE__*/React.createElement("span", null, "STEP ", step, " OF 3"), /*#__PURE__*/React.createElement("h2", null, step === 1 ? 'Company Details' : step === 2 ? 'Master Admin Account' : 'Confirm & Launch Workspace'), /*#__PURE__*/React.createElement("p", null, step === 1 ? 'This information customizes your private company social network.' : step === 2 ? 'You will use this administrator account to manage your workspace.' : 'Review your company setup before generating your unique Workspace ID.')), step === 1 ? /*#__PURE__*/React.createElement("div", {
    className: "form-grid"
  }, /*#__PURE__*/React.createElement("label", {
    className: "full"
  }, "Company logo", /*#__PURE__*/React.createElement("div", {
    className: "logo-upload"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "image"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "Upload your company logo"), /*#__PURE__*/React.createElement("small", null, "PNG, JPG, or SVG \xB7 Max 5 MB")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => alert('Logo uploaded successfully!')
  }, "Choose file"))), /*#__PURE__*/React.createElement("label", {
    className: "full"
  }, "Company name", /*#__PURE__*/React.createElement("input", {
    value: compName,
    onChange: e => setCompName(e.target.value)
  })), /*#__PURE__*/React.createElement("label", null, "Industry", /*#__PURE__*/React.createElement("select", {
    value: industry,
    onChange: e => setIndustry(e.target.value)
  }, /*#__PURE__*/React.createElement("option", null, "Technology & Software"), /*#__PURE__*/React.createElement("option", null, "Healthcare & Biotech"), /*#__PURE__*/React.createElement("option", null, "Financial Services"), /*#__PURE__*/React.createElement("option", null, "Creative & Media"))), /*#__PURE__*/React.createElement("label", null, "Company size", /*#__PURE__*/React.createElement("select", {
    value: compSize,
    onChange: e => setCompSize(e.target.value)
  }, /*#__PURE__*/React.createElement("option", null, "1\u201350 employees"), /*#__PURE__*/React.createElement("option", null, "51\u2013200 employees"), /*#__PURE__*/React.createElement("option", null, "201\u2013500 employees"), /*#__PURE__*/React.createElement("option", null, "500+ employees"))), /*#__PURE__*/React.createElement("label", null, "Company email", /*#__PURE__*/React.createElement("input", {
    value: compEmail,
    onChange: e => setCompEmail(e.target.value),
    placeholder: "e.g. contact@acme.com"
  })), /*#__PURE__*/React.createElement("label", null, "Company website", /*#__PURE__*/React.createElement("input", {
    value: compWebsite,
    onChange: e => setCompWebsite(e.target.value),
    placeholder: "e.g. https://acme.com"
  })), /*#__PURE__*/React.createElement("label", {
    className: "full"
  }, "Company description", /*#__PURE__*/React.createElement("textarea", {
    defaultValue: "Building innovative tools for modern enterprise collaboration."
  }))) : step === 2 ? /*#__PURE__*/React.createElement("div", {
    className: "form-grid one"
  }, /*#__PURE__*/React.createElement("label", null, "Administrator full name", /*#__PURE__*/React.createElement("input", {
    value: adminName,
    onChange: e => setAdminName(e.target.value),
    placeholder: "e.g. Jane Doe"
  })), /*#__PURE__*/React.createElement("label", null, "Admin work email", /*#__PURE__*/React.createElement("input", {
    value: adminEmail,
    onChange: e => setAdminEmail(e.target.value),
    placeholder: "e.g. jane@acme.com"
  })), /*#__PURE__*/React.createElement("label", null, "Password", /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: adminPass,
    onChange: e => setAdminPass(e.target.value),
    placeholder: "Minimum 6 characters (letters & numbers)"
  })), /*#__PURE__*/React.createElement("label", null, "Confirm password", /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: confirmPass,
    onChange: e => setConfirmPass(e.target.value),
    placeholder: "Re-enter password"
  })), /*#__PURE__*/React.createElement("div", {
    className: "password-hint"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: adminPass.length >= 6 ? 'var(--emerald)' : undefined
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 14
  }), "6+ characters"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: /[A-Za-z]/.test(adminPass) && /[0-9]/.test(adminPass) ? 'var(--emerald)' : undefined
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 14
  }), "Letters & numbers"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: adminPass && adminPass === confirmPass ? 'var(--emerald)' : undefined
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 14
  }), "Passwords match"))) : /*#__PURE__*/React.createElement("div", {
    className: "review-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "workspace-logo large"
  }, compName ? compName.slice(0, 2).toUpperCase() : 'CO'), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "REGISTERED COMPANY"), /*#__PURE__*/React.createElement("b", null, compName || 'Your Company'), /*#__PURE__*/React.createElement("p", null, industry, " \xB7 ", compSize)), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "MASTER ADMINISTRATOR"), /*#__PURE__*/React.createElement("b", null, adminName || 'Admin'), /*#__PURE__*/React.createElement("p", null, adminEmail || 'admin@company.com')), /*#__PURE__*/React.createElement("div", {
    className: "secure-callout"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield"
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Your workspace is 100% private by default"), /*#__PURE__*/React.createElement("small", null, "Only verified domain emails or invited users can access your company feed.")))), /*#__PURE__*/React.createElement("div", {
    className: "registration-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "secondary-button",
    onClick: () => step === 1 ? setScreen('portal') : setStep(step - 1)
  }, "Back"), /*#__PURE__*/React.createElement("button", {
    className: "primary-button",
    disabled: submitting,
    onClick: async () => {
      if (step === 1) {
        if (!compName.trim()) {
          alert('Please enter your company name.');
          return;
        }
        setStep(2);
      } else if (step === 2) {
        if (!adminName.trim()) {
          alert('Please enter administrator full name.');
          return;
        }
        if (!adminEmail.trim()) {
          alert('Please enter administrator work email.');
          return;
        }
        if (!adminPass || adminPass.length < 6) {
          alert('Password must be at least 6 characters long.');
          return;
        }
        if (!/[A-Za-z]/.test(adminPass) || !/[0-9]/.test(adminPass)) {
          alert('Password must contain both letters and numbers.');
          return;
        }
        if (adminPass !== confirmPass) {
          alert('Passwords do not match. Please verify.');
          return;
        }
        setStep(3);
      } else {
        if (onRegister) {
          setSubmitting(true);
          const ok = await onRegister({
            companyName: compName.trim(),
            industry,
            companySize: compSize,
            companyEmail: compEmail.trim() || adminEmail.trim(),
            website: compWebsite.trim(),
            adminName: adminName.trim(),
            adminEmail: adminEmail.trim(),
            password: adminPass
          });
          setSubmitting(false);
          if (!ok) {
            // Stays on step 3 so user can view toast message
          }
        } else {
          setScreen('workspace');
        }
      }
    }
  }, submitting ? 'Generating workspace...' : step === 3 ? 'Generate Workspace' : 'Continue', " ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow",
    size: 15
  }))))));
}
function WorkspaceCreated({
  enter,
  workspaceData
}) {
  const [copied, setCopied] = useState(false);
  const currentWsId = workspaceData?.workspaceId || 'INX-48291';
  const compTitle = workspaceData?.company?.name || 'Innovix Technologies';
  const compDetails = (workspaceData?.company?.industry || 'Technology & Software') + ' · ' + (workspaceData?.company?.companySize || 'Enterprise');
  return /*#__PURE__*/React.createElement("div", {
    className: "created-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "created-card card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "celebrate-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 30
  })), /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "WORKSPACE CREATED SUCCESSFULLY"), /*#__PURE__*/React.createElement("h1", null, "Welcome to Company Connect."), /*#__PURE__*/React.createElement("p", null, "Your private ", compTitle, " workspace is now live. Share the Workspace ID with your employees."), /*#__PURE__*/React.createElement("div", {
    className: "created-company"
  }, /*#__PURE__*/React.createElement("span", {
    className: "workspace-logo large"
  }, compTitle.slice(0, 2).toUpperCase()), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, compTitle), /*#__PURE__*/React.createElement("small", null, compDetails))), /*#__PURE__*/React.createElement("div", {
    className: "workspace-id"
  }, /*#__PURE__*/React.createElement("small", null, "YOUR COMPANY WORKSPACE ID"), /*#__PURE__*/React.createElement("strong", null, currentWsId), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      navigator.clipboard?.writeText(currentWsId);
      setCopied(true);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: copied ? 'check' : 'copy',
    size: 16
  }), copied ? 'Copied!' : 'Copy ID')), /*#__PURE__*/React.createElement("div", {
    className: "workspace-url"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "external"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", null, "WORKSPACE ACCESS PORTAL"), /*#__PURE__*/React.createElement("b", null, window.location.host || 'localhost:3000')), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      navigator.clipboard?.writeText(window.location.origin);
      alert('Portal link copied to clipboard!');
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "copy"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "info-note"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "help"
  }), /*#__PURE__*/React.createElement("p", null, "Employees use this Workspace ID (", currentWsId, ") to register and log in. It is safe to share across your corporate channels.")), /*#__PURE__*/React.createElement("div", {
    className: "created-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "secondary-button",
    onClick: enter
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user-check"
  }), "Manage employees"), /*#__PURE__*/React.createElement("button", {
    className: "primary-button",
    onClick: enter
  }, "Continue to admin dashboard ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow"
  })))));
}
function KudosModal({
  target,
  close,
  onAward
}) {
  const [selectedType, setSelectedType] = useState('Innovation Catalyst');
  const options = [{
    type: 'Innovation Catalyst',
    icon: 'spark',
    desc: 'For breakthrough thinking, creative solutions, and technical craft'
  }, {
    type: 'Team Player & Collaboration',
    icon: 'heart',
    desc: 'For seamless cross-team support and lifting the team up'
  }, {
    type: 'High Velocity & Impact',
    icon: 'award',
    desc: 'For moving fast with quality and delivering on commitments'
  }, {
    type: 'Problem Solver',
    icon: 'check',
    desc: 'For debugging complex issues and finding clean solutions'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px',
      padding: '12px 14px',
      background: 'var(--soft)',
      borderRadius: '10px'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    person: target.person,
    size: "md"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: '13px',
      color: 'var(--ink)'
    }
  }, "Recognize ", target.person.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '2px 0 0',
      fontSize: '11px',
      color: 'var(--muted)'
    }
  }, target.person.role, " \xB7 ", target.person.dept))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '11px',
      color: 'var(--muted)',
      margin: '0 0 10px'
    }
  }, "Choose a kudos badge to celebrate on this update:"), /*#__PURE__*/React.createElement("div", {
    className: "kudos-modal-grid"
  }, options.map(opt => /*#__PURE__*/React.createElement("div", {
    key: opt.type,
    className: `kudos-option-card ${selectedType === opt.type ? 'selected' : ''}`,
    onClick: () => setSelectedType(opt.type)
  }, /*#__PURE__*/React.createElement("span", {
    className: "kudos-option-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: opt.icon,
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, opt.type), /*#__PURE__*/React.createElement("p", null, opt.desc))))), /*#__PURE__*/React.createElement("div", {
    className: "modal-footer",
    style: {
      marginTop: '20px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "text-button",
    onClick: close
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "primary-button",
    onClick: () => onAward(selectedType)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "award",
    size: 16
  }), "Award Kudos to ", target.person.name.split(' ')[0])));
}
window.App = App;