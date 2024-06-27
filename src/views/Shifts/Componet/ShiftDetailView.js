import React from "react";

import PageBoxComponent from "../../../components/PageBox/PageBox.component";
import { Avatar } from "@material-ui/core";
import styles from "./Style.module.css";
const ShiftDetailView = () => {
  return (
    <PageBoxComponent>
        <div className={styles.container}>Shift Details</div>
      <div className={styles.avatorFlex}>
        <div className={styles.avatorSubFlex}>
          <Avatar className={styles.avator}>Su</Avatar>
           <div className={styles.title}>Week Off</div>
        </div>
        <div className={styles.avatorSubFlex}>
          <Avatar className={styles.avatorSeleted}>Su</Avatar> 
          <div>Week Off</div>
        </div>
        <div className={styles.avatorSubFlex}>
          <Avatar className={styles.avatorSeleted}>Su</Avatar> 
          <div>Week Off</div>
        </div>
        <div className={styles.avatorSubFlex}>
          <Avatar className={styles.avator}>Su</Avatar> 
          <div>Week Off</div>
        </div>
        <div className={styles.avatorSubFlex}>
          <Avatar className={styles.avator}>Su</Avatar> 
          <div>Week Off</div>
        </div>
      </div>
    </PageBoxComponent>
  );
};

export default ShiftDetailView;
