
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="bg-brand-blue text-white w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold">
        HR
      </div>
      <span className="ml-2 font-bold text-gray-800">EasyHR</span>
    </div>
  );
};

export default Logo;
