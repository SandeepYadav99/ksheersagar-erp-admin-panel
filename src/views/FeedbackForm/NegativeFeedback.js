import React from "react";
import styles from "./FeedbackForm.module.css";
import image from "../../assets/img/KS_logo.png";
import { ButtonBase } from "@material-ui/core";
import ic_Google from "../../assets/img/feedback/ic_google.png";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import StanduredTextField from "../../components/FormFields/TextField/StanduredTextFiled";
import ic_4 from "../../assets/img/feedback/ic_4.png";
import ic_3_inactive from "../../assets/img/feedback/ic_3_inactive.png";
import ic_2_inactive from "../../assets/img/feedback/ic_2_inactive.png";
import ic_1_inactive from "../../assets/img/feedback/ic_1_inactive.png";
import ic_2 from "../../assets/img/feedback/ic_2.png";
import ic_5_inactive from "../../assets/img/feedback/ic_5_inactive.png";
import ic_topnav_logo from "../../assets/img/feedback/ic_topnav_logo.png"
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
const NegativeFeedback = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <img src={ic_topnav_logo} alt="" width={166} height={34} />
        </div>
        <div className={styles.title}>
          Thank you for your feedback! We are glad you are happy.
        </div>

        <div className={styles.subParagraph}>
          To better understand and resolve your concerns, we would appreciate it
          if you could provide more details about your experience.
        </div>

        <div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <StanduredTextField
                // isError={errorData?.name_en}
                // errorText={errorData?.name_en}
                label={"Full Name"}
                value={""}
                onTextChange={(text) => {
                  // changeTextData(text, "name_en");
                }}
                onBlur={() => {
                  // onBlurHandler("name_en");
                }}
                // icon={ic_person}
              />
            </div>
          </div>
          {/* <div>
                  <img src={ic_person}/>
                </div> */}
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <StanduredTextField
                // isError={errorData?.name_en}
                // errorText={errorData?.name_en}
                label={"Phone Number"}
                value={""}
                onTextChange={(text) => {
                  // changeTextData(text, "name_en");
                }}
                onBlur={() => {
                  // onBlurHandler("name_en");
                }}
                // icon={ic_person}
              />
            </div>
          </div>
        </div>
        {/* Row one  */}
        <div className={styles.negativeFeedback}>
          <div className={styles.negTitle}>Staff Attitude</div>
          <div className={styles.gaps} />
          <div className={styles.emojiContainer}>
            <div className={styles.ngEmoji}>
              <img src={ic_5_inactive} alt="" />
              <span>5</span>
            </div>
            <div className={styles.ngEmojiActive}>
              <img src={ic_4} alt="" />
              <span>4</span>
            </div>
            <div className={styles.ngEmoji}>
              <img src={ic_3_inactive} alt="" />
              <span>3</span>
            </div>
            <div className={styles.ngEmoji}>
              <img src={ic_2_inactive} alt="" />
              <span>2</span>
            </div>
            <div className={styles.ngEmoji}>
              <img src={ic_1_inactive} alt="" />
              <span>1</span>
            </div>
          </div>
        </div>
        <div className={styles.negFeedBack}>Good</div>
        <div className={styles.gaps} />
        {/* Row two */}
        <div className={styles.negativeFeedback}>
          <div className={styles.negTitle}>Quality</div>
          <div className={styles.gaps} />
          <div className={styles.emojiContainer}>
            <div className={styles.ngEmoji}>
              <img src={ic_5_inactive} alt="" />
              <span>5</span>
            </div>
            <div className={styles.ngEmoji}>
              <img src={ic_4} alt="" />
              <span>4</span>
            </div>
            <div className={styles.ngEmoji}>
              <img src={ic_3_inactive} alt="" />
              <span>3</span>
            </div>
            <div className={styles.ngEmojiActive}>
              <img src={ic_2} alt="" />
              <span>2</span>
            </div>
            <div className={styles.ngEmoji}>
              <img src={ic_1_inactive} alt="" />
              <span>1</span>
            </div>
          </div>
        </div>
        <div className={styles.negFeedBack}>Below Satisfaction</div>

        <div className={styles.gaps} />
        {/* Row three */}

        <div className={styles.negativeFeedback}>
          <div className={styles.negTitle}>Speed</div>
          <div className={styles.gaps} />
          <div className={styles.emojiContainer}>
            <div className={styles.ngEmoji}>
              <img src={ic_5_inactive} alt="" />
              <span>5</span>
            </div>
            <div className={styles.ngEmoji}>
              <img src={ic_4} alt="" />
              <span>4</span>
            </div>
            <div className={styles.ngEmoji}>
              <img src={ic_3_inactive} alt="" />
              <span>3</span>
            </div>
            <div className={styles.ngEmojiActive}>
              <img src={ic_2} alt="" />
              <span>2</span>
            </div>
            <div className={styles.ngEmoji}>
              <img src={ic_1_inactive} alt="" />
              <span>1</span>
            </div>
          </div>
        </div>
        <div className={styles.negFeedBack}>Below Satisfaction</div>
        <div className={styles.gaps} />

        {/* Row Forth */}

        <div className={styles.negativeFeedback}>
          <div className={styles.negTitle}>Taste</div>
          <div className={styles.gaps} />
          <div className={styles.emojiContainer}>
            <div className={styles.ngEmoji}>
              <img src={ic_5_inactive} alt="" />
              <span>5</span>
            </div>
            <div className={styles.ngEmoji}>
              <img src={ic_4} alt="" />
              <span>4</span>
            </div>
            <div className={styles.ngEmoji}>
              <img src={ic_3_inactive} alt="" />
              <span>3</span>
            </div>
            <div className={styles.ngEmojiActive}>
              <img src={ic_2} alt="" />
              <span>2</span>
            </div>
            <div className={styles.ngEmoji}>
              <img src={ic_1_inactive} alt="" />
              <span>1</span>
            </div>
          </div>
        </div>
        <div className={styles.negFeedBack}>Below Satisfaction</div>
        <div className={styles.gaps} />

        {/* End */}
      
        <div className={styles.footerTitle}>
          Could you give us some recommendation that can help us to improve our
          business
        </div>

        <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                // isError={errorData?.name_en}
                // errorText={errorData?.name_en}
                label={"e.g. the quality can be improved..."}
                value={""}
                onTextChange={(text) => {
                  // changeTextData(text, "name_en");
                }}
                onBlur={() => {
                  // onBlurHandler("name_en");
                }}
                // icon={ic_person}
                multiline
                rows={4}
                // icon={ic_notes}
              />
            </div>
          </div>
        <div>
          <div className={styles.gaps} />
          <div className={styles.submitContainer}>
            <div className={styles.action}>
              <ButtonBase className={styles.createBtnSubmit} onClick={()=>{historyUtils.push(RouteName.COMPLETION_SCREEN)}}>
                <div className={styles.submit}>SUBMIT</div>
              </ButtonBase>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NegativeFeedback;
