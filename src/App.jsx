import { Routes, Route } from "react-router-dom";
import useFirebaseAuth from "./hooks/useFirebaseAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Lobby from "./pages/Lobby";
import ChatRoom from "./pages/ChatRoom";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

export default function App() {
  useFirebaseAuth();
  return (
   <Routes>
  <Route path="/home" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route path="/" element={<Lobby />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/chat/:roomId" element={<ChatRoom />} />

  <Route path="*" element={<NotFound />} />
</Routes>
  );
}