import { useState, useCallback } from 'react';
import {
  Search, Shield, ShieldAlert, ShieldCheck, ShieldOff,
  Eye, CheckCircle2, XCircle, MinusCircle, Lock,
  ChevronDown, ChevronUp, AlertTriangle, Save, RotateCcw,
  Loader2, User, Mail, Hash, Building2, Clock, FileText
} from 'lucide-react';
import { users } from '../../types/mockData';
import type { User as UserType } from '../../types';

// ─── Types ─────────────────────────────────────────────────────────────────
type RbacRoleId = 'system_admin' | 'operational_manager' | 'standard_editor' | 'read_only_viewer';

interface RbacRole {
  id: RbacRoleId;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  glow: string;
  badge: string;
  permissions: Record<string, Record<string, boolean>>;
}

interface AccessControlState {
  selectedUserId: string | null;
  pendingRoleId: RbacRoleId | null;
  isLoading: boolean;
  isDirty: boolean;
}

interface AuditEntry {
  target_user_id: string;
  updated_by_admin_id: string;
  previous_role_assignment: string;
  new_role_assignment: string;
  timestamp_utc: string;
}

// ─── Mock current admin ─────────────────────────────────────────────────────
const CURRENT_ADMIN_ID = 'u1'; // Dr. Amara Osei — matches mockData

// ─── Role map: ERP users → RBAC roles ────────────────────────────────────────
const roleToRbac: Record<string, RbacRoleId> = {
  admin:     'system_admin',
  lecturer:  'operational_manager',
  class_rep: 'standard_editor',
  student:   'read_only_viewer',
  parent:    'read_only_viewer',
};

