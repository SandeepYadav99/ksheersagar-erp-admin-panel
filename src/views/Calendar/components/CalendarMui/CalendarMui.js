import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import styles from "./Style.module.css";

function CalendarMui({ selectedDate, handleDateChange }) {
  console.log("selectedDate", selectedDate);
  return (
    <div className={styles.calWrapper}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        className={styles.calContainer}
      >
        <div>
          <DateCalendar
            showDaysOutsideCurrentMonth
            fixedWeekNumber={6}
            className="custom-date-calendar"
            value={selectedDate}
            onChange={handleDateChange}
            format={"dd-MM-yyyy"}
          />
        </div>
      </LocalizationProvider>
    </div>
  );
}

export default CalendarMui;
