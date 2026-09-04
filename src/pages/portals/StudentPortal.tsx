import { Monitor, BookOpen, CreditCard, BarChart2, CalendarDays, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { students, courses, feeInvoices, grades, timetable } from '../../types/mockData';

export default function StudentPortal() {
  const student = students[0]; // Zara Ibrahim
  const studentInvoice = feeInvoices.find(f => f.matricNo === student.matricNo);
  const studentGrades  = grades.find(g => g.matricNo === student.matricNo);
  const todayTimetable = timetable.filter(t => t.day === 'Monday');

  return (
    <main className="page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Student Portal</h1>
          <p className="page-subtitle">Unified workspace — timetable, grades, assignments, and payments.</p>
        </div>
        <span className="badge badge-indigo" style={{ fontSize: 12, padding: '6px 14px' }}>
          <Monitor size={12} />
          {student.matricNo}
        </span>
      </div>

      {/* Student card */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.08) 100%)', border: '1px solid rgba(99,102,241,0.2)' }}>
        <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div className="avatar avatar-lg" style={{ background: student.avatarColor, color: '#fff', fontSize: 20 }}>
            {student.avatarInitials}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{student.name}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{student.department} · Level {student.level} · {student.matricNo}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--emerald-400)', letterSpacing: -1 }}>{student.cgpa.toFixed(2)}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>CGPA</div>
          </div>
        </div>
      </div>

      <div className="grid-4">
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Enrolled Courses</div><div className="stat-value">{courses.filter(c => c.status==='active').length}</div></div>
            <div className="stat-icon" style={{ background:'var(--indigo-glow)' }}><BookOpen size={20} style={{ color:'var(--indigo-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Current CGPA</div><div className="stat-value">{student.cgpa.toFixed(2)}</div></div>
            <div className="stat-icon" style={{ background:'var(--emerald-glow)' }}><BarChart2 size={20} style={{ color:'var(--emerald-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div>
              <div className="stat-label">Outstanding Balance</div>
              <div className="stat-value" style={{ color: student.balance > 0 ? 'var(--rose-400)' : 'var(--emerald-400)' }}>
                {student.balance > 0 ? `GHS ${student.balance.toLocaleString()}` : 'Clear'}
              </div>
            </div>
            <div className="stat-icon" style={{ background: student.balance > 0 ? 'var(--rose-glow)' : 'var(--emerald-glow)' }}>
              <CreditCard size={20} style={{ color: student.balance > 0 ? 'var(--rose-400)' : 'var(--emerald-400)' }} />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Attendance Rate</div><div className="stat-value">82%</div></div>
            <div className="stat-icon" style={{ background:'var(--sky-glow)' }}><CheckCircle2 size={20} style={{ color:'var(--sky-400)' }} /></div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Today's timetable */}
        <div className="card">
          <div className="card-header">
            <span className="card-title"><CalendarDays size={15} />Today's Schedule</span>
            <span className="badge badge-muted">Monday</span>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {todayTimetable.map(t => (
              <div key={t.id} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: 'var(--bg-elevated)', borderRadius: 8, borderLeft: '3px solid var(--indigo-500)' }}>
                <div style={{ textAlign: 'center', minWidth: 50 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--indigo-400)' }}>{t.startTime}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{t.endTime}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{t.courseTitle}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.venue} · {t.lecturer}</div>
                </div>
                <span className="badge badge-indigo" style={{ alignSelf: 'flex-start' }}>{t.courseCode}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent grades */}
        <div className="card">
          <div className="card-header">
            <span className="card-title"><BarChart2 size={15} />Recent Grades</span>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {studentGrades && (
              <div style={{ padding: '14px', background: 'var(--bg-elevated)', borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>CS301 — Data Structures</span>
                  <span style={{ fontWeight: 800, fontSize: 20, color: 'var(--emerald-400)' }}>{studentGrades.grade}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, textAlign: 'center' }}>
                  {[['CA 1', studentGrades.ca1, 20], ['CA 2', studentGrades.ca2, 20], ['Midterm', studentGrades.midterm, 30], ['Exam', studentGrades.exam, 80]].map(([label, val, max]) => (
                    <div key={label as string} style={{ background: 'var(--bg-overlay)', borderRadius: 6, padding: '8px 4px' }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{val}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{label}/{max}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>
                    <span>Total</span><span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{studentGrades.total}/100</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${studentGrades.total}%`, background: 'var(--emerald-500)' }} /></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fee status */}
      {studentInvoice && (
        <div className="card">
          <div className="card-header">
            <span className="card-title"><CreditCard size={15} />Fee Statement — {studentInvoice.semester}</span>
            <span className="badge badge-emerald"><CheckCircle2 size={10} />Fully Paid</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {studentInvoice.items.map(item => (
                <div key={item.description} style={{ flex: '1 1 160px', padding: '12px 14px', background: 'var(--bg-elevated)', borderRadius: 8 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{item.description}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>GHS {item.amount.toLocaleString()}</div>
                </div>
              ))}
              <div style={{ flex: '1 1 160px', padding: '12px 14px', background: 'var(--emerald-glow)', borderRadius: 8, border: '1px solid rgba(16,185,129,0.2)' }}>
                <div style={{ fontSize: 12, color: 'var(--emerald-400)', marginBottom: 4 }}>Total Paid</div>
                <div style={{ fontWeight: 800, fontSize: 20, color: 'var(--emerald-400)' }}>GHS {studentInvoice.paidAmount.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignments */}
      <div className="card">
        <div className="card-header"><span className="card-title"><BookOpen size={15} />Pending Assignments</span></div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { course: 'CS301', title: 'Binary Search Tree Implementation', due: 'Sep 10', status: 'due' },
            { course: 'MTH101', title: 'Differentiation Problem Set 3', due: 'Sep 12', status: 'due' },
            { course: 'CS402', title: 'A* Algorithm Report', due: 'Sep 15', status: 'upcoming' },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'var(--bg-elevated)', borderRadius: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--indigo-400)', background: 'var(--indigo-glow)', padding: '3px 8px', borderRadius: 4 }}>{a.course}</div>
              <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{a.title}</div>
              <span className={`badge ${a.status === 'due' ? 'badge-amber' : 'badge-muted'}`}>
                {a.status === 'due' ? <AlertCircle size={10} /> : <Clock size={10} />}
                Due {a.due}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
