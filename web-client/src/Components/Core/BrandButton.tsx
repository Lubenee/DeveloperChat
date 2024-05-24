import { ReactNode } from "react";

type ButtonType = "submit" | "reset" | "button" | undefined;
interface LoadingIndicatorButtonProps {
  loading: boolean;
  children: ReactNode;
  onClick?: () => void;
  type?: ButtonType;
}

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  [key: string]: any;
}

export const PrimaryButton = ({ children, onClick, ...props }: ButtonProps) => {
  return (
    <button
      className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={onClick}
      {...props}>
      {children}
    </button>
  );
};

export const SecondaryButton = ({
  children,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <button
      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={onClick}
      {...props}>
      {children}
    </button>
  );
};

const LoadingIndicatorButton = ({
  loading,
  onClick,
  children,
  type,
}: LoadingIndicatorButtonProps) => {
  return (
    <PrimaryButton
      type={type}
      className={`relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white cursor-pointer bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
        loading ? "opacity-80 cursor: wait" : ""
      }`}
      onClick={onClick}
      disabled={loading}
      // Add CSS rule to remove outline
      style={{ outline: "none" }}>
      {loading ? (
        <div className=" inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-t-2 border-b-2 border-indigo-200 rounded-full animate-spin"></div>
        </div>
      ) : (
        children
      )}
    </PrimaryButton>
  );
};

export default LoadingIndicatorButton;
