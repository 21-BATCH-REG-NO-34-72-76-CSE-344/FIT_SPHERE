"use client"
import React from 'react'
// import './addworkout.css' 
import { toast } from 'react-toastify'
import { Exercise } from './types/Exercise'

interface Workout {
  name: string;
  description: string;
  durationInMinutes: number;
  exercises: Exercise[]; 
  imageURL: string;
  imageFile: File | null;
}



const page = () => {
  const [workout, setWorkout] = React.useState<Workout>({
    name: '',
    description: '',
    durationInMinutes: 0,
    exercises: [], 
    imageURL: '',
    imageFile: null
  });

  const [exercise, setExercise] = React.useState<Exercise>({ 
    name: '',
    description: '',
    sets: 0,
    reps: 0,
    imageURL: '',
    imageFile: null
  })

  const handleWorkoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value
    })
  }

  const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExercise({
      ...exercise, 
      [e.target.name]: e.target.value
    })
  }
