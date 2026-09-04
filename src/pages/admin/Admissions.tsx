import { useState } from 'react';
import { ClipboardList, CheckCircle2, XCircle, Eye, FileText, Clock, Search } from 'lucide-react';
import { admissions } from '../../types/mockData';
import type { AdmissionApplication } from '../../types';

const statusConfig = {
  pending:      { badge: 'badge-amber',   label: 'Pending',     icon: <Clock size={10} /> },
  under_review: { badge: 'badge-sky',     label: 'Under Review', icon: <Eye size={10} /> },
  approved:     { badge: 'badge-emerald', label: 'Approved',    icon: <CheckCircle2 size={10} /> },
  rejected:     { badge: 'badge-rose',    label: 'Rejected',    icon: <XCircle size={10} /> },
};

export default function Admissions() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = admissions.filter(a => {
    const matchSearch = a.applicantName.toLowerCase().includes(search.toLowerCase()) ||
      a.courseApplied.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    pending: admissions.filter(a => a.status === 'pending').length,
    under_review: admissions.filter(a => a.status === 'under_review').length,
    approved: admissions.filter(a => a.status === 'approved').length,
    rejected: admissions.filter(a => a.status === 'rejected').length,
  };

  return (
    <main className="page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Admissions Portal</h1>
          <p className="page-subtitle">Review applications, verify documents, and issue matriculation numbers.</p>
        </div>
        <button className="btn btn-primary" id="btn-export-admissions">
          <FileText size={15} />
          Export Report
        </button>
      </div>

      {/* Summary */}
      <div className="grid-4">
        {([['pending', '#F59E0B'], ['under_review', '#0EA5E9'], ['approved', '#10B981'], ['rejected', '#F43F5E']] as const).map(([s, color]) => (
          <div key={s} className="stat-card" style={{ cursor: 'pointer', border: statusFilter === s ? `1px solid ${color}` : undefined }} onClick={() => setStatusFilter(statusFilter === s ? 'all' : s)}>
            <div className="stat-card-top">
              <div>
                <div className="stat-label">{statusConfig[s].label}</div>
                <div className="stat-value">{counts[s]}</div>
              </div>
              <div className="stat-icon" style={{ background: `${color}22` }}>
                <ClipboardList size={20} style={{ color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-header">
          <span className="card-title"><ClipboardList size={15} />Applications</span>
          <div className="flex gap-2">
            <div className="topbar-search" style={{ maxWidth: 220 }}>
              <Search size={13} />
              <input type="search" placeholder="Search applicants…" value={search} onChange={e => setSearch(e.target.value)} id="admissions-search" />
            </div>
            <select className="form-select" style={{ width: 'auto' }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)} id="admissions-status-filter">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Course Applied</th>
                <th>Email</th>
                <th>Documents</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app: AdmissionApplication) => {
                const sc = statusConfig[app.status];
                return (
                  <tr key={app.id}>
                    <td><strong>{app.applicantName}</strong></td>
                    <td>{app.courseApplied}</td>
                    <td className="text-sm">{app.email}</td>
                    <td>
                      <div className="flex items-center gap-1">
                        <FileText size={12} style={{ color: 'var(--text-muted)' }} />
                        <span>{app.documents} files</span>
                      </div>
                    </td>
                    <td>{new Date(app.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</td>
                    <td><span className={`badge ${sc.badge}`}>{sc.icon}{sc.label}</span></td>
                    <td>
                      <div className="flex gap-2">
                        {app.status === 'pending' || app.status === 'under_review' ? (
                          <>
                            <button className="btn btn-sm btn-primary" id={`btn-approve-${app.id}`}>
                              <CheckCircle2 size={12} /> Approve
                            </button>
                            <button className="btn btn-sm btn-danger" id={`btn-reject-${app.id}`}>
                              <XCircle size={12} /> Reject
                            </button>
                          </>
                        ) : (
                          <button className="btn btn-sm btn-secondary" id={`btn-view-${app.id}`}>
                            <Eye size={12} /> View
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <span className="text-muted">Showing {filtered.length} of {admissions.length} applications</span>
        </div>
      </div>
    </main>
  );
}
