import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const WorkoutDetail = () => {

  const { type } = useParams();

  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    let timer;

    if (running) {
      timer = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);

  }, [running]);

  const workouts = {

    chest: {
      title: "Chest Workout",
      img: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
      exercises: [
        "Bench Press",
        "Incline Dumbbell Press",
        "Push Ups",
        "Cable Fly"
      ],
      video: "https://www.youtube.com/embed/rT7DgCr-3pg"
    },

    back: {
      title: "Back Workout",
      img: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a",
      exercises: [
        "Deadlift",
        "Pull Ups",
        "Barbell Row",
        "Lat Pulldown"
      ],
      video: "https://www.youtube.com/embed/eGo4IYlbE5g"
    },

    leg: {
      title: "Leg Workout",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
      exercises: [
        "Squats",
        "Leg Press",
        "Lunges",
        "Calf Raises"
      ],
      video: "https://www.youtube.com/embed/aclHkVaku9U"
    },

    abs: {
      title: "Abs",
      img: "https://i.pinimg.com/736x/d8/24/e5/d824e5962598662cd8eca74544d1762f.jpg",
      exercises: [
        "Crunch",
        "Leg Raises",
        "Bicycle Crunch",
        "Plank"
      ],
      video: "https://www.youtube.com/embed/v7AYKMP6rOE"
    },

    shoulder: {
      title: "Shoulder Workout",
      img: "https://i.pinimg.com/736x/2a/db/c9/2adbc9932a1757e757dc6a4c855724c9.jpg",
      exercises: [
        "Shoulder Press",
        "Lateral Raises",
        "Arnold Press",
        "Rear Delt Fly"
      ],
      video: "https://www.youtube.com/embed/rT7DgCr-3pg"
    },

    biceps: {
      title: "Biceps Workout",
      img: "https://i.pinimg.com/1200x/09/5b/9a/095b9addbf5a569f3bab49bc596da498.jpg",
      exercises: [
        "Barbell Curl",
        "Dumbbell Curl",
        "Hammer Curl",
        "Concentration Curl"
      ],
      video: "https://www.youtube.com/embed/eGo4IYlbE5g"
    },

    triceps: {
      title: "Triceps Workout",
      img: "https://i.pinimg.com/1200x/3b/43/f9/3b43f963eb4d26622dd66c03c7b7e844.jpg",
      exercises: [
        "Triceps Dips",
        "Close-Grip Bench Press",
        "Overhead Triceps Extension",
        "Triceps Pushdown"
      ],
      video: "https://www.youtube.com/embed/aclHkVaku9U"
    },

    cardio: {
      title: "Cardio Session",
      img: "https://i.pinimg.com/1200x/dd/c4/30/ddc430a348a51bdcfdaeee64aaf3f07b.jpg",
      exercises: [
        "Jump Rope",
        "High Knees",
        "Running",
        "Burpees"
      ],
      video: "https://www.youtube.com/embed/v7AYKMP6rOE"
    }


  };

  const workout = workouts[type];

  return (

    <div style={{ color: "white", padding: "40px", textAlign: "center" }}>

      <h1>{workout.title}</h1>

      {/* IMAGE */}

      <img
        src={workout.img}
        alt="workout"
        style={{ width: "400px", borderRadius: "10px", margin: "20px" }}
      />

      {/* TIMER */}

      <h2>Workout Timer</h2>

      <h3>{seconds} sec</h3>

      <button onClick={() => setRunning(true)}>Start</button>

      <button onClick={() => setRunning(false)}>Pause</button>

      <button onClick={() => setSeconds(0)}>Reset</button>

      {/* EXERCISES */}

      <h2 style={{ marginTop: "40px" }}>Exercises</h2>

      <ul style={{ listStyle: "none" }}>
        {workout.exercises.map((ex, index) => (
          <li key={index} style={{ margin: "10px" }}>
            {ex}

            <button
              onClick={() => setCompleted(completed + 1)}
              style={{ marginLeft: "10px" }}
            >
              Complete Set
            </button>

          </li>
        ))}
      </ul>

      {/* PROGRESS */}

      <h3>Completed Sets: {completed}</h3>

      {/* VIDEO */}

      <h2 style={{ marginTop: "40px" }}>Exercise Video</h2>

      <iframe
        width="400"
        height="220"
        src={workout.video}
        title="Workout Video"
        allowFullScreen
      ></iframe>

    </div>

  );

};

export default WorkoutDetail;