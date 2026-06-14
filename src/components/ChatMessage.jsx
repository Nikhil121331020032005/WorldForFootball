export default function ChatMessage({
  message,
}) {
  const displayName =
    message.username ||
    message.email ||
    "User";

  return (
    <div
      className="
      flex
      gap-3
      md:gap-4
      "
    >
      <div
        className="
        h-10
        w-10

        md:h-12
        md:w-12

        rounded-2xl

        bg-gradient-to-br
        from-green-500
        to-emerald-600

        flex
        items-center
        justify-center

        text-white
        font-bold

        shrink-0

        shadow-md
        "
      >
        {displayName
          .slice(0, 2)
          .toUpperCase()}
      </div>

      <div className="flex-1 min-w-0">

        <div
          className="
          flex
          flex-wrap
          items-center
          gap-2
          md:gap-3
          "
        >
          <h3
            className="
            font-semibold

            text-sm
            md:text-base

            text-[var(--text)]

            truncate
            "
          >
            {displayName}
          </h3>

          <span
            className="
            px-2
            md:px-3

            py-1

            rounded-full

            bg-[var(--card2)]

            border
            border-[var(--border)]

            text-[var(--secondary)]

            text-xs
            font-medium
            "
          >
            {message.team}
          </span>
        </div>

        <div
          className="
          mt-2
          md:mt-3

          bg-[var(--card)]

          border
          border-[var(--border)]

          rounded-3xl

          px-4
          md:px-5

          py-3
          md:py-4

          inline-block

          max-w-[95%]
          md:max-w-[85%]

          shadow-sm

          transition-all
          duration-300
          "
        >
          {message.type ===
          "gif" ? (
            <img
              src={
                message.gifUrl
              }
              alt="gif"
              className="
              rounded-2xl

              w-full
              max-w-[260px]

              md:max-w-sm

              object-cover
              "
            />
          ) : (
            <p
              className="
              text-[var(--text)]

              break-words

              leading-relaxed

              text-sm
              md:text-base
              "
            >
              {message.text}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}