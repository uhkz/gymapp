import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const WorkoutPlanDetail = () => {
  const { id } = useParams();
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [completedExercises, setCompletedExercises] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/workoutPlans/plan/${id}`
        );
        setWorkoutPlan(response.data);
      } catch (error) {
        console.error("Error fetching workout plan:", error);
      }
    };

    fetchWorkoutPlan();
  }, [id]);

  const handleRemoveWorkout = async (exerciseId) => {
    try {
      await axios.put(
        `http://localhost:5001/workoutPlans/remove-exercise/${id}`,
        {
          exerciseId,
        }
      );
      setWorkoutPlan((prevPlan) => ({
        ...prevPlan,
        exercises: prevPlan.exercises.filter((ex) => ex.id !== exerciseId),
      }));
    } catch (error) {
      console.error("Error removing exercise:", error);
    }
  };

  const handleDeleteWorkoutPlan = async () => {
    try {
      await axios.delete(`http://localhost:5001/workoutPlans/${id}`);
      navigate("/workoutplan");
    } catch (error) {
      console.error("Error deleting workout plan:", error);
    }
  };

  const handleToggleExercise = (exerciseId) => {
    setCompletedExercises((prev) =>
      prev.includes(exerciseId)
        ? prev.filter((id) => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  if (!workoutPlan) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{workoutPlan.name}</h1>
        <p className="text-gray-600">Your personalized workout plan</p>
      </div>
      <div className="w-full max-w-5xl">
        <ul className="space-y-4">
          {workoutPlan.exercises.map((exercise) => (
            <li
              key={exercise.id}
              className={`flex items-center justify-between p-4 border border-gray-400 rounded bg-white shadow ${
                completedExercises.includes(exercise.id) ? "bg-green-100" : ""
              }`}
            >
              <div className="flex items-center">
                {exercise.gifUrl && (
                  <img
                    src={exercise.gifUrl}
                    alt={exercise.name}
                    className="w-16 h-16 mr-4"
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold">{exercise.name}</h2>
                  <p className="text-gray-600">
                    Body Part: {exercise.bodyPart}
                  </p>
                  <p className="text-gray-600">
                    Equipment: {exercise.equipment}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleToggleExercise(exercise.id)}
                  className={`py-2 px-4 rounded ${
                    completedExercises.includes(exercise.id)
                      ? "bg-gray-400 text-white"
                      : "bg-green-600 text-white hover:bg-green-800"
                  }`}
                >
                  {completedExercises.includes(exercise.id)
                    ? "Done"
                    : "Mark as Done"}
                </button>
                <button
                  onClick={() => handleRemoveWorkout(exercise.id)}
                  className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex space-x-4 mt-8">
        <button
          onClick={() => navigate("/workoutplan")}
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
        >
          Go back
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800"
        >
          Delete Workout Plan
        </button>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">
              Are you sure you want to delete this workout plan?
            </h2>
            <div className="flex space-x-4">
              <button
                onClick={handleDeleteWorkoutPlan}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlanDetail;
