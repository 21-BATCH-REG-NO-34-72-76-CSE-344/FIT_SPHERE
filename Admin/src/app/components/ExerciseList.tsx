import React from "react";
import { Exercise } from "../types/Exercise";
import ExerciseCard from "./ExerciseCard";

interface Props {
  exercises: Exercise[];
  onDelete: (index: number) => void;
}

const ExerciseList: React.FC<Props> = ({ exercises, onDelete }) => (
  <div className="space-y-4">
    {exercises.map((ex, idx) => (
      <ExerciseCard key={idx} exercise={ex} onDelete={() => onDelete(idx)} />
    ))}
  </div>
);

export default ExerciseList;
