import { CREATE_POST } from "../Constants/constants";
import { PostCreateDto } from "../types/posts/post-model";
import { fetchData } from "../utils/fetchUtils";

const baseUrl = import.meta.env.VITE_SERVER_HOST;

export const usePosts = () => {
  const createPost = async (item: PostCreateDto) => {
    await fetchData(`${baseUrl}/${CREATE_POST}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(item),
    });
  };

  return { createPost };
};
