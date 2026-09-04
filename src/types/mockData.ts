// ============================================================
// SCHAID ERP — Mock Data
// ============================================================

import type {
  User, Student, AdmissionApplication, StaffMember, InventoryItem,
  Course, TimetableEntry, AttendanceRecord, CourseGrade,
  FeeInvoice, Transaction, Expense, Notification, DashboardStats
} from './index';

export const dashboardStats: DashboardStats = {
  totalStudents: 4218,
  totalStaff: 187,
  activeCourses: 64,
  pendingAdmissions: 38,
  totalRevenue: 2840000,
  pendingFees: 312000,
  attendanceRate: 82,
  avgCGPA: 3.21,
};

const avatarColors = [
  '#6366F1','#8B5CF6','#10B981','#F59E0B','#F43F5E','#0EA5E9','#EC4899','#14B8A6',
];
const c = (i: number) => avatarColors[i % avatarColors.length];

export const users: User[] = [
  { id:'u1', name:'Dr. Amara Osei', email:'a.osei@schaid.edu', role:'admin', department:'Administration', avatarInitials:'AO', avatarColor:c(0), status:'active', joinedAt:'2021-03-10' },
  { id:'u2', name:'Prof. Kweku Mensah', email:'k.mensah@schaid.edu', role:'lecturer', department:'Computer Science', avatarInitials:'KM', avatarColor:c(1), status:'active', joinedAt:'2019-08-15' },
  { id:'u3', name:'Zara Ibrahim', email:'z.ibrahim@schaid.edu', role:'student', department:'Engineering', avatarInitials:'ZI', avatarColor:c(2), status:'active', joinedAt:'2023-09-01' },
  { id:'u4', name:'Felix Boateng', email:'f.boateng@schaid.edu', role:'student', department:'Business', avatarInitials:'FB', avatarColor:c(3), status:'active', joinedAt:'2022-09-01' },
  { id:'u5', name:'Nana Akua', email:'n.akua@schaid.edu', role:'parent', department:undefined, avatarInitials:'NA', avatarColor:c(4), status:'active', joinedAt:'2023-09-01' },
  { id:'u6', name:'Efua Darko', email:'e.darko@schaid.edu', role:'class_rep', department:'Law', avatarInitials:'ED', avatarColor:c(5), status:'active', joinedAt:'2022-09-01' },
  { id:'u7', name:'Kofi Asante', email:'k.asante@schaid.edu', role:'lecturer', department:'Physics', avatarInitials:'KA', avatarColor:c(6), status:'inactive', joinedAt:'2020-01-10' },
  { id:'u8', name:'Abena Frimpong', email:'a.frimpong@schaid.edu', role:'student', department:'Medicine', avatarInitials:'AF', avatarColor:c(7), status:'suspended', joinedAt:'2021-09-01' },
];

export const students: Student[] = [
  { id:'s1', matricNo:'SCH/2021/0041', name:'Zara Ibrahim', department:'Engineering', level:'300', cgpa:3.75, status:'active', avatarInitials:'ZI', avatarColor:c(2), balance:0 },
  { id:'s2', matricNo:'SCH/2020/0128', name:'Felix Boateng', department:'Business', level:'400', cgpa:3.12, status:'active', avatarInitials:'FB', avatarColor:c(3), balance:1200 },
  { id:'s3', matricNo:'SCH/2022/0067', name:'Abena Frimpong', department:'Medicine', level:'200', cgpa:2.89, status:'active', avatarInitials:'AF', avatarColor:c(7), balance:3400 },
  { id:'s4', matricNo:'SCH/2021/0093', name:'Kwame Adjei', department:'Computer Science', level:'300', cgpa:3.95, status:'active', avatarInitials:'KA', avatarColor:c(0), balance:0 },
  { id:'s5', matricNo:'SCH/2023/0011', name:'Afia Mensah', department:'Law', level:'100', cgpa:3.50, status:'active', avatarInitials:'AM', avatarColor:c(4), balance:800 },
  { id:'s6', matricNo:'SCH/2019/0204', name:'Yaw Owusu', department:'Economics', level:'500', cgpa:3.01, status:'graduated', avatarInitials:'YO', avatarColor:c(5), balance:0 },
  { id:'s7', matricNo:'SCH/2022/0155', name:'Esi Quartey', department:'Architecture', level:'200', cgpa:2.67, status:'deferred', avatarInitials:'EQ', avatarColor:c(6), balance:2000 },
  { id:'s8', matricNo:'SCH/2021/0078', name:'Nii Kpakpo', department:'Engineering', level:'300', cgpa:3.40, status:'active', avatarInitials:'NK', avatarColor:c(1), balance:600 },
];

