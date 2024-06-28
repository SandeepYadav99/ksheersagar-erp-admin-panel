import React from "react";
import styles from "./Style.module.css"

const WeekSection = () => {
  return (
    <div className={styles.mainContainer}>
      {" "}
      <div className={styles.radioFlex}>
      <div className={styles.radioButtonUnSelected}/>
        <div className={styles.fontSize}>Week off</div>
      </div>
     <div className={styles.radioFlex}>
        <div className={styles.radioButtonUnCircle}/>
        <div className={styles.fontSize}>Occasional Working</div>
      </div>
      <div className={styles.radioFlex}>
        <div className={styles.radioButtonSelected}/>
        <div className={styles.fontSize}>Working Day</div>
      </div> 
    
    </div>
  );
};

export default WeekSection;
