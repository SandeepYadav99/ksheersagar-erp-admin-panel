import { useCallback, useEffect, useState } from "react";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import RouteName from "../../../../routes/Route.name";
import { serviceGetList } from "../../../../services/index.services";
import { serviceCreateCalendar } from "../../../../services/Calendar.service";

const initialForm = {
  name: "",
  holiday_type: "",
  type: "FULL_DAY",
  start_date: "",
  end_date: "",
  applies_locations: "",
  excluded_employees: [],
};
const useEventFormHook = ({ isOpen, handleToggle, editData }) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [declaration, setDeclaration] = useState(false);
  const [listData, setListData] = useState({
    EMPLOYEES: [],
  });

  useEffect(() => {
    serviceGetList(["EMPLOYEES"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setForm({
          ...form,
          ...editData,
        });
      } else {
        setForm({ ...initialForm });
      }
    } else {
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
        t["start_date"] = "";
        t["end_date"] = "";
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
      "start_date",
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
    if (form?.type === "FULL_DAY") {
      if (!form?.end_date) {
        errors["end_date"] = true;
      }
    }
    if (!form?.type) {
      errors["type"] = true;
      SnackbarUtils.error("Please select the Nature of leave");
    }
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
      const getEmpID = form?.excluded_employees?.map((item) => item?.id);
      serviceCreateCalendar({
        ...form,
        excluded_employees: getEmpID ? getEmpID : [],
      }).then((res) => {
        if (!res.error) {
          handleToggle();
          SnackbarUtils.success("Request Approved");
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
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
