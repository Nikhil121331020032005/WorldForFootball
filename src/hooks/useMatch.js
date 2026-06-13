import { useEffect, useState } from "react";

export default function useMatch(
  matchId
) {
  const [match, setMatch] =
    useState(null);

  useEffect(() => {
    async function load() {
      const response =
        await fetch(
          "https://worldcup26.ir/get/games"
        );

      const data =
        await response.json();

      const found =
        data.games.find(
          (game) =>
            game.id === matchId
        );

      setMatch(found);
    }

    load();
  }, [matchId]);

  return match;
}