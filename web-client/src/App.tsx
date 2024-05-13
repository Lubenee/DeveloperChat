import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AppRouter from "./Routes/AppRouter";
import { useEffect, useState } from "react";
import useUsers from "./Hooks/useUsers";
import useJWTTokenListener from "./Hooks/useJWTTokenListener";

const App = () => {
  const token = useJWTTokenListener();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const { verifyToken } = useUsers();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (!token) {
          setIsUserLoggedIn(false);
          return;
        }
        const res = await verifyToken(token);
        setIsUserLoggedIn(res);
      } catch (err) {
        console.error(err);
      }
    };
    verifyUser();
  }, [token]);

  return (
    <Router>
      {/* This margin is the navbar's height */}
      <div className="mt-16">
        <Navbar isUserLoggedIn={isUserLoggedIn} />
        <AppRouter />
      </div>
    </Router>
  );
};

export default App;
