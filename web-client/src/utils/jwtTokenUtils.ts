import { jwtToken } from "../types/shared-types";

export const setTokenAndDispatchEvent = (token: string) => {
  localStorage.setItem(jwtToken, token);

  // Dispatch a storage event with the updated token
  const storageEvent = new StorageEvent("storage", {
    key: jwtToken,
    newValue: token,
    storageArea: localStorage,
  });

  window.dispatchEvent(storageEvent);
};

export const removeTokenAndDispatchEvent = () => {
  localStorage.removeItem(jwtToken);
  const storageEvent = new StorageEvent("storage", {
    key: jwtToken,
    newValue: null,
    storageArea: localStorage,
  });
  window.dispatchEvent(storageEvent);
};
