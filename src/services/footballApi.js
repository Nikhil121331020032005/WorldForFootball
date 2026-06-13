export async function getMatches() {
  const response = await fetch(
    "https://worldcup26.ir/get/games"
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch matches"
    );
  }

  const data = await response.json();

  return data.games || [];
}