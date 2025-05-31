import React from 'react';
import { Video, Calendar, Clock, Users, Bot, ChevronRight } from 'lucide-react';

const ClassCard = ({ title, instructor, date, time, participants, image }) => (
  <div className="bg-white rounded-xl  overflow-hidden shadow-md hover:shadow-lg transition duration-300 border border-slate-100">
    <div className="relative h-48 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center">
          <Video className="h-3 w-3 mr-1" />
          Live Class
        </span>
        <span className="bg-white/90 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full">
          With AI Assistant
        </span>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-3  min-h-16">{title}</h3>
      <p className="text-indigo-600 font-medium mb-4">Instructor: {instructor}</p>
      <div className="space-y-2 text-sm text-slate-600 mb-5 ">
        <Info icon={<Calendar />} label={date} />
        <Info icon={<Clock />} label={time} />
        <Info icon={<Users />} label={`${participants} enrolled`} />
      </div>
      <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-indigo-700 transition">
        <span>Reserve Your Spot</span>
        <ChevronRight className="h-4 w-4 ml-1" />
      </button>
    </div>
  </div>
);

const Info = ({ icon, label }) => (
  <div className="flex items-center">
    {React.cloneElement(icon, { className: 'h-4 w-4 mr-2 text-slate-500' })}
    <span>{label}</span>
  </div>
);

const features = [
  "Instant answers to coding questions",
  "Personalized learning recommendations",
  "Step-by-step problem solving guidance",
  "Code reviews with improvement suggestions",
];

const upcomingClasses = [
  {
    id: 1,
    title: "Building a Full-Stack App with Next.js",
    instructor: "Sarah Johnson",
    date: "October 5, 2025",
    time: "4:00 PM - 6:00 PM EST",
    participants: 78,
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 2,
    title: "Machine Learning for Beginners",
    instructor: "David Chen",
    date: "October 8, 2025",
    time: "1:00 PM - 3:00 PM EST",
    participants: 65,
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    id: 3,
    title: "Advanced React Patterns",
    instructor: "Maya Patel",
    date: "October 12, 2025",
    time: "5:00 PM - 7:00 PM EST",
    participants: 52,
    image: "https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=600"
  }
];

const LiveClasses = () => {
  return (
    <section id="live-classes" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Learn with <span className="text-indigo-600">Live Classes</span> & AI Support
          </h2>
          <p className="text-lg text-slate-600">
            Join expert-led sessions with real-time AI guidance to conquer any coding hurdle.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {upcomingClasses.map(cls => <ClassCard key={cls.id} {...cls} />)}
        </div>

        <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 ">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Bot className="h-4 w-4 mr-1" />
                AI-Powered Learning
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Meet Your Personal AI Coding Assistant
              </h3>
              <p className="text-lg text-slate-700 mb-6">
                Get code reviews, debug help, and instant explanations—all tailored to your journey.
              </p>
              <ul className="space-y-3 mb-8">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-md hover:shadow-lg self-start">
                Try AI Assistant Now
              </button>
            </div>

            <div className="p-8 md:p-12 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
              <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <span className="ml-2 font-semibold text-slate-800">AI Assistant</span>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Online</span>
                </div>
                <div className="space-y-4">
                  <Message type="user">I'm having trouble with this recursive function. Can you help me?</Message>
                  <Message type="ai">Of course! I can see you're missing a base case. Let me explain how to fix it.</Message>
                  <Message type="ai" code={`function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n-1);\n}`}>
                    Here's the corrected version with the base case.
                  </Message>
                </div>
                <div className="mt-4 flex items-center border border-slate-200 rounded-lg overflow-hidden">
                  <input 
                    type="text" 
                    placeholder="Ask me anything about coding..." 
                    className="flex-grow p-2 text-sm focus:outline-none" 
                  />
                  <button className="p-2 bg-indigo-600 text-white">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Message = ({ children, type, code }) => {
  const base = "p-3 rounded-lg max-w-xs";
  const isUser = type === "user";
  const isAI = type === "ai";
  const alignment = isUser ? "" : "ml-auto";
  const bgColor = isUser ? "bg-slate-100" : "bg-indigo-100";
  const textColor = isUser ? "text-slate-800" : "text-indigo-800";

  return (
    <div className={`${bgColor} ${base} ${alignment}`}>
      {code && (
        <pre className="text-xs font-mono bg-slate-100 p-2 rounded mb-2 overflow-x-auto">
          <code className="text-slate-800 ">{code}</code>
        </pre>
      )}
      <p className={`${textColor} text-sm`}>{children}</p>
    </div>
  );
};

export default LiveClasses;
