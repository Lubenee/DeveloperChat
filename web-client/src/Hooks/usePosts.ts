import { CREATE_POST } from "../Constants/constants";
import { PostCreateDto } from "../types/posts/post-model";
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
    if (item.image) {
      formDataToSend.append("image", item.image);
    }

    console.log(item.image);
    await fetchData(`${baseUrl}/${CREATE_POST}`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formDataToSend,
    });
  };

  return { createPost };
};
