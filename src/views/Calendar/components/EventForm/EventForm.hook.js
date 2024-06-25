import { useCallback, useEffect, useState } from "react";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
// import { serviceApproveCLaim } from "../../../../services/Claims.service";
import RouteName from "../../../../routes/Route.name";
import historyUtils from "../../../../libs/history.utils";
import { guestList } from "../../../../helper/calenderData";

const initialForm = {
  title: "",
  type: "",
  start_date: "",
  end_date: "",
  description: "",
  location: "",
  guest_name: [],
  event_url: "",
  is_all_day: false,
};
const useEventFormHook = ({ isOpen, handleToggle, candidateId }) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [isVerified, setIsVerified] = useState(false);
  const [resData, setResData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [declaration, setDeclaration] = useState(false);
  const [listData, setListData] = useState([...guestList]);

  useEffect(() => {
    if (isOpen) {
      setForm({ ...initialForm });
      setResData([]);
      setIsSubmitted(false);
      setIsVerified(false);
      setErrorData({});
    }
  }, [isOpen]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  console.log("form", form);
  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      t[fieldName] = text;
      setForm(t);
      shouldRemoveError && removeError(fieldName);
      setIsVerified(false);
    },
    [removeError, form, setForm, setIsVerified]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "title",
      "type",
      "location",
      "guest_name",
      "event_url",
      "description",
      "start_date",
      "end_date"
    ];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if ([].indexOf(val) < 0) {
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

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      //   serviceApproveCLaim({
      //     review_id: candidateId,
      //     ...form,
      //   }).then((res) => {
      //     if (!res.error) {
      //       SnackbarUtils.success("Request Approved");
      //       historyUtils.goBack();
      //       // historyUtils.push(RouteName.CLAIMS_LIST);
      //       handleToggle();
      //       SnackbarUtils.success("Request Approved");
      //     } else {
      //       SnackbarUtils.error(res?.message);
      //     }
      setIsSubmitting(false);
      //   });
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle]);

  const handleSubmit = useCallback(() => {
    const errors = checkFormValidation();
    console.log("===?", form, errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, submitToServer]);

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    errorData,
    isSubmitting,
    resData,
    isSubmitted,
    isVerified,
    listData,
  };
};

export default useEventFormHook;
