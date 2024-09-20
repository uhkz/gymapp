// src/App.jsx

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WorkoutPlan from "./pages/WorkoutPlan";
import CreateWorkoutPlan from "./pages/CreateWorkoutPlan";
import WorkoutPlanDetail from "./pages/WorkoutPlanDetail";
import Log from "./pages/Log";
import LogHistory from "./pages/LogHistory";
import Profile from "./pages/Profile";
import Header from "./components/layout/Header";
import PrivateRoute from "./components/PrivateRoute";
import { useUser } from "./components/userFunctions.js";

const App = () => {
  const { user, handleLogin } = useUser();
  const location = useLocation();

  const showHeader = !["/", "/register"].includes(location.pathname);

  return (
    <>
      {showHeader && user && <Header user={user} />}
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/workoutplan"
          element={
            <PrivateRoute>
              <WorkoutPlan />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-workout-plan"
          element={
            <PrivateRoute>
              <CreateWorkoutPlan />
            </PrivateRoute>
          }
        />
        <Route
          path="/workoutplan/:id"
          element={
            <PrivateRoute>
              <WorkoutPlanDetail />
            </PrivateRoute>
          }
        />
        <Route path="/log" element={<Log />} />
        <Route path="/loghistory" element={<LogHistory />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
