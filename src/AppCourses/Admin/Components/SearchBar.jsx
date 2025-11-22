import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../../ContextApi/BlogContext";
import { LuSearch } from "react-icons/lu";

const SearchBar = ({ course , setActiveTopic }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const {selectedBlog,setSelectedBlog} = useContext(SearchContext)

  console.log("selectedBlog", selectedBlog);
  
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/Blog/search", {
          params: {
            q: query,
            courseId: course?._id
          }
        });

        setSuggestions(res.data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [query, course]);

  const highlightMatch = (text, query) => {
    const regex = new RegExp(`(${query})`, "i");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="text-sky-600 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="relative w-80">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search blogs..."
        className="form-input-Course1"
      />

      {query && (
        <ul className="absolute bg-white border border-sky-600 text-gray-500 w-full mt-1 rounded shadow-lg max-h-60 overflow-auto z-10">
          {loading && (
            <li className="p-2 text-gray-500">Loading...</li>
          )}
          {!loading && suggestions.length === 0 && (
            <li className="p-2 text-gray-500">No matching blogs found</li>
          )}
          {!loading && suggestions.map((item) => (
            <li
              key={item._id}
              className="flex items-center gap-2 line-clamp-1 px-2 py-3 text-sm hover:bg-gray-100 cursor-pointer border-b border-gray-100"
              onClick={() => {
                setSelectedBlog(item);
                setActiveTopic("")
                setQuery("")
                setSuggestions([]);
              }}
            >
              <LuSearch/>
              <div className="">{highlightMatch(item.title, query)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
