import React, { useState } from "react";
import { userId } from "../../types/shared-types";
import { BrandInput } from "../Core/BrandInput";

interface EditUserDataFormProps {
  id: userId;
  initialName: string;
  initialEmail: string;
  initialAccountType: number;
}

const EditUserDataForm: React.FC<EditUserDataFormProps> = ({
  initialName,
  initialEmail,
  initialAccountType,
}) => {
  const [newName, setNewName] = useState<string>(initialName);
  const [newEmail, setNewEmail] = useState<string>(initialEmail);
  const [newAccountType, setNewAccountType] =
    useState<number>(initialAccountType);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <BrandInput
          type="text"
          value={newName}
          setValue={setNewName}
          className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <BrandInput
          type="email"
          value={newEmail}
          setValue={setNewEmail}
          className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Account Type
        </label>
        <select
          value={newAccountType}
          onChange={(e) => setNewAccountType(Number(e.target.value))}
          className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option value={0}>Developer</option>
          <option value={1}>Company</option>
          <option value={2}>Admin</option>
        </select>
      </div>
    </form>
  );
};

export default EditUserDataForm;
