import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useUserProfile from "../hooks/useUserProfile";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase/firebase";
import { useState } from "react";
import AuthModal from "./AuthModal";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const user = useSelector(
    (state) => state.auth.user
  );

  const profile =
    useUserProfile(user?.uid);

  const isLoggedIn = !!user;

  const [showAuthModal, setShowAuthModal] =
    useState(false);

  const [authMode, setAuthMode] =
    useState("login");

  const {
    theme,
    setTheme,
  } = useTheme();

  const handleLogout =
    async () => {
      await signOut(auth);
    };

  return (
    <>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() =>
          setShowAuthModal(false)
        }
        initialMode={authMode}
      />

      <header
        className="
        sticky
        top-0
        z-50
        backdrop-blur-xl
        border-b
        transition-all
        duration-300
        "
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <div
          className="
          max-w-[1400px]
          mx-auto

          px-4
          md:px-6

          h-auto
          md:h-20

          py-3
          md:py-0

          flex
          flex-col
          md:flex-row

          gap-4
          md:gap-0

          items-start
          md:items-center

          justify-between
          "
        >
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div
              className="
              h-10
              w-10
              rounded-xl
              bg-green-600
              flex
              items-center
              justify-center
              text-white
              shrink-0
              "
            >
              ⚽
            </div>

            <div>
              <h1
                className="
                font-bold
                text-lg
                md:text-xl
                text-[var(--text)]
                "
              >
                WorldForFootball
              </h1>

              <p
                className="
                text-xs
                md:text-sm
                text-[var(--secondary)]
                "
              >
                FIFA WC 2026 Fan Chat
              </p>
            </div>
          </Link>

          <div
            className="
            flex
            items-center
            gap-2
            md:gap-4

            w-full
            md:w-auto

            justify-end
            "
          >
            <button
              onClick={() =>
                setTheme(
                  theme === "dark"
                    ? "light"
                    : "dark"
                )
              }
              className="
              btn-animate

              h-11
              w-11

              rounded-xl
              border

              flex
              items-center
              justify-center

              text-lg
              "
              style={{
                background:
                  "var(--bg)",
                borderColor:
                  "var(--border)",
                color:
                  "var(--text)",
              }}
            >
              {theme === "dark"
                ? "☀️"
                : "🌙"}
            </button>

            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="
                  btn-animate

                  px-4
                  md:px-5

                  py-3

                  rounded-xl
                  border

                  font-medium

                  max-w-[180px]
                  md:max-w-none

                  truncate
                  "
                  style={{
                    background:
                      "var(--bg)",
                    borderColor:
                      "var(--border)",
                    color:
                      "var(--text)",
                  }}
                >
                  {profile?.team}{" "}
                  {profile?.username}
                </Link>

                <button
                  onClick={
                    handleLogout
                  }
                  className="
                  btn-animate

                  font-medium

                  text-sm
                  md:text-base
                  "
                  style={{
                    color:
                      "var(--secondary)",
                  }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setAuthMode(
                      "login"
                    );
                    setShowAuthModal(
                      true
                    );
                  }}
                  className="
                  btn-animate

                  px-4
                  md:px-5

                  py-3

                  rounded-xl
                  border
                  "
                  style={{
                    background:
                      "var(--bg)",
                    borderColor:
                      "var(--border)",
                    color:
                      "var(--text)",
                  }}
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    setAuthMode(
                      "register"
                    );
                    setShowAuthModal(
                      true
                    );
                  }}
                  className="
                  btn-animate

                  px-4
                  md:px-5

                  py-3

                  rounded-xl

                  bg-green-600
                  text-white

                  hover:bg-green-700
                  "
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}