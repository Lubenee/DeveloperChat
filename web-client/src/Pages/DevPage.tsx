import { useEffect, useState } from "react";
import useUsers from "../Hooks/useUsers";

import DefaultPFP from "../assets/PFP_DEFAULT.png";
import { Developer } from "../types/users/dev-model";
import { useNavigate, useParams } from "react-router-dom";

const DevPage = () => {
  const { getDev } = useUsers();
  const [dev, setDev] = useState<Developer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDev = async () => {
      try {
        setLoading(true);
        if (!username) return;
        const res = await getDev(username);
        setDev(res);
      } catch (err) {
        navigate("/devs/not-found");
      } finally {
        setLoading(false);
      }
    };
    fetchDev();
  }, [username]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-purple-500 to-blue-600">
      <div className="container mx-auto bg-gray-400 pt-10 shadow-lg rounded">
        {loading ? (
          <p>Loading user data...</p>
        ) : (
          <>
            {/* User Profile Card */}
            <div className="max-w-sm mx-auto bg-white shadow-md rounded-md overflow-hidden">
              {/* User Profile Image */}
              <div className="h-64 bg-gray-300 flex items-center justify-center">
                <img
                  className="h-64 w-64 rounded-full"
                  src={DefaultPFP || ""}
                  alt="User Profile"
                />
              </div>
              {/* User Profile Info */}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {dev?.name || ""}
                </h2>
                <p className="text-gray-600">{"BIO GOES HERE"}</p>
              </div>
            </div>

            {/* User Details */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">User Details</h3>
              <ul className="border border-gray-300 rounded-md p-4">
                <li className="flex justify-between mb-2">
                  <span className="font-semibold">Email:</span>
                  <span>{dev?.email || ""}</span>
                </li>
                <li className="flex justify-between mb-2">
                  <span className="font-semibold">Location:</span>
                  <span>{"LOCATION GOES HERE"}</span>
                </li>
                {/* Add more user details here */}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DevPage;
