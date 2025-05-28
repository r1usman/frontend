import { createContext, useContext, useState, useEffect } from 'react';

const BookmarkContext = createContext({
  bookmarks: [],
  addBookmark: () => { },
  removeBookmark: () => { },
  clearBookmarks: () => { },
  isBookmarked: () => false,
});

export const useBookmarks = () => useContext(BookmarkContext);

const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = localStorage.getItem('pythonBookmarks');
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  useEffect(() => {
    localStorage.setItem('pythonBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (bookmark) => {
    setBookmarks(prev => {
      // Check if already exists
      if (prev.some(b => b.id === bookmark.id)) {
        return prev;
      }
      return [...prev, bookmark];
    });
  };

  const removeBookmark = (id) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
  };

  const clearBookmarks = () => {
    setBookmarks([]);
  };

  const isBookmarked = (id) => {
    return bookmarks.some(bookmark => bookmark.id === id);
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        clearBookmarks,
        isBookmarked
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export { BookmarkProvider };
