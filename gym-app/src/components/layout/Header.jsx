import React from "react";

const Header = ({ user }) => {
  return (
    <header className="absolute top-0 left-0 w-full p-4 flex items-center bg-transparent z-10">
      <div className="flex items-center">
        {user.profilePicture ? (
          <img
            src={`http://localhost:5001/${user.profilePicture}`}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover mr-4"
          />
        ) : (
          <span className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-xl text-white mr-4">
            {user.username[0].toUpperCase()}
          </span>
        )}
        <span className="font-semibold text-black">{user.username}</span>
      </div>
    </header>
  );
};

export default Header;
