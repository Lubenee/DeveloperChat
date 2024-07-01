import React, { useEffect, useState } from "react";
import UserRow from "./UsersRow";
import { User } from "../../types/users/users-model";
import useUsers from "../../Hooks/useUsers";
import { jwtToken, userId } from "../../types/shared-types";

const UsersTable: React.FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const { getUsers, deleteUser } = useUsers();

  const handleDeleteUser = async (id: userId) => {
    try {
      const token = localStorage.getItem(jwtToken);
      if (!token) return;
      await deleteUser(token, id);
      setUserList((prevUsers) => prevUsers.filter((user) => user.id != id));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem(jwtToken);
      if (!token) return;

      try {
        const res = await getUsers(token);
        setUserList(res.users);
      } catch (error) {
        console.error("Error fetching users", error);
        setUserList([]);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold text-left border-b border-gray-200">
                Name
              </th>
              <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold text-left border-b border-gray-200">
                Email
              </th>
              <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold text-left border-b border-gray-200">
                Account Type
              </th>
              <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold text-left border-b border-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <UserRow
                key={user.id}
                id={user.id}
                name={user.name}
                email={user.email}
                accountType={user.type}
                onDelete={handleDeleteUser}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
