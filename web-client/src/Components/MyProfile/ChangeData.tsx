import { FormEvent, useState } from "react";
import CustomError from "../Core/CustomError";
import Success from "../Core/Success";
import LoadingIndicatorButton from "../Core/BrandButton";
import { wait } from "../../utils/wait";
import { BrandInput } from "../Core/BrandInput";

interface Props {
  username: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
  nameEmailError: string | null;
  passwordError: string | null;
  success: string | null;

  handleUsernameEmailSubmit: (ev: FormEvent) => void;
  handlePasswordSubmit: (ev: FormEvent) => void;

  setUsername: (newUsername: string) => void;
  setEmail: (newEmail: string) => void;
  setNewPassword: (newPassword: string) => void;
  setConfirmPassword: (newPassword: string) => void;

  logOut: () => void;
}

const ChangeData = ({
  username,
  email,
  newPassword,
  confirmPassword,
  nameEmailError,
  passwordError,
  success,
  setUsername,
  setEmail,
  setNewPassword,
  setConfirmPassword,
  logOut,
  handlePasswordSubmit,
  handleUsernameEmailSubmit,
}: Props) => {
  const [updateEmailLoading, setUpdateEmailLoading] = useState(false);
  const [updatePasswordLoading, setUpdatePasswordLoading] = useState(false);
  const [logOutLoading, setLogoutLoading] = useState(false);

  const onEmailUsernameSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setUpdateEmailLoading(true);
    await wait(500);
    handleUsernameEmailSubmit(ev);
    setUpdateEmailLoading(false);
  };

  const onPasswordSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setUpdatePasswordLoading(true);
    await wait(500);
    handlePasswordSubmit(ev);
    setUpdatePasswordLoading(false);
  };

  const onLogout = async () => {
    setLogoutLoading(true);
    await wait(500);
    logOut();
    setLogoutLoading(false);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-5xl">
      <div className="grid grid-cols-2 gap-20">
        {/* Left box for username and email */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Edit Username & Email
          </h2>
          <form onSubmit={onEmailUsernameSubmit}>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="visually-hidden block text-gray-700 font-bold mb-2">
                Username
              </label>
              <BrandInput
                type="text"
                id="username"
                value={username}
                setValue={setUsername}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <BrandInput
                type="email"
                id="email"
                value={email}
                setValue={setEmail}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            {nameEmailError && (
              <CustomError
                message="Data update failed. Please try again."
                reason={nameEmailError}
              />
            )}
            <div className="mb-3">
              <LoadingIndicatorButton
                loading={updateEmailLoading}
                type="submit">
                Update Username & Email
              </LoadingIndicatorButton>
            </div>
          </form>
          <LoadingIndicatorButton
            loading={logOutLoading}
            onClick={onLogout}
            type={undefined}>
            Log Out
          </LoadingIndicatorButton>
        </div>

        {/* Right box for changing password */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Change Password
          </h2>
          <form onSubmit={onPasswordSubmit}>
            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-bold mb-2">
                New Password
              </label>
              <BrandInput
                type="password"
                autoComplete="new-password"
                id="new-password"
                value={newPassword}
                setValue={setNewPassword}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="ConfirmPassword"
                className="block text-gray-700 font-bold mb-2">
                Confirm Password
              </label>
              <BrandInput
                type="password"
                id="confirm-password"
                autoComplete="confirm-password"
                value={confirmPassword}
                setValue={setConfirmPassword}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            {passwordError && (
              <CustomError
                message="Password update failed. Please try again."
                reason={passwordError}
              />
            )}
            <LoadingIndicatorButton
              loading={updatePasswordLoading}
              type="submit">
              ChangePassword
            </LoadingIndicatorButton>
            {success && <Success message={success} />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeData;
