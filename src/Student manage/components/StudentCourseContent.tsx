import React, { useState, useEffect } from "react";
import { initialSectionsData } from "./sectionsData";
import StudentSectionItem from "./StudentSectionItem";
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

  return (
    <div className=" bg-gradient-to-br from-slate-50 to-slate-100  ">
      <div className=" mx-auto h-96">
        <div className="h-full flex flex-col font-sans animate-fadeIn">
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
      </div>
    </div>
  );
};

export default StudentCourseContent;
