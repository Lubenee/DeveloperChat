import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { Post } from "../../types/posts/post-model";
import { city } from "../../types/shared-types";

interface Props {
  posts: Post[];
  searchFilter: string | null;
  cityFilter: city | null;
}

const PostsList = ({ posts, searchFilter, cityFilter }: Props) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!cityFilter || cityFilter.label == "All" || cityFilter.label == "all") {
      setFilteredPosts(posts);
      return;
    }
    const filter = posts.filter((post) => {
      const filterToLower = cityFilter.value.toLowerCase();
      const locationToLower = post.location.toLowerCase();
      return locationToLower == filterToLower;
    });
    setFilteredPosts(filter);
  }, [cityFilter, posts]);

  useEffect(() => {
    if (!searchFilter) {
      setFilteredPosts(posts);
      return;
    }
    const searchFilterLowerCase = searchFilter.toLowerCase();
    const filter = posts.filter((post) => {
      const titleToLower = post.title.toLowerCase();
      return titleToLower.includes(searchFilterLowerCase);
    });
    setFilteredPosts(filter);
  }, [searchFilter, posts]);

  return (
    <div className="py-8 ">
      <div className="max-w-6xl mx-auto px-4">
        {/* Informational card */}
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg mb-8">
          <div className="flex-shrink-0 bg-gradient-to-br from-pink-500 to-purple-500 w-1/3 md:w-1/4 h-40 rounded-l-lg"></div>
          <div className="p-6 flex flex-col justify-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Job Type: Software Engineer
            </h2>
            <p className="text-gray-700">Total Posts: {filteredPosts.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {filteredPosts.map((pst) => (
            <PostItem key={pst.id} post={pst} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsList;
