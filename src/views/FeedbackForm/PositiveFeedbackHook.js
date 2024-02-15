/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { serviceCreateFeedback } from "../../services/Feedback.service";
import RouteName from "../../routes/Route.name";
import historyUtils from "../../libs/history.utils";
import { useLocation } from "react-router-dom";
import SnackbarUtils from "../../libs/SnackbarUtils";

const initialForm = {
  name: "",
  contact: "",
  recommendation: "",
};

const usePositiveFeedbackHook = ({ overAll }) => {
  const [isLoading] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit] = useState(false);
  const includeRef = useRef(null);
  /////////////////

  const [staffAttitude, setStaffAttitude] = useState(null); // Quality
  const [quality, setQuality] = useState(null); // Quality
  const [belowSatisfaction, setBelowSatisfaction] = useState(null); // Quality
  const [test, setTest] = useState(null);
  ////////////////
  const [staffAttitudeFeedback, setStaffAttitudeFeedback] = useState(null); // Quality
  const [qualityFeedback, setQualityFeedback] = useState(null); // Quality
  const [belowSatisfactionFeedback, setBelowSatisfactionFeedback] =
    useState(null); // Quality
  const [testFeedback, setTestFeedback] = useState(null);
  ////////////////////
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lng = params.get("lng") || "english";

  const overAllExperience = useCallback(
    (rating, feedback) => {
      setStaffAttitude(rating);
      // overAllExperience(rating);
      setStaffAttitudeFeedback(feedback);
    },
    [staffAttitude, staffAttitudeFeedback]
  );

  const handleQuality = useCallback(
    (rating, feedback) => {
      setQuality(rating);
      // overAllExperience(rating);
      setQualityFeedback(feedback);
    },
    [quality, qualityFeedback]
  );

  const handleBelowSatisfaction = useCallback(
    (rating, feedback) => {
      setBelowSatisfaction(rating);
      // overAllExperience(rating);
      setBelowSatisfactionFeedback(feedback);
    },
    [belowSatisfaction, belowSatisfactionFeedback]
  );

  const handleTest = useCallback(
    (rating, feedback) => {
      setTest(rating);
      // overAllExperience(rating);
      setTestFeedback(feedback);
    },
    [belowSatisfaction, testFeedback]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [];
    // if (!(overAll === "Very_Good" || overAll === "Good")) {
    //   required.push("recommendation");
    // }
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (["code"].indexOf(val) < 0) {
        delete errors[val];
      }
    });

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const submitToServer = useCallback(async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const formData = {
      customer_name: form?.name,
      customer_contact: form?.contact,
      overall_experience: overAll,
      customer_id: "",
      invoice_id: "",
      staff_attitude: staffAttitude ? staffAttitude : "",
      quality: quality ? quality : "",
      speed: belowSatisfaction ? belowSatisfaction : "",
      taste: test ? test : "",
      recommendation: form?.recommendation,
    };
    try {
      const res = await serviceCreateFeedback(formData);

      if (!res.error) {
        // handleToggleSidePannel();
        // window.location.reload();
        historyUtils.push(`${RouteName.COMPLETION_SCREEN}?lng=${lng}`);
      } else {
       // historyUtils.push(`${RouteName.COMPLETION_SCREEN}?lng=${lng}`);
         SnackbarUtils.error(res.message);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [form, isSubmitting, setIsSubmitting, overAll]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();

    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
    } else {
      await submitToServer();
    }
  }, [checkFormValidation, setErrorData, form, submitToServer]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "name") {
        t[fieldName] = text;
      } else if (fieldName === "contact") {
        if(text.length <= 10){

          t[fieldName] = text;
        }
      } else {
        t[fieldName] = text;
      }

      setForm(t);

      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    //checkCodeValidation as dependescy
    [changeTextData]
  );

  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isLoading,
    isSubmitting,

    errorData,
    isEdit,
    handleDelete,
    includeRef,
    handleReset,

    showPasswordCurrent,
    setShowPasswordCurrent,
    document,
    overAllExperience,
    handleQuality,
    handleBelowSatisfaction,
    handleTest,
    staffAttitude,
    quality,
    belowSatisfaction,
    test,
  };
};

export default usePositiveFeedbackHook;
