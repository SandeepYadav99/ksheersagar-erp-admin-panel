import React, { useCallback, useState } from "react";
import styles from "./FeedbackForm.module.css";
import image from "../../assets/img/KS_logo.png";
import { ButtonBase } from "@material-ui/core";
import ic_Google from "../../assets/img/feedback/ic_google.png";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import StanduredTextField from "../../components/FormFields/TextField/StanduredTextFiled";
import ic_5 from "../../assets/img/feedback/ic_5.png";
import ic_4 from "../../assets/img/feedback/ic_4.png";
import ic_3 from "../../assets/img/feedback/ic_3.png";
import ic_2 from "../../assets/img/feedback/ic_2.png";
import ic_1 from "../../assets/img/feedback/ic_1.png";
import ic_3_inactive from "../../assets/img/feedback/ic_3_inactive.png";
import ic_2_inactive from "../../assets/img/feedback/ic_2_inactive.png";
import ic_1_inactive from "../../assets/img/feedback/ic_1_inactive.png";

import ic_5_inactive from "../../assets/img/feedback/ic_5_inactive.png";
import ic_topnav_logo from "../../assets/img/feedback/ic_topnav_logo.png";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
import ic_vendor from "../../assets/img/feedback/ic_vendor.png";
import ic_number from "../../assets/img/feedback/ic_number.png";
import usePositiveFeedbackHook from "./PositiveFeedbackHook";
import { useLocation } from "react-router-dom";
import useFeedBackHook from "./FeedBackHook";

