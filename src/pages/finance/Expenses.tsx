import { TrendingDown, CheckCircle2, Clock, XCircle, PlusCircle } from 'lucide-react';
import { expenses, revenueByMonth, expenseByMonth } from '../../types/mockData';

const categoryColors: Record<string, string> = {
  utilities:   '#0EA5E9',
  salaries:    '#6366F1',
  maintenance: '#F59E0B',
  supplies:    '#10B981',
  vendor:      '#8B5CF6',
};

function MiniChart({ data, color }: { data: { month: string; value: number }[]; color: string }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="chart-bars">
      {data.map(d => (
        <div key={d.month} className="chart-bar-col">
          <div className="chart-bar" style={{ height: `${(d.value / max) * 100}%`, background: color }} />
          <span className="chart-bar-label">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

export default function Expenses() {
  const total    = expenses.reduce((s, e) => s + e.amount, 0);
  const approved = expenses.filter(e => e.status === 'approved').length;
  const pending  = expenses.filter(e => e.status === 'pending').length;
  const totalRevenue = revenueByMonth.reduce((s, r) => s + r.value, 0);
  const totalExp     = expenseByMonth.reduce((s, e) => s + e.value, 0);
  const netMargin    = totalRevenue - totalExp;

  return (
    <main className="page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Expense Tracking</h1>
          <p className="page-subtitle">Log operational costs, vendor bills, and live net margin reporting.</p>
        </div>
        <button className="btn btn-primary" id="btn-log-expense">
          <PlusCircle size={15} /> Log Expense
        </button>
      </div>

      <div className="grid-4">
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Total Expenses</div><div className="stat-value">GHS {(total/1000).toFixed(1)}K</div></div>
            <div className="stat-icon" style={{ background:'var(--rose-glow)' }}><TrendingDown size={20} style={{ color:'var(--rose-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Approved</div><div className="stat-value">{approved}</div></div>
            <div className="stat-icon" style={{ background:'var(--emerald-glow)' }}><CheckCircle2 size={20} style={{ color:'var(--emerald-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Pending Approval</div><div className="stat-value">{pending}</div></div>
            <div className="stat-icon" style={{ background:'var(--amber-glow)' }}><Clock size={20} style={{ color:'var(--amber-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div>
              <div className="stat-label">Net Margin (6m)</div>
              <div className="stat-value" style={{ color: netMargin > 0 ? 'var(--emerald-400)' : 'var(--rose-400)' }}>
                GHS {(netMargin/1000).toFixed(0)}K
              </div>
            </div>
            <div className="stat-icon" style={{ background:'var(--sky-glow)' }}><TrendingDown size={20} style={{ color:'var(--sky-400)' }} /></div>
          </div>
        </div>
      </div>

      {/* Revenue vs Expense chart */}
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><span className="card-title">Revenue (6 months)</span></div>
          <div className="card-body"><MiniChart data={revenueByMonth} color="var(--emerald-500)" /></div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Expenses (6 months)</span></div>
          <div className="card-body"><MiniChart data={expenseByMonth} color="var(--rose-500)" /></div>
        </div>
      </div>

      {/* By category */}
      <div className="card">
        <div className="card-header"><span className="card-title"><TrendingDown size={15} />Expense Breakdown</span></div>
        <div className="card-body" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {Object.entries(categoryColors).map(([cat, color]) => {
            const catTotal = expenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0);
            const pct = total > 0 ? Math.round((catTotal / total) * 100) : 0;
            return (
              <div key={cat} style={{ flex: '1 1 140px', padding: '12px 14px', background: 'var(--bg-elevated)', borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'capitalize', color: 'var(--text-secondary)' }}>{cat}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color }}>{pct}%</span>
                </div>
                <div className="progress-bar" style={{ marginBottom: 6 }}>
                  <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>GHS {catTotal.toLocaleString()}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title"><TrendingDown size={15} />Expense Log</span>
          <span className="text-muted">{expenses.length} entries</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Approved By</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(exp => (
                <tr key={exp.id}>
                  <td><strong>{exp.description}</strong></td>
                  <td>
                    <span className="badge" style={{ background: `${categoryColors[exp.category]}20`, color: categoryColors[exp.category], textTransform: 'capitalize' }}>
                      {exp.category}
                    </span>
                  </td>
                  <td><strong>GHS {exp.amount.toLocaleString()}</strong></td>
                  <td>{new Date(exp.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                  <td>{exp.approvedBy}</td>
                  <td>
                    <span className={`badge ${exp.status === 'approved' ? 'badge-emerald' : exp.status === 'pending' ? 'badge-amber' : 'badge-rose'}`}>
                      {exp.status === 'approved' ? <CheckCircle2 size={10} /> : exp.status === 'pending' ? <Clock size={10} /> : <XCircle size={10} />}
                      {exp.status}
                    </span>
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
