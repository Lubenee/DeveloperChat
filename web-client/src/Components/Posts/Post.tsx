import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePosts } from "../../Hooks/usePosts";
import { Post as PostModel } from "../../types/posts/post-model";

import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LeftSidebar from "../Chat/LeftSidebar";
import useValidUser from "../../Hooks/useValidUser";
import { PrimaryButton } from "../Core/BrandButton";
import { jwtToken } from "../../types/shared-types";
import { jwtDecode } from "jwt-decode";
import { jwtTokenInterface } from "../../Hooks/useUsers";
import { useChats } from "../../Hooks/useChats";

const baseUrl = import.meta.env.VITE_SERVER_HOST;

const Post = () => {
  const { id } = useParams();
  const { getPost } = usePosts();
  const navigation = useNavigate();
  const [post, setPost] = useState<PostModel | null>(null);
  const { isUserLoggedIn } = useValidUser();
  const { createChat } = useChats();

  useEffect(() => {
    if (!id) {
      navigation("/not-found");
      return;
    }

    const fetchPost = async () => {
      try {
        const res = (await getPost(id)) as PostModel;
        console.log("Retrieved post", res);
        setPost(res);
      } catch (err) {
        console.error(err);
        navigation("/not-found");
      }
    };

    fetchPost();
  }, []);

  const onMessageUser = async () => {
    const token = localStorage.getItem(jwtToken);
    if (!token || !post?.user_id) return;
    const decoded = jwtDecode(token) as jwtTokenInterface;

    console.log("sending..");
    const res = (await createChat(decoded.id, post?.user_id)) as string;
    console.log("res", res);
    navigation(`/direct/${res}`);
  };

  return (
    <>
      <div>
        {isUserLoggedIn && <LeftSidebar />}
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl mt-16">
          <div className="flex items-center mb-6">
            <img
              src={`${baseUrl}/uploads/${post?.image_url}`}
              alt={`${post?.title}`}
              className="w-24 h-24 rounded-full mr-6"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {post?.title}
              </h2>
              <div className="flex items-center text-gray-600">
                <BusinessIcon className="mr-2" />
                <span>{post?.company}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-700 mb-6">{post?.description}</p>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="flex items-center text-gray-600">
              <LocationOnIcon className="mr-2" />
              <span>{post?.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <CalendarTodayIcon className="mr-2" />
              <span>{post?.date.toString()}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <AccessTimeIcon className="mr-2" />
              <span>{post?.fullTime ? "Full-time" : "Part-time"}</span>
            </div>
            {post?.payment && (
              <div className="flex items-center text-gray-600">
                <AttachMoneyIcon className="mr-2" />
                <span>{post?.payment}</span>
              </div>
            )}
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Requirements
            </h3>
            <ul className="list-disc list-inside">
              {post?.requirements &&
                post?.requirements.map((requirement, index) => (
                  <li key={index} className="text-gray-600 mb-2">
                    {requirement}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Advantages
            </h3>
            <ul className="list-disc list-inside">
              {post?.advantages &&
                post?.advantages.map((advantage, index) => (
                  <li key={index} className="text-gray-600 mb-2">
                    {advantage}
                  </li>
                ))}
            </ul>
          </div>
          <PrimaryButton onClick={() => onMessageUser()}>
            Message User
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default Post;
