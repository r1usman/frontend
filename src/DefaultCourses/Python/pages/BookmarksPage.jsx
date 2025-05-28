import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, Search, ArrowRight } from 'lucide-react';
import { useBookmarks } from '../contexts/BookmarkContext';

const BookmarksPage = () => {
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarks();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredBookmarks = bookmarks.filter(bookmark => 
    bookmark.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-python-dark">Your Bookmarks</h1>
        {bookmarks.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to remove all bookmarks?')) {
                clearBookmarks();
              }
            }}
            className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm font-medium"
          >
            <Trash2 size={16} /> Clear All
          </button>
        )}
      </div>

      {bookmarks.length > 0 ? (
        <>
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search your bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-4 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-python-blue focus:border-transparent"
            />
            <Search 
              size={18} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
          </div>

          {filteredBookmarks.length > 0 ? (
            <div className="space-y-3">
              {filteredBookmarks.map(bookmark => (
                <div 
                  key={bookmark.id} 
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow"
                >
                  <div>
                    <Link 
                      to={bookmark.url}
                      className="text-lg font-medium text-python-dark hover:text-python-blue transition-colors"
                    >
                      {bookmark.title}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      Bookmarked on {formatDate(bookmark.date)}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Link
                      to={bookmark.url}
                      className="text-python-blue hover:text-python-dark transition-colors"
                      aria-label={`Go to ${bookmark.title}`}
                    >
                      <ArrowRight size={20} />
                    </Link>
                    <button
                      onClick={() => removeBookmark(bookmark.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label={`Remove ${bookmark.title} from bookmarks`}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-gray-700">
                No bookmarks match your search for "{searchQuery}".
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <Bookmark size={48} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No bookmarks yet</h2>
          <p className="text-gray-600 mb-6">
            You haven't bookmarked any Python topics yet. Click the bookmark icon on any topic page to save it for later.
          </p>
          <Link 
            to="/"
            className="inline-block bg-python-blue text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Browse Topics
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
