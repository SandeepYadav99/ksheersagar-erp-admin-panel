import React, { useCallback } from "react";
import PageBoxComponent from "../../../components/PageBox/PageBox.component";
import { Avatar } from "@material-ui/core";
import styles from "./Style.module.css";

const ShiftDetailView = ({ shiftDays }) => {

  const renderShift = useCallback((shift) => {
    if (shift?.is_week_off && !shift?.is_sunday_occasional_working) {
      return (
        <div className={styles.avatorSubFlex} key={shift?.name}>
          <Avatar className={styles.avator}>
            {shift?.name?.substring(0, 2)}
          </Avatar>
          <div className={styles.title}>Week Off</div>
        </div>
      );
    } else if (shift?.is_sunday_occasional_working && shift?.is_week_off) {
      return (
        <div className={styles.avatorSubFlex} key={shift?.name}>
          <Avatar className={styles.avatorSeletedCircle}>
            {shift?.name?.substring(0, 2)}
          </Avatar>
          <div>
            <div className={styles.title}>
              {shift?.start_time || "N/A"}-{shift?.end_time || "N/A"}
            </div>
            <div className={styles.fontSize}>
              (Occasional Working Days: 1st, 3rd)
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
          <div className={styles.title}>
            {shift?.start_time || "N/A"}-{shift?.end_time || "N/A"}
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
