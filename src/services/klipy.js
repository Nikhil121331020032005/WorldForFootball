const API_KEY = 
  import.meta.env
    .VITE_KLIPY_API_KEY;

export async function searchGifs(
  query
) {
  const response =
    await fetch(
      `https://api.klipy.com/api/v1/${API_KEY}/gifs/search?q=${query}`
    );

  const data =
    await response.json();

  return (
    data?.data?.data || []
  );
}