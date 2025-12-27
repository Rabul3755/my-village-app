import React from "react";

const IssueDetails = ({ issue, onClose }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pending":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      "Roads & Infrastructure": "🛣️",
      "Drainage & Sanitation": "🚰",
      "Water Supply": "💧",
      Electricity: "💡",
      "Waste Management": "🗑️",
      Healthcare: "🏥",
      Education: "📚",
      "Public Safety": "🚨",
      "Parks & Recreation": "🌳",
      Other: "❓",
    };
    return icons[category] || "📋";
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-start p-6 border-b border-gray-200">
        <div className="flex items-start gap-4">
          <span className="text-2xl mt-1">
            {getCategoryIcon(issue.category)}
          </span>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {issue.title}
            </h2>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                  issue.status
                )}`}
              >
                {issue.status.replace("-", " ")}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-600">{issue.category}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {issue.description}
              </p>
            </div>

            {issue.updates && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 mt-0.5">💡</span>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-1">
                      Latest Update
                    </h4>
                    {Array.isArray(issue.updates) &&
                      issue.updates.map((u, i) => (
                        <p key={i} className="text-blue-700">
                          • {u.text} —{" "}
                          <span className="italic">{u.updatedBy}</span>
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Location & Date */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">
                Location Details
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-600">{issue.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Reported on{" "}
                    {new Date(issue.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">
                Quick Actions
              </h4>
              <div className="space-y-2">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm">
                  📞 Share with Authorities
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors font-medium text-sm">
                  👍 Support this Issue ({issue.votes || 0})
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors font-medium text-sm">
                  🔄 Get Updates
                </button>
              </div>
            </div>

            {/* Reporter Info */}
            {issue.reporter && issue.reporter !== "Anonymous" && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Reported By
                </h4>
                <p className="text-gray-600 text-sm">{issue.reporter}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
