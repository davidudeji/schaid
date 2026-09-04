import { CreditCard, CheckCircle2, XCircle, Clock, Download, Zap } from 'lucide-react';
import { transactions } from '../../types/mockData';

const gatewayColors: Record<string, { color: string; bg: string }> = {
  stripe:      { color: '#818CF8', bg: 'rgba(129,140,248,0.12)' },
  flutterwave: { color: '#FBBF24', bg: 'rgba(251,191,36,0.12)' },
  paypal:      { color: '#38BDF8', bg: 'rgba(56,189,248,0.12)' },
};

export default function Payments() {
  const total   = transactions.reduce((s, t) => t.status === 'success' ? s + t.amount : s, 0);
  const success = transactions.filter(t => t.status === 'success').length;
  const pending = transactions.filter(t => t.status === 'pending').length;
  const failed  = transactions.filter(t => t.status === 'failed').length;

  return (
    <main className="page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Payment Gateways</h1>
          <p className="page-subtitle">Stripe, Flutterwave, and PayPal integration — live transaction ledger.</p>
        </div>
        <button className="btn btn-primary" id="btn-export-payments">
          <Download size={15} /> Export Ledger
        </button>
      </div>

      {/* Gateway cards */}
      <div className="grid-3">
        {(['stripe','flutterwave','paypal'] as const).map(gw => {
          const gwTx = transactions.filter(t => t.gateway === gw);
          const gwTotal = gwTx.filter(t => t.status === 'success').reduce((s, t) => s + t.amount, 0);
          const { color, bg } = gatewayColors[gw];
          return (
            <div key={gw} className="stat-card">
              <div className="stat-card-top">
                <div>
                  <div className="stat-label" style={{ textTransform: 'capitalize' }}>{gw}</div>
                  <div className="stat-value">GHS {gwTotal.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{gwTx.length} transactions</div>
                </div>
                <div className="stat-icon" style={{ background: bg }}>
                  <Zap size={20} style={{ color }} />
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(gwTotal / total) * 100}%`, background: color }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid-3">
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Total Cleared</div><div className="stat-value">GHS {total.toLocaleString()}</div></div>
            <div className="stat-icon" style={{ background:'var(--emerald-glow)' }}><CheckCircle2 size={20} style={{ color:'var(--emerald-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Pending</div><div className="stat-value">{pending}</div></div>
            <div className="stat-icon" style={{ background:'var(--amber-glow)' }}><Clock size={20} style={{ color:'var(--amber-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Failed</div><div className="stat-value">{failed}</div></div>
            <div className="stat-icon" style={{ background:'var(--rose-glow)' }}><XCircle size={20} style={{ color:'var(--rose-400)' }} /></div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title"><CreditCard size={15} />Transaction Ledger</span>
          <span className="badge badge-muted">{transactions.length} records</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Reference</th>
                <th>Student</th>
                <th>Amount</th>
                <th>Gateway</th>
                <th>Date</th>
                <th>Status</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => {
                const gw = gatewayColors[tx.gateway];
                return (
                  <tr key={tx.id}>
                    <td><code style={{ background:'var(--bg-overlay)', padding:'2px 6px', borderRadius:4, fontSize:11 }}>{tx.reference}</code></td>
                    <td>
                      <div>
                        <strong>{tx.studentName}</strong>
                        <div className="text-muted mt-1">{tx.matricNo}</div>
                      </div>
                    </td>
                    <td><strong>GHS {tx.amount.toLocaleString()}</strong></td>
                    <td>
                      <span className="badge" style={{ background: gw.bg, color: gw.color, textTransform:'capitalize' }}>
                        {tx.gateway}
                      </span>
                    </td>
                    <td>{new Date(tx.date).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</td>
                    <td>
                      <span className={`badge ${tx.status === 'success' ? 'badge-emerald' : tx.status === 'pending' ? 'badge-amber' : 'badge-rose'}`}>
                        {tx.status === 'success' ? <CheckCircle2 size={10} /> : tx.status === 'pending' ? <Clock size={10} /> : <XCircle size={10} />}
                        {tx.status}
                      </span>
                    </td>
                    <td>
                      {tx.status === 'success' && (
                        <button className="btn btn-sm btn-secondary" id={`btn-receipt-${tx.id}`}>
                          <Download size={12} />PDF
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
