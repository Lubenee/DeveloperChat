import { useParams } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";

import { useState, useEffect } from "react";
const baseUrl = import.meta.env.VITE_SERVER_HOST;
import { io, Socket } from "socket.io-client";
import { PrimaryButton } from "../Core/BrandButton";
import { BrandInput } from "../Core/BrandInput";

const ChatRoom = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const { chatroomId } = useParams();

  useEffect(() => {
    // Connect to the Socket.IO server
    // Specify the connection options
    const newSocket: Socket = io(baseUrl);
    setSocket(newSocket);
    newSocket.emit("joinRoom", chatroomId);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("receiveMessage", (message) => {
      console.log("Received:", message);
      setMessages((prevMessages) => [...prevMessages, message.messageInput]);
    });
    return () => {
      socket.off("message");
    };
  }, [socket]);

  const sendMessage = () => {
    if (!messageInput.trim()) return;
    console.log("Sent", messageInput);
    // Emit the message to the server
    if (socket) {
      socket.emit("sendMessage", { messageInput, chatroomId });
    }

    // Clear the input field
    setMessageInput("");
  };

  return (
    <>
      <LeftSidebar />
      <div className="flex flex-col h-full ml-64 justify-end">
        <div className="bg-gray-800 py-3 px-4 text-white">
          <h2 className="text-xl font-bold">users.join(' & ')</h2>
        </div>
        <div className="flex-1 bg-gray-300 p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className="mb-2">
              <div className="bg-white p-2 rounded-md">{message}</div>
            </div>
          ))}
        </div>
        <div className="bg-gray-200 p-4 flex">
          <BrandInput
            type="text"
            value={messageInput}
            setValue={setMessageInput}
            className="flex-1 bg-white px-4 py-2 rounded-md mr-4"
            placeholder="Type a message..."
          />
          <PrimaryButton onClick={sendMessage}>Send</PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
