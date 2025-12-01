import React from 'react';

// A sub-component to mimic the structure of a single IssueCard
const IssueCardSkeleton = () => (
  <div className="bg-linear-to-b from-background to-secondary/30 p-6 rounded-xl shadow-lg border animate-pulse transition-shadow duration-300">
    {/* Header and Bookmark */}
    <div className="flex justify-between items-start mb-4">
      <div className="space-y-2 w-3/4">
        {/* Title */}
        <div className="h-6 bg-linear-to-b from-background to-secondary/30 rounded w-full"></div>
        {/* Repository Link */}
        <div className="h-4 bg-linear-to-b from-background to-secondary/30 rounded w-2/5"></div>
      </div>
      {/* Bookmark Icon */}
      <div className="w-8 h-8 bg-linear-to-b from-background to-secondary/30 rounded-full"></div>
    </div>

    {/* Description */}
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-linear-to-b from-background to-secondary/30 rounded w-full"></div>
      <div className="h-4 bg-linear-to-b from-background to-secondary/30 rounded w-11/12"></div>
      <div className="h-4 bg-linear-to-b from-background to-secondary/30 rounded w-1/2"></div>
    </div>

    {/* Skills/Labels */}
    <div className="flex flex-wrap gap-2 mb-4">
      <div className="h-6 w-16 bg-linear-to-b from-background to-secondary/30 rounded-full"></div>
      <div className="h-6 w-20 bg-linear-to-b from-background to-secondary/30 rounded-full"></div>
      <div className="h-6 w-12 bg-linear-to-b from-background to-secondary/30 rounded-full"></div>
    </div>

    {/* Footer Metadata */}
    <div className="flex justify-between items-center text-sm text-gray-400">
      {/* Time/Status */}
      <div className="h-4 w-20 bg-linear-to-b from-background to-secondary/30 rounded"></div>
      {/* Difficulty */}
      <div className="h-4 w-16 bg-linear-to-b from-background to-secondary/30 rounded"></div>
    </div>
  </div>
);

// The main skeleton component for the whole section
const ExploreSkeleton = () => {
  return (
    <section id="explore-skeleton" className="py-20 px-4 bg-linear-to-b from-background to-secondary/30">
      <div className="container mx-auto max-w-7xl space-y-12">
        {/* Issues List Header Skeleton */}
        <div className="space-y-4 pt-4">
          <div className="h-6 w-40 bg-linear-to-b from-background to-secondary/30 rounded animate-pulse"></div>

          {/* Issues Grid Skeleton */}
          <div className="grid md:grid-cols-2 gap-6">
            <IssueCardSkeleton />
            <IssueCardSkeleton />
            <IssueCardSkeleton />
            <IssueCardSkeleton />
          </div>
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center mt-8 animate-pulse">
          <div className="flex space-x-4 items-center">
             {/* Previous Button */}
            <div className="h-10 w-10 bg-linear-to-b from-background to-secondary/30 rounded-full"></div>
             {/* Page Count Text */}
            <div className="h-4 w-32 bg-linear-to-b from-background to-secondary/30 rounded"></div>
             {/* Next Button */}
            <div className="h-10 w-10 bg-linear-to-b from-background to-secondary/30 rounded-full"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExploreSkeleton;