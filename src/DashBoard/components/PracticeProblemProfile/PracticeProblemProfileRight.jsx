import React, { useState, useEffect } from "react";
import { userApi, authApi } from "../../../services/api";

export default function PracticeProblemProfileRight() {
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const profile = await authApi.getUserProfile();
      await fetchUserStats(profile.user._id);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  };

  const fetchUserStats = async (userId) => {
    try {
      const stats = await userApi.getUserStats(userId);
      setUserStats(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  // Return Top 5 Tags
  const getTopTags = () => {
    if (!userStats || !Array.isArray(userStats.PREFERRED_TAGS)) return [];
    return [...userStats.PREFERRED_TAGS]
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const topTags = getTopTags();

  return (
    <div className="space-y-6">
      {/* Skills */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Top Skills</h2>

        {/* Loading */}
        {loading && <div className="text-sm text-gray-500">Loading...</div>}

        {/* No skills */}
        {!loading && topTags.length === 0 && (
          <div className="text-sm text-gray-500">No skills to show</div>
        )}

        {/* Top 5 skills */}
        {!loading && topTags.length > 0 && (
          <div className="space-y-2">
            {topTags.map((tag) => (
              <div key={tag._id} className="flex justify-between items-center">
                <span className="text-sm text-gray-800">{tag.tag}</span>
                <span className="text-xs font-bold text-blue-700">
                  {tag.count}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}