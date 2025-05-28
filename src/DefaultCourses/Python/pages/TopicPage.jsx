import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Bookmark, CheckCircle, Copy } from 'lucide-react';
import { usePythonTopics } from '../contexts/PythonTopicContext';
import { useBookmarks } from '../contexts/BookmarkContext';
import CodeBlock from '../components/CodeBlock';

const TopicPage = () => {
  const { topicId } = useParams();
  const { getTopic, getAdjacentTopics, loading } = usePythonTopics();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const [topic, setTopic] = useState(null);
  const [prevTopic, nextTopic] = getAdjacentTopics(topicId || '');
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (topicId) {
      const fetchedTopic = getTopic(topicId);
      setTopic(fetchedTopic);
      setBookmarked(isBookmarked(topicId));
      
      // Scroll to top when topic changes
      window.scrollTo(0, 0);
    }
  }, [topicId, getTopic, isBookmarked]);

  const handleBookmarkToggle = () => {
    if (!topic) return;
    
    if (bookmarked) {
      removeBookmark(topic.id);
    } else {
      addBookmark({
        id: topic.id,
        title: topic.title,
        url: `/topic/${topic.id}`,
        date: new Date().toISOString()
      });
    }
    
    setBookmarked(!bookmarked);
  };

  const handleCopyContent = () => {
    if (contentRef.current) {
      const text = contentRef.current.innerText;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-python-blue"></div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Topic Not Found</h2>
        <p className="text-gray-600 mb-6">Sorry, the topic you're looking for doesn't exist or hasn't been loaded yet.</p>
        <Link to="/" className="bg-python-blue text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in ">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-3xl font-medium text-python-dark">{topic.title}</h1>

        <button
          onClick={handleBookmarkToggle}
          className={`p-2 rounded-full ${
            bookmarked ? 'bg-python-yellow/20 text-python-dark' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          } transition-colors`}
          aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <Bookmark size={20} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
        <div className="py-2 px-3 bg-gray-50 flex items-center  justify-end">
          <button
            onClick={handleCopyContent}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors text-sm font-medium text-gray-700"
            aria-label="Copy content"
          >
            {copied ? (
              <>
                <CheckCircle size={16} className="text-green-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <div ref={contentRef} className="px-6">
          
          <div
            className="w3-content text-gray-800 leading-relaxed "
            dangerouslySetInnerHTML={{ __html: topic.content || '<p>No content available.</p>' }}
          />

          {topic.examples && topic.examples.length > 0 && (
            <div className="mt-8 mb-4 space-y-6">
              <h2 className="text-2xl font-bold text-python-dark mb-4">Examples</h2>
              {topic.examples.map((example, index) => (
                <div key={index} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-python-dark mb-3">
                      Example {index + 1}
                    </h3>
                    <CodeBlock code={example.code} language="python" />
                    {example.explanation && (
                      <div
                        className="mt-3 text-gray-700 bg-white p-4 rounded-md border border-gray-200"
                        dangerouslySetInnerHTML={{ __html: example.explanation }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        {prevTopic ? (
          <Link
            to={`/0/topic/${prevTopic.id}`}
            className="flex items-center gap-2 text-python-blue hover:text-python-dark transition-colors"
          >
            <ArrowLeft size={18} /> {prevTopic.title}
          </Link>
        ) : (
          <div></div>
        )}

        {nextTopic && (
          <Link
            to={`/0/topic/${nextTopic.id}`}
            className="flex items-center gap-2 text-python-blue hover:text-python-dark transition-colors ml-auto"
          >
            {nextTopic.title} <ArrowRight size={18} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopicPage;
