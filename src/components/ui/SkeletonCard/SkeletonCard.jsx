import React from 'react';

function SkeletonCard() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-pulse">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-gray-200"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-100 rounded w-1/4"></div>
    </div>
  );
}

export default SkeletonCard;
