import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { Post } from "../../types/posts/post-model";
import { usePosts } from "../../Hooks/usePosts";

interface Props {
  searchFilter: string | null;
}

const PostsList = ({ searchFilter }: Props) => {
  // const jobPosts = [
  //   {
  //     title: "Business Analyst",
  //     location: "Houston",
  //     company: "Market Insights",
  //     date: "12 days ago",
  //   },
  //   {
  //     title: "Network Engineer",
  //     location: "Atlanta",
  //     company: "Network Innovations",
  //     date: "13 days ago",
  //   },
  //   {
  //     title: "AI Researcher",
  //     location: "Palo Alto",
  //     company: "AI Labs",
  //     date: "14 days ago",
  //   },
  //   {
  //     title: "QA Engineer",
  //     location: "San Diego",
  //     company: "Quality Assurance Co",
  //     date: "15 days ago",
  //   },
  // ];

  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const { getAllPosts } = usePosts();

  useEffect(() => {
    const getPosts = async () => {
      const res = await getAllPosts();
      setPosts(res);
    };
    getPosts();
  }, []);

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
  }, [searchFilter]);

  return (
    <div className="py-8">
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
