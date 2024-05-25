import { useState } from "react";
import { Post } from "../../types/posts/post-model";
import { formatDateToDDMMYYYY } from "../../utils/dateUtils";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
const baseUrl = import.meta.env.VITE_SERVER_HOST;

interface PostProps {
  post: Post;
}

const PostItem = ({ post }: PostProps) => {
  const [filled, setFilled] = useState(false);

  const handleBookmark = () => {
    setFilled((prevFilled) => !prevFilled);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-2xl hover:cursor-pointer hover:bg-gray-100">
      {/* <div className="h-40 bg-gradient-to-br from-pink-500 to-purple-500 rounded-t-lg"></div> */}
      <img
        src={`${baseUrl}/uploads/${post.image_url}`}
        alt={`${post.title}`}
        className="overflow-hidden rounded-lg h-40 w-64"
      />
      <hr />
      <div className="p-6">
        <div className="flex justify-between flex-row">
          <h2 className="text-lg font-bold text-gray-800 mb-2">{post.title}</h2>
          {filled ? (
            <BookmarkOutlinedIcon
              onClick={handleBookmark}
              className="text-yellow-400"
            />
          ) : (
            <BookmarkBorderOutlinedIcon onClick={handleBookmark} />
          )}
        </div>
        <p className="text-gray-700 mb-2">
          {post.company} - {post.location}
        </p>
        <p className="text-gray-600">{formatDateToDDMMYYYY(post.date)}</p>
      </div>
    </div>
  );
};

export default PostItem;
