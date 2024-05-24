interface PostProps {
  title: string;
  location: string;
  company: string;
  date: string;
}

const PostItem = ({ title, location, company, date }: PostProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-2xl hover:cursor-pointer">
      <div className="h-40 bg-gradient-to-br from-pink-500 to-purple-500 rounded-t-lg"></div>
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-700 mb-2">
          {company} - {location}
        </p>
        <p className="text-gray-600">{date}</p>
      </div>
    </div>
  );
};

export default PostItem;
