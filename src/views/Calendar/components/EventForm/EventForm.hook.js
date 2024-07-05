import { useCallback, useEffect, useMemo, useState } from "react";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import {
  serviceCreateCalendar,
  serviceDeleteCalendar,
  serviceUpdateCalendar,
} from "../../../../services/Calendar.service";

const initialForm = {
  name: "",
  holiday_type: "",
  type: "FULL_DAY",
  half_day_type: "",
  start_date: "",
  applies_locations: [],
};
const useEventFormHook = ({ isOpen, handleToggle, editData, renderList }) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listData, setListData] = useState({
    EMPLOYEES: [],
  });

  const getEmpData = useMemo(() => {
    if (editData) {
      const obj = {};
      if (editData?.id) {
        obj.id = editData?.id;
        Object.keys({ ...initialForm }).forEach((key) => {
          if (key === "applies_locations") {
            obj[key] = Array.isArray(editData[key]) ? editData[key] : [];
          } else {
            obj[key] = editData[key] ? editData[key] : "";
          }
        });
      } else {
        obj.start_date = editData?.start_date;
        obj.type = "FULL_DAY";
      }
      return obj;
    }
    return {};
  }, [editData]);

  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setForm({
          ...form,
          ...getEmpData,
        });
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
        if (text === "FULL_DAY") {
          t["half_day_type"] = "";
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
      "applies_locations",
      "start_date",
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
    if (!form?.type) {
      errors["type"] = true;
      SnackbarUtils.error("Please select the Nature of leave");
    }
    if (form?.type === "HALF_DAY" && !form?.half_day_type) {
      errors["half_day_type"] = true;
      SnackbarUtils.error("Please select Half day Leave Type");
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
      let req = serviceCreateCalendar;
      if (editData?.id) {
        req = serviceUpdateCalendar;
      }
      if (form?.type === "FULL_DAY") {
        delete form?.half_day_type;
      }
      req({
        ...form,
      }).then((res) => {
        if (!res.error) {
          handleToggle();
          renderList();
          SnackbarUtils.success("Request Approved");
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle, editData, renderList]);

  const handleSubmit = useCallback(() => {
    const errors = checkFormValidation();
    console.log("===?", form, errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, submitToServer, editData]);

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const handleDelete = useCallback(
    (id) => {
      const req = serviceDeleteCalendar({ id: id });
      req.then((res) => {
        if (!res?.error) {
          SnackbarUtils.success("Deleted Successfully");
          handleToggle();
          renderList();
        }
      });
    },
    [handleToggle, renderList]
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
    handleDelete,
  };
};

export default useEventFormHook;
