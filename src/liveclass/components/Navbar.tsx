import { GraduationCap as Graduation } from "lucide-react";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Graduation className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">
              EduConnect
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
