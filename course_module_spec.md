# Product Specification: School ERP Course & Academic Module

## 1. System Overview
A robust, accessible module within a School ERP to manage courses, syllabi, timetables, and assessments. The module includes an integrated "Read Aloud" document player to assist younger learners, visually impaired students, or auditory learners by converting uploaded course files into speech directly in the web browser.

## 2. Target Audience
* **School Administrators:** Configure course catalogs, classes, and assign teachers.
* **Teachers:** Manage lesson plans, upload course materials, create assignments, and log grades.
* **Students:** View schedules, submit assignments, view grades, and listen to course materials. Add questions and discussion

---

## 3. Core Features & Functional Requirements

### 3.1 Course & Curriculum Management
* **Course Catalog:** Admin interface to create courses with unique IDs, credit weights, descriptions, and grade-level mapping.
* **Syllabus Builder:** Teacher interface to break down a course into modular units, topics, and weekly milestones.
* **Timetable Scheduler:** Calendar grid showing weekly class slots, automatically checking for room and teacher conflicts.

### 3.2 Assignment & Gradebook System
* **Assignment Engine:** Teachers can create tasks with titles, descriptions, due dates, and max marks. Supports student file uploads.
* **Digital Gradebook:** Visual spreadsheet grid for teachers to input marks per assessment. Automatically calculates cumulative percentages and final letter grades based on custom weights (e.g., Homework 30%, Exams 70%).

### 3.3 Learning Material Repository with Browser-Based "Read Aloud"
* **File Upload Vault:** Teachers can upload course resources (PDF, DOCX, TXT) mapped to specific course modules.
* **Integrated Document Reader:** 
  * A modal or split-screen preview window to display file content inside the app.
  * Extracted text is sent to the Web Speech API (`SpeechSynthesis`) for browser-native playback.
* **Audio Controls:**
  * **Playback buttons:** Play, Pause, Stop.
  * **Voice Settings:** Speed slider (0.5x to 2x), pitch slider, and a dropdown menu to select available browser system voices.
  * **Visual Sync:** Optional text highlighting of the paragraph or sentence currently being spoken.

---

## 4. Technical Architecture & Constraints

### 4.1 Frontend UI/UX
* **Components:** 
  * Filterable dashboards for Courses.
  * Calendar components for Timetables.
  * Audio overlay bar for the Document Reader.
  * mark progress of material studied

### 4.2 Backend & Data Storage
* **API Structure:** RESTful endpoints or GraphQL to handle CRUD operations for courses, schedules, assignments, and grades.
* **File Handling:** Uploaded documents are saved to secure object storage (e.g., AWS S3, Supabase Storage). 
* **Text Extraction Layer:** Backend utility (like `pdf-parse` for Node or `PyPDF2` for Python) to parse uploaded file text and serve it via API to the frontend reader component.

### 4.3 Key Browser APIs
* **Web Speech API:** Must utilize `window.speechSynthesis` and `SpeechSynthesisUtterance` for lightweight, zero-cost, serverless text-to-speech execution.

---

## 5. UI Layout Wireframe Guidance for AI
* **Sidebar:** Navigation links for "My Courses", "Timetable", "Assignments", and "Gradebook".
* **Main Panel:** Clean, tabbed view dividing "Course Info", "Syllabus Materials", and "Assessments".
* **Reader Panel:** Clicking a file opens a distraction-free overlay. The top toolbar hosts standard audio player controls (⏸ ◀ ⏹) alongside speed/voice selectors, with the text displayed neatly below. Hover across words as they are read aloud in real time
