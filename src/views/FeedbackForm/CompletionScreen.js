import React from "react";
import styles from "./FeedbackForm.module.css";

import ic_Google from "../../assets/img/feedback/feedback.png";
import ic_topnav_logo from "../../assets/img/feedback/ic_topnav_logo.png"
const CompletionScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <img src={ic_topnav_logo} alt="" width={166} height={34} />
        </div>
        <div className={styles.gaps} />
        <div className={styles.ic_Google_img}>
          <img src={ic_Google} alt="" width={221} height={230} />
        </div>
        <div className={styles.title}>Your Feedback has been recorded!</div>
        <div className={styles.subParagraph}>
          We appreciate your feedback, and we're dedicated to providing a better
          experience. Thank you for giving us the opportunity to improve.
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;
