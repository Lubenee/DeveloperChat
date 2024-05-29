import { useParams } from "react-router-dom";
import LeftSidebar from "./LeftSidebar";

import { useState, useEffect, FormEvent, useRef } from "react";
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
  const [otherUser, setOtherUser] = useState({
    id: "",
    name: "",
  });
  const heartEmoji = "❤️";

  const { chatId } = useParams();
  const { isUserLoggedIn } = useValidUser();
  const { loadChat, getChatObject } = useChats();

  const chatroomId = "room";

  useEffect(() => {
    const getChat = async () => {
      if (!chatId) return;
      const res = await getChatObject(chatId);
      setChat(res);

      const token = localStorage.getItem(jwtToken);
      if (!token) return;
      const decoded = jwtDecode(token) as jwtTokenInterface;
      setCurrentUser(decoded.id);

      if (res.user1_id == decoded.id)
        setOtherUser({ id: res.user2_id, name: res.user2_name });
      else setOtherUser({ id: res.user1_id, name: res.user1_name });
    };

    getChat();
  }, []);

  //useEffect -> load messages ...
  useEffect(() => {
    const getChatMessages = async () => {
      if (!chatId) return;
      const res = await loadChat(chatId);
      setMessages(res);
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
      setTimeout(() => {
        // window.scrollTo(0, document.documentElement.scrollHeight);

        const scrollElement = document.documentElement;
        const scrollToPosition = scrollElement.scrollHeight;
        scrollElement.scrollTo({ top: scrollToPosition, behavior: "smooth" });
      }, 150); // Adjust the delay as needed
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
      receiver_id: otherUser.id,
      sent_at: time.toString(),
      message: messageInput,
    };

    if (socket)
      socket.emit("sendMessage", { messageObject: emitted, room: chatroomId });

    if (!chatId) return;
    const newMsg: msg = {
      chatId: chatId,
      senderId: currentUser,
      receiverId: otherUser.id,
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

  // const handleImageClick = () => {};

  return (
    <div>
      {isUserLoggedIn ? (
        <>
          <LeftSidebar />
          <div className=" ml-64">
            <div className="messages-container h-screen-3/4">
              <Messages messages={messages} currentUser={currentUser} />
            </div>

            <div className="p-4 w-full flex flex-row bg-white sticky bottom-0">
              <form onSubmit={sendMessage} className="flex w-full">
                <div className="flex-1 rounded-2xl border-2 border-zinc-600 mr-2 pl-2 pr-2">
                  <div className="flex justify-start items-center flex-row relative">
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
                        <div className="p-1 ">
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
          </div>
        </>
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-500 to-blue-600">
          <InvalidUser />
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
