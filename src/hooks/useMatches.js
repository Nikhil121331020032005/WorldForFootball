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

      setError(err.message);

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

 return {
  matches,

  completedMatches:
    matches.filter(
      (match) =>
        match.finished === "TRUE"
    ),

  upcomingMatches:
    matches.filter(
      (match) =>
        match.finished === "FALSE" &&
        match.time_elapsed ===
          "notstarted"
    ),

  liveMatches:
    matches.filter(
      (match) =>
        match.finished === "FALSE" &&
        match.time_elapsed !==
          "notstarted"
    ),

  loading,
  error,
};
}