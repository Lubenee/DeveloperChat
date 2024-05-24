import { ReactNode } from "react";
import { PrimaryButton, SecondaryButton } from "./BrandButton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: () => void;
  submitButtonText: string;
  children: ReactNode;
}

const BrandModal = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  submitButtonText,
  children,
}: ModalProps) => {
  return (
    <div
      className={`fixed z-20 inset-0 overflow-y-auto ${
        isOpen ? "" : "hidden"
      }`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* &#8203; is a character representing zero-width space */}
        <span // Sets the modal in the middle of the screen
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {title}
                </h3>
                <div className="mt-2 text-gray-900">{children}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse py-4 px-4">
            <div className="ml-4">
              <PrimaryButton type="button" onClick={onSubmit}>
                {submitButtonText}
              </PrimaryButton>
            </div>
            <SecondaryButton type="button" onClick={onClose}>
              Cancel
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandModal;
