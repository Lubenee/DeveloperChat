import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AppRouter from "./Routes/AppRouter";
import useValidUser from "./Hooks/useValidUser";

const App = () => {
  const { isUserLoggedIn } = useValidUser();

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
