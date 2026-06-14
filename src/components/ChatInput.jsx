import { useState } from "react";
import { useSelector } from "react-redux";

import EmojiPicker from "emoji-picker-react";

import useUserProfile from "../hooks/useUserProfile";

import { sendMessage } from "../services/chat";
import { sendGif } from "../services/chat";

import GifPicker from "./GifPicker";

export default function ChatInput({
  roomId,
  isAuthenticated,
  openAuthModal,
}) {
  const [message, setMessage] =
    useState("");

  const [
    showEmojiPicker,
    setShowEmojiPicker,
  ] = useState(false);

  const [
    showGifPanel,
    setShowGifPanel,
  ] = useState(false);

  const user = useSelector(
    (state) => state.auth.user
  );

  const profile =
    useUserProfile(user?.uid);

  const handleSend =
    async () => {
      if (!isAuthenticated) {
        openAuthModal();
        return;
      }

      if (!message.trim())
        return;

      await sendMessage(
        roomId,
        user,
        message
      );

      setMessage("");
    };

  return (
    <div
      className="
      relative

      border-t
      border-[var(--border)]

      bg-[var(--card)]

      p-3
      md:p-5

      transition-all
      duration-300
      "
    >
      {showEmojiPicker && (
        <div
          className="
          absolute

          bottom-24

          left-2
          md:left-5

          z-50

          max-w-[95vw]

          overflow-hidden

          rounded-2xl

          shadow-2xl

          border
          border-[var(--border)]
          "
        >
          <div
            className="
            flex
            items-center
            justify-between

            px-4
            py-3

            bg-[var(--card)]

            border-b
            border-[var(--border)]
            "
          >
            <h3
              className="
              font-semibold
              text-[var(--text)]
              "
            >
              Emojis
            </h3>

            <button
              onClick={() =>
                setShowEmojiPicker(
                  false
                )
              }
              className="
              text-[var(--secondary)]
              hover:text-red-500
              "
            >
              ✕
            </button>
          </div>

          <EmojiPicker
            onEmojiClick={(
              emojiData
            ) => {
              setMessage(
                (prev) =>
                  prev +
                  emojiData.emoji
              );
            }}
          />
        </div>
      )}

      {showGifPanel && (
        <GifPicker
          onClose={() =>
            setShowGifPanel(
              false
            )
          }
          onSelect={async (
            gif
          ) => {
            await sendGif(
              roomId,
              user,
              gif.file.md.gif.url
            );

            setShowGifPanel(
              false
            );
          }}
        />
      )}

      <div
        className="
        flex
        items-center
        gap-2
        md:gap-3
        "
      >
        <button
          onClick={() =>
            setShowEmojiPicker(
              !showEmojiPicker
            )
          }
          className="
          btn-animate

          h-11
          w-11

          md:h-12
          md:w-12

          shrink-0

          rounded-2xl

          bg-[var(--card2)]

          border
          border-[var(--border)]

          text-lg
          md:text-xl
          "
        >
          😀
        </button>

        <button
          onClick={() =>
            setShowGifPanel(
              !showGifPanel
            )
          }
          className="
          btn-animate

          px-3
          md:px-5

          h-11
          md:h-12

          shrink-0

          rounded-2xl

          bg-[var(--card2)]

          border
          border-[var(--border)]

          font-medium

          text-[var(--text)]
          "
        >
          GIF
        </button>

        <input
          type="text"
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          onKeyDown={async (
            e
          ) => {
            if (
              e.key !== "Enter"
            )
              return;

            if (
              !isAuthenticated
            ) {
              openAuthModal();
              return;
            }

            await sendMessage(
              roomId,
              user,
              message
            );

            setMessage("");
          }}
          placeholder={
            isAuthenticated
              ? "Message..."
              : "Login required"
          }
          disabled={
            !isAuthenticated
          }
          className="
          flex-1

          h-11
          md:h-12

          min-w-0

          px-4

          rounded-2xl

          border
          border-[var(--border)]

          bg-[var(--card2)]

          text-[var(--text)]

          outline-none

          focus:border-green-500
          "
        />

        <button
          onClick={handleSend}
          className="
          btn-animate

          h-11
          md:h-12

          px-4
          md:px-8

          shrink-0

          rounded-2xl

          bg-green-600

          hover:bg-green-700

          text-white
          font-semibold

          shadow-sm
          "
        >
          Send
        </button>
      </div>

      {isAuthenticated &&
        profile && (
          <div
            className="
            mt-3

            text-xs
            md:text-sm

            text-[var(--secondary)]

            truncate
            "
          >
            Posting as

            <span
              className="
              ml-1

              font-semibold

              text-[var(--text)]
              "
            >
              {profile.username}
            </span>

            <span className="mx-2">
              •
            </span>

            {profile.team}
          </div>
        )}
    </div>
  );
}