import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Menu } from 'lucide-react';
import type { MouseEventHandler } from 'react';

const routeTitles: Record<string, string> = {
  '/app': 'Dashboard',
  '/app/admin/users': 'User Management & RBAC',
  '/app/admin/admissions': 'Admissions Portal',
  '/app/admin/hr': 'HR & Payroll',
  '/app/admin/inventory': 'Inventory & Assets',
  '/app/academic/courses': 'Course & Curriculum',
  '/app/academic/timetable': 'Timetable & Scheduling',
  '/app/academic/attendance': 'Attendance Management',
  '/app/academic/grades': 'Gradebook & GPA',
  '/app/finance/fees': 'Fee Collection',
  '/app/finance/payments': 'Payment Gateways',
  '/app/finance/expenses': 'Expense Tracking',
  '/app/portals/student': 'Student Portal',
  '/app/portals/parent': 'Parent Portal',
  '/app/portals/notifications': 'Mass Notifications',
};

export default function Header({ onMenuClick }: { onMenuClick: MouseEventHandler<HTMLButtonElement> }) {
  const { pathname } = useLocation();
  const title = routeTitles[pathname] ?? 'Schaid ERP';

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="topbar-menu-btn" type="button" aria-label="Open navigation menu" onClick={onMenuClick}>
          <Menu size={18} />
        </button>
        <span className="topbar-title">{title}</span>
        <div className="topbar-search">
          <Search size={14} />
          <input type="search" placeholder="Search students, courses, invoices…" id="global-search" />
        </div>
      </div>

      <div className="topbar-right">
        <Link className="topbar-icon-btn" to="/app/portals/notifications" id="btn-notifications" title="Notifications" aria-label="Notifications">
          <Bell size={16} />
          <span className="notif-dot" />
        </Link>
      </div>
    </header>
  );
}
