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
