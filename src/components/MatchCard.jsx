import { useNavigate } from "react-router-dom";

export default function MatchCard({ match }) {
  const navigate = useNavigate();

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
        navigate(`/chat/${match.id}`)
      }
      className="
      bg-slate-900
      border
      border-slate-700
      rounded-2xl
      overflow-hidden
      cursor-pointer
      hover:border-green-500
      transition
      "
    >
      <div className="p-5">

        <div className="flex justify-between mb-6">

          <span
            className={`font-semibold text-sm ${
              isLive
                ? "text-green-400"
                : isUpcoming
                ? "text-yellow-400"
                : "text-slate-400"
            }`}
          >
            {isLive
              ? `LIVE • ${match.time_elapsed}'`
              : isUpcoming
              ? match.local_date
              : "FULL TIME"}
          </span>

        </div>

        <div className="flex justify-between items-center">

          <div className="text-center w-1/3">

            <p className="font-semibold">
              {
                match.home_team_name_en
              }
            </p>

          </div>

          <div className="w-1/3 text-center">

            <h2 className="text-3xl font-bold">

              {match.home_score}

              {" - "}

              {match.away_score}

            </h2>

          </div>

          <div className="text-center w-1/3">

            <p className="font-semibold">

              {
                match.away_team_name_en
              }

            </p>

          </div>

        </div>

      </div>

      <div
        className="
        border-t
        border-slate-700
        px-5
        py-4
        flex
        justify-end
        "
      >

        <span className="text-blue-400 font-medium">
          Join Chat →
        </span>

      </div>

    </div>
  );
}