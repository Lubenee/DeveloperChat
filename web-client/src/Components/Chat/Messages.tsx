interface Props {
  messages: string[];
}

const Messages = ({ messages }: Props) => {
  return (
    <div className="flex-1 bg-gray-300 p-4 overflow-y-auto">
      {messages.map((message, index) => (
        <div key={index} className="mb-2">
          <div className="bg-white p-2 rounded-md">{message}</div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
