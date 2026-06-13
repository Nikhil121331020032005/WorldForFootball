import { useState } from "react";
import { teams } from "../data/teams";
import { useEffect } from "react";
import Select from "react-select";
import {
  registerUser,
  loginUser,
} from "../services/auth";

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
}) {
 const [mode, setMode] =
  useState(initialMode);

useEffect(() => {
  if (isOpen) {
    setMode(initialMode);
  }
}, [initialMode, isOpen]);

const [showPassword, setShowPassword] =
  useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      username: "",
      email: "",
      password: "",
      team: "",
    });

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

const handleSubmit = async () => {
  console.log("STEP 1");

  try {
    setLoading(true);

    if (mode === "register") {
      console.log("STEP 2 REGISTER");

      await registerUser({
        username: form.username,
        email: form.email,
        password: form.password,
        team: form.team,
      });

      console.log("STEP 3 REGISTER SUCCESS");
    } else {
      console.log("STEP 2 LOGIN");

      await loginUser(
        form.email,
        form.password
      );

      console.log("STEP 3 LOGIN SUCCESS");
    }

    onClose();
  } catch (error) {
    console.error("AUTH ERROR:", error);

    alert(error.message);
  } finally {
    setLoading(false);
  }
};

return (
  <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

    <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6">

      <div className="flex gap-2 mb-6">

        <button
          onClick={() =>
            setMode("login")
          }
          className={`flex-1 py-2 rounded-lg ${
            mode === "login"
              ? "bg-green-600"
              : "bg-slate-800"
          }`}
        >
          Login
        </button>

        <button
          onClick={() =>
            setMode("register")
          }
          className={`flex-1 py-2 rounded-lg ${
            mode === "register"
              ? "bg-green-600"
              : "bg-slate-800"
          }`}
        >
          Register
        </button>

      </div>

      <div className="space-y-4">

        {mode === "register" && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                updateField(
                  "username",
                  e.target.value
                )
              }
              className="w-full bg-slate-800 p-3 rounded-lg"
            />

            <Select
  options={teams.map(
    (country) => ({
      value: country,
      label: country,
    })
  )}
  value={
    form.team
      ? {
          value: form.team,
          label: form.team,
        }
      : null
  }
  onChange={(selected) =>
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
          value={form.email}
          onChange={(e) =>
            updateField(
              "email",
              e.target.value
            )
          }
          className="w-full bg-slate-800 p-3 rounded-lg"
        />

       <div className="relative">

  <input
    type={
      showPassword
        ? "text"
        : "password"
    }
    placeholder="Password"
    value={form.password}
    onChange={(e) =>
      updateField(
        "password",
        e.target.value
      )
    }
    className="
      w-full
      bg-slate-800
      p-3
      rounded-lg
      pr-14
    "
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
      right-3
      top-1/2
      -translate-y-1/2
    "
  >
    {showPassword
      ? "🙈"
      : "👁"}
  </button>

</div>

        <button
          disabled={loading}
          onClick={handleSubmit}
          className="w-full bg-green-600 py-3 rounded-lg font-semibold"
        >
          {loading
            ? "Loading..."
            : mode === "login"
            ? "Login"
            : "Create Account"}
        </button>

        <button
          onClick={onClose}
          className="w-full text-slate-400"
        >
          Close
        </button>

      </div>

    </div>

  </div>
);
}