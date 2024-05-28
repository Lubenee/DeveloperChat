import { useParams } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";

import { useState, useEffect, FormEvent } from "react";
const baseUrl = import.meta.env.VITE_SERVER_HOST;
import { io, Socket } from "socket.io-client";
import Messages from "./Messages";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import InvalidUser from "../../Components/MyProfile/InvalidUser";

import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import useValidUser from "../../Hooks/useValidUser";
import { useChats } from "../../Hooks/useChats";
import { jwtToken, userId } from "../../types/shared-types";
import { jwtDecode } from "jwt-decode";
import { jwtTokenInterface } from "../../Hooks/useUsers";

export interface msg {
  chatId: string;
  senderId: userId;
  receiverId: userId;
  sentAt: string;
  message: string;
}

const ChatRoom = () => {
  const [chat, setChat] = useState<any>({});
  const [messages, setMessages] = useState<msg[]>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [showSendButton, setShowSendButton] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [otherUser, setOtherUser] = useState("");
  const heartEmoji = "❤️";

  const { chatId } = useParams();
  const { isUserLoggedIn } = useValidUser();
  const { loadChat, getChatObject } = useChats();

  const chatroomId = "room";

  useEffect(() => {
    const getChat = async () => {
      if (!chatId) {
        console.log("No chat id");
        return;
      }
      const res = await getChatObject(chatId);
      setChat(res);
    };
    getChat();
  }, []);

  //useEffect -> load messages ...
  useEffect(() => {
    const getChatMessages = async () => {
      if (!chatId) return;
      const res = await loadChat(chatId);
      setMessages(res);

      const token = localStorage.getItem(jwtToken);
      if (!token) return;
      const decoded = jwtDecode(token) as jwtTokenInterface;
      setCurrentUser(decoded.id);

      if (chat.user1_id == decoded.id) setOtherUser(chat.user2_id);
      else setOtherUser(chat.user1_id);
    };

    getChatMessages();
  }, []);

  // Connect to socket.io room
  useEffect(() => {
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

    const time = new Date();
    const emitted = {
      chat_id: chatId,
      sender_id: currentUser,
      receiver_id: otherUser,
      sent_at: time.toString(),
      message: messageInput,
    };

    if (socket)
      socket.emit("sendMessage", { messageObject: emitted, room: chatroomId });

    const newMsg: msg = {
      chatId: chatId,
      senderId: currentUser,
      receiverId: otherUser,
      sentAt: time.toString(),
      message: messageInput,
    };

    setMessages((prevMessages) => [...prevMessages, newMsg]);
    setMessageInput("");
  };

  const handleEmoji = (e: EmojiClickData) => {
    setMessageInput((prev) => prev + e.emoji);
    setShowEmojiPicker(false);
  };

  const handleHeartClick = () => {
    if (socket)
      socket.emit("sendMessage", { message: heartEmoji, room: chatroomId });
  };

  const handleImageClick = () => {};

  return (
    <>
      {isUserLoggedIn ? (
        <>
          <LeftSidebar />
          <div className="flex flex-col h-screen ml-64">
            {/* <div className="bg-gray-800 py-3 px-4 text-white">
      <h2 className="text-xl font-bold">users.join(' & ')</h2>
    </div> */}
            <div className="flex-grow overflow-y-auto">
              <Messages messages={messages} currentUser={currentUser} />
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
                      <div
                        className="p-1 cursor-pointer"
                        onClick={handleHeartClick}>
                        <FavoriteBorderOutlinedIcon />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-500 to-blue-600">
          <InvalidUser />
        </div>
      )}
    </>
  );
};

export default ChatRoom;
