import { BarChart2, Download, Printer, Star } from 'lucide-react';
import { grades, courses } from '../../types/mockData';
import { useState } from 'react';

const gradeColor = (grade: string) => {
  if (['A+', 'A', 'A-'].includes(grade)) return 'var(--emerald-400)';
  if (['B+', 'B', 'B-'].includes(grade)) return 'var(--sky-400)';
  if (['C+', 'C'].includes(grade)) return 'var(--amber-400)';
  return 'var(--rose-400)';
};

export default function Grades() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0].id);
  const course = courses.find(c => c.id === selectedCourse)!;

  const avgTotal = grades.reduce((s, g) => s + g.total, 0) / grades.length;
  const avgGPA   = grades.reduce((s, g) => s + g.gpa, 0) / grades.length;
  const passRate = Math.round((grades.filter(g => g.total >= 50).length / grades.length) * 100);

  return (
    <main className="page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Gradebook & GPA</h1>
          <p className="page-subtitle">High-density grade matrix, automatic GPA/CGPA computation, and report cards.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-secondary" id="btn-print-grades"><Printer size={15} />Print Cards</button>
          <button className="btn btn-primary" id="btn-export-grades"><Download size={15} />Export</button>
        </div>
      </div>

      {/* Course selector */}
      <div className="card">
        <div className="card-body" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>Course:</span>
          {courses.filter(c => c.status === 'active').map(c => (
            <button
              key={c.id}
              className={`btn btn-sm ${selectedCourse === c.id ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedCourse(c.id)}
              id={`btn-course-${c.id}`}
            >
              {c.code}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4">
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Course</div><div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{course.code}</div></div>
            <div className="stat-icon" style={{ background:'var(--indigo-glow)' }}><BarChart2 size={20} style={{ color:'var(--indigo-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Class Average</div><div className="stat-value">{avgTotal.toFixed(1)}%</div></div>
            <div className="stat-icon" style={{ background:'var(--sky-glow)' }}><Star size={20} style={{ color:'var(--sky-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Avg GPA</div><div className="stat-value">{avgGPA.toFixed(2)}</div></div>
            <div className="stat-icon" style={{ background:'var(--emerald-glow)' }}><Star size={20} style={{ color:'var(--emerald-400)' }} /></div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-top">
            <div><div className="stat-label">Pass Rate</div><div className="stat-value">{passRate}%</div></div>
            <div className="stat-icon" style={{ background:'var(--amber-glow)' }}><BarChart2 size={20} style={{ color:'var(--amber-400)' }} /></div>
          </div>
        </div>
      </div>

      {/* Grade matrix */}
      <div className="card">
        <div className="card-header">
          <span className="card-title"><BarChart2 size={15} />Grade Matrix — {course.code}: {course.title}</span>
          <span className="badge badge-muted">{grades.length} students</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Matric No.</th>
                <th style={{ textAlign: 'center' }}>CA 1 <span style={{ fontWeight: 400 }}>/20</span></th>
                <th style={{ textAlign: 'center' }}>CA 2 <span style={{ fontWeight: 400 }}>/20</span></th>
                <th style={{ textAlign: 'center' }}>Midterm <span style={{ fontWeight: 400 }}>/30</span></th>
                <th style={{ textAlign: 'center' }}>Exam <span style={{ fontWeight: 400 }}>/80</span></th>
                <th style={{ textAlign: 'center' }}>Total <span style={{ fontWeight: 400 }}>/100</span></th>
                <th style={{ textAlign: 'center' }}>Grade</th>
                <th style={{ textAlign: 'center' }}>GPA</th>
              </tr>
            </thead>
            <tbody>
              {grades.map(g => (
                <tr key={g.studentId}>
                  <td><strong>{g.studentName}</strong></td>
                  <td className="text-sm">{g.matricNo}</td>
                  <td style={{ textAlign: 'center' }}>{g.ca1}</td>
                  <td style={{ textAlign: 'center' }}>{g.ca2}</td>
                  <td style={{ textAlign: 'center' }}>{g.midterm}</td>
                  <td style={{ textAlign: 'center' }}>{g.exam}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <strong style={{ color: gradeColor(g.grade) }}>{g.total}</strong>
                      <div className="progress-bar" style={{ width: 60 }}>
                        <div className="progress-fill" style={{ width: `${g.total}%`, background: gradeColor(g.grade) }} />
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: 14, color: gradeColor(g.grade) }}>{g.grade}</span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`badge ${g.gpa >= 3.5 ? 'badge-emerald' : g.gpa >= 3.0 ? 'badge-sky' : g.gpa >= 2.0 ? 'badge-amber' : 'badge-rose'}`}>
                      {g.gpa.toFixed(1)}
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
