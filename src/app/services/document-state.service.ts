import { Injectable, signal, computed } from '@angular/core';

export type WidgetId = "studentHeader" | "contactInfo" | "academicDegree" | "gpaChart" | "attendance" | "insurance" | "verification";
export type ExportState = "idle" | "loading" | "success" | "error";
export type Mode = "templates" | "advanced";

export interface Course {
  code: string;
  name: string;
  credits: number;
  grade: string;
  pts: number;
  sem: string;
}

export interface Template {
  id: string;
  name: string;
  tag: string;
  description: string;
  widgets: Set<WidgetId>;
}

export interface AccordionSection {
  id: string;
  label: string;
  icon: string; // Icon identifier for custom icon rendering
  widgets: { id: WidgetId; label: string }[];
}

export interface Signature {
  role: string;
  name: string;
  shortName: string;
}

export interface Student {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarInitials: string;
  avatarStartColor: string;
  avatarEndColor: string;
  faculty: string;
  department: string;
  program: string;
  academicYear: string;
  semester: string;
  level: string;
  enrollmentStatus: string;
  dob: string;
  nationality: string;
  address: string;
  admissionDate: string;
  expectedGraduation: string;
  cumulativeGpa: number;
  gpaClassification: string;
  earnedCredits: number;
  remainingCredits: number;
  totalCredits: number;
  advisor: string;
  scholarshipStatus?: string;
  attendanceAvgRate: number;
  attendanceDaysPresent: number;
  attendanceDaysAbsent: number;
  attendanceDaysExcused: number;
  attendanceData: { month: string; pct: number }[];
  gpaData: { s: string; gpa: number }[];
  courses: Course[];
  behaviorSummary: string;
  insurancePolicyNo: string;
  insuranceProvider: string;
  insuranceCoverage: string;
  insuranceValidThrough: string;
  insuranceBloodType: string;
  insuranceAllergies: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  verificationStatus: string;
  verificationCode: string;
  documentRef: string;
  issueDate: string;
  validDays: number;
  signatures: Signature[];
}

@Injectable({
  providedIn: 'root'
})
export class DocumentStateService {
  // ─── CONSTANTS & DATA ────────────────────────────────────────────────────────

  // ─── CONSTANTS & DATA ────────────────────────────────────────────────────────

