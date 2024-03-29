import React, { useEffect } from "react";
import styles from "./FeedbackForm.module.css";
import { ButtonBase } from "@material-ui/core";
import ic_Google from "../../assets/img/feedback/ic_google.png";
import StanduredTextField from "../../components/FormFields/TextField/StanduredTextFiled";
import ic_topnav_logo from "../../assets/img/feedback/ic_topnav_logo.png";
import ic_vendor from "../../assets/img/feedback/ic_vendor.png";
import ic_number from "../../assets/img/feedback/ic_number.png";
import useFeedBackHook from "./FeedBackHook";
import { useLocation } from "react-router-dom";
import usePositiveFeedbackHook from "./PositiveFeedbackHook";
import DashboardSnackbar from "../../components/Snackbar.component";
import SnackbarUtils from "../../libs/SnackbarUtils";

const PositiveCustomerFeedback = () => {
  const { language } = useFeedBackHook();
  const location = useLocation();
  const { lng, rating, invoice_id, customer_id } = location.state;

  const { form, errorData, changeTextData, handleSubmit } =
    usePositiveFeedbackHook({ rating , invoice_id, customer_id});

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <img src={ic_topnav_logo} alt="" width={166} height={34} />
        </div>
        <div className={styles.title}>
          {language === lng
            ? "  Thank you for your feedback! We are glad you are happy."
            : "आपकी प्रतिक्रिया के लिए आपका धन्यवाद! हमें खुशी है कि आप खुश हैं."}
        </div>
        <div className={styles.ic_Google_img}>
          <img src={ic_Google} alt="" width={110} height={110} />
        </div>
        <div className={styles.subReview}>
          {" "}
          {language === lng
            ? "Review us on Google!"
            : "गूगल पर हमारी समीक्षा करें!"}
        </div>
        <div className={styles.subParagraph}>
          {language === lng
            ? "  Help us spread the word & fill out the below details to get the review link"
            : "इस बात को फैलाने में हमारी मदद करें और समीक्षा लिंक प्राप्त करने के लिए नीचे दिए गए विवरण भरें"}
        </div>

        <div className={styles.formContainer}>
          <div className={"formFlex"}>
            <div style={{ marginTop: "40px" }}>
              <img src={ic_vendor} width={20} height={20} alt=""/>
            </div>
            <div className={"formGroup"}>
              <StanduredTextField
                isError={errorData?.name}
                errorText={errorData?.name}
                label={language === lng ? "Full Name" : "पूरा नाम"}
                value={form?.name}
                onTextChange={(text) => {
                  changeTextData(text, "name");
                }}
                onBlur={() => {
                  // onBlurHandler("name_en");
                }}
                //  icon={ic_vendor}
              />
            </div>
          </div>
          {/* <div>
                  <img src={ic_person}/>
                </div> */}
          <div className={"formFlex"}>
            <div style={{ marginTop: "40px" }}>
              <img src={ic_number} width={20} height={20} />
            </div>
            <div className={"formGroup"}>
              <StanduredTextField
                isError={errorData?.contact}
                errorText={errorData?.contact}
                label={language === lng ? "Phone Number" : "फ़ोन नंबर"}
                value={form?.contact}
                onTextChange={(text) => {
                  changeTextData(text, "contact");
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
              <ButtonBase
                className={styles.createBtnSubmit}
                onClick={() => {
                  // historyUtils.push(RouteName.NEGATIVE_FEEDBACK_FORM);
                  handleSubmit();
                }}
              >
                <div className={styles.submit}>
                  {language === lng ? "SEND SMS" : "एसएमएस भेजें"}
                </div>
              </ButtonBase>
            </div>
          </div>
        </div>
        <div className={styles.gapsThank2} />
      </div>
      <DashboardSnackbar />
    </div>
  );
};

export default PositiveCustomerFeedback;
