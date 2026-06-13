import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import MatchTabs from "../components/MatchTabs";
import MatchCard from "../components/MatchCard";
import useMatches from "../hooks/useMatches";

export default function Lobby() {
  const [activeTab, setActiveTab] = useState("live");
  const {
  liveMatches,
  upcomingMatches,
  completedMatches,
  loading,
  error,
} = useMatches();
 let filteredMatches = [];

if (activeTab === "live") {
  filteredMatches = liveMatches;
}

if (activeTab === "upcoming") {
  filteredMatches = upcomingMatches;
}

if (activeTab === "completed") {
  filteredMatches = completedMatches;
} 
if (loading) {
  return (
    <MainLayout>
      <div className="p-10 text-center">
        Loading matches...
      </div>
    </MainLayout>
  );
}

if (error) {
  return (
    <MainLayout>
      <div className="p-10 text-center text-red-500">
        {error}
      </div>
    </MainLayout>
  );
}
  return (
    <MainLayout>
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-bold">
              Match Chat Rooms
            </h1>

            <p className="text-slate-400 mt-3">
              Select a match to join the global conversation
            </p>
          </div>

          <div className="bg-green-950 border border-green-700 rounded-full px-5 py-3">
           🟢 {liveMatches.length} matches live now
          </div>
        </div>

        <MatchTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>
    </div>
  </MainLayout>);
}