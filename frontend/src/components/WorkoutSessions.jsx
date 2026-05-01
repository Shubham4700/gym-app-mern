import React from "react";
import { useNavigate } from "react-router-dom";
import "./WorkoutSessions.css";

const WorkoutSessions = () => {

  const navigate = useNavigate();

  const handleWorkout = (type) => {
    navigate(`/workout/${type}`);
  };

  return (
    <section id="workout" className="workout-section">

      <div className="workout-section">

      <h1>Workout Sessions</h1>

      <div className="workout-container">

        {/* Chest */}
        <div className="workout-card">
          <img src="https://i.pinimg.com/1200x/7b/43/d8/7b43d89396bca80a2d2e321ed54aa245.jpg" />
          <h3>Chest Workout</h3>
          <button onClick={() => handleWorkout("chest")}>
            Start Workout
          </button>
        </div>

        {/* Back */}
        <div className="workout-card">
          <img src="https://i.pinimg.com/736x/59/23/45/5923450ac33e699e3481c8b8732aa4c8.jpg" />
          <h3>Back Workout</h3>
          <button onClick={() => handleWorkout("back")}>
            Start Workout
          </button>
        </div>

        {/* Leg */}
        <div className="workout-card">
          <img src="https://i.pinimg.com/736x/52/52/6d/52526d679faabb55deb6f56eca8f0638.jpg" />
          <h3>Leg Workout</h3>
          <button onClick={() => handleWorkout("leg")}>
            Start Workout
          </button>
        </div>

        {/* Abs */}
        <div className="workout-card">
          <img src="https://i.pinimg.com/736x/d0/c4/8b/d0c48b6070c7e38b11cfd258ca7b5479.jpg" />
          <h3>Abs Session</h3>
          <button onClick={() => handleWorkout("abs")}>
            Start Workout
          </button>
        </div>


        {/* Shoulder */}
        <div className="workout-card">
          <img src="https://i.pinimg.com/1200x/67/f1/e0/67f1e0e0c0e0f390f329f6200d413458.jpg" />
          <h3>Shoulder Workout</h3>
          <button onClick={() => handleWorkout("shoulder")}>
            Start Workout
          </button>
        </div>

        {/* Biceps */}
        <div className="workout-card">
          <img src="https://i.pinimg.com/736x/5d/e4/c0/5de4c0036db95473ea7a3c2547bebfa0.jpg" />
          <h3>Biceps Workout</h3>
          <button onClick={() => handleWorkout("biceps")}>
            Start Workout
          </button>
        </div>

        {/* triceps */}
        <div className="workout-card">
          <img src="https://i.pinimg.com/736x/9f/dc/84/9fdc84ad7aff298db7c734916dbc2716.jpg" />
          <h3>Triceps Workout</h3>
          <button onClick={() => handleWorkout("triceps")}>
            Start Workout
          </button>
        </div>

        {/* Cardio */}
        <div className="workout-card">
          <img src="https://i.pinimg.com/736x/54/23/3e/54233eddef99d72953fd835ac6b95194.jpg" />
          <h3>Cardio Session</h3>
          <button onClick={() => handleWorkout("cardio")}>
            Start Workout
          </button>
        </div>


      </div>

    </div>

    </section>
    
  );
};

export default WorkoutSessions;