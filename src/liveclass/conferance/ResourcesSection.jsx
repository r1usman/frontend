import React from "react";
import { FileAudio, ExternalLink, Calendar, Mic } from "lucide-react";
import { useResources } from "./ResourcesContext";

function ResourcesSection({ isDarkMode = true }) {
  const { resources } = useResources();

  if (resources.length === 0) {
    return (
      <div
        className={`${
          isDarkMode
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-200"
        } rounded-lg p-4 border`}
      >
        <div className="flex items-center space-x-3 mb-4">
          <FileAudio
            className={`w-6 h-6 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          />
          <h3
            className={`text-sm font-medium ${
              isDarkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Course Resources
          </h3>
        </div>
        <p
          className={`${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          } text-center py-8`}
        >
          No resources available yet
        </p>
      </div>
    );
  }

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      } rounded-lg p-4 border`}
    >
      <div className="flex items-center space-x-3 mb-4">
        <FileAudio
          className={`w-6 h-6 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        />
        <h3
          className={`text-sm font-medium ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Course Resources
        </h3>
        <span
          className={`${
            isDarkMode
              ? "bg-gray-800 text-gray-300"
              : "bg-gray-100 text-gray-700"
          } px-2 py-1 rounded-full text-xs`}
        >
          {resources.length}
        </span>
      </div>

      <div className="space-y-3">
        {resources.map((resource, index) => (
          <div
            key={index}
            className={`${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700 border-gray-800"
                : "bg-gray-50 hover:bg-gray-100 border-gray-200"
            } rounded-lg p-3 transition-colors duration-200 border`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  {resource.title.includes("Conference Recording") ? (
                    <Mic
                      className={`w-4 h-4 ${
                        isDarkMode ? "text-red-400" : "text-red-500"
                      }`}
                    />
                  ) : (
                    <FileAudio
                      className={`w-4 h-4 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                  )}
                  <h4
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {resource.title}
                  </h4>
                </div>
                <div
                  className={`flex items-center space-x-4 text-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Added {new Date(resource.timestamp).toLocaleTimeString()}
                    </span>
                  </span>
                </div>
              </div>

              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 ${
                  isDarkMode
                    ? "bg-gray-100 hover:bg-white text-gray-900"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                } px-3 py-2 rounded-lg transition-colors duration-200 text-xs`}
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourcesSection;
