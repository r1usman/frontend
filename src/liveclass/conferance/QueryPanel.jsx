import { useState } from "react";
import { useQueries } from "./QueryContext";

export default function QueryPanel({ isDarkMode }) {
  const {
    queries,
    uniqueQueries,
    isClustering,
    error,
    addQuery,
    clearQueries,
    clusterQueries,
  } = useQueries();
  const [input, setInput] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    addQuery(input);
    setInput("");
  };

  return (
    <div
      className={`space-y-4 ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}
    >
      <form onSubmit={handleAdd} className="flex space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a new query..."
          className={`flex-1 px-3 py-2 rounded border text-sm ${
            isDarkMode
              ? "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
          }`}
        />
        <button
          type="submit"
          className={`px-3 py-2 rounded text-sm font-medium ${
            isDarkMode
              ? "bg-gray-700 hover:bg-gray-600 text-gray-100"
              : "bg-gray-200 hover:bg-gray-300 text-gray-900"
          }`}
        >
          Add
        </button>
      </form>

      <div className="flex items-center gap-2 flex-wrap">
        <button
          disabled={!queries.length || isClustering}
          onClick={clusterQueries}
          className={`px-3 py-1.5 rounded text-xs font-medium ${
            isClustering
              ? "animate-pulse bg-indigo-600 text-white"
              : isDarkMode
              ? "bg-indigo-600 hover:bg-indigo-500 text-white"
              : "bg-indigo-500 hover:bg-indigo-600 text-white"
          } disabled:opacity-50`}
        >
          {isClustering ? "Clustering..." : "Cluster"}
        </button>
        <button
          disabled={!queries.length}
          onClick={clearQueries}
          className={`px-3 py-1.5 rounded text-xs font-medium ${
            isDarkMode
              ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"
          } disabled:opacity-50`}
        >
          Clear
        </button>
        <span className="text-xs opacity-70">
          {queries.length} query{queries.length !== 1 && "ies"}
        </span>
      </div>

      <div className="space-y-3">
        <h4
          className={`text-sm font-semibold ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Submitted Queries
        </h4>
        {queries.length === 0 && (
          <p
            className={`text-xs ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No queries yet.
          </p>
        )}
        <ul className="space-y-1 max-h-48 overflow-auto pr-1">
          {queries.map((q) => (
            <li
              key={q.id}
              className={`text-xs px-2 py-1 rounded border flex justify-between gap-3 ${
                isDarkMode
                  ? "border-gray-700 bg-gray-800"
                  : "border-gray-200 bg-white"
              }`}
              title={new Date(q.createdAt).toLocaleString()}
            >
              <span className="truncate">{q.text}</span>
              <span
                className={`shrink-0 opacity-70 ${
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {q.authorName || "Anon"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <h4
          className={`text-sm font-semibold ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          Unique Queries
        </h4>
        {!uniqueQueries && (
          <p
            className={`text-xs ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No unique queries yet. Click Cluster.
          </p>
        )}
        {uniqueQueries && Array.isArray(uniqueQueries) && (
          <ul className="space-y-1 max-h-72 overflow-auto pr-1">
            {uniqueQueries.map((q, i) => (
              <li
                key={i}
                className={`text-xs px-2 py-1 rounded border ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-800"
                    : "border-gray-200 bg-white"
                }`}
              >
                {q}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
