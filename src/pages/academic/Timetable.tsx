import React from 'react';
import { CalendarDays, MapPin, User, FlaskConical, BookOpen, MonitorPlay, GraduationCap } from 'lucide-react';
import { timetable } from '../../types/mockData';
import type { TimetableEntry } from '../../types';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const typeConfig: Record<TimetableEntry['type'], { badge: string; icon: React.ReactNode }> = {
  lecture:  { badge: 'badge-indigo', icon: <BookOpen size={11} /> },
  lab:      { badge: 'badge-violet', icon: <FlaskConical size={11} /> },
  exam:     { badge: 'badge-rose',   icon: <GraduationCap size={11} /> },
  seminar:  { badge: 'badge-sky',    icon: <MonitorPlay size={11} /> },
};

export default function Timetable() {
  return (
    <main className="page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Timetable & Scheduling</h1>
          <p className="page-subtitle">Master schedule for lectures, labs, and exams with conflict prevention.</p>
        </div>
        <button className="btn btn-primary" id="btn-add-slot">
          <CalendarDays size={15} /> Add Time Slot
        </button>
      </div>

      {/* Weekly grid */}
      <div className="card">
        <div className="card-header">
          <span className="card-title"><CalendarDays size={15} />Weekly Schedule — Semester 1, 2026/2027</span>
          <div className="flex gap-2">
            {Object.entries(typeConfig).map(([type, cfg]) => (
              <span key={type} className={`badge ${cfg.badge}`}>{cfg.icon}{type}</span>
            ))}
          </div>
        </div>
        <div className="card-body" style={{ overflowX: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: `80px repeat(${days.length}, 1fr)`, gap: 8, minWidth: 700 }}>
            {/* Header */}
            <div />
            {days.map(day => (
              <div key={day} style={{ fontWeight: 600, fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center', padding: '4px 0', borderBottom: '1px solid var(--border)' }}>
                {day}
              </div>
            ))}

            {/* Time rows */}
            {['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00'].map(hour => (
              <React.Fragment key={hour}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', paddingTop: 4, textAlign: 'right', paddingRight: 8 }}>{hour}</div>
                {days.map(day => {
                  const slot = timetable.find(t => t.day === day && t.startTime === hour);
                  return (
                    <div key={`${day}-${hour}`} style={{ minHeight: 52, position: 'relative' }}>
                      {slot && (
                        <div style={{
                          background: 'var(--indigo-glow)',
                          border: '1px solid rgba(99,102,241,0.3)',
                          borderRadius: 6,
                          padding: '6px 8px',
                          fontSize: 11,
                          cursor: 'pointer',
                        }}>
                          <div style={{ fontWeight: 700, color: 'var(--indigo-400)', marginBottom: 2 }}>{slot.courseCode}</div>
                          <div style={{ color: 'var(--text-secondary)', marginBottom: 3 }}>{slot.courseTitle.length > 16 ? slot.courseTitle.slice(0,16)+'…' : slot.courseTitle}</div>
                          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            <span className={`badge ${typeConfig[slot.type].badge}`} style={{ fontSize: 9 }}>
                              {typeConfig[slot.type].icon}{slot.type}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: 6, marginTop: 4, fontSize: 10, color: 'var(--text-muted)' }}>
                            <span style={{ display:'flex', alignItems:'center', gap:2 }}><MapPin size={9} />{slot.venue}</span>
                            <span style={{ display:'flex', alignItems:'center', gap:2 }}><User size={9} />{slot.lecturer.split(' ').pop()}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* List view */}
      <div className="card">
        <div className="card-header">
          <span className="card-title"><CalendarDays size={15} />All Scheduled Sessions</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Day</th>
                <th>Time</th>
                <th>Venue</th>
                <th>Lecturer</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map(t => (
                <tr key={t.id}>
                  <td>
                    <div>
                      <strong>{t.courseTitle}</strong>
                      <div className="text-muted mt-1">{t.courseCode}</div>
                    </div>
                  </td>
                  <td><span className="badge badge-muted">{t.day}</span></td>
                  <td>{t.startTime} – {t.endTime}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} style={{ color: 'var(--text-muted)' }} />
                      {t.venue}
                    </div>
                  </td>
                  <td>{t.lecturer}</td>
                  <td><span className={`badge ${typeConfig[t.type].badge}`}>{typeConfig[t.type].icon}{t.type}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
