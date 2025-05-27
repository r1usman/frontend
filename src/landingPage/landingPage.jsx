// LandingPage.jsx

import React from 'react';

// Placeholder for Icons (e.g., using Heroicons)
// import { AcademicCapIcon, LightBulbIcon, TrophyIcon, CodeBracketIcon, UsersIcon, PlayIcon, ArrowRightIcon, StarIcon } from '@heroicons/react/24/outline';

// --- Helper Icon Components (or use an icon library) ---
const PlaceholderIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const AcademicCapIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
);

const LightBulbIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
);

const TrophyIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-4.5A3.375 3.375 0 0 0 12.75 9.75H11.25A3.375 3.375 0 0 0 7.5 13.125V18.75m9 0h1.5a2.25 2.25 0 1 1 0 4.5h-15a2.25 2.25 0 1 1 0-4.5H7.5m9 0v-1.5A3.375 3.375 0 0 0 12.75 6.75H11.25A3.375 3.375 0 0 0 7.5 10.125V12.75m5.25 6v-4.5" />
    </svg>
);

const CodeBracketIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
    </svg>
);

const UsersIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
);

const PlayIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
    </svg>
);

const ArrowRightIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
);

const StarIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.502 2.825c-.995.608-2.23-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
    </svg>
);
// --- End Helper Icon Components ---


