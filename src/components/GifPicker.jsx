import { useState, useEffect } from "react";
import { searchGifs } from "../services/klipy";

export default function GifPicker({
  onSelect,
  onClose,
}) {
  const [query, setQuery] =
    useState("");

  const [gifs, setGifs] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const loadTrending =
    async () => {
      try {
        setLoading(true);

        const categories = [
          "football",
          "goal",
          "celebration",
          "messi",
          "ronaldo",
          "wow",
          "funny",
          "clap",
        ];

        const randomQuery =
          categories[
            Math.floor(
              Math.random() *
                categories.length
            )
          ];

        const results =
          await searchGifs(
            randomQuery
          );

        setGifs(results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadTrending();
  }, []);
  
  const handleSearch =
    async () => {
      if (!query.trim()) {
        loadTrending();
        return;
      }

      try {
        setLoading(true);

        const results =
          await searchGifs(
            query
          );

        setGifs(results);
      } catch (error) {
        console.error(error);
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
      p-3
      md:p-4
      "
    >
      <div
        className="
        w-full
        max-w-6xl

        h-[90vh]
        md:h-[80vh]

        rounded-3xl
        overflow-hidden

        flex
        flex-col
        "
        style={{
          background:
            "var(--card)",
          border:
            "1px solid var(--border)",
        }}
      >
        <div
          className="
          flex
          items-center
          justify-between

          px-4
          md:px-6

          py-4
          md:py-5
          "
          style={{
            borderBottom:
              "1px solid var(--border)",
          }}
        >
          <div>
            <h2
              className="
              text-xl
              md:text-2xl
              font-bold
              "
              style={{
                color:
                  "var(--text)",
              }}
            >
              GIF Search
            </h2>

            <p
              className="
              text-sm
              mt-1
              "
              style={{
                color:
                  "var(--secondary)",
              }}
            >
              Trending GIFs loaded automatically
            </p>
          </div>

          <button
            onClick={onClose}
            className="
            btn-animate

            h-10
            w-10

            rounded-xl

            flex
            items-center
            justify-center
            "
            style={{
              background:
                "var(--card2)",
              color:
                "var(--secondary)",
            }}
          >
            ✕
          </button>
        </div>

        <div
          className="
          p-4
          md:p-6
          "
        >
          <div className="flex gap-3">

            <input
              value={query}
              onChange={(e) =>
                setQuery(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (
                  e.key ===
                  "Enter"
                ) {
                  handleSearch();
                }
              }}
              placeholder="Search GIFs..."
              className="
              flex-1

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

            <button
              onClick={
                handleSearch
              }
              className="
              btn-animate

              px-5
              md:px-6

              rounded-xl

              bg-green-600
              hover:bg-green-700

              text-white
              font-semibold
              "
            >
              Search
            </button>

          </div>
        </div>

        <div
          className="
          flex-1
          overflow-y-auto

          px-4
          md:px-6

          pb-6
          "
        >
          {loading ? (
            <div
              className="
              h-full
              flex
              items-center
              justify-center
              "
              style={{
                color:
                  "var(--secondary)",
              }}
            >
              Loading GIFs...
            </div>
          ) : gifs.length === 0 ? (
            <div
              className="
              h-full
              flex
              items-center
              justify-center
              "
              style={{
                color:
                  "var(--secondary)",
              }}
            >
              No GIFs found.
            </div>
          ) : (
            <div
              className="
              grid

              grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4

              gap-3
              md:gap-4
              "
            >
              {gifs.map(
                (gif) => (
                  <div
                    key={gif.id}
                    onClick={() =>
                      onSelect(
                        gif
                      )
                    }
                    className="
                    cursor-pointer

                    rounded-2xl
                    overflow-hidden

                    transition-all
                    duration-300

                    hover:scale-[1.03]
                    "
                    style={{
                      border:
                        "1px solid var(--border)",
                    }}
                  >
                    <img
                      src={
                        gif.file.sm
                          .gif.url
                      }
                      alt="GIF"
                      className="
                      w-full

                      h-40
                      md:h-48

                      object-cover
                      "
                    />
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}