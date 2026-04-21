import React, { createContext, useContext, useReducer, useEffect } from "react";
import { AppReducer, initialState } from "../reducer/AppReducer.jsx";
import { fetchToken, fetchActivities, cleanActivities } from "../services/api.js";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: "SET_LOADING" });
      try {
        const token = await fetchToken();
        const raw = await fetchActivities(token);
        const cleaned = cleanActivities(raw);
        dispatch({ type: "SET_DATA", payload: cleaned });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    };
    loadData();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};