import { useEffect, useState } from "react";
import useJWTTokenListener from "./useJWTTokenListener";
import useUsers from "./useUsers";

const useValidUser = () => {
  const token = useJWTTokenListener();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
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
      } catch (err) {
        console.error(err);
      }
    };
    verifyUser();
  }, [token]);

  return { isUserLoggedIn, setIsUserLoggedIn };
};

export default useValidUser;
