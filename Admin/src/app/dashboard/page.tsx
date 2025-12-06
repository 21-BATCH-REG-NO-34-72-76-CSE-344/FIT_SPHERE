"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Exercise, Workout } from "../types/Exercise";
import WorkoutForm from "../components/WorkoutForm";
import ExerciseForm from "../components/ExerciseForm";
import ExerciseList from "../components/ExerciseList";
import { useRouter } from "next/navigation";

const AddWorkoutPage: React.FC = () => {

  const router =useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [workout, setWorkout] = useState<Workout>({
    name: "",
    description: "",
    durationInMinutes: 0,
    exercises: [],
    imageURL: "",
    imageFile: null,
  });

  const [exercise, setExercise] = useState<Exercise>({
    name: "",
    description: "",
    sets: 0,
    reps: 0,
    imageURL: "",
    imageFile: null,
  });

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    console.log(loggedIn)
    if (!loggedIn){
      toast.error("Please login first");
      router.push('/adminauth/login')
    }
    setIsLoggedIn(loggedIn);
  }, []);

  const handleWorkoutChange = (e: React.ChangeEvent<any>) => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const handleExerciseChange = (e: React.ChangeEvent<any>) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const uploadImage = async (image: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("myimage", image);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/image-upload/uploadimage`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data.imageURL || null;
    } catch (e) {
      toast.error("Image upload failed");
      return null;
    }
  };
 const addExerciseToWorkout = () => {
    if (!exercise.name || !exercise.description || !exercise.imageFile || exercise.sets <= 0 || exercise.reps <= 0) {
      toast.error("Fill all exercise fields");
      return;
    }
    setWorkout({ ...workout, exercises: [...workout.exercises, exercise] });
    setExercise({ name: "", description: "", sets: 0, reps: 0, imageURL: "", imageFile: null });
  };

  const deleteExerciseFromWorkout = (index: number) => {
    setWorkout({ ...workout, exercises: workout.exercises.filter((_, i) => i !== index) });
  };

  const saveWorkout = async () => {
    if (!isLoggedIn || !workout.name || !workout.description || !workout.durationInMinutes || !workout.imageFile) {
      toast.error("Complete workout fields first");
      return;
    }
    if (workout.exercises.length === 0) {
      toast.error("Add at least one exercise");
      return;
    }

    const imageURL = await uploadImage(workout.imageFile);
    const exercises = await Promise.all(
      workout.exercises.map(async (ex) => ({
        ...ex,
        imageURL: ex.imageFile ? (await uploadImage(ex.imageFile)) || "" : "",
      }))
    );

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ ...workout, imageURL, exercises }),
    });

    if (response.ok) {
      toast.success("Workout saved!");
      setWorkout({ name: "", description: "", durationInMinutes: 0, exercises: [], imageURL: "", imageFile: null });
    } else {
      toast.error("Failed to save workout");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Workout</h1>
      <WorkoutForm
        workout={workout}
        onChange={handleWorkoutChange}
        onImageChange={(file) => setWorkout({ ...workout, imageFile: file })}
      />

      <hr className="my-8" />

      <ExerciseForm
        exercise={exercise}
        onChange={handleExerciseChange}
        onImageChange={(file) => setExercise({ ...exercise, imageFile: file })}
        onAdd={addExerciseToWorkout}
      />

      <div className="my-8">
        <ExerciseList exercises={workout.exercises} onDelete={deleteExerciseFromWorkout} />
      </div>

      <button className="btn btn-success w-full mt-6" onClick={saveWorkout}>
        Save Workout
      </button>
    </div>
  );
};

export default AddWorkoutPage;
