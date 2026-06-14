import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import MatchTabs from "../components/MatchTabs";
import MatchCard from "../components/MatchCard";
import useMatches from "../hooks/useMatches";

export default function Lobby() {
  const [activeTab, setActiveTab] =
    useState("live");

  const {
    liveMatches,
    upcomingMatches,
    completedMatches,
    loading,
    error,
  } = useMatches();

  let filteredMatches = [];

  if (activeTab === "live") {
    filteredMatches = liveMatches;
  }

  if (activeTab === "upcoming") {
    filteredMatches = upcomingMatches;
  }

  if (activeTab === "completed") {
    filteredMatches = completedMatches;
  }

  if (loading) {
    return (
      <MainLayout>
        <div
          className="
          min-h-[70vh]
          flex
          items-center
          justify-center
          text-lg
          "
          style={{
            color: "var(--secondary)",
          }}
        >
          Loading matches...
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div
          className="
          min-h-[70vh]
          flex
          items-center
          justify-center
          text-lg
          text-red-500
          "
        >
          {error}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div
        className="
        min-h-screen
        transition-all
        duration-300
        "
        style={{
          background: "var(--bg)",
          color: "var(--text)",
        }}
      >
        <div
          className="
          max-w-[1400px]
          mx-auto

          px-4
          sm:px-6
          lg:px-8

          py-8
          md:py-12
          "
        >
          {/* HERO */}

          <div
            className="
            flex
            flex-col
            lg:flex-row

            gap-6
            lg:gap-10

            justify-between
            lg:items-start

            mb-10
            md:mb-14
            "
          >
            <div className="flex-1">
              <h1
                className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                lg:text-6xl

                font-black
                leading-tight
                "
                style={{
                  color: "var(--text)",
                }}
              >
                Discover the World Cup
                Match Chat Rooms
              </h1>

              <p
                className="
                mt-4
                text-base
                md:text-lg
                max-w-2xl
                "
                style={{
                  color:
                    "var(--secondary)",
                }}
              >
                Join the global
                conversation with
                football fans from
                around the world
                during every FIFA
                World Cup match.
              </p>
            </div>

            <div
              className="
              self-start

              px-5
              py-3

              rounded-full
              font-semibold
              text-sm
              md:text-base
              "
              style={{
                background:
                  "rgba(239,68,68,.08)",
                color: "#ef4444",
                border:
                  "1px solid rgba(239,68,68,.15)",
              }}
            >
              ● {liveMatches.length} matches
              live now
            </div>
          </div>

          {/* TABS */}

          <MatchTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* MATCHES */}

          <div
            className="
            grid

            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3

            gap-5
            md:gap-7

            mt-8
            "
          >
            {filteredMatches.length >
            0 ? (
              filteredMatches.map(
                (match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                  />
                )
              )
            ) : (
              <div
                className="
                col-span-full

                rounded-3xl
                p-12

                text-center
                "
                style={{
                  background:
                    "var(--card)",
                  border:
                    "1px solid var(--border)",
                }}
              >
                <h3
                  className="
                  text-xl
                  font-bold
                  mb-2
                  "
                >
                  No Matches Found
                </h3>

                <p
                  style={{
                    color:
                      "var(--secondary)",
                  }}
                >
                  There are no matches
                  available in this
                  category right now.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}