import Post from "./Post";

const PostsList = () => {
  // Dummy data for job posts
  const jobPosts = [
    {
      title: "Software Engineer",
      location: "New York",
      company: "Tech Co",
      date: "2 days ago",
    },
    {
      title: "Product Manager",
      location: "San Francisco",
      company: "Startup Inc",
      date: "3 days ago",
    },
    {
      title: "Data Scientist",
      location: "Chicago",
      company: "Data Corp",
      date: "4 days ago",
    },
    {
      title: "UX Designer",
      location: "Los Angeles",
      company: "Design Studio",
      date: "5 days ago",
    },
  ];

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
            <p className="text-gray-700">Total Posts: {jobPosts.length}</p>
          </div>
        </div>

        {/* Job post cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {jobPosts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsList;
