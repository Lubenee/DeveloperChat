import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AppRouter from "./Routes/AppRouter";
import useValidUser from "./Hooks/useValidUser";

const App = () => {
  const { isUserLoggedIn } = useValidUser();

  return (
    <Router>
      <div className="h-screen flex flex-col">
        <div className="fixed w-full top-0">
          <Navbar isUserLoggedIn={isUserLoggedIn} />
        </div>
        <div className="mt-16 ">
          <AppRouter />
        </div>
      </div>
    </Router>
  );
};

export default App;
