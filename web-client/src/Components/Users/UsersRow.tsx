import { useState } from "react";
import { userId } from "../../types/shared-types";
import { PrimaryButton } from "../Core/BrandButton";
import BrandModal from "../Core/BrandModal";
import EditUserDataForm from "./EditUserDataForm";

interface UserRowProps {
  id: userId;
  name: string;
  email: string;
  accountType: number;
  onDelete: (id: userId) => void;
}

const UserRow = ({ id, name, email, accountType, onDelete }: UserRowProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
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
          <PrimaryButton onClick={() => setIsDeleteModalOpen(true)}>
            Delete
          </PrimaryButton>
        </div>
        <div className="py-2 px-4 border-b border-gray-200 flex-1">
          <PrimaryButton onClick={() => setIsEditModalOpen(true)}>
            Edit
          </PrimaryButton>
        </div>
      </div>
      <BrandModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Are you sure you want to delete this user?"
        onSubmit={() => {
          onDelete(id);
          setIsDeleteModalOpen(false);
        }}
        submitButtonText="Delete">
        <p>Confirmation message or additional content can go here.</p>
      </BrandModal>
      <BrandModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Are you sure you want to delete this user?"
        onSubmit={() => {
          onDelete(id);
          setIsEditModalOpen(false);
        }}
        submitButtonText="Save changes">
        <EditUserDataForm
          id={id}
          initialName={name}
          initialEmail={email}
          initialAccountType={accountType}
        />
      </BrandModal>
    </>
  );
};

export default UserRow;
