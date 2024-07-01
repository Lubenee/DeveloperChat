import React from "react";

interface UserRowProps {
  name: string;
  email: string;
  accountType: number;
}

const UserRow: React.FC<UserRowProps> = ({ name, email, accountType }) => {
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
    </tr>
  );
};

export default UserRow;
