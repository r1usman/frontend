const API_BASE_URL = 'http://localhost:3000/api';

// Helper to get token
const getAuthToken = () => localStorage.getItem('token');


export const problemsApi = {
  // Get all problems
  getAllProblems: async () => {
    const response = await fetch(`${API_BASE_URL}/problems`);
    if (!response.ok) throw new Error('Failed to fetch problems');
    return response.json();
  },

  // Filter by difficulty
  getByDifficulty: async (difficulty) => {
    const response = await fetch(`${API_BASE_URL}/problems/filter/difficulty/${difficulty}`);
    if (!response.ok) throw new Error('Failed to fetch problems by difficulty');
    return response.json();
  },

  // Filter by tags (can pass multiple tags)
  getByTags: async (tags) => {
    const tagsParam = Array.isArray(tags) ? tags.join(',') : tags;
    const response = await fetch(`${API_BASE_URL}/problems/filter/tags?tags=${encodeURIComponent(tagsParam)}`);
    if (!response.ok) throw new Error('Failed to fetch problems by tags');
    return response.json();
  },

  // Search by name
  searchProblems: async (query) => {
    const response = await fetch(`${API_BASE_URL}/problems/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search problems');
    return response.json();
  },

  // Get problem by ID
  getProblemById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/problems/${id}`);
    if (!response.ok) throw new Error('Failed to fetch problem details');
    return response.json();
  },

  // Add this new method
  getPersonalizedProblems: async () => {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_BASE_URL}/problems/personalized`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch personalized problems');
    return response.json();
  },


  // =================================================================
  // =================================================================
  // =============================== Submission Routes ==================================
  // =================================================================
  // =================================================================

  // submitCode: async (submissionData) => {
  //   const token = getAuthToken();
    
  //   if (!token) {
  //     throw new Error('Authentication required');
  //   }

  //   const response = await fetch(`${API_BASE_URL}/submissions`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     },
  //     body: JSON.stringify(submissionData)
  //   });

  //   // Testing
  //   console.log(response)
    
  //   if (!response.ok) throw new Error('Failed to submit code');
  //   return response.json();
  // },

  // Submit code solution
  submitCode: async (submissionData) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('AUTHENTICATION_REQUIRED');
    }

    const response = await fetch(`${API_BASE_URL}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(submissionData)
    });
    
    if (!response.ok) throw new Error('Failed to submit code');
    return response.json();
  },

  // Get all user submissions
  getUserSubmissions: async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('AUTHENTICATION_REQUIRED');

    const response = await fetch(`${API_BASE_URL}/submissions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) throw new Error('Failed to fetch submissions');
    return response.json();
  },

  // Get single submission by ID
  getSubmissionById: async (id) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('AUTHENTICATION_REQUIRED');

    const response = await fetch(`${API_BASE_URL}/submissions/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) throw new Error('Failed to fetch submission');
    return response.json();
  },

  // Update submission note
  updateSubmissionNote: async (id, note) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('AUTHENTICATION_REQUIRED');

    const response = await fetch(`${API_BASE_URL}/submissions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ note })
    });
    
    if (!response.ok) throw new Error('Failed to update submission');
    return response.json();
  }
};