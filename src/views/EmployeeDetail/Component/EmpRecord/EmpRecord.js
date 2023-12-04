import React, { useState, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { serviceGetEmployMonthData } from "../../../../services/Employee.service";
import styles from "./EmpRecord.module.css";
import AddEmployRecord_Dilog from "../AddEmployRecord_Dilog/AddEmployRecord_Dilog";

const allViews = Object.keys(Views).map((k) => Views[k]);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue",
    },
  });

const JobCalendarComponent = ({ id }) => {
  const [events, setEvents] = useState([]);
  const [isApprovalPopUp, setIsApprovalPopUp] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const toggleApprovalDialog = useCallback(
    (obj) => {
      setIsApprovalPopUp((e) => !e);
      if (obj?.id) {
        setFormValue(obj);
      } else {
        setFormValue({});
      }
    },
    [isApprovalPopUp, formValue]
  );

  const getData = async (date = new Date()) => {
    const month = moment(new Date(date)).format("MM");
    const year = moment(new Date(date)).format("YYYY");

    const start_date = moment(date).format("YYYY-MM-DD");
    const end_date = moment(date).format("YYYY-MM-DD");

    const req = await serviceGetEmployMonthData({
      employee_id: id,
      month,
      year,
      // start_date,
      // end_date
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

  const handleSelectSlot = ({ start, end }) => {
    const formattedStartDate = moment(start).format("YYYY-MM-DD");
    const formattedEndDate = moment(end).format("YYYY-MM-DD");

    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);

    getData(start);
  };

  const handleNavigation = (d, c, e, f) => {
    getData(d);
  };


  const eventPropGetter = (e) => {


    if (e.type === "ABSENT") {
      return {
        className: "status_absendt",
        style: {
          backgroundColor: "#FFE4E2",
          color: "#FF493F",
          outline: "none",
          fontSize: "10px",
         textAlign:"bottom",
          padding:"30px"
        },
      };
    } else if (e.type === "PRESENT") {
      return {
        className: "deliverySlot",
        style: {
          backgroundColor: "#EDFCED",
          color: "#0E9717",

          padding:"30px",
          outline: "none",
          fontSize: "10px",
        },
      };
    } else if (e.type === "HALF_DAY") {
      return {
        className: "deliverySlot",
        style: {
          backgroundColor: "#F3EDFE",
          color: "#7848CB",

          padding:"30px",
          outline: "none",
          fontSize: "10px",
        },
      };
    } else if (e.type === "OFF_DUTY") {
      return {
        className: "deliverySlot",
        style: {
          backgroundColor: "#FFE4E2",
          color: "#FF493F",

          padding:"30px",
          outline: "none",
          fontSize: "10px",
        },
      };
    } else if (e.type === "LEAVE") {
      return {
        className: "deliverySlot",
        style: {
          backgroundColor: "#EDFCED",
          color: "#0E9717",

          padding:"30px",
          outline: "none",
          fontSize: "10px",
        },
      };
    } else if (e.type === "Full_Day") {
      return {
        className: "deliverySlot",
        style: {
          backgroundColor: "#FCEDFB",
          color: "#CB48B7",

          padding:"30px",
          outline: "none",
          fontSize: "10px",
        },
      };
    } else if (e.type === "ON_DUTY") {
      return {
        className: "deliverySlot",
        style: {
          backgroundColor: "#EDFCED",
          color: "#0E9717",

          padding:"30px",
          outline: "none",
          fontSize: "10px",
        },
      };
    }else if (e.type === "HOLIDAY") {
      return {
        className: "deliverySlot",
        style: {
          backgroundColor: "#FCFAED",
          color: "#D6B820",

          padding:"30px",
          outline: "none",
          fontSize: "10px",
        },
      };
    }else if (e.type === "WEEKEND") {
      return {
        className: "deliverySlot",
        style: {
          backgroundColor: "#EBFCFC",
          color: "#0D9191",

          padding:"30px",
          outline: "none",
          fontSize: "10px",
        },
      };
    } else if (e.type === "N/A") {
      return {
        className: "deliverySlot",
        style: {
          backgroundColor: "#EEF3FF",
          color: "#919BB0",

          padding:"30px",
          outline: "none",
          fontSize: "10px",
        },

      };
    }
    return {
      style: {
        border: "none",
      },
    };
  };

  useEffect(() => {
    getData();
  }, [id, startDate, endDate]);

  const handleEventClick = () => {
    setIsApprovalPopUp(true);
  };

  const localizer = momentLocalizer(moment);

  const CustomEventComponent = ({ event }) => (
    <div className="custom-event">
      <div className={styles.event_status}>{event.title}</div>
      {/* <div className="event-date">{moment(event.start).format("DD")}</div> */}
    </div>
  );

  return (
    <div className={styles.plainPaper}>
      <div>Attendance Record</div>
      <div style={{ marginTop: "20px" }} />
      <Calendar
        views={[Views.MONTH]}

        components={{
          timeSlotWrapper: ColoredDateCellWrapper,
          event: CustomEventComponent,
        }}
        onNavigate={handleNavigation}
        localizer={localizer}
        defaultDate={new Date()}


        eventPropGetter={eventPropGetter}
        defaultView="month"
        events={events}
        style={{ padding: "20px", height: "90vh"  }}
        onSelectEvent={handleEventClick}
        onSelectSlot={handleSelectSlot}
      />
      <AddEmployRecord_Dilog
        isOpen={isApprovalPopUp}
        handleToggle={toggleApprovalDialog}
        formValue={formValue}
        id={id}
        date={startDate}
      />
    </div>
  );
};

export default JobCalendarComponent;
