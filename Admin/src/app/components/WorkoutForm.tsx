import React from "react";
import { Workout } from "../types/Exercise";

interface Props {
  workout: Workout;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onImageChange: (file: File | null) => void;
}

const WorkoutForm: React.FC<Props> = ({ workout, onChange, onImageChange }) => (
  <div className="space-y-4">
    <input
      type="text"
      name="name"
      placeholder="Workout Name"
      value={workout.name}
      onChange={onChange}
      className="input input-bordered w-full"
    />
    <textarea
      name="description"
      placeholder="Workout Description"
      value={workout.description}
      onChange={onChange}
      rows={4}
      className="textarea textarea-bordered w-full"
    />
    <input
      type="number"
      name="durationInMinutes"
      placeholder="Duration (minutes)"
      value={workout.durationInMinutes}
      onChange={onChange}
      className="input input-bordered w-full"
    />
    <input
      type="file"
      accept="image/*"
      onChange={(e) => onImageChange(e.target.files?.[0] || null)}
    />
  </div>
);

export default WorkoutForm;
