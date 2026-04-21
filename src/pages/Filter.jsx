import React, { useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import ActivityCard from "../components/ActivityCard.jsx";

const Filter = () => {
  const { state } = useAppContext();
  const [inputValue, setInputValue] = useState("");
  const [filterError, setFilterError] = useState("");

  const validActivities = state.activities.filter(
    (a) =>
      a.steps > 0 &&
      a.caloriesBurned > 0 &&
      a.workoutMinutes > 0 &&
      typeof a.goalAchieved === "boolean"
  );

  const handleChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    if (val === "") {
      setFilterError("Please enter a value");
    } else if (isNaN(Number(val)) || Number(val) < 0) {
      setFilterError("Please enter a valid positive number");
    } else {
      setFilterError("");
    }
  };

  const filtered =
    inputValue !== "" && filterError === ""
      ? validActivities.filter((a) => a.steps >= Number(inputValue))
      : [];

  return (
    <div style={{ padding: "16px" }}>
      <h1>Filter Activities</h1>

      <input
        data-testid="filter-input"
        type="number"
        placeholder="Enter minimum steps"
        value={inputValue}
        onChange={handleChange}
      />

      {filterError && <p style={{ color: "red" }}>{filterError}</p>}

      {inputValue !== "" && filterError === "" && (
        <div>
          <p>{filtered.length} activities found</p>
          {filtered.map((activity) => (
            <ActivityCard key={activity.activityId} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;