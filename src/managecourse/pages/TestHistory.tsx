import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import PageHeader from "../testassigns/PageHeader";
import TestCard, { TestData } from "../testassigns/TestCard";
import FilterBar from "../testassigns/FilterBar";
import EmptyState from "../testassigns/EmptyState";
import Layout from "../testassigns/Layout";

// Sample data - in a real app, this would come from an API
const sampleTests: TestData[] = [
  {
    id: "1",
    title: "JavaScript Basics",
    date: new Date(2025, 3, 15),
    duration: 2,
    numStudents: 28,
    status: "completed",
    averageScore: 87,
  },
  {
    id: "2",
    title: "Advanced CSS Techniques",
    date: new Date(2025, 3, 22),
    duration: 1.5,
    numStudents: 24,
    status: "completed",
    averageScore: 92,
  },
  {
    id: "3",
    title: "React Fundamentals",
    date: new Date(2025, 3, 29),
    duration: 3,
    numStudents: 26,
    status: "in-progress",
  },
  {
    id: "4",
    title: "Data Structures & Algorithms",
    date: new Date(2025, 4, 10),
    duration: 2.5,
    numStudents: 30,
    status: "scheduled",
  },
  {
    id: "5",
    title: "TypeScript Workshop",
    date: new Date(2025, 4, 17),
    duration: 2,
    numStudents: 22,
    status: "scheduled",
  },
];

const statusOptions = [
  { label: "Completed", value: "completed" },
  { label: "In Progress", value: "in-progress" },
  { label: "Scheduled", value: "scheduled" },
  { label: "Pending", value: "pending" },
];

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Title A-Z", value: "title-asc" },
  { label: "Title Z-A", value: "title-desc" },
];

const TestHistory: React.FC = () => {
  const [filteredTests, setFilteredTests] = useState<TestData[]>(sampleTests);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");

  const handleScheduleNewTest = () => {
    window.location.href = "/schedule-test";
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, statusFilter, sortOption);
  };

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
    applyFilters(searchTerm, status, sortOption);
  };

  const handleSortChange = (sort: string) => {
    setSortOption(sort);
    applyFilters(searchTerm, statusFilter, sort);
  };

  const applyFilters = (search: string, status: string, sort: string) => {
    let result = [...sampleTests];

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter((test) =>
        test.title.toLowerCase().includes(searchLower)
      );
    }

    if (status !== "all") {
      result = result.filter((test) => test.status === status);
    }

    switch (sort) {
      case "newest":
        result.sort((a, b) => b.date.getTime() - a.date.getTime());
        break;
      case "oldest":
        result.sort((a, b) => a.date.getTime() - b.date.getTime());
        break;
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    setFilteredTests(result);
  };

  return (
    <Layout>
      <div>
        <div className="">
          <FilterBar
            onSearch={handleSearch}
            statusOptions={statusOptions}
            onStatusChange={handleStatusChange}
            sortOptions={sortOptions}
            onSortChange={handleSortChange}
          />

          {filteredTests.length > 0 ? (
            <div className=" space-y-4 mx-auto">
              {filteredTests.map((test) => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No tests found"
              description="No coding tests matching your filters were found."
              buttonText="Schedule New Test"
              onButtonClick={handleScheduleNewTest}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TestHistory;
