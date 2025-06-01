import React, { useState } from "react";
import VideoCall from "../components/student/VideoCall";
import QueryForm from "../components/student/QueryForm";
import QueryHistory from "../components/student/QueryHistory";
import Layout from "../components/ui/Layout";

const StudentInterface: React.FC = () => {
  const [queries, setQueries] = useState<
    Array<{ id: number; text: string; timestamp: Date; answered: boolean }>
  >([
    {
      id: 1,
      text: "Could you explain the concept of React hooks again?",
      timestamp: new Date(Date.now() - 15 * 60000),
      answered: true,
    },
    {
      id: 2,
      text: "What's the difference between props and state?",
      timestamp: new Date(Date.now() - 5 * 60000),
      answered: false,
    },
  ]);

  const handleSubmitQuery = (queryText: string) => {
    const newQuery = {
      id: queries.length + 1,
      text: queryText,
      timestamp: new Date(),
      answered: false,
    };
    setQueries([...queries, newQuery]);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Live Class</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main video call area */}
          <div className="lg:col-span-2">
            <VideoCall />
          </div>

          {/* Sidebar with query form and history */}
          <div className="lg:col-span-1 space-y-6">
            <QueryForm onSubmitQuery={handleSubmitQuery} />
            <QueryHistory queries={queries} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentInterface;
