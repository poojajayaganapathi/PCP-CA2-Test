import React from "react";
import { useNavigate } from "react-router-dom";

const ActivityCard = ({ activity }) => {
  const navigate = useNavigate();

  return (
    <div
      data-testid="activity-item"
      onClick={() => navigate(`/activities/${activity.activityId}`)}
      style={{ cursor: "pointer", border: "1px solid #ccc", margin: "8px", padding: "12px", borderRadius: "8px" }}
    >
      <h3>{activity.name}</h3>
      <p>Date: {activity.date}</p>
      <p>Steps: {activity.steps}</p>
      <p>Calories Burned: {activity.caloriesBurned}</p>
      <p>Workout Minutes: {activity.workoutMinutes}</p>
      <p>Goal Achieved: {activity.goalAchieved ? "Yes" : "No"}</p>
    </div>
  );
};

export default ActivityCard;