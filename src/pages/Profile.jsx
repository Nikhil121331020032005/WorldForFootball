import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import useUserProfile from "../hooks/useUserProfile";
import MainLayout from "../layouts/MainLayout";

import { updateProfile } from "../services/profile";

import { teams } from "../data/teams";

export default function Profile() {
  const user = useSelector(
    (state) => state.auth.user
  );

  const profile =
    useUserProfile(user?.uid);

  const [username, setUsername] =
    useState("");

  const [team, setTeam] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    if (profile) {
      setUsername(
        profile.username || ""
      );

      setTeam(
        profile.team || ""
      );
    }
  }, [profile]);

  if (!profile) {
    return (
      <MainLayout>
        <div className="p-10">
          Loading...
        </div>
      </MainLayout>
    );
  }

  const handleSave =
    async () => {
      try {
        setSaving(true);

        await updateProfile(
          user.uid,
          {
            username,
            team,
          }
        );

        alert(
          "Profile updated successfully"
        );
      } catch (error) {
        console.error(error);

        alert(
          "Failed to update profile"
        );
      } finally {
        setSaving(false);
      }
    };

  return (
    <MainLayout>

      <div className="max-w-3xl mx-auto p-8">

        <h1 className="text-4xl font-bold mb-8">
          My Profile
        </h1>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-6">

          <div>

            <p className="text-slate-400 mb-2">
              Username
            </p>

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              className="
              w-full
              bg-slate-800
              p-3
              rounded-xl
              "
            />

          </div>

          <div>

            <p className="text-slate-400 mb-2">
              Email
            </p>

            <input
              type="text"
              value={profile.email}
              disabled
              className="
              w-full
              bg-slate-800
              p-3
              rounded-xl
              opacity-60
              "
            />

          </div>

          <div>

            <p className="text-slate-400 mb-2">
              Supporting Team
            </p>

            <select
              value={team}
              onChange={(e) =>
                setTeam(
                  e.target.value
                )
              }
              className="
              w-full
              bg-slate-800
              p-3
              rounded-xl
              "
            >
              {teams.map((teamName) => (
                <option
                  key={teamName}
                  value={teamName}
                >
                  {teamName}
                </option>
              ))}
            </select>

          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="
            bg-green-600
            px-6
            py-3
            rounded-xl
            font-semibold
            "
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </div>

    </MainLayout>
  );
}