import ic_4_inactive from "../../assets/img/feedback/ic_4_inactive.png";
import SnackbarUtils from "../../libs/SnackbarUtils";
import DashboardSnackbar from "../../components/Snackbar.component";
const NegativeFeedback = () => {
  const location = useLocation();
  const { language } = useFeedBackHook();
  const { lng, rating, invoice_id, customer_id } = location.state;

  const {
    form,
    errorData,
    changeTextData,
    handleSubmit,
    overAllExperience,
    handleQuality,
    handleBelowSatisfaction,
    handleTest,
    staffAttitude,
    quality,
    belowSatisfaction,
    test,
  } = usePositiveFeedbackHook({ rating ,invoice_id, customer_id});
  console.log(staffAttitude, "Atitude");

  let feedbackText;
  switch (staffAttitude) {
    case 5:
      feedbackText = language === lng ? "Very Good" : "बहुत अच्छा";
      break;
    case 4:
      feedbackText = language === lng ? "Good" : "अच्छा";
      break;
    case 3:
      feedbackText = language === lng ? "Satisfactory" : "संतोषजनक";
      break;
    case 2:
      feedbackText =
        language === lng ? "Below Satisfactory" : "संतुष्टि के नीचे";
      break;
    case 1:
      feedbackText = language === lng ? "Bad" : "खराब";
      break;
    default:
      feedbackText = "";
  }

  let qualityText;
  switch (quality) {
    case 5:
      qualityText = language === lng ? "Very Good" : "बहुत अच्छा";
      break;
    case 4:
      qualityText = language === lng ? "Good" : "अच्छा";
      break;
    case 3:
      qualityText = language === lng ? "Satisfactory" : "संतोषजनक";
      break;
    case 2:
      qualityText =
        language === lng ? "Below Satisfactory" : "संतुष्टि के नीचे";
      break;
    case 1:
      qualityText = language === lng ? "Bad" : "खराब";
      break;
    default:
      qualityText = "";
  }

  let belowSatisfactionText;
  switch (belowSatisfaction) {
    case 5:
      belowSatisfactionText = language === lng ? "Very Good" : "बहुत अच्छा";
      break;
    case 4:
      belowSatisfactionText = language === lng ? "Good" : "अच्छा";
      break;
    case 3:
      belowSatisfactionText = language === lng ? "Satisfactory" : "संतोषजनक";
      break;
    case 2:
      belowSatisfactionText =
        language === lng ? "Below Satisfactory" : "संतुष्टि के नीचे";
      break;
    case 1:
      belowSatisfactionText = language === lng ? "Bad" : "खराब";
      break;
    default:
      belowSatisfactionText = "";
  }

  let testText;
  switch (test) {
    case 5:
      testText = language === lng ? "Very Good" : "बहुत अच्छा";
      break;
    case 4:
      testText = language === lng ? "Good" : "अच्छा";
      break;
    case 3:
      testText = language === lng ? "Satisfactory" : "संतोषजनक";
      break;
    case 2:
      testText = language === lng ? "Below Satisfactory" : "संतुष्टि के नीचे";
      break;
    case 1:
      testText = language === lng ? "Bad" : "खराब";
      break;
    default:
      testText = "";
  }

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

        <div className={styles.subParagraph}>
          {language === lng
            ? "  To better understand and resolve your concerns, we would appreciate it if you could provide more details about your experience."
            : "आपकी चिंताओं को बेहतर ढंग से समझने और हल करने के लिए, यदि आप अपने अनुभव के बारे में अधिक विवरण प्रदान कर सकें तो हम इसकी सराहना करेंगे।"}
        </div>

        <div>
          <div className={"formFlex"}>
            <div style={{ marginTop: "40px" }}>
              <img src={ic_vendor} width={20} height={20} />
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
                // icon={ic_person}
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

        <div className={styles.gaps} />
        {/* Row one  */}
        <div className={styles.negativeFeedback}>
          <div className={styles.negTitle}>
            {language === lng ? "Staff Attitude " : "स्टाफ का रवैया"}
          </div>
          <div className={styles.gaps} />
          <div className={styles.emojiContainer}>
            <div
              className={
                staffAttitude === 5 ? styles.ngEmojiActive : styles.ngEmoji
              }
              onClick={() => overAllExperience(5, "Very Good")}
            >
              <img
                src={staffAttitude === 5 ? ic_5 : ic_5_inactive}
                height={37}
                width={37}
                alt=""
              />
              <span>5</span>
            </div>
            <div
              className={
                staffAttitude === 4 ? styles.ngEmojiActive : styles.ngEmoji
              }
              onClick={() => overAllExperience(4, "Good")}
            >
              <img src={staffAttitude === 4 ? ic_4 : ic_4_inactive} alt="" />
              <span>4</span>
            </div>
            <div
              className={
                staffAttitude === 3 ? styles.ngEmojiActive : styles.ngEmoji
              }
              onClick={() => overAllExperience(3, "Satisfactory")}
            >
              <img src={staffAttitude === 3 ? ic_3 : ic_3_inactive} alt="" />
              <span>3</span>
            </div>
            <div
              className={
                staffAttitude === 2 ? styles.ngEmojiActive : styles.ngEmoji
              }
              onClick={() => overAllExperience(2, "Below Satisfaction")}
            >
              <img src={staffAttitude === 2 ? ic_2 : ic_2_inactive} alt="" />
              <span>2</span>
            </div>
            <div
              className={
                staffAttitude === 1 ? styles.ngEmojiActive : styles.ngEmoji
              }
              onClick={() => overAllExperience(1, "Bad")}
            >
              <img src={staffAttitude === 1 ? ic_1 : ic_1_inactive} alt="" />
              <span>1</span>
            </div>
          </div>
        </div>
        <div className={styles.negFeedBack}>{feedbackText}</div>
        <div className={styles.gaps} />
        {/* Row two */}
        <div className={styles.negativeFeedback}>
          <div className={styles.negTitle}>
            {language === lng ? "Quality" : "गुणवत्ता"}
          </div>
          <div className={styles.gaps} />
          <div className={styles.emojiContainer}>
            <div
              className={quality === 5 ? styles.ngEmojiActive : styles.ngEmoji}
              onClick={() => handleQuality(5, "Very Good")}
            >
              <img src={quality === 5 ? ic_5 : ic_5_inactive} alt="" />
              <span>5</span>
            </div>
            <div
              className={quality === 4 ? styles.ngEmojiActive : styles.ngEmoji}
              onClick={() => handleQuality(4, "Good")}
            >
              <img src={quality === 4 ? ic_4 : ic_4_inactive} alt="" />
              <span>4</span>
            </div>
            <div
              className={quality === 3 ? styles.ngEmojiActive : styles.ngEmoji}
              onClick={() => handleQuality(3, "Satisfactory")}
            >
              <img src={quality === 3 ? ic_3 : ic_3_inactive} alt="" />
              <span>3</span>
            </div>
            <div
              className={quality === 2 ? styles.ngEmojiActive : styles.ngEmoji}
              onClick={() => handleQuality(2, "Below Satisfactory")}
            >
              <img src={quality === 2 ? ic_2 : ic_2_inactive} alt="" />
              <span>2</span>
            </div>
            <div
              className={quality === 1 ? styles.ngEmojiActive : styles.ngEmoji}
              onClick={() => handleQuality(1, "Bad")}
            >
              <img src={quality === 1 ? ic_1 : ic_1_inactive} alt="" />
              <span>1</span>
            </div>
          </div>
        </div>
        <div className={styles.negFeedBack}> {qualityText}</div>

        <div className={styles.gaps} />
        {/* Row three */}

        <div className={styles.negativeFeedback}>
          <div className={styles.negTitle}>
            {" "}
            {language === lng ? "Speed" : "रफ़्तार"}
          </div>
          <div className={styles.gaps} />
          <div className={styles.emojiContainer}>
            <div
              className={
                belowSatisfaction === 5 ? styles.ngEmojiActive : styles.ngEmoji
              }
              onClick={() => handleBelowSatisfaction(5, "Very Good")}
            >
              <img
                src={belowSatisfaction === 5 ? ic_5 : ic_5_inactive}
                alt=""
              />
              <span>5</span>
            </div>
            <div
              className={
                belowSatisfaction === 4 ? styles.ngEmojiActive : styles.ngEmoji
              }
              onClick={() => handleBelowSatisfaction(4, "Good")}
            >
              <img
                src={belowSatisfaction === 4 ? ic_4 : ic_4_inactive}
                alt=""
              />
              <span>4</span>
            </div>
            <div
              className={
                belowSatisfaction === 3 ? styles.ngEmojiActive : styles.ngEmoji
              }
              onClick={() => handleBelowSatisfaction(3, " Satisfactory")}
            >
              <img
                src={belowSatisfaction === 3 ? ic_3 : ic_3_inactive}
                alt=""
              />
              <span>3</span>
            </div>
            <div
              className={
                belowSatisfaction === 2 ? styles.ngEmojiActive : styles.ngEmoji
              }
              onClick={() => handleBelowSatisfaction(2, "Bellow Satisfactory")}
            >
              <img
                src={belowSatisfaction === 2 ? ic_2 : ic_2_inactive}
                alt=""
              />
              <span>2</span>
            </div>
            <div
              className={
                belowSatisfaction === 1 ? styles.ngEmojiActive : styles.ngEmoji
              }
              onClick={() => handleBelowSatisfaction(1, "Bad")}
            >
              <img
                src={belowSatisfaction === 1 ? ic_1 : ic_1_inactive}
                alt=""
              />
              <span>1</span>
            </div>
          </div>
        </div>
        <div className={styles.negFeedBack}> {belowSatisfactionText}</div>
        <div className={styles.gaps} />

        {/* Row Forth */}

        <div className={styles.negativeFeedback}>
          <div className={styles.negTitle}>
            {" "}
            {language === lng ? "Taste" : "स्वाद"}
          </div>
          <div className={styles.gaps} />
          <div className={styles.emojiContainer}>
            <div
              className={test === 5 ? styles.ngEmojiActive : styles.ngEmoji}
              onClick={() => handleTest(5, "Very Good")}
            >
              <img src={test === 5 ? ic_5 : ic_5_inactive} alt="" />
              <span>5</span>
            </div>
            <div
              className={test === 4 ? styles.ngEmojiActive : styles.ngEmoji}
              onClick={() => handleTest(4, "Good")}
            >
              <img src={test === 4 ? ic_4 : ic_4_inactive} alt="" />
              <span>4</span>
            </div>
            <div
              className={test === 3 ? styles.ngEmojiActive : styles.ngEmoji}
              onClick={() => handleTest(3, "Satisfactory")}
            >
              <img src={test === 3 ? ic_3 : ic_3_inactive} alt="" />
              <span>3</span>
            </div>
            <div
              className={test === 2 ? styles.ngEmojiActive : styles.ngEmoji}
              onClick={() => handleTest(2, "Bellow Satisfactory")}
            >
              <img src={test === 2 ? ic_2 : ic_2_inactive} alt="" />
              <span>2</span>
            </div>
            <div
              className={test === 1 ? styles.ngEmojiActive : styles.ngEmoji}
              onClick={() => handleTest(1, "Bad")}
            >
              <img src={test === 1 ? ic_1 : ic_1_inactive} alt="" />
              <span>1</span>
            </div>
          </div>
        </div>
        <div className={styles.negFeedBack}> {testText}</div>
        <div className={styles.gaps} />

        {/* End */}

        <div className={styles.footerTitle}>
          {language === lng
            ? "Could you give us some recommendation that can help us to improve our business"
            : "क्या आप हमें कुछ सिफ़ारिशें दे सकते हैं जो हमें अपना सुधार करने में मदद कर सकती हैं व्यापार"}
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.recommendation}
              errorText={errorData?.recommendation}
              label={
                language === lng
                  ? "e.g. the quality can be improved..."
                  : "जैसे गुणवत्ता में सुधार किया जा सकता है..."
              }
              value={form?.recommendation}
              onTextChange={(text) => {
                changeTextData(text, "recommendation");
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
              <ButtonBase
                className={styles.createBtnSubmit}
                onClick={() => {
                  if (
                    !staffAttitude &&
                    !test &&
                    !quality &&
                    !belowSatisfaction
                  ) {
                    // eslint-disable-next-line no-lone-blocks
                    {
                      language === lng
                        ? SnackbarUtils.error(
                            "Please provide the rating for Staff Attitude, Quality, Speed, Taste"
                          )
                        : SnackbarUtils.error(
                            "कृपया स्टाफ के रवैये, गुणवत्ता, गति, स्वाद के लिए रेटिंग प्रदान करें"
                          );
                    }
                  } else if (!staffAttitude) {
                    {
                      language === lng
                        ? SnackbarUtils.error(
                            "Please provide the rating for Staff Attitude"
                          )
                        : SnackbarUtils.error(
                            "कृपया स्टाफ के रवैये स के लिए रेटिंग प्रदान करें"
                          );
                    }
                  } else if (!quality) {
                    {
                      language === lng
                        ? SnackbarUtils.error(
                            "Please provide the rating for  Quality"
                          )
                        : SnackbarUtils.error(
                            "कृपया  गति के लिए रेटिंग प्रदान करें"
                          );
                    }
                  } else if (!test) {
                    // eslint-disable-next-line no-lone-blocks
                    {
                      language === lng
                        ? SnackbarUtils.error(
                            "Please provide the rating for  Taste"
                          )
                        : SnackbarUtils.error(
                            "कृपया  स्वाद  के लिए रेटिंग प्रदान करें"
                          );
                    }
                  } else {
                    handleSubmit();
                  }
                  // historyUtils.push(RouteName.COMPLETION_SCREEN);
                }}
              >
                <div className={styles.submit}>
                  {language === "english" ? "Submit" : "जमा करना"}
                </div>
              </ButtonBase>
            </div>
          </div>
        </div>
      </div>
      <DashboardSnackbar />
    </div>
  );
};

export default NegativeFeedback;