const LandingPage = () => {
    const features = [
        {
            icon: <AcademicCapIcon className="w-10 h-10 text-indigo-500" />,
            title: "Expert-Led Courses",
            description: "Dive into comprehensive courses from beginner to advanced, crafted by industry professionals.",
        },
        {
            icon: <CodeBracketIcon className="w-10 h-10 text-indigo-500" />,
            title: "Hands-On Practice",
            description: "Solidify your learning with a vast library of coding problems and real-world projects.",
        },
        {
            icon: <TrophyIcon className="w-10 h-10 text-indigo-500" />,
            title: "Compete & Conquer",
            description: "Test your skills against others in exciting coding competitions and climb the leaderboards.",
        },
        {
            icon: <UsersIcon className="w-10 h-10 text-indigo-500" />,
            title: "Community Support",
            description: "Join a vibrant community of learners, share knowledge, and grow together.",
        },
    ];

    const testimonials = [
        {
            quote: "This platform transformed my coding journey! The mix of courses and competitions is unparalleled.",
            name: "Alex P.",
            role: "Software Developer",
            avatar: "https://via.placeholder.com/100/DDD/808080?Text=AP", // Replace with actual avatar
        },
        {
            quote: "The practice problems are challenging and incredibly helpful. I've learned so much.",
            name: "Sarah K.",
            role: "Student",
            avatar: "https://via.placeholder.com/100/EEE/808080?Text=SK", // Replace with actual avatar
        },
        {
            quote: "Competing here pushed my limits and helped me land my dream job. Highly recommend!",
            name: "Mike L.",
            role: "Frontend Engineer",
            avatar: "https://via.placeholder.com/100/CCC/808080?Text=ML", // Replace with actual avatar
        },
    ];

    const courseCategories = [
        { name: "Web Development", description: "Master HTML, CSS, JavaScript, React, Node.js and more.", image: "https://via.placeholder.com/600x400/E0F2FE/0EA5E9?Text=Web+Dev" },
        { name: "Data Science", description: "Unlock insights from data with Python, R, and machine learning.", image: "https://via.placeholder.com/600x400/F3E8FF/A855F7?Text=Data+Science" },
        { name: "Mobile Apps", description: "Build stunning apps for iOS and Android using Swift or Kotlin.", image: "https://via.placeholder.com/600x400/FEF3C7/F59E0B?Text=Mobile+Apps" },
        { name: "Cybersecurity", description: "Learn to protect systems and data from cyber threats.", image: "https://via.placeholder.com/600x400/D1FAE5/10B981?Text=Cybersecurity" },
    ];

    return (
        <div className="bg-white text-slate-700 antialiased">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="#" className="font-bold text-2xl text-indigo-600">Code<span className="text-green-500">Space</span></a>
                    <div className="space-x-6">
                        <a href="#features" className="text-slate-600 hover:text-indigo-600 transition-colors">Features</a>
                        <a href="#courses" className="text-slate-600 hover:text-indigo-600 transition-colors">Courses</a>
                        <a href="#compete" className="text-slate-600 hover:text-indigo-600 transition-colors">Compete</a>
                        <a href="#testimonials" className="text-slate-600 hover:text-indigo-600 transition-colors">Testimonials</a>
                        <a href="#contact" className="text-slate-600 hover:text-indigo-600 transition-colors">Contact</a>
                    </div>
                    <div>
                        <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors mr-4">Log In</a>
                        <a
                            href="#"
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                        >
                            Sign Up
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white pt-20 pb-32">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Unlock Your Coding Potential.
                        <br />
                        <span className="relative inline-block">
                            Learn, Practice, Compete.
                            <span className="absolute bottom-0 left-0 w-full h-2 bg-green-400 transform -skew-x-12 -mb-1"></span>
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 text-indigo-100 max-w-3xl mx-auto">
                        Join thousands of aspiring developers. Master new skills with our expert-led courses, sharpen your abilities with practice problems, and rise to the challenge in coding competitions.
                    </p>
                    <div className="space-y-4 sm:space-y-0 sm:space-x-6 flex flex-col sm:flex-row justify-center items-center">
                        <a
                            href="#"
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-lg text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center"
                        >
                            Start Your Free Trial <ArrowRightIcon className="w-5 h-5 ml-2" />
                        </a>
                        <a
                            href="#courses"
                            className="bg-transparent hover:bg-white hover:text-indigo-700 text-white font-semibold py-4 px-10 rounded-lg text-lg border-2 border-white transition-all transform hover:scale-105 inline-flex items-center"
                        >
                            Explore Courses <PlayIcon className="w-5 h-5 ml-2" />
                        </a>
                    </div>
                    <div className="mt-16 animate-bounce-slow"> {/* Replace with a more subtle animation or illustration */}
                        {/* Placeholder for a graphic or illustration - e.g., a laptop with code */}
                        <CodeBracketIcon className="w-20 h-20 text-indigo-200 mx-auto opacity-50" />
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section id="features" className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">Everything You Need to Succeed</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Our platform is designed to provide a comprehensive learning experience, from foundational concepts to competitive programming.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1">
                                <div className="mb-6 inline-block p-3 bg-indigo-100 rounded-full">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-semibold text-slate-800 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">Start Your Journey in 3 Simple Steps</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Getting started is easy. Follow these steps to kickstart your coding adventure.</p>
                    </div>
                    <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0 md:space-x-8">
                        {/* Step 1 */}
                        <div className="text-center max-w-xs">
                            <div className="mb-4 w-16 h-16 mx-auto bg-indigo-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md">1</div>
                            <h3 className="text-xl font-semibold mb-2 text-slate-700">Sign Up & Choose</h3>
                            <p className="text-slate-600">Create your account and pick a course or learning path that excites you.</p>
                        </div>
                        {/* Arrow (Desktop) */}
                        <div className="hidden md:block text-indigo-400">
                            <ArrowRightIcon className="w-12 h-12 opacity-50" />
                        </div>
                        {/* Step 2 */}
                        <div className="text-center max-w-xs">
                            <div className="mb-4 w-16 h-16 mx-auto bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md">2</div>
                            <h3 className="text-xl font-semibold mb-2 text-slate-700">Learn & Practice</h3>
                            <p className="text-slate-600">Engage with interactive lessons, complete exercises, and solve practice problems.</p>
                        </div>
                        {/* Arrow (Desktop) */}
                        <div className="hidden md:block text-purple-400">
                             <ArrowRightIcon className="w-12 h-12 opacity-50" />
                        </div>
                        {/* Step 3 */}
                        <div className="text-center max-w-xs">
                            <div className="mb-4 w-16 h-16 mx-auto bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md">3</div>
                            <h3 className="text-xl font-semibold mb-2 text-slate-700">Compete & Grow</h3>
                            <p className="text-slate-600">Join competitions, track your progress, and see how you stack up.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Categories Section */}
            <section id="courses" className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">Explore Our Courses</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            From web development to data science, find the perfect course to achieve your goals.
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {courseCategories.map((category) => (
                            <div key={category.name} className="bg-white rounded-lg shadow-lg overflow-hidden group transform hover:scale-105 transition-transform duration-300">
                                <img src={category.image} alt={category.name} className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity" />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-slate-800 mb-2">{category.name}</h3>
                                    <p className="text-slate-600 text-sm mb-4">{category.description}</p>
                                    <a href="#" className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center">
                                        Learn More <ArrowRightIcon className="w-4 h-4 ml-1" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                     <div className="text-center mt-12">
                        <a
                            href="#"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                        >
                            View All Courses
                        </a>
                    </div>
                </div>
            </section>

            {/* Competition Showcase Section */}
            <section id="compete" className="py-20 bg-white relative overflow-hidden">
                 {/* Background decorative elements */}
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full opacity-50 filter blur-3xl"></div>
                <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-pink-100 rounded-full opacity-50 filter blur-3xl"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center lg:space-x-12">
                        <div className="lg:w-1/2 mb-10 lg:mb-0">
                            <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">Challenge Yourself</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mt-2 mb-6 leading-tight">
                                Rise to the Top in Coding Competitions
                            </h2>
                            <p className="text-lg text-slate-600 mb-6">
                                Put your skills to the test! Participate in regular coding battles, solve complex problems under pressure, and earn bragging rights (and cool prizes!).
                            </p>
                            <ul className="space-y-3 text-slate-600 mb-8">
                                <li className="flex items-center">
                                    <TrophyIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                                    <span>Weekly and monthly challenges for all skill levels.</span>
                                </li>
                                <li className="flex items-center">
                                    <LightBulbIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                                    <span>Diverse problem sets: algorithms, data structures, domain-specific.</span>
                                 </li>
                                <li className="flex items-center">
                                    <UsersIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                                    <span>Global leaderboards and performance tracking.</span>
                                </li>
                            </ul>
                            <a
                                href="#"
                                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105 inline-flex items-center"
                            >
                                View Upcoming Competitions <ArrowRightIcon className="w-5 h-5 ml-2" />
                            </a>
                        </div>
                        <div className="lg:w-1/2">
                            {/* Placeholder for a competition graphic or leaderboard snippet */}
                            <div className="bg-slate-800 p-8 rounded-xl shadow-2xl relative">
                                <div className="absolute -top-4 -left-4 w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center transform rotate-[-15deg]">
                                    <TrophyIcon className="w-8 h-8 text-white"/>
                                </div>
                                <h4 className="text-2xl font-semibold text-white mb-4">Featured Challenge: <span className="text-pink-400">AlgoMaster</span></h4>
                                <p className="text-slate-300 mb-2">Ends in: <span className="font-semibold text-white">3 Days, 12 Hours</span></p>
                                <div className="bg-slate-700 p-4 rounded-md mb-4">
                                    <p className="text-sm text-slate-400">Top Contestant:</p>
                                    <p className="text-lg font-semibold text-white">CodeNinja_007 <span className="text-xs text-green-400">(2500 pts)</span></p>
                                </div>
                                <div className="h-32 bg-slate-700 rounded-md flex items-center justify-center text-slate-400 italic">
                                    Leaderboard Preview Area
                                </div>
                                <button className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors">
                                    Join Challenge
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Practice Problems Teaser Section */}
             <section id="practice" className="py-20 bg-slate-100">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">Sharpen Your Skills, One Problem at a Time</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                           Our extensive library of practice problems helps you build confidence and mastery in any programming language or concept.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <CodeBracketIcon className="w-8 h-8 text-indigo-500 mb-3" />
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">Algorithm Challenges</h3>
                            <p className="text-slate-600 text-sm">Sort, search, and conquer complex algorithmic puzzles.</p>
                        </div>
                         <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <PlaceholderIcon className="w-8 h-8 text-purple-500 mb-3" /> {/* Replace with Data Structure Icon */}
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">Data Structures</h3>
                            <p className="text-slate-600 text-sm">Implement and understand arrays, linked lists, trees, and graphs.</p>
                        </div>
                         <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <PlaceholderIcon className="w-8 h-8 text-green-500 mb-3" /> {/* Replace with Language Specific Icon */}
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">Language Specifics</h3>
                            <p className="text-slate-600 text-sm">Master the nuances of Python, JavaScript, Java, C++, and more.</p>
                        </div>
                    </div>
                     <div className="text-center mt-12">
                        <a
                            href="#"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                        >
                            Explore Practice Problems
                        </a>
                    </div>
                </div>
            </section>


            {/* Testimonials Section */}
            <section id="testimonials" className="py-20 bg-indigo-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-800 mb-4">Loved by Learners Worldwide</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Don't just take our word for it. See what our students have to say about their transformative learning experiences.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                                <div className="flex items-center mb-6">
                                    <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4 object-cover" />
                                    <div>
                                        <h4 className="text-lg font-semibold text-slate-800">{testimonial.name}</h4>
                                        <p className="text-sm text-indigo-600">{testimonial.role}</p>
                                    </div>
                                </div>
                                <div className="mb-4 flex">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-slate-600 italic leading-relaxed">"{testimonial.quote}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section id="cta" className="py-24 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Coding Adventure?</h2>
                    <p className="text-xl md:text-2xl mb-10 text-indigo-100 max-w-3xl mx-auto">
                        Join CodeSpace today and gain the skills to build your future. No commitment, cancel anytime.
                    </p>
                    <a
                        href="#"
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-lg text-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center"
                    >
                        Sign Up for Free Now <ArrowRightIcon className="w-6 h-6 ml-3" />
                    </a>
                    <p className="mt-6 text-indigo-200 text-sm">
                        Got questions? <a href="#contact" className="underline hover:text-white">Contact us</a>.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-slate-800 text-slate-300 py-16">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                        <div>
                            <h5 className="text-xl font-semibold text-white mb-4">Code<span className="text-green-400">Space</span></h5>
                            <p className="text-sm mb-4">
                                Empowering the next generation of developers through quality education, practice, and competition.
                            </p>
                            <div className="flex space-x-4">
                                {/* Social Icons - Replace with actual links and icons */}
                                <a href="#" className="text-slate-400 hover:text-white transition-colors"><PlaceholderIcon /> {/* Facebook */} </a>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors"><PlaceholderIcon /> {/* Twitter */} </a>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors"><PlaceholderIcon /> {/* LinkedIn */} </a>
                                <a href="#" className="text-slate-400 hover:text-white transition-colors"><PlaceholderIcon /> {/* GitHub */} </a>
                            </div>
                        </div>
                        <div>
                            <h5 className="text-lg font-semibold text-white mb-4">Quick Links</h5>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#courses" className="hover:text-green-400 transition-colors">Courses</a></li>
                                <li><a href="#compete" className="hover:text-green-400 transition-colors">Competitions</a></li>
                                <li><a href="#practice" className="hover:text-green-400 transition-colors">Practice Problems</a></li>
                                <li><a href="#" className="hover:text-green-400 transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-green-400 transition-colors">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-lg font-semibold text-white mb-4">Support</h5>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-green-400 transition-colors">FAQ</a></li>
                                <li><a href="#" className="hover:text-green-400 transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-green-400 transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-green-400 transition-colors">Community Forum</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-lg font-semibold text-white mb-4">Legal</h5>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-green-400 transition-colors">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-700 pt-8 text-center text-sm">
                        <p>&copy; {new Date().getFullYear()} CodeSpace. All rights reserved. Built with <span className="text-pink-400">&hearts;</span> in React & Tailwind CSS.</p>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default LandingPage;

// To make the "animate-bounce-slow" work, add this to your tailwind.config.js
// theme: {
//   extend: {
//     animation: {
//       'bounce-slow': 'bounce 3s infinite',
//     }
//   },
// },