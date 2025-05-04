// src/components/EmptyState.jsx
import React from "react";

const EmptyState = ({ icon, title, description, children }) => {
  return (
    <div className="text-center p-8">
      <div className="mx-auto h-16 w-16 flex items-center justify-center text-gray-400 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
        {description}
      </p>
      {children}
    </div>
  );
};

export default EmptyState;
