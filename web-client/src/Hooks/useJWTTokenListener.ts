import { useEffect, useState } from "react";
import { jwtToken } from "../types/shared-types";

const useJWTTokenListener = () => {
  const [localToken, setLocalToken] = useState<string | null>(
    localStorage.getItem(jwtToken)
  );

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key == jwtToken) {
        setLocalToken(event.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return localToken;
};

export default useJWTTokenListener;
