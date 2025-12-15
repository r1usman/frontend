import React from "react";
import { useNavigate } from "react-router-dom";

function NoFound() {
  const navigate = useNavigate();

  // If you have helper functions, CALL them and render their result,
  // do NOT return or render the function itself.
  const renderTip = () => (
    <p className="text-sm text-gray-500 mt-2">
      Check the URL or go back to the dashboard.
    </p>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-sm rounded-lg p-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Page not found</h1>
        <p className="text-gray-600 mt-2">
          We couldn’t find the page you were looking for.
        </p>
        {renderTip()}
        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white text-sm"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoFound;
