import React from 'react';
import { ArrowRight, Book, Code, Terminal, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePythonTopics } from '../contexts/PythonTopicContext';

const HomePage = () => {
  const { topics, loading } = usePythonTopics();
  
  const featuredTopics = [
    { id: 'intro', title: 'Python Introduction', icon: <Book size={24} /> },
    { id: 'syntax', title: 'Python Syntax', icon: <Code size={24} /> },
    { id: 'variables', title: 'Python Variables', icon: <Terminal size={24} /> },
  ];

  return (
    <div className="space-y-12 pb-12 animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl overflow-hidden shadow-xl">
        <div className="p-12 md:p-16 max-w-screen-xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">Python Learning Hub</h1>
          <p className="text-lg md:text-xl mb-6 max-w-3xl">
            Your comprehensive resource for learning Python programming from beginner to advanced levels. Start your coding journey now!
          </p>
          <div className="flex gap-6">
            <Link 
              to="/0/topic/intro" 
              className="bg-[#FFD43B] text-python-dark font-semibold px-8 py-4 rounded-xl hover:bg-yellow-300 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl"
            >
              Start Learning <ArrowRight size={18} />
            </Link>
            <a 
              href="https://www.python.org/downloads/" 
              target="_blank"
              rel="noopener noreferrer"
              className="  backdrop-blur-sm px-8 py-4 rounded-xl bg-white/30 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl"
            >
              Download Python <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </section>
      
      {/* Featured Topics */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-python-dark">Get Started with Python</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredTopics.map(topic => (
            <Link 
              key={topic.id}
              to={`/0/topic/${topic.id}`}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 group hover:bg-gray-100"
            >
              <div className="bg-python-blue/10 text-python-blue rounded-full w-16 h-16 flex items-center justify-center mb-6">
                {topic.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-python-dark group-hover:text-python-blue transition-colors">
                {topic.title}
              </h3>
              <p className="text-gray-600 mb-6">
                Learn the basics of {topic.title.toLowerCase()} and start your Python journey.
              </p>
              <div className="flex items-center text-python-blue font-medium">
                Explore topic <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Browse All Topics */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-python-dark">Browse All Python Topics</h2>
        
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-python-blue"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.slice(0, 9).map(category => (
              <div key={category.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-python-dark">{category.title}</h3>
                <ul className="space-y-2">
                  {category.subtopics?.slice(0, 4).map(topic => (
                    <li key={topic.id}>
                      <Link 
                        to={`/0/topic/${topic.id}`}
                        className="text-gray-700 hover:text-python-blue flex items-center"
                      >
                        <ArrowRight size={14} className="mr-2" /> {topic.title}
                      </Link>
                    </li>
                  ))}
                  {(category.subtopics?.length || 0) > 4 && (
                    <li className="text-sm text-python-blue font-medium mt-3">
                      <Link to={`/0/topic/${category.subtopics?.[0].id}`}>
                        View all topics...
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
      
      {/* Why Python */}
      <section className="bg-gray-50 p-8 rounded-xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-python-dark">Why Learn Python?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-python-dark">Easy to Learn</h3>
            <p className="text-gray-700">
              Python has a simple syntax similar to the English language. It's designed to be readable and straightforward, making it perfect for beginners.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-python-dark">Versatile</h3>
            <p className="text-gray-700">
              Python is used in web development, data science, AI, machine learning, automation, scientific computing, and more.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-python-dark">High Demand</h3>
            <p className="text-gray-700">
              Python developers are among the highest-paid programmers, with abundant job opportunities across industries.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-python-dark">Strong Community</h3>
            <p className="text-gray-700">
              Python has a vast community that contributes to its libraries and frameworks, making development faster and easier.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
