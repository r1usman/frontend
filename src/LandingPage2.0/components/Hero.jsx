import React, { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const heroRef = useRef(null);
  const floatingElementRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (floatingElementRef.current && heroRef.current) {
        const { left, top, width, height } =
          heroRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const moveX = (e.clientX - centerX) / 25;
        const moveY = (e.clientY - centerY) / 25;

        floatingElementRef.current.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${
          moveX * 0.5
        }deg)`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative pt-24 pb-16 md:pt-32 md:pb-2 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-indigo-300 to-blue-300 rounded-full mix-blend-multiply blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full mix-blend-multiply blur-2xl"></div>
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[48rem] h-[48rem] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-100 via-white to-transparent rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Master Coding with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-purple-600">
                Interactive Learning
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto md:mx-0">
              Elevate your programming skills with personalized courses,
              competitive challenges, and AI-powered assistance that adapts to
              your learning style.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-purple-600 text-white font-medium rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Start Learning Now
              </button>
              <button className="px-8 py-3 border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors duration-300 flex items-center justify-center">
                Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center md:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center overflow-hidden"
                  >
                    <span className="text-xs font-medium text-indigo-600">
                      U{i}
                    </span>
                  </div>
                ))}
              </div>
              <p className="ml-4 text-sm text-slate-600">
                <span className="font-semibold">5,000+</span> students already
                enrolled
              </p>
            </div>
          </div>

          <div
            ref={floatingElementRef}
            className="relative transition-transform duration-200 ease-out"
          >
            <div className="bg-white/90 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-xl max-w-md mx-auto border border-white/40">
              <div className="rounded-lg overflow-hidden">
                <div className="bg-slate-800 p-3 flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-slate-400 flex-grow text-center">
                    index.js
                  </div>
                </div>
                <div className="bg-slate-900 p-4 text-sm font-mono leading-relaxed">
                  <div className="text-slate-400">
                    // Your personalized coding journey
                  </div>
                  <div>
                    <span className="text-purple-400">function</span>{" "}
                    <span className="text-yellow-300">learnToCode</span>
                    <span className="text-slate-300">()</span>{" "}
                    <span className="text-slate-300">{"{"}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-blue-400">const</span>{" "}
                    <span className="text-green-300">skills</span>{" "}
                    <span className="text-slate-300">=</span>{" "}
                    <span className="text-orange-300">
                      ['JavaScript', 'Python', 'React']
                    </span>
                    ;
                  </div>
                  <div className="pl-4">
                    <span className="text-blue-400">let</span>{" "}
                    <span className="text-green-300">experience</span>{" "}
                    <span className="text-slate-300">=</span>{" "}
                    <span className="text-orange-300">0</span>;
                  </div>
                  <div className="pl-4 text-pink-400">
                    while<span className="text-slate-300">(</span>
                    <span className="text-green-300">experience</span>{" "}
                    <span className="text-slate-300">&lt;</span>{" "}
                    <span className="text-orange-300">100</span>
                    <span className="text-slate-300">)</span>{" "}
                    <span className="text-slate-300">{"{"}</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-green-300">experience</span>
                    <span className="text-slate-300">++;</span>
                  </div>
                  <div className="pl-8">
                    <span className="text-yellow-300">practiceDaily</span>
                    <span className="text-slate-300">();</span>
                  </div>
                  <div className="pl-4 text-slate-300">{"}"}</div>
                  <div className="pl-4">
                    <span className="text-blue-400">return</span>{" "}
                    <span className="text-orange-300">'Job Ready'</span>;
                  </div>
                  <div className="text-slate-300">{"}"}</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <div className="text-xs font-semibold text-indigo-600">
                    Progress
                  </div>
                  <div className="mt-1 w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-xs font-semibold text-purple-600">
                    AI Assistance
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <div className="text-purple-600 text-sm font-medium">
                      Active
                    </div>
                    <div className="h-2 w-2 bg-purple-600 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
