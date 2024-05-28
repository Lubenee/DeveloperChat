import { Routes, Route } from "react-router-dom";
import RegisterPage from "../Pages/RegisterPage";
import DevPage from "../Pages/DevPage";
import CompanyPage from "../Pages/CompanyPage";
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import TestPage from "../Pages/TestPage";
import MyProfilePage from "../Pages/MyProfilePage";
import NotFoundPage from "../Pages/NotFoundPage";
import AboutPage from "../Pages/AboutPage";
import ChatRoom from "../Components/Chat/ChatRoom";

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
      <Route path="/about" element={<AboutPage />} />
      <Route path="/direct/:chatId" element={<ChatRoom />} />
    </Routes>
  );
};

export default AppRouter;
