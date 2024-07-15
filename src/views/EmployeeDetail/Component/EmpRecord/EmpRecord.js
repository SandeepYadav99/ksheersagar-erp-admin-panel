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
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { ButtonBase } from "@material-ui/core";


const JobCalendarComponent = ({ id }) => {
  const [events, setEvents] = useState([]);
  const [isApprovalPopUp, setIsApprovalPopUp] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [startDate, setStartDate] = useState("");
 
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

    const req = await serviceGetEmployMonthData({
      employee_id: id,
      month,
      year,
      // start_date,
      // end_date
    });
    const monthData = req?.data?.month_data;
    const holiday = req?.data?.holidays;
    if (!req?.error) {
      const data = [...monthData, ...holiday];
      console.log(data);
      const newEvents = monthData?.map((val) => ({
        start: moment(val.date),
        end: moment(val.date),
        type: val.status,
        title: capitalizeFirstLetter(
          val.status.toLowerCase().replaceAll("_", " ")
        ),
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
          marginTop: "-10px",
          textAlign: "justify",
       
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

  const CustomToolbar = ({ label, onNavigate, onView }) => {
    return (
      <div className={styles.toolWrapper}>
        <div className={styles.upperWrap}>
          <ButtonBase onClick={() => onNavigate("PREV")}>
            <ArrowBackIos fontSize={"small"} className={styles.backIcon} />
          </ButtonBase>
          <span className={styles.label}>{label}</span>
          <ButtonBase onClick={() => onNavigate("NEXT")}>
            <ArrowForwardIos fontSize={"small"} className={styles.backIcon} />
          </ButtonBase>
        </div>
        <div className={styles.subHoliday}>
          <div className={styles.titleIs}>(H)-Holiday</div>
          <div className={styles.titleIs}>(RH)-Restricted Holiday</div>
          <div className={styles.titleIs}>(O)-Optional Holiday</div>
        </div>
      </div>
    );
  };
  return (
    <div className={styles.plainPaper}>
      <div className={styles.holiday}>
        <div>Attendance Record</div>
      </div>
      <div style={{ marginTop: "20px" }} />
      <Calendar
        // views={[Views.MONTH]}
        // components={{
        //   timeSlotWrapper: ColoredDateCellWrapper,
        //   event: CustomEventComponent,
        // }}

        components={{
          toolbar: CustomToolbar,
        }}
        onNavigate={handleNavigation}
        localizer={localizer}
        defaultDate={new Date()}
        eventPropGetter={eventPropGetter}
        defaultView="month"
       
        events={events}
        style={{ padding: "20px", height: "90vh" }}
        onSelectEvent={handleEventClick}
        // date={selectedDate?.$d && selectedDate?.$d}
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
