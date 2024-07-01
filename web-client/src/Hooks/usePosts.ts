import { CREATE_POST } from "../Constants/constants";
import { Post, PostCreateDto } from "../types/posts/post-model";
import { jwtToken } from "../types/shared-types";
import { fetchData } from "../utils/fetchUtils";

const baseUrl = import.meta.env.VITE_SERVER_HOST;

export const usePosts = () => {
  //
  const createPost = async (item: PostCreateDto) => {
    const token = localStorage.getItem(jwtToken);
    if (!token) throw new Error("FRONT Session expired. Please log in again.");

    const formDataToSend = new FormData();
    formDataToSend.append("title", item.title);
    formDataToSend.append("description", item.description);
    formDataToSend.append("company", item.company);
    formDataToSend.append("location", item.location);
    formDataToSend.append("requirements", JSON.stringify(item.requirements));
    formDataToSend.append("advantages", JSON.stringify(item.advantages));
    if (item.image) formDataToSend.append("image", item.image);

    await fetchData(`${baseUrl}/${CREATE_POST}`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formDataToSend,
    });
  };

  const getAllPosts = async () => {
    const res = await fetchData(`${baseUrl}/api/post/`);
    return (await res.json()) as Post[];
  };

  const getPost = async (id: string) => {
    const res = await fetchData(`${baseUrl}/api/post/get`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    return (await res.json()) as Post;
  };

  return { createPost, getAllPosts, getPost };
};
