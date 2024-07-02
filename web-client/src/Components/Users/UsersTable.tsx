import React, { useEffect, useState } from "react";
import UserRow from "./UsersRow";
import { User } from "../../types/users/users-model";
import useUsers from "../../Hooks/useUsers";
import { jwtToken, userId } from "../../types/shared-types";

const UsersTable: React.FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const { getUsers, deleteUser } = useUsers();

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

  const handleDeleteUser = async (id: userId) => {
    console.log("here");
    const token = localStorage.getItem(jwtToken);
    if (!token) return;
    await deleteUser(token, id);
    setUserList((prevUsers) => prevUsers.filter((user) => user.id != id));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="overflow-x-auto">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <div className="flex justify-between bg-gray-100 px-4 py-2">
            <div className="font-semibold">Name</div>
            <div className="font-semibold">Email</div>
            <div className="font-semibold">Account Type</div>
            <div className="font-semibold">Actions</div>
          </div>
          {userList.map((user) => (
            <UserRow
              key={user.id}
              name={user.name}
              email={user.email}
              accountType={user.type}
              onDelete={() => {
                handleDeleteUser(user.id);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
