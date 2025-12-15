import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../../GlobalContext/UserContext";
import JoinedCard from "./JoinedCard";
import RecommendedCard from "./RecommendedCard";
// Add Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  Keyboard,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function S_ShowCourses() {
  const [courses, setCourses] = useState([]);
  const [joined, setJoined] = useState([]);
  const [notJoined, setNotJoined] = useState([]);
  const { User } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:3000/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setJoined(
          data.filter(
            (course) =>
              course.studentIds && course.studentIds.includes(User?._id)
          )
        );
        setNotJoined(
          data.filter(
            (course) =>
              !course.studentIds || !course.studentIds.includes(User?._id)
          )
        );
      });
  }, [User?._id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Joined Courses */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">
            Joined Courses
          </h2>
          {joined.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">
                You have not joined any courses yet.
              </p>
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, A11y, Autoplay, Keyboard]}
              spaceBetween={16}
              navigation
              pagination={{ clickable: true }}
              keyboard={{ enabled: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {joined.map((course) => (
                <SwiperSlide key={course._id}>
                  <div className="h-full">
                    <JoinedCard course={course} showJoinButton={true} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Recommended Courses */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-slate-900">
            Recommended Courses
          </h2>
          {notJoined.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">
                You have joined all available courses.
              </p>
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, A11y, Autoplay, Keyboard]}
              spaceBetween={16}
              navigation
              pagination={{ clickable: true }}
              keyboard={{ enabled: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {notJoined.map((course) => (
                <SwiperSlide key={course._id}>
                  <div className="relative h-full">
                    <RecommendedCard course={course} showJoinButton={false} />
                    <div className="absolute top-4 right-4">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
                        onClick={async (e) => {
                          e.stopPropagation();
                          const res = await fetch(
                            `http://localhost:3000/courses/join/${course._id}`,
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ studentId: User?._id }),
                            }
                          );
                          if (res.ok) {
                            setJoined((prev) => [...prev, course]);
                            setNotJoined((prev) =>
                              prev.filter((c) => c._id !== course._id)
                            );
                          }
                        }}
                      >
                        Join Course
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
}

export default S_ShowCourses;
