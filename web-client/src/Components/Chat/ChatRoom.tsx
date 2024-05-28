import { useParams } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";

import { useState, useEffect, FormEvent } from "react";
const baseUrl = import.meta.env.VITE_SERVER_HOST;
import { io, Socket } from "socket.io-client";
import Messages from "./Messages";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const ChatRoom = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [showSendButton, setShowSendButton] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { chatroomId } = useParams();

  //useEffect -> load messages ...

  useEffect(() => {
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

  useEffect(() => {
    setShowSendButton(messageInput != "" ? true : false);
  }, [messageInput]);

  const sendMessage = (ev: FormEvent) => {
    ev.preventDefault();
    if (!messageInput.trim()) return;
    console.log("sending", { message: messageInput, room: chatroomId });
    if (socket) {
      socket.emit("sendMessage", { message: messageInput, room: chatroomId });
    }

    setMessageInput("");
  };

  const handleEmoji = (e: EmojiClickData) => {
    console.log(e);
    setMessageInput((prev) => prev + e.emoji);
    setShowEmojiPicker(false);
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
          className=" p-4 sticky bottom-0 w-full flex flex-row">
          <div className="flex-1 rounded-2xl border-2 border-zinc-600 mr-2 pl-2 pr-2">
            <div className="flex justify-start items-center flex-row">
              <div
                className="cursor-pointer"
                onClick={() =>
                  setShowEmojiPicker(showEmojiPicker ? false : true)
                }>
                <SentimentSatisfiedAltIcon fontSize="medium" />
              </div>
              <div className="absolute bottom-16">
                <EmojiPicker
                  open={showEmojiPicker}
                  onEmojiClick={handleEmoji}
                />
              </div>
              <input
                type="text"
                value={messageInput}
                onChange={(ev) => setMessageInput(ev.target.value)}
                className="flex-1 bg-transparent px-2 py-2 focus:outline-none focus:border-none "
                placeholder="Type a message..."
              />
              {showSendButton ? (
                <button
                  type="submit"
                  className="text-purple-500 font-semibold mr-2 ">
                  Send
                </button>
              ) : (
                <>
                  <div className="p-1">
                    <ImageOutlinedIcon />
                  </div>
                  <div className="p-1">
                    <FavoriteBorderOutlinedIcon />
                  </div>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatRoom;
