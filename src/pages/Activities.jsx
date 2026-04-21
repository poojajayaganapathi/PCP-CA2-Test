import React from "react";
import { useAppContext } from "../context/AppContext.jsx";
import ActivityCard from "../components/ActivityCard.jsx";

const Activities = () => {
  const { state } = useAppContext();

  if (state.loading) return <p>Loading...</p>;
  if (state.error) return <p>Error: {state.error}</p>;

  const validActivities = state.activities.filter(
    (a) =>
      a.steps > 0 &&
      a.caloriesBurned > 0 &&
      a.workoutMinutes > 0 &&
      typeof a.goalAchieved === "boolean"
  );

  return (
    <div>
      <h1>Activities</h1>
      {validActivities.length === 0 && <p>No valid activities found.</p>}
      {validActivities.map((activity) => (
        <ActivityCard key={activity.activityId} activity={activity} />
      ))}
    </div>
  );
};

export default Activities;