export const admissions: AdmissionApplication[] = [
  { id:'app1', applicantName:'Samuel Nkrumah', courseApplied:'BSc Computer Science', submittedAt:'2026-08-20', status:'pending', documents:4, email:'s.nkrumah@gmail.com' },
  { id:'app2', applicantName:'Adwoa Asare', courseApplied:'BSc Engineering', submittedAt:'2026-08-18', status:'under_review', documents:5, email:'adwoa.asare@yahoo.com' },
  { id:'app3', applicantName:'Bright Opoku', courseApplied:'LLB Law', submittedAt:'2026-08-15', status:'approved', documents:6, email:'bright.opoku@gmail.com' },
  { id:'app4', applicantName:'Maame Serwah', courseApplied:'MBBS Medicine', submittedAt:'2026-08-12', status:'rejected', documents:3, email:'maame.s@hotmail.com' },
  { id:'app5', applicantName:'Ato Mensah', courseApplied:'BSc Business Admin', submittedAt:'2026-08-10', status:'approved', documents:5, email:'ato.mensah@gmail.com' },
  { id:'app6', applicantName:'Ewurama Acheampong', courseApplied:'BA Economics', submittedAt:'2026-08-08', status:'pending', documents:4, email:'e.acheampong@gmail.com' },
];

export const staff: StaffMember[] = [
  { id:'st1', name:'Prof. Kweku Mensah', department:'Computer Science', contractType:'full_time', salary:8500, status:'active', courses:['CS301','CS402'], avatarInitials:'KM', avatarColor:c(1) },
  { id:'st2', name:'Dr. Ama Boateng', department:'Engineering', contractType:'full_time', salary:9200, status:'active', courses:['ENG201','ENG305'], avatarInitials:'AB', avatarColor:c(2) },
  { id:'st3', name:'Mr. Yaw Acheampong', department:'Business', contractType:'part_time', salary:3800, status:'on_leave', courses:['BUS101'], avatarInitials:'YA', avatarColor:c(3) },
  { id:'st4', name:'Dr. Efua Larbi', department:'Law', contractType:'full_time', salary:8900, status:'active', courses:['LAW201','LAW301'], avatarInitials:'EL', avatarColor:c(4) },
  { id:'st5', name:'Prof. Kojo Owusu', department:'Physics', contractType:'adjunct', salary:4200, status:'active', courses:['PHY101'], avatarInitials:'KO', avatarColor:c(5) },
  { id:'st6', name:'Ms. Akua Darko', department:'Mathematics', contractType:'full_time', salary:7600, status:'active', courses:['MTH101','MTH201'], avatarInitials:'AD', avatarColor:c(6) },
];

export const inventory: InventoryItem[] = [
  { id:'inv1', name:'Dell Projector XGA', category:'electronics', quantity:12, condition:'good', location:'Lecture Hall A', lastChecked:'2026-09-01' },
  { id:'inv2', name:'Lab Microscope Kit', category:'lab_kit', quantity:30, condition:'good', location:'Biology Lab 2', lastChecked:'2026-08-28' },
  { id:'inv3', name:'Desktop Computer Sets', category:'electronics', quantity:60, condition:'fair', location:'IT Lab', lastChecked:'2026-07-15' },
  { id:'inv4', name:'Office Chair (Executive)', category:'furniture', quantity:45, condition:'good', location:'Staff Block B', lastChecked:'2026-08-10' },
  { id:'inv5', name:'Introduction to Algorithms', category:'book', quantity:200, condition:'good', location:'Main Library', lastChecked:'2026-08-30' },
  { id:'inv6', name:'Oscilloscope', category:'lab_kit', quantity:8, condition:'poor', location:'Physics Lab', lastChecked:'2026-06-20' },
];

