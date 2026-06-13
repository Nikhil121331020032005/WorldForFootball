export default function ChatMessage({ message }) {
  const displayName =
    message.username ||
    message.email ||
    "User";


  return (
    <div className="flex gap-3">

      <div
        className="
        h-12
        w-12
        rounded-full
        bg-gradient-to-r
        from-green-500
        to-green-700
        flex
        items-center
        justify-center
        font-bold
        text-white
        "
      >
        {displayName
          .slice(0, 2)
          .toUpperCase()}
      </div>

      <div className="flex-1">

        <div className="flex items-center gap-2 flex-wrap">

          <span className="font-bold text-white">
            {displayName}
          </span>

          <span
            className="
            text-xs
            px-2
            py-1
            rounded-full
            bg-slate-800
            text-slate-300
            "
          >
            {message.team}
          </span>

        </div>

        <div
          className="
          mt-2
          bg-slate-900
          border
          border-slate-800
          rounded-2xl
          px-4
          py-3
          inline-block
          max-w-[80%]
          "
        >
          {message.text}
        </div>

      </div>

    </div>
  );
}