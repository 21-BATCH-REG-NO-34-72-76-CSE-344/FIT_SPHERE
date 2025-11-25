import React from "react";
import { Exercise } from "../types/Exercise";

interface Props {
  exercise: Exercise;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onImageChange: (file: File | null) => void;
  onAdd: () => void;
}

const ExerciseForm: React.FC<Props> = ({ exercise, onChange, onImageChange, onAdd }) => (
  <div className="space-y-3">
    <input
      type="text"
      name="name"
      placeholder="Exercise Name"
      value={exercise.name}
      onChange={onChange}
      className="input input-bordered w-full"
    />
    <textarea
      name="description"
      placeholder="Exercise Description"
      value={exercise.description}
      onChange={onChange}
      rows={3}
      className="textarea textarea-bordered w-full"
    />
    <div className="grid grid-cols-2 gap-4">
      <input
        type="number"
        name="sets"
        placeholder="Sets"
        value={exercise.sets}
        onChange={onChange}
        className="input input-bordered"
      />
      <input
        type="number"
        name="reps"
        placeholder="Reps"
        value={exercise.reps}
        onChange={onChange}
        className="input input-bordered"
      />
    </div>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => onImageChange(e.target.files?.[0] || null)}
    />
    <button onClick={onAdd} className="btn btn-primary mt-2">
      Add Exercise
    </button>
  </div>
);

export default ExerciseForm;
