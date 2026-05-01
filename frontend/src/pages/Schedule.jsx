import React from "react";

const Schedule = () => {

  const schedule = [
    { day: "Monday", workout: "Chest" },
    { day: "Tuesday", workout: "Back" },
    { day: "Wednesday", workout: "Legs" },
    { day: "Thursday", workout: "Yoga" },
    { day: "Friday", workout: "Full Body" },
  ];

  return (

    <div style={{ padding: "50px", color: "white", textAlign: "center" }}>

      <h1>Workout Schedule</h1>

      <table style={{ margin: "auto", marginTop: "30px" }}>

        <thead>
          <tr>
            <th style={{ padding: "10px" }}>Day</th>
            <th style={{ padding: "10px" }}>Workout</th>
          </tr>
        </thead>

        <tbody>

          {schedule.map((item, index) => (

            <tr key={index}>
              <td style={{ padding: "10px" }}>{item.day}</td>
              <td style={{ padding: "10px" }}>{item.workout}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default Schedule;