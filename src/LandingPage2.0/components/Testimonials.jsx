import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      content: "This platform transformed my career. I went from a complete beginner to landing a full-stack developer role in just 8 months. The interactive courses and personalized feedback made all the difference.",
      name: "Alex Chen",
      position: "Full-Stack Developer",
      company: "TechStack Inc",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 5
    },
    {
      id: 2,
      content: "The competition feature pushed me to improve my skills faster than I thought possible. Competing with other learners motivated me to solve more complex problems and think outside the box.",
      name: "Sophia Rodriguez",
      position: "Software Engineer",
      company: "InnovateTech",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 5
    },
    {
      id: 3,
      content: "The AI assistant is like having a personal mentor available 24/7. It helped me debug code, understand complex concepts, and guided me through difficult projects when I got stuck.",
      name: "James Wilson",
      position: "Mobile Developer",
      company: "AppWorks",
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 4
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex(prevIndex => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex(prevIndex => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Success Stories from Our <span className="text-indigo-300">Students</span>
          </h2>
          <p className="text-lg text-indigo-100">
            Hear from learners who have transformed their careers with our platform.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-indigo-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="absolute top-0 left-0 transform -translate-y-1/2 translate-x-8">
              <div className="text-6xl md:text-8xl font-serif text-indigo-300 opacity-30">"</div>
            </div>

            <div className="mb-8">
              <p className="text-xl md:text-2xl leading-relaxed text-indigo-50 italic">
                {testimonials[activeIndex].content}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-300 mr-4">
                  <img 
                    src={testimonials[activeIndex].avatar} 
                    alt={testimonials[activeIndex].name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">{testimonials[activeIndex].name}</h4>
                  <p className="text-indigo-300">{testimonials[activeIndex].position}</p>
                  <p className="text-indigo-200 text-sm">{testimonials[activeIndex].company}</p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < testimonials[activeIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-indigo-300'}`} 
                    />
                  ))}
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full bg-indigo-700 hover:bg-indigo-600 flex items-center justify-center transition-colors duration-300"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-indigo-700 hover:bg-indigo-600 flex items-center justify-center transition-colors duration-300"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === activeIndex ? 'bg-indigo-300' : 'bg-indigo-700'
                  }`}
                ></button>
              ))}
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "10,000+", label: "Active Students" },
              { number: "95%", label: "Success Rate" },
              { number: "500+", label: "Hiring Partners" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-indigo-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
