import { useState, useRef, useEffect, useCallback } from 'react';
import {
  BookOpen, Users, GraduationCap, CheckCircle2, Clock, PlusCircle, Search,
  Play, Pause, Square, Volume2, ChevronDown, FileText, Upload,
  MessageSquare, BarChart2, ListChecks, Layers, AlertCircle,
  ChevronRight, Mic, SlidersHorizontal, RotateCcw, CheckSquare,
  Star, BookMarked, ClipboardList
} from 'lucide-react';
import { courses } from '../../types/mockData';

// ─── Mock data for course detail view ────────────────────────────────────────
interface SyllabusUnit {
  id: string;
  unit: number;
  title: string;
  topics: string[];
  completed: boolean;
  materials: CourseMaterial[];
}

interface CourseMaterial {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'txt';
  size: string;
  progress: number; // 0-100 how much the student has read
  content: string;  // extracted text for Read Aloud
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  maxMarks: number;
  submitted: boolean;
  grade?: number;
  weight: number;
}

interface Discussion {
  id: string;
  author: string;
  avatar: string;
  message: string;
  time: string;
  replies: number;
}

const SYLLABUS: SyllabusUnit[] = [
  {
    id: 'u1', unit: 1, title: 'Introduction to Data Structures', completed: true, topics: ['Arrays & Linked Lists', 'Stack & Queue', 'Time Complexity Analysis'],
    materials: [
      { id: 'm1', name: 'Unit 1 — Lecture Notes.pdf', type: 'pdf', size: '1.2 MB', progress: 100,
        content: 'Data structures are fundamental building blocks of computer science. A data structure is a way of organizing and storing data in a computer so that it can be accessed and modified efficiently. Arrays store elements in contiguous memory locations, making indexed access extremely fast at O(1) time. Linked lists, in contrast, use nodes connected by pointers, allowing dynamic size but requiring O(n) for search. A Stack follows Last-In-First-Out semantics, used in function call management and undo operations. A Queue follows First-In-First-Out semantics, widely used in scheduling and breadth-first search algorithms. Time complexity analysis using Big-O notation is essential for comparing algorithm efficiency.' },
      { id: 'm2', name: 'Week 1 Reading — CLRS Chapter 2.txt', type: 'txt', size: '48 KB', progress: 60,
        content: 'Insertion sort is an efficient algorithm for sorting a small number of elements. Insertion sort works the way many people sort a hand of playing cards. We start with an empty left hand and the cards face down on the table. We then remove one card at a time from the table and insert it into the correct position in the left hand. To find the correct position for a card, we compare it with each of the cards already in the hand, from right to left.' },
    ],
  },
  {
    id: 'u2', unit: 2, title: 'Binary Trees & Heaps', completed: true, topics: ['Binary Search Trees', 'AVL Trees', 'Min/Max Heaps', 'Tree Traversals'],
    materials: [
      { id: 'm3', name: 'Unit 2 — BST Deep Dive.pdf', type: 'pdf', size: '2.1 MB', progress: 40,
        content: 'A binary search tree is a rooted binary tree data structure with the key of each internal node being greater than all the keys in the respective node left subtree and less than the ones in its right subtree. The time complexity of operations on the binary search tree is directly proportional to the height of the tree. AVL trees are self-balancing binary search trees where the difference between heights of left and right subtrees cannot be more than one for all nodes. Heaps are specialized tree-based data structures that satisfy the heap property.' },
    ],
  },
  {
    id: 'u3', unit: 3, title: 'Graph Algorithms', completed: false, topics: ['Graph Representation', 'BFS & DFS', 'Dijkstra\'s Algorithm', 'Minimum Spanning Trees'],
    materials: [
      { id: 'm4', name: 'Unit 3 — Graph Theory.pdf', type: 'pdf', size: '3.4 MB', progress: 0,
        content: 'A graph is a non-linear data structure consisting of vertices and edges. The vertices are sometimes also referred to as nodes and the edges are lines or arcs that connect any two nodes in the graph. Breadth-first search explores all vertices at the present depth before moving on to vertices at the next depth level. Depth-first search explores as far as possible along each branch before backtracking. Dijkstra\'s algorithm finds the shortest paths from a source vertex to all other vertices in a weighted graph with non-negative edge weights.' },
    ],
  },
  {
    id: 'u4', unit: 4, title: 'Dynamic Programming', completed: false, topics: ['Memoization', 'Tabulation', 'Classic DP Problems', 'Complexity Analysis'],
    materials: [],
  },
];

