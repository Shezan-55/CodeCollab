import React, { useEffect, useState, useRef } from "react";

const ChatDrawer = ({ socketRef, username, messages, setMessages }) => {
  const [newMessage, setNewMessage] = useState("");
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) return;

    // Listen for previous messages when the chat drawer is opened
    socketRef.current.on("previous_messages", (previousMessages) => {
      setMessages(previousMessages);
    });

    // Listen for message received from other clients
    socketRef.current.on("message_received", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.off("previous_messages");
      socketRef.current.off("message_received");
    };
  }, [socketRef]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === "" || !socketRef.current) return;

    const messageData = { username, text: newMessage, roomId: "room1" }; // Pass roomId as well
    socketRef.current.emit("send_message", messageData);
    setNewMessage("");
  };

  return (
    <div className="max-w-md mx-auto flex flex-col h-full ">
      <h1 className="text-2xl mb-2">Chats</h1>

      <div className="flex-1 overflow-y-auto mb-4 space-y-2 px-2 flex flex-col">
        {messages.map((msg, index) => {
          const isSender = msg.username === username;
          return (
            <div
              key={index}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] px-5 py-2 rounded-lg text-sm break-words shadow ${
                  isSender ? " bg-gray-600 text-left" : "bg-blue-500 text-left"
                }`}
              >
                <p className="text-xs font-semibold mb-1">
                  {isSender ? "You" : msg.username}
                </p>
                <p>{msg.text}</p>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatDrawer;
