import React, { useRef, useEffect } from "react";
import { Trophy, Calendar, Users, Clock, Medal } from "lucide-react";

const Competition = () => {
  const competitionRef = useRef(null);
  const rotateElementRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (rotateElementRef.current && competitionRef.current) {
        const { left, top, width, height } =
          competitionRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const moveX = (e.clientX - centerX) / 30;
        const moveY = (e.clientY - centerY) / 30;

        rotateElementRef.current.style.transform = `rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
      }
    };

    const handleScroll = () => {
      if (competitionRef.current && rotateElementRef.current) {
        const rect = competitionRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
          competitionRef.current.addEventListener("mousemove", handleMouseMove);
        } else {
          competitionRef.current.removeEventListener(
            "mousemove",
            handleMouseMove
          );
          if (rotateElementRef.current) {
            rotateElementRef.current.style.transform =
              "rotateY(0deg) rotateX(0deg)";
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (competitionRef.current) {
        competitionRef.current.removeEventListener(
          "mousemove",
          handleMouseMove
        );
      }
    };
  }, []);

  const upcomingCompetitions = [
    {
      title: "Weekly Code Challenge",
      date: "Every Friday",
      participants: 850,
      time: "48 hours",
      difficulty: "All levels",
    },
    {
      title: "Hackathon: AI Solutions",
      date: "Oct 15-17, 2025",
      participants: 320,
      time: "72 hours",
      difficulty: "Intermediate & Advanced",
    },
    {
      title: "Frontend Masters Cup",
      date: "Nov 5, 2025",
      participants: 640,
      time: "24 hours",
      difficulty: "All levels",
    },
  ];

  return (
    <section id="competition" className="py-12 md:py-16" ref={competitionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Put Your Skills to the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-purple-600">
                  Test
                </span>
              </h2>
              <p className="text-lg text-slate-600">
                Participate in our coding competitions and hackathons to
                challenge yourself, learn from others, and win exciting prizes.
                Compete in real-time against developers from around the world.
              </p>
            </div>

            <div className="space-y-6">
              {upcomingCompetitions.map((competition, index) => (
                <div
                  key={index}
                  className="bg-white/85 backdrop-blur-xl rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-white/40 hover:-translate-y-0.5"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">
                        {competition.title}
                      </h3>
                      <div className="flex flex-wrap gap-y-2 text-sm text-slate-600">
                        <div className="flex items-center mr-4">
                          <Calendar className="h-4 w-4 mr-1 text-indigo-600" />
                          <span>{competition.date}</span>
                        </div>
                        <div className="flex items-center mr-4">
                          <Users className="h-4 w-4 mr-1 text-indigo-600" />
                          <span>{competition.participants} participants</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-indigo-600" />
                          <span>{competition.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full p-3  flex items-center">
                      <Trophy className="h-4 w-4 text-indigo-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">
                      {competition.difficulty}
                    </span>
                    <button className="px-4 py-1 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:opacity-90 transition-colors duration-300">
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-300 shadow-md hover:shadow-lg">
                View All Competitions
              </button>
            </div>
          </div>

          <div
            ref={rotateElementRef}
            className="flex justify-center transition-transform duration-200 ease-out"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl max-w-md w-full relative border border-white/40">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
                <Trophy className="h-10 w-10 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-8 mt-2">
                Leaderboard
              </h3>

              <div className="space-y-5">
                {[
                  {
                    rank: 1,
                    name: "Alex Johnson",
                    country: "USA",
                    points: 1250,
                    medal: "gold",
                  },
                  {
                    rank: 2,
                    name: "Maria Garcia",
                    country: "Spain",
                    points: 1180,
                    medal: "silver",
                  },
                  {
                    rank: 3,
                    name: "David Kim",
                    country: "South Korea",
                    points: 1120,
                    medal: "bronze",
                  },
                  {
                    rank: 4,
                    name: "Emma Wilson",
                    country: "UK",
                    points: 980,
                    medal: null,
                  },
                  {
                    rank: 5,
                    name: "Ravi Patel",
                    country: "India",
                    points: 920,
                    medal: null,
                  },
                ].map((person, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-3 rounded-lg ${
                      index === 0
                        ? "bg-yellow-50/70 backdrop-blur-xl"
                        : index === 1
                        ? "bg-slate-100/70 backdrop-blur-xl"
                        : index === 2
                        ? "bg-amber-50/70 backdrop-blur-xl"
                        : "bg-white/80 border border-white/40 backdrop-blur-xl"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-800">
                      {person.rank}
                    </div>
                    <div className="ml-3 flex-grow">
                      <div className="text-slate-900 font-medium">
                        {person.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {person.country}
                      </div>
                    </div>
                    <div className="flex items-center">
                      {person.medal && (
                        <Medal
                          className={`h-5 w-5 mr-2 ${
                            person.medal === "gold"
                              ? "text-yellow-500"
                              : person.medal === "silver"
                              ? "text-slate-400"
                              : "text-amber-700"
                          }`}
                        />
                      )}
                      <div className="text-lg font-semibold text-indigo-600">
                        {person.points}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-slate-500">Your Rank</div>
                    <div className="text-xl font-bold text-slate-900">#42</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Your Points</div>
                    <div className="text-xl font-bold text-indigo-600">580</div>
                  </div>
                  <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-medium hover:bg-indigo-200 transition-colors duration-300">
                    Improve Rank
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

export default Competition;
