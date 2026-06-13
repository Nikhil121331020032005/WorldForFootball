import { useState } from "react";
import useUserProfile from "../hooks/useUserProfile";
import { sendMessage } from "../services/chat";
import EmojiPicker from "emoji-picker-react";
import { useSelector } from "react-redux";
export default function ChatInput({roomId,
  isAuthenticated,
  openAuthModal,
}) {

  const [message, setMessage] =
  useState("");
  const [showEmojiPicker, setShowEmojiPicker] =
  useState(false);
  const [showGifPanel, setShowGifPanel] =
  useState(false);

const user = useSelector(
  (state) => state.auth.user
);
const profile = useUserProfile(
  user?.uid
);
const handleSend = async () => {

  if (!isAuthenticated) {
    openAuthModal();
    return;
  }

  if (!message.trim()) return;

  await sendMessage(
    roomId,
    user,
    message
  );

  setMessage("");
};
  return (
    <div className="border-t border-slate-800 p-4 bg-slate-900">
{showEmojiPicker && (
  <div className="mb-3">

    <EmojiPicker
      onEmojiClick={(emojiData) => {
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
  <div
    className="
    mb-3
    bg-slate-800
    p-4
    rounded-xl
    "
  >
    GIF Panel Coming Soon
  </div>
)}
      <div className="flex gap-3">
        <button
  onClick={() =>
    setShowEmojiPicker(
      !showEmojiPicker
    )
  }
  className="
  bg-slate-800
  px-4
  rounded-xl
  text-xl
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
  bg-slate-800
  px-4
  rounded-xl
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
  onKeyDown={async (e) => {
    if (e.key !== "Enter") return;

    if (!isAuthenticated) {
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
              ? "Join the conversation..."
              : "Login required to chat"
          }
          disabled={!isAuthenticated}
          className="flex-1 bg-slate-800 rounded-xl px-4 py-3 outline-none"
        />

        <button 
          onClick={handleSend}
          onKeyDown={(e) => {
  if (e.key === "Enter") {
    handleSend();
  }
}}
          className="bg-green-600 px-6 rounded-xl"
        >
          Send
        </button>

       </div>

  {isAuthenticated && profile && (
    <div className="mt-2 text-sm text-slate-400">

      Posting as

      <span className="font-semibold text-white ml-1">
        {profile.username}
      </span>

      <span className="mx-2">•</span>

      {profile.team} supporter

    </div>
  )}

</div>
  );
}