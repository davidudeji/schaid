import { Receipt, AlertTriangle, CheckCircle2, Clock, Send, Eye } from 'lucide-react';
import { feeInvoices } from '../../types/mockData';

const statusConfig = {
  paid:     { badge: 'badge-emerald', icon: <CheckCircle2 size={10} />, label: 'Paid' },
  partial:  { badge: 'badge-sky',     icon: <Clock size={10} />,         label: 'Partial' },
  overdue:  { badge: 'badge-rose',    icon: <AlertTriangle size={10} />, label: 'Overdue' },
  pending:  { badge: 'badge-amber',   icon: <Clock size={10} />,         label: 'Pending' },
};

export default function Fees() {
  const total      = feeInvoices.reduce((s, f) => s + f.totalAmount, 0);
  const collected  = feeInvoices.reduce((s, f) => s + f.paidAmount, 0);
  const outstanding = total - collected;
  const overdueCount = feeInvoices.filter(f => f.status === 'overdue').length;

  return (
    <main className="page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Fee Collection</h1>
          <p className="page-subtitle">Automated invoicing, debtor ledger, and payment plan tracking.</p>
        </div>
        <button className="btn btn-primary" id="btn-bulk-invoice">
          <Send size={15} /> Send Bulk Invoices
        </button>
      </div>

      <div className="grid-4">
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Total Invoiced</div><div className="stat-value">GHS {(total/1000).toFixed(1)}K</div></div>
            <div className="stat-icon" style={{ background:'var(--indigo-glow)' }}><Receipt size={20} style={{ color:'var(--indigo-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Collected</div><div className="stat-value">GHS {(collected/1000).toFixed(1)}K</div></div>
            <div className="stat-icon" style={{ background:'var(--emerald-glow)' }}><CheckCircle2 size={20} style={{ color:'var(--emerald-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Outstanding</div><div className="stat-value">GHS {(outstanding/1000).toFixed(1)}K</div></div>
            <div className="stat-icon" style={{ background:'var(--rose-glow)' }}><AlertTriangle size={20} style={{ color:'var(--rose-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Overdue</div><div className="stat-value">{overdueCount} invoices</div></div>
            <div className="stat-icon" style={{ background:'var(--amber-glow)' }}><Clock size={20} style={{ color:'var(--amber-400)' }} /></div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title"><Receipt size={15} />Debtor Ledger</span>
          <span className="text-muted">{feeInvoices.length} invoices this semester</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Matric No.</th>
                <th>Total Due</th>
                <th>Paid</th>
                <th>Balance</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {feeInvoices.map(inv => {
                const balance = inv.totalAmount - inv.paidAmount;
                const sc = statusConfig[inv.status];
                return (
                  <tr key={inv.id}>
                    <td><strong>{inv.studentName}</strong></td>
                    <td className="text-sm">{inv.matricNo}</td>
                    <td>GHS {inv.totalAmount.toLocaleString()}</td>
                    <td style={{ color: 'var(--emerald-400)' }}>GHS {inv.paidAmount.toLocaleString()}</td>
                    <td style={{ color: balance > 0 ? 'var(--rose-400)' : 'var(--text-muted)' }}>
                      {balance > 0 ? `GHS ${balance.toLocaleString()}` : '—'}
                    </td>
                    <td>{new Date(inv.dueDate).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</td>
                    <td><span className={`badge ${sc.badge}`}>{sc.icon}{sc.label}</span></td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-sm btn-secondary" id={`btn-view-inv-${inv.id}`}><Eye size={12} />View</button>
                        {balance > 0 && <button className="btn btn-sm btn-primary" id={`btn-remind-${inv.id}`}><Send size={12} />Remind</button>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)' }}>
              <span>Collection Rate</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{Math.round((collected / total) * 100)}%</span>
            </div>
            <div className="progress-bar" style={{ height: 8 }}>
              <div className="progress-fill" style={{ width: `${(collected / total) * 100}%`, background: 'var(--emerald-500)' }} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
