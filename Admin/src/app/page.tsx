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
 const addExerciseToWorkout = () => { 
    if (exercise.name == '' || exercise.description == '' || exercise.sets == 0 || exercise.imageFile == null) {
      toast.error('Please fill all the fields', {
        position: 'top-center', 
      })
      return
    }
    
  
    setWorkout({
      ...workout,
      exercises: [...workout.exercises, exercise]
    });
    

    setExercise({
      name: '',
      description: '',
      sets: 0,
      reps: 0,
      imageURL: '',
      imageFile: null
    });
  }

  const deleteExerciseFromWorkout = (index: number) => { 
    setWorkout({
      ...workout,
      exercises: workout.exercises.filter((exercise, i) => i !== index) 
    })
  }

  const uploadImage = async (image: File): Promise<string | null> => { 
    const formData = new FormData(); 
    formData.append('myimage', image);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/image-upload/uploadimage`, { 
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.imageURL; 
      }
      return null;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  }
