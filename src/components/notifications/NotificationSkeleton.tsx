import React from "react";

export const NotificationSkeleton: React.FC = () => {
  const renderSkeletonNotification = () => (
    <div className="py-3 px-3 md:px-6 flex flex-wrap w-full gap-2 sm:gap-4 xl:gap-8 cursor-pointer animate-pulse bg-gray-50 rounded-lg mb-2">
      <div className="w-14 h-14 rounded-full animate-pulse bg-gray-200"></div>
      <div className="w-9/12 sm:w-10/12">
          <div className="animate-pulse bg-gray-200 h-9 rounded-md mb-2"></div>
          <div className="flex pt-2 gap-2 md:gap-4">
            <div className="h-4 animate-pulse bg-gray-200 rounded-md w-1/5"></div>
            <div className="h-4 animate-pulse bg-gray-200 rounded-md w-1/4"></div>
            <div className="h-4 animate-pulse bg-gray-200 rounded-md w-full"></div>
          </div>
        </div>
    </div>
  );

  return (
    <div className="container px-10 gap-10 mx-auto overflow-x-hidden flex items-center justify-center w-full">
      <div className="w-full gap-10">
        {Array(5).fill(null).map((_, index) => (
          <React.Fragment key={index}>
            {renderSkeletonNotification()}
          </React.Fragment>
        ))}
      </div>
    </div>
  ); 
};

