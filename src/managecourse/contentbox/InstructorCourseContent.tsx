import React, { useState, useEffect } from "react";
import { initialSectionsData } from "./sectionsData";
import SectionItem from "./SectionItem";
import CustomAlert from "./CustomAlert";
import AddSectionForm from "./AddSectionForm";
import { Plus, FileText, ChevronDown, ChevronUp } from "lucide-react";

const generateId = () => crypto.randomUUID();

const CourseContent: React.FC = () => {
  const [sections, setSections] = useState(initialSectionsData);
  const [areAllSectionsOpen, setAreAllSectionsOpen] = useState(false);
  const [globalAlertMessage, setGlobalAlertMessage] = useState("");
  const [globalAlertType, setGlobalAlertType] = useState<"error" | "info">(
    "error"
  );
  const [addSectionOpen, setAddSectionOpen] = useState(false);

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

  const handleAddLinkToSection = (
    sectionId: string,
    linkName: string,
    linkUrl: string
  ) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              links: [
                ...section.links,
                { id: generateId(), name: linkName, url: linkUrl },
              ],
            }
          : section
      )
    );

    setGlobalAlertMessage("Resource added successfully!");
    setGlobalAlertType("info");

    setTimeout(() => {
      setGlobalAlertMessage("");
    }, 3000);
  };

  const handleAddNewSection = (title: string, details: string) => {
    if (title.trim()) {
      const newSection = {
        id: generateId(),
        title: title,
        details: details,
        isOpen: true,
        links: [],
      };

      setSections((prevSections) => [newSection, ...prevSections]);
      setAddSectionOpen(false);

      setGlobalAlertMessage("Section created successfully!");
      setGlobalAlertType("info");

      setTimeout(() => {
        setGlobalAlertMessage("");
      }, 3000);

      return true;
    } else {
      setGlobalAlertMessage("Section title cannot be empty.");
      setGlobalAlertType("error");
      return false;
    }
  };

  const handleToggleAllSections = () => {
    const nextState = !areAllSectionsOpen;
    setSections(sections.map((s) => ({ ...s, isOpen: nextState })));
  };

  return (
    <div className="h-full flex flex-col font-sans animate-fadeIn">
      <CustomAlert
        message={globalAlertMessage}
        type={globalAlertType}
        onClose={() => setGlobalAlertMessage("")}
      />

      {/* <header className="mb-6 bg-white rounded-xl px-6 pt-6 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Course Content
            </h1>
          </div>
          <button
            onClick={() => setAddSectionOpen(!addSectionOpen)}
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out flex items-center justify-center shadow-md hover:shadow-lg"
          >
            <Plus size={18} className="mr-1.5" />
            {addSectionOpen ? "Hide Form" : "Add Section"}
          </button>
        </div>
      </header> */}

      {addSectionOpen && (
        <div className="mb-6 animate-slideDown">
          <AddSectionForm onAddSection={handleAddNewSection} />
        </div>
      )}

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 min-h-0 overflow-y-auto rounded-xl bg-white shadow-sm border border-slate-100">
          {sections.length > 0 ? (
            <div className="p-4 space-y-4">
              {sections.map((section, index) => (
                <SectionItem
                  key={section.id}
                  section={section}
                  onToggle={handleToggleSection}
                  onAddLink={handleAddLinkToSection}
                  isFirst={index === 0}
                  setGlobalAlert={(
                    message: string,
                    type: "error" | "info" = "error"
                  ) => {
                    setGlobalAlertMessage(message);
                    setGlobalAlertType(type);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 animate-pulse">
              <FileText size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-semibold text-slate-700">
                No Sections Yet
              </h3>
              <p className="text-slate-500">
                Start by adding a new section using the button above.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
