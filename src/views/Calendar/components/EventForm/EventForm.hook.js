import { useCallback, useEffect, useState } from "react";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
// import { serviceApproveCLaim } from "../../../../services/Claims.service";
import RouteName from "../../../../routes/Route.name";
import historyUtils from "../../../../libs/history.utils";
import { guestList } from "../../../../helper/calenderData";
import { serviceGetList } from "../../../../services/index.services";

const initialForm = {
  name: "",
  holiday_type: "",
  type: "",
  start_date: "",
  end_date: "",
  date: "",
  applies_locations: "",
  excluded_employees: [],
};
const useEventFormHook = ({ isOpen, handleToggle, candidateId }) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [declaration, setDeclaration] = useState(false);
  const [listData, setListData] = useState({
    LOCATIONS: [],
  });

  useEffect(() => {
    serviceGetList(["LOCATIONS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  useEffect(() => {
    if (isOpen) {
      setForm({ ...initialForm });
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
      if (fieldName === "type") {
        if (text === "FULL_DAY") {
          t["date"] = "";
        } else {
          t["start_date"] = "";
          t["end_date"] = "";
        }
        t[fieldName] = text;
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "name",
      "holiday_type",
      "type",
      "excluded_employees",
      "applies_locations",
      // "start_date",
      // "end_date",
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
    isSubmitted,
    listData,
  };
};

export default useEventFormHook;
