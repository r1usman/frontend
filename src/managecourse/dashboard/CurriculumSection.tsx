import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Edit, 
  Trash, 
  Plus, 
  Video, 
  FileQuestion, 
  FileText,
  MoveVertical,
  MoreVertical
} from 'lucide-react';
import { useCourse } from '../../context/CourseContext';
import type { Section, Lecture } from '../../context/CourseContext';

export const CurriculumSection: React.FC = () => {
  const { course } = useCourse();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'section-1': true
  });

  if (!course) return null;

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const getLectureIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={18} className="text-blue-600" />;
      case 'quiz': return <FileQuestion size={18} className="text-purple-600" />;
      case 'assignment': return <FileText size={18} className="text-orange-600" />;
      default: return <Video size={18} className="text-blue-600" />;
    }
  };

  const formatDuration = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Curriculum</h2>
          <p className="text-sm text-gray-500 mt-1">
            Organize your course content and structure
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center text-sm font-medium">
          <Plus size={16} className="mr-1" /> Add Section
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        {course.sections.map((section: Section) => (
          <div key={section.id} className="border-b border-gray-200 last:border-b-0">
            {/* Section Header */}
            <div 
              className="px-4 py-4 sm:px-6 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {expandedSections[section.id] ? (
                      <ChevronUp size={20} className="text-gray-500" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-500" />
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-base font-medium text-gray-900">{section.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {section.lectures.length} lectures • 
                      {formatDuration(section.lectures.reduce((total, lecture) => total + lecture.duration, 0))}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded">
                    <MoveVertical size={16} />
                  </button>
                  <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded">
                    <Edit size={16} />
                  </button>
                  <button className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-100 rounded">
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Section Content */}
            {expandedSections[section.id] && (
              <div className="divide-y divide-gray-200">
                {section.lectures.map((lecture: Lecture) => (
                  <div key={lecture.id} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {getLectureIcon(lecture.type)}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{lecture.title}</p>
                        <p className="text-xs text-gray-500">
                          {lecture.type.charAt(0).toUpperCase() + lecture.type.slice(1)} • 
                          {formatDuration(lecture.duration)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="px-6 py-3 flex justify-center">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    <Plus size={16} className="mr-1" /> Add Lecture
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-700">
                Total: {course.sections.length} sections • 
                {course.sections.reduce((total, section) => total + section.lectures.length, 0)} lectures • 
                {formatDuration(course.sections.reduce((sectionTotal, section) => 
                  sectionTotal + section.lectures.reduce((lectureTotal, lecture) => 
                    lectureTotal + lecture.duration, 0), 0))}
              </p>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Preview as Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};