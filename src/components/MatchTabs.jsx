export default function MatchTabs({
  activeTab,
  setActiveTab,
}) {
  const tabs = [
    {
      key: "live",
      label: "Live",
      icon: "🔴",
    },
    {
      key: "upcoming",
      label: "Upcoming",
      icon: "🕒",
    },
    {
      key: "completed",
      label: "Completed",
      icon: "✅",
    },
  ];

  return (
    <div
      className="
      w-full
      overflow-x-auto
      "
    >
      <div
        className="
        flex
        gap-2
        p-2
        rounded-2xl
        w-fit
        min-w-full
        md:min-w-0
        "
        style={{
          background:
            "var(--card)",
          border:
            "1px solid var(--border)",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() =>
              setActiveTab(
                tab.key
              )
            }
            className="
            btn-animate

            flex
            items-center
            justify-center
            gap-2

            flex-1

            px-4
            md:px-6

            py-3

            rounded-xl

            font-semibold

            whitespace-nowrap

            transition-all
            duration-300
            "
            style={{
              background:
                activeTab ===
                tab.key
                  ? "#16a34a"
                  : "transparent",

              color:
                activeTab ===
                tab.key
                  ? "#ffffff"
                  : "var(--secondary)",

              boxShadow:
                activeTab ===
                tab.key
                  ? "0 8px 25px rgba(22,163,74,.25)"
                  : "none",
            }}
          >
            <span>
              {tab.icon}
            </span>

            <span>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}