import React, { useState, useEffect } from "react";
import { initialSectionsData } from "./sectionsData";
import StudentSectionItem from "../contentbox/StudentSectionItem";
import { FileText, ChevronDown, ChevronUp } from "lucide-react";

const StudentCourseContent: React.FC = () => {
  const [sections, setSections] = useState(initialSectionsData);
  const [areAllSectionsOpen, setAreAllSectionsOpen] = useState(false);

  useEffect(() => {
    if (sections.length > 0) {
      setAreAllSectionsOpen(sections.every((s) => s.isOpen));
    } else {
      setAreAllSectionsOpen(false);
    }
  }, [sections]);

  const handleToggleSection = (sectionId: string) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? { ...section, isOpen: !section.isOpen }
          : section
      )
    );
  };

  const handleToggleAllSections = () => {
    const nextState = !areAllSectionsOpen;
    setSections(sections.map((s) => ({ ...s, isOpen: nextState })));
  };

  return (
    <div className="h-full flex flex-col font-sans animate-fadeIn">
      <header className="mb-6 bg-white rounded-xl px-6 pt-6 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Course Materials
            </h1>
            <p className="text-slate-500 text-sm">
              Access all your course resources and materials
            </p>
          </div>
          <button
            onClick={handleToggleAllSections}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-300 ease-in-out flex items-center justify-center"
          >
            {areAllSectionsOpen ? (
              <>
                <ChevronUp size={18} className="mr-1.5" />
                Collapse All
              </>
            ) : (
              <>
                <ChevronDown size={18} className="mr-1.5" />
                Expand All
              </>
            )}
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 min-h-0 overflow-y-auto rounded-xl bg-white shadow-sm border border-slate-100">
          {sections.length > 0 ? (
            <div className="p-4 space-y-4">
              {sections.map((section, index) => (
                <StudentSectionItem
                  key={section.id}
                  section={section}
                  onToggle={handleToggleSection}
                  isFirst={index === 0}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 animate-pulse">
              <FileText size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-semibold text-slate-700">
                No Content Available
              </h3>
              <p className="text-slate-500">
                No course materials have been added yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCourseContent;