  readonly STUDENTS: Student[] = [
    {
      id: "2021-CS-04782",
      fullName: "Ebrahim Ahmed Gabr",
      email: "e.gabr@student.aut.edu.eg",
      phone: "+20 110 234 5678",
      avatarInitials: "EG",
      avatarStartColor: "#2254c7",
      avatarEndColor: "#131f40",
      faculty: "Faculty of Computer Science & Information Technology",
      department: "Computer Science — Information Systems",
      program: "B.Sc. in Computer Science",
      academicYear: "Year 4",
      semester: "Semester 7",
      level: "Senior · Year 4, Semester 7",
      enrollmentStatus: "Active",
      dob: "14 March 2003",
      nationality: "Egyptian",
      address: "15 El-Nozha St., Alexandria",
      admissionDate: "September 2021",
      expectedGraduation: "June 2025",
      cumulativeGpa: 3.62,
      gpaClassification: "Distinction",
      earnedCredits: 112,
      remainingCredits: 20,
      totalCredits: 132,
      advisor: "Dr. Maha El-Sayed",
      scholarshipStatus: "None",
      attendanceAvgRate: 94,
      attendanceDaysPresent: 142,
      attendanceDaysAbsent: 10,
      attendanceDaysExcused: 4,
      attendanceData: [
        { month: "Sep", pct: 96 },
        { month: "Oct", pct: 87 },
        { month: "Nov", pct: 91 },
        { month: "Dec", pct: 100 },
        { month: "Jan", pct: 96 },
        { month: "Feb", pct: 91 },
        { month: "Mar", pct: 96 }
      ],
      gpaData: [
        { s: "S1", gpa: 3.20 },
        { s: "S2", gpa: 3.45 },
        { s: "S3", gpa: 3.30 },
        { s: "S4", gpa: 3.55 },
        { s: "S5", gpa: 3.70 },
        { s: "S6", gpa: 3.62 }
      ],
      courses: [
        { code: "CS-401", name: "Algorithm Design & Analysis", credits: 3, grade: "A", pts: 4.0, sem: "Fall 2024" },
        { code: "CS-402", name: "Database Systems", credits: 3, grade: "A−", pts: 3.7, sem: "Fall 2024" },
        { code: "CS-403", name: "Software Engineering", credits: 3, grade: "B+", pts: 3.3, sem: "Fall 2024" },
        { code: "MATH-301", name: "Linear Algebra & Probability", credits: 3, grade: "A", pts: 4.0, sem: "Fall 2024" },
        { code: "CS-404", name: "Computer Networks", credits: 3, grade: "B+", pts: 3.3, sem: "Spr 2024" },
        { code: "CS-405", name: "Operating Systems", credits: 3, grade: "A−", pts: 3.7, sem: "Spr 2024" },
        { code: "ENG-401", name: "Technical Writing", credits: 2, grade: "A", pts: 4.0, sem: "Spr 2024" },
        { code: "CS-406", name: "Machine Learning Fundamentals", credits: 3, grade: "B", pts: 3.0, sem: "Spr 2024" }
      ],
      behaviorSummary: "Excellent - Academic integrity maintained. Active participant in CS Student Union.",
      insurancePolicyNo: "AUT-INS-2021-04782",
      insuranceProvider: "Egypt National Health Fund",
      insuranceCoverage: "Full Medical & Dental",
      insuranceValidThrough: "August 31, 2025",
      insuranceBloodType: "O Positive",
      insuranceAllergies: "None documented",
      emergencyContactName: "Ahmed Gabr",
      emergencyContactPhone: "+20 100 876 5432",
      emergencyContactRelation: "Father",
      verificationStatus: "Verified",
      verificationCode: "AUT-VER-2024-F8A2C1",
      documentRef: "AUCST/REG/2024/Q4",
      issueDate: "22 June 2024",
      validDays: 90,
      signatures: [
        { role: "University Registrar", name: "Dr. Maha El-Sayed", shortName: "Maha" },
        { role: "Dean of Faculty", name: "Prof. Ahmed Khalil", shortName: "Ahmed" },
        { role: "University Provost", name: "Prof. Ibrahim Hassan", shortName: "Ibrahim" }
      ]
    },
    {
      id: "2022-SE-05891",
      fullName: "Layla Mahmoud Selim",
      email: "l.selim@student.aut.edu.eg",
      phone: "+20 109 876 5432",
      avatarInitials: "LS",
      avatarStartColor: "#ec4899",
      avatarEndColor: "#be185d",
      faculty: "Faculty of Computer Science & Information Technology",
      department: "Software Engineering",
      program: "B.Sc. in Software Engineering",
      academicYear: "Year 3",
      semester: "Semester 5",
      level: "Junior · Year 3, Semester 5",
      enrollmentStatus: "Active",
      dob: "22 July 2004",
      nationality: "Egyptian",
      address: "42 El-Thawra St., Heliopolis, Cairo",
      admissionDate: "September 2022",
      expectedGraduation: "June 2026",
      cumulativeGpa: 3.85,
      gpaClassification: "High Distinction",
      earnedCredits: 84,
      remainingCredits: 48,
      totalCredits: 132,
      advisor: "Prof. Ahmed Khalil",
      scholarshipStatus: "Dean's List 25% Scholarship",
      attendanceAvgRate: 97,
      attendanceDaysPresent: 146,
      attendanceDaysAbsent: 4,
      attendanceDaysExcused: 2,
      attendanceData: [
        { month: "Sep", pct: 98 },
        { month: "Oct", pct: 95 },
        { month: "Nov", pct: 97 },
        { month: "Dec", pct: 99 },
        { month: "Jan", pct: 96 },
        { month: "Feb", pct: 97 },
        { month: "Mar", pct: 98 }
      ],
      gpaData: [
        { s: "S1", gpa: 3.75 },
        { s: "S2", gpa: 3.82 },
        { s: "S3", gpa: 3.90 },
        { s: "S4", gpa: 3.93 }
      ],
      courses: [
        { code: "SE-301", name: "Object-Oriented Software Design", credits: 3, grade: "A", pts: 4.0, sem: "Fall 2024" },
        { code: "SE-302", name: "Software Requirements Eng.", credits: 3, grade: "A", pts: 4.0, sem: "Fall 2024" },
        { code: "CS-305", name: "Data Structures & Algorithms", credits: 4, grade: "A−", pts: 3.7, sem: "Fall 2024" },
        { code: "MATH-204", name: "Discrete Mathematics", credits: 3, grade: "B+", pts: 3.3, sem: "Fall 2024" },
        { code: "SE-201", name: "Software Construction", credits: 3, grade: "A", pts: 4.0, sem: "Spr 2024" },
        { code: "SE-202", name: "Human-Computer Interaction", credits: 3, grade: "A", pts: 4.0, sem: "Spr 2024" },
        { code: "CS-203", name: "Computer Organization", credits: 3, grade: "A−", pts: 3.7, sem: "Spr 2024" },
        { code: "MATH-102", name: "Calculus II", credits: 3, grade: "B", pts: 3.0, sem: "Spr 2024" }
      ],
      behaviorSummary: "Outstanding leadership. Founder of the AUT Women in Tech Initiative.",
      insurancePolicyNo: "AUT-INS-2022-05891",
      insuranceProvider: "Allianz Egypt Medical",
      insuranceCoverage: "Premium Medical Plan",
      insuranceValidThrough: "September 30, 2026",
      insuranceBloodType: "A Positive",
      insuranceAllergies: "Penicillin",
      emergencyContactName: "Mahmoud Selim",
      emergencyContactPhone: "+20 100 555 1234",
      emergencyContactRelation: "Father",
      verificationStatus: "Verified",
      verificationCode: "AUT-VER-2024-A3B9X2",
      documentRef: "AUCST/REG/2024/Q4-SE",
      issueDate: "25 June 2024",
      validDays: 90,
      signatures: [
        { role: "University Registrar", name: "Dr. Maha El-Sayed", shortName: "Maha" },
        { role: "Dean of Faculty", name: "Prof. Ahmed Khalil", shortName: "Ahmed" },
        { role: "University Provost", name: "Prof. Ibrahim Hassan", shortName: "Ibrahim" }
      ]
    },
    {
      id: "2020-EE-09124",
      fullName: "Omar Sherif El-Tawil",
      email: "o.eltawil@student.aut.edu.eg",
      phone: "+20 122 345 6789",
      avatarInitials: "OT",
      avatarStartColor: "#06b6d4",
      avatarEndColor: "#0891b2",
      faculty: "Faculty of Engineering",
      department: "Electrical Engineering",
      program: "B.Eng. in Electrical Engineering",
      academicYear: "Year 5",
      semester: "Semester 9",
      level: "Senior · Year 5, Semester 9",
      enrollmentStatus: "Active",
      dob: "05 November 2001",
      nationality: "Egyptian",
      address: "8 El-Geesh Ave., Sidi Gaber, Alexandria",
      admissionDate: "September 2020",
      expectedGraduation: "June 2025",
      cumulativeGpa: 3.22,
      gpaClassification: "Very Good",
      earnedCredits: 148,
      remainingCredits: 12,
      totalCredits: 160,
      advisor: "Dr. Yasser Mansour",
      scholarshipStatus: "None",
      attendanceAvgRate: 88,
      attendanceDaysPresent: 132,
      attendanceDaysAbsent: 18,
      attendanceDaysExcused: 6,
      attendanceData: [
        { month: "Sep", pct: 90 },
        { month: "Oct", pct: 85 },
        { month: "Nov", pct: 82 },
        { month: "Dec", pct: 92 },
        { month: "Jan", pct: 89 },
        { month: "Feb", pct: 86 },
        { month: "Mar", pct: 91 }
      ],
      gpaData: [
        { s: "S1", gpa: 3.10 },
        { s: "S2", gpa: 3.30 },
        { s: "S3", gpa: 3.15 },
        { s: "S4", gpa: 3.25 },
        { s: "S5", gpa: 3.40 },
        { s: "S6", gpa: 3.20 },
        { s: "S7", gpa: 3.18 },
        { s: "S8", gpa: 3.22 }
      ],
      courses: [
        { code: "EE-501", name: "Power System Analysis", credits: 3, grade: "B+", pts: 3.3, sem: "Fall 2024" },
        { code: "EE-502", name: "Control Systems II", credits: 3, grade: "B", pts: 3.0, sem: "Fall 2024" },
        { code: "EE-503", name: "Digital Signal Processing", credits: 3, grade: "B-", pts: 2.7, sem: "Fall 2024" },
        { code: "EE-505", name: "High Voltage Engineering", credits: 3, grade: "A-", pts: 3.7, sem: "Fall 2024" },
        { code: "EE-401", name: "Microprocessor Systems", credits: 4, grade: "B", pts: 3.0, sem: "Spr 2024" },
        { code: "EE-402", name: "Electromagnetic Fields II", credits: 3, grade: "B-", pts: 2.7, sem: "Spr 2024" },
        { code: "EE-403", name: "Electrical Machines II", credits: 3, grade: "B+", pts: 3.3, sem: "Spr 2024" },
        { code: "EE-404", name: "Communication Systems I", credits: 3, grade: "A", pts: 4.0, sem: "Spr 2024" }
      ],
      behaviorSummary: "Good - Disciplined and cooperative. Dedicated IEEE student member.",
      insurancePolicyNo: "AUT-INS-2020-09124",
      insuranceProvider: "AXA Egypt Insurance",
      insuranceCoverage: "Standard Medical",
      insuranceValidThrough: "July 31, 2025",
      insuranceBloodType: "B Positive",
      insuranceAllergies: "Dust mites",
      emergencyContactName: "Sherif El-Tawil",
      emergencyContactPhone: "+20 120 777 9999",
      emergencyContactRelation: "Father",
      verificationStatus: "Verified",
      verificationCode: "AUT-VER-2024-C9D1W7",
      documentRef: "AUCST/REG/2024/Q4-EE",
      issueDate: "21 June 2024",
      validDays: 90,
      signatures: [
        { role: "University Registrar", name: "Dr. Maha El-Sayed", shortName: "Maha" },
        { role: "Dean of Faculty", name: "Prof. Ahmed Khalil", shortName: "Ahmed" },
        { role: "University Provost", name: "Prof. Ibrahim Hassan", shortName: "Ibrahim" }
      ]
    },
    {
      id: "2021-ME-06512",
      fullName: "Mariam Youssef Hegazi",
      email: "m.hegazi@student.aut.edu.eg",
      phone: "+20 101 234 5678",
      avatarInitials: "MH",
      avatarStartColor: "#16a34a",
      avatarEndColor: "#15803d",
      faculty: "Faculty of Engineering",
      department: "Mechanical Engineering",
      program: "B.Eng. in Mechanical Engineering",
      academicYear: "Year 4",
      semester: "Semester 8",
      level: "Senior · Year 4, Semester 8",
      enrollmentStatus: "Active",
      dob: "18 October 2002",
      nationality: "Egyptian",
      address: "78 El-Nasr St., Smouha, Alexandria",
      admissionDate: "September 2021",
      expectedGraduation: "June 2025",
      cumulativeGpa: 3.45,
      gpaClassification: "Very Good",
      earnedCredits: 136,
      remainingCredits: 24,
      totalCredits: 160,
      advisor: "Prof. Hisham Arafat",
      scholarshipStatus: "Sports Excellence 15% Waiver",
      attendanceAvgRate: 91,
      attendanceDaysPresent: 138,
      attendanceDaysAbsent: 14,
      attendanceDaysExcused: 3,
      attendanceData: [
        { month: "Sep", pct: 95 },
        { month: "Oct", pct: 88 },
        { month: "Nov", pct: 90 },
        { month: "Dec", pct: 92 },
        { month: "Jan", pct: 94 },
        { month: "Feb", pct: 87 },
        { month: "Mar", pct: 91 }
      ],
      gpaData: [
        { s: "S1", gpa: 3.10 },
        { s: "S2", gpa: 3.32 },
        { s: "S3", gpa: 3.40 },
        { s: "S4", gpa: 3.50 },
        { s: "S5", gpa: 3.48 },
        { s: "S6", gpa: 3.52 },
        { s: "S7", gpa: 3.45 }
      ],
      courses: [
        { code: "ME-401", name: "Fluid Mechanics II", credits: 3, grade: "A-", pts: 3.7, sem: "Fall 2024" },
        { code: "ME-402", name: "Heat Transfer I", credits: 3, grade: "B+", pts: 3.3, sem: "Fall 2024" },
        { code: "ME-403", name: "Machine Design II", credits: 4, grade: "B", pts: 3.0, sem: "Fall 2024" },
        { code: "MATH-302", name: "Numerical Analysis", credits: 3, grade: "A", pts: 4.0, sem: "Fall 2024" },
        { code: "ME-305", name: "Thermodynamics II", credits: 3, grade: "B+", pts: 3.3, sem: "Spr 2024" },
        { code: "ME-306", name: "Mechanics of Materials II", credits: 3, grade: "B", pts: 3.0, sem: "Spr 2024" },
        { code: "ME-307", name: "Manufacturing Processes", credits: 3, grade: "A-", pts: 3.7, sem: "Spr 2024" }
      ],
      behaviorSummary: "Excellent - Highly motivated student representative for engineering department.",
      insurancePolicyNo: "AUT-INS-2021-06512",
      insuranceProvider: "Misr Insurance",
      insuranceCoverage: "Standard Medical",
      insuranceValidThrough: "August 31, 2025",
      insuranceBloodType: "AB Positive",
      insuranceAllergies: "Shellfish",
      emergencyContactName: "Youssef Hegazi",
      emergencyContactPhone: "+20 100 111 2222",
      emergencyContactRelation: "Father",
      verificationStatus: "Verified",
      verificationCode: "AUT-VER-2024-M4N8V9",
      documentRef: "AUCST/REG/2024/Q4-ME",
      issueDate: "20 June 2024",
      validDays: 90,
      signatures: [
        { role: "University Registrar", name: "Dr. Maha El-Sayed", shortName: "Maha" },
        { role: "Dean of Faculty", name: "Prof. Ahmed Khalil", shortName: "Ahmed" },
        { role: "University Provost", name: "Prof. Ibrahim Hassan", shortName: "Ibrahim" }
      ]
    },
    {
      id: "2022-CE-04109",
      fullName: "Youssef Tarek Mansour",
      email: "y.mansour@student.aut.edu.eg",
      phone: "+20 111 999 8888",
      avatarInitials: "YM",
      avatarStartColor: "#f0b100",
      avatarEndColor: "#b48500",
      faculty: "Faculty of Engineering",
      department: "Civil Engineering",
      program: "B.Eng. in Civil Engineering",
      academicYear: "Year 3",
      semester: "Semester 5",
      level: "Junior · Year 3, Semester 5",
      enrollmentStatus: "Active",
      dob: "11 January 2004",
      nationality: "Egyptian",
      address: "12 El-Batal Ahmed Abdel Aziz St., Giza, Cairo",
      admissionDate: "September 2022",
      expectedGraduation: "June 2026",
      cumulativeGpa: 2.92,
      gpaClassification: "Good",
      earnedCredits: 78,
      remainingCredits: 82,
      totalCredits: 160,
      advisor: "Dr. Nadia Gobran",
      scholarshipStatus: "None",
      attendanceAvgRate: 95,
      attendanceDaysPresent: 142,
      attendanceDaysAbsent: 8,
      attendanceDaysExcused: 2,
      attendanceData: [
        { month: "Sep", pct: 96 },
        { month: "Oct", pct: 94 },
        { month: "Nov", pct: 93 },
        { month: "Dec", pct: 97 },
        { month: "Jan", pct: 95 },
        { month: "Feb", pct: 96 },
        { month: "Mar", pct: 94 }
      ],
      gpaData: [
        { s: "S1", gpa: 2.80 },
        { s: "S2", gpa: 2.95 },
        { s: "S3", gpa: 2.88 },
        { s: "S4", gpa: 3.05 }
      ],
      courses: [
        { code: "CE-301", name: "Structural Analysis I", credits: 3, grade: "B-", pts: 2.7, sem: "Fall 2024" },
        { code: "CE-302", name: "Soil Mechanics", credits: 3, grade: "B", pts: 3.0, sem: "Fall 2024" },
        { code: "CE-303", name: "Concrete Technology", credits: 3, grade: "B-", pts: 2.7, sem: "Fall 2024" },
        { code: "CE-304", name: "Transportation Engineering", credits: 3, grade: "B+", pts: 3.3, sem: "Fall 2024" },
        { code: "CE-201", name: "Surveying I", credits: 3, grade: "B", pts: 3.0, sem: "Spr 2024" },
        { code: "CE-202", name: "Fluid Mechanics", credits: 3, grade: "C+", pts: 2.3, sem: "Spr 2024" },
        { code: "CE-203", name: "Structural Mechanics", credits: 3, grade: "C", pts: 2.0, sem: "Spr 2024" }
      ],
      behaviorSummary: "Good - No disciplinary actions. Active in Civil Engineering Society.",
      insurancePolicyNo: "AUT-INS-2022-04109",
      insuranceProvider: "Bupa Egypt",
      insuranceCoverage: "Full Premium Care",
      insuranceValidThrough: "September 30, 2026",
      insuranceBloodType: "O Negative",
      insuranceAllergies: "None",
      emergencyContactName: "Tarek Mansour",
      emergencyContactPhone: "+20 110 333 4444",
      emergencyContactRelation: "Father",
      verificationStatus: "Verified",
      verificationCode: "AUT-VER-2024-C5K7L8",
      documentRef: "AUCST/REG/2024/Q4-CE",
      issueDate: "19 June 2024",
      validDays: 90,
      signatures: [
        { role: "University Registrar", name: "Dr. Maha El-Sayed", shortName: "Maha" },
        { role: "Dean of Faculty", name: "Prof. Ahmed Khalil", shortName: "Ahmed" },
        { role: "University Provost", name: "Prof. Ibrahim Hassan", shortName: "Ibrahim" }
      ]
    },
    {
      id: "2021-AR-03290",
      fullName: "Farida Amr Shaker",
      email: "f.shaker@student.aut.edu.eg",
      phone: "+20 102 444 8888",
      avatarInitials: "FS",
      avatarStartColor: "#a855f7",
      avatarEndColor: "#7e22ce",
      faculty: "Faculty of Architecture & Design",
      department: "Architecture",
      program: "B.Arch. in Architecture",
      academicYear: "Year 4",
      semester: "Semester 7",
      level: "Senior · Year 4, Semester 7",
      enrollmentStatus: "Active",
      dob: "09 September 2003",
      nationality: "Egyptian",
      address: "24 El-Mansour Mohamed St., Zamalek, Cairo",
      admissionDate: "September 2021",
      expectedGraduation: "June 2026",
      cumulativeGpa: 3.76,
      gpaClassification: "High Distinction",
      earnedCredits: 118,
      remainingCredits: 62,
      totalCredits: 180,
      advisor: "Prof. Laila El-Masry",
      scholarshipStatus: "Creative Excellence 30% Scholarship",
      attendanceAvgRate: 96,
      attendanceDaysPresent: 144,
      attendanceDaysAbsent: 6,
      attendanceDaysExcused: 2,
      attendanceData: [
        { month: "Sep", pct: 98 },
        { month: "Oct", pct: 94 },
        { month: "Nov", pct: 97 },
        { month: "Dec", pct: 96 },
        { month: "Jan", pct: 95 },
        { month: "Feb", pct: 96 },
        { month: "Mar", pct: 97 }
      ],
      gpaData: [
        { s: "S1", gpa: 3.65 },
        { s: "S2", gpa: 3.72 },
        { s: "S3", gpa: 3.80 },
        { s: "S4", gpa: 3.74 },
        { s: "S5", gpa: 3.82 },
        { s: "S6", gpa: 3.88 }
      ],
      courses: [
        { code: "AR-401", name: "Architectural Design V", credits: 5, grade: "A", pts: 4.0, sem: "Fall 2024" },
        { code: "AR-402", name: "History of Architecture III", credits: 3, grade: "A-", pts: 3.7, sem: "Fall 2024" },
        { code: "AR-403", name: "Building Construction III", credits: 3, grade: "B+", pts: 3.3, sem: "Fall 2024" },
        { code: "AR-404", name: "Environmental Control Systems", credits: 3, grade: "A", pts: 4.0, sem: "Fall 2024" },
        { code: "AR-301", name: "Architectural Design IV", credits: 5, grade: "A-", pts: 3.7, sem: "Spr 2024" },
        { code: "AR-302", name: "Urban Design Theory", credits: 3, grade: "A", pts: 4.0, sem: "Spr 2024" },
        { code: "AR-303", name: "Building Structures I", credits: 3, grade: "B", pts: 3.0, sem: "Spr 2024" }
      ],
      behaviorSummary: "Excellent - Highly creative, organized several design exhibitions.",
      insurancePolicyNo: "AUT-INS-2021-03290",
      insuranceProvider: "MetLife Egypt",
      insuranceCoverage: "Full Medical",
      insuranceValidThrough: "August 31, 2026",
      insuranceBloodType: "A Negative",
      insuranceAllergies: "Peanuts",
      emergencyContactName: "Amr Shaker",
      emergencyContactPhone: "+20 100 222 3333",
      emergencyContactRelation: "Father",
      verificationStatus: "Verified",
      verificationCode: "AUT-VER-2024-A8F2R5",
      documentRef: "AUCST/REG/2024/Q4-AR",
      issueDate: "18 June 2024",
      validDays: 90,
      signatures: [
        { role: "University Registrar", name: "Dr. Maha El-Sayed", shortName: "Maha" },
        { role: "Dean of Faculty", name: "Prof. Ahmed Khalil", shortName: "Ahmed" },
        { role: "University Provost", name: "Prof. Ibrahim Hassan", shortName: "Ibrahim" }
      ]
    },
    {
      id: "2023-BA-01289",
      fullName: "Ziad Hany Abdel-Latif",
      email: "z.abdellatif@student.aut.edu.eg",
      phone: "+20 114 555 6666",
      avatarInitials: "ZA",
      avatarStartColor: "#3b82f6",
      avatarEndColor: "#1d4ed8",
      faculty: "School of Business",
      department: "Business Analytics",
      program: "B.Sc. in Business Analytics",
      academicYear: "Year 2",
      semester: "Semester 3",
      level: "Sophomore · Year 2, Semester 3",
      enrollmentStatus: "Active",
      dob: "03 June 2005",
      nationality: "Egyptian",
      address: "35 El-Horeya Ave., Alexandria",
      admissionDate: "September 2023",
      expectedGraduation: "June 2027",
      cumulativeGpa: 3.34,
      gpaClassification: "Very Good",
      earnedCredits: 42,
      remainingCredits: 78,
      totalCredits: 120,
      advisor: "Dr. Tarek Hegazi",
      scholarshipStatus: "None",
      attendanceAvgRate: 90,
      attendanceDaysPresent: 135,
      attendanceDaysAbsent: 15,
      attendanceDaysExcused: 4,
      attendanceData: [
        { month: "Sep", pct: 92 },
        { month: "Oct", pct: 88 },
        { month: "Nov", pct: 89 },
        { month: "Dec", pct: 91 },
        { month: "Jan", pct: 93 },
        { month: "Feb", pct: 87 },
        { month: "Mar", pct: 90 }
      ],
      gpaData: [
        { s: "S1", gpa: 3.25 },
        { s: "S2", gpa: 3.42 }
      ],
      courses: [
        { code: "BA-201", name: "Data Mining for Business", credits: 3, grade: "B+", pts: 3.3, sem: "Fall 2024" },
        { code: "BA-202", name: "Predictive Analytics", credits: 3, grade: "B", pts: 3.0, sem: "Fall 2024" },
        { code: "BA-203", name: "Business Intelligence", credits: 3, grade: "A-", pts: 3.7, sem: "Fall 2024" },
        { code: "STAT-201", name: "Advanced Statistics", credits: 3, grade: "B+", pts: 3.3, sem: "Fall 2024" },
        { code: "BA-101", name: "Introduction to Analytics", credits: 3, grade: "A", pts: 4.0, sem: "Spr 2024" },
        { code: "ECON-102", name: "Macroeconomics", credits: 3, grade: "B", pts: 3.0, sem: "Spr 2024" },
        { code: "MGT-101", name: "Principles of Management", credits: 3, grade: "B-", pts: 2.7, sem: "Spr 2024" }
      ],
      behaviorSummary: "Good - Attentive, active participant in entrepreneurship club.",
      insurancePolicyNo: "AUT-INS-2023-01289",
      insuranceProvider: "Egypt National Health Fund",
      insuranceCoverage: "Basic Health Care",
      insuranceValidThrough: "August 31, 2027",
      insuranceBloodType: "B Negative",
      insuranceAllergies: "None",
      emergencyContactName: "Hany Abdel-Latif",
      emergencyContactPhone: "+20 111 444 5555",
      emergencyContactRelation: "Father",
      verificationStatus: "Verified",
      verificationCode: "AUT-VER-2024-B1Z4Q8",
      documentRef: "AUCST/REG/2024/Q4-BA",
      issueDate: "17 June 2024",
      validDays: 90,
      signatures: [
        { role: "University Registrar", name: "Dr. Maha El-Sayed", shortName: "Maha" },
        { role: "Dean of Faculty", name: "Prof. Ahmed Khalil", shortName: "Ahmed" },
        { role: "University Provost", name: "Prof. Ibrahim Hassan", shortName: "Ibrahim" }
      ]
    },
    {
      id: "2022-BI-02941",
      fullName: "Hana Khaled El-Masry",
      email: "h.elmasry@student.aut.edu.eg",
      phone: "+20 106 111 2222",
      avatarInitials: "HM",
      avatarStartColor: "#14b8a6",
      avatarEndColor: "#0f766e",
      faculty: "Faculty of Computer Science & Information Technology",
      department: "Bioinformatics",
      program: "B.Sc. in Bioinformatics",
      academicYear: "Year 3",
      semester: "Semester 5",
      level: "Junior · Year 3, Semester 5",
      enrollmentStatus: "Active",
      dob: "17 December 2004",
      nationality: "Egyptian",
      address: "6 El-Mina St., Mansoura",
      admissionDate: "September 2022",
      expectedGraduation: "June 2026",
      cumulativeGpa: 3.55,
      gpaClassification: "Distinction",
      earnedCredits: 82,
      remainingCredits: 50,
      totalCredits: 132,
      advisor: "Dr. Sherif Abdallah",
      scholarshipStatus: "Dean's List 10% Waiver",
      attendanceAvgRate: 93,
      attendanceDaysPresent: 140,
      attendanceDaysAbsent: 10,
      attendanceDaysExcused: 3,
      attendanceData: [
        { month: "Sep", pct: 95 },
        { month: "Oct", pct: 91 },
        { month: "Nov", pct: 92 },
        { month: "Dec", pct: 96 },
        { month: "Jan", pct: 93 },
        { month: "Feb", pct: 92 },
        { month: "Mar", pct: 93 }
      ],
      gpaData: [
        { s: "S1", gpa: 3.40 },
        { s: "S2", gpa: 3.52 },
        { s: "S3", gpa: 3.60 },
        { s: "S4", gpa: 3.65 }
      ],
      courses: [
        { code: "BI-301", name: "Introduction to Genomics", credits: 3, grade: "A-", pts: 3.7, sem: "Fall 2024" },
        { code: "BI-302", name: "Algorithms in Bioinformatics", credits: 3, grade: "B+", pts: 3.3, sem: "Fall 2024" },
        { code: "CHEM-301", name: "Biochemistry", credits: 3, grade: "B+", pts: 3.3, sem: "Fall 2024" },
        { code: "BI-303", name: "Biostatistics", credits: 3, grade: "A", pts: 4.0, sem: "Fall 2024" },
        { code: "BI-201", name: "Computational Biology", credits: 3, grade: "A-", pts: 3.7, sem: "Spr 2024" },
        { code: "CHEM-202", name: "Organic Chemistry II", credits: 3, grade: "B", pts: 3.0, sem: "Spr 2024" },
        { code: "BI-202", name: "Genetics & Cell Biology", credits: 3, grade: "B+", pts: 3.3, sem: "Spr 2024" }
      ],
      behaviorSummary: "Excellent - Highly dedicated to computational biology research.",
      insurancePolicyNo: "AUT-INS-2022-02941",
      insuranceProvider: "AXA Egypt Insurance",
      insuranceCoverage: "Standard Medical",
      insuranceValidThrough: "August 31, 2026",
      insuranceBloodType: "AB Negative",
      insuranceAllergies: "Lactose Intolerant",
      emergencyContactName: "Khaled El-Masry",
      emergencyContactPhone: "+20 100 888 7777",
      emergencyContactRelation: "Father",
      verificationStatus: "Verified",
      verificationCode: "AUT-VER-2024-H7K3F9",
      documentRef: "AUCST/REG/2024/Q4-BI",
      issueDate: "16 June 2024",
      validDays: 90,
      signatures: [
        { role: "University Registrar", name: "Dr. Maha El-Sayed", shortName: "Maha" },
        { role: "Dean of Faculty", name: "Prof. Ahmed Khalil", shortName: "Ahmed" },
        { role: "University Provost", name: "Prof. Ibrahim Hassan", shortName: "Ibrahim" }
      ]
    },
    {
      id: "2021-CY-08712",
      fullName: "Kareem Sherif Roushdy",
      email: "k.roushdy@student.aut.edu.eg",
      phone: "+20 115 222 3333",
      avatarInitials: "KR",
      avatarStartColor: "#f97316",
      avatarEndColor: "#c2410c",
      faculty: "Faculty of Computer Science & Information Technology",
      department: "Cybersecurity",
      program: "B.Sc. in Cybersecurity",
      academicYear: "Year 4",
      semester: "Semester 7",
      level: "Senior · Year 4, Semester 7",
      enrollmentStatus: "Active",
      dob: "29 April 2003",
      nationality: "Egyptian",
      address: "9 El-Nasr Ave., Maadi, Cairo",
      admissionDate: "September 2021",
      expectedGraduation: "June 2025",
      cumulativeGpa: 3.68,
      gpaClassification: "Distinction",
      earnedCredits: 114,
      remainingCredits: 18,
      totalCredits: 132,
      advisor: "Dr. Amr Soliman",
      scholarshipStatus: "None",
      attendanceAvgRate: 94,
      attendanceDaysPresent: 141,
      attendanceDaysAbsent: 9,
      attendanceDaysExcused: 4,
      attendanceData: [
        { month: "Sep", pct: 96 },
        { month: "Oct", pct: 91 },
        { month: "Nov", pct: 93 },
        { month: "Dec", pct: 98 },
        { month: "Jan", pct: 95 },
        { month: "Feb", pct: 92 },
        { month: "Mar", pct: 94 }
      ],
      gpaData: [
        { s: "S1", gpa: 3.50 },
        { s: "S2", gpa: 3.62 },
        { s: "S3", gpa: 3.58 },
        { s: "S4", gpa: 3.70 },
        { s: "S5", gpa: 3.75 },
        { s: "S6", gpa: 3.68 }
      ],
      courses: [
        { code: "CY-401", name: "Applied Cryptography", credits: 3, grade: "A", pts: 4.0, sem: "Fall 2024" },
        { code: "CY-402", name: "Network Security & Pen Testing", credits: 4, grade: "A-", pts: 3.7, sem: "Fall 2024" },
        { code: "CY-403", name: "Digital Forensics", credits: 3, grade: "B+", pts: 3.3, sem: "Fall 2024" },
        { code: "CY-404", name: "Secure Software Engineering", credits: 3, grade: "A", pts: 4.0, sem: "Fall 2024" },
        { code: "CY-301", name: "System Security", credits: 3, grade: "A-", pts: 3.7, sem: "Spr 2024" },
        { code: "CY-302", name: "Information Security Standards", credits: 3, grade: "B+", pts: 3.3, sem: "Spr 2024" },
        { code: "CY-303", name: "Wireless Networks Security", credits: 3, grade: "B", pts: 3.0, sem: "Spr 2024" }
      ],
      behaviorSummary: "Excellent - Lead student in university cybersecurity operations center.",
      insurancePolicyNo: "AUT-INS-2021-08712",
      insuranceProvider: "Allianz Egypt Medical",
      insuranceCoverage: "Premium Medical Plan",
      insuranceValidThrough: "August 31, 2025",
      insuranceBloodType: "O Positive",
      insuranceAllergies: "None",
      emergencyContactName: "Sherif Roushdy",
      emergencyContactPhone: "+20 122 888 9999",
      emergencyContactRelation: "Father",
      verificationStatus: "Verified",
      verificationCode: "AUT-VER-2024-K2J5U1",
      documentRef: "AUCST/REG/2024/Q4-CY",
      issueDate: "15 June 2024",
      validDays: 90,
      signatures: [
        { role: "University Registrar", name: "Dr. Maha El-Sayed", shortName: "Maha" },
        { role: "Dean of Faculty", name: "Prof. Ahmed Khalil", shortName: "Ahmed" },
        { role: "University Provost", name: "Prof. Ibrahim Hassan", shortName: "Ibrahim" }
      ]
    },
    {
      id: "2022-AI-01052",
      fullName: "Nour Mohamed El-Feky",
      email: "n.elfeky@student.aut.edu.eg",
      phone: "+20 101 888 9999",
      avatarInitials: "NF",
      avatarStartColor: "#06b6d4",
      avatarEndColor: "#0891b2",
      faculty: "Faculty of Computer Science & Information Technology",
      department: "Artificial Intelligence",
      program: "B.Sc. in Artificial Intelligence",
      academicYear: "Year 3",
      semester: "Semester 5",
      level: "Junior · Year 3, Semester 5",
      enrollmentStatus: "Active",
      dob: "14 February 2004",
      nationality: "Egyptian",
      address: "3 El-Galaa St., Tanta",
      admissionDate: "September 2022",
      expectedGraduation: "June 2026",
      cumulativeGpa: 3.92,
      gpaClassification: "High Distinction",
      earnedCredits: 80,
      remainingCredits: 52,
      totalCredits: 132,
      advisor: "Prof. Magdy Hegazy",
      scholarshipStatus: "Full Merit Scholarship",
      attendanceAvgRate: 98,
      attendanceDaysPresent: 147,
      attendanceDaysAbsent: 3,
      attendanceDaysExcused: 2,
      attendanceData: [
        { month: "Sep", pct: 99 },
        { month: "Oct", pct: 97 },
        { month: "Nov", pct: 98 },
        { month: "Dec", pct: 100 },
        { month: "Jan", pct: 97 },
        { month: "Feb", pct: 98 },
        { month: "Mar", pct: 99 }
      ],
      gpaData: [
        { s: "S1", gpa: 3.88 },
        { s: "S2", gpa: 3.92 },
        { s: "S3", gpa: 3.95 },
        { s: "S4", gpa: 3.94 }
      ],
      courses: [
        { code: "AI-301", name: "Machine Learning", credits: 3, grade: "A", pts: 4.0, sem: "Fall 2024" },
        { code: "AI-302", name: "Deep Learning Fundamentals", credits: 4, grade: "A", pts: 4.0, sem: "Fall 2024" },
        { code: "AI-303", name: "Computer Vision", credits: 3, grade: "A-", pts: 3.7, sem: "Fall 2024" },
        { code: "AI-304", name: "Natural Language Processing", credits: 3, grade: "A", pts: 4.0, sem: "Fall 2024" },
        { code: "AI-201", name: "Python for AI", credits: 3, grade: "A", pts: 4.0, sem: "Spr 2024" },
        { code: "AI-202", name: "Artificial Intelligence Search", credits: 3, grade: "A-", pts: 3.7, sem: "Spr 2024" },
        { code: "MATH-201", name: "Probability & Statistics", credits: 3, grade: "A", pts: 4.0, sem: "Spr 2024" }
      ],
      behaviorSummary: "Outstanding - Active researcher with published AI work in student symposiums.",
      insurancePolicyNo: "AUT-INS-2022-01052",
      insuranceProvider: "Bupa Egypt",
      insuranceCoverage: "Full Premium Care",
      insuranceValidThrough: "August 31, 2026",
      insuranceBloodType: "A Positive",
      insuranceAllergies: "Strawberries",
      emergencyContactName: "Mohamed El-Feky",
      emergencyContactPhone: "+20 100 333 2222",
      emergencyContactRelation: "Father",
      verificationStatus: "Verified",
      verificationCode: "AUT-VER-2024-N9T4P7",
      documentRef: "AUCST/REG/2024/Q4-AI",
      issueDate: "14 June 2024",
      validDays: 90,
      signatures: [
        { role: "University Registrar", name: "Dr. Maha El-Sayed", shortName: "Maha" },
        { role: "Dean of Faculty", name: "Prof. Ahmed Khalil", shortName: "Ahmed" },
        { role: "University Provost", name: "Prof. Ibrahim Hassan", shortName: "Ibrahim" }
      ]
    }
  ];

