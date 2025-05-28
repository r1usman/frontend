import { createContext, useContext, useState, useEffect } from 'react';
import { fetchPythonTopics } from '../services/pythonService';

const PythonTopicContext = createContext({
  topics: [],
  loading: false,
  error: null,
  getTopic: () => null,
  getAdjacentTopics: () => [null, null],
  searchTopics: () => [],
});

export const usePythonTopics = () => useContext(PythonTopicContext);

const PythonTopicProvider = ({ children }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allSubTopics, setAllSubTopics] = useState([]);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        setLoading(true);
        const data = await fetchPythonTopics();
        setTopics(data);
        
        // Create a flat list of all subtopics for easier searching
        const allSubtopicsArray = [];
        data.forEach(category => {
          if (category.subtopics) {
            allSubtopicsArray.push(...category.subtopics);
          }
        });
        setAllSubTopics(allSubtopicsArray);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load Python topics. Please try again later.');
        setLoading(false);
        console.error('Error loading topics:', err);
      }
    };

    loadTopics();
  }, []);

  const getTopic = (id) => {
    for (const category of topics) {
      if (category.subtopics) {
        const topic = category.subtopics.find(subtopic => subtopic.id === id);
        if (topic) return topic;
      }
    }
    return null;
  };

  const getAdjacentTopics = (currentId) => {
    const currentIndex = allSubTopics.findIndex(topic => topic.id === currentId);
    if (currentIndex === -1) return [null, null];
    
    const prevTopic = currentIndex > 0 ? allSubTopics[currentIndex - 1] : null;
    const nextTopic = currentIndex < allSubTopics.length - 1 ? allSubTopics[currentIndex + 1] : null;
    
    return [prevTopic, nextTopic];
  };

  const searchTopics = (query) => {
    if (!query) return [];
    
    const normalizedQuery = query.toLowerCase();
    return allSubTopics.filter(topic => 
      topic.title.toLowerCase().includes(normalizedQuery) || 
      (topic.description && topic.description.toLowerCase().includes(normalizedQuery)) ||
      (topic.content && topic.content.toLowerCase().includes(normalizedQuery))
    );
  };

  return (
    <PythonTopicContext.Provider 
      value={{ 
        topics, 
        loading, 
        error, 
        getTopic,
        getAdjacentTopics,
        searchTopics
      }}
    >
      {children}
    </PythonTopicContext.Provider>
  );
};

export { PythonTopicProvider };
