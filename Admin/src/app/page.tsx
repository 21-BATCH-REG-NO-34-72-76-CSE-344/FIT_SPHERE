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
   setWorkout({
          name: '',
          description: '',
          durationInMinutes: 0,
          exercises: [],
          imageURL: '',
          imageFile: null
        });
      } else {
        toast.error('Failed to create workout');
      }
    } catch (error) {
      console.error('Error saving workout:', error);
      toast.error('Failed to create workout');
    }
  }

  return (
    <div className='formpage'>
      <h1 className='title'>Add Workout</h1> 
      
      <input
        type='text'
        placeholder='Workout Name'
        name='name'
        value={workout.name}
        onChange={handleWorkoutChange}
      />
      
      <textarea
        placeholder='Workout Description'
        name='description'
        value={workout.description}
        onChange={(e) => {
          setWorkout({
            ...workout,
            description: e.target.value
          })
        }}
        rows={5}
        cols={50}
      />
      
      <label htmlFor='durationInMinutes'>Duration in Minutes</label>
      <input 
        type='number'
        placeholder='Workout Duration'
        name='durationInMinutes' 
        value={workout.durationInMinutes}
        onChange={handleWorkoutChange}
      />

      <input
        type='file'
        placeholder='Workout Image'
        name='workoutImage'
        onChange={(e) =>
          setWorkout({
            ...workout,
            imageFile: e.target.files![0]
          })
        }
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px' 
        }}
      >
        <h2 className='title'>Add Exercise to Workout</h2> 
        
        <input
          type='text'
          placeholder='Exercise Name'
          name='name'
          value={exercise.name}
          onChange={handleExerciseChange}
        />
       <textarea
          placeholder='Exercise Description'
          name='description'
          value={exercise.description}
          onChange={(e) => {
            setExercise({
              ...exercise,
              description: e.target.value
            })
          }}
          rows={3}
          cols={50}
        />
        
        <label htmlFor="sets">Sets</label>
        <input
          type='number'
          placeholder='Sets'
          name='sets'
          value={exercise.sets}
          onChange={handleExerciseChange}
        />
        
        <label htmlFor='reps'>Reps</label>
        <input
          type='number'
          placeholder='Reps'
          name='reps'
          value={exercise.reps}
          onChange={handleExerciseChange}
        />
        
        <input
          type='file'
          placeholder='Exercise Image'
          name='exerciseImage' 
          onChange={(e) => {
            setExercise({
              ...exercise, 
              imageFile: e.target.files![0]
            })
          }}
        />

        <button
          onClick={addExerciseToWorkout}
        >
          Add Exercise
        </button>

        <div className='exercises'> {}
          <h1 className='title'>Exercises</h1>
          {
            workout.exercises.map((exercise, index) => ( 
              <div className='exercise' key={index}> {}
                <h2>{exercise.name}</h2>
                <p>{exercise.description}</p>
                <p>Sets: {exercise.sets}</p> {}
                <p>Reps: {exercise.reps}</p>
                <img src={
                  exercise.imageFile ?
                    URL.createObjectURL(exercise.imageFile) :
                    exercise.imageURL
                } alt={exercise.name} />
                <button
                  onClick={() => deleteExerciseFromWorkout(index)} 
                >
                  Delete
                </button>
              </div>
            ))
          }
        </div>

        <button
          onClick={saveWorkout} 
        >
          Save Workout {}
        </button>
      </div>
    </div>
  )
}

export default page