  readonly selectedStudentId = signal<string>("2021-CS-04782");

  readonly selectedStudent = computed(() => {
    return this.STUDENTS.find(s => s.id === this.selectedStudentId()) || this.STUDENTS[0];
  });

  readonly GPA_DATA = computed(() => this.selectedStudent().gpaData);
  readonly ATTENDANCE_DATA = computed(() => this.selectedStudent().attendanceData);
  readonly COURSES = computed(() => this.selectedStudent().courses);

  readonly ALL_WIDGET_IDS: WidgetId[] = ["studentHeader", "contactInfo", "academicDegree", "gpaChart", "attendance", "insurance", "verification"];

  readonly WIDGET_LABELS: Record<WidgetId, string> = {
    studentHeader: "Student Header",
    contactInfo: "Contact Info",
    academicDegree: "Degree Table",
    gpaChart: "GPA Chart",
    attendance: "Attendance",
    insurance: "Insurance",
    verification: "Verification",
  };

  readonly ACCORDION_SECTIONS: AccordionSection[] = [
    {
      id: "personal", label: "Personal Information", icon: "user",
      widgets: [
        { id: "studentHeader", label: "Student Header & Photo" },
        { id: "contactInfo", label: "Contact Information" },
      ],
    },
    {
      id: "academic", label: "Academic Records", icon: "bookOpen",
      widgets: [
        { id: "academicDegree", label: "Degree Summary Table" },
        { id: "gpaChart", label: "GPA Progression Chart" },
      ],
    },
    {
      id: "attendance", label: "Attendance & Behavior", icon: "calendar",
      widgets: [{ id: "attendance", label: "Attendance Summary" }],
    },
    {
      id: "insurance", label: "Insurance & Medical", icon: "shield",
      widgets: [{ id: "insurance", label: "Insurance Summary" }],
    },
    {
      id: "verification", label: "Verification", icon: "fileCheck",
      widgets: [{ id: "verification", label: "Official Signatures & Stamp" }],
    },
  ];

