import React from "react";
import { Exercise } from "../types/Exercise";

interface Props {
  exercise: Exercise;
  onDelete: () => void;
}

const ExerciseCard: React.FC<Props> = ({ exercise, onDelete }) => (
  <div className="border p-4 rounded-md shadow-md flex flex-col sm:flex-row justify-between items-center">
    <div>
      <h4 className="text-lg font-semibold">{exercise.name}</h4>
      <p>{exercise.description}</p>
      <p>Sets: {exercise.sets} | Reps: {exercise.reps}</p>
    </div>
    {exercise.imageFile || exercise.imageURL ? (
      <img
        src={exercise.imageFile ? URL.createObjectURL(exercise.imageFile) : exercise.imageURL}
        alt={exercise.name}
        className="w-24 h-24 object-cover rounded mt-2 sm:mt-0"
      />
    ) : null}
    <button onClick={onDelete} className="btn btn-error ml-4">
      Delete
    </button>
  </div>
);

export default ExerciseCard;
