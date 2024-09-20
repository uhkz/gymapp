import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Log = () => {
  const [exerciseName, setExerciseName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [latestLogs, setLatestLogs] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchLatestLogs();
    }
  }, [userId]);

  const fetchLatestLogs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/logs/latestPerExercise/${userId}`
      );
      setLatestLogs(response.data);
    } catch (error) {
      console.error("Error fetching latest logs:", error);
    }
  };

  const handleLogProgress = async () => {
    try {
      const logData = {
        userId,
        exerciseName,
        reps: parseInt(reps),
        weight: parseFloat(weight),
      };

      // Always create a new log entry
      await axios.post("http://localhost:5001/logs", logData);

      // Fetch the latest logs after logging a new entry
      fetchLatestLogs();

      setExerciseName("");
      setReps("");
      setWeight("");
    } catch (error) {
      console.error("Error logging progress:", error);
    }
  };

  const handleLogAgain = (log) => {
    setExerciseName(log.exerciseName);
    setReps("");
    setWeight("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-light text-gray-800 mb-8">Log Progress</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-light text-gray-800 mb-4">New Log</h2>
          <input
            type="text"
            placeholder="Exercise Name"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="number"
            placeholder="Reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleLogProgress}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-300"
          >
            Log
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-light text-gray-800 mb-4">
            Latest Logs
          </h2>
          <ul className="space-y-4">
            {latestLogs.map((log) => (
              <li key={log._id} className="border-b pb-4">
                <p className="text-lg font-semibold">
                  Exercise: {log.exerciseName}
                </p>
                <p className="text-gray-700">Reps: {log.reps}</p>
                <p className="text-gray-700">Weight: {log.weight} kg</p>
                <p className="text-gray-500">
                  Date: {new Date(log.date).toLocaleDateString()}
                </p>
                <button
                  onClick={() => handleLogAgain(log)}
                  className="mt-2 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-300"
                >
                  Log Again
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex space-x-4 mt-8">
        <button
          onClick={() => navigate("/loghistory")}
          className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-300"
        >
          View Log History
        </button>
        <button
          onClick={() => navigate("/home")}
          className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-300"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Log;
