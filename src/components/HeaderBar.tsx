import React from 'react';

const HeaderBar = () => {
  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-xl font-semibold">Hi User <span role="img" aria-label="wave">👋</span></h2>
      </div>
      <div className="flex items-center space-x-4">
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-2">
            <span className="text-blue-600">↑</span>
          </span>
          <div>
            <p className="text-sm text-gray-600">Patient</p>
            <p className="text-lg font-bold">20K</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-2">
            <span className="text-blue-600">↑</span>
          </span>
          <div>
            <p className="text-sm text-gray-600">you plan</p>
            <p className="text-lg font-bold">Vip</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <span className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-2">
            <span className="text-blue-600">↑</span>
          </span>
          <div>
            <p className="text-sm text-gray-600">Prescripti</p>
            <p className="text-lg font-bold">34</p>
          </div>
        </div>
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <span role="img" aria-label="user">👤</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;