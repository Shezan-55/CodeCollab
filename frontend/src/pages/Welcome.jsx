import React, { useState } from "react";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router";

const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [roomId, setRoomId] = useState("");

  const Logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  if (!location.state?.token) {
    return <Navigate to="/" replace />;
  }

  const createRoom = () => {
    const newRoomId = nanoid(22);
    console.log(newRoomId)
    setRoomId(newRoomId);
    
    navigate("/code-editor", {
      state: {
        roomId: newRoomId,
        msg: "Created New Room!",
        name:location.state.name,
        token:location.state.token
      },
    });
  };

  const joinRoom = () => {
    if (!roomId) {
      toast.error("Enter Room ID"); 
      return;
    }

    navigate("/code-editor", {
      state: {
        roomId, 
        msg: "Joined Room!",
        name: location.state.name
      },
    });
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-black">

      <div className="navbar bg-formBg">
        <div className="flex-1">
          <a className="btn btn-ghost text-4xl">Code Collab</a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div role="button" tabIndex={0} className="avatar online placeholder">
              <div className="bg-neutral text-white w-14 rounded-full">
                <span className="text-2xl">{location.state?.name?.[0] }</span>
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li onClick={Logout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>


      <div className="flex-1 bg-black text-white flex flex-col items-center justify-center p-5">
        <h1 className="text-4xl font-bold text-center">Welcome to Code Collab</h1>
        <p className="text-lg text-gray-300 text-center max-w-2xl mt-4">
          Collaborate in real-time with your team and write code together. Code Collab is a powerful online code editor that helps developers work seamlessly across different locations.
        </p>

        <div className="mt-6 p-5 flex space-x-4">
          <button onClick={createRoom} className="btn btn-outline btn-warning sm:btn-sm md:btn-md lg:btn-lg">
            Create Room
          </button>

          <button
            className="btn btn-outline btn-secondary sm:btn-sm md:btn-md lg:btn-lg"
            onClick={() => document.getElementById("my_modal_3").showModal()} // Fixed onClick
          >
            Join Room
          </button>

          {/* Modal Component */}
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box w-96">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <h3 className="text-lg font-bold">Enter Room ID</h3>

              <label className="form-control w-full max-w-xs">
            
                <input
                  type="text"
                  placeholder="Enter Room ID"
                  className="input input-bordered w-full max-w-xs mt-4"
                  onChange={(e) => setRoomId(e.target.value)}
                  value={roomId}
                />
                <button onClick={joinRoom} className="btn btn-outline btn-error  sm:btn-sm md:btn-md lg:btn-lg mt-4">
                  Join Room
                </button>
              </label>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
