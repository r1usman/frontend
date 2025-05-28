import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import PageHeader from "../testassigns/PageHeader";
import AssignmentCard, { AssignmentData } from "../testassigns/AssignmentCard";
import FilterBar from "../testassigns/FilterBar";
import EmptyState from "../testassigns/EmptyState";
import Layout from "../testassigns/Layout";

const sampleAssignments: AssignmentData[] = [
  {
    id: "1",
    title: "Team Project: E-commerce Website",
    description:
      "Build a fully functional e-commerce website with product listings, cart, and checkout functionality.",
    startDate: new Date(2025, 2, 10),
    dueDate: new Date(2025, 3, 10),
    groupSize: 4,
    numGroups: 7,
    status: "completed",
  },
  {
    id: "2",
    title: "Collaborative Database Design",
    description:
      "Work in teams to design and implement a relational database for a university management system.",
    startDate: new Date(2025, 3, 15),
    dueDate: new Date(2025, 4, 15),
    groupSize: 3,
    numGroups: 9,
    status: "in-progress",
  },
  {
    id: "3",
    title: "Agile Development Project",
    description:
      "Apply agile methodologies to develop a project management tool with task tracking and team collaboration features.",
    startDate: new Date(2025, 4, 1),
    dueDate: new Date(2025, 5, 1),
    groupSize: 5,
    numGroups: 6,
    status: "scheduled",
  },
  {
    id: "4",
    title: "Mobile App Development Challenge",
    description:
      "Create a cross-platform mobile application that solves a real-world problem for campus students.",
    startDate: new Date(2025, 4, 20),
    dueDate: new Date(2025, 5, 20),
    groupSize: 4,
    numGroups: 7,
    status: "scheduled",
  },
  {
    id: "5",
    title: "Open Source Contribution Project",
    description:
      "Collaborate on contributing to an open-source project by adding features or fixing bugs.",
    startDate: new Date(2025, 5, 5),
    dueDate: new Date(2025, 6, 5),
    groupSize: 3,
    numGroups: 8,
    status: "pending",
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
  { label: "Due Date", value: "due-date" },
  { label: "Title A-Z", value: "title-asc" },
  { label: "Title Z-A", value: "title-desc" },
];

const AssignmentHistory: React.FC = () => {
  const [filteredAssignments, setFilteredAssignments] =
    useState<AssignmentData[]>(sampleAssignments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");

  const handleScheduleNewAssignment = () => {
    window.location.href = "/schedule-assignment";
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
    let result = [...sampleAssignments];

    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (assignment) =>
          assignment.title.toLowerCase().includes(searchLower) ||
          assignment.description.toLowerCase().includes(searchLower)
      );
    }

    if (status !== "all") {
      result = result.filter((assignment) => assignment.status === status);
    }

    switch (sort) {
      case "newest":
        result.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
        break;
      case "oldest":
        result.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
        break;
      case "due-date":
        result.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
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

    setFilteredAssignments(result);
  };

  return (
    <Layout>
      <div>
        <PageHeader
          title="Collaborative Assignments"
          description="View and manage all your collaborative assignments"
          buttonText="Schedule New Assignment"
          buttonIcon={<PlusCircle className="h-4 w-4 mr-2" />}
          onButtonClick={handleScheduleNewAssignment}
        />

        <div className="mt-6">
          <FilterBar
            onSearch={handleSearch}
            statusOptions={statusOptions}
            onStatusChange={handleStatusChange}
            sortOptions={sortOptions}
            onSortChange={handleSortChange}
          />

          {filteredAssignments.length > 0 ? (
            <div className="mt-6 space-y-4  mx-auto">
              {filteredAssignments.map((assignment) => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No assignments found"
              description="No collaborative assignments matching your filters were found."
              buttonText="Schedule New Assignment"
              onButtonClick={handleScheduleNewAssignment}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AssignmentHistory;
