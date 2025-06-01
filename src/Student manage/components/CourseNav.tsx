import React from "react";
import { BookOpen, FileText, PieChart, Award } from "lucide-react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

interface CourseNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const CourseNav: React.FC<CourseNavProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const navItems: NavItem[] = [
    {
      icon: <BookOpen size={20} />,
      label: "Content",
      active: activeSection === "content",
    },
    {
      icon: <FileText size={20} />,
      label: "Assignments",
      active: activeSection === "assignments",
    },
    {
      icon: <PieChart size={20} />,
      label: "Tests",
      active: activeSection === "tests",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-2 mb-6 flex overflow-x-auto">
      {navItems.map((item, index) => (
        <button
          key={index}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md flex-1 justify-center transition-all duration-200 ${
            item.active
              ? "bg-indigo-600 text-white"
              : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
          }`}
          onClick={() => onSectionChange(item.label.toLowerCase())}
        >
          <span className="hidden sm:block">{item.icon}</span>
          <span className="font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CourseNav;
