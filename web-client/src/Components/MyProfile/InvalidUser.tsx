import { useNavigate } from "react-router-dom";

const LoginRequiredPage = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-lg p-8 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Access Denied</h2>
      <p className="text-gray-600 mb-6">
        You need to be logged in to see this information.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">
        Log In
      </button>
    </div>
  );
};

export default LoginRequiredPage;
