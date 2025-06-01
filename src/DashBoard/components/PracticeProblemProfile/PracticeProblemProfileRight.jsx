import React from 'react';

export default function PracticeProblemProfileRight() {
  return (
    <div className="space-y-6">
      {/* Community Stats */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Community Stats</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <span className="text-gray-700">Views</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-purple-600">1.2K</div>
              <div className="text-xs text-gray-500">Last week 245</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <span className="text-gray-700">Solution</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">Last week 0</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"/>
                </svg>
              </div>
              <span className="text-gray-700">Discuss</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">Last week 0</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <span className="text-gray-700">Reputation</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">Last week 0</div>
            </div>
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Languages</h2>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-3">Python</span>
              <span className="text-sm text-gray-600">Advanced</span>
            </div>
            <span className="text-blue-600 font-medium">124 solved</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-3">JavaScript</span>
              <span className="text-sm text-gray-600">Intermediate</span>
            </div>
            <span className="text-purple-600 font-medium">86 solved</span>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Skills</h2>
        <div className="text-sm text-gray-500">No skills to show</div>
      </div>
    </div>
  );
}