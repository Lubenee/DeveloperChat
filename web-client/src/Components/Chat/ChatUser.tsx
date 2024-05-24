import { useRef, useState } from "react";
import { Chat } from "../../types/chat/chats-model";

interface Props {
  chat: Chat;
}

const ChatUser = ({ chat }: Props) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showText, setShowText] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setShowText(true);
  };

  const handleMouseLeave = () => {
    setShowText(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      setCursorPosition({
        x: e.clientX - rect.left - 30,
        y: e.clientY - rect.top - 45,
      });
    }
  };

  return (
    <div
      key={chat.id}
      className="flex items-center px-4 py-3 hover:bg-gray-800 cursor-pointer relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={containerRef}>
      <div className="relative w-8 h-8 bg-gray-700 rounded-full focus:ring-2"></div>
      <div className="ml-3">{chat.name}</div>
      {showText && (
        <span
          className="absolute text-sm text-gray-600 transition-opacity"
          style={{ top: cursorPosition.y + 10, left: cursorPosition.x + 10 }}>
          {chat.name}
        </span>
      )}
    </div>
  );
};

export default ChatUser;
