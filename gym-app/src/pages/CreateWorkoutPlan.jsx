import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateWorkoutPlan = () => {
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchExercisesByName = async (term) => {
    try {
      const response = await axios.get(
        `https://exercisedb.p.rapidapi.com/exercises/name/${term}`,
        {
          headers: {
            "x-rapidapi-key":
              "c62e999a86msh40a9211c351dd1ap1d69fbjsnbad1c56bf642",
            "x-rapidapi-host": "exercisedb.p.rapidapi.com",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching exercises by name:", error);
      return [];
    }
  };

  const fetchExercisesByBodyPart = async (term) => {
    try {
      const response = await axios.get(
        `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${term}`,
        {
          headers: {
            "x-rapidapi-key":
              "c62e999a86msh40a9211c351dd1ap1d69fbjsnbad1c56bf642",
            "x-rapidapi-host": "exercisedb.p.rapidapi.com",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching exercises by body part:", error);
      return [];
    }
  };

  const fetchExercisesByTarget = async (term) => {
    try {
      const response = await axios.get(
        `https://exercisedb.p.rapidapi.com/exercises/target/${term}`,
        {
          headers: {
            "x-rapidapi-key":
              "c62e999a86msh40a9211c351dd1ap1d69fbjsnbad1c56bf642",
            "x-rapidapi-host": "exercisedb.p.rapidapi.com",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching exercises by target:", error);
      return [];
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      console.log("Empty search term");
      return;
    }

    setLoading(true);
    console.log("Search term:", searchTerm);
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const exercisesByName = await fetchExercisesByName(lowerCaseSearchTerm);
    const exercisesByBodyPart = await fetchExercisesByBodyPart(
      lowerCaseSearchTerm
    );
    const exercisesByTarget = await fetchExercisesByTarget(lowerCaseSearchTerm);

    // Merge and remove duplicates
    const allExercises = [
      ...exercisesByName,
      ...exercisesByBodyPart,
      ...exercisesByTarget,
    ];
    const uniqueExercises = Array.from(
      new Set(allExercises.map((e) => e.id))
    ).map((id) => {
      return allExercises.find((e) => e.id === id);
    });

    console.log("Filtered exercises:", uniqueExercises);
    setExercises(uniqueExercises);
    setLoading(false);
  };

  const handleAddExercise = (exercise) => {
    if (!selectedExercises.some((e) => e.id === exercise.id)) {
      setSelectedExercises([...selectedExercises, exercise]);
      setExercises(exercises.filter((e) => e.id !== exercise.id));
    }
  };

  const handleRemoveExercise = (exercise) => {
    setSelectedExercises(selectedExercises.filter((e) => e.id !== exercise.id));
    setExercises([...exercises, exercise]);
  };

  const handleCreatePlan = async () => {
    const userId = localStorage.getItem("userId"); // Replace with actual user ID from auth
    if (!userId) {
      console.error("No user ID found in local storage");
      return;
    }
    try {
      await axios.post("http://localhost:5001/workoutPlans", {
        name,
        exercises: selectedExercises,
        userId,
      });
      navigate("/workoutplan");
    } catch (error) {
      console.error("Error creating workout plan:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Create Workout Plan</h1>
        <p className="text-gray-600">
          Name your workout plan and search for exercises to add.
        </p>
      </div>
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <input
            type="text"
            placeholder="Name your workout plan"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 p-2 border border-gray-400 rounded w-full"
          />
          <input
            type="text"
            placeholder="Search for exercises"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 p-2 border border-gray-400 rounded w-full"
          />
          <button
            onClick={handleSearch}
            className="mb-6 bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition-colors duration-300"
          >
            Search
          </button>
          {loading && <div className="text-center mb-6">Loading...</div>}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            <ul className="space-y-4">
              {exercises.map((exercise) => (
                <li
                  key={exercise.id}
                  className="flex items-center justify-between p-4 border border-gray-400 rounded bg-white shadow"
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
                      <p className="text-gray-600">Target: {exercise.target}</p>
                      {exercise.secondaryMuscles && (
                        <p className="text-gray-600">
                          Secondary Muscles:{" "}
                          {exercise.secondaryMuscles.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddExercise(exercise)}
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Selected Exercises</h2>
          <ul className="space-y-4 mb-6">
            {selectedExercises.map((exercise, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-4 border border-gray-400 rounded bg-white shadow"
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
                    <p className="text-gray-600">Target: {exercise.target}</p>
                    {exercise.secondaryMuscles && (
                      <p className="text-gray-600">
                        Secondary Muscles:{" "}
                        {exercise.secondaryMuscles.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveExercise(exercise)}
                  className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors duration-300"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-between">
            <button
              onClick={handleCreatePlan}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
            >
              Save
            </button>
            <button
              onClick={() => navigate("/workoutplan")}
              className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-300"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkoutPlan;
