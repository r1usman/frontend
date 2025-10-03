import React from "react";
import { FileAudio, ExternalLink, Calendar } from "lucide-react";
import { useResources } from "./ResourcesContext";

function ResourcesSection() {
  const { resources } = useResources();

  if (resources.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
        <div className="flex items-center space-x-3 mb-4">
          <FileAudio className="w-6 h-6 text-gray-300" />
          <h3 className="text-sm font-medium text-gray-100">
            Course Resources
          </h3>
        </div>
        <p className="text-gray-400 text-center py-8">
          No resources available yet
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
      <div className="flex items-center space-x-3 mb-4">
        <FileAudio className="w-6 h-6 text-gray-300" />
        <h3 className="text-sm font-medium text-gray-100">Course Resources</h3>
        <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded-full text-xs">
          {resources.length}
        </span>
      </div>

      <div className="space-y-3">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors duration-200 border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-gray-100 text-sm font-medium mb-1">
                  {resource.title}
                </h4>
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Added {new Date().toLocaleDateString()}</span>
                  </span>
                </div>
              </div>

              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gray-100 hover:bg-white text-gray-900 px-3 py-2 rounded-lg transition-colors duration-200 text-xs"
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
