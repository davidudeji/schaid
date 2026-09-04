import { useState } from 'react';
import { Package, Cpu, FlaskConical, BookMarked, Armchair, Search, AlertTriangle, CheckCircle2, MoreVertical } from 'lucide-react';
import { inventory } from '../../types/mockData';
import type { InventoryItem } from '../../types';

const categoryIcons: Record<InventoryItem['category'], React.ReactNode> = {
  electronics: <Cpu size={16} />,
  lab_kit:     <FlaskConical size={16} />,
  book:        <BookMarked size={16} />,
  furniture:   <Armchair size={16} />,
  equipment:   <Package size={16} />,
};

const conditionBadge: Record<InventoryItem['condition'], string> = {
  good: 'badge-emerald',
  fair: 'badge-amber',
  poor: 'badge-rose',
};

export default function Inventory() {
  const [search, setSearch] = useState('');

  const filtered = inventory.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.location.toLowerCase().includes(search.toLowerCase())
  );

  const goodCount  = inventory.filter(i => i.condition === 'good').length;
  const fairCount  = inventory.filter(i => i.condition === 'fair').length;
  const poorCount  = inventory.filter(i => i.condition === 'poor').length;
  const totalItems = inventory.reduce((s, i) => s + i.quantity, 0);

  return (
    <main className="page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Inventory & Assets</h1>
          <p className="page-subtitle">Track physical resources, library stock, and room allocations.</p>
        </div>
        <button className="btn btn-primary" id="btn-add-inventory">
          <Package size={15} />
          Add Item
        </button>
      </div>

      <div className="grid-4">
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Total Items</div><div className="stat-value">{totalItems}</div></div>
            <div className="stat-icon" style={{ background:'var(--indigo-glow)' }}><Package size={20} style={{ color:'var(--indigo-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Good Condition</div><div className="stat-value">{goodCount}</div></div>
            <div className="stat-icon" style={{ background:'var(--emerald-glow)' }}><CheckCircle2 size={20} style={{ color:'var(--emerald-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Fair Condition</div><div className="stat-value">{fairCount}</div></div>
            <div className="stat-icon" style={{ background:'var(--amber-glow)' }}><AlertTriangle size={20} style={{ color:'var(--amber-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Needs Repair</div><div className="stat-value">{poorCount}</div></div>
            <div className="stat-icon" style={{ background:'var(--rose-glow)' }}><AlertTriangle size={20} style={{ color:'var(--rose-400)' }} /></div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title"><Package size={15} />Asset Registry</span>
          <div className="topbar-search" style={{ maxWidth: 240 }}>
            <Search size={13} />
            <input type="search" placeholder="Search assets…" value={search} onChange={e => setSearch(e.target.value)} id="inventory-search" />
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Condition</th>
                <th>Location</th>
                <th>Last Checked</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="stat-icon" style={{ width:28, height:28, background:'var(--bg-overlay)', color:'var(--text-muted)' }}>
                        {categoryIcons[item.category]}
                      </div>
                      <strong>{item.name}</strong>
                    </div>
                  </td>
                  <td><span className="badge badge-muted" style={{ textTransform:'capitalize' }}>{item.category.replace('_',' ')}</span></td>
                  <td><strong>{item.quantity}</strong></td>
                  <td><span className={`badge ${conditionBadge[item.condition]}`}>{item.condition}</span></td>
                  <td>{item.location}</td>
                  <td>{new Date(item.lastChecked).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</td>
                  <td><button className="btn-icon" id={`btn-inv-menu-${item.id}`}><MoreVertical size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <span className="text-muted">Showing {filtered.length} of {inventory.length} items</span>
        </div>
      </div>
    </main>
  );
}
