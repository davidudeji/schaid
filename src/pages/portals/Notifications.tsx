import { useState } from 'react';
import { Bell, Send, MessageSquare, Mail, Smartphone, PlusCircle, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { notifications } from '../../types/mockData';

const priorityConfig = {
  urgent:     { badge: 'badge-rose',    icon: <AlertTriangle size={10} />, label: 'Urgent' },
  standard:   { badge: 'badge-sky',     icon: <Bell size={10} />,          label: 'Standard' },
  individual: { badge: 'badge-amber',   icon: <MessageSquare size={10} />, label: 'Individual' },
};

const channelIcons: Record<string, React.ReactNode> = {
  sms:   <Smartphone size={14} />,
  email: <Mail size={14} />,
  push:  <Bell size={14} />,
};

export default function Notifications() {
  const [compose, setCompose] = useState(false);
  const [channel, setChannel] = useState('email');
  const [priority, setPriority] = useState('standard');

  const sent      = notifications.filter(n => n.status === 'sent').length;
  const scheduled = notifications.filter(n => n.status === 'scheduled').length;
  const totalReach = notifications.filter(n => n.status === 'sent').reduce((s, n) => s + n.recipients, 0);

  return (
    <main className="page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Mass Notifications</h1>
          <p className="page-subtitle">Broadcast SMS, email, and push alerts to students, staff, and parents.</p>
        </div>
        <button className="btn btn-primary" id="btn-compose" onClick={() => setCompose(!compose)}>
          <PlusCircle size={15} /> Compose
        </button>
      </div>

      {/* Compose panel */}
      {compose && (
        <div className="card" style={{ border: '1px solid var(--indigo-500)', background: 'rgba(99,102,241,0.04)' }}>
          <div className="card-header">
            <span className="card-title"><Send size={15} />New Broadcast Message</span>
            <button className="btn btn-ghost btn-sm" onClick={() => setCompose(false)}>Cancel</button>
          </div>
          <div className="card-body">
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Channel</label>
                <select className="form-select" value={channel} onChange={e => setChannel(e.target.value)} id="select-channel">
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="push">Push Notification</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select className="form-select" value={priority} onChange={e => setPriority(e.target.value)} id="select-priority">
                  <option value="standard">Standard</option>
                  <option value="urgent">Urgent</option>
                  <option value="individual">Individual</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Recipient Group</label>
                <select className="form-select" id="select-recipients">
                  <option>All Students (4,218)</option>
                  <option>All Staff (187)</option>
                  <option>All Parents</option>
                  <option>Debtors Only (47)</option>
                  <option>Custom Group…</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Subject / Title</label>
                <input className="form-input" placeholder="e.g. Exam Timetable Published" id="input-notif-title" />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: 12 }}>
              <label className="form-label">Message Body</label>
              <textarea
                className="form-input"
                rows={4}
                placeholder="Type your message here…"
                id="input-notif-body"
                style={{ resize: 'vertical' }}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" id="btn-schedule-notif"><Clock size={14} />Schedule</button>
            <button className="btn btn-primary" id="btn-send-notif"><Send size={14} />Send Now</button>
          </div>
        </div>
      )}

      <div className="grid-3">
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Sent</div><div className="stat-value">{sent}</div></div>
            <div className="stat-icon" style={{ background:'var(--emerald-glow)' }}><CheckCircle2 size={20} style={{ color:'var(--emerald-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Scheduled</div><div className="stat-value">{scheduled}</div></div>
            <div className="stat-icon" style={{ background:'var(--amber-glow)' }}><Clock size={20} style={{ color:'var(--amber-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Total Reach</div><div className="stat-value">{totalReach.toLocaleString()}</div></div>
            <div className="stat-icon" style={{ background:'var(--indigo-glow)' }}><Bell size={20} style={{ color:'var(--indigo-400)' }} /></div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title"><Bell size={15} />Notification History</span>
          <span className="text-muted">{notifications.length} dispatches</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Channel</th>
                <th>Priority</th>
                <th>Recipients</th>
                <th>Sent At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map(n => {
                const pc = priorityConfig[n.priority];
                return (
                  <tr key={n.id}>
                    <td>
                      <div>
                        <strong>{n.title}</strong>
                        <div className="text-muted mt-1" style={{ maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.message}</div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2" style={{ textTransform: 'uppercase', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>
                        {channelIcons[n.channel]}{n.channel}
                      </div>
                    </td>
                    <td><span className={`badge ${pc.badge}`}>{pc.icon}{pc.label}</span></td>
                    <td>{n.recipients.toLocaleString()}</td>
                    <td>{n.sentAt}</td>
                    <td>
                      <span className={`badge ${n.status === 'sent' ? 'badge-emerald' : n.status === 'scheduled' ? 'badge-amber' : 'badge-muted'}`}>
                        {n.status === 'sent' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                        {n.status}
                      </span>
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
