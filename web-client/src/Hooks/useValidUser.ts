import { useEffect, useState } from "react";
import useJWTTokenListener from "./useJWTTokenListener";
import useUsers, { jwtTokenInterface } from "./useUsers";
import { userType as uType } from "../types/shared-types";
import { jwtDecode } from "jwt-decode";

const useValidUser = () => {
  const token = useJWTTokenListener();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [userType, setUserType] = useState<uType>(uType.Undefined);
  const { verifyToken } = useUsers();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (!token) {
          setIsUserLoggedIn(false);
          return;
        }
        const res = await verifyToken(token);
        setIsUserLoggedIn(res);
        if (!res) return;
        const decoded = jwtDecode(token) as jwtTokenInterface;
        setUserType(decoded.type);
      } catch (err) {
        console.error(err);
      }
    };
    verifyUser();
  }, [token]);

  return { isUserLoggedIn, setIsUserLoggedIn, userType };
};

export default useValidUser;
