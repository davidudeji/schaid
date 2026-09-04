import { BookOpen, Users, GraduationCap, CheckCircle2, Clock, PlusCircle, Search } from 'lucide-react';
import { useState } from 'react';
import { courses } from '../../types/mockData';

export default function Courses() {
  const [search, setSearch] = useState('');
  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.department.toLowerCase().includes(search.toLowerCase())
  );

  const active   = courses.filter(c => c.status === 'active').length;
  const upcoming = courses.filter(c => c.status === 'upcoming').length;
  const totalEnrolled = courses.reduce((s, c) => s + c.enrolledCount, 0);

  return (
    <main className="page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Course & Curriculum</h1>
          <p className="page-subtitle">Define academic frameworks, credit weights, prerequisites, and syllabi.</p>
        </div>
        <button className="btn btn-primary" id="btn-add-course">
          <PlusCircle size={15} /> Add Course
        </button>
      </div>

      <div className="grid-4">
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Total Courses</div><div className="stat-value">{courses.length}</div></div>
            <div className="stat-icon" style={{ background:'var(--indigo-glow)' }}><BookOpen size={20} style={{ color:'var(--indigo-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Active</div><div className="stat-value">{active}</div></div>
            <div className="stat-icon" style={{ background:'var(--emerald-glow)' }}><CheckCircle2 size={20} style={{ color:'var(--emerald-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Upcoming</div><div className="stat-value">{upcoming}</div></div>
            <div className="stat-icon" style={{ background:'var(--amber-glow)' }}><Clock size={20} style={{ color:'var(--amber-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Total Enrolled</div><div className="stat-value">{totalEnrolled}</div></div>
            <div className="stat-icon" style={{ background:'var(--sky-glow)' }}><Users size={20} style={{ color:'var(--sky-400)' }} /></div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title"><BookOpen size={15} />Course Registry</span>
          <div className="topbar-search" style={{ maxWidth: 240 }}>
            <Search size={13} />
            <input type="search" placeholder="Search courses…" value={search} onChange={e => setSearch(e.target.value)} id="courses-search" />
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Title</th>
                <th>Department</th>
                <th>Credits</th>
                <th>Lecturer</th>
                <th>Enrolled</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td><span className="badge badge-indigo">{c.code}</span></td>
                  <td><strong>{c.title}</strong></td>
                  <td>{c.department}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <GraduationCap size={12} style={{ color: 'var(--text-muted)' }} />
                      {c.credits} cr
                    </div>
                  </td>
                  <td>{c.lecturer}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="progress-bar" style={{ width: 60 }}>
                        <div className="progress-fill" style={{ width: `${Math.min((c.enrolledCount / 150) * 100, 100)}%`, background: 'var(--indigo-500)' }} />
                      </div>
                      <span className="text-sm">{c.enrolledCount}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${c.status === 'active' ? 'badge-emerald' : c.status === 'upcoming' ? 'badge-amber' : 'badge-muted'}`}>
                      {c.status}
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
