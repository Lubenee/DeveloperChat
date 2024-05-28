import { useParams } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";

import { useState, useEffect, FormEvent } from "react";
const baseUrl = import.meta.env.VITE_SERVER_HOST;
import { io, Socket } from "socket.io-client";
import { PrimaryButton } from "../Core/BrandButton";
import Messages from "./Messages";

const ChatRoom = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const { chatroomId } = useParams();

  useEffect(() => {
    // Connect to the Socket.IO server
    // Specify the connection options
    const newSocket: Socket = io(baseUrl);
    console.log(chatroomId);
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
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket.off("message");
    };
  }, [socket]);

  const sendMessage = (ev: FormEvent) => {
    ev.preventDefault();
    if (!messageInput.trim()) return;
    console.log("sending", { message: messageInput, room: chatroomId });
    if (socket) {
      socket.emit("sendMessage", { message: messageInput, room: chatroomId });
    }

    setMessageInput("");
  };

  return (
    <>
      <LeftSidebar />
      <div className="flex flex-col h-screen ml-64">
        {/* <div className="bg-gray-800 py-3 px-4 text-white">
      <h2 className="text-xl font-bold">users.join(' & ')</h2>
    </div> */}
        <div className="flex-grow overflow-y-auto">
          <Messages messages={messages} />
        </div>
        <form
          onSubmit={sendMessage}
          className="bg-gray-200 p-4 sticky bottom-0 w-full">
          <div className="flex">
            <input
              type="text"
              value={messageInput}
              onChange={(ev) => setMessageInput(ev.target.value)}
              className="flex-1 bg-white px-4 py-2 rounded-md"
              placeholder="Type a message..."
            />
            <PrimaryButton type="submit">Send</PrimaryButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatRoom;
