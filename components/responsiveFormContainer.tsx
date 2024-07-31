import React from 'react';

const ResponsiveFormContainer = ({ children }: { children: React.ReactNode}) => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {React.Children.map(children, (child, index) => (
            <div key={index} className="w-full">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveFormContainer;