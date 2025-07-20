import React from "react";

const PersonDrawer = ({users, onCopy, onLeave }) => {


  return (
// <div className="flex flex-col min-h-screen px-3 sm:px-0"> */}
      <div className="flex flex-col w-full h-full px-3 sm:px-0">

  <h1 className="text-2xl mb-2 sm:text-2xl sm:mb-2">Users</h1> 

  <div className="grid grid-cols-4 sm:grid-cols-3 gap-4 sm:gap-8">
    {users.map((user, index) => (
      <div className="w-fit pt-1 pr-1 sm:pt-2 sm:pr-2" key={index}>
        <div className="cursor-default avatar online placeholder">
          <div className="bg-neutral w-12 sm:w-14 rounded-full flex items-center justify-center">
            <span className="text-lg sm:text-2xl">{user.userName[0]}</span>
          </div>
        </div>

        <div className="mt-1">
          <p className="text-center text-white text-xs sm:text-sm">
            {user.userName.slice(0, 7)}..
          </p>
        </div>
      </div>
    ))}
  </div>

  {/* Buttons container */}
  <div
  className="
    flex gap-x-20  fixed bottom-16 mb-1 left-1/2 -translate-x-1/2 
     py-0 px-6 rounded-lg shadow-lg
    sm:static sm:bg-transparent sm:p-4 sm:mt-auto sm:pb-10 sm:gap-10 
    sm:transform-none sm:left-auto sm:bottom-auto sm:shadow-none
    z-50
  "
>
  <div
    onClick={onCopy}
    className="cursor-pointer  bg-green-500 w-24 h-10 rounded-lg flex items-center justify-center"
  >
    <img src="/copy.png" className="w-7 h-7" alt="Copy" />
  </div>

  <div
    onClick={onLeave}
    className="cursor-pointer bg-red-500 pl-2 w-24 h-10 rounded-lg flex items-center justify-center"
  >
    <img src="/logout.png" className="w-7 h-7" alt="Logout" />
  </div>
</div>
</div>

  );
};

export default PersonDrawer;
