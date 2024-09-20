import React, { useEffect, useState } from "react";
import axios from "axios";

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const options = {
        method: "GET",
        url: "https://exercisedb.p.rapidapi.com/exercises",
        headers: {
          "x-rapidapi-key":
            "c62e999a86msh40a9211c351dd1ap1d69fbjsnbad1c56bf642",
          "x-rapidapi-host": "exercisedb.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setExercises(response.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  return (
    <div>
      <h1>Exercise List</h1>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            <h2>{exercise.name}</h2>
            <p>{exercise.bodyPart}</p>
            <p>{exercise.equipment}</p>
            {exercise.gifUrl && (
              <img src={exercise.gifUrl} alt={exercise.name} width="200" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
