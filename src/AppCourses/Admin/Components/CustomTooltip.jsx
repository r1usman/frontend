import React from "react";

const CustomTooltip = ({ active, payload }) => {
  // Check that payload exists and has data
  if (active && payload && payload.length && payload[0].payload) {
    const data = payload[0].payload;
    // Optional chaining to prevent undefined errors
    const name = data?.name || "N/A";
    const count = data?.count ?? 0;

    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-200">
        <p className="text-xs font-semibold text-sky-800 mb-1">{name}</p>
        <p className="text-sm text-gray-600">
          Count: <span className="text-sm font-medium text-gray-900">{count}</span>
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
