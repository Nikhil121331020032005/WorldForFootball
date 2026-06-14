import { useState, useEffect } from "react";
import Select from "react-select";

import { teams } from "../data/teams";

import {
  registerUser,
  loginUser,
  resetPassword,
} from "../services/auth";

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
}) {
  const [mode, setMode] =
    useState(initialMode);

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showReset, setShowReset] =
    useState(false);

  const [resetEmail, setResetEmail] =
    useState("");

  const [form, setForm] =
    useState({
      username: "",
      email: "",
      password: "",
      team: "",
    });

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const updateField = (
    key,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit =
    async () => {
      try {
        setLoading(true);

        if (
          mode === "register"
        ) {
          await registerUser({
            username:
              form.username,
            email:
              form.email,
            password:
              form.password,
            team:
              form.team,
          });
        } else {
          await loginUser(
            form.email,
            form.password
          );
        }

        onClose();
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/60
      backdrop-blur-md
      flex
      justify-center
      items-center
      z-50
      p-4
      "
    >
      <div
        className="
        w-full
        max-w-md
        rounded-3xl
        p-6
        md:p-7
        "
        style={{
          background:
            "var(--card)",
          border:
            "1px solid var(--border)",
        }}
      >
        <div className="flex justify-between items-center mb-6">

          <h2
            className="
            text-2xl
            font-bold
            "
            style={{
              color:
                "var(--text)",
            }}
          >
            {mode === "login"
              ? "Welcome Back"
              : "Create Account"}
          </h2>

          <button
            onClick={onClose}
            className="
            btn-animate
            text-xl
            "
            style={{
              color:
                "var(--secondary)",
            }}
          >
            ✕
          </button>

        </div>

        <div
          className="
          flex
          p-1
          rounded-xl
          mb-6
          "
          style={{
            background:
              "var(--card2)",
          }}
        >
          <button
            onClick={() =>
              setMode("login")
            }
            className="
            flex-1
            py-3
            rounded-lg
            font-medium
            transition-all
            "
            style={{
              background:
                mode === "login"
                  ? "var(--card)"
                  : "transparent",
              color:
                mode === "login"
                  ? "var(--text)"
                  : "var(--secondary)",
            }}
          >
            Login
          </button>

          <button
            onClick={() =>
              setMode(
                "register"
              )
            }
            className="
            flex-1
            py-3
            rounded-lg
            font-medium
            transition-all
            "
            style={{
              background:
                mode ===
                "register"
                  ? "var(--card)"
                  : "transparent",
              color:
                mode ===
                "register"
                  ? "var(--text)"
                  : "var(--secondary)",
            }}
          >
            Register
          </button>
        </div>

        <div className="space-y-4">

          {mode ===
            "register" && (
            <>
              <input
                type="text"
                placeholder="Username"
                value={
                  form.username
                }
                onChange={(e) =>
                  updateField(
                    "username",
                    e.target.value
                  )
                }
                className="
                w-full
                h-12
                px-4
                rounded-xl
                outline-none
                "
                style={{
                  background:
                    "var(--card2)",
                  border:
                    "1px solid var(--border)",
                  color:
                    "var(--text)",
                }}
              />

              <Select
                options={teams.map(
                  (
                    country
                  ) => ({
                    value:
                      country,
                    label:
                      country,
                  })
                )}
                value={
                  form.team
                    ? {
                        value:
                          form.team,
                        label:
                          form.team,
                      }
                    : null
                }
                onChange={(
                  selected
                ) =>
                  updateField(
                    "team",
                    selected.value
                  )
                }
                placeholder="Search country..."
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={
              form.email
            }
            onChange={(e) =>
              updateField(
                "email",
                e.target.value
              )
            }
            className="
            w-full
            h-12
            px-4
            rounded-xl
            outline-none
            "
            style={{
              background:
                "var(--card2)",
              border:
                "1px solid var(--border)",
              color:
                "var(--text)",
            }}
          />

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={
                form.password
              }
              onChange={(e) =>
                updateField(
                  "password",
                  e.target.value
                )
              }
              className="
              w-full
              h-12
              px-4
              pr-12
              rounded-xl
              outline-none
              "
              style={{
                background:
                  "var(--card2)",
                border:
                  "1px solid var(--border)",
                color:
                  "var(--text)",
              }}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              "
            >
              {showPassword
                ? "🙈"
                : "👁️"}
            </button>

          </div>

          {mode ===
            "login" && (
            <button
              onClick={() =>
                setShowReset(
                  !showReset
                )
              }
              className="
              text-sm
              text-blue-500
              "
            >
              Forgot Password?
            </button>
          )}

          {showReset && (
            <div
              className="
              rounded-2xl
              p-4
              space-y-3
              "
              style={{
                background:
                  "var(--card2)",
                border:
                  "1px solid var(--border)",
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={
                  resetEmail
                }
                onChange={(
                  e
                ) =>
                  setResetEmail(
                    e.target
                      .value
                  )
                }
                className="
                w-full
                h-12
                px-4
                rounded-xl
                "
                style={{
                  background:
                    "var(--card)",
                  border:
                    "1px solid var(--border)",
                  color:
                    "var(--text)",
                }}
              />

            <button
                onClick={async () => {
                  try {
                    await resetPassword(
                      resetEmail
                    );

                    alert(
                      "Password reset email sent.\n\nCheck Spam/Junk folder if you don't see it."
                    );

                    setShowReset(
                      false
                    );
                  } catch (
                    error
                  ) {
                    alert(
                      error.message
                    );
                  }
                }}
                className="
                w-full
                h-12
                rounded-xl
                bg-blue-600
                text-white
                font-semibold
                "
              >
                Send Reset Email
              </button>
            </div>
          )}

          <button
            disabled={
              loading
            }
            onClick={
              handleSubmit
            }
            className="
            btn-animate
            w-full
            h-12
            rounded-xl
            bg-green-600
            hover:bg-green-700
            text-white
            font-semibold
            "
          >
            {loading
              ? "Loading..."
              : mode ===
                "login"
              ? "Login"
              : "Create Account"}
          </button>

        </div>
      </div>
    </div>
  );
}