import React from 'react';
import { BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                  Your Learning Journey Starts Here
                </h1>
                <p className="text-lg text-indigo-100 mb-8 max-w-lg">
                  Access your courses, track your progress, and connect with instructors - all in one place. Designed for both students and educators.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/student"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-colors duration-200"
                  >
                    Student Dashboard
                  </Link>
                  <Link
                    to="/instructor"
                    className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-600 transition-colors duration-200"
                  >
                    Instructor Dashboard
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2 mt-10 lg:mt-0">
                <img
                  src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Learning Platform"
                  className="rounded-lg shadow-xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Tools for Learning</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform provides everything you need to succeed in your educational journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-md transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-6">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Course Management</h3>
                <p className="text-gray-600">
                  Easily manage your courses, track progress, and access learning materials.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-md transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-6">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path d="M12 14l-6.16-3.422a12.083 12.083 0 01.665-6.479A11.952 11.952 0 0112 1.055c2.572 0 5.008.7 7.065 1.912a12.083 12.083 0 01.665 6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Instructor Tools</h3>
                <p className="text-gray-600">
                  Powerful tools for instructors to create, manage, and track student progress.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-md transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-6">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Learning</h3>
                <p className="text-gray-600">
                  Connect with other students and instructors to enhance your learning experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-indigo-50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Access your dashboard now to manage your courses and continue your learning journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/student"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
              >
                Student Dashboard
              </Link>
              <Link
                to="/instructor"
                className="inline-flex items-center justify-center px-6 py-3 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-colors duration-200"
              >
                Instructor Dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;