export const courses: Course[] = [
  { id:'c1', code:'CS301', title:'Data Structures & Algorithms', department:'Computer Science', credits:3, lecturer:'Prof. Kweku Mensah', enrolledCount:84, semester:'2026/2027 Sem 1', status:'active' },
  { id:'c2', code:'CS402', title:'Artificial Intelligence', department:'Computer Science', credits:4, lecturer:'Prof. Kweku Mensah', enrolledCount:62, semester:'2026/2027 Sem 1', status:'active' },
  { id:'c3', code:'ENG201', title:'Mechanics of Materials', department:'Engineering', credits:3, lecturer:'Dr. Ama Boateng', enrolledCount:78, semester:'2026/2027 Sem 1', status:'active' },
  { id:'c4', code:'BUS101', title:'Principles of Management', department:'Business', credits:2, lecturer:'Mr. Yaw Acheampong', enrolledCount:120, semester:'2026/2027 Sem 1', status:'active' },
  { id:'c5', code:'LAW201', title:'Constitutional Law', department:'Law', credits:3, lecturer:'Dr. Efua Larbi', enrolledCount:55, semester:'2026/2027 Sem 1', status:'active' },
  { id:'c6', code:'MTH101', title:'Calculus I', department:'Mathematics', credits:3, lecturer:'Ms. Akua Darko', enrolledCount:150, semester:'2026/2027 Sem 1', status:'active' },
  { id:'c7', code:'PHY101', title:'Introduction to Physics', department:'Physics', credits:3, lecturer:'Prof. Kojo Owusu', enrolledCount:140, semester:'2026/2027 Sem 1', status:'active' },
  { id:'c8', code:'CS501', title:'Machine Learning', department:'Computer Science', credits:4, lecturer:'TBA', enrolledCount:0, semester:'2026/2027 Sem 2', status:'upcoming' },
];

export const timetable: TimetableEntry[] = [
  { id:'tt1', courseCode:'CS301', courseTitle:'Data Structures', lecturer:'Prof. Mensah', day:'Monday', startTime:'08:00', endTime:'10:00', venue:'LH-A1', type:'lecture' },
  { id:'tt2', courseCode:'MTH101', courseTitle:'Calculus I', lecturer:'Ms. Darko', day:'Monday', startTime:'10:00', endTime:'12:00', venue:'LH-B2', type:'lecture' },
  { id:'tt3', courseCode:'PHY101', courseTitle:'Intro to Physics', lecturer:'Prof. Owusu', day:'Tuesday', startTime:'08:00', endTime:'10:00', venue:'LH-A1', type:'lecture' },
  { id:'tt4', courseCode:'CS402', courseTitle:'AI', lecturer:'Prof. Mensah', day:'Tuesday', startTime:'13:00', endTime:'15:00', venue:'LH-C3', type:'lecture' },
  { id:'tt5', courseCode:'ENG201', courseTitle:'Mechanics', lecturer:'Dr. Boateng', day:'Wednesday', startTime:'09:00', endTime:'11:00', venue:'LH-D4', type:'lecture' },
  { id:'tt6', courseCode:'CS301', courseTitle:'Data Structures Lab', lecturer:'Prof. Mensah', day:'Wednesday', startTime:'13:00', endTime:'15:00', venue:'IT Lab', type:'lab' },
  { id:'tt7', courseCode:'LAW201', courseTitle:'Constitutional Law', lecturer:'Dr. Larbi', day:'Thursday', startTime:'10:00', endTime:'12:00', venue:'LH-B2', type:'lecture' },
  { id:'tt8', courseCode:'BUS101', courseTitle:'Principles of Mgmt', lecturer:'Mr. Acheampong', day:'Friday', startTime:'08:00', endTime:'10:00', venue:'LH-A1', type:'lecture' },
];

