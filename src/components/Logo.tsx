
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/dashboard" className="flex items-center">
      <div className="bg-blue-600 text-white w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold">
        HR
      </div>
      <span className="ml-2 font-bold text-gray-800">EasyHR</span>
    </Link>
  );
};

export default Logo;
