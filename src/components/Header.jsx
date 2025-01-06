import React from "react";

const Header = ({ title }) => {
  return (
    <div className="w-full p-4 bg-blue-500 text-white">
      <h1 className="text-lg font-semibold">{title}</h1>
    </div>
  );
};

export default Header;
