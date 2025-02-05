//name, email, password, id,

import { jwtToken, userId, userType } from "../types/shared-types";
import {
  REGISTER,
  LOGIN,
  GET_USER_FROM_TOKEN,
  UPDATE_USERNAME_EMAIL,
  UPDATE_PASSWORD,
  VERIFY_TOKEN,
} from "../Constants/constants";
import { UserCreateDto, userLoginData } from "../types/users/users-model";
import { Developer } from "../types/users/dev-model";
import { fetchData } from "../utils/fetchUtils";
const baseUrl = import.meta.env.VITE_SERVER_HOST;

export interface jwtTokenInterface {
  name: string;
  email: string;
  id: string;
  type: userType;
}

const useUsers = () => {
  // That's meant to be used when a user registers
  const addUser = async (user: UserCreateDto) => {
    if (user.type === userType.Undefined) throw new Error("User type not set.");
    await fetchData(`${baseUrl}/${REGISTER}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
  };

  // That's meant to be used when the user is logging in
  const getToken = async (user: userLoginData) => {
    try {
      const res = await fetchData(`${baseUrl}/${LOGIN}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return await res.json(); // That's the jwt token (supposedly)
    } catch (err) {
      console.error(`useUsers::getToken: ${err}`);
    }
  };

  // Verifies the token and returns all user info
  const getUserFromToken = async (token: string) => {
    try {
      const res = await fetchData(
        `${baseUrl}/${GET_USER_FROM_TOKEN}/${token}`,
        {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      return await res.json();
    } catch (err) {
      console.error("useUsers::getUserFromToken:", err);
    }
  };

  const getUserFromId = async (id: userId) => {
    try {
      const res = await fetchData(`${baseUrl}/${GET_USER_FROM_TOKEN}/`);
    } catch (err) {
      console.error("useUsers::getUserFromToken:", err);
    }
  };

  const updateUsernameEmail = async (userData: {
    username: string;
    email: string;
  }) => {
    const token = localStorage.getItem(jwtToken);
    if (!token) throw new Error("Missing jwt token.");
    await fetchData(`${baseUrl}/${UPDATE_USERNAME_EMAIL}`, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  };

  const updatePassword = async (password: string) => {
    const token = localStorage.getItem(jwtToken);
    if (!token) throw new Error("Missing jwt token.");
    await fetchData(`${baseUrl}/${UPDATE_PASSWORD}`, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password }),
    });
  };

  const getDev = async (username: string): Promise<Developer> => {
    const res = await fetchData(`${baseUrl}/api/devs/${username}`);
    return await res.json();
  };

  const verifyToken = async (token: string): Promise<boolean> => {
    if (!token) throw new Error("No token passed");
    try {
      const res = await fetchData(`${baseUrl}/${VERIFY_TOKEN}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? token : "",
        },
      });
      // Should return true or false depending on whether the token is valid or not
      const valid = await res.json();
      return valid;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getUsers = async (token: string) => {
    try {
      const res = await fetchData(`${baseUrl}/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? token : "",
        },
      });
      return await res.json();
    } catch (err) {
      console.error("useUsers::getUsers:", err);
    }
  };

  const deleteUser = async (token: string, id: userId) => {
    try {
      console.log(id);
      await fetchData(`${baseUrl}/api/user/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? token : "",
        },
        body: JSON.stringify({ id: id }),
      });
    } catch (err) {
      console.error("useUsers::deleteUser:", err);
    }
  };

  return {
    getDev,
    addUser,
    getToken,
    getUserFromToken,
    verifyToken,
    updateUsernameEmail,
    updatePassword,
    getUsers,
    getUserFromId,
    deleteUser,
  };
};

export default useUsers;
