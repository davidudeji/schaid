import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, ClipboardList, Briefcase, Package,
  BookOpen, CalendarDays, ScanLine, BarChart2,
  Receipt, CreditCard, TrendingDown,
  Monitor, Bell, GraduationCap, LogOut, Settings
} from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { to: '/', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    ],
  },
  {
    title: 'Administration',
    items: [
      { to: '/admin/users', label: 'Users & RBAC', icon: <Users size={16} /> },
      { to: '/admin/admissions', label: 'Admissions', icon: <ClipboardList size={16} />, badge: 38 },
      { to: '/admin/hr', label: 'HR & Payroll', icon: <Briefcase size={16} /> },
      { to: '/admin/inventory', label: 'Inventory', icon: <Package size={16} /> },
    ],
  },
  {
    title: 'Academic',
    items: [
      { to: '/academic/courses', label: 'Courses', icon: <BookOpen size={16} /> },
      { to: '/academic/timetable', label: 'Timetable', icon: <CalendarDays size={16} /> },
      { to: '/academic/attendance', label: 'Attendance', icon: <ScanLine size={16} /> },
      { to: '/academic/grades', label: 'Gradebook', icon: <BarChart2 size={16} /> },
    ],
  },
  {
    title: 'Finance',
    items: [
      { to: '/finance/fees', label: 'Fee Collection', icon: <Receipt size={16} /> },
      { to: '/finance/payments', label: 'Payments', icon: <CreditCard size={16} /> },
      { to: '/finance/expenses', label: 'Expenses', icon: <TrendingDown size={16} /> },
    ],
  },
  {
    title: 'Portals',
    items: [
      { to: '/portals/student', label: 'Student Portal', icon: <Monitor size={16} /> },
      { to: '/portals/parent', label: 'Parent Portal', icon: <Monitor size={16} /> },
      { to: '/portals/notifications', label: 'Notifications', icon: <Bell size={16} /> },
    ],
  },
];

export default function Sidebar() {
  const _location = useLocation();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">
          <GraduationCap size={18} />
        </div>
        <div className="sidebar-logo-text">
          <strong>Schaid</strong>
          <span>ERP Platform</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {navSections.map((section) => (
          <div key={section.title}>
            <div className="sidebar-section-label">{section.title}</div>
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="sidebar-badge">{item.badge}</span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="sidebar-user">
        <div className="avatar avatar-sm" style={{ background: '#6366F1', color: '#fff' }}>
          AO
        </div>
        <div className="sidebar-user-info">
          <strong>Dr. Amara Osei</strong>
          <span>Administrator</span>
        </div>
        <button className="topbar-icon-btn" title="Settings">
          <Settings size={14} />
        </button>
        <button className="topbar-icon-btn" title="Log out">
          <LogOut size={14} />
        </button>
      </div>
    </aside>
  );
}
