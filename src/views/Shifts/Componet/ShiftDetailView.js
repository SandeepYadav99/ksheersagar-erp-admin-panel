import React, { useCallback } from "react";
import PageBoxComponent from "../../../components/PageBox/PageBox.component";
import { Avatar } from "@material-ui/core";
import styles from "./Style.module.css";
import { getWorkingDays } from "../../../helper/helper";

const ShiftDetailView = ({ shiftDays }) => {
  const renderShift = useCallback((shift) => {
    
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
              {shift?.startDateText} - {shift?.endDateText}
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
          {shift?.startDateText} - {shift?.endDateText}
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
