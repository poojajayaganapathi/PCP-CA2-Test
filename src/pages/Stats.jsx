import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext.jsx";

const Stats = () => {
  const { state } = useAppContext();
  const { activities } = state;

  const totalActivities = activities.length;
  const goalAchievedCount = activities.filter((a) => a.goalAchieved === true).length;
  const goalNotAchievedCount = activities.filter((a) => a.goalAchieved === false).length;

  useEffect(() => {
    window.appState = {
      totalActivities,
      goalAchievedCount,
    };
  }, [activities]);

  return (
    <div style={{ padding: "16px" }}>
      <h1>Stats Dashboard</h1>
      <div data-testid="total-activities">{totalActivities}</div>
      <div data-testid="goal-achieved">{goalAchievedCount}</div>
      <div data-testid="goal-not-achieved">{goalNotAchievedCount}</div>
    </div>
  );
};

export default Stats;