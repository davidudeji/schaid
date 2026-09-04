// ============================================================
// SCHAID ERP — Core TypeScript Interfaces
// ============================================================

export type UserRole = 'admin' | 'lecturer' | 'student' | 'parent' | 'class_rep';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  avatarInitials: string;
  avatarColor: string;
  status: 'active' | 'inactive' | 'suspended';
  joinedAt: string;
}

export interface Student {
  id: string;
  matricNo: string;
  name: string;
  department: string;
  level: string;
  cgpa: number;
  status: 'active' | 'graduated' | 'deferred' | 'suspended';
  avatarInitials: string;
  avatarColor: string;
  balance: number;
}

export interface AdmissionApplication {
  id: string;
  applicantName: string;
  courseApplied: string;
  submittedAt: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  documents: number;
  email: string;
}

export interface StaffMember {
  id: string;
  name: string;
  department: string;
  contractType: 'full_time' | 'part_time' | 'adjunct';
  salary: number;
  status: 'active' | 'on_leave' | 'terminated';
  courses: string[];
  avatarInitials: string;
  avatarColor: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'equipment' | 'furniture' | 'lab_kit' | 'book' | 'electronics';
  quantity: number;
  condition: 'good' | 'fair' | 'poor';
  location: string;
  lastChecked: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  department: string;
  credits: number;
  lecturer: string;
  enrolledCount: number;
  semester: string;
  status: 'active' | 'completed' | 'upcoming';
}

export interface TimetableEntry {
  id: string;
  courseCode: string;
  courseTitle: string;
  lecturer: string;
  day: string;
  startTime: string;
  endTime: string;
  venue: string;
  type: 'lecture' | 'lab' | 'exam' | 'seminar';
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  matricNo: string;
  status: 'present' | 'absent' | 'late';
  scannedAt?: string;
  avatarInitials: string;
  avatarColor: string;
}

export interface CourseGrade {
  studentId: string;
  studentName: string;
  matricNo: string;
  ca1: number;
  ca2: number;
  midterm: number;
  exam: number;
  total: number;
  grade: string;
  gpa: number;
}

export interface FeeInvoice {
  id: string;
  studentName: string;
  matricNo: string;
  semester: string;
  items: FeeLineItem[];
  totalAmount: number;
  paidAmount: number;
  dueDate: string;
  status: 'paid' | 'partial' | 'overdue' | 'pending';
}

export interface FeeLineItem {
  description: string;
  amount: number;
}

export interface Transaction {
  id: string;
  studentName: string;
  matricNo: string;
  amount: number;
  gateway: 'stripe' | 'flutterwave' | 'paypal';
  status: 'success' | 'pending' | 'failed';
  date: string;
  reference: string;
}

export interface Expense {
  id: string;
  description: string;
  category: 'utilities' | 'salaries' | 'maintenance' | 'supplies' | 'vendor';
  amount: number;
  date: string;
  approvedBy: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  channel: 'sms' | 'email' | 'push';
  priority: 'urgent' | 'standard' | 'individual';
  sentAt: string;
  recipients: number;
  status: 'sent' | 'scheduled' | 'draft';
}

export interface DashboardStats {
  totalStudents: number;
  totalStaff: number;
  activeCourses: number;
  pendingAdmissions: number;
  totalRevenue: number;
  pendingFees: number;
  attendanceRate: number;
  avgCGPA: number;
}
