import React from "react";
import styles from "./FeedbackForm.module.css";

import ic_Google from "../../assets/img/feedback/feedback.png";
import ic_topnav_logo from "../../assets/img/feedback/ic_topnav_logo.png"
import { useLocation } from "react-router-dom";
import useFeedBackHook from "./FeedBackHook";
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
const CompletionScreen = () => {
  const { language , handleClos} = useFeedBackHook();
  const location = useLocation();
 
  const { lng, rating } = location.state;

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
      <div className={styles.closeIconAction}>
            <IconButton onClick={handleClos}>
              <Close fontSize="small" />
            </IconButton>
            </div>
        <div className={styles.logoCompleteion}>
          <img src={ic_topnav_logo} alt="" width={166} height={34} />
         
        </div>
        <div className={styles.gapsThank} />
        <div className={styles.ic_Google_img}>
          <img src={ic_Google} alt="" width={221} height={230} />
        </div>
        <div className={styles.gapsThank1} />
        <div className={styles.title}>  {language === lng ? "Your Feedback has been recorded!" : "आपकी प्रतिक्रिया दर्ज कर ली गई है!"}</div>
        <div className={styles.subParagraph}>
        {language === lng ?
          "We appreciate your feedback, and we're dedicated to providing a better experience. Thank you for giving us the opportunity to improve. ": "हम आपकी प्रतिक्रिया की सराहना करते हैं, और हम बेहतर प्रदान करने के लिए समर्पित हैं अनुभव। हमें सुधार करने का अवसर देने के लिए धन्यवाद।" }
        </div>
        <div className={styles.gapsThank2} />
      
      </div>
    </div>
  );
};

export default CompletionScreen;
