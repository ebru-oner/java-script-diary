import React from "react";
import Calendar from "react-calendar";
import styles from "@/styles/general-styles.module.css";

const CalendarComponent = ({ onClick }) => {
  const currentDate = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const isToday = (date) =>
    date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();

  const handleDaySelection = (value, event) => {
    event.preventDefault();
    onClick(`${value.getMonth() + 1}_${value.getDate()}_${value.getFullYear()}`);
  };

  return (
    <div className={styles.calendarGrid}>
      {months.map((month, index) => (
        <div className={styles.calendarSquare} key={index}>
          <h2>{month}</h2>
          <Calendar
            showNavigation={false}
            value={new Date(currentDate.getFullYear(), index, 1)}
            tileClassName={({ date }) => (isToday(date) ? styles.todayButton : styles.dayButton)}
            selectRange={false}
            onClickDay={handleDaySelection}
          />
        </div>
      ))}
    </div>
  );
};

export default CalendarComponent;
