import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { usePythonTopics } from '../contexts/PythonTopicContext';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const { searchTopics, loading } = usePythonTopics();
  const [results, setResults] = useState([]);

  useEffect(() => {
    setSearchQuery(query);
    if (query) {
      const searchResults = searchTopics(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query, searchTopics]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold text-python-dark mb-6">Search Python Topics</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for Python topics, functions, modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 px-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-python-blue focus:border-transparent shadow-sm"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-python-blue text-white rounded-md hover:bg-blue-700 transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>
      </form>

      {query && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            {loading ? 'Searching...' : `Results for "${query}"`}
          </h2>
          <p className="text-gray-600 mt-1">
            {!loading && `Found ${results.length} topics matching your search`}
          </p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-python-blue"></div>
        </div>
      ) : (
        <>
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.map((topic) => (
                <Link
                  key={topic.id}
                  to={`/topic/${topic.id}`}
                  className="block bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-python-dark">{topic.title}</h3>
                  {topic.description && (
                    <p className="text-gray-600 mt-1 line-clamp-2">{topic.description}</p>
                  )}
                  <div className="flex items-center text-python-blue font-medium mt-2">
                    View topic <ArrowRight size={16} className="ml-2" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            query && (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No results found</h3>
                <p className="text-gray-600">
                  We couldn't find any topics matching "{query}". Try using different keywords or browse all topics.
                </p>
              </div>
            )
          )}
          
          {!query && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Search Topics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Functions', 'Lists', 'Dictionaries', 'Classes', 'Loops', 'File Handling'].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setSearchParams({ q: topic.toLowerCase() })}
                    className="py-2 px-4 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors text-gray-800"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
