import React from "react";
import { Code2 } from "lucide-react";
import { Link } from "react-router";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b  z-10 border-gray-100 pl-72">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Code2 size={32} className="text-indigo-600" />
            <div>
              <Link to="/dash">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Code Ascend
                </h1>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-indigo-600 font-medium">CA</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
