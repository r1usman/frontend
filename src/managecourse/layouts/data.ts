import React, { createContext, useContext, useState, ReactNode } from "react";

// Types
interface CourseStats {
  views: number;
  completionRate: number;
  avgRating: number;
  reviewCount: number;
  totalRevenue: number;
  revenueThisMonth: number;
  enrollmentsThisMonth: number;
}

export interface Lecture {
  id: string;
  title: string;
  duration: number;
  type: "video" | "quiz" | "assignment";
  completed?: boolean;
}

export interface Section {
  id: string;
  title: string;
  lectures: Lecture[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
  lastActive: string;
  enrolled: string;
}

export interface Review {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
  responded: boolean;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  published: boolean;
  price: number;
  discountPrice?: number;
  lastUpdated: string;
  students: number;
  revenue: number;
  sections: Section[];
  stats: CourseStats;
  studentList: Student[];
  reviews: Review[];
}

// Context
interface CourseContextType {
  course: Course | null;
  setCourse: (course: Course) => void;
  isLoading: boolean;
}

// Mock data
export const mockCourse: Course = {
  id: "course-123",
  title: "Advanced React Development with TypeScript",
  subtitle:
    "Master React, TypeScript, and modern front-end development patterns",
  description:
    "This comprehensive course teaches you advanced React patterns, TypeScript integration, state management, and more.",
  published: true,
  price: 129.99,
  discountPrice: 89.99,
  lastUpdated: "April 15, 2025",
  students: 1458,
  revenue: 94356,
  stats: {
    views: 15240,
    completionRate: 72,
    avgRating: 4.7,
    reviewCount: 327,
    totalRevenue: 94356,
    revenueThisMonth: 6423,
    enrollmentsThisMonth: 78,
  },

  sections: [
    {
      id: "section-1",
      title: "Introduction to Advanced React",
      lectures: [
        {
          id: "lecture-1-1",
          title: "Course Overview",
          duration: 8,
          type: "video",
        },
        {
          id: "lecture-1-2",
          title: "Setting Up Your Environment",
          duration: 15,
          type: "video",
        },
        {
          id: "lecture-1-3",
          title: "TypeScript Fundamentals",
          duration: 22,
          type: "video",
        },
        {
          id: "lecture-1-4",
          title: "Knowledge Check",
          duration: 10,
          type: "quiz",
        },
      ],
    },
    {
      id: "section-2",
      title: "Component Patterns",
      lectures: [
        {
          id: "lecture-2-1",
          title: "Compound Components",
          duration: 18,
          type: "video",
        },
        {
          id: "lecture-2-2",
          title: "Render Props Pattern",
          duration: 14,
          type: "video",
        },
        {
          id: "lecture-2-3",
          title: "Custom Hooks",
          duration: 20,
          type: "video",
        },
        {
          id: "lecture-2-4",
          title: "Component Pattern Exercise",
          duration: 30,
          type: "assignment",
        },
      ],
    },
    {
      id: "section-3",
      title: "State Management",
      lectures: [
        {
          id: "lecture-3-1",
          title: "Context API Deep Dive",
          duration: 24,
          type: "video",
        },
        {
          id: "lecture-3-2",
          title: "Redux with TypeScript",
          duration: 28,
          type: "video",
        },
        {
          id: "lecture-3-3",
          title: "State Management Quiz",
          duration: 15,
          type: "quiz",
        },
      ],
    },
  ],
  studentList: [
    {
      id: "student-1",
      name: "Emma Thompson",
      email: "emma@example.com",
      progress: 87,
      lastActive: "2 hours ago",
      enrolled: "Mar 15, 2025",
    },
    {
      id: "student-2",
      name: "James Wilson",
      email: "james@example.com",
      progress: 42,
      lastActive: "1 day ago",
      enrolled: "Mar 22, 2025",
    },
    {
      id: "student-3",
      name: "Sophie Chen",
      email: "sophie@example.com",
      progress: 100,
      lastActive: "5 hours ago",
      enrolled: "Feb 10, 2025",
    },
    {
      id: "student-4",
      name: "Miguel Rodriguez",
      email: "miguel@example.com",
      progress: 63,
      lastActive: "3 days ago",
      enrolled: "Apr 5, 2025",
    },
    {
      id: "student-5",
      name: "Aisha Patel",
      email: "aisha@example.com",
      progress: 28,
      lastActive: "Just now",
      enrolled: "Apr 12, 2025",
    },
  ],
  reviews: [
    {
      id: "review-1",
      studentName: "David Kim",
      rating: 5,
      comment:
        "Excellent course! The TypeScript sections were particularly helpful.",
      date: "Apr 10, 2025",
      responded: true,
    },
    {
      id: "review-2",
      studentName: "Olivia Martins",
      rating: 4,
      comment: "Great content but some sections could use more examples.",
      date: "Apr 5, 2025",
      responded: false,
    },
    {
      id: "review-3",
      studentName: "Raj Patel",
      rating: 5,
      comment:
        "Best React course I've taken. The advanced patterns section is gold!",
      date: "Mar 28, 2025",
      responded: true,
    },
  ],
};

// Provider
interface CourseProviderProps {
  children: ReactNode;
}