const ASSIGNMENTS: Assignment[] = [
  { id: 'a1', title: 'Binary Search Tree Implementation', description: 'Implement a BST with insert, delete, and search operations in Python. Include unit tests.', dueDate: '2026-09-10', maxMarks: 100, submitted: true, grade: 88, weight: 15 },
  { id: 'a2', title: 'Heap Sort Analysis', description: 'Implement heap sort and write a comparative analysis against merge sort with charts.', dueDate: '2026-09-18', maxMarks: 100, submitted: false, weight: 20 },
  { id: 'a3', title: 'Graph Traversal Report', description: 'Implement BFS and DFS on the provided campus network graph. Compute shortest path.', dueDate: '2026-09-25', maxMarks: 100, submitted: false, weight: 20 },
];

const DISCUSSIONS: Discussion[] = [
  { id: 'd1', author: 'Zara Ibrahim', avatar: 'ZI', message: 'Can someone explain why AVL rotations are needed? The lecture notes mention double rotations but I\'m not clear on when to apply them.', time: '2h ago', replies: 3 },
  { id: 'd2', author: 'Kwame Adjei', avatar: 'KA', message: 'For Assignment 1 — are we expected to handle duplicate keys in the BST, or can we assume all inputs are unique?', time: '5h ago', replies: 1 },
  { id: 'd3', author: 'Felix Boateng', avatar: 'FB', message: 'The Unit 3 materials are really dense. I found this MIT OpenCourseWare video helpful for Graph BFS: highly recommend watching before the lecture.', time: '1d ago', replies: 5 },
];

const GRADE_WEIGHTS = [
  { label: 'Assignments', weight: 30 },
  { label: 'Midterm', weight: 30 },
  { label: 'Final Exam', weight: 40 },
];

const GRADE_ENTRIES = [
  { student: 'Zara Ibrahim',  initials: 'ZI', color: '#6366F1', assignments: 88, midterm: 76, final: null },
  { student: 'Kwame Adjei',   initials: 'KA', color: '#10B981', assignments: 92, midterm: 88, final: null },
  { student: 'Felix Boateng', initials: 'FB', color: '#F59E0B', assignments: 74, midterm: 62, final: null },
  { student: 'Afia Mensah',   initials: 'AM', color: '#F43F5E', assignments: 81, midterm: 79, final: null },
];

function calcGrade(a: number, m: number): { pct: number; letter: string } {
  const pct = Math.round((a * 0.3) + (m * 0.3));
  const letter = pct >= 90 ? 'A' : pct >= 80 ? 'B+' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : 'F';
  return { pct, letter };
}

type Tab = 'catalog' | 'syllabus' | 'assignments' | 'gradebook' | 'discussion';

