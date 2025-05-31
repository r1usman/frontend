import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Link as LinkIcon,
  UploadCloud,
  Book,
  FileCode,
  File as FilePdf,
  FileImage,
  File,
  Plus,
} from "lucide-react";
import { Section, LinkItem } from "./sectionsData";

interface SectionItemProps {
  section: Section;
  onToggle: (sectionId: string) => void;
  onAddLink: (sectionId: string, linkName: string, linkUrl: string) => void;
  isFirst?: boolean;
  setGlobalAlert: (message: string, type?: "error" | "info") => void;
}

const SectionItem: React.FC<SectionItemProps> = ({
  section,
  onToggle,
  onAddLink,
  isFirst = false,
  setGlobalAlert,
}) => {
  const [newLinkName, setNewLinkName] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAddingResource, setIsAddingResource] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newLinkName.trim()) {
      setGlobalAlert("Resource name cannot be empty.");
      return;
    }

    setIsUploading(true);

    try {
      let finalLinkUrl = newLinkUrl;
      let linkName = newLinkName;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await fetch("http://localhost:3000/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          let errorMsg = "File upload failed";
          try {
            const errorData = await response.json();
            errorMsg = errorData.message || errorMsg;
          } catch (jsonError) {
            errorMsg = response.statusText || errorMsg;
          }
          throw new Error(`${response.status}: ${errorMsg}`);
        }

        const result = await response.json();

        if (!result || !result.url) {
          throw new Error(
            "Filename (url property) not found in upload response."
          );
        }

        finalLinkUrl = `${result.url}`;
        linkName = newLinkName || selectedFile.name;
      } else if (!newLinkUrl.trim()) {
        setGlobalAlert("Link URL cannot be empty if no file is selected.");
        setIsUploading(false);
        return;
      }

      onAddLink(section.id, linkName, finalLinkUrl);
      setNewLinkName("");
      setNewLinkUrl("");
      setSelectedFile(null);
      setIsAddingResource(false);

      const fileInput = document.getElementById(`file-input-${section.id}`);
      if (fileInput) {
        (fileInput as HTMLInputElement).value = "";
      }
    } catch (error) {
      console.error("Error in handleAddLink:", error);
      setGlobalAlert(`An error occurred: ${(error as Error).message}`);
    } finally {
      setIsUploading(false);
    }
  };

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
      return (
        <FileImage size={16} className="text-purple-500 mr-2 flex-shrink-0" />
      );
    } else if (
      fileName.endsWith(".js") ||
      fileName.endsWith(".html") ||
      fileName.endsWith(".css") ||
      url.endsWith(".js") ||
      url.endsWith(".html") ||
      url.endsWith(".css")
    ) {
      return (
        <FileCode size={16} className="text-yellow-500 mr-2 flex-shrink-0" />
      );
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
                    className="flex items-center text-sm bg-white p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 group"
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
                No resources added to this section yet.
              </p>
            )}
          </div>

          <div className="p-3 border-t border-slate-100 flex justify-center">
            <button
              onClick={() => setIsAddingResource(!isAddingResource)}
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
                isAddingResource
                  ? "bg-slate-200 text-slate-700"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
              } flex items-center`}
            >
              {isAddingResource ? (
                <>Hide Form</>
              ) : (
                <>
                  <Plus size={16} className="mr-1.5" />
                  Add Resource
                </>
              )}
            </button>
          </div>

          {isAddingResource && (
            <div className="p-4 bg-slate-50 border-t border-slate-100 animate-slideDown">
              <form onSubmit={handleAddLink} className="space-y-4">
                <div>
                  <label
                    htmlFor={`linkName-${section.id}`}
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Resource Name / Description{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id={`linkName-${section.id}`}
                    value={newLinkName}
                    onChange={(e) => setNewLinkName(e.target.value)}
                    placeholder="e.g., Chapter 1 Slides"
                    className="w-full p-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`file-input-${section.id}`}
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Upload File (Optional)
                  </label>
                  <div className="mt-1 border-2 border-slate-200 border-dashed rounded-lg bg-white">
                    <div className="p-4 text-center">
                      <UploadCloud className="mx-auto h-10 w-10 text-slate-400" />
                      <div className="mt-2">
                        <label
                          htmlFor={`file-input-${section.id}`}
                          className="relative cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id={`file-input-${section.id}`}
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <span className="text-sm text-slate-500">
                          {" "}
                          or drag and drop
                        </span>
                      </div>
                      {selectedFile ? (
                        <p className="mt-1 text-xs text-slate-500 bg-blue-50 py-1 px-2 rounded inline-block">
                          {selectedFile.name}
                        </p>
                      ) : (
                        <p className="mt-1 text-xs text-slate-500">
                          PNG, JPG, PDF, etc.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="relative flex items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-3 text-xs text-slate-400">
                    OR
                  </span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <div>
                  <label
                    htmlFor={`linkUrl-${section.id}`}
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Enter Link URL (if not uploading file)
                  </label>
                  <input
                    type="url"
                    id={`linkUrl-${section.id}`}
                    value={newLinkUrl}
                    onChange={(e) => setNewLinkUrl(e.target.value)}
                    placeholder="https://example.com/resource"
                    className="w-full p-2 border border-slate-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    disabled={!!selectedFile}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {isUploading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <LinkIcon size={16} className="mr-2" />
                      Add Resource
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionItem;
