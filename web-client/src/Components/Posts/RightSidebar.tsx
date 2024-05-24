import { PrimaryButton, SecondaryButton } from "../Core/BrandButton";

const RightSidebar = () => {
  return (
    <div className="fixed right-0 top-16 h-full bg-gray-900 text-white w-64">
      <div className="flex items-center justify-center h-16 border-b border-gray-800">
        <h1 className="text-lg font-bold">Posts</h1>
        <br />
      </div>
      <div className="flex justify-centera mb-2 flex-col p-8">
        <PrimaryButton>Create new post</PrimaryButton>
        {/* <SecondaryButton>Create new post</SecondaryButton> */}
      </div>
      <div className="flex items-center justify-center h-16 border-b border-gray-800">
        <h1 className="text-lg font-bold">Filters</h1>
        <br />
      </div>
    </div>
  );
};

export default RightSidebar;