  readonly TEMPLATES: Template[] = [
    {
      id: "degree-summary", name: "Official Degree Summary", tag: "Official",
      description: "Core academic record for institutional use",
      widgets: new Set<WidgetId>(["studentHeader", "academicDegree", "gpaChart", "verification"]),
    },
    {
      id: "full-verification", name: "Full Verification Certificate", tag: "Complete",
      description: "Complete student profile with all sections",
      widgets: new Set<WidgetId>(["studentHeader", "contactInfo", "academicDegree", "gpaChart", "attendance", "insurance", "verification"]),
    },
    {
      id: "attendance-record", name: "Attendance & Behavior", tag: "Attendance",
      description: "Focused attendance metrics and behavioral log",
      widgets: new Set<WidgetId>(["studentHeader", "attendance", "verification"]),
    },
    {
      id: "transcript", name: "Academic Transcript", tag: "Academic",
      description: "Full course history with GPA analysis",
      widgets: new Set<WidgetId>(["studentHeader", "contactInfo", "academicDegree", "gpaChart", "verification"]),
    },
  ];

  readonly ZOOM_LEVELS = [0.55, 0.75, 0.9, 1.0];

  // ─── STATE SIGNALS ───────────────────────────────────────────────────────────

  readonly mode = signal<Mode>("templates");
  readonly selectedTemplate = signal<string>("degree-summary");
  readonly activeWidgets = signal<Set<WidgetId>>(new Set(["studentHeader", "academicDegree", "gpaChart", "verification"]));
  readonly openAccordions = signal<Set<string>>(new Set(["personal", "academic"]));
  readonly exportState = signal<ExportState>("idle");
  readonly showSaveModal = signal<boolean>(false);
  readonly zoomIdx = signal<number>(1);
  readonly templateName = signal<string>("");
  readonly templateDesc = signal<string>("");
  readonly saveSuccess = signal<boolean>(false);
  readonly pageSizeA4 = signal<boolean>(true);
  readonly watermark = signal<boolean>(false);

