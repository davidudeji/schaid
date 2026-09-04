import { useState } from 'react';
import { ScanLine, QrCode, CheckCircle2, XCircle, Clock, RefreshCw, Share2, Users } from 'lucide-react';
import { attendanceRecords } from '../../types/mockData';

export default function Attendance() {
  const [qrActive, setQrActive] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);

  const present = attendanceRecords.filter(r => r.status === 'present').length;
  const absent  = attendanceRecords.filter(r => r.status === 'absent').length;
  const late    = attendanceRecords.filter(r => r.status === 'late').length;
  const total   = attendanceRecords.length;
  const rate    = Math.round((present / total) * 100);

  return (
    <main className="page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Attendance Management</h1>
          <p className="page-subtitle">Dynamic QR-based attendance loop — generate, share, and verify in real time.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary" id="btn-refresh-attendance">
            <RefreshCw size={15} /> Refresh
          </button>
          <button
            className={`btn ${sessionStarted ? 'btn-danger' : 'btn-primary'}`}
            id="btn-start-session"
            onClick={() => { setSessionStarted(!sessionStarted); setQrActive(!sessionStarted); }}
          >
            <ScanLine size={15} />
            {sessionStarted ? 'End Session' : 'Start Session'}
          </button>
        </div>
      </div>

      <div className="grid-2">
        {/* QR Panel */}
        <div className="card">
          <div className="card-header">
            <span className="card-title"><QrCode size={15} />Live QR Code</span>
            {qrActive && <span className="badge badge-emerald"><CheckCircle2 size={10} />Active</span>}
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            {qrActive ? (
              <>
                {/* QR mockup */}
                <div className="qr-block">
                  <svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
                    <rect width="160" height="160" fill="white"/>
                    {/* QR pattern */}
                    <rect x="10" y="10" width="60" height="60" rx="4" fill="#0B1120"/>
                    <rect x="20" y="20" width="40" height="40" rx="2" fill="white"/>
                    <rect x="28" y="28" width="24" height="24" rx="1" fill="#0B1120"/>
                    <rect x="90" y="10" width="60" height="60" rx="4" fill="#0B1120"/>
                    <rect x="100" y="20" width="40" height="40" rx="2" fill="white"/>
                    <rect x="108" y="28" width="24" height="24" rx="1" fill="#0B1120"/>
                    <rect x="10" y="90" width="60" height="60" rx="4" fill="#0B1120"/>
                    <rect x="20" y="100" width="40" height="40" rx="2" fill="white"/>
                    <rect x="28" y="108" width="24" height="24" rx="1" fill="#0B1120"/>
                    <rect x="90" y="90" width="10" height="10" fill="#0B1120"/>
                    <rect x="105" y="90" width="10" height="10" fill="#0B1120"/>
                    <rect x="120" y="90" width="10" height="10" fill="#0B1120"/>
                    <rect x="135" y="90" width="15" height="10" fill="#0B1120"/>
                    <rect x="90" y="105" width="15" height="10" fill="#0B1120"/>
                    <rect x="110" y="105" width="10" height="10" fill="#0B1120"/>
                    <rect x="125" y="105" width="25" height="10" fill="#0B1120"/>
                    <rect x="90" y="120" width="10" height="10" fill="#0B1120"/>
                    <rect x="105" y="120" width="25" height="10" fill="#0B1120"/>
                    <rect x="135" y="120" width="15" height="10" fill="#0B1120"/>
                    <rect x="90" y="135" width="20" height="15" fill="#0B1120"/>
                    <rect x="115" y="135" width="10" height="15" fill="#0B1120"/>
                    <rect x="130" y="135" width="20" height="15" fill="#0B1120"/>
                  </svg>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)', marginBottom: 4 }}>CS301 — Data Structures</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Session ID: QR-{Date.now().toString().slice(-6)} · Expires in <strong style={{ color: 'var(--amber-400)' }}>8:42</strong></div>
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-secondary btn-sm" id="btn-project-qr"><Share2 size={13} />Project</button>
                  <button className="btn btn-primary btn-sm" id="btn-share-to-rep"><Users size={13} />Share to Rep</button>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <QrCode size={48} />
                <p>No active session.<br />Click "Start Session" to generate a QR code.</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="card">
          <div className="card-header">
            <span className="card-title"><Users size={15} />Attendance Summary</span>
            <span className="badge badge-muted">CS301 · Today</span>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 56, fontWeight: 800, color: rate >= 80 ? 'var(--emerald-400)' : 'var(--amber-400)', letterSpacing: -2 }}>{rate}%</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Attendance Rate</div>
            </div>
            <div className="progress-bar" style={{ height: 10 }}>
              <div className="progress-fill" style={{ width: `${rate}%`, background: rate >= 80 ? 'var(--emerald-500)' : 'var(--amber-500)' }} />
            </div>
            <div className="grid-3" style={{ gap: 12 }}>
              <div style={{ textAlign: 'center', padding: '12px 8px', background: 'var(--emerald-glow)', borderRadius: 8 }}>
                <div style={{ fontWeight: 800, fontSize: 24, color: 'var(--emerald-400)' }}>{present}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Present</div>
              </div>
              <div style={{ textAlign: 'center', padding: '12px 8px', background: 'var(--amber-glow)', borderRadius: 8 }}>
                <div style={{ fontWeight: 800, fontSize: 24, color: 'var(--amber-400)' }}>{late}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Late</div>
              </div>
              <div style={{ textAlign: 'center', padding: '12px 8px', background: 'var(--rose-glow)', borderRadius: 8 }}>
                <div style={{ fontWeight: 800, fontSize: 24, color: 'var(--rose-400)' }}>{absent}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Absent</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roster */}
      <div className="card">
        <div className="card-header">
          <span className="card-title"><ScanLine size={15} />Attendance Roster</span>
          <span className="text-muted">{total} students registered</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Matric No.</th>
                <th>Status</th>
                <th>Scanned At</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map(r => (
                <tr key={r.studentId}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar avatar-sm" style={{ background: r.avatarColor, color: '#fff' }}>{r.avatarInitials}</div>
                      <strong>{r.studentName}</strong>
                    </div>
                  </td>
                  <td>{r.matricNo}</td>
                  <td>
                    <span className={`badge ${r.status === 'present' ? 'badge-emerald' : r.status === 'late' ? 'badge-amber' : 'badge-rose'}`}>
                      {r.status === 'present' ? <CheckCircle2 size={10} /> : r.status === 'late' ? <Clock size={10} /> : <XCircle size={10} />}
                      {r.status}
                    </span>
                  </td>
                  <td>{r.scannedAt ?? <span style={{ color: 'var(--text-disabled)' }}>—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
