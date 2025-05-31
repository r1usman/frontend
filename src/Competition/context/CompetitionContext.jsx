import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  competitions as mockCompetitions,
  problems as mockProblems,
  submissions as mockSubmissions,
} from '../data/mockData';

const CompetitionContext = createContext(undefined);

export const CompetitionProvider = ({ children }) => {
  const [competitions, setCompetitions] = useState(mockCompetitions);
  const [problems, setProblems] = useState(mockProblems);
  const [submissions, setSubmissions] = useState(mockSubmissions);

  // Setup auto-submission timers
  useEffect(() => {
    const timers = [];

    competitions.forEach((competition) => {
      if (competition.autoSubmission) {
        const endTime = new Date(competition.endTime).getTime();
        const now = new Date().getTime();
        const timeUntilEnd = endTime - now;

        if (timeUntilEnd > 0) {
          const timer = setTimeout(() => {
            // Auto-submit all unsaved work
            console.log(`Auto-submitting for competition: ${competition.id}`);
            // In a real app, this would collect all drafts and submit them
          }, timeUntilEnd);

          timers.push(timer);
        }
      }
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [competitions]);

  const addCompetition = (competition) => {
    const newCompetition = {
      ...competition,
      id: Math.random().toString(36).substr(2, 9),
    };
    setCompetitions([...competitions, newCompetition]);
  };

  const updateCompetition = (id, competitionUpdate) => {
    setCompetitions(
      competitions.map((comp) =>
        comp.id === id ? { ...comp, ...competitionUpdate } : comp
      )
    );
  };

  const deleteCompetition = (id) => {
    setCompetitions(competitions.filter((comp) => comp.id !== id));
  };

  const addProblem = (problem) => {
    const newProblem = {
      ...problem,
      id: Math.random().toString(36).substr(2, 9),
    };
    setProblems([...problems, newProblem]);
    return newProblem;
  };

  const updateProblem = (id, problemUpdate) => {
    setProblems(
      problems.map((prob) =>
        prob.id === id ? { ...prob, ...problemUpdate } : prob
      )
    );
  };

  const deleteProblem = (id) => {
    setProblems(problems.filter((prob) => prob.id !== id));
    // Also update competitions that contain this problem
    setCompetitions(
      competitions.map((comp) => ({
        ...comp,
        problems: comp.problems.filter((p) => p.id !== id),
      }))
    );
  };

  const addSubmission = (submission) => {
    const newSubmission = {
      ...submission,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      score: 0,
      results: [],
    };
    setSubmissions([...submissions, newSubmission]);

    // Auto-evaluate the submission
    evaluateSubmission(newSubmission.id);
  };

  const getSubmissionsByUser = (userId, competitionId) => {
    return submissions.filter(
      (sub) =>
        sub.userId === userId &&
        (competitionId ? sub.competitionId === competitionId : true)
    );
  };

  const getSubmissionsByProblem = (problemId, competitionId) => {
    return submissions.filter(
      (sub) =>
        sub.problemId === problemId &&
        (competitionId ? sub.competitionId === competitionId : true)
    );
  };

  // Mock evaluation function
  const evaluateSubmission = async (submissionId) => {
    // In a real app, this would send the code to a backend for execution
    setSubmissions(
      submissions.map((sub) => {
        if (sub.id === submissionId) {
          // Find the problem
          const problem = problems.find((p) => p.id === sub.problemId);
          if (!problem) return sub;

          // Mock evaluation results
          const results = problem.sampleTestCases.map((tc) => ({
            testCaseId: tc.id,
            passed: Math.random() > 0.3, // 70% chance of passing
            executionTime: Math.floor(Math.random() * 100),
          }));

          // Calculate score based on passed test cases
          const passedCount = results.filter((r) => r.passed).length;
          const totalCount = results.length;
          const score = Math.round((passedCount / totalCount) * 100);

          return {
            ...sub,
            status: 'completed',
            results,
            score,
            executionTime: results.reduce(
              (sum, r) => sum + (r.executionTime || 0),
              0
            ),
          };
        }
        return sub;
      })
    );

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <CompetitionContext.Provider
      value={{
        competitions,
        problems,
        submissions,
        addCompetition,
        updateCompetition,
        deleteCompetition,
        addProblem,
        updateProblem,
        deleteProblem,
        addSubmission,
        getSubmissionsByUser,
        getSubmissionsByProblem,
        evaluateSubmission,
      }}
    >
      {children}
    </CompetitionContext.Provider>
  );
};

export const useCompetition = () => {
  const context = useContext(CompetitionContext);
  if (context === undefined) {
    throw new Error(
      'useCompetition must be used within a CompetitionProvider'
    );
  }
  return context;
};
