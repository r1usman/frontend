import React, { useState } from "react";
import VideoCall from "../components/instructor/VideoCall";
import QueryList from "../components/instructor/QueryList";
import AttentionMatrix from "../components/instructor/AttentionMatrix";
import { TabComponent, TabItem } from "../components/ui/TabComponent";
import Layout from "../components/ui/Layout";

const InstructorInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("queries");

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Live Class Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main video call area */}
          <div className="lg:col-span-2">
            <VideoCall />
          </div>

          {/* Sidebar with tabs for queries and attention */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <TabComponent activeTab={activeTab} onChange={setActiveTab}>
                <TabItem id="queries" label="Student Queries">
                  <QueryList />
                </TabItem>
                <TabItem id="attention" label="Attention Matrix">
                  <AttentionMatrix />
                </TabItem>
              </TabComponent>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InstructorInterface;
