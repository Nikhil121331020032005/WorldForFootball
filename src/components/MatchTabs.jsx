export default function MatchTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { key: "live", label: "🔴 Live" },
    { key: "upcoming", label: "🕒 Upcoming" },
    { key: "completed", label: "✅ Completed" },
  ];

  return (
    <div className="flex gap-2 bg-slate-900 p-2 rounded-xl border border-slate-700 w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-5 py-2 rounded-lg font-medium transition
          ${
            activeTab === tab.key
              ? "bg-green-600 text-white"
              : "text-slate-400"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}