// ─── Role definitions ────────────────────────────────────────────────────────
const RBAC_ROLES: RbacRole[] = [
  {
    id: 'system_admin',
    label: 'System Admin',
    description: 'Full system bypass with complete access to financial configurations, data audits, and security settings.',
    icon: <ShieldAlert size={18} />,
    color: '#F43F5E',
    glow: 'rgba(244,63,94,0.15)',
    badge: 'badge-rose',
    permissions: {
      Inventory:  { View: true,  Create: true,  Edit: true,  Delete: true  },
      Billing:    { View: true,  Create: true,  Edit: true,  Delete: true  },
      HR:         { View: true,  Create: true,  Edit: true,  Delete: true  },
      Academics:  { View: true,  Create: true,  Edit: true,  Delete: true  },
      Settings:   { View: true,  Configure: true, Audit: true, 'Security Override': true },
    },
  },
  {
    id: 'operational_manager',
    label: 'Operational Manager',
    description: 'Full write access across production, inventory, and procurement modules. Cannot view root financial sheets.',
    icon: <ShieldCheck size={18} />,
    color: '#6366F1',
    glow: 'rgba(99,102,241,0.15)',
    badge: 'badge-indigo',
    permissions: {
      Inventory:  { View: true,  Create: true,  Edit: true,  Delete: false },
      Billing:    { View: false, Create: false, Edit: false, Delete: false },
      HR:         { View: true,  Create: true,  Edit: true,  Delete: false },
      Academics:  { View: true,  Create: true,  Edit: true,  Delete: false },
      Settings:   { View: true,  Configure: false, Audit: true, 'Security Override': false },
    },
  },
  {
    id: 'standard_editor',
    label: 'Standard Editor',
    description: 'Standard data modification and entry within assigned operational queues. No deletion privileges.',
    icon: <Shield size={18} />,
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.15)',
    badge: 'badge-amber',
    permissions: {
      Inventory:  { View: true,  Create: true,  Edit: true,  Delete: false },
      Billing:    { View: false, Create: false, Edit: false, Delete: false },
      HR:         { View: true,  Create: false, Edit: false, Delete: false },
      Academics:  { View: true,  Create: true,  Edit: true,  Delete: false },
      Settings:   { View: false, Configure: false, Audit: false, 'Security Override': false },
    },
  },
  {
    id: 'read_only_viewer',
    label: 'Read-Only Viewer',
    description: 'Strictly audit and viewing access across all generic dashboard modules.',
    icon: <Eye size={18} />,
    color: '#10B981',
    glow: 'rgba(16,185,129,0.15)',
    badge: 'badge-emerald',
    permissions: {
      Inventory:  { View: true,  Create: false, Edit: false, Delete: false },
      Billing:    { View: false, Create: false, Edit: false, Delete: false },
      HR:         { View: false, Create: false, Edit: false, Delete: false },
      Academics:  { View: true,  Create: false, Edit: false, Delete: false },
      Settings:   { View: false, Configure: false, Audit: false, 'Security Override': false },
    },
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getRbacRole(user: UserType): RbacRoleId {
  return roleToRbac[user.role] ?? 'read_only_viewer';
}

function getRoleById(id: RbacRoleId | null) {
  return RBAC_ROLES.find(r => r.id === id) ?? null;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

/** Left panel user row */
function UserRow({ user, isSelected, onClick }: {
  user: UserType;
  isSelected: boolean;
  onClick: () => void;
}) {
  const rbacRole = getRoleById(getRbacRole(user));
  return (
    <button
      className={`rbac-user-row ${isSelected ? 'rbac-user-row--active' : ''}`}
      onClick={onClick}
      id={`user-row-${user.id}`}
    >
      <div className="avatar avatar-md" style={{ background: user.avatarColor, color: '#fff', flexShrink: 0 }}>
        {user.avatarInitials}
      </div>
      <div className="rbac-user-row-info">
        <div className="rbac-user-row-name">{user.name}</div>
        <div className="rbac-user-row-email">{user.email}</div>
      </div>
      <div className="rbac-user-row-badges">
        <span className={`badge ${user.status === 'active' ? 'badge-emerald' : user.status === 'suspended' ? 'badge-rose' : 'badge-muted'}`}>
          {user.status === 'active' ? <CheckCircle2 size={9} /> : user.status === 'suspended' ? <XCircle size={9} /> : <MinusCircle size={9} />}
          {user.status}
        </span>
        {rbacRole && (
          <span className={`badge ${rbacRole.badge}`} style={{ color: rbacRole.color, background: rbacRole.glow }}>
            {rbacRole.label}
          </span>
        )}
      </div>
    </button>
  );
}

/** Radio card for role selection */
function RoleCard({ role, isSelected, isDisabled, onSelect }: {
  role: RbacRole;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      className={`rbac-role-card ${isSelected ? 'rbac-role-card--selected' : ''} ${isDisabled ? 'rbac-role-card--disabled' : ''}`}
      style={isSelected ? { '--role-color': role.color, '--role-glow': role.glow } as React.CSSProperties : undefined}
      onClick={isDisabled ? undefined : onSelect}
      id={`role-card-${role.id}`}
      disabled={isDisabled}
      role="radio"
      aria-checked={isSelected}
    >
      <div className="rbac-role-card-top">
        <div className="rbac-role-card-icon" style={{ color: role.color, background: role.glow }}>
          {role.icon}
        </div>
        <div className="rbac-role-card-radio">
          <div className={`rbac-radio-dot ${isSelected ? 'rbac-radio-dot--active' : ''}`}
               style={isSelected ? { background: role.color, boxShadow: `0 0 0 3px ${role.glow}` } : undefined} />
        </div>
      </div>
      <div className="rbac-role-card-label">{role.label}</div>
      <div className="rbac-role-card-desc">{role.description}</div>
    </button>
  );
}

/** Permissions accordion module */
function PermissionsMatrix({ roleId }: { roleId: RbacRoleId | null }) {
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({ Inventory: true });

  const role = getRoleById(roleId);
  if (!role) return null;

  const toggle = (mod: string) => setOpenModules(prev => ({ ...prev, [mod]: !prev[mod] }));

  return (
    <div className="rbac-permissions">
      <div className="rbac-permissions-title">
        <FileText size={13} />
        Permissions Matrix
      </div>
      <div className="rbac-permissions-list">
        {Object.entries(role.permissions).map(([module, perms]) => (
          <div key={module} className="rbac-accordion">
            <button className="rbac-accordion-header" onClick={() => toggle(module)} id={`accordion-${module}`}>
              <span className="rbac-accordion-module">{module}</span>
              <span className="rbac-accordion-meta">
                {Object.values(perms).filter(Boolean).length}/{Object.keys(perms).length} granted
              </span>
              {openModules[module] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {openModules[module] && (
              <div className="rbac-accordion-body">
                {Object.entries(perms).map(([perm, allowed]) => (
                  <div key={perm} className="rbac-perm-row">
                    <div className={`rbac-perm-check ${allowed ? 'rbac-perm-check--on' : 'rbac-perm-check--off'}`}>
                      {allowed ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                    </div>
                    <span className="rbac-perm-label">{perm}</span>
                    <span className={`badge ${allowed ? 'badge-emerald' : 'badge-muted'}`} style={{ fontSize: 10 }}>
                      {allowed ? 'Granted' : 'Denied'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** 403 guard */
function ForbiddenScreen() {
  return (
    <div className="rbac-forbidden">
      <ShieldOff size={56} style={{ color: 'var(--rose-400)', opacity: 0.6 }} />
      <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>403 — Access Forbidden</h2>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 380, textAlign: 'center', lineHeight: 1.6 }}>
        Your active session does not carry the <code style={{ background: 'var(--bg-overlay)', padding: '2px 6px', borderRadius: 4 }}>admin</code> role required to access this control panel.
      </p>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Users() {
  // Mock: current session is admin — toggle to false to test 403
  const currentSessionIsAdmin = true;

  const [search, setSearch] = useState('');
  const [state, setState] = useState<AccessControlState>({
    selectedUserId: null,
    pendingRoleId: null,
    isLoading: false,
    isDirty: false,
  });
  const [savedRoles, setSavedRoles] = useState<Record<string, RbacRoleId>>(
    Object.fromEntries(users.map(u => [u.id, getRbacRole(u)]))
  );
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // ── 403 guard — placed after all hooks ───────────────────────────────────
  if (!currentSessionIsAdmin) return <main className="page"><ForbiddenScreen /></main>;

  const filteredUsers = users.filter(u => {
    const q = search.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.includes(q);
  });

  const selectedUser = state.selectedUserId ? users.find(u => u.id === state.selectedUserId) ?? null : null;
  const isSelf = state.selectedUserId === CURRENT_ADMIN_ID;
  const currentSavedRole = state.selectedUserId ? savedRoles[state.selectedUserId] : null;

  // ── Select user ────────────────────────────────────────────────────────────
  const handleSelectUser = useCallback((userId: string) => {
    setState({
      selectedUserId: userId,
      pendingRoleId: savedRoles[userId],
      isLoading: false,
      isDirty: false,
    });
  }, [savedRoles]);

  // ── Select role ────────────────────────────────────────────────────────────
  const handleSelectRole = useCallback((roleId: RbacRoleId) => {
    setState(prev => ({
      ...prev,
      pendingRoleId: roleId,
      isDirty: roleId !== (prev.selectedUserId ? savedRoles[prev.selectedUserId] : null),
    }));
  }, [savedRoles]);

  // ── Cancel ─────────────────────────────────────────────────────────────────
  const handleCancel = useCallback(() => {
    setState(prev => ({
      ...prev,
      pendingRoleId: prev.selectedUserId ? savedRoles[prev.selectedUserId] : null,
      isDirty: false,
    }));
  }, [savedRoles]);

  // ── Save ───────────────────────────────────────────────────────────────────
  const handleSave = useCallback(async () => {
    if (!state.selectedUserId || !state.pendingRoleId || !state.isDirty) return;

    setState(prev => ({ ...prev, isLoading: true }));

    // Audit footprint pipeline — logged to console (replace with API call in production)
    const auditEntry: AuditEntry = {
      target_user_id:           state.selectedUserId!,
      updated_by_admin_id:      CURRENT_ADMIN_ID,
      previous_role_assignment: currentSavedRole ?? 'unknown',
      new_role_assignment:      state.pendingRoleId!,
      timestamp_utc:            new Date().toISOString(),
    };
    console.log('[RBAC Audit]', JSON.stringify(auditEntry, null, 2));

    // Simulate 1000ms network call
    await new Promise(res => setTimeout(res, 1000));

    setSavedRoles(prev => ({ ...prev, [state.selectedUserId!]: state.pendingRoleId! }));
    setState(prev => ({ ...prev, isLoading: false, isDirty: false }));
    setToast({ message: `Role updated to "${getRoleById(state.pendingRoleId!)?.label}"`, type: 'success' });
    setTimeout(() => setToast(null), 3500);
  }, [state, currentSavedRole]);

  const pendingRole = getRoleById(state.pendingRoleId);

  return (
    <div className="rbac-shell">
      {/* ── Toast ─────────────────────────────────────────────── */}
      {toast && (
        <div className={`rbac-toast rbac-toast--${toast.type}`} role="alert">
          {toast.type === 'success' ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════
          LEFT PANEL — User Directory
          ════════════════════════════════════════════════════════ */}
      <div className="rbac-left">
        {/* Sticky search header */}
        <div className="rbac-left-header">
          <div className="rbac-left-title">
            <Shield size={16} style={{ color: 'var(--indigo-400)' }} />
            User Directory
            <span className="badge badge-muted" style={{ marginLeft: 'auto' }}>{users.length}</span>
          </div>
          <div className="topbar-search" style={{ maxWidth: '100%' }}>
            <Search size={13} />
            <input
              type="search"
              placeholder="Search by name, email, or ID…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              id="rbac-user-search"
            />
          </div>
        </div>

        {/* Scrollable user list */}
        <div className="rbac-user-list">
          {filteredUsers.length === 0 ? (
            <div className="empty-state">
              <User size={32} />
              <p>No users match your search.</p>
            </div>
          ) : filteredUsers.map(u => (
            <UserRow
              key={u.id}
              user={u}
              isSelected={state.selectedUserId === u.id}
              onClick={() => handleSelectUser(u.id)}
            />
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          RIGHT PANEL — Access Configurator
          ════════════════════════════════════════════════════════ */}
      <div className="rbac-right">
        {!selectedUser ? (
          /* Empty default state */
          <div className="rbac-empty">
            <div className="rbac-empty-icon">
              <ShieldCheck size={40} style={{ color: 'var(--indigo-400)' }} />
            </div>
            <h3 className="rbac-empty-title">Access Configurator</h3>
            <p className="rbac-empty-desc">
              Select a user from the left directory to configure platform access privileges.
            </p>
            <div className="rbac-empty-hints">
              {RBAC_ROLES.map(r => (
                <span key={r.id} className={`badge ${r.badge}`} style={{ color: r.color, background: r.glow, fontSize: 11 }}>
                  {r.icon}{r.label}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="rbac-configurator">
            {/* ── Identity Summary ──────────────────────────── */}
            <div className="rbac-identity">
              <div className="avatar avatar-lg" style={{ background: selectedUser.avatarColor, color: '#fff' }}>
                {selectedUser.avatarInitials}
              </div>
              <div className="rbac-identity-info">
                <div className="rbac-identity-name">{selectedUser.name}</div>
                <div className="rbac-identity-meta">
                  <span><Mail size={11} />{selectedUser.email}</span>
                  <span><Hash size={11} />{selectedUser.id}</span>
                  {selectedUser.department && <span><Building2 size={11} />{selectedUser.department}</span>}
                  <span><Clock size={11} />Joined {new Date(selectedUser.joinedAt).toLocaleDateString('en-GB', { month:'short', year:'numeric' })}</span>
                </div>
              </div>
              <div className="rbac-identity-current">
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Current Role</div>
                {currentSavedRole && (() => {
                  const r = getRoleById(currentSavedRole)!;
                  return (
                    <span className={`badge ${r.badge}`} style={{ color: r.color, background: r.glow, fontSize: 12, padding: '5px 10px' }}>
                      {r.icon}{r.label}
                    </span>
                  );
                })()}
              </div>
            </div>

            {/* ── Self-lockout banner ───────────────────────── */}
            {isSelf && (
              <div className="rbac-lockout-banner">
                <Lock size={15} style={{ flexShrink: 0 }} />
                <span>
                  <strong>Security policy restriction:</strong> You are not authorized to modify your own root administrative privilege boundaries.
                </span>
              </div>
            )}

            {/* ── Role Radio Card Group ─────────────────────── */}
            <div className="rbac-section-label">
              <ShieldAlert size={13} />
              Assign Role
            </div>
            <div className="rbac-role-grid">
              {RBAC_ROLES.map(role => (
                <RoleCard
                  key={role.id}
                  role={role}
                  isSelected={state.pendingRoleId === role.id}
                  isDisabled={isSelf}
                  onSelect={() => handleSelectRole(role.id)}
                />
              ))}
            </div>

            {/* ── Permissions Matrix ────────────────────────── */}
            {state.pendingRoleId && (
              <PermissionsMatrix roleId={state.pendingRoleId} />
            )}

            {/* ── Persistent Action Bar ─────────────────────── */}
            <div className="rbac-action-bar">
              <div className="rbac-action-bar-left">
                {state.isDirty && pendingRole && (
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <AlertTriangle size={12} style={{ color: 'var(--amber-400)' }} />
                    Unsaved: switching to <strong style={{ color: pendingRole.color }}>{pendingRole.label}</strong>
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  disabled={!state.isDirty || state.isLoading}
                  id="btn-rbac-cancel"
                >
                  <RotateCcw size={14} />
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={!state.isDirty || state.isLoading || isSelf}
                  id="btn-rbac-save"
                >
                  {state.isLoading
                    ? <><Loader2 size={14} className="rbac-spin" />Saving…</>
                    : <><Save size={14} />Save Changes</>
                  }
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
