import { jwtToken, userId } from "../types/shared-types";
import { fetchData } from "../utils/fetchUtils";
const baseUrl = import.meta.env.VITE_SERVER_HOST;

export const useChats = () => {
  const getChats = async () => {
    const token = localStorage.getItem(jwtToken);
    if (!token) throw new Error("FRONT Session expired. Please log in again.");

    try {
      const res = await fetchData(`${baseUrl}/api/chat/`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
      });
      return await res.json();
    } catch (err) {
      console.error(err);
    }
  };

  const getChatObject = async (chatId: string) => {
    const token = localStorage.getItem(jwtToken);
    if (!token) throw new Error("FRONT Session expired. Please log in again.");
    try {
      const res = await fetchData(`${baseUrl}/api/chat/get-chat`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ chatId: chatId }),
      });
      return await res.json();
    } catch (err) {
      throw err;
    }
  };

  const loadChat = async (chatId: string) => {
    const token = localStorage.getItem(jwtToken);
    if (!token) throw new Error("FRONT Session expired. Please log in again.");

    try {
      const res = await fetchData(`${baseUrl}/api/chat/get-messages`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ chatId: chatId }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  };

  const createChat = async (user1_id: userId, user2_id: userId) => {
    const token = localStorage.getItem(jwtToken);
    if (!token) throw new Error("FRONT Session expired. Please log in again.");

    try {
      const res = await fetchData(`${baseUrl}/api/chat/create`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user1_id, user2_id }),
      });

      return await res.json();
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  };

  return { getChats, loadChat, getChatObject, createChat };
};
