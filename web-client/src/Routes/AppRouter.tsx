import { Routes, Route } from "react-router-dom";
import RegisterPage from "../Pages/RegisterPage";
import DevPage from "../Pages/DevPage";
import CompanyPage from "../Pages/CompanyPage";
import LoginPage from "../Pages/Login";
import HomePage from "../Pages/HomePage";
import TestPage from "../Pages/TestPage";
import MyProfilePage from "../Pages/MyProfilePage";
import NotFoundPage from "../Pages/NotFoundPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/devs/:username" element={<DevPage />} />
      <Route path="/companies/:username" element={<CompanyPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/my-profile" element={<MyProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
};

export default AppRouter;
