import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Pages
import Dashboard from './pages/Dashboard';

// Admin
import Users from './pages/admin/Users';
import Admissions from './pages/admin/Admissions';
import HR from './pages/admin/HR';
import Inventory from './pages/admin/Inventory';

// Academic
import Courses from './pages/academic/Courses';
import Timetable from './pages/academic/Timetable';
import Attendance from './pages/academic/Attendance';
import Grades from './pages/academic/Grades';

// Finance
import Fees from './pages/finance/Fees';
import Payments from './pages/finance/Payments';
import Expenses from './pages/finance/Expenses';

// Portals
import StudentPortal from './pages/portals/StudentPortal';
import ParentPortal from './pages/portals/ParentPortal';
import Notifications from './pages/portals/Notifications';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Administration */}
          <Route path="admin/users"      element={<Users />} />
          <Route path="admin/admissions" element={<Admissions />} />
          <Route path="admin/hr"         element={<HR />} />
          <Route path="admin/inventory"  element={<Inventory />} />

          {/* Academic */}
          <Route path="academic/courses"    element={<Courses />} />
          <Route path="academic/timetable"  element={<Timetable />} />
          <Route path="academic/attendance" element={<Attendance />} />
          <Route path="academic/grades"     element={<Grades />} />

          {/* Finance */}
          <Route path="finance/fees"      element={<Fees />} />
          <Route path="finance/payments"  element={<Payments />} />
          <Route path="finance/expenses"  element={<Expenses />} />

          {/* Portals */}
          <Route path="portals/student"       element={<StudentPortal />} />
          <Route path="portals/parent"        element={<ParentPortal />} />
          <Route path="portals/notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
