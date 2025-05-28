import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  FileText,
  Link as LinkIcon,
} from "lucide-react";

// Helper function to generate unique IDs
const generateId = () => crypto.randomUUID();

const initialSectionsData = [
  {
    id: generateId(),
    title: "Welcome, Welcome, Welcome!",
    details: "5 lectures • 31min",
    isOpen: false,
    links: [
      { id: generateId(), name: "Introduction Video", url: "#" },
      { id: generateId(), name: "Course Overview.pdf", url: "#" },
    ],
  },
  {
    id: generateId(),
    title: "PART 1: REACT FUNDAMENTALS [4 PROJECTS]",
    details: "2 lectures • 1min",
    isOpen: false,
    links: [{ id: generateId(), name: "Project Guidelines", url: "#" }],
  },
  {
    id: generateId(),
    title: "A First Look at React",
    details: "9 lectures • 1hr 15min",
    isOpen: false,
    links: [],
  },
];

// SectionItem Component
function SectionItem({ section, onToggle, onAddLink }) {
  const [newLinkName, setNewLinkName] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");

  const handleAddLink = (e) => {
    e.preventDefault();
    if (newLinkName.trim() && newLinkUrl.trim()) {
      onAddLink(section.id, newLinkName, newLinkUrl);
      setNewLinkName("");
      setNewLinkUrl("");
    } else {
      // Basic validation feedback - in a real app, use a more robust system
      alert("Link name and URL cannot be empty.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-3 transition-all duration-300 ease-in-out">
      {/* Section Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 rounded-t-lg"
        onClick={() => onToggle(section.id)}
      >
        <div className="flex items-center">
          {section.isOpen ? (
            <ChevronDown size={20} className="text-blue-600 mr-3" />
          ) : (
            <ChevronRight size={20} className="text-gray-500 mr-3" />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {section.title}
            </h3>
            <p className="text-sm text-gray-500">{section.details}</p>
          </div>
        </div>
        <span className="text-xs text-gray-400 select-none">
          {section.links.length} link(s)
        </span>
      </div>

      {/* Section Content (Links and Add Link Form) */}
      {section.isOpen && (
        <div className="border-t border-gray-200 p-4 transition-all duration-500 ease-in-out">
          {section.links.length > 0 ? (
            <ul className="space-y-2 mb-4">
              {section.links.map((link) => (
                <li key={link.id} className="flex items-center text-sm">
                  <FileText
                    size={16}
                    className="text-blue-500 mr-2 flex-shrink-0"
                  />
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline hover:text-blue-800 break-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 mb-4">
              No links added to this section yet.
            </p>
          )}

          {/* Add Link Form */}
          <form
            onSubmit={handleAddLink}
            className="space-y-3 bg-gray-50 p-3 rounded-md"
          >
            <h4 className="text-sm font-semibold text-gray-700">
              Add New Link
            </h4>
            <div>
              <label
                htmlFor={`linkName-${section.id}`}
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Link Name / Description
              </label>
              <input
                type="text"
                id={`linkName-${section.id}`}
                value={newLinkName}
                onChange={(e) => setNewLinkName(e.target.value)}
                placeholder="e.g., Chapter 1 Slides"
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor={`linkUrl-${section.id}`}
                className="block text-xs font-medium text-gray-600 mb-1"
              >
                Link URL
              </label>
              <input
                type="url"
                id={`linkUrl-${section.id}`}
                value={newLinkUrl}
                onChange={(e) => setNewLinkUrl(e.target.value)}
                placeholder="https://example.com/file.pdf"
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <LinkIcon size={16} className="mr-2" />
              Add Link
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// Main App Component
export default function App() {
  const [sections, setSections] = useState(initialSectionsData);
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newSectionDetails, setNewSectionDetails] = useState("");
  const [areAllSectionsOpen, setAreAllSectionsOpen] = useState(false);

  // Effect to check if all sections are open
  useEffect(() => {
    if (sections.length > 0) {
      setAreAllSectionsOpen(sections.every((s) => s.isOpen));
    } else {
      setAreAllSectionsOpen(false);
    }
  }, [sections]);

  const handleToggleSection = (sectionId) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? { ...section, isOpen: !section.isOpen }
          : section
      )
    );
  };

  const handleAddLinkToSection = (sectionId, linkName, linkUrl) => {
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
  };

  const handleAddNewSection = (e) => {
    e.preventDefault();
    if (newSectionTitle.trim()) {
      const newSection = {
        id: generateId(),
        title: newSectionTitle,
        details: newSectionDetails,
        isOpen: false, // New sections are closed by default
        links: [],
      };
      setSections((prevSections) => [newSection, ...prevSections]); // Add to the beginning
      setNewSectionTitle("");
      setNewSectionDetails("");
    } else {
      alert("Section title cannot be empty.");
    }
  };

  const handleToggleAllSections = () => {
    const nextState = !areAllSectionsOpen;
    setSections(sections.map((s) => ({ ...s, isOpen: nextState })));
    setAreAllSectionsOpen(nextState);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Course Content
          </h1>
          <p className="text-gray-600">
            Manage your course sections and linked resources.
          </p>
        </header>

        {/* Add New Section Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Create New Section
          </h2>
          <form onSubmit={handleAddNewSection} className="space-y-4">
            <div>
              <label
                htmlFor="newSectionTitle"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Section Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="newSectionTitle"
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
                placeholder="e.g., Introduction to Advanced Topics"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="newSectionDetails"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Section Details (Optional)
              </label>
              <input
                type="text"
                id="newSectionDetails"
                value={newSectionDetails}
                onChange={(e) => setNewSectionDetails(e.target.value)}
                placeholder="e.g., 10 lectures • 2hr 30min"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              <Plus size={20} className="mr-2" />
              Add Section
            </button>
          </form>
        </div>

        {/* Controls and Sections List */}
        {sections.length > 0 && (
          <div className="mb-6 flex justify-end">
            <button
              onClick={handleToggleAllSections}
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {areAllSectionsOpen
                ? "Collapse All Sections"
                : "Expand All Sections"}
            </button>
          </div>
        )}

        {sections.length > 0 ? (
          <div>
            {sections.map((section) => (
              <SectionItem
                key={section.id}
                section={section}
                onToggle={handleToggleSection}
                onAddLink={handleAddLinkToSection}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">
              No Sections Yet
            </h3>
            <p className="text-gray-500">
              Start by adding a new section using the form above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
