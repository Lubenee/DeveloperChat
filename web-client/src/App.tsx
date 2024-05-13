import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AppRouter from "./Routes/AppRouter";
import { useEffect, useState } from "react";
import useUsers from "./Hooks/useUsers";
import useJWTTokenListener from "./Hooks/useJWTTokenListener";

const App = () => {
  const jwtToken = useJWTTokenListener();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const { verifyToken } = useUsers();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (!jwtToken) {
          setIsUserLoggedIn(false);
          return;
        }
        const res = await verifyToken(jwtToken);
        setIsUserLoggedIn(res);
      } catch (err) {
        console.error(err);
      }
    };
    verifyUser();
  }, [jwtToken]);

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
