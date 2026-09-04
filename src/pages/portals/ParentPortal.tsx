import { Monitor, User, BarChart2, CreditCard, CheckCircle2, XCircle, TrendingUp, Clock } from 'lucide-react';
import { students, feeInvoices, grades } from '../../types/mockData';

export default function ParentPortal() {
  const child  = students[0]; // Zara Ibrahim
  const invoice = feeInvoices.find(f => f.matricNo === child.matricNo);
  const grade   = grades.find(g => g.matricNo === child.matricNo);

  const attendanceLog = [
    { date: 'Mon, Sep 1', course: 'CS301', status: 'present' as const },
    { date: 'Mon, Sep 1', course: 'MTH101', status: 'present' as const },
    { date: 'Tue, Sep 2', course: 'PHY101', status: 'absent' as const },
    { date: 'Tue, Sep 2', course: 'CS402', status: 'present' as const },
    { date: 'Wed, Sep 3', course: 'ENG201', status: 'present' as const },
  ];

  return (
    <main className="page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Parent Portal</h1>
          <p className="page-subtitle">Read-only view of your child's academic performance, attendance, and fee status.</p>
        </div>
        <span className="badge badge-violet" style={{ fontSize: 12, padding: '6px 14px' }}>
          <Monitor size={12} />
          Read-only
        </span>
      </div>

      {/* Child profile card */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(99,102,241,0.06) 100%)', border: '1px solid rgba(139,92,246,0.2)' }}>
        <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div className="avatar avatar-lg" style={{ background: child.avatarColor, color: '#fff', fontSize: 20 }}>
            {child.avatarInitials}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 2 }}>{child.name}</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>{child.department} · Level {child.level} · {child.matricNo}</div>
            <span className="badge badge-emerald"><CheckCircle2 size={10} />{child.status}</span>
          </div>
          <div style={{ display: 'flex', gap: 20, textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--emerald-400)', letterSpacing: -1 }}>{child.cgpa.toFixed(2)}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>CGPA</div>
            </div>
            <div style={{ width: 1, background: 'var(--border)' }} />
            <div>
              <div style={{ fontSize: 28, fontWeight: 800, color: child.balance > 0 ? 'var(--rose-400)' : 'var(--emerald-400)', letterSpacing: -1 }}>
                {child.balance > 0 ? `GHS ${child.balance.toLocaleString()}` : 'Clear'}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Balance</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-3">
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Attendance Rate</div><div className="stat-value">82%</div></div>
            <div className="stat-icon" style={{ background:'var(--emerald-glow)' }}><CheckCircle2 size={20} style={{ color:'var(--emerald-400)' }} /></div>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width:'82%', background:'var(--emerald-500)' }} /></div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Current CGPA</div><div className="stat-value">{child.cgpa.toFixed(2)}</div></div>
            <div className="stat-icon" style={{ background:'var(--indigo-glow)' }}><TrendingUp size={20} style={{ color:'var(--indigo-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div>
              <div className="stat-label">Fee Status</div>
              <div className="stat-value" style={{ color: child.balance > 0 ? 'var(--rose-400)' : 'var(--emerald-400)' }}>
                {child.balance > 0 ? 'Outstanding' : 'Cleared'}
              </div>
            </div>
            <div className="stat-icon" style={{ background: child.balance > 0 ? 'var(--rose-glow)' : 'var(--emerald-glow)' }}>
              <CreditCard size={20} style={{ color: child.balance > 0 ? 'var(--rose-400)' : 'var(--emerald-400)' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Attendance log */}
        <div className="card">
          <div className="card-header"><span className="card-title"><User size={15} />Recent Attendance</span></div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Date</th><th>Course</th><th>Status</th></tr>
              </thead>
              <tbody>
                {attendanceLog.map((log, i) => (
                  <tr key={i}>
                    <td>{log.date}</td>
                    <td><span className="badge badge-muted">{log.course}</span></td>
                    <td>
                      <span className={`badge ${log.status === 'present' ? 'badge-emerald' : 'badge-rose'}`}>
                        {log.status === 'present' ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance */}
        <div className="card">
          <div className="card-header"><span className="card-title"><BarChart2 size={15} />Performance Highlights</span></div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {grade && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>CS301 — Data Structures</span>
                  <span style={{ fontWeight: 800, color: 'var(--emerald-400)' }}>{grade.grade}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                  {[['CA Scores', `${grade.ca1 + grade.ca2}/40`], ['Midterm', `${grade.midterm}/30`], ['Final Exam', `${grade.exam}/80`], ['Total', `${grade.total}/100`]].map(([k, v]) => (
                    <div key={k} style={{ padding: '8px 10px', background: 'var(--bg-elevated)', borderRadius: 6 }}>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{k}</div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div style={{ padding:'12px 14px', background:'var(--emerald-glow)', borderRadius: 8, border: '1px solid rgba(16,185,129,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <TrendingUp size={16} style={{ color: 'var(--emerald-400)' }} />
                <span style={{ fontSize: 13, color: 'var(--emerald-400)', fontWeight: 600 }}>Above department average by 0.54 points</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fee direct link */}
      {invoice && invoice.paidAmount < invoice.totalAmount && (
        <div className="card" style={{ border: '1px solid rgba(244,63,94,0.25)', background: 'rgba(244,63,94,0.04)' }}>
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Clock size={24} style={{ color: 'var(--rose-400)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Outstanding Fee Balance</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Due by {new Date(invoice.dueDate).toLocaleDateString('en-GB', { dateStyle:'long' })} · GHS {(invoice.totalAmount - invoice.paidAmount).toLocaleString()} remaining</div>
            </div>
            <button className="btn btn-primary" id="btn-pay-fees">
              <CreditCard size={15} /> Pay Now
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
