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

  const messages =
    useMessages(roomId);

  useRoomPresence(
    roomId,
    user
  );

  const onlineCount =
    usePresence(roomId);

  const bottomRef =
    useAutoScroll(messages);

  const [
    showAuthModal,
    setShowAuthModal,
  ] = useState(false);

  return (
    <MainLayout>
      <div
        className="
        min-h-screen
        bg-[var(--bg)]
        transition-all
        duration-300
        "
      >
        <div
          className="
          max-w-[1400px]
          mx-auto

          px-4
          sm:px-6
          lg:px-8

          py-4
          md:py-8
          "
        >
          {match && (
            <div
              className="
              bg-[var(--card)]
              border
              border-[var(--border)]

              rounded-3xl

              p-5
              md:p-8

              mb-6
              md:mb-8

              transition-all
              duration-300
              "
            >
              <div
                className="
                flex
                flex-col

                md:flex-row

                gap-6

                items-center
                justify-between
                "
              >
                <div
                  className="
                  text-center
                  md:text-left

                  flex-1
                  "
                >
                  <p
                    className="
                    text-sm
                    text-[var(--secondary)]
                    mb-2
                    "
                  >
                    Group {match.group}
                  </p>

                  <h2
                    className="
                    text-xl
                    md:text-3xl
                    font-bold
                    text-[var(--text)]
                    "
                  >
                    {match.home_team_name_en}
                  </h2>
                </div>

                <div
                  className="
                  text-center
                  "
                >
                  <div
                    className="
                    text-4xl
                    md:text-6xl
                    font-black
                    text-[var(--text)]
                    "
                  >
                    {match.home_score}
                    -
                    {match.away_score}
                  </div>

                  <div className="mt-3">
                    {match.time_elapsed ===
                    "notstarted" ? (
                      <span
                        className="
                        px-4
                        py-2
                        rounded-full
                        bg-blue-100
                        text-blue-600
                        text-sm
                        font-semibold
                        "
                      >
                        UPCOMING
                      </span>
                    ) : match.finished ===
                      "TRUE" ? (
                      <span
                        className="
                        px-4
                        py-2
                        rounded-full
                        bg-green-100
                        text-green-600
                        text-sm
                        font-semibold
                        "
                      >
                        COMPLETED
                      </span>
                    ) : (
                      <span
                        className="
                        px-4
                        py-2
                        rounded-full
                        bg-red-100
                        text-red-500
                        text-sm
                        font-semibold
                        "
                      >
                        🔴 LIVE
                        {match.time_elapsed !==
                          "live" &&
                          ` • ${match.time_elapsed}'`}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className="
                  text-center
                  md:text-right

                  flex-1
                  "
                >
                  <p
                    className="
                    text-sm
                    text-[var(--secondary)]
                    mb-2
                    "
                  >
                    {match.local_date}
                  </p>

                  <h2
                    className="
                    text-xl
                    md:text-3xl
                    font-bold
                    text-[var(--text)]
                    "
                  >
                    {match.away_team_name_en}
                  </h2>
                </div>
              </div>

              <div
                className="
                mt-6
                pt-6

                border-t
                border-[var(--border)]

                flex
                flex-col
                md:flex-row

                gap-3

                justify-between
                items-center
                "
              >
                <p
                  className="
                  text-[var(--secondary)]
                  "
                >
                  Match Discussion
                </p>

                <div
                  className="
                  font-semibold
                  text-green-500
                  "
                >
                  🔥 {onlineCount} fans online
                </div>
              </div>
            </div>
          )}

          <div
            className="
            bg-[var(--card)]
            border
            border-[var(--border)]

            rounded-3xl
            overflow-hidden

            transition-all
            duration-300
            "
          >
            <div
              className="
              h-[55vh]
              md:h-[650px]

              overflow-y-auto

              p-4
              md:p-6

              space-y-6
              "
            >
              {messages.map(
                (message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                  />
                )
              )}

              <div ref={bottomRef} />
            </div>

            <ChatInput
              roomId={roomId}
              isAuthenticated={
                isAuthenticated
              }
              openAuthModal={() =>
                setShowAuthModal(
                  true
                )
              }
            />
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() =>
          setShowAuthModal(false)
        }
      />
    </MainLayout>
  );
}