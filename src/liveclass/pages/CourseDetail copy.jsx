import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [addedStudents, setAddedStudents] = useState([]);

  useEffect(() => {
    // Fetch students
    fetch("http://localhost:3000/courses/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
    // Fetch course details
    fetch(`http://localhost:3000/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        // If course.studentIds exists, filter students accordingly
        if (data.studentIds) {
          setAddedStudents(data.studentIds);
        }
      });
  }, [id]);

  const handleAddStudent = async (student) => {
    if (!addedStudents.find((s) => s.id === student.id)) {
      // Call backend API to add student to course
      const res = await fetch(
        `http://localhost:3000/courses/${id}/add-student`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId: student._id }),
        }
      );
      if (res.ok) {
        setAddedStudents([...addedStudents, student]);
      }
    }
  };

  if (!course) return <div>Loading...</div>;

  const handleStartLiveClass = () => {
    // Implement your logic to start a live class here
    alert("Live class started!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <Link
        to={"/liveclass"}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleStartLiveClass}
      >
        Start Live Class
      </Link>
      <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
      <p className="mb-4">{course.description}</p>
      <h3 className="text-lg font-semibold mb-2">Add Students</h3>
      <ul className="mb-4">
        {students.map((student) => (
          <li
            key={student._id}
            className="flex items-center justify-between mb-2"
          >
            <span>{student.name}</span>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={() => handleAddStudent(student)}
              disabled={addedStudents.find((s) => s.id === student.id)}
            >
              {addedStudents.find((s) => s.id === student.id) ? "Added" : "Add"}
            </button>
          </li>
        ))}
      </ul>
      <h4 className="font-semibold mb-1">Added Students:</h4>
      <ul>
        {addedStudents.map((student) => (
          <li key={student._id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CourseDetail;
