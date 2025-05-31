import React from "react";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";
import { useCourse } from "../../context/CourseContext";
import { mockCourse as course } from "../layouts/data";
export const ReviewsSection: React.FC = () => {
  if (!course) return null;

  return (
    <div className="mt-8 mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Reviews
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Monitor and respond to student feedback
          </p>
        </div>

        <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
          View All Reviews
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Reviews Summary */}
          <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900">
                {course.stats.avgRating.toFixed(1)}
              </div>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < Math.round(course.stats.avgRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {course.stats.reviewCount} reviews
              </p>

              <div className="mt-6 space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  // Calculate mock percentages
                  const percent =
                    rating === 5
                      ? 68
                      : rating === 4
                      ? 22
                      : rating === 3
                      ? 7
                      : rating === 2
                      ? 2
                      : 1;

                  return (
                    <div key={rating} className="flex items-center text-sm">
                      <div className="w-3">{rating}</div>
                      <Star
                        size={12}
                        className="ml-1 text-yellow-400 fill-yellow-400"
                      />
                      <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
                        <div
                          className="h-2 rounded-full bg-yellow-400"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                      <div className="text-gray-500 w-8">{percent}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="col-span-2 divide-y divide-gray-200">
            {course.reviews.map((review: Review) => (
              <div key={review.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
                      {review.studentName.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {review.studentName}
                      </h3>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                        <span className="ml-2 text-xs text-gray-500">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                      <ThumbsUp size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                      <MessageSquare size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>

                {review.responded && (
                  <div className="mt-4 bg-gray-50 p-3 rounded-md border-l-4 border-blue-500">
                    <p className="text-xs font-medium text-gray-500 mb-1">
                      Instructor Response:
                    </p>
                    <p className="text-sm text-gray-600">
                      Thank you for your feedback! I'm glad you found the course
                      helpful. I'll continue to update the content regularly.
                    </p>
                  </div>
                )}

                {!review.responded && (
                  <div className="mt-4">
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Respond to this review
                    </button>
                  </div>
                )}
              </div>
            ))}

            <div className="p-6 text-center bg-gray-50">
              <p className="text-sm text-gray-500">
                Showing 3 of {course.stats.reviewCount} reviews
              </p>
              <button className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800">
                Load more reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
