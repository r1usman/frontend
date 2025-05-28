// PythonCourse/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import HomePage from './pages/HomePage';
import TopicPage from './pages/TopicPage';
import SearchPage from './pages/SearchPage';
import BookmarksPage from './pages/BookmarksPage';
import { PythonTopicProvider } from './contexts/PythonTopicContext';
import { BookmarkProvider } from './contexts/BookmarkContext';

function PythonCourse() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <PythonTopicProvider>
      <BookmarkProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          
          <div className="flex flex-1 relative">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            
            <main className="flex-1 p-4 lg:p-8 transition-all duration-300 lg:ml-[280px]">
              <div className="">
                {/* Nested routes should work now */}
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/topic/:topicId" element={<TopicPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/bookmarks" element={<BookmarksPage />} />
                </Routes>
              </div>
            </main>
          </div>

        </div>
      </BookmarkProvider>
    </PythonTopicProvider>
  );
}

export default PythonCourse;
