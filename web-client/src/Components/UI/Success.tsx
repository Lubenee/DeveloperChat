interface Props {
  message: string;
}

const Success = ({ message }: Props) => {
  return (
    <div className="mt-2 border border-green-500 bg-green-100 text-green-500 px-4 py-2 rounded-md">
      {message}
    </div>
  );
};

export default Success;
