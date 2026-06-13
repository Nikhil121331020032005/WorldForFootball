import useMatches from "../hooks/useMatches";

export default function Home() {
  const {
  matches,
  liveMatches,
  upcomingMatches,
  completedMatches,
  loading,
  error,
} = useMatches();
   
  // const completedMatches =
  // matches.filter(
  //   (match) =>
  //     match.finished === "TRUE"
  // );

// const activeMatches =
//   matches.filter(
//     (match) =>
//       match.finished !== "TRUE"
//   );



  if (loading) {
    return (
      <div className="p-8">
        Loading matches...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500">
        {error}
      </div>
    );
  }
 console.log(matches[9]);
  return (
    <div className="p-8">

 <div>
  Total Matches:
  {matches.length}
</div>

<div>
  Live:
  {liveMatches.length}
</div>

<div>
  Upcoming:
  {upcomingMatches.length}
</div>

<div>
  Completed:
  {completedMatches.length}
</div>

    </div>
  );
}