export interface Course {
  id?: string;
  title: string;
  description: string;
  category: 'Banking' | 'SSC' | 'CAT' | 'Foundation';
  price: number;
  duration?: string;
  imageUrl?: string;
}

export interface Student {
  uid: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  enrolledCourses?: string[];
}

export interface Result {
  id?: string;
  studentName: string;
  exam: string;
  rank?: string;
  year: number;
  imageUrl?: string;
}

export interface Notification {
  id?: string;
  title: string;
  message: string;
  createdAt: any;
  type: 'exam' | 'general' | 'result';
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: any;
}
