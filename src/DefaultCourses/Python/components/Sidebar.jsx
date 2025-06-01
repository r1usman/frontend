import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, X , ChevronLeft } from 'lucide-react';
import { usePythonTopics } from '../contexts/PythonTopicContext';


const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { topics, loading } = usePythonTopics();
  const [expandedCategories, setExpandedCategories] = useState({});
  const navigate = useNavigate()

  // Auto-expand category of active topic
  useEffect(() => {
    if (topics.length > 0) {
      const currentPath = location.pathname;
      const pathParts = currentPath.split('/');
      const currentTopicId = pathParts[pathParts.length - 1];

      // Find the category that contains the current topic
      topics.forEach(category => {
        if (category.subtopics && category.subtopics.some(topic => topic.id === currentTopicId)) {
          setExpandedCategories(prev => ({ ...prev, [category.id]: true }));
        }
      });
    }
  }, [topics, location.pathname]);

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
      
      setScrollPosition(window.scrollY); 
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const HandleClick = ()=>{
    navigate("/Dash")
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-[280px] z-30 shadow-lg transform transition-transform duration-300 pt-16 lg:pt-[72px] ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        <div className={`$ absolute top-3 left-3  flex  items-center gap-4  `} onClick={HandleClick}> 
            {/* <div className='border rounded-full border-amber-500 p-2 text-amber-500 ring-2 hover:bg-white'> <ChevronLeft size={20} /></div> */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 bg-white text-black rounded-full flex items-center justify-center">
              <span className="text-python-blue text-xl font-bold">Py</span>
            </div>
            <h1 className="text-xl font-bold hidden sm:block">Python</h1>
          </Link>
        
        </div>
      

        <div className="p-4 h-full overflow-y-auto">
          <h2 className="text-lg font-bold text-python-blue mb-4">Python Topics</h2>

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-python-blue"></div>
            </div>
          ) : (
            <nav>
              <ul className="space-y-1">
                {topics.map(category => (
                  <li key={category.id} className="animate-fade-in">
                    <div
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <span className="font-medium">{category.title}</span>
                      {expandedCategories[category.id] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </div>

                    {expandedCategories[category.id] && category.subtopics && (
                      <ul className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-2">
                        {category.subtopics.map(topic => (
                          <li key={topic.id} className="animate-slide-in">
                            <NavLink
                              to={`/0/topic/${topic.id}`}
                              className={({ isActive }) =>
                                `block p-2 rounded-md hover:bg-gray-100 ${
                                  isActive ? 'text-[#1368EC] bg-gradient-to-r from-blue-50/40 to-blue-100/50 border-r-4 border-[##1368EC]' : ''
                                }`
                              }
                              onClick={() => window.innerWidth < 1024 && onClose()}
                            >
                              {topic.title}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
