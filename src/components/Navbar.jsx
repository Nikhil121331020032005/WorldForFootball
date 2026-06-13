import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useUserProfile from "../hooks/useUserProfile";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase/firebase";
import { useState } from "react";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const user = useSelector(
  (state) => state.auth.user
);
const profile =
  useUserProfile(
    user?.uid
  );
const handleLogout =
  async () => {
    await signOut(auth);
  };

const isLoggedIn = !!user;
const [showAuthModal, setShowAuthModal] =
  useState(false);

const [authMode, setAuthMode] =
  useState("login");

  return (
    
    <header className="border-b border-slate-800 bg-slate-950 sticky top-0 z-50">
      <AuthModal
  isOpen={showAuthModal}
  onClose={() =>
    setShowAuthModal(false)
  }
  initialMode={authMode}
/>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <span className="text-3xl">⚽</span>

          <div>
            <h1 className="font-bold text-white">
              WC 2026 Fan Chat
            </h1>

            <p className="text-xs text-slate-400">
              USA • Canada • Mexico
            </p>
          </div>
        </Link>

        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <Link
  to="/profile"
  className="
  px-4
  py-2
  rounded-full
  bg-slate-900
  border
  border-slate-700
  hover:border-green-500
  transition
  "
>
  {profile?.team} {profile?.username}
</Link>
            <button
  onClick={handleLogout}
  className="text-slate-400"
>
  Logout
</button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
  onClick={() => {
    setAuthMode("login");
    setShowAuthModal(true);
  }}
  className="px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800"
>
  Login
</button>

            <button
  onClick={() => {
    setAuthMode("register");
    setShowAuthModal(true);
  }}
  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700"
>
  Register
</button>
          </div>
        )}
      </div>
    </header>
  );
}