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
 const checkLogin = async () => {

      if (!localStorage.getItem('isLoggedIn')==true) {
        toast.error('Please login first');
        return false;
      }
  }

  const saveWorkout = async () => {
    const isLoggedIn = await checkLogin();
    if (!isLoggedIn) return;

    if (workout.name == '' || workout.description == '' || workout.durationInMinutes == 0 || workout.imageFile == null) { 
      toast.error('Please fill all the workout fields', {
        position: 'top-center',
      })
      return
    }

    if (workout.exercises.length === 0) {
      toast.error('Please add at least one exercise', {
        position: 'top-center',
      })
      return
    }

    try {
   
      if (workout.imageFile) {
        const imageURL = await uploadImage(workout.imageFile);
        if (imageURL) {
          setWorkout({ 
            ...workout,
            imageURL 
          })
        }
      }


      for (let i = 0; i < workout.exercises.length; i++) { 
        let tempImg = workout.exercises[i].imageFile 
        if (tempImg) {
          let imgURL = await uploadImage(tempImg);
          if (imgURL) {
            workout.exercises[i].imageURL = imgURL; 
          }
        }
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/workoutplans/workouts`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workout),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Workout Created successfully', data);
        toast.success('Workout created successfully', {
          position: 'top-center',
        });
