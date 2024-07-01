import { useState } from "react";
import { PrimaryButton } from "../Core/BrandButton";
import BrandModal from "../Core/BrandModal";
import { PostCreateDto } from "../../types/posts/post-model";
import { usePosts } from "../../Hooks/usePosts";
import CustomError from "../Core/CustomError";
import FilterSection from "./Filters/FilterSection";
import { city } from "../../types/shared-types";
import useValidUser from "../../Hooks/useValidUser";
import CreateCompanyPostWizard from "./CreateCompanyPost";
import { userType as uType } from "../../types/shared-types";
import CreateDevPost from "./CreateDevPost";

interface Props {
  availableCities: city[];
  setCityFilter: (newVal: city) => void;
}

const RightSidebar = ({ ...props }: Props) => {
  const [createPostModal, setCreatePostModal] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [newPost, setNewPost] = useState<PostCreateDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isUserLoggedIn } = useValidUser();
  const { createPost } = usePosts();
  const { userType }: { userType: uType } = useValidUser();

  const onCloseModal = () => {
    setCreatePostModal(false);
  };

  const handlePost = async () => {
    onCloseModal();
    try {
      if (newPost) await createPost(newPost);
    } catch (err) {
      setError(err as string);
      console.error(err);
    }
  };

  return (
    <div className="fixed right-0 top-16 h-full bg-gray-900 text-white w-64">
      <div className="flex items-center justify-center h-16 border-b border-gray-800">
        <h1 className="text-lg font-bold">Posts</h1>
        <br />
      </div>
      <div className="flex justify-centera mb-2 flex-col p-8">
        <PrimaryButton
          onClick={() => setCreatePostModal(true)}
          disabled={!isUserLoggedIn}>
          Create new post
        </PrimaryButton>
        {error && (
          <div className="mt-2">
            <CustomError message="Failed to create post" reason={error} />
          </div>
        )}
        <BrandModal
          isOpen={createPostModal}
          onClose={onCloseModal}
          title="Create new post"
          onSubmit={handlePost}
          disableSubmit={disableSubmit}
          submitButtonText="Post">
          {userType === uType.Developer ? (
            <CreateCompanyPostWizard
              setNewPost={setNewPost}
              disablePostButton={setDisableSubmit}
            />
          ) : (
            <CreateDevPost />
          )}
        </BrandModal>
      </div>
      <div className="flex items-center justify-center h-16 border-b border-gray-800">
        <h1 className="text-lg font-bold">Filters</h1>
      </div>
      <FilterSection {...props} />
    </div>
  );
};

export default RightSidebar;