// ─── Read Aloud Engine ───────────────────────────────────────────────────────
function useReadAloud() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused,  setIsPaused]  = useState(false);
  const [speed,     setSpeed]     = useState(1);
  const [pitch,     setPitch]     = useState(1);
  const [voices,    setVoices]    = useState<SpeechSynthesisVoice[]>([]);
  const [voiceIdx,  setVoiceIdx]  = useState(0);
  const [wordIdx,   setWordIdx]   = useState(-1);
  const [words,     setWords]     = useState<string[]>([]);
  const uttRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', load);
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    const wordList = text.split(/\s+/).filter(Boolean);
    setWords(wordList);
    setWordIdx(-1);

    const utt = new SpeechSynthesisUtterance(text);
    utt.rate  = speed;
    utt.pitch = pitch;
    if (voices[voiceIdx]) utt.voice = voices[voiceIdx];

    let charPos = 0;
    utt.onboundary = (e) => {
      if (e.name === 'word') {
        // Count words up to charIndex
        const spoken = text.slice(0, e.charIndex);
        const wIdx = spoken.split(/\s+/).filter(Boolean).length;
        setWordIdx(wIdx);
        charPos = e.charIndex;
      }
    };

    utt.onend   = () => { setIsPlaying(false); setIsPaused(false); setWordIdx(-1); };
    utt.onerror = () => { setIsPlaying(false); setIsPaused(false); };

    uttRef.current = utt;
    window.speechSynthesis.speak(utt);
    setIsPlaying(true);
    setIsPaused(false);
    // suppress unused warning
    void charPos;
  }, [speed, pitch, voices, voiceIdx]);

  const pause = () => { window.speechSynthesis.pause(); setIsPaused(true); setIsPlaying(false); };
  const resume = () => { window.speechSynthesis.resume(); setIsPlaying(true); setIsPaused(false); };
  const stop  = () => { window.speechSynthesis.cancel(); setIsPlaying(false); setIsPaused(false); setWordIdx(-1); };

  return { isPlaying, isPaused, speed, setSpeed, pitch, setPitch, voices, voiceIdx, setVoiceIdx, words, wordIdx, speak, pause, resume, stop };
}

