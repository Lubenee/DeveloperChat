import { msg } from "./ChatRoom";
import { userId } from "../../types/shared-types";
import defaultAvatar from "../../assets/PFP_DEFAULT.png";

interface Props {
  messages: msg[];
  currentUser: userId;
}

const Messages = ({ messages, currentUser }: Props) => {
  return (
    <div className="flex-1 bg-gray-300 p-4 overflow-y-auto">
      {messages.map((mess, index) => (
        <div
          key={index}
          className={`flex mb-2 ${
            mess.senderId === currentUser
              ? "justify-end items-end"
              : "justify-start items-start"
          }`}>
          {mess.senderId !== currentUser && (
            <img
              src={defaultAvatar}
              alt="Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
          )}
          <div
            className={`bg-white p-2 rounded-md shadow-md max-w-md ${
              mess.senderId === currentUser
                ? "self-end mr-2"
                : "self-start ml-2"
            }`}>
            {mess.message}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
