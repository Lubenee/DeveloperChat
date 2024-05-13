import { useNavigate } from "react-router-dom";
import LoadingIndicatorButton from "../UI/LoadingIndicatorButton";
import { useState } from "react";
import { wait } from "../../utils/wait";

const LoginRequiredPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onPress = async () => {
    setLoading(true);
    await wait(200);
    setLoading(false);
    navigate("/login");
  };

  return (
    <div className="max-w-lg p-8 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Access Denied</h2>
      <p className="text-gray-600 mb-6">
        You need to be logged in to see this information.
      </p>
      <LoadingIndicatorButton loading={loading} onClick={onPress} type="button">
        Log In
      </LoadingIndicatorButton>
    </div>
  );
};

export default LoginRequiredPage;
