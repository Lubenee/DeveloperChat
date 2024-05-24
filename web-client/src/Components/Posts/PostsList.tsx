import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { Post } from "../../types/posts/post-model";

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
    {
      title: "Frontend Developer",
      location: "Austin",
      company: "Web Solutions",
      date: "1 day ago",
    },
    {
      title: "Backend Developer",
      location: "Seattle",
      company: "Cloud Services",
      date: "6 days ago",
    },
    {
      title: "Mobile Developer",
      location: "Boston",
      company: "App Creators",
      date: "7 days ago",
    },
    {
      title: "System Administrator",
      location: "Denver",
      company: "IT Support",
      date: "8 days ago",
    },
    {
      title: "DevOps Engineer",
      location: "Miami",
      company: "Deployments Inc",
      date: "9 days ago",
    },
    {
      title: "Cybersecurity Analyst",
      location: "Washington DC",
      company: "SecureTech",
      date: "10 days ago",
    },
    {
      title: "Project Manager",
      location: "Philadelphia",
      company: "Management Solutions",
      date: "11 days ago",
    },
    {
      title: "Business Analyst",
      location: "Houston",
      company: "Market Insights",
      date: "12 days ago",
    },
    {
      title: "Network Engineer",
      location: "Atlanta",
      company: "Network Innovations",
      date: "13 days ago",
    },
    {
      title: "AI Researcher",
      location: "Palo Alto",
      company: "AI Labs",
      date: "14 days ago",
    },
    {
      title: "QA Engineer",
      location: "San Diego",
      company: "Quality Assurance Co",
      date: "15 days ago",
    },
  ];

  const jobPostss = useState<Post[]>([]);

  useEffect(() => {}, []);

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
            <PostItem key={index} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsList;
