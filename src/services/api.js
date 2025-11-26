const API_BASE_URL = "http://localhost:3000/api";
export const ASSET_BASE_URL = "http://localhost:3000/api/assets";

// Helper to get token
const getAuthToken = () => localStorage.getItem("token");
const getToken = () => localStorage.getItem("token");

// Auth API
export const authApi = {
  // Get user profile
  getUserProfile: async () => {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('AUTHENTICATION_REQUIRED');
    }

    const response = await fetch(`http://localhost:3000/Auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch user profile');
    return response.json();
  }
};

export const userApi = {
  // Fetch user stats by ID
  getUserStats: async (userId) => {
    const token = getAuthToken();

    if (!token) {
      throw new Error("AUTHENTICATION_REQUIRED");
    }

    const response = await fetch(`${API_BASE_URL}/user/stats/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch user stats");
    return response.json();
  },
};

export const problemsApi = {
  // Problem Statistics
  getProblemStats: async () => {
    const response = await fetch(`${API_BASE_URL}/problems/stats`);
    if (!response.ok) throw new Error("Failed to fetch problem statistics");
    return response.json();
  },


  // Get all problems
  getAllProblems: async () => {
    const response = await fetch(`${API_BASE_URL}/problems`);
    if (!response.ok) throw new Error("Failed to fetch problems");
    return response.json();
  },

  // Filter by difficulty
  getByDifficulty: async (difficulty) => {
    const response = await fetch(
      `${API_BASE_URL}/problems/filter/difficulty/${difficulty}`
    );
    if (!response.ok) throw new Error("Failed to fetch problems by difficulty");
    return response.json();
  },

  // Filter by tags (can pass multiple tags)
  getByTags: async (tags) => {
    const tagsParam = Array.isArray(tags) ? tags.join(",") : tags;
    const response = await fetch(
      `${API_BASE_URL}/problems/filter/tags?tags=${encodeURIComponent(
        tagsParam
      )}`
    );
    if (!response.ok) throw new Error("Failed to fetch problems by tags");
    return response.json();
  },

  // Search by name
  searchProblems: async (query) => {
    const response = await fetch(
      `${API_BASE_URL}/problems/search?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error("Failed to search problems");
    return response.json();
  },

  // Get problem by ID
  getProblemById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/problems/${id}`);
    if (!response.ok) throw new Error("Failed to fetch problem details");
    return response.json();
  },

  // New method for generating AI problem
  // generateAiProblem: async (problemId) => {
  //   const response = await fetch(`${API_BASE_URL}/ai-problems/generate/${problemId}`, {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Bearer ${getToken()}`,
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //   if (!response.ok) {
  //     const error = await response.json();
  //     throw new Error(error.message || 'Failed to generate AI problem');
  //   }
  //   return response.json();
  // },

  // Add this new method
  getPersonalizedProblems: async () => {
    const token = getAuthToken();

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await fetch(`${API_BASE_URL}/problems/personalized`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch personalized problems");
    return response.json();
  },

  // Submit code solution
  submitCode: async (submissionData) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("AUTHENTICATION_REQUIRED");
    }

    const response = await fetch(`${API_BASE_URL}/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(submissionData),
    });

    if (!response.ok) throw new Error("Failed to submit code");
    return response.json();
  },

  // Get all user submissions
  getUserSubmissions: async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("AUTHENTICATION_REQUIRED");

    const response = await fetch(`${API_BASE_URL}/submissions`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Failed to fetch submissions");
    return response.json();
  },

  // Get single submission by ID
  getSubmissionById: async (id) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("AUTHENTICATION_REQUIRED");

    const response = await fetch(`${API_BASE_URL}/submissions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Failed to fetch submission");
    return response.json();
  },

  // Update submission note
  updateSubmissionNote: async (id, note) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("AUTHENTICATION_REQUIRED");

    const response = await fetch(`${API_BASE_URL}/submissions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ note }),
    });

    if (!response.ok) throw new Error("Failed to update submission");
    return response.json();
  },
};

// Add AI Problems API
export const aiProblemsApi = {
  // Generate AI problem variant
  generateAiProblem: async (problemId) => {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error("AUTHENTICATION_REQUIRED");
    }

    console.log('🔄 Generating AI problem for:', problemId);
    
    const response = await fetch(`${API_BASE_URL}/ai-problems/generate/${problemId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('📡 Response status:', response.status);
    
    if (!response.ok) {
      let errorMessage = 'Failed to generate AI problem';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
        console.error('❌ Backend error:', errorData);
      } catch (e) {
        errorMessage = `HTTP error! status: ${response.status}`;
      }
      throw new Error(errorMessage);
    }
    
    const result = await response.json();
    console.log('📦 Response data:', result);
    return result;
  },

  // Get AI problem by ID
  getAiProblemById: async (id) => {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error("AUTHENTICATION_REQUIRED");
    }

    const response = await fetch(`${API_BASE_URL}/ai-problems/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) throw new Error("Failed to fetch AI problem");
    return response.json();
  },

  // Delete AI problem
  deleteAiProblem: async (id) => {
    const token = getAuthToken();
    if (!token) throw new Error("AUTHENTICATION_REQUIRED");

    const response = await fetch(`${API_BASE_URL}/ai-problems/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete AI problem");
    }
    return response.json();
  },

  // Accept AI problem
  acceptAiProblem: async (id) => {
    const token = getAuthToken();
    if (!token) throw new Error("AUTHENTICATION_REQUIRED");

    const response = await fetch(`${API_BASE_URL}/ai-problems/accept/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to accept AI problem");
    }
    return response.json();
  },

  // Fetch all AI problems created by the user
getMyAiProblems: async () => {
  const token = getAuthToken();
  if (!token) throw new Error("AUTHENTICATION_REQUIRED");

  const response = await fetch(`${API_BASE_URL}/ai-problems`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) throw new Error("Failed to fetch AI problems");
  return response.json();
}

};



export const badgesApi = {
  getMyBadges: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("AUTHENTICATION_REQUIRED");
    }

    const response = await fetch("http://localhost:3000/api/badges/my-badges", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch badges");
    return response.json();
  },
};
