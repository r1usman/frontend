import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCompetition } from '../../context/CompetitionContext';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import CompetitionTimer from '../../components/CompetitionTimer';
import CodeEditor from '../../components/CodeEditor';
import TestCaseDisplay from '../../components/TestCaseDisplay';
import SubmissionResults from '../../components/SubmissionResults';
import CodeingEnvironment from '../../AppEditor/CodeingEnvironment';

const StudentCompetition = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    competitions,
    problems,
    submissions,
    addSubmission,
    getSubmissionsByUser,
  } = useCompetition();
  const { user } = useAuth();

  const [selectedProblemIndex, setSelectedProblemIndex] = useState(0);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState(null);

  if (!id || !user) {
    return <div>Competition or user not found</div>;
  }

  const competition = competitions.find((c) => c.id === id);

  if (!competition) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">Competition not found</p>
        <Link
          to="/student/competitions"
          className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft size={18} />
          <span>Back to Competitions</span>
        </Link>
      </div>
    );
  }

  const now = new Date();
  const startTime = new Date(competition.startTime);
  const endTime = new Date(competition.endTime);

  // Check if competition is active
  if (now < startTime) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">This competition has not started yet</p>
        <Link
          to="/student/competitions"
          className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800"
        >
          <ArrowLeft size={18} />
          <span>Back to Competitions</span>
        </Link>
      </div>
    );
  }

  if (now > endTime) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">This competition has ended</p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/student/competitions"
            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeft size={18} />
            <span>Back to Competitions</span>
          </Link>
          <Link
            to={`/student/competitions/${id}/leaderboard`}
            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800"
          >
            <span>View Leaderboard</span>
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  const selectedProblem = competition.problems[selectedProblemIndex];

  const userSubmissions = getSubmissionsByUser(user.id, competition.id);
  const problemSubmissions = userSubmissions.filter(
    (sub) => sub.problemId === selectedProblem.id
  );
  const latestSubmission =
    problemSubmissions.length > 0
      ? problemSubmissions
          .sort(
            (a, b) =>
              new Date(b.submissionTime).getTime() -
              new Date(a.submissionTime).getTime()
          )[0]
      : null;

  const handlePrevProblem = () => {
    if (selectedProblemIndex > 0) {
      setSelectedProblemIndex(selectedProblemIndex - 1);
      setCurrentSubmission(null);
    }
  };

  const handleNextProblem = () => {
    if (selectedProblemIndex < competition.problems.length - 1) {
      setSelectedProblemIndex(selectedProblemIndex + 1);
      setCurrentSubmission(null);
    }
  };

  const handleSaveCode = (newCode) => {
    setCode(newCode);
    // In a real app, this would save the code as a draft
  };

  const handleSubmit = () => {
    if (!code.trim()) return;

    setIsSubmitting(true);

    // Create a new submission
    addSubmission({
      userId: user.id,
      username: user.username,
      problemId: selectedProblem.id,
      competitionId: competition.id,
      code,
      language,
      submissionTime: new Date().toISOString(),
    });

    // In a real app, this would send the code to a backend for evaluation
    setTimeout(() => {
      setIsSubmitting(false);
      // Get the latest submission after submission is complete
      const newSubmissions = getSubmissionsByUser(user.id, competition.id)
        .filter((sub) => sub.problemId === selectedProblem.id)
        .sort(
          (a, b) =>
            new Date(b.submissionTime).getTime() -
            new Date(a.submissionTime).getTime()
        );

      if (newSubmissions.length > 0) {
        setCurrentSubmission(newSubmissions[0].id);
      }
    }, 1500);
  };

  const handleTimeEnd = () => {
    // Auto-submit when time ends
    if (competition.autoSubmission) {
      handleSubmit();
    }

    // Redirect to leaderboard
    setTimeout(() => {
      navigate(`/student/competitions/${id}/leaderboard`);
    }, 2000);
  };

  const currentSubmissionData = currentSubmission
    ? submissions.find((sub) => sub.id === currentSubmission)
    : null;

  return (
    <div className=''>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link
            to="Mod/student/competitions"
            className="mr-4 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">{competition.name }</h1>
        </div>
        <CompetitionTimer
          endTime={competition.endTime}
          onTimeEnd={handleTimeEnd}
        />
      </div>

      <div className="">

         <div className="px-6">
              <h2 className="text-xl font-bold mb-4">
                {selectedProblem.title}
              </h2>
              <div className="prose max-w-none mb-6">
                <p>{selectedProblem.description}</p>
              </div>
          </div>
        
        <CodeingEnvironment/>

        <div className="px-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center">
                <button
                  onClick={handlePrevProblem}
                  disabled={selectedProblemIndex === 0}
                  className={`p-1 rounded-full ${
                    selectedProblemIndex === 0
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="mx-2 text-sm text-gray-500">
                  Problem {selectedProblemIndex + 1} of{' '}
                  {competition.problems.length}
                </span>
                <button
                  onClick={handleNextProblem}
                  disabled={
                    selectedProblemIndex ===
                    competition.problems.length - 1
                  }
                  className={`p-1 rounded-full ${
                    selectedProblemIndex ===
                    competition.problems.length - 1
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Time Limit: {selectedProblem.timeLimit}ms
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {selectedProblem.title}
              </h2>
              <div className="prose max-w-none mb-6">
                <p>{selectedProblem.description}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Input Format</h3>
                <p className="text-gray-700">
                  {selectedProblem.inputFormat}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Output Format</h3>
                <p className="text-gray-700">
                  {selectedProblem.outputFormat}
                </p>
              </div>

              <TestCaseDisplay
                testCases={selectedProblem.sampleTestCases}
                title="Sample Test Cases"
              />
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* <p>{JSON.stringify(problems)}</p> */}
          <p>
           {
            problems.map((item , index)=>(
              <div>{item.title}</div>
            ))
           }
          </p>
        
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => setCurrentSubmission(latestSubmission?.id || null)}
                  disabled={!latestSubmission}
                  className={`px-4 py-2 border rounded-md ${
                    !latestSubmission 
                      ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
                      : 'border-indigo-300 text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  View Last Submission
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !code.trim()}
                  className={`px-4 py-2 rounded-md ${
                    isSubmitting || !code.trim()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Solution'}
                </button>
              </div>
        </div>


      </div>
    </div>
  );
};

export default StudentCompetition;