export const attendanceRecords: AttendanceRecord[] = [
  { studentId:'s1', studentName:'Zara Ibrahim', matricNo:'SCH/2021/0041', status:'present', scannedAt:'08:05', avatarInitials:'ZI', avatarColor:c(2) },
  { studentId:'s2', studentName:'Felix Boateng', matricNo:'SCH/2020/0128', status:'present', scannedAt:'08:03', avatarInitials:'FB', avatarColor:c(3) },
  { studentId:'s3', studentName:'Abena Frimpong', matricNo:'SCH/2022/0067', status:'absent', avatarInitials:'AF', avatarColor:c(7) },
  { studentId:'s4', studentName:'Kwame Adjei', matricNo:'SCH/2021/0093', status:'present', scannedAt:'08:12', avatarInitials:'KA', avatarColor:c(0) },
  { studentId:'s5', studentName:'Afia Mensah', matricNo:'SCH/2023/0011', status:'late', scannedAt:'08:28', avatarInitials:'AM', avatarColor:c(4) },
  { studentId:'s6', studentName:'Yaw Owusu', matricNo:'SCH/2019/0204', status:'present', scannedAt:'07:58', avatarInitials:'YO', avatarColor:c(5) },
  { studentId:'s7', studentName:'Esi Quartey', matricNo:'SCH/2022/0155', status:'absent', avatarInitials:'EQ', avatarColor:c(6) },
  { studentId:'s8', studentName:'Nii Kpakpo', matricNo:'SCH/2021/0078', status:'present', scannedAt:'08:01', avatarInitials:'NK', avatarColor:c(1) },
];

export const grades: CourseGrade[] = [
  { studentId:'s1', studentName:'Zara Ibrahim', matricNo:'SCH/2021/0041', ca1:18, ca2:19, midterm:28, exam:70, total:87, grade:'A', gpa:4.0 },
  { studentId:'s2', studentName:'Felix Boateng', matricNo:'SCH/2020/0128', ca1:15, ca2:16, midterm:24, exam:58, total:72, grade:'B+', gpa:3.5 },
  { studentId:'s3', studentName:'Abena Frimpong', matricNo:'SCH/2022/0067', ca1:12, ca2:14, midterm:20, exam:50, total:63, grade:'C+', gpa:2.5 },
  { studentId:'s4', studentName:'Kwame Adjei', matricNo:'SCH/2021/0093', ca1:20, ca2:20, midterm:30, exam:75, total:95, grade:'A+', gpa:4.0 },
  { studentId:'s5', studentName:'Afia Mensah', matricNo:'SCH/2023/0011', ca1:17, ca2:18, midterm:26, exam:65, total:80, grade:'A-', gpa:3.7 },
  { studentId:'s6', studentName:'Yaw Owusu', matricNo:'SCH/2019/0204', ca1:14, ca2:15, midterm:22, exam:55, total:69, grade:'B', gpa:3.0 },
];

export const feeInvoices: FeeInvoice[] = [
  { id:'fi1', studentName:'Zara Ibrahim', matricNo:'SCH/2021/0041', semester:'2026/2027 Sem 1', items:[{description:'Tuition',amount:6000},{description:'Lab Fee',amount:500}], totalAmount:6500, paidAmount:6500, dueDate:'2026-10-31', status:'paid' },
  { id:'fi2', studentName:'Felix Boateng', matricNo:'SCH/2020/0128', semester:'2026/2027 Sem 1', items:[{description:'Tuition',amount:6000},{description:'Housing',amount:1200}], totalAmount:7200, paidAmount:6000, dueDate:'2026-10-31', status:'partial' },
  { id:'fi3', studentName:'Abena Frimpong', matricNo:'SCH/2022/0067', semester:'2026/2027 Sem 1', items:[{description:'Tuition',amount:9000},{description:'Lab Fee',amount:800}], totalAmount:9800, paidAmount:6400, dueDate:'2026-10-15', status:'overdue' },
  { id:'fi4', studentName:'Kwame Adjei', matricNo:'SCH/2021/0093', semester:'2026/2027 Sem 1', items:[{description:'Tuition',amount:6000}], totalAmount:6000, paidAmount:6000, dueDate:'2026-10-31', status:'paid' },
  { id:'fi5', studentName:'Afia Mensah', matricNo:'SCH/2023/0011', semester:'2026/2027 Sem 1', items:[{description:'Tuition',amount:5800},{description:'Library',amount:200}], totalAmount:6000, paidAmount:0, dueDate:'2026-11-15', status:'pending' },
];

