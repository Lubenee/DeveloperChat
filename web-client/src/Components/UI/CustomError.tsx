interface Props {
  message: string;
  reason?: string;
}

const CustomError = ({ message, reason }: Props) => {
  return (
    <div className="mb-2 border border-red-500 bg-red-100 text-red-500 px-4 py-2 rounded-md">
      <div>{message}</div>
      {reason && <div>Why? {reason}</div>}
    </div>
  );
};

export default CustomError;
