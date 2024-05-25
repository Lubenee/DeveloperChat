import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtTokenInterface } from "../Hooks/useUsers";
import { jwtDecode } from "jwt-decode";
import { jwtToken } from "../types/shared-types";

interface Props {
  isUserLoggedIn: boolean;
}

const Navbar = ({ isUserLoggedIn }: Props) => {
  const navigate = useNavigate();
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    if (!isUserLoggedIn) return;
    const token = localStorage.getItem(jwtToken);
    if (!token) return;
    const decode: jwtTokenInterface = jwtDecode(token);
    setName(decode.name);
  }, [isUserLoggedIn]);

  return (
    <nav className=" bg-gray-800 py-4 px-6 w-full fixed top-0 z-10 h-16">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="flex items-center hover:cursor-pointer"
          onClick={() => navigate(`/`)}>
          <span className="text-white text-lg font-bold">Logo</span>
        </div>

        <div className="flex items-center">
          <div
            className="text-gray-400 hover:text-white mr-4"
            onClick={() => navigate(`/`)}>
            Home
          </div>
          <div
            className="text-gray-400 hover:text-white mr-4"
            onClick={() => navigate("/about")}>
            About
          </div>
          <div
            className="text-gray-400 hover:text-white mr-4"
            onClick={() => navigate("/test")}>
            Services
          </div>
          <div className="text-gray-400 hover:text-white">Contact</div>
        </div>
        {isUserLoggedIn === false ? (
          <div className="flex items-center">
            <button
              className="text-gray-400 hover:text-white mr-4"
              onClick={() => navigate(`/login`)}>
              Login
            </button>
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => navigate(`/register`)}>
              Register
            </button>
          </div>
        ) : (
          <div
            className="flex items-centers hover:cursor-pointer"
            onClick={() => navigate(`/my-profile`)}>
            <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-2 hover:duration-500 hover:scale-125">
              {name?.charAt(0).toUpperCase()}
            </div>
            <button className="text-gray-400 hover:text-white text-center">
              View profile
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
