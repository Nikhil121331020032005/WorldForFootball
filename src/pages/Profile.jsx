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
        <div
          className="
          min-h-[60vh]
          flex
          items-center
          justify-center
          text-lg
          "
        >
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
      <div
        className="
        max-w-6xl
        mx-auto

        px-4
        sm:px-6
        lg:px-8

        py-8
        md:py-12
        "
      >
        <div className="mb-10">
          <span
            className="
            inline-block

            px-4
            py-2

            rounded-full
            text-sm
            font-medium
            mb-4
            "
            style={{
              background:
                "rgba(34,197,94,.1)",
              color:
                "rgb(34,197,94)",
              border:
                "1px solid rgba(34,197,94,.2)",
            }}
          >
            ⚽ Football Fan Profile
          </span>

          <h1
            className="
            text-4xl
            md:text-6xl
            font-black
            "
            style={{
              color:
                "var(--text)",
            }}
          >
            My Profile
          </h1>

          <p
            className="
            mt-3
            text-base
            md:text-lg
            "
            style={{
              color:
                "var(--secondary)",
            }}
          >
            Manage your football
            identity and connect
            with supporters around
            the world.
          </p>
        </div>

        <div
          className="
          rounded-3xl
          p-5
          md:p-8
          "
          style={{
            background:
              "var(--card)",
            border:
              "1px solid var(--border)",
          }}
        >
          <div className="space-y-6">
            <div>
              <label
                className="
                block
                mb-2
                font-medium
                "
                style={{
                  color:
                    "var(--secondary)",
                }}
              >
                Username
              </label>

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
            </div>

            <div>
              <label
                className="
                block
                mb-2
                font-medium
                "
                style={{
                  color:
                    "var(--secondary)",
                }}
              >
                Email Address
              </label>

              <input
                value={profile.email}
                disabled
                className="
                w-full
                h-12
                px-4
                rounded-xl
                "
                style={{
                  background:
                    "var(--card2)",
                  border:
                    "1px solid var(--border)",
                  color:
                    "var(--secondary)",
                }}
              />
            </div>

            <div>
              <label
                className="
                block
                mb-2
                font-medium
                "
                style={{
                  color:
                    "var(--secondary)",
                }}
              >
                Supporting Nation
              </label>

              <select
                value={team}
                onChange={(e) =>
                  setTeam(
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
              >
                {teams.map(
                  (
                    teamName
                  ) => (
                    <option
                      key={
                        teamName
                      }
                      value={
                        teamName
                      }
                    >
                      {teamName}
                    </option>
                  )
                )}
              </select>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="
              btn-animate

              px-8
              py-3

              rounded-xl

              bg-green-600
              hover:bg-green-700

              text-white
              font-semibold
              "
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </div>

        <div
          className="
          mt-8

          rounded-3xl

          p-6
          md:p-10
          "
          style={{
            background:
              "linear-gradient(135deg,#16a34a,#10b981)",
            color: "white",
          }}
        >
          <h2
            className="
            text-2xl
            md:text-4xl
            font-bold
            mb-4
            "
          >
            About WorldForFootball
          </h2>

          <p
            className="
            text-base
            md:text-lg
            leading-8
            text-white/90
            "
          >
            Football is not just a
            sport. It is emotion,
            culture, rivalry,
            passion and unity.

            WorldForFootball brings
            supporters together
            from every nation,
            creating a place where
            fans can celebrate
            goals, debate matches,
            share reactions and
            experience the FIFA
            World Cup together.

            Whether you're cheering
            for Portugal, Brazil,
            Argentina, Germany or
            any nation on Earth,
            you'll always find
            fellow supporters here.

            One World. One Game.
            One Community.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}