interface Chat {
  id: string;
  name: string;
}

interface LeftSidebarProps {
  chats: Chat[];
  onChatClick: (chatId: string) => void;
}

const mockChats = [
  { id: "1", name: "John" },
  { id: "2", name: "Alice" },
  { id: "3", name: "Bob" },
  { id: "4", name: "Emma" },
  { id: "5", name: "Michael" },
  { id: "6", name: "Sophia" },
  { id: "7", name: "James" },
  { id: "8", name: "Olivia" },
  { id: "9", name: "William" },
  { id: "10", name: "Ava" },
  { id: "11", name: "Ethan" },
  { id: "12", name: "Charlotte" },
  { id: "13", name: "Alexander" },
  { id: "14", name: "Mia" },
  { id: "15", name: "Daniel" },
  { id: "16", name: "Isabella" },
  { id: "17", name: "Matthew" },
  { id: "18", name: "Amelia" },
  { id: "19", name: "Joseph" },
  { id: "20", name: "Sophie" },
];

// /{ chats, onChatClick }: LeftSidebarProps
const LeftSidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-full bg-gray-900 text-white w-64 overflow-y-auto">
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
        <h1 className="text-lg font-bold">Chats</h1>
      </div>
      <div className="overflow-y-auto">
        {mockChats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center px-4 py-3 hover:bg-gray-800 cursor-pointer"
            // onClick={() => onChatClick(chat.id)}
          >
            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
            <div className="ml-3">{chat.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
