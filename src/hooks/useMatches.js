import { useEffect, useState } from "react";
import { getMatches } from "../services/footballApi";

export default function useMatches() {
  const [matches, setMatches] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    async function loadMatches() {
      try {
        const data =
          await getMatches();

        setMatches(data);
      } catch (err) {
        console.error(err);

        setError(
          err.message ||
            "Failed to load matches"
        );
      } finally {
        setLoading(false);
      }
    }

    loadMatches();

    const interval =
      setInterval(
        loadMatches,
        30000
      );

    return () =>
      clearInterval(interval);
  }, []);

  const completedMatches =
    matches
      .filter(
        (match) =>
          match.finished ===
          "TRUE"
      )
      .sort(
        (a, b) =>
          new Date(
            b.local_date
          ) -
          new Date(
            a.local_date
          )
      );

  const upcomingMatches =
    matches
      .filter(
        (match) =>
          match.finished ===
            "FALSE" &&
          match.time_elapsed ===
            "notstarted"
      )
      .sort(
        (a, b) =>
          new Date(
            a.local_date
          ) -
          new Date(
            b.local_date
          )
      );

  const liveMatches =
    matches
      .filter(
        (match) =>
          match.finished ===
            "FALSE" &&
          match.time_elapsed !==
            "notstarted"
      )
      .sort(
        (a, b) =>
          Number(
            b.time_elapsed
          ) -
          Number(
            a.time_elapsed
          )
      );

  return {
    matches,
    completedMatches,
    upcomingMatches,
    liveMatches,
    loading,
    error,
  };
}