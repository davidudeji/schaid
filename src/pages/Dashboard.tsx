import {
  Users, Briefcase, BookOpen, ClipboardList,
  TrendingUp, TrendingDown, DollarSign, UserCheck,
  Activity, AlertCircle, CheckCircle2, Clock
} from 'lucide-react';
import { dashboardStats, students, admissions, transactions, revenueByMonth, expenseByMonth } from '../types/mockData';

function StatCard({ icon, label, value, change, changeUp, color }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  changeUp: boolean;
  color: string;
}) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div>
          <div className="stat-label" style={{ marginBottom: 6 }}>{label}</div>
          <div className="stat-value">{value}</div>
        </div>
        <div className="stat-icon" style={{ background: `${color}22` }}>
          <span style={{ color }}>{icon}</span>
        </div>
      </div>
      <div className="stat-bottom">
        <span className={`stat-change ${changeUp ? 'up' : 'down'}`}>
          {changeUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change}
        </span>
        <span className="text-muted">vs last term</span>
      </div>
    </div>
  );
}

function MiniChart({ data, color }: { data: { month: string; value: number }[]; color: string }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="chart-bars">
      {data.map(d => (
        <div key={d.month} className="chart-bar-col">
          <div
            className="chart-bar"
            style={{
              height: `${(d.value / max) * 100}%`,
              background: color,
            }}
            title={`${d.month}: ${d.value.toLocaleString()}`}
          />
          <span className="chart-bar-label">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const s = dashboardStats;
  return (
    <main className="page">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Good afternoon, Dr. Osei</h1>
          <p className="page-subtitle">Here's what's happening across the institution today.</p>
        </div>
        <span className="badge badge-emerald" style={{ fontSize: 12, padding: '6px 14px' }}>
          <Activity size={12} />
          Live
        </span>
      </div>

      {/* KPI Stats */}
      <div className="grid-4">
        <StatCard icon={<Users size={20} />} label="Total Students" value={s.totalStudents.toLocaleString()} change="+124 enrolled" changeUp color="#6366F1" />
        <StatCard icon={<Briefcase size={20} />} label="Total Staff" value={s.totalStaff.toLocaleString()} change="+3 hired" changeUp color="#8B5CF6" />
        <StatCard icon={<BookOpen size={20} />} label="Active Courses" value={s.activeCourses.toString()} change="+8 added" changeUp color="#10B981" />
        <StatCard icon={<ClipboardList size={20} />} label="Pending Admissions" value={s.pendingAdmissions.toString()} change="-12 cleared" changeUp={false} color="#F59E0B" />
      </div>
      <div className="grid-4">
        <StatCard icon={<DollarSign size={20} />} label="Total Revenue" value={`GHS ${(s.totalRevenue/1000).toFixed(0)}K`} change="+18.4%" changeUp color="#10B981" />
        <StatCard icon={<AlertCircle size={20} />} label="Outstanding Fees" value={`GHS ${(s.pendingFees/1000).toFixed(0)}K`} change="-8.2%" changeUp={false} color="#F43F5E" />
        <StatCard icon={<UserCheck size={20} />} label="Attendance Rate" value={`${s.attendanceRate}%`} change="+3.1%" changeUp color="#0EA5E9" />
        <StatCard icon={<Activity size={20} />} label="Average CGPA" value={s.avgCGPA.toFixed(2)} change="+0.08" changeUp color="#F59E0B" />
      </div>

      {/* Charts row */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title"><TrendingUp size={15} />Fee Revenue (6 months)</span>
            <span className="badge badge-emerald">+18.4%</span>
          </div>
          <div className="card-body">
            <MiniChart data={revenueByMonth} color="#6366F1" />
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <span className="card-title"><TrendingDown size={15} />Operational Expenses</span>
            <span className="badge badge-amber">+9.3%</span>
          </div>
          <div className="card-body">
            <MiniChart data={expenseByMonth} color="#F59E0B" />
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid-2">
        {/* Recent admissions */}
        <div className="card">
          <div className="card-header">
            <span className="card-title"><ClipboardList size={15} />Recent Admissions</span>
            <a href="/admin/admissions" className="btn btn-ghost btn-sm">View all</a>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Course</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {admissions.slice(0, 5).map(app => (
                  <tr key={app.id}>
                    <td><strong>{app.applicantName}</strong></td>
                    <td>{app.courseApplied.replace(/^(BSc|LLB|MBBS|BA)\s/, '')}</td>
                    <td>
                      <span className={`badge ${
                        app.status === 'approved' ? 'badge-emerald' :
                        app.status === 'rejected' ? 'badge-rose' :
                        app.status === 'under_review' ? 'badge-sky' : 'badge-amber'
                      }`}>
                        {app.status === 'under_review' ? 'Review' : app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent transactions */}
        <div className="card">
          <div className="card-header">
            <span className="card-title"><DollarSign size={15} />Recent Transactions</span>
            <a href="/finance/payments" className="btn btn-ghost btn-sm">View all</a>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id}>
                    <td><strong>{tx.studentName.split(' ')[0]}</strong></td>
                    <td>GHS {tx.amount.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${
                        tx.status === 'success' ? 'badge-emerald' :
                        tx.status === 'failed' ? 'badge-rose' : 'badge-amber'
                      }`}>
                        {tx.status === 'success' ? <CheckCircle2 size={10} /> : tx.status === 'pending' ? <Clock size={10} /> : <AlertCircle size={10} />}
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Top students */}
      <div className="card">
        <div className="card-header">
          <span className="card-title"><Activity size={15} />Top Performing Students</span>
          <span className="text-muted">By CGPA this semester</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Student</th>
                <th>Matric No.</th>
                <th>Department</th>
                <th>Level</th>
                <th>CGPA</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {[...students].sort((a, b) => b.cgpa - a.cgpa).slice(0, 5).map((stu, i) => (
                <tr key={stu.id}>
                  <td><strong style={{ color: i === 0 ? '#F59E0B' : 'inherit' }}>#{i + 1}</strong></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar avatar-sm" style={{ background: stu.avatarColor, color: '#fff' }}>
                        {stu.avatarInitials}
                      </div>
                      <strong>{stu.name}</strong>
                    </div>
                  </td>
                  <td>{stu.matricNo}</td>
                  <td>{stu.department}</td>
                  <td><span className="badge badge-muted">{stu.level}L</span></td>
                  <td><strong style={{ color: stu.cgpa >= 3.5 ? '#34D399' : stu.cgpa >= 3.0 ? '#FBBF24' : '#FB7185' }}>{stu.cgpa.toFixed(2)}</strong></td>
                  <td style={{ width: 120 }}>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${(stu.cgpa / 4) * 100}%`, background: stu.cgpa >= 3.5 ? '#10B981' : stu.cgpa >= 3.0 ? '#F59E0B' : '#F43F5E' }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
