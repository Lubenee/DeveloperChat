import { useEffect } from "react";
import { Post } from "../../types/posts/post-model";
import { formatDateToDDMMYYYY } from "../../utils/dateUtils";

interface PostProps {
  post: Post;
}

const PostItem = ({ post }: PostProps) => {
  useEffect(() => {
    console.log(post.image_url);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-2xl hover:cursor-pointer">
      {/* <div className="h-40 bg-gradient-to-br from-pink-500 to-purple-500 rounded-t-lg"></div> */}
      <img
        src={`http://localhost:5000/uploads/${post.image_url}`}
        alt={`${post.title}`}
        className="overflow-hidden rounded-lg h-40 w-64"
      />
      <hr />
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-2">
          {post.company} - {post.location}
        </p>
        <p className="text-gray-600">{formatDateToDDMMYYYY(post.date)}</p>
      </div>
    </div>
  );
};

export default PostItem;
