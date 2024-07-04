import { useEffect, useState } from "react";
import LeftSidebar from "../Components/Chat/LeftSidebar";
import { BrandSearchInput } from "../Components/Core/BrandInput";
import PostsList from "../Components/Posts/PostsList";
import RightSidebar from "../Components/Posts/RightSidebar";
import useValidUser from "../Hooks/useValidUser";
import { useDebounce } from "use-debounce";
import { city } from "../types/shared-types";
import { Post } from "../types/posts/post-model";
import { usePosts } from "../Hooks/usePosts";

const HomePage = () => {
  const { isUserLoggedIn } = useValidUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const { getAllPosts } = usePosts();

  const [searchFilter, setSearchFilter] = useState<string | null>(null);
  const [debouncedSearchFilter] = useDebounce(searchFilter, 300);

  const [cityFilter, setCityFilter] = useState<city | null>(null);
  const [availableCities, setAvailableCities] = useState<city[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await getAllPosts();
      setPosts(res);
    };
    getPosts();
  }, []);

  useEffect(() => {
    // Calculate city counts when posts change
    const calculateCityCounts = () => {
      const cityCounts: Record<string, number> = {};
      let all: number = 0;
      posts.forEach((post) => {
        const { location } = post;
        if (cityCounts[location]) cityCounts[location]++;
        else cityCounts[location] = 1;
        all++;
      });

      // Convert the cityCounts map back to an array of CityOption objects
      const aggregatedOptions: city[] = Object.entries(cityCounts).map(
        ([value, available]) => ({
          label: value,
          value,
          available,
        })
      );

      // Insert the "All" option at the beginning of the array
      aggregatedOptions.unshift({ label: "All", value: "all", available: all });

      setAvailableCities(aggregatedOptions);
    };

    calculateCityCounts();
  }, [posts]);

  const onSearch = (value: string) => {
    if (value == "") setSearchFilter(null);
    setSearchFilter(value);
  };

  return (
    <div>
      {isUserLoggedIn && <LeftSidebar />}
      <RightSidebar
        availableCities={availableCities}
        setCityFilter={setCityFilter}
      />
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
        <PostsList
          searchFilter={debouncedSearchFilter}
          cityFilter={cityFilter}
          posts={posts}
        />
      </div>
    </div>
  );
};

export default HomePage;
