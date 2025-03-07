import React from "react";

const PersonDrawer = ({users, onCopy, onLeave }) => {


  return (
    <div className="flex flex-col min-h-screen ">
      <h1 className="text-2xl mb-2">Users</h1> 

      <div className="grid grid-cols-3 gap-8">
        {users.map((user, index) => (
          <div className="w-fit pt-2 pr-2" key={index}>
            <div className="cursor-default avatar online placeholder">
              <div className="bg-neutral w-14 rounded-full flex items-center justify-center">
                <span className="text-2xl">{user.userName[0]}</span>
              </div>
            </div>

            <div className="mt-1">
              <p className="text-center text-white text-sm">
                {user.userName.slice(0, 9)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-10 justify-center mt-auto pb-10">
        <div onClick={onCopy} className="cursor-pointer bg-green-500  w-24 h-10 rounded-lg flex items-center justify-center">
          <img src="/copy.png" className="w-7 h-7" />
        </div>

        <div onClick={onLeave}className="cursor-pointer bg-red-500 pl-2 w-24 h-10 rounded-lg flex items-center justify-center">
          <img src="/logout.png" className="w-7 h-7 " />
        </div>
      </div>
    </div>
  );
};

export default PersonDrawer;
