import { Chat } from "../../types/chat/chats-model";
import ChatUser from "./ChatUser";
import { useEffect, useState } from "react";
import { useChats } from "../../Hooks/useChats";
import { jwtDecode } from "jwt-decode";
import { jwtToken } from "../../types/shared-types";
import { jwtTokenInterface } from "../../Hooks/useUsers";

const LeftSidebar = () => {
  const { getChats } = useChats();

  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const getAllChats = async () => {
      const res = await getChats();
      const _chats: Chat[] = [];

      const token = localStorage.getItem(jwtToken);
      const decode = jwtDecode(token) as jwtTokenInterface;

      console.log(res);
      if (!res) return;
      res.forEach((chat: any) => {
        _chats.push({
          id: chat.id,
          name: chat.user1_id == decode.id ? chat.user2_name : chat.user1_name,
          avatar:
            chat.user1_id == decode.id ? chat.user2_avatar : chat.user1_avatar,
          userId: chat.user1_id == decode.id ? chat.user2_id : chat.user1_id,
        });
      });

      setChats(_chats);
    };
    getAllChats();
  }, []);

  return (
    <div
      className="fixed left-0 top-16 h-full bg-gray-900 text-white w-64 overflow-y-auto"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-800">
        <h1 className="text-lg font-bold">Chats</h1>
        <br />
      </div>
      <div
        className="overflow-y-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {chats.map((chat) => (
          <ChatUser key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
