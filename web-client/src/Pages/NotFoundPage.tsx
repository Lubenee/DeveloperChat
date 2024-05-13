import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-500 to-blue-600">
      <div className="max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Oops!</h2>
        <p className="text-gray-600 mb-6">It looks like you're lost.</p>
        <p className="text-gray-600 mb-6">
          The page you are looking for could not be found.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 mr-2">
          Go Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
