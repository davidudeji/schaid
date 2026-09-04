import { useState } from 'react';
import { Briefcase, DollarSign, Calendar, MoreVertical, PlusCircle, CheckCircle2, Coffee, XCircle } from 'lucide-react';
import { staff } from '../../types/mockData';

const contractColors: Record<string, string> = {
  full_time: 'badge-indigo',
  part_time: 'badge-amber',
  adjunct: 'badge-violet',
};

const contractLabel: Record<string, string> = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  adjunct: 'Adjunct',
};

export default function HR() {
  const [activeTab, setActiveTab] = useState<'staff' | 'payroll' | 'leave'>('staff');

  const totalSalaries = staff.reduce((sum, s) => sum + s.salary, 0);
  const fullTime = staff.filter(s => s.contractType === 'full_time').length;
  const onLeave = staff.filter(s => s.status === 'on_leave').length;

  return (
    <main className="page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">HR & Payroll</h1>
          <p className="page-subtitle">Manage staff records, salary disbursements, and leave workflows.</p>
        </div>
        <button className="btn btn-primary" id="btn-add-staff">
          <PlusCircle size={15} />
          Add Staff Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid-4">
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Total Staff</div><div className="stat-value">{staff.length}</div></div>
            <div className="stat-icon" style={{ background: 'var(--indigo-glow)' }}><Briefcase size={20} style={{ color: 'var(--indigo-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Full-time</div><div className="stat-value">{fullTime}</div></div>
            <div className="stat-icon" style={{ background: 'var(--emerald-glow)' }}><CheckCircle2 size={20} style={{ color: 'var(--emerald-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">On Leave</div><div className="stat-value">{onLeave}</div></div>
            <div className="stat-icon" style={{ background: 'var(--amber-glow)' }}><Coffee size={20} style={{ color: 'var(--amber-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Monthly Payroll</div><div className="stat-value">GHS {(totalSalaries / 1000).toFixed(1)}K</div></div>
            <div className="stat-icon" style={{ background: 'var(--violet-glow)' }}><DollarSign size={20} style={{ color: 'var(--violet-400)' }} /></div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="tabs" style={{ border: 'none', gap: 0 }}>
            <button className={`tab-btn ${activeTab === 'staff' ? 'active' : ''}`} onClick={() => setActiveTab('staff')} id="tab-staff">Staff Records</button>
            <button className={`tab-btn ${activeTab === 'payroll' ? 'active' : ''}`} onClick={() => setActiveTab('payroll')} id="tab-payroll">Payroll Engine</button>
            <button className={`tab-btn ${activeTab === 'leave' ? 'active' : ''}`} onClick={() => setActiveTab('leave')} id="tab-leave">Leave Requests</button>
          </div>
        </div>

        {activeTab === 'staff' && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Staff Member</th>
                  <th>Department</th>
                  <th>Contract</th>
                  <th>Active Courses</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {staff.map(s => (
                  <tr key={s.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="avatar avatar-sm" style={{ background: s.avatarColor, color: '#fff' }}>{s.avatarInitials}</div>
                        <strong>{s.name}</strong>
                      </div>
                    </td>
                    <td>{s.department}</td>
                    <td><span className={`badge ${contractColors[s.contractType]}`}>{contractLabel[s.contractType]}</span></td>
                    <td>
                      <div className="flex gap-1">
                        {s.courses.map(c => <span key={c} className="badge badge-muted">{c}</span>)}
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${s.status === 'active' ? 'badge-emerald' : s.status === 'on_leave' ? 'badge-amber' : 'badge-rose'}`}>
                        {s.status === 'active' ? <CheckCircle2 size={10} /> : s.status === 'on_leave' ? <Coffee size={10} /> : <XCircle size={10} />}
                        {s.status === 'on_leave' ? 'On Leave' : s.status}
                      </span>
                    </td>
                    <td><button className="btn-icon" id={`btn-staff-menu-${s.id}`}><MoreVertical size={14} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'payroll' && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Staff Member</th>
                  <th>Base Salary</th>
                  <th>Bonus</th>
                  <th>Tax (15%)</th>
                  <th>Net Pay</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {staff.map(s => {
                  const bonus = s.contractType === 'full_time' ? s.salary * 0.05 : 0;
                  const tax = (s.salary + bonus) * 0.15;
                  const net = s.salary + bonus - tax;
                  return (
                    <tr key={s.id}>
                      <td><strong>{s.name}</strong></td>
                      <td>GHS {s.salary.toLocaleString()}</td>
                      <td>GHS {bonus.toFixed(0)}</td>
                      <td style={{ color: 'var(--rose-400)' }}>– GHS {tax.toFixed(0)}</td>
                      <td><strong style={{ color: 'var(--emerald-400)' }}>GHS {net.toFixed(0)}</strong></td>
                      <td><span className="badge badge-emerald"><CheckCircle2 size={10} />Disbursed</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'leave' && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Staff Member</th>
                  <th>Leave Type</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><div className="flex items-center gap-2"><div className="avatar avatar-sm" style={{ background: '#F59E0B', color:'#fff' }}>YA</div><strong>Mr. Yaw Acheampong</strong></div></td>
                  <td>Annual Leave</td>
                  <td>Sep 1–14, 2026 (14 days)</td>
                  <td><span className="badge badge-emerald"><CheckCircle2 size={10} />Approved</span></td>
                  <td><button className="btn btn-sm btn-secondary" id="btn-leave-view-1"><Calendar size={12} />View</button></td>
                </tr>
                <tr>
                  <td><div className="flex items-center gap-2"><div className="avatar avatar-sm" style={{ background: '#8B5CF6', color:'#fff' }}>KM</div><strong>Prof. Kweku Mensah</strong></div></td>
                  <td>Sick Leave</td>
                  <td>Sep 8–10, 2026 (3 days)</td>
                  <td><span className="badge badge-amber"><Clock size={10} />Pending</span></td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-sm btn-primary" id="btn-leave-approve-2"><CheckCircle2 size={12} />Approve</button>
                      <button className="btn btn-sm btn-danger" id="btn-leave-reject-2"><XCircle size={12} />Reject</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Clock({ size }: { size: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
}
