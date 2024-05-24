import { FormEvent, useState } from "react";
import { userLoginData } from "../types/users/users-model";
import { useNavigate } from "react-router-dom";
import useUsers from "../Hooks/useUsers";
import CustomError from "../Components/Core/CustomError";
import { setTokenAndDispatchEvent } from "../utils/jwtTokenUtils";
import { wait } from "../utils/wait";
import LoadingIndicatorButton from "../Components/Core/BrandButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { getToken } = useUsers();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const userObj: userLoginData = {
      email: email,
      password: password,
    };

    try {
      setError(null);
      await wait(1000);
      const data = await getToken(userObj);
      const token = data.token;
      setTokenAndDispatchEvent(token);
      navigate("/");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-blue-600 flex flex-col justify-center sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {error && <CustomError message="Login failed. Please try again." />}

            <LoadingIndicatorButton loading={loading} type="submit">
              Sign in
            </LoadingIndicatorButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
