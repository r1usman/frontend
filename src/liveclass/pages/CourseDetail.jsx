import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle,
  GraduationCap,
  Loader2,
  Mail,
  Search,
  UserPlus,
  Users,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isStartingClass, setIsStartingClass] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Fetch students
    fetch("http://localhost:3000/courses/students")
      .then((res) => res.json())
      .then((studentsData) => {
        setStudents(studentsData);
        // Fetch course details
        fetch(`http://localhost:3000/courses/${id}`)
          .then((res) => res.json())
          .then((courseData) => {
            setCourse(courseData);
            setIsLoading(false);
          });
      });
  }, [id]);

  // Get enrolled students by comparing _id in studentIds objects
  const enrolledStudents =
    course && course.studentIds
      ? students.filter((student) =>
          course.studentIds.some((enrolled) => enrolled._id === student._id)
        )
      : [];

  // Filter out students who are already enrolled
  const toBeAddedStudents =
    course && course.studentIds
      ? students.filter(
          (student) =>
            !course.studentIds.some((enrolled) => enrolled._id === student._id)
        )
      : [];

  const filteredStudents = toBeAddedStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = async (student) => {
    if (!course.studentIds.some((enrolled) => enrolled._id === student._id)) {
      const res = await fetch(
        `http://localhost:3000/courses/add-student/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId: student._id }),
        }
      );
      if (res.ok) {
        // Update course.studentIds locally with the full student object
        setCourse((prev) => ({
          ...prev,
          studentIds: [...prev.studentIds, student],
        }));
      }
    }
  };

  const handleStartLiveClass = () => {
    navigate("/instructor/live");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course)
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Course not found</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Course Management
                  </h1>
                  <p className="text-sm text-gray-500">
                    Manage students and live sessions
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {enrolledStudents.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {course.title}
                </h2>
                <p className="text-indigo-100 text-lg mb-4 max-w-2xl">
                  {course.description}
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-indigo-200" />
                    <span className="text-indigo-100">
                      {enrolledStudents.length} Students
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-indigo-200" />
                    <span className="text-indigo-100">Active Course</span>
                  </div>
                </div>
              </div>
              <div className="ml-6">
                <button
                  onClick={handleStartLiveClass}
                  disabled={isStartingClass}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isStartingClass ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Starting...</span>
                    </>
                  ) : (
                    <>
                      <Video className="w-5 h-5" />
                      <span>Start Live Class</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Students Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <div className="flex items-center space-x-3">
                  <UserPlus className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold text-white">Add Students</h3>
                </div>
              </div>

              <div className="p-6">
                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Students List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredStudents.map((student) => {
                    const isEnrolled = course.studentIds.some(
                      (enrolled) => enrolled._id === student._id
                    );
                    return (
                      <div
                        key={student._id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                            {student.profileImage ? (
                              <img
                                src={student.profileImage}
                                alt={student.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <GraduationCap className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {student.name}
                            </h4>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
                              {student.email}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleAddStudent(student)}
                          disabled={isEnrolled}
                          className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                            isEnrolled
                              ? "bg-green-100 text-green-700 cursor-not-allowed"
                              : "bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105"
                          }`}
                        >
                          {isEnrolled ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <UserPlus className="w-4 h-4" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Added Students Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold text-white">
                    Enrolled Students
                  </h3>
                  <span className="bg-white/20 text-white px-2 py-1 rounded-full text-sm font-medium">
                    {enrolledStudents.length}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {enrolledStudents.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No students enrolled yet</p>
                    <p className="text-sm text-gray-400">
                      Add students from the list to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {enrolledStudents.map((student, index) => (
                      <div
                        key={student._id || index}
                        className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                          {student.profileImage ? (
                            <img
                              src={student.profileImage}
                              alt={student.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <GraduationCap className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {student.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {student.email}
                          </p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
