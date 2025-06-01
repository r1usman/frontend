export interface LinkItem {
  id: string;
  name: string;
  url: string;
}

export interface Section {
  id: string;
  title: string;
  details: string;
  isOpen: boolean;
  links: LinkItem[];
}

// Initial course sections data
export const initialSectionsData: Section[] = [
  {
    id: "javaSec001",
    title: "👋 Welcome to Java Programming!",
    details: "4 lectures • 25min",
    isOpen: false,
    links: [
      { id: "javaLink001a", name: "Introduction to Java", url: "#" },
      { id: "javaLink001b", name: "Why Learn Java?.pdf", url: "#" },
      { id: "javaLink001c", name: "Setting Up Your Environment", url: "#" },
    ],
  },
  {
    id: "javaSec002",
    title: "PART 1: JAVA BASICS 🛠️",
    details: "10 lectures • 1hr 30min",
    isOpen: false,
    links: [
      { id: "javaLink002a", name: "Variables and Data Types", url: "#" },
      { id: "javaLink002b", name: "Operators Cheatsheet.pdf", url: "#" },
      { id: "javaLink002c", name: "Basic Syntax and Structure", url: "#" },
    ],
  },
  {
    id: "javaSec003",
    title: "Control Flow Statements 🚦",
    details: "8 lectures • 1hr 10min",
    isOpen: false,
    links: [
      { id: "javaLink003a", name: "If-Else Statements", url: "#" },
      { id: "javaLink003b", name: "Loops (For, While, Do-While)", url: "#" },
      { id: "javaLink003c", name: "Switch Statements Guide.pdf", url: "#" },
      { id: "javaLink003d", name: "Control Flow Exercises", url: "#" },
    ],
  },
  {
    id: "javaSec004",
    title: "Object-Oriented Programming (OOP) - Part 1 🧬",
    details: "12 lectures • 2hr 5min",
    isOpen: false,
    links: [
      { id: "javaLink004a", name: "Introduction to OOP Concepts", url: "#" },
      { id: "javaLink004b", name: "Classes and Objects", url: "#" },
      { id: "javaLink004c", name: "Constructors Explained.pdf", url: "#" },
      { id: "javaLink004d", name: "Methods and Encapsulation", url: "#" },
    ],
  },
  {
    id: "javaSec005",
    title: "Object-Oriented Programming (OOP) - Part 2 🧩",
    details: "10 lectures • 1hr 45min",
    isOpen: false,
    links: [
      { id: "javaLink005a", name: "Inheritance", url: "#" },
      { id: "javaLink005b", name: "Polymorphism Deep Dive", url: "#" },
      { id: "javaLink005c", name: "Abstraction and Interfaces.pdf", url: "#" },
    ],
  },
  {
    id: "javaSec006",
    title: "Arrays and Strings 📏",
    details: "7 lectures • 1hr",
    isOpen: false,
    links: [
      { id: "javaLink006a", name: "Working with Arrays", url: "#" },
      { id: "javaLink006b", name: "String Manipulation Techniques", url: "#" },
      { id: "javaLink006c", name: "Array and String Exercises.zip", url: "#" },
    ],
  },
  {
    id: "javaSec007",
    title: "Exception Handling 🛡️",
    details: "6 lectures • 50min",
    isOpen: false,
    links: [
      { id: "javaLink007a", name: "Try, Catch, Finally Blocks", url: "#" },
      { id: "javaLink007b", name: "Checked vs Unchecked Exceptions", url: "#" },
      {
        id: "javaLink007c",
        name: "Best Practices for Handling Errors.pdf",
        url: "#",
      },
    ],
  },
  {
    id: "javaSec008",
    title: "Java Collections Framework 🗄️",
    details: "9 lectures • 1hr 20min",
    isOpen: false,
    links: [
      { id: "javaLink008a", name: "Introduction to Collections", url: "#" },
      { id: "javaLink008b", name: "Lists, Sets, and Maps", url: "#" },
      { id: "javaLink008c", name: "Iterators and Generics", url: "#" },
      { id: "javaLink008d", name: "Collections Examples", url: "#" },
    ],
  },
  {
    id: "javaSec009",
    title: "File I/O and Serialization 💾",
    details: "5 lectures • 45min",
    isOpen: false,
    links: [
      { id: "javaLink009a", name: "Reading from Files", url: "#" },
      { id: "javaLink009b", name: "Writing to Files", url: "#" },
      { id: "javaLink009c", name: "Object Serialization Guide.pdf", url: "#" },
    ],
  },
  {
    id: "javaSec010",
    title: "PART 2: ADVANCED JAVA & PROJECTS 🚀",
    details: "3 lectures • 15min",
    isOpen: false,
    links: [
      { id: "javaLink010a", name: "Introduction to Threads", url: "#" },
      { id: "javaLink010b", name: "Networking Basics", url: "#" },
      { id: "javaLink010c", name: "Final Project Guidelines.pdf", url: "#" },
    ],
  },
  {
    id: "javaSec011",
    title: "Bonus: Introduction to Lambdas and Streams (Java 8+)",
    details: "6 lectures • 1hr 5min",
    isOpen: false,
    links: [
      {
        id: "javaLink011a",
        name: "Understanding Lambda Expressions",
        url: "#",
      },
      { id: "javaLink011b", name: "Working with Streams API", url: "#" },
      {
        id: "javaLink011c",
        name: "Functional Programming Concepts.pdf",
        url: "#",
      },
    ],
  },
];
