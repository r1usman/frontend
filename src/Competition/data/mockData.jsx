import { addHours } from 'date-fns';

// Mock Users
export const users = [
  { id: '1', username: 'instructor1', role: 'instructor' },
  { id: '2', username: 'student1', role: 'student' },
  { id: '3', username: 'student2', role: 'student' },
];

// Mock Problems
export const problems = [
  {
    id: '1',
    title: 'Two Sum',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    inputFormat:
      'First line contains n (the size of array) and target. Second line contains n space-separated integers.',
    outputFormat: 'Two space-separated integers representing the indices.',
    sampleTestCases: [
      {
        id: '1',
        input: '4 9\n2 7 11 15',
        output: '0 1',
      },
      {
        id: '2',
        input: '3 6\n3 2 4',
        output: '1 2',
      },
    ],
    hiddenTestCases: [
      {
        id: '3',
        input: '5 10\n1 3 5 7 9',
        output: '1 3',
      },
    ],
    timeLimit: 1000,
  },
  {
    id: '2',
    title: 'Palindrome Number',
    description:
      'Given an integer x, return true if x is a palindrome, and false otherwise.',
    inputFormat: 'A single integer x.',
    outputFormat: '"true" or "false" (without quotes).',
    sampleTestCases: [
      {
        id: '1',
        input: '121',
        output: 'true',
      },
      {
        id: '2',
        input: '-121',
        output: 'false',
      },
    ],
    hiddenTestCases: [
      {
        id: '3',
        input: '12321',
        output: 'true',
      },
    ],
    timeLimit: 1000,
  },
];

// Mock Competitions
const now = new Date();
export const competitions = [
  {
    id: '1',
    name: 'Weekly Coding Challenge',
    description: 'Solve algorithmic problems within the time limit.',
    startTime: now.toISOString(),
    endTime: addHours(now, 2).toISOString(),
    problems: [problems[0], problems[1]],
    autoSubmission: true,
  },
  {
    id: '2',
    name: 'Advanced Algorithms',
    description: 'Test your skills with complex algorithmic challenges.',
    startTime: addHours(now, 24).toISOString(),
    endTime: addHours(now, 27).toISOString(),
    problems: [problems[0]],
    timeLimit: 7200000, // 2 hours
    autoSubmission: true,
  },
];

// Mock Submissions
export const submissions = [
  {
    id: '1',
    userId: '2',
    username: 'student1',
    problemId: '1',
    competitionId: '1',
    code:
      'function twoSum(nums, target) {\n  const map = {};\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map[complement] !== undefined) {\n      return [map[complement], i];\n    }\n    map[nums[i]] = i;\n  }\n  return [];\n}',
    language: 'javascript',
    status: 'completed',
    results: [
      { testCaseId: '1', passed: true, executionTime: 5 },
      { testCaseId: '2', passed: true, executionTime: 3 },
    ],
    score: 100,
    submissionTime: new Date().toISOString(),
    executionTime: 8,
  },
];

// Current user (for demo purposes)
export const currentUser = users[1]; // Default to instructor
