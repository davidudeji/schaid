import { useLocation } from 'react-router-dom';
import { Search, Bell, Moon, HelpCircle } from 'lucide-react';

const routeTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/admin/users': 'User Management & RBAC',
  '/admin/admissions': 'Admissions Portal',
  '/admin/hr': 'HR & Payroll',
  '/admin/inventory': 'Inventory & Assets',
  '/academic/courses': 'Course & Curriculum',
  '/academic/timetable': 'Timetable & Scheduling',
  '/academic/attendance': 'Attendance Management',
  '/academic/grades': 'Gradebook & GPA',
  '/finance/fees': 'Fee Collection',
  '/finance/payments': 'Payment Gateways',
  '/finance/expenses': 'Expense Tracking',
  '/portals/student': 'Student Portal',
  '/portals/parent': 'Parent Portal',
  '/portals/notifications': 'Mass Notifications',
};

export default function Header() {
  const { pathname } = useLocation();
  const title = routeTitles[pathname] ?? 'Schaid ERP';

  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="topbar-title">{title}</span>
        <div className="topbar-search">
          <Search size={14} />
          <input type="search" placeholder="Search students, courses, invoices…" id="global-search" />
        </div>
      </div>

      <div className="topbar-right">
        <button className="topbar-icon-btn" id="btn-help" title="Help">
          <HelpCircle size={16} />
        </button>
        <button className="topbar-icon-btn" id="btn-theme" title="Toggle theme">
          <Moon size={16} />
        </button>
        <button className="topbar-icon-btn" id="btn-notifications" title="Notifications" style={{ position: 'relative' }}>
          <Bell size={16} />
          <span className="notif-dot" />
        </button>
      </div>
    </header>
  );
}
