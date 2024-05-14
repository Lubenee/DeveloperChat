import { useEffect } from "react";
import LeftSidebar from "../Components/Chat/LeftSidebar";
import PostsList from "../Components/Posts/PostsList";
import useValidUser from "../Hooks/useValidUser";

const HomePage = () => {
  const { isUserLoggedIn } = useValidUser();
  useEffect(() => {
    console.log(isUserLoggedIn);
  }, []);

  return (
    <>
      {isUserLoggedIn && <LeftSidebar />}
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-purple-500 to-blue-600">
        <div className="text-white text-6xl font-bold mb-8 mt-16">
          Welcome to Developer Chat
        </div>
        <div className="w-1/2 bg-white rounded-lg shadow-md p-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border-none rounded-md px-4 py-3 focus:outline-none bg-gray-100"
          />
        </div>
        <div className="mt-8 text-white text-lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </div>
        <PostsList />
      </div>
    </>
  );
};

export default HomePage;
