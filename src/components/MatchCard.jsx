import { useNavigate } from "react-router-dom";

export default function MatchCard({
  match,
}) {
  const navigate =
    useNavigate();

  const isCompleted =
    match.finished === "TRUE";

  const isUpcoming =
    match.time_elapsed ===
    "notstarted";

  const isLive =
    !isCompleted &&
    !isUpcoming;

  return (
    <div
      onClick={() =>
        navigate(
          `/chat/${match.id}`
        )
      }
      className="
      bg-[var(--card)]
      border
      border-[var(--border)]
      rounded-3xl
      overflow-hidden
      cursor-pointer
      transition-all
      duration-300
      hover:border-green-500
      hover:-translate-y-1
      hover:shadow-[0_0_40px_rgba(34,197,94,0.15)]
      "
    >
      <div className="p-7">

        <div className="flex justify-between items-center">

          <div>

            {isLive && (
              <span
                className="
                px-3
                py-1
                rounded-full
                bg-red-100
                text-red-500
                text-xs
                font-semibold
                "
              >
                🔴 LIVE
                {match.time_elapsed !==
                  "live" &&
                  ` • ${match.time_elapsed}'`}
              </span>
            )}

            {isUpcoming && (
              <span
                className="
                px-3
                py-1
                rounded-full
                bg-blue-100
                text-blue-600
                text-xs
                font-semibold
                "
              >
                UPCOMING
              </span>
            )}

            {isCompleted && (
              <span
                className="
                px-3
                py-1
                rounded-full
                bg-green-100
                text-green-600
                text-xs
                font-semibold
                "
              >
                FULL TIME
              </span>
            )}

          </div>

          <span
            className="
            text-[var(--secondary)]
            text-sm
            "
          >
            Group {match.group}
          </span>

        </div>

        <div className="mt-8">

          <div
            className="
            flex
            items-center
            justify-between
            "
          >

            <div className="w-1/3">

              <h2
                className="
                text-xl
                font-bold
                text-[var(--text)]
                "
              >
                {match.home_team_name_en}
              </h2>

            </div>

            <div
              className="
              w-1/3
              text-center
              "
            >

              {isUpcoming ? (
                <div
                  className="
                  text-3xl
                  font-black
                  text-[var(--secondary)]
                  "
                >
                  VS
                </div>
              ) : (
                <div
                  className="
                  text-5xl
                  font-black
                  text-[var(--text)]
                  "
                >
                  {match.home_score}
                  -
                  {match.away_score}
                </div>
              )}

            </div>

            <div
              className="
              w-1/3
              text-right
              "
            >

              <h2
                className="
                text-xl
                font-bold
                text-[var(--text)]
                "
              >
                {match.away_team_name_en}
              </h2>

            </div>

          </div>

          {isUpcoming && (
            <p
              className="
              text-center
              mt-5
              text-[var(--secondary)]
              "
            >
              {match.local_date}
            </p>
          )}

        </div>

        {(match.home_scorers !==
          "null" ||
          match.away_scorers !==
            "null") && (
          <div
            className="
            mt-8
            pt-6
            border-t
            border-[var(--border)]
            "
          >

            {match.home_scorers !==
              "null" && (
              <div className="mb-4">

                <p
                  className="
                  text-xs
                  uppercase
                  tracking-wider
                  text-[var(--secondary)]
                  mb-1
                  "
                >
                  {match.home_team_name_en}
                </p>

                <p
                  className="
                  text-green-500
                  "
                >
                  ⚽{" "}
                  {match.home_scorers.replace(
                    /[{}"]/g,
                    ""
                  )}
                </p>

              </div>
            )}

            {match.away_scorers !==
              "null" && (
              <div>

                <p
                  className="
                  text-xs
                  uppercase
                  tracking-wider
                  text-[var(--secondary)]
                  mb-1
                  "
                >
                  {match.away_team_name_en}
                </p>

                <p
                  className="
                  text-green-500
                  "
                >
                  ⚽{" "}
                  {match.away_scorers.replace(
                    /[{}"]/g,
                    ""
                  )}
                </p>

              </div>
            )}

          </div>
        )}

      </div>

      <div
        className="
        border-t
        border-[var(--border)]
        px-7
        py-4
        flex
        justify-between
        items-center
        "
      >

        <span
          className="
          text-[var(--secondary)]
          text-sm
          "
        >
          Open Discussion
        </span>

        <span
          className="
          text-green-600
          font-semibold
          "
        >
          Join →
        </span>

      </div>

    </div>
  );
}