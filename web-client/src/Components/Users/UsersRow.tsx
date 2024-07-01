import { userId } from "../../types/shared-types";
import { PrimaryButton } from "../Core/BrandButton";

interface UserRowProps {
  id: userId;
  name: string;
  email: string;
  accountType: number;
  onDelete: (id: userId) => void;
}

const UserRow = ({ id, name, email, accountType, onDelete }: UserRowProps) => {
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
    <tr className="hover:bg-gray-100">
      <td className="py-2 px-4 border-b border-gray-200">{name}</td>
      <td className="py-2 px-4 border-b border-gray-200">{email}</td>
      <td className="py-2 px-4 border-b border-gray-200">
        {getAccountTypeLabel(accountType)}
      </td>
      <td className="py-2 px-4 border-b border-gray-200">
        <PrimaryButton onClick={() => onDelete(id)}>Delete</PrimaryButton>
      </td>
    </tr>
  );
};

export default UserRow;
