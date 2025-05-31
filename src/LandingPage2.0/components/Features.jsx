import React from 'react';
import { Code, Award, Users, Brain, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const FeatureCard = ({ icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-slate-100 hover:scale-105"
  >
    <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </motion.div>
);

const Features = () => {
  const features = [
    {
      icon: <Code className="h-6 w-6 text-indigo-600" />,
      title: "Interactive Courses",
      description: "Learn by doing with our interactive coding exercises and real-time feedback to master programming concepts."
    },
    {
      icon: <Award className="h-6 w-6 text-indigo-600" />,
      title: "Coding Competitions",
      description: "Test your skills against peers in weekly challenges and climb the leaderboard to showcase your expertise."
    },
    {
      icon: <Users className="h-6 w-6 text-indigo-600" />,
      title: "Team Collaboration",
      description: "Work on projects with fellow learners in collaborative coding environments with version control."
    },
    {
      icon: <Brain className="h-6 w-6 text-indigo-600" />,
      title: "Personalized Learning",
      description: "Our AI adapts to your learning style and pace, creating a custom curriculum just for you."
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Features Designed for <span className="text-indigo-600">Modern Learners</span>
          </h2>
          <p className="text-lg text-slate-600">
            Our platform combines cutting-edge technology with proven learning methodologies to help you master coding efficiently.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>

        <AnimatedSection className="mt-16" delay={0.4}>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-2xl md:text-3xl font-bold text-white mb-4"
                >
                  What Sets Us Apart
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-indigo-100 mb-6"
                >
                  Our platform is built by developers for developers, focusing on practical skills that employers actually value.
                </motion.p>
                <ul className="space-y-3">
                  {[
                    "Industry-relevant curriculum updated monthly",
                    "AI-powered code reviews and suggestions",
                    "1-on-1 mentorship with experienced developers",
                    "Project-based learning with real-world applications"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="flex items-start"
                    >
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3">
                        <Check className="h-4 w-4 text-white" />
                      </span>
                      <span className="text-white">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="bg-indigo-900 p-8 md:p-12 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-indigo-800 rounded-xl p-6 max-w-md w-full"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="text-sm font-medium text-indigo-200">Your Progress</div>
                      <div className="text-2xl font-bold text-white">87% Complete</div>
                    </div>
                    <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center">
                      <Code className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: "JavaScript Fundamentals", progress: 100 },
                      { name: "React Framework", progress: 80 },
                      { name: "Backend Development", progress: 65 }
                    ].map((course, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      >
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-indigo-100">{course.name}</span>
                          <span className="text-indigo-200">{course.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-indigo-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                            className="bg-gradient-to-r from-blue-400 to-indigo-300 h-full rounded-full"
                          ></motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Features;
