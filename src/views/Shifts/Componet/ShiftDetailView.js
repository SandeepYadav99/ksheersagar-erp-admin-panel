import React, { useCallback } from "react";
import PageBoxComponent from "../../../components/PageBox/PageBox.component";
import { Avatar } from "@material-ui/core";
import styles from "./Style.module.css";
import { getWorkingDays } from "../../../helper/helper";

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  let hours = date.getUTCHours();
  const minutes = ("0" + date.getUTCMinutes()).slice(-2);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  const formattedHours = ("0" + hours).slice(-2);
  return `${formattedHours}:${minutes} ${ampm}`;
};

const ShiftDetailView = ({ shiftDays }) => {

  const renderShift = useCallback((shift) => {
    const endTime = shift?.end_time ? formatTime(shift?.end_time) : "N/A";
    const startTime = shift?.start_time ? formatTime(shift?.start_time) : "N/A";
    
    if (shift?.is_week_off && !shift?.is_occasional_working) {
      return (
        <div className={styles.avatorSubFlex} key={shift?.name}>
          <Avatar className={styles.avator}>
            {shift?.name?.substring(0, 2)}
          </Avatar>
          <div className={styles.title}>Week Off</div>
        </div>
      );
    } else if (shift?.is_occasional_working && shift?.is_week_off) {
      return (
        <div className={styles.avatorSubFlex} key={shift?.name}>
          <Avatar className={styles.avatorSeletedCircle}>
            {shift?.name?.substring(0, 2)}
          </Avatar>
          <div>
            <div className={styles.titleTime}>
              {startTime} - {endTime}
            </div>
            <div className={styles.fontSize}>
              (Occasional Working Days: {shift?.occasional_working_days?.map((res, i, arr)=><span>{getWorkingDays[res]}{i !== (arr.length-1) ? ', ' : ''}</span>)})
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.avatorSubFlex} key={shift?.name}>
          <Avatar className={styles.avatorSeleted}>
            {shift?.name?.substring(0, 2)}
          </Avatar>
          <div className={styles.titleTime}>
          {startTime} - {endTime}
          </div>
        </div>
      );
    }
  }, []);

  return (
    <PageBoxComponent>
      <div className={styles.container}>Shift Details</div>
      <div className={styles.avatorFlex}>
        {shiftDays?.map(renderShift)}
      </div>
    </PageBoxComponent>
  );
};

export default React.memo(ShiftDetailView);
