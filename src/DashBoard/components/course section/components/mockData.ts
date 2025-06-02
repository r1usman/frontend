import { Course, User } from ".";

export const currentUser: User = {
  id: "user1",
  name: "Alex Johnson",
  role: "student",
  avatar:
    "https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=150",
};

export const instructorCourses: Course[] = [
  {
    id: "course1",
    title: "Introduction to React Development",
    description:
      "Learn the fundamentals of React, including components, state, props, and hooks. Build real-world applications with the most popular frontend library.",
    instructor: {
      id: "instructor1",
      name: "Dr. Sarah Chen",
      avatar:
        "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    thumbnail:
      "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600",
    enrollmentCount: 128,
    duration: "8 weeks",
    startDate: "2025-01-15",
    endDate: "2025-03-10",
    category: "Web Development",
    tags: ["React", "JavaScript", "Frontend"],
    status: "ongoing",
  },
  {
    id: "course2",
    title: "Advanced TypeScript Patterns",
    description:
      "Master advanced TypeScript concepts including generics, utility types, and design patterns for large-scale applications.",
    instructor: {
      id: "instructor1",
      name: "Dr. Sarah Chen",
      avatar:
        "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    thumbnail:
      "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=600",
    enrollmentCount: 85,
    duration: "6 weeks",
    startDate: "2025-04-01",
    endDate: "2025-05-15",
    category: "Programming",
    tags: ["TypeScript", "JavaScript", "Advanced"],
    status: "upcoming",
  },
  {
    id: "course3",
    title: "Full Stack Development with MERN",
    description:
      "Build complete web applications using MongoDB, Express, React, and Node.js. Learn authentication, API development, and deployment.",
    instructor: {
      id: "instructor1",
      name: "Dr. Sarah Chen",
      avatar:
        "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    thumbnail:
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600",
    enrollmentCount: 210,
    duration: "12 weeks",
    startDate: "2024-09-15",
    endDate: "2024-12-10",
    category: "Web Development",
    tags: ["MongoDB", "Express", "React", "Node.js", "Full Stack"],
    status: "completed",
  },
  {
    id: "course4",
    title: "UI/UX Design Principles",
    description:
      "Learn the fundamentals of creating effective user interfaces and experiences. Master design thinking, wireframing, and prototyping.",
    instructor: {
      id: "instructor1",
      name: "Dr. Sarah Chen",
      avatar:
        "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    thumbnail:
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
    enrollmentCount: 156,
    duration: "8 weeks",
    startDate: "2025-02-10",
    endDate: "2025-04-05",
    category: "Design",
    tags: ["UI", "UX", "Design", "Wireframing"],
    status: "ongoing",
  },
];

export const studentCourses: Course[] = [
  {
    id: "course5",
    title: "Machine Learning Fundamentals",
    description:
      "An introduction to machine learning algorithms, techniques, and practical applications using Python and popular ML libraries.",
    instructor: {
      id: "instructor2",
      name: "Prof. Michael Torres",
      avatar:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    thumbnail:
      "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600",
    enrollmentCount: 245,
    duration: "10 weeks",
    startDate: "2025-01-20",
    endDate: "2025-03-30",
    category: "Data Science",
    tags: ["Machine Learning", "Python", "Data Science"],
    progress: 65,
    status: "ongoing",
  },
  {
    id: "course6",
    title: "Mobile App Development with React Native",
    description:
      "Build cross-platform mobile applications using React Native. Learn to develop for iOS and Android from a single codebase.",
    instructor: {
      id: "instructor3",
      name: "Jennifer Wilson",
      avatar:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    thumbnail:
      "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=600",
    enrollmentCount: 178,
    duration: "8 weeks",
    startDate: "2025-02-15",
    endDate: "2025-04-10",
    category: "Mobile Development",
    tags: ["React Native", "Mobile", "iOS", "Android"],
    progress: 42,
    status: "ongoing",
  },
  {
    id: "course7",
    title: "Cloud Computing with AWS",
    description:
      "Master cloud infrastructure and services with Amazon Web Services. Deploy scalable and secure applications in the cloud.",
    instructor: {
      id: "instructor4",
      name: "Dr. Robert Kim",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    thumbnail:
      "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=600",
    enrollmentCount: 132,
    duration: "9 weeks",
    startDate: "2024-11-10",
    endDate: "2025-01-15",
    category: "Cloud Computing",
    tags: ["AWS", "Cloud", "DevOps"],
    progress: 100,
    status: "completed",
  },
  {
    id: "course8",
    title: "Cybersecurity Essentials",
    description:
      "Learn the fundamentals of network security, encryption, threat detection, and best practices for securing applications and data.",
    instructor: {
      id: "instructor5",
      name: "Emma Clarke",
      avatar:
        "https://images.pexels.com/photos/3775131/pexels-photo-3775131.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    thumbnail:
      "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600",
    enrollmentCount: 195,
    duration: "8 weeks",
    startDate: "2025-03-01",
    endDate: "2025-04-25",
    category: "Security",
    tags: ["Cybersecurity", "Network Security", "Encryption"],
    progress: 0,
    status: "upcoming",
  },
];

export const allCourses = [...instructorCourses, ...studentCourses];
