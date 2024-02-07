import React from "react";
import styles from "./FeedbackForm.module.css";
import image from "../../assets/img/KS_logo.png";
import { ButtonBase } from "@material-ui/core";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
import ic_5 from "../../assets/img/feedback/ic_5.png";
import ic_4_inactive from "../../assets/img/feedback/ic_4_inactive.png";
import ic_3_inactive from "../../assets/img/feedback/ic_3_inactive.png";
import ic_2_inactive from "../../assets/img/feedback/ic_2_inactive.png";
import ic_1_inactive from "../../assets/img/feedback/ic_1_inactive.png";
import ic_star from "../../assets/img/feedback/ic_star.png";
import ic_topnav_logo from "../../assets/img/feedback/ic_topnav_logo.png"
const OverAllFeedbackForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <img src={ic_topnav_logo} alt="" width={166} height={34} />
        </div>
        <div className={styles.title}>Feedback Form</div>
        <div className={styles.paragraph}>
          Please take a moment to share your feedback with us. It will help us
          to improve so we can serve you better!
        </div>
        <div className={styles.subTitle}>
          Please rate your overall experience
        </div>
        <div className={styles.actionContainer}>
          <div className={styles.action}>
            <ButtonBase className={styles.createBtn}>
              <div className={styles.feedbackContainer}>
                <div className={styles.feedback}>
                  <span>5</span>
                  <img hight={22} width={22} src={ic_star} style={{ marginLeft: "10px" }}/>
                </div>

                <div className={styles.feedback1}>
                  <img src={ic_5} height={37} width={37} alt="" />
                  <div style={{ fontSize: "14px", marginLeft:"5px" }}>Very Good</div>
                </div>
              </div>
            </ButtonBase>
          </div>
          <div className={styles.gaps} />
          <div className={styles.action}>
            <ButtonBase className={styles.createBtnDisable}>
              <div className={styles.feedbackContainer}>
                <div className={styles.feedback}>
                  <span>4</span>
                  <img hight={22} width={22} src={ic_star} style={{ marginLeft: "10px" }}/>
                </div>
                <div className={styles.feedback1}>
                  <img src={ic_4_inactive} height={37} width={37} />
                  <div style={{ fontSize: "14px", marginLeft:"5px" }}>Good</div>
                </div>
              </div>
            </ButtonBase>
          </div>
          <div className={styles.gaps} />
          <div className={styles.action}>
            <ButtonBase className={styles.createBtnDisable}>
              <div className={styles.feedbackContainer}>
                <div className={styles.feedback}>
                  <span>3</span>
                  <img hight={22} width={22} src={ic_star} style={{ marginLeft: "10px" }}/>
                </div>
                <div className={styles.feedback1}>
                  <img src={ic_3_inactive} height={37} width={37} />
                  <div style={{ fontSize: "14px" , marginLeft:"5px"}}>Satisfactory</div>
                </div>{" "}
              </div>
            </ButtonBase>
          </div>
          <div className={styles.gaps} />
          <div className={styles.action}>
            <ButtonBase className={styles.createBtnDisable}>
              <div className={styles.feedbackContainer}>
                <div className={styles.feedback}>
                  <span>2</span>
                  <img hight={22} width={22} src={ic_star} style={{ marginLeft: "10px" }}/>
                </div>
                <div className={styles.feedback1}>
                  <img src={ic_2_inactive} height={37} width={37} />
                  <div style={{ fontSize: "14px" , marginLeft:"5px"}}>Below Satisfaction</div>
                </div>
              </div>
            </ButtonBase>
          </div>
          <div className={styles.gaps} />
          <div className={styles.action}>
            <ButtonBase className={styles.createBtnDisable}>
              <div className={styles.feedbackContainer}>
                <div className={styles.feedback}>
                  <span>1</span>
                  <img hight={22} width={22} src={ic_star} style={{ marginLeft: "10px" }}/>
                </div>

                <div className={styles.feedback1}>
                  <img src={ic_1_inactive} height={37} width={37} />
                  <div style={{ fontSize: "14px" , marginLeft:"5px"}}>Bad</div>
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
                  historyUtils.push(RouteName.POSITIVE_FEEDBACK_FORM);
                }}
              >
                <div className={styles.submit}>Submit</div>
              </ButtonBase>
            </div>
          </div>
        </div>
        <div className={styles.language}>
          <a className={styles.english} href="#" target="">
            English
          </a>
          <div className={styles.hindi}>Hindi</div>
        </div>
      </div>
    </div>
  );
};

export default OverAllFeedbackForm;
