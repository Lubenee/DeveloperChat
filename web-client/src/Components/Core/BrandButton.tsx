import { ReactNode } from "react";

type ButtonType = "submit" | "reset" | "button" | undefined;
interface LoadingIndicatorButtonProps {
  loading: boolean;
  children: ReactNode;
  onClick?: () => void;
  type?: ButtonType;
}

interface ButtonProps {}

export const PrimaryButton = () => {};

export const SecondaryButton = () => {};

const LoadingIndicatorButton = ({
  loading,
  onClick,
  children,
  type,
}: LoadingIndicatorButtonProps) => {
  return (
    <button
      type={type}
      className={`relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
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
    </button>
  );
};

export default LoadingIndicatorButton;
