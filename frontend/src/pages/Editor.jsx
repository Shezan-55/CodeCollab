import React, { useEffect, useRef, useState } from "react";
import { socket } from "../socket.js";
import { useLocation, Navigate } from "react-router-dom";
import { andromeda } from "@uiw/codemirror-themes-all";
import { useNavigate } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import PersonDrawer from "../components/PersonDrawer.jsx";
import ChatDrawer from "../components/ChatDrawer.jsx";
import FileDrawer from "../components/FileDrawer.jsx";
import toast from "react-hot-toast";
import EditorComp from "../components/EditorComp.jsx";
import { Toaster } from "react-hot-toast";




const Editor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roomId = location.state?.roomId || {};
  const userName = location.state?.name || {};
  const token = location.state?.token || {};
  const [code, setCode] = useState("");
  const [openDrawer, setOpenDrawer] = useState(null);
  const [users, setUsers] = useState([]);
  const codeRef=useRef(null)  // store code fromm editor componenet
  const socketRef = useRef(null);





  useEffect(() => {
    const init = async () => {
      socketRef.current = await socket();

      socketRef.current.on("connect_error", (err) => handelError(err));
      socketRef.current.on("connect_failed", (err) => handelError(err));

      function handelError(err) {
        console.log("Error: ", err);
        toast.error("Socket connection failed, try agian");
        navigate("/");
      }

      socketRef.current.emit("join", {
        roomId,
        userName,
      });

      socketRef.current.on(
        "joined",
        ({ clients, joinedUserName, socketId }) => {
          if (joinedUserName !== userName) {
            toast.success(`${joinedUserName} had joined`);
          }
            
          setUsers(clients);

          socketRef.current.emit('code_sync',{
            code:codeRef.current,
            socketId,
          })

        }
      );

      socketRef.current.on("disconnected", ({ socketId, LeavingUserName }) => {
        toast(`${LeavingUserName} had left Room`,{
          icon: '⚠️',
        });

        setUsers((pre) => {
          return pre.filter((client) => client.socketId !== socketId);
        });
      });
    };

    init();

    return () => {
      socketRef.current.off("joined");
      socketRef.current.off("disconnected");
      socketRef.current.disconnect();
    };
  }, []);




  const toggleDrawer = (drawer) => {
    setOpenDrawer((prevDrawer) => (prevDrawer === drawer ? null : drawer));
  };




  async function copyRoomID () {
    
    try{    
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID Copied to Clipboard!");
    }
   
    catch(err){
      toast.error("Failed to copy URL");
      console.log(err)
    }
    
  } 


  function leaveRoom() {
    navigate('/welcome', {
      state: {
        token:location.state.token
      },
    });

  }



  if (!location.state) {
    return <Navigate to={"/"} />;
  }


  return (
    <div className="flex w-screen h-screen overflow-hidden bg-black">

      <div className="pt-5 p-2 w-[3.5vw] bg-black h-screen flex flex-col items-center">

        <img
          src="/person_icon.png"
          onClick={() => toggleDrawer("person")}
          alt="Person Icon"
          className="pt-5 pb-5 w-full h-auto cursor-pointer"
        />

        <img
          src="/chat_icon.png"
          onClick={() => toggleDrawer("chat")}
          alt="Chat Icon"
          className="pt-5 pb-5 w-full h-auto cursor-pointer"
        />

        <img
          src="/file_icon.png"
          onClick={() => toggleDrawer("file")}
          alt="File Icon"
          className="pt-5 pb-5 w-full h-auto cursor-pointer"
        />
      </div>

      {openDrawer && (
        <div className="w-[20vw] h-screen bg-gray-900 text-white p-4">
          {openDrawer === "person" && <PersonDrawer users={users} onCopy={copyRoomID} onLeave={leaveRoom}/>}
          {openDrawer === "chat" && <ChatDrawer />}
          {openDrawer === "file" && <FileDrawer />}
        </div>
      )}

      <div className="flex-1 h-screen">

      <EditorComp socketRef={socketRef} roomId={roomId} 
    onCodeChange={(code) => {
      codeRef.current = code;
    }} 
    /> 

        
      </div>
    </div>
  );
};

export default Editor;
