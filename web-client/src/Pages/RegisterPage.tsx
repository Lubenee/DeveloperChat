import { ChangeEvent, FormEvent, useState } from "react";
import { UserCreateDto } from "../types/users/users-model";
import useUsers from "../Hooks/useUsers";
import { userType } from "../types/shared-types";
import CustomError from "../Components/CustomError";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [uType, setUserType] = useState<userType>(userType.Developer);
  const [error, setError] = useState<string | null>(null);
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const { addUser } = useUsers();

  const clearInputs = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setError("");
    setWebsite("");
    setIndustry("");
    setAddress("");
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const passLength = 3;
    if (password !== confirmPassword) {
      setError("Passwords must match.");
      return;
    }
    if (password.length <= passLength) {
      setError(`Password must be at least ${passLength} characters.`);
      return;
    }

    const newUser: UserCreateDto = {
      name: username,
      email: email,
      password: password,
      type: uType,
    };

    try {
      await addUser(newUser);
      setError(null);
    } catch (err) {
      setError(err as string);
      return;
    }
    clearInputs();
    navigate("/login");
  };

  const onChangeUserType = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedUser = event.target.value as unknown as userType;
    setUserType(selectedUser);
  };

  return (
    <div className="min-h-screen  bg-gradient-to-b from-purple-500 to-blue-600 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Create an account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={onSubmit}>
            {error && (
              <CustomError
                message="Register failed. Please try again."
                reason={error}
              />
            )}

            <div>
              <label
                htmlFor="select"
                className="block text-sm font-medium text-gray-700">
                Select an option:
              </label>
              <select
                id="select"
                name="select"
                value={uType}
                onChange={onChangeUserType}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value={userType.Developer}>Developer</option>
                <option value={userType.Company}>Company</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 border border-gray-300 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 border border-gray-300 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 border border-gray-300 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 p-2 border border-gray-300 block w-full shadow-sm sm:text-sm rounded-md"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Register
              </button>
            </div>
          </form>
        </div>

        {uType == userType.Company && (
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  autoComplete="website"
                  required
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 block w-full shadow-sm sm:text-sm rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="industry"
                  className="block text-sm font-medium text-gray-700">
                  Industry
                </label>
                <input
                  id="industry"
                  name="industry"
                  type="text"
                  autoComplete="industry"
                  required
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 block w-full shadow-sm sm:text-sm rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700">
                  Location/Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 block w-full shadow-sm sm:text-sm rounded-md"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
