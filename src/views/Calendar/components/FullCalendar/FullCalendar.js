import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ButtonBase, Typography } from "@mui/material";
import styles from "./Style.module.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getBgColor, getTextColor } from "../../../../helper/calenderData";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const localizer = momentLocalizer(moment);

const CalendarDetail = ({ data, selectedDate, handleSideToggle }) => {
  const [events, setEvents] = useState([...data]);
  const [activeMonth, setActiveMonth] = useState("month");

  useEffect(() => {
    if (data) {
      const updated = data?.map((item) => {
        return {
          ...item,
          title: item?.name,
          start: new Date(item?.start_date),
          end: new Date(item?.end_date),
        };
      });
      setEvents(updated);
    }
  }, [data]);

  console.log("data21", data);

  const handleEventRemove = (eventToRemove) => {
    if (eventToRemove) {
      handleSideToggle(eventToRemove);
    }
  };
  console.log("events", activeMonth);

  const eventStyleGetter = (event) => {
    let backgroundColor = getBgColor(event?.holiday_type); // Default color
    let textColor = getTextColor(event?.holiday_type);
    return {
      style: {
        backgroundColor: backgroundColor,
        color: textColor,
      },
    };
  };

  const CustomToolbar = ({ label, onNavigate, onView }) => {
    return (
      <div className={styles.toolWrapper}>
        <div className={styles.upperWrap}>
          <ButtonBase onClick={() => onNavigate("PREV")}>
            <ArrowBackIosIcon fontSize={"small"} className={styles.backIcon} />
          </ButtonBase>
          <ButtonBase onClick={() => onNavigate("NEXT")}>
            <ArrowForwardIosIcon
              fontSize={"small"}
              className={styles.backIcon}
            />
          </ButtonBase>
          <span className={styles.label}>{label}</span>
        </div>
        <div>
          <ButtonGroup
            variant="outlined"
            size="large"
            aria-label="Medium-sized button group"
          >
            <Button onClick={() => onView("month")}>
              <Typography variant="body1">MONTH</Typography>
            </Button>
            <Button onClick={() => onView("week")}>
              <Typography variant="body1">WEEK</Typography>
            </Button>
            <Button onClick={() => onView("day")}>
              <Typography variant="body1">DAY</Typography>
            </Button>
            <Button onClick={() => onView("agenda")}>
              <Typography variant="body1">LIST</Typography>
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  };
  const handleSlotSelect = (slotInfo) => {
    const values = {
      start_date: slotInfo?.start,
      end_date: slotInfo?.end,
    };
    handleSideToggle(values);
    // setActiveDate(slotInfo.start); // Update state with selected date
  };
  return (
    <div className={styles.detailWrap}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={handleSlotSelect}
        onSelectEvent={handleEventRemove}
        defaultView="month"
        eventPropGetter={eventStyleGetter}
        popup
        style={{ padding: "10px" }}
        components={{
          toolbar: CustomToolbar,
        }}
        onView={(view) => setActiveMonth(view)}
        date={selectedDate?.$d && selectedDate?.$d}
      />
    </div>
  );
};

export default CalendarDetail;
