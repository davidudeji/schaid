import { useState } from 'react';
import { UserPlus, Search, Shield, Mail, MoreVertical, CheckCircle2, XCircle, MinusCircle } from 'lucide-react';
import { users } from '../../types/mockData';
import type { UserRole } from '../../types';

const roleBadge: Record<UserRole, string> = {
  admin: 'badge-rose',
  lecturer: 'badge-indigo',
  student: 'badge-sky',
  parent: 'badge-amber',
  class_rep: 'badge-violet',
};

const roleLabel: Record<UserRole, string> = {
  admin: 'Admin',
  lecturer: 'Lecturer',
  student: 'Student',
  parent: 'Parent',
  class_rep: 'Class Rep',
};

export default function Users() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <main className="page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">Manage roles, permissions, and access control for all platform users.</p>
        </div>
        <button className="btn btn-primary" id="btn-add-user">
          <UserPlus size={15} />
          Add User
        </button>
      </div>

      {/* Role summary cards */}
      <div className="grid-auto">
        {(['admin','lecturer','student','parent','class_rep'] as UserRole[]).map(role => (
          <div
            key={role}
            className="stat-card"
            style={{ cursor: 'pointer', border: roleFilter === role ? '1px solid var(--indigo-500)' : undefined }}
            onClick={() => setRoleFilter(roleFilter === role ? 'all' : role)}
          >
            <div className="stat-card-top">
              <div>
                <div className="stat-label">{roleLabel[role]}s</div>
                <div className="stat-value">{users.filter(u => u.role === role).length}</div>
              </div>
              <div className="stat-icon" style={{ background: 'var(--indigo-glow)' }}>
                <Shield size={18} style={{ color: 'var(--indigo-400)' }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="card">
        <div className="card-header">
          <span className="card-title"><Shield size={15} />Platform Users</span>
          <div className="flex gap-2">
            <div className="topbar-search" style={{ maxWidth: 220 }}>
              <Search size={13} />
              <input
                type="search"
                placeholder="Search users…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                id="users-search"
              />
            </div>
            <select className="form-select" style={{ width: 'auto' }} value={roleFilter} onChange={e => setRoleFilter(e.target.value)} id="role-filter">
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="lecturer">Lecturer</option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
              <option value="class_rep">Class Rep</option>
            </select>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Joined</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar avatar-sm" style={{ background: u.avatarColor, color: '#fff' }}>
                        {u.avatarInitials}
                      </div>
                      <strong>{u.name}</strong>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-sm">
                      <Mail size={12} style={{ opacity: 0.5 }} />
                      {u.email}
                    </div>
                  </td>
                  <td><span className={`badge ${roleBadge[u.role]}`}>{roleLabel[u.role]}</span></td>
                  <td>{u.department ?? '—'}</td>
                  <td>
                    <span className={`badge ${u.status === 'active' ? 'badge-emerald' : u.status === 'suspended' ? 'badge-rose' : 'badge-muted'}`}>
                      {u.status === 'active' ? <CheckCircle2 size={10} /> : u.status === 'suspended' ? <XCircle size={10} /> : <MinusCircle size={10} />}
                      {u.status}
                    </span>
                  </td>
                  <td>{new Date(u.joinedAt).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</td>
                  <td><button className="btn-icon"><MoreVertical size={14} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          <span className="text-muted">Showing {filtered.length} of {users.length} users</span>
          <div className="flex gap-2">
            <button className="btn btn-secondary btn-sm">Previous</button>
            <button className="btn btn-secondary btn-sm">Next</button>
          </div>
        </div>
      </div>
    </main>
  );
}
