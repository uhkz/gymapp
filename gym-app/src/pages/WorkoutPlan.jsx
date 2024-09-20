import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WorkoutPlan = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      const userId = localStorage.getItem("userId"); // Replace with actual user ID from auth
      if (!userId) {
        console.error("No user ID found in local storage");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5001/workoutPlans/${userId}`
        );
        setWorkoutPlans(response.data);
      } catch (error) {
        console.error("Error fetching workout plans:", error);
      }
    };

    fetchWorkoutPlans();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/workoutPlans/${id}`);
      setWorkoutPlans(workoutPlans.filter((plan) => plan._id !== id));
    } catch (error) {
      console.error("Error deleting workout plan:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Workout Builder</h1>
        <p className="text-gray-600">
          Create and manage your workout plans. Stay fit and stay healthy!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full">
        {workoutPlans.map((plan) => (
          <div
            key={plan._id}
            className="bg-white p-4 rounded-lg shadow hover:bg-gray-100 cursor-pointer transition-transform transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
            <button
              onClick={() => navigate(`/workoutplan/${plan._id}`)}
              className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300 mb-2"
            >
              View Plan
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center mt-8 space-y-4">
        <button
          onClick={() => navigate("/create-workout-plan")}
          className="bg-green-600 text-white py-2 px-6 rounded-lg text-lg flex items-center justify-center hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          <span className="mr-2 text-2xl">+</span> Create New
        </button>
        <button
          onClick={() => navigate("/home")}
          className="bg-blue-600 text-white py-2 px-8 rounded-lg text-lg flex items-center justify-center hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default WorkoutPlan;
