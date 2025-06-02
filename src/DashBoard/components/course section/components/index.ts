export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  thumbnail: string;
  enrollmentCount: number;
  duration: string;
  startDate: string;
  endDate: string;
  category: string;
  tags: string[];
  progress?: number; // Only for student view
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface User {
  id: string;
  name: string;
  role: 'instructor' | 'student';
  avatar: string;
}