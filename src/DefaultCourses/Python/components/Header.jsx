import { Search, Menu, BookMarked, Home } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Header = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // navigate(`/0/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md hover:bg-python-dark/20 transition-colors"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center gap-2 ml-60">
              <div className="h-10 w-10 bg-white text-black rounded-full flex items-center justify-center">
                <span className="text-python-blue text-xl font-bold">Py</span>
              </div>
              <h1 className="text-xl font-bold hidden sm:block">Python</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search Python topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-2 px-4 pr-10 rounded-md w-64 placeholder:text-white border border-gray-100 focus:outline-none focus:ring-0 focus:ring-python-yellow"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-100"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>

            <div className="flex gap-2">
              <Link
                to="/"
                className="p-2 rounded-md hover:bg-python-dark/20 transition-colors"
                aria-label="Home"
              >
                <Home size={24} />
              </Link>
              <Link
                to="/bookmarks"
                className="p-2 rounded-md hover:bg-python-dark/20 transition-colors"
                aria-label="Bookmarks"
              >
                <BookMarked size={24} />
              </Link>
              <Link
                to="/search"
                className="md:hidden p-2 rounded-md hover:bg-python-dark/20 transition-colors"
                aria-label="Search"
              >
                <Search size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
