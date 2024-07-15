/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { serviceGetEmployMonthData } from "../../../../services/Employee.service";
import styles from "./EmpRecord.module.css";
import AddEmployRecord_Dilog from "../AddEmployRecord_Dilog/AddEmployRecord_Dilog";
import {
  capitalizeFirstLetter,
  getGetterBgColor,
  getGetterTextColor,
} from "../../../../helper/AttendanceView";

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
  const [currentDate, setCurrentDate] = useState(new Date());

  const toggleApprovalDialog = useCallback(
    (obj) => {
      if (obj?.id) {
        setFormValue(obj);
        setIsApprovalPopUp(true);
      }
    },

    [isApprovalPopUp, formValue]
  );

  const getData = async (date) => {
    // date = new Date()
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
        title: capitalizeFirstLetter(val.status.toLowerCase()),
      }));
      setEvents(newEvents);
    }
  };

  const handleNavigation = useCallback((d, c, e, f) => {
    getData(d);
    setCurrentDate(d);
  }, []);

  const eventPropGetter = useCallback(
    (event) => {
      let backgroundColor = getGetterBgColor(event?.type); 
      let textColor = getGetterTextColor(event?.type);
      return {
        style: {
          backgroundColor: backgroundColor,
          color: textColor,
          outline: "none",
          fontSize: "10px",
          textAlign: "center",
       
        },
      };
    },
    [getGetterBgColor, getGetterTextColor]
  );

  useEffect(() => {
    getData(currentDate);
  }, [id, currentDate]);

  const handleEventClick = useCallback((event) => {
    setIsApprovalPopUp(true);
    setStartDate(moment(event.start).format("YYYY-MM-DD"));
  }, []);

  const handleClose = useCallback(() => {
    setFormValue(null);
    setIsApprovalPopUp(false);
    // window.location.reload();
    getData(startDate);
  }, [startDate]);

  const localizer = momentLocalizer(moment);

  const CustomEventComponent = useCallback(
    ({ event }) => (
      <div className="custom-event">
        <div className={styles.event_status}>
          {event.title.replaceAll("_", " ")}
        </div>
        {/* <div className="event-date">{moment(event.start).format("DD")}</div> */}
      </div>
    ),
    []
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
        popup
        style={{ padding: "20px", height: "90vh" }}
        onSelectEvent={handleEventClick}
      />
      {isApprovalPopUp && (
        <AddEmployRecord_Dilog
          isOpen={isApprovalPopUp}
          handleToggle={toggleApprovalDialog}
          formValue={formValue}
          id={id}
          date={startDate}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default React.memo(JobCalendarComponent);
