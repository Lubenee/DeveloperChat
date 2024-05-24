import { useState } from "react";
import { PrimaryButton } from "../Core/BrandButton";
import BrandModal from "../Core/BrandModal";

const RightSidebar = () => {
  const [createPostModal, setCreatePostModal] = useState(false);

  const onCloseModal = () => {
    setCreatePostModal(false);
  };

  const handlePost = () => {
    setCreatePostModal(false);
  };

  return (
    <div className="fixed right-0 top-16 h-full bg-gray-900 text-white w-64">
      <div className="flex items-center justify-center h-16 border-b border-gray-800">
        <h1 className="text-lg font-bold">Posts</h1>
        <br />
      </div>
      <div className="flex justify-centera mb-2 flex-col p-8">
        <PrimaryButton onClick={() => setCreatePostModal(true)}>
          Create new post
        </PrimaryButton>
        <BrandModal
          isOpen={createPostModal}
          onClose={onCloseModal}
          title="Create new post"
          onSubmit={handlePost}
          submitButtonText="Post">
          <p>Create a new post wizard.</p>
        </BrandModal>
      </div>
      <div className="flex items-center justify-center h-16 border-b border-gray-800">
        <h1 className="text-lg font-bold">Filters</h1>
        <br />
      </div>
    </div>
  );
};

export default RightSidebar;
