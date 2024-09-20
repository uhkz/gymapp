import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LogHistory = () => {
  const [logs, setLogs] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchLogs();
    } else {
      console.error("No user ID found in local storage");
    }
  }, [userId]);

  const fetchLogs = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/logs/${userId}`);
      console.log("Fetched logs:", response.data); // Debugging statement
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const handleDeleteLogs = async () => {
    try {
      await axios.delete(
        `http://localhost:5001/logs/delete/${userId}/${exerciseToDelete}`
      );
      setLogs(logs.filter((log) => log.exerciseName !== exerciseToDelete));
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting logs:", error);
    }
  };

  const groupLogsByExercise = (logs) => {
    const groupedLogs = logs.reduce((acc, log) => {
      if (!acc[log.exerciseName]) {
        acc[log.exerciseName] = [];
      }
      acc[log.exerciseName].push({
        date: new Date(log.date).toLocaleDateString(),
        reps: log.reps,
        weight: log.weight,
      });
      return acc;
    }, {});

    return Object.entries(groupedLogs).map(([exerciseName, data]) => ({
      exerciseName,
      data,
    }));
  };

  const groupedLogs = groupLogsByExercise(logs);

  const confirmDelete = (exerciseName) => {
    setExerciseToDelete(exerciseName);
    setShowDeleteConfirmation(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-light text-gray-800 mb-8">Log History</h1>
      <button
        onClick={() => navigate("/log")}
        className="mb-8 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-300"
      >
        Back to Log Progress
      </button>
      {groupedLogs.length === 0 ? (
        <p className="text-gray-600">No logs available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-5xl">
          {groupedLogs.map((log, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 w-full"
            >
              <h2 className="text-xl font-semibold mb-2">{log.exerciseName}</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={log.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="reps"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="weight" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
              <button
                onClick={() => confirmDelete(log.exerciseName)}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition-colors duration-300 mt-4"
              >
                Delete Logs
              </button>
            </div>
          ))}
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete all logs for {exerciseToDelete}?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-300 mr-4"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteLogs}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogHistory;
