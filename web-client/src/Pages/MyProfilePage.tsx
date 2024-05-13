import { FormEvent, useEffect, useState } from "react";
import { User } from "../types/users/users-model";
import useUsers from "../Hooks/useUsers";
import ChangeData from "../Components/MyProfile/ChangeData";
import InvalidUser from "../Components/MyProfile/InvalidUser";
import { removeTokenAndDispatchEvent } from "../utils/jwtTokenUtils";
import { jwtToken } from "../types/shared-types";

const MyProfilePage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [validToken, setValidToken] = useState(false);

  const [nameEmailError, setNameEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [success, setSuccess] = useState<string | null>(null);

  const { getUserFromToken, updateUsernameEmail, updatePassword } = useUsers();

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem(jwtToken);
      if (!token) {
        setValidToken(false);
        setUser(null);
        return;
      }
      try {
        const res = await getUserFromToken(token);
        setUser(res);
        setValidToken(true);
      } catch (err) {
        console.error(err);
        setValidToken(false);
        setUser(null);
      }
    };

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user) return;
    setUsername(user.name);
    setEmail(user.email);
  }, [user]);

  // Function to handle form submission for username and email
  const handleUsernameEmailSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setSuccess(null);
    try {
      await updateUsernameEmail({ username, email });
      setNameEmailError(null);
      setSuccess("Success!");
    } catch (err) {
      setNameEmailError(err as string);
    }
  };

  // Function to handle form submission for password
  const handlePasswordSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setSuccess(null);
    if (newPassword != confirmPassword || newPassword == "") {
      setPasswordError("Passwords must match!");
      return;
    }
    try {
      await updatePassword(confirmPassword);
      setPasswordError(null);
      setSuccess("Success!");
    } catch (err) {
      setPasswordError(err as string);
    }
  };

  const logOut = () => {
    removeTokenAndDispatchEvent();
    setUser(null);
    setValidToken(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-500 to-blue-600">
      {user != null && validToken ? (
        <ChangeData
          username={username}
          email={email}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          nameEmailError={nameEmailError}
          passwordError={passwordError}
          success={success}
          setUsername={setUsername}
          setEmail={setEmail}
          setNewPassword={setNewPassword}
          setConfirmPassword={setConfirmPassword}
          logOut={logOut}
          handlePasswordSubmit={handlePasswordSubmit}
          handleUsernameEmailSubmit={handleUsernameEmailSubmit}
        />
      ) : (
        <InvalidUser />
      )}
    </div>
  );
};

export default MyProfilePage;
