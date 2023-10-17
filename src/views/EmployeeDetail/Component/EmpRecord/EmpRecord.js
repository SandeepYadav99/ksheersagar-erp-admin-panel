import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { serviceGetEmployMonthData } from "../../../../services/Employee.service";
import styles from "./EmpRecord.module.css";

const allViews = Object.keys(Views).map((k) => Views[k]);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue",
    },
  });

const JobCalendarComponent = ({ id }) => {
  const [events, setEvents] = useState([]);

  const getData = async (date = new Date()) => {
    const month = moment(new Date(date)).format("MM");
    const year = moment(new Date(date)).format("YYYY");
    const req = await serviceGetEmployMonthData({
      employee_id: id,
      month,
      year,
    });
    if (!req?.error) {
      const data = req.data.month_data;
      const newEvents = data?.map((val) => ({
        start: moment(val.date),
        end: moment(val.date),
        type: val.status,
        title: val.status,
      }));
      setEvents(newEvents);
    }
  };

  const handleNavigation = (d, c, e, f) => {
    getData(d);
  };

  const eventPropGetter = (e) => {
    if (e.type === "ABSENT") {
      return {
        className: "status_absendt",
        style: {
          backgroundColor: "#FCE6FE",
          color: "#8E0E97",
          fontSize: "10px",
          border: "none"
        },
      };
    } else if (e.type === "PRESENT") {
      return {
        className: "deliverySlot",
        style: {
          backgroundColor: "#EDFCED",
          color: "#0E9717",
          fontSize: "10px",
          border: "none"
        },
      };
    }
    return {};
  };

  useEffect(() => {
    getData();
  }, [id]);

  const localizer = momentLocalizer(moment);

  return (
    <div className={styles.plainPaper}>
      <div>Attendance Record</div>
      <div style={{ marginTop: "20px" }} />
      <Calendar
        views={[Views.MONTH]}
        components={{
          timeSlotWrapper: ColoredDateCellWrapper,
        }}
        onNavigate={handleNavigation}
        localizer={localizer}
        defaultDate={new Date()}
        eventPropGetter={eventPropGetter}
        defaultView="month"
        events={events}
        style={{ padding: "20px", height: "90vh" }}
      />
    </div>
  );
};

export default JobCalendarComponent;
