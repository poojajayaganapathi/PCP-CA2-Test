import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

export const fetchToken = async () => {
  const res = await axios.post(`${BASE_URL}/public/token`, {
    studentId: "E0323007",
    password: "196729",
  });
  return res.data.token;
};

export const fetchActivities = async (token) => {
  const res = await axios.get(`${BASE_URL}/private/data`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const raw = res.data;
  if (Array.isArray(raw)) return raw;
  if (raw.activities) return raw.activities;
  if (raw.data) return raw.data;
  return [];
};

export const cleanActivities = (rawData) => {
  if (!Array.isArray(rawData)) return [];
  const seenIds = new Set();

  return rawData
    .filter((item) => {
      if (!item || typeof item !== "object") return false;
      if (item.activityId === null || item.activityId === undefined || item.activityId === "") return false;
      if (seenIds.has(String(item.activityId))) return false;
      seenIds.add(String(item.activityId));
      if (isNaN(Number(item.steps)) || Number(item.steps) <= 0) return false;
      if (isNaN(Number(item.caloriesBurned)) || Number(item.caloriesBurned) <= 0) return false;
      if (isNaN(Number(item.workoutMinutes)) || Number(item.workoutMinutes) <= 0) return false;
      if (typeof item.goalAchieved !== "boolean") return false;
      return true;
    })
    .map((item) => ({
      activityId: String(item.activityId),
      name:
        item.name && String(item.name).trim() !== ""
          ? String(item.name).trim()
          : "Unknown",
      steps: Number(item.steps),
      caloriesBurned: Number(item.caloriesBurned),
      workoutMinutes: Number(item.workoutMinutes),
      goalAchieved: item.goalAchieved,
      date:
        item.date && String(item.date).trim() !== ""
          ? String(item.date).trim()
          : "No Date",
    }));
};