  // ─── COMPUTED SIGNALS ────────────────────────────────────────────────────────

  readonly zoom = computed(() => this.ZOOM_LEVELS[this.zoomIdx()]);
  readonly docWidth = computed(() => this.pageSizeA4() ? 595 : 612);

  // ─── ACTIONS ─────────────────────────────────────────────────────────────────

  setMode(newMode: Mode) {
    this.mode.set(newMode);
  }

  toggleWidget(id: WidgetId) {
    const next = new Set(this.activeWidgets());
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this.activeWidgets.set(next);
  }

  selectTemplate(template: Template) {
    this.selectedTemplate.set(template.id);
    this.activeWidgets.set(new Set(template.widgets));
  }

  toggleAccordion(id: string) {
    const next = new Set(this.openAccordions());
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    this.openAccordions.set(next);
  }

  selectAllWidgets() {
    this.activeWidgets.set(new Set(this.ALL_WIDGET_IDS));
  }

  clearAllWidgets() {
    this.activeWidgets.set(new Set());
  }

  expandAllAccordions() {
    this.openAccordions.set(new Set(this.ACCORDION_SECTIONS.map((s) => s.id)));
  }

  collapseAllAccordions() {
    this.openAccordions.set(new Set());
  }

  togglePageSize() {
    this.pageSizeA4.update(prev => !prev);
  }

  toggleWatermark() {
    this.watermark.update(prev => !prev);
  }

  zoomIn() {
    this.zoomIdx.update(i => Math.min(this.ZOOM_LEVELS.length - 1, i + 1));
  }

  zoomOut() {
    this.zoomIdx.update(i => Math.max(0, i - 1));
  }

  fitZoom() {
    this.zoomIdx.set(1);
  }

  handleExport() {
    if (this.activeWidgets().size === 0) {
      this.exportState.set("error");
      setTimeout(() => this.exportState.set("idle"), 3500);
      return;
    }
    this.exportState.set("loading");
    setTimeout(() => {
      this.exportState.set("success");
      setTimeout(() => this.exportState.set("idle"), 3500);
    }, 2400);
  }

  saveCustomTemplate() {
    if (!this.templateName().trim()) return;
    this.saveSuccess.set(true);
    setTimeout(() => {
      this.saveSuccess.set(false);
      this.showSaveModal.set(false);
      this.templateName.set("");
      this.templateDesc.set("");
    }, 1800);
  }
}