// ─── Read Aloud Modal ────────────────────────────────────────────────────────
function ReadAloudModal({ material, onClose }: { material: CourseMaterial; onClose: () => void }) {
  const ra = useReadAloud();
  const wordList = material.content.split(/\s+/).filter(Boolean);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal course-reader-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 760, width: '95vw' }}>
        {/* Header */}
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <Volume2 size={16} style={{ color: 'var(--indigo-400)' }} />
            <span style={{ fontWeight: 700, fontSize: 14 }}>{material.name}</span>
          </div>
          <button className="btn-icon" onClick={onClose} id="reader-close">✕</button>
        </div>

        {/* Controls toolbar */}
        <div className="reader-toolbar">
          <div className="reader-controls">
            {!ra.isPlaying && !ra.isPaused && (
              <button className="btn btn-primary btn-sm" id="btn-read-play" onClick={() => ra.speak(material.content)}>
                <Play size={13} /> Read Aloud
              </button>
            )}
            {ra.isPlaying && (
              <button className="btn btn-secondary btn-sm" id="btn-read-pause" onClick={ra.pause}>
                <Pause size={13} /> Pause
              </button>
            )}
            {ra.isPaused && (
              <button className="btn btn-secondary btn-sm" id="btn-read-resume" onClick={ra.resume}>
                <Play size={13} /> Resume
              </button>
            )}
            {(ra.isPlaying || ra.isPaused) && (
              <button className="btn btn-ghost btn-sm" id="btn-read-stop" onClick={ra.stop}>
                <Square size={13} /> Stop
              </button>
            )}
          </div>

          <div className="reader-settings">
            {/* Speed */}
            <div className="reader-slider-group">
              <SlidersHorizontal size={12} style={{ color: 'var(--text-muted)' }} />
              <span className="reader-slider-label">Speed {ra.speed.toFixed(1)}×</span>
              <input
                type="range" min="0.5" max="2" step="0.1"
                value={ra.speed}
                onChange={e => ra.setSpeed(Number(e.target.value))}
                className="reader-range"
                id="slider-speed"
              />
            </div>

            {/* Pitch */}
            <div className="reader-slider-group">
              <Mic size={12} style={{ color: 'var(--text-muted)' }} />
              <span className="reader-slider-label">Pitch {ra.pitch.toFixed(1)}</span>
              <input
                type="range" min="0.5" max="2" step="0.1"
                value={ra.pitch}
                onChange={e => ra.setPitch(Number(e.target.value))}
                className="reader-range"
                id="slider-pitch"
              />
            </div>

            {/* Voice selector */}
            {ra.voices.length > 0 && (
              <select
                className="form-select"
                style={{ fontSize: 12, padding: '4px 8px', height: 30 }}
                value={ra.voiceIdx}
                onChange={e => ra.setVoiceIdx(Number(e.target.value))}
                id="select-voice"
              >
                {ra.voices.map((v, i) => (
                  <option key={i} value={i}>{v.name} ({v.lang})</option>
                ))}
              </select>
            )}

            <button className="btn btn-ghost btn-sm" title="Restart" onClick={() => { ra.stop(); ra.speak(material.content); }} id="btn-read-restart">
              <RotateCcw size={13} />
            </button>
          </div>
        </div>

        {/* Text display with word highlighting */}
        <div className="reader-body">
          {wordList.map((word, i) => (
            <span
              key={i}
              className={`reader-word ${i === ra.wordIdx ? 'reader-word--active' : i < ra.wordIdx ? 'reader-word--read' : ''}`}
            >
              {word}{' '}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Courses() {
  const [tab, setTab]           = useState<Tab>('catalog');
  const [search, setSearch]     = useState('');
  const [selectedCourse]        = useState(courses[0]);
  const [openUnits, setOpenUnits] = useState<Record<string, boolean>>({ u1: true });
  const [reader, setReader]     = useState<CourseMaterial | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [progress, setProgress] = useState<Record<string, number>>(
    Object.fromEntries(SYLLABUS.flatMap(u => u.materials.map(m => [m.id, m.progress])))
  );

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.department.toLowerCase().includes(search.toLowerCase())
  );

  const active        = courses.filter(c => c.status === 'active').length;
  const upcoming      = courses.filter(c => c.status === 'upcoming').length;
  const totalEnrolled = courses.reduce((s, c) => s + c.enrolledCount, 0);

  const toggleUnit = (id: string) => setOpenUnits(prev => ({ ...prev, [id]: !prev[id] }));

  const markProgress = (matId: string, pct: number) => {
    setProgress(prev => ({ ...prev, [matId]: pct }));
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'catalog',    label: 'Course Catalog',  icon: <BookOpen size={14} /> },
    { id: 'syllabus',   label: 'Syllabus',         icon: <Layers size={14} /> },
    { id: 'assignments',label: 'Assignments',      icon: <ClipboardList size={14} /> },
    { id: 'gradebook',  label: 'Gradebook',        icon: <BarChart2 size={14} /> },
    { id: 'discussion', label: 'Discussion',       icon: <MessageSquare size={14} /> },
  ];

  return (
    <main className="page">
      {/* Read Aloud Modal */}
      {reader && <ReadAloudModal material={reader} onClose={() => setReader(null)} />}

      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Course & Curriculum</h1>
          <p className="page-subtitle">Manage courses, syllabi, materials, assignments and grades.</p>
        </div>
        <button className="btn btn-primary" id="btn-add-course"><PlusCircle size={15} /> Add Course</button>
      </div>

      {/* Stats */}
      <div className="grid-4">
        <div className="stat-card"><div className="stat-card-top"><div><div className="stat-label">Total Courses</div><div className="stat-value">{courses.length}</div></div><div className="stat-icon" style={{ background:'var(--indigo-glow)' }}><BookOpen size={20} style={{ color:'var(--indigo-400)' }} /></div></div></div>
        <div className="stat-card"><div className="stat-card-top"><div><div className="stat-label">Active</div><div className="stat-value">{active}</div></div><div className="stat-icon" style={{ background:'var(--emerald-glow)' }}><CheckCircle2 size={20} style={{ color:'var(--emerald-400)' }} /></div></div></div>
        <div className="stat-card"><div className="stat-card-top"><div><div className="stat-label">Upcoming</div><div className="stat-value">{upcoming}</div></div><div className="stat-icon" style={{ background:'var(--amber-glow)' }}><Clock size={20} style={{ color:'var(--amber-400)' }} /></div></div></div>
        <div className="stat-card"><div className="stat-card-top"><div><div className="stat-label">Total Enrolled</div><div className="stat-value">{totalEnrolled}</div></div><div className="stat-icon" style={{ background:'var(--sky-glow)' }}><Users size={20} style={{ color:'var(--sky-400)' }} /></div></div></div>
      </div>

      {/* Tab strip */}
      <div className="course-tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`course-tab ${tab === t.id ? 'course-tab--active' : ''}`}
            onClick={() => setTab(t.id)}
            id={`tab-${t.id}`}
          >
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* ── CATALOG ─────────────────────────────────────────────────────── */}
      {tab === 'catalog' && (
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
                  <th>Code</th><th>Title</th><th>Department</th><th>Credits</th><th>Lecturer</th><th>Enrolled</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id}>
                    <td><span className="badge badge-indigo">{c.code}</span></td>
                    <td><strong>{c.title}</strong></td>
                    <td>{c.department}</td>
                    <td><div className="flex items-center gap-1"><GraduationCap size={12} style={{ color:'var(--text-muted)' }}/>{c.credits} cr</div></td>
                    <td>{c.lecturer}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="progress-bar" style={{ width: 60 }}>
                          <div className="progress-fill" style={{ width:`${Math.min((c.enrolledCount/150)*100,100)}%`, background:'var(--indigo-500)' }} />
                        </div>
                        <span className="text-sm">{c.enrolledCount}</span>
                      </div>
                    </td>
                    <td><span className={`badge ${c.status==='active'?'badge-emerald':c.status==='upcoming'?'badge-amber':'badge-muted'}`}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── SYLLABUS ─────────────────────────────────────────────────────── */}
      {tab === 'syllabus' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title"><Layers size={15} />{selectedCourse.code} — {selectedCourse.title}</span>
            <span className="badge badge-indigo">{selectedCourse.credits} credits</span>
          </div>
          <div className="card-body" style={{ display:'flex', flexDirection:'column', gap: 8 }}>
            {SYLLABUS.map(unit => (
              <div key={unit.id} className="syllabus-unit">
                <button className="syllabus-unit-header" onClick={() => toggleUnit(unit.id)} id={`unit-toggle-${unit.id}`}>
                  <div className="flex items-center gap-10">
                    <div className={`syllabus-unit-num ${unit.completed ? 'syllabus-unit-num--done' : ''}`}>
                      {unit.completed ? <CheckSquare size={14} /> : unit.unit}
                    </div>
                    <div style={{ textAlign:'left' }}>
                      <div style={{ fontWeight:700, fontSize:13, color:'var(--text-primary)' }}>Unit {unit.unit} — {unit.title}</div>
                      <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:2 }}>{unit.topics.length} topics · {unit.materials.length} materials</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    {unit.completed && <span className="badge badge-emerald"><CheckCircle2 size={9} />Complete</span>}
                    {openUnits[unit.id] ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                  </div>
                </button>

                {openUnits[unit.id] && (
                  <div className="syllabus-unit-body">
                    {/* Topics */}
                    <div className="syllabus-topics">
                      <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', color:'var(--text-muted)', marginBottom:6 }}>Topics</div>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                        {unit.topics.map((topic, i) => (
                          <span key={i} className="badge badge-muted" style={{ fontSize:11 }}>{topic}</span>
                        ))}
                      </div>
                    </div>

                    {/* Materials */}
                    {unit.materials.length > 0 && (
                      <div className="syllabus-materials">
                        <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', color:'var(--text-muted)', marginBottom:8 }}>Course Materials</div>
                        {unit.materials.map(mat => (
                          <div key={mat.id} className="material-row">
                            <FileText size={14} style={{ color:'var(--indigo-400)', flexShrink:0 }} />
                            <div style={{ flex:1, minWidth:0 }}>
                              <div style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)' }}>{mat.name}</div>
                              <div style={{ fontSize:11, color:'var(--text-muted)', marginBottom:6 }}>{mat.type.toUpperCase()} · {mat.size}</div>
                              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                                <div className="progress-bar" style={{ flex:1 }}>
                                  <div className="progress-fill" style={{ width:`${progress[mat.id]}%`, background:'var(--emerald-500)' }} />
                                </div>
                                <span style={{ fontSize:11, color:'var(--text-muted)', minWidth:32 }}>{progress[mat.id]}%</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                className="btn btn-primary btn-sm"
                                id={`btn-read-${mat.id}`}
                                onClick={() => setReader(mat)}
                              >
                                <Volume2 size={12} /> Read Aloud
                              </button>
                              <button
                                className="btn btn-secondary btn-sm"
                                id={`btn-progress-${mat.id}`}
                                onClick={() => markProgress(mat.id, Math.min(progress[mat.id] + 25, 100))}
                              >
                                <BookMarked size={12} /> +25%
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {unit.materials.length === 0 && (
                      <div style={{ padding:'12px 0', fontSize:13, color:'var(--text-muted)', display:'flex', gap:8, alignItems:'center' }}>
                        <Upload size={14} />
                        No materials uploaded yet.
                        <button className="btn btn-secondary btn-sm" id={`btn-upload-${unit.id}`}><Upload size={12} /> Upload</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ASSIGNMENTS ─────────────────────────────────────────────────── */}
      {tab === 'assignments' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title"><ClipboardList size={15} />Assignment Engine</span>
            <button className="btn btn-primary btn-sm" id="btn-create-assignment"><PlusCircle size={13} />Create Assignment</button>
          </div>
          <div className="card-body" style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {ASSIGNMENTS.map(a => {
              const isOverdue = !a.submitted && new Date(a.dueDate) < new Date();
              return (
                <div key={a.id} className={`assignment-card ${a.submitted ? 'assignment-card--submitted' : isOverdue ? 'assignment-card--overdue' : ''}`}>
                  <div className="assignment-card-header">
                    <div>
                      <div style={{ fontWeight:700, fontSize:14, color:'var(--text-primary)', marginBottom:4 }}>{a.title}</div>
                      <div style={{ fontSize:13, color:'var(--text-secondary)', lineHeight:1.5 }}>{a.description}</div>
                    </div>
                    <div style={{ textAlign:'right', flexShrink:0 }}>
                      {a.submitted && a.grade !== undefined ? (
                        <div>
                          <div style={{ fontSize:28, fontWeight:800, color:'var(--emerald-400)', letterSpacing:'-0.04em', lineHeight:1 }}>{a.grade}</div>
                          <div style={{ fontSize:11, color:'var(--text-muted)' }}>/{a.maxMarks}</div>
                        </div>
                      ) : (
                        <div style={{ fontSize:12, color:'var(--text-muted)' }}>{a.maxMarks} marks</div>
                      )}
                    </div>
                  </div>
                  <div className="assignment-card-footer">
                    <div className="flex items-center gap-8">
                      <span style={{ fontSize:11, color:'var(--text-muted)', display:'flex', alignItems:'center', gap:4 }}>
                        <Clock size={11} />Due {new Date(a.dueDate).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}
                      </span>
                      <span style={{ fontSize:11, color:'var(--text-muted)' }}>Weight: {a.weight}%</span>
                    </div>
                    <div className="flex gap-2">
                      {a.submitted
                        ? <span className="badge badge-emerald"><CheckCircle2 size={10} />Submitted</span>
                        : isOverdue
                          ? <span className="badge badge-rose"><AlertCircle size={10} />Overdue</span>
                          : <button className="btn btn-primary btn-sm" id={`btn-submit-${a.id}`}><Upload size={12} />Submit</button>
                      }
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── GRADEBOOK ───────────────────────────────────────────────────── */}
      {tab === 'gradebook' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title"><BarChart2 size={15} />Digital Gradebook</span>
            <div className="flex gap-2">
              {GRADE_WEIGHTS.map(g => (
                <span key={g.label} className="badge badge-muted" style={{ fontSize:11 }}>{g.label} {g.weight}%</span>
              ))}
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Assignments <span style={{fontSize:10,opacity:.6}}>30%</span></th>
                  <th>Midterm <span style={{fontSize:10,opacity:.6}}>30%</span></th>
                  <th>Final Exam <span style={{fontSize:10,opacity:.6}}>40%</span></th>
                  <th>Cumulative %</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {GRADE_ENTRIES.map((g, i) => {
                  const { pct, letter } = calcGrade(g.assignments, g.midterm);
                  const gradeColor = letter === 'A' ? 'var(--emerald-400)' : letter.startsWith('B') ? 'var(--sky-400)' : letter === 'C' ? 'var(--amber-400)' : 'var(--rose-400)';
                  return (
                    <tr key={i}>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar avatar-sm" style={{ background:g.color, color:'#fff' }}>{g.initials}</div>
                          <strong>{g.student}</strong>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="progress-bar" style={{ width:48 }}>
                            <div className="progress-fill" style={{ width:`${g.assignments}%`, background:'var(--indigo-500)' }} />
                          </div>
                          <span>{g.assignments}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="progress-bar" style={{ width:48 }}>
                            <div className="progress-fill" style={{ width:`${g.midterm}%`, background:'var(--sky-500)' }} />
                          </div>
                          <span>{g.midterm}</span>
                        </div>
                      </td>
                      <td><span style={{ color:'var(--text-disabled)' }}>—</span></td>
                      <td>
                        <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                          <div className="progress-bar" style={{ flex:1 }}>
                            <div className="progress-fill" style={{ width:`${pct}%`, background:gradeColor }} />
                          </div>
                          <span style={{ color:gradeColor, fontWeight:700, minWidth:28 }}>{pct}%</span>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize:20, fontWeight:800, color:gradeColor, fontFamily:'var(--font-display)', letterSpacing:'-0.04em' }}>{letter}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <span className="text-muted">Showing {GRADE_ENTRIES.length} students · Final exam marks pending</span>
            <span style={{ display:'flex', alignItems:'center', gap:4, fontSize:12, color:'var(--amber-400)' }}>
              <AlertCircle size={12} />Cumulative excludes final exam (not yet administered)
            </span>
          </div>
        </div>
      )}

      {/* ── DISCUSSION ──────────────────────────────────────────────────── */}
      {tab === 'discussion' && (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {/* Post a question */}
          <div className="card">
            <div className="card-header"><span className="card-title"><MessageSquare size={15} />Add Question or Discussion</span></div>
            <div className="card-body" style={{ display:'flex', gap:12 }}>
              <div className="avatar avatar-md" style={{ background:'#6366F1', color:'#fff', flexShrink:0 }}>ZI</div>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:8 }}>
                <textarea
                  className="form-input"
                  rows={3}
                  placeholder="Ask a question or start a discussion about this course…"
                  value={newQuestion}
                  onChange={e => setNewQuestion(e.target.value)}
                  id="input-new-question"
                  style={{ resize:'vertical' }}
                />
                <div className="flex gap-2" style={{ justifyContent:'flex-end' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => setNewQuestion('')} id="btn-cancel-question">Cancel</button>
                  <button className="btn btn-primary btn-sm" disabled={!newQuestion.trim()} id="btn-post-question">
                    <MessageSquare size={12} />Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Discussion threads */}
          {DISCUSSIONS.map(d => (
            <div key={d.id} className="card">
              <div className="card-body">
                <div style={{ display:'flex', gap:12 }}>
                  <div className="avatar avatar-md" style={{ background:'var(--indigo-500)', color:'#fff', flexShrink:0 }}>{d.avatar}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                      <span style={{ fontWeight:700, fontSize:13, color:'var(--text-primary)' }}>{d.author}</span>
                      <span style={{ fontSize:11, color:'var(--text-muted)' }}>{d.time}</span>
                    </div>
                    <p style={{ fontSize:14, color:'var(--text-secondary)', lineHeight:1.6, margin:0 }}>{d.message}</p>
                    <div style={{ marginTop:10, display:'flex', gap:8 }}>
                      <button className="btn btn-ghost btn-sm" id={`btn-reply-${d.id}`}>
                        <MessageSquare size={12} />Reply ({d.replies})
                      </button>
                      <button className="btn btn-ghost btn-sm" id={`btn-like-${d.id}`}>
                        <Star size={12} />Like
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
