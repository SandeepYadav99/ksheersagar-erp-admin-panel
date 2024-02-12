import React, { useCallback, useState } from "react";
import styles from "./FeedbackForm.module.css";
import image from "../../assets/img/KS_logo.png";
import { ButtonBase } from "@material-ui/core";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
import ic_5 from "../../assets/img/feedback/ic_5.png";
import ic_4 from "../../assets/img/feedback/ic_4.png";
import ic_3 from "../../assets/img/feedback/ic_3.png";
import ic_2 from "../../assets/img/feedback/ic_2.png";
import ic_1 from "../../assets/img/feedback/ic_1.png";
import ic_4_inactive from "../../assets/img/feedback/ic_4_inactive.png";
import ic_3_inactive from "../../assets/img/feedback/ic_3_inactive.png";
import ic_2_inactive from "../../assets/img/feedback/ic_2_inactive.png";
import ic_1_inactive from "../../assets/img/feedback/ic_1_inactive.png";
import ic_star from "../../assets/img/feedback/ic_star.png";
import ic_topnav_logo from "../../assets/img/feedback/ic_topnav_logo.png";

import ic_5_inactive from "../../assets/img/feedback/ic_5_inactive.png";
import useFeedBackHook from "./FeedBackHook";
const OverAllFeedbackForm = () => {
  const { language, toggleLanguageEnglish, toggleLanguageHindi } =
    useFeedBackHook();
    
  const [selectedRating, setSelectedRating] = useState(null);
const [overAll, setOverAll]=useState("")
  const overAllExperience = useCallback((rating, feedback) => {
    setSelectedRating(rating);
    // overAllExperience(rating);
    setOverAll(feedback)
  }, [overAll, selectedRating]);
  
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <img src={ic_topnav_logo} alt="" width={166} height={34} />
        </div>
        <div className={styles.title}>
          {language === "english" ? "Feedback Form" : "प्रतिक्रिया फ़ॉर्म"}
        </div>
        <div className={styles.paragraph}>
          {language === "english"
            ? "Please take a moment to share your feedback with us. It will help us to improve so we can serve you better!"
            : "कृपया हमारे साथ अपनी प्रतिक्रिया साझा करने का एक पल लें। यह हमें सुधारने में मदद करेगा ताकि हम आपको बेहतर सेवा कर सकें!"}
        </div>
        <div className={styles.subTitle}>
          {language === "english"
            ? "Please rate your overall experience"
            : "कृपया अपने समग्र अनुभव को रेटिंग दें"}
        </div>
        <div className={styles.actionContainer}>
          <div className={styles.action}>
            <ButtonBase
              className={
                selectedRating === 5
                  ? styles.createBtn
                  : styles.createBtnDisable
              }
              onClick={() => overAllExperience(5, "Very_Good")}
            >
              <div className={styles.feedbackContainer}>
                <div className={styles.feedback}>
                  <span>5</span>
                  <img
                    hight={22}
                    width={22}
                    src={ic_star}
                    style={{ marginLeft: "10px" }}
                  />
                </div>

                <div className={styles.feedback1}>
                  <img src={selectedRating === 5 ? ic_5 : ic_5_inactive} height={37} width={37} alt="" />
                  <div style={{ fontSize: "14px", marginLeft: "5px" }}>
                    {language === "english" ? "Very Good" : "बहुत अच्छा"}
                  </div>
                </div>
              </div>
            </ButtonBase>
          </div>
          <div className={styles.gaps} />
          <div className={styles.action}>
            <ButtonBase
              className={
                selectedRating === 4
                  ? styles.createBtn
                  : styles.createBtnDisable
              }
              onClick={() => overAllExperience(4, "Good")}
            >
              <div className={styles.feedbackContainer}>
                <div className={styles.feedback}>
                  <span>4</span>
                  <img
                    hight={22}
                    width={22}
                    src={ic_star}
                    style={{ marginLeft: "10px" }}
                  />
                </div>
                <div className={styles.feedback1}>
                  <img src={selectedRating === 4 ? ic_4 : ic_4_inactive} height={37} width={37} />
                  <div style={{ fontSize: "14px", marginLeft: "5px" }}>
                    {language === "english" ? "Good" : "अच्छा"}
                  </div>
                </div>
              </div>
            </ButtonBase>
          </div>
          <div className={styles.gaps} />
          <div className={styles.action}>
            <ButtonBase
              className={
                selectedRating === 3
                  ? styles.createBtn
                  : styles.createBtnDisable
              }
              onClick={() => overAllExperience(3, "Satisfactory")}
            >
              <div className={styles.feedbackContainer}>
                <div className={styles.feedback}>
                  <span>3</span>
                  <img
                    hight={22}
                    width={22}
                    src={ic_star}
                    style={{ marginLeft: "10px" }}
                  />
                </div>
                <div className={styles.feedback1}>
                  <img src={selectedRating === 3 ? ic_3 : ic_3_inactive} height={37} width={37} />
                  <div style={{ fontSize: "14px", marginLeft: "5px" }}>
                    {language === "english" ? "Satisfactory" : "संतोषजनक"}
                  </div>
                </div>{" "}
              </div>
            </ButtonBase>
          </div>
          <div className={styles.gaps} />
          <div className={styles.action}>
            <ButtonBase
              className={
                selectedRating === 2
                  ? styles.createBtn
                  : styles.createBtnDisable
              }
              onClick={() => overAllExperience(2, "Below_Satisfaction")}
            >
              <div className={styles.feedbackContainer}>
                <div className={styles.feedback}>
                  <span>2</span>
                  <img
                    hight={22}
                    width={22}
                    src={ic_star}
                    style={{ marginLeft: "10px" }}
                  />
                </div>
                <div className={styles.feedback1}>
                  <img src={  selectedRating === 2 ? ic_2 : ic_2_inactive} height={37} width={37} />
                  <div style={{ fontSize: "14px", marginLeft: "5px" }}>
                    {language === "english"
                      ? "Below Satisfaction"
                      : "संतुष्टि के नीचे"}
                  </div>
                </div>
              </div>
            </ButtonBase>
          </div>
          <div className={styles.gaps} />
          <div className={styles.action}>
            {console.log(selectedRating === 1, "Rating")}
            <ButtonBase
              className={
                selectedRating === 1
                  ? styles.createBtn
                  : styles.createBtnDisable
              }
              onClick={() => overAllExperience(1, "Bad")}
            >
              <div className={styles.feedbackContainer}>
                <div className={styles.feedback}>
                  <span>1</span>
                  <img
                    hight={22}
                    width={22}
                    src={ic_star}
                    style={{ marginLeft: "10px" }}
                  />
                </div>

                <div className={styles.feedback1}>
                  <img src={ selectedRating === 1 ? ic_1 : ic_1_inactive} height={37} width={37} />
                  <div style={{ fontSize: "14px", marginLeft: "5px" }}>
                    {" "}
                    {language === "english" ? "Bad" : "खराब"}
                  </div>
                </div>
              </div>
            </ButtonBase>
          </div>
          {/* Submit */}
          <div className={styles.gaps} />
          <div className={styles.submitContainer}>
            <div className={styles.action}>
              <ButtonBase
                className={styles.createBtnSubmit}
                onClick={() => {
                
                  if(selectedRating === 4 || selectedRating === 5){
                    historyUtils.push(
                      `${RouteName.POSITIVE_FEEDBACK_FORM}?lng=${language}&f=${selectedRating}`
                    );

                  }else {
                    historyUtils.push(
                      `${RouteName.NEGATIVE_FEEDBACK_FORM}?lng=${language}&f=${selectedRating}`
                    );
                  }
                }}
              >
                <div className={styles.submit}>
                  {language === "english" ? "Submit" : "जमा करना"}
                </div>
              </ButtonBase>
            </div>
          </div>
        </div>
        <div className={styles.language}>
          <button
            className={
              language === "english" ? styles.underline : styles.english
            }
            onClick={() => toggleLanguageEnglish("english")}
          >
            English
          </button>
          <span> | </span>
          <ButtonBase
            className={language === "hindi" ? styles.underline : styles.hindi}
            onClick={() => toggleLanguageHindi("hindi")}
          >
            हिंदी
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default OverAllFeedbackForm;
