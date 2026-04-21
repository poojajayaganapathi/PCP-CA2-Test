import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Activities from "../pages/Activities.jsx";
import ActivityDetail from "../pages/ActivityDetail.jsx";
import Filter from "../pages/Filter.jsx";
import Stats from "../pages/Stats.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/activities">Activities</NavLink>
        {" | "}
        <NavLink to="/filter">Filter</NavLink>
        {" | "}
        <NavLink to="/stats">Stats</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Activities />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/:id" element={<ActivityDetail />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;