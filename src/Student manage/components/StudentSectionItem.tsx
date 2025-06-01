import React from "react";
import { ChevronDown, ChevronRight, Book, FileCode, File as FilePdf, FileImage, File } from "lucide-react";
import { Section, LinkItem } from "./sectionsData";

interface StudentSectionItemProps {
  section: Section;
  onToggle: (sectionId: string) => void;
  isFirst?: boolean;
}

const StudentSectionItem: React.FC<StudentSectionItemProps> = ({
  section,
  onToggle,
  isFirst = false,
}) => {
  const getLinkIcon = (link: LinkItem) => {
    const fileName = link.name.toLowerCase();
    const url = link.url.toLowerCase();

    if (fileName.endsWith(".pdf") || url.endsWith(".pdf")) {
      return <FilePdf size={16} className="text-red-500 mr-2 flex-shrink-0" />;
    } else if (
      fileName.endsWith(".jpg") ||
      fileName.endsWith(".png") ||
      fileName.endsWith(".gif") ||
      url.endsWith(".jpg") ||
      url.endsWith(".png") ||
      url.endsWith(".gif")
    ) {
      return <FileImage size={16} className="text-purple-500 mr-2 flex-shrink-0" />;
    } else if (
      fileName.endsWith(".js") ||
      fileName.endsWith(".html") ||
      fileName.endsWith(".css") ||
      url.endsWith(".js") ||
      url.endsWith(".html") ||
      url.endsWith(".css")
    ) {
      return <FileCode size={16} className="text-yellow-500 mr-2 flex-shrink-0" />;
    } else if (fileName.includes("lecture") || fileName.includes("chapter")) {
      return <Book size={16} className="text-emerald-500 mr-2 flex-shrink-0" />;
    } else {
      return <File size={16} className="text-blue-500 mr-2 flex-shrink-0" />;
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 ease-in-out ${
        isFirst ? "ring-2 ring-blue-100" : ""
      }`}
    >
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors duration-200"
        onClick={() => onToggle(section.id)}
      >
        <div className="flex items-center flex-1 min-w-0">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 transition-colors duration-300 ${
              section.isOpen
                ? "bg-blue-100 text-blue-600"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {section.isOpen ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-800 truncate">
              {section.title}
            </h3>
            <p className="text-sm text-slate-500">{section.details}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              section.links.length > 0
                ? "bg-blue-50 text-blue-600"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {section.links.length} resource
            {section.links.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {section.isOpen && (
        <div className="border-t border-slate-100 animate-fadeIn">
          <div className="p-4 bg-slate-50">
            {section.links.length > 0 ? (
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li
                    key={link.id}
                    className="flex items-center text-sm bg-white p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 group"
                  >
                    {getLinkIcon(link)}
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 truncate flex-1 group-hover:underline"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500 text-center py-3">
                No resources available in this section yet.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSectionItem;