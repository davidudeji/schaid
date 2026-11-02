import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, ClipboardList, Briefcase, Package,
  BookOpen, CalendarDays, ScanLine, BarChart2,
  Receipt, CreditCard, TrendingDown,
  Monitor, Bell, LogOut, Settings
} from 'lucide-react';
import type { MouseEventHandler } from 'react';

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
      { to: '/app', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    ],
  },
  {
    title: 'Administration',
    items: [
      { to: '/app/admin/users', label: 'Users & RBAC', icon: <Users size={16} /> },
      { to: '/app/admin/admissions', label: 'Admissions', icon: <ClipboardList size={16} />, badge: 38 },
      { to: '/app/admin/hr', label: 'HR & Payroll', icon: <Briefcase size={16} /> },
      { to: '/app/admin/inventory', label: 'Inventory', icon: <Package size={16} /> },
    ],
  },
  {
    title: 'Academic',
    items: [
      { to: '/app/academic/courses', label: 'Courses', icon: <BookOpen size={16} /> },
      { to: '/app/academic/timetable', label: 'Timetable', icon: <CalendarDays size={16} /> },
      { to: '/app/academic/attendance', label: 'Attendance', icon: <ScanLine size={16} /> },
      { to: '/app/academic/grades', label: 'Gradebook', icon: <BarChart2 size={16} /> },
    ],
  },
  {
    title: 'Finance',
    items: [
      { to: '/app/finance/fees', label: 'Fee Collection', icon: <Receipt size={16} /> },
      { to: '/app/finance/payments', label: 'Payments', icon: <CreditCard size={16} /> },
      { to: '/app/finance/expenses', label: 'Expenses', icon: <TrendingDown size={16} /> },
    ],
  },
  {
    title: 'Portals',
    items: [
      { to: '/app/portals/student', label: 'Student Portal', icon: <Monitor size={16} /> },
      { to: '/app/portals/parent', label: 'Parent Portal', icon: <Monitor size={16} /> },
      { to: '/app/portals/notifications', label: 'Notifications', icon: <Bell size={16} /> },
    ],
  },
];

export default function Sidebar({ onNavigate }: { onNavigate?: MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark" aria-hidden="true">
          {Array.from({ length: 9 }, (_, index) => <span key={index} />)}
        </div>
        <div className="sidebar-logo-text">
          <strong>Schaid</strong>
          <span>ERP Platform</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navSections.map((section) => (
          <div key={section.title}>
            <div className="sidebar-section-label">{section.title}</div>
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/app'}
                onClick={onNavigate}
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

      <div className="sidebar-user">
        <div className="avatar avatar-sm sidebar-user-avatar">
          AO
        </div>
        <div className="sidebar-user-info">
          <strong>Dr. Amara Osei</strong>
          <span>Administrator</span>
        </div>
        <button className="topbar-icon-btn" title="Settings" aria-label="Settings">
          <Settings size={14} />
        </button>
        <button className="topbar-icon-btn" title="Log out" aria-label="Log out">
          <LogOut size={14} />
        </button>
      </div>
    </aside>
  );
}
