import React from 'react';

const ResponsiveFormContainer = ({ children }: { children: React.ReactNode}) => {
  return (
    <div className="max-w-5xl p-4 items-center justify-center">
      <div className="bg-transparent rounded-lg p-6">
        <div className="flex flex-col max-w-5xl">
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