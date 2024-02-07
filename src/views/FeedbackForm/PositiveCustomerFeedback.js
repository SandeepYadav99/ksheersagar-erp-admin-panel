import React from "react";
import styles from "./FeedbackForm.module.css";
import image from "../../assets/img/KS_logo.png";
import { ButtonBase } from "@material-ui/core";
import ic_Google from "../../assets/img/feedback/ic_google.png";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import StanduredTextField from "../../components/FormFields/TextField/StanduredTextFiled";
import ic_person from "../../assets/img/feedback/ic_personal_selected.png";
import RouteName from "../../routes/Route.name";
import historyUtils from "../../libs/history.utils";
import ic_topnav_logo from "../../assets/img/feedback/ic_topnav_logo.png"
const PositiveCustomerFeedback = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
        <img src={ic_topnav_logo} alt="" width={166} height={34} />
        </div>
        <div className={styles.title}>
          Thank you for your feedback! We are glad you are happy.
        </div>
        <div className={styles.ic_Google_img}>
          <img src={ic_Google} alt="" width={110} height={110} />
        </div>
        <div className={styles.subReview}>Review us on Google!</div>
        <div className={styles.subParagraph}>
          Help us spread the word & fill out the below details to get the review
          link
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

        <div>
          <div className={styles.gaps} />
          <div className={styles.submitContainer}>
            <div className={styles.action}>
              <ButtonBase className={styles.createBtnSubmit} onClick={()=>{historyUtils.push(RouteName.NEGATIVE_FEEDBACK_FORM)}}>
                <div className={styles.submit}>SEND SMS</div>
              </ButtonBase>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositiveCustomerFeedback;
