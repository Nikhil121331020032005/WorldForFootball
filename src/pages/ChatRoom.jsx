import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import AuthModal from "../components/AuthModal";
import useMessages from "../hooks/useMessages";
import useAutoScroll from "../hooks/useAutoScroll";
import useMatch from "../hooks/useMatch";
import useRoomPresence from "../hooks/useRoomPresence";
import usePresence from "../hooks/usePresence";

export default function ChatRoom() {
  const user = useSelector(
  (state) => state.auth.user
);

  
  const isAuthenticated = !!user;
  const { roomId } = useParams();
  const match = useMatch(roomId);
  const messages = useMessages(roomId);
  useRoomPresence(
  roomId,
  user
);
const onlineCount = usePresence(roomId);
  const bottomRef = useAutoScroll(messages);
  

  const [showAuthModal, setShowAuthModal] =
    useState(false);

 

  

  return (
    <MainLayout>

      <div className="max-w-6xl mx-auto h-[calc(100vh-64px)] flex flex-col">

        <div className="border-b border-slate-800 p-5">

         <h1 className="text-2xl font-bold">

  {match
    ? `${match.home_team_name_en}
       vs
       ${match.away_team_name_en}`
    : "Loading..."}

</h1>
{match && (
  <div className="mt-2 space-y-1">

    <p className="text-slate-400">

      Group {match.group}

    </p>

    <p className="font-semibold">

      {match.home_score}

      {" - "}

      {match.away_score}

    </p>

    <p className="text-sm text-slate-500">

      {match.local_date}

    </p>

    <p className="text-sm">

      Status:

      {" "}

      {match.time_elapsed}

    </p>

  </div>
)}

          <p className="text-slate-400 mt-2">
             🔥 {onlineCount} fans online
          </p>

        </div>

<div className="flex-1 overflow-y-auto p-5 space-y-6">

  {messages.map((message) => (
    <ChatMessage
      key={message.id}
      message={message}
    />
  ))}

  <div ref={bottomRef}></div>

</div>

        <ChatInput
        roomId={roomId}
          isAuthenticated={isAuthenticated}
          openAuthModal={() =>
            setShowAuthModal(true)
          }
        />

      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

    </MainLayout>
  );
}