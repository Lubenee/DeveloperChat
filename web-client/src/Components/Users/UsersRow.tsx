import { useState } from "react";
import { PrimaryButton } from "../Core/BrandButton";
import BrandModal from "../Core/BrandModal";

interface UserRowProps {
  name: string;
  email: string;
  accountType: number;
  onDelete: () => void;
}

const UserRow = ({ name, email, accountType, onDelete }: UserRowProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getAccountTypeLabel = (accountType: number): string => {
    switch (accountType) {
      case 0:
        return "Developer";
      case 1:
        return "Company";
      case 2:
        return "Admin";
      default:
        return "Undefined";
    }
  };

  return (
    <>
      <div className="flex items-end hover:bg-gray-100 justify-between">
        <div className="py-2 px-4 border-b border-gray-200 flex-1">
          <div>{name}</div>
        </div>
        <div className="py-2 px-4 border-b border-gray-200 flex-1">{email}</div>
        <div className="py-2 px-4 border-b border-gray-200 flex-1">
          {getAccountTypeLabel(accountType)}
        </div>
        <div className="py-2 px-4 border-b border-gray-200 flex-1">
          <PrimaryButton onClick={() => setIsModalOpen(true)}>
            Delete
          </PrimaryButton>
        </div>
        <div className="py-2 px-4 border-b border-gray-200 flex-1">
          <PrimaryButton>Edit</PrimaryButton>
        </div>
      </div>
      <BrandModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Delete user"
        onSubmit={() => {
          onDelete();
          setIsModalOpen(false);
        }}
        submitButtonText="Delete">
        <p>Are you sure you want to delete this user?</p>
      </BrandModal>
    </>
  );
};

export default UserRow;
