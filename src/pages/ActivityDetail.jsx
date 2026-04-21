import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useAppContext();

  if (state.loading) return <p>Loading...</p>;

  const activity = state.activities.find((a) => a.activityId === id);

  if (!activity) {
    return (
      <div>
        <p>Activity not found</p>
        <button onClick={() => navigate("/activities")}>Go Back</button>
      </div>
    );
  }

  const efficiency = (activity.caloriesBurned / activity.workoutMinutes).toFixed(2);

  return (
    <div style={{ padding: "16px" }}>
      <button onClick={() => navigate("/activities")}>Back</button>
      <h1>{activity.name}</h1>
      <p>Date: {activity.date}</p>
      <p>Steps: {activity.steps}</p>
      <p>Calories Burned: {activity.caloriesBurned}</p>
      <p>Workout Minutes: {activity.workoutMinutes}</p>
      <p>Goal Achieved: {activity.goalAchieved ? "Yes" : "No"}</p>
      <p>Efficiency Score: {efficiency} cal/min</p>
    </div>
  );
};

export default ActivityDetail;