export const transactions: Transaction[] = [
  { id:'tx1', studentName:'Zara Ibrahim', matricNo:'SCH/2021/0041', amount:6500, gateway:'stripe', status:'success', date:'2026-09-02', reference:'STR-88241A' },
  { id:'tx2', studentName:'Felix Boateng', matricNo:'SCH/2020/0128', amount:6000, gateway:'flutterwave', status:'success', date:'2026-09-01', reference:'FLW-55102B' },
  { id:'tx3', studentName:'Kwame Adjei', matricNo:'SCH/2021/0093', amount:6000, gateway:'paypal', status:'success', date:'2026-08-30', reference:'PP-77893C' },
  { id:'tx4', studentName:'Nii Kpakpo', matricNo:'SCH/2021/0078', amount:600, gateway:'stripe', status:'pending', date:'2026-09-03', reference:'STR-99104D' },
  { id:'tx5', studentName:'Esi Quartey', matricNo:'SCH/2022/0155', amount:2000, gateway:'flutterwave', status:'failed', date:'2026-08-29', reference:'FLW-33205E' },
];

export const expenses: Expense[] = [
  { id:'exp1', description:'Monthly Electricity Bill', category:'utilities', amount:4200, date:'2026-09-01', approvedBy:'Dr. Amara Osei', status:'approved' },
  { id:'exp2', description:'Vendor: Lab Chemical Supplies', category:'vendor', amount:8500, date:'2026-08-28', approvedBy:'Dr. Amara Osei', status:'approved' },
  { id:'exp3', description:'IT Equipment Maintenance', category:'maintenance', amount:2100, date:'2026-08-20', approvedBy:'Mr. Kofi Asante', status:'approved' },
  { id:'exp4', description:'Office Stationery Restock', category:'supplies', amount:650, date:'2026-08-15', approvedBy:'Ms. Akua Darko', status:'pending' },
  { id:'exp5', description:'September Adjunct Salaries', category:'salaries', amount:12600, date:'2026-09-03', approvedBy:'Dr. Amara Osei', status:'pending' },
  { id:'exp6', description:'Internet & Telecoms', category:'utilities', amount:1800, date:'2026-09-01', approvedBy:'Dr. Amara Osei', status:'approved' },
];

export const notifications: Notification[] = [
  { id:'n1', title:'Campus Closure Alert', message:'The campus will be closed on Friday 5th Sep due to maintenance. All lectures will be moved online.', channel:'sms', priority:'urgent', sentAt:'2026-09-03 10:00', recipients:4218, status:'sent' },
  { id:'n2', title:'Semester 1 Fee Reminder', message:'A reminder that tuition fees for Semester 1 are due by 31st October 2026.', channel:'email', priority:'standard', sentAt:'2026-09-01 09:00', recipients:4218, status:'sent' },
  { id:'n3', title:'Overdue Fee Warning', message:'You have an outstanding balance of GHS 3,400. Please clear this immediately to avoid suspension.', channel:'push', priority:'individual', sentAt:'2026-09-02 14:00', recipients:47, status:'sent' },
  { id:'n4', title:'Academic Calendar Update', message:'The new academic calendar for 2026/2027 has been published on the student portal.', channel:'email', priority:'standard', sentAt:'-', recipients:4218, status:'scheduled' },
];

export const revenueByMonth = [
  { month:'Apr', value:210000 },
  { month:'May', value:195000 },
  { month:'Jun', value:230000 },
  { month:'Jul', value:185000 },
  { month:'Aug', value:260000 },
  { month:'Sep', value:318000 },
];

export const expenseByMonth = [
  { month:'Apr', value:140000 },
  { month:'May', value:152000 },
  { month:'Jun', value:168000 },
  { month:'Jul', value:145000 },
  { month:'Aug', value:172000 },
  { month:'Sep', value:188000 },
];
