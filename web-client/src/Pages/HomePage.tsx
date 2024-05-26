import { useState } from "react";
import LeftSidebar from "../Components/Chat/LeftSidebar";
import { BrandSearchInput } from "../Components/Core/BrandInput";
import PostsList from "../Components/Posts/PostsList";
import RightSidebar from "../Components/Posts/RightSidebar";
import useValidUser from "../Hooks/useValidUser";
import { useDebounce } from "use-debounce";

const HomePage = () => {
  const { isUserLoggedIn } = useValidUser();
  const [searchFilter, setSearchFilter] = useState<string | null>(null);
  const [debouncedSearchFilter] = useDebounce(searchFilter, 300);

  const onSearch = (value: string) => {
    console.log(value);
    if (value == "") setSearchFilter(null);
    setSearchFilter(value);
  };

  return (
    <>
      {isUserLoggedIn && <LeftSidebar />}
      <RightSidebar />
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-purple-500 to-blue-600">
        <div className="text-white text-6xl font-bold mb-8 mt-16">
          Welcome to Developer Chat
        </div>
        <div className="w-1/2 bg-white rounded-lg shadow-md p-4">
          <BrandSearchInput
            value={searchFilter}
            setValue={onSearch}
            type="text"
            placeholder="Search..."
          />
        </div>
        <div className="mt-8 text-white text-lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </div>
        <PostsList searchFilter={debouncedSearchFilter} />
      </div>
    </>
  );
};

export default HomePage;
