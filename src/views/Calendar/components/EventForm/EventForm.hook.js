import { useCallback, useEffect, useMemo, useState } from "react";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import { serviceGetList } from "../../../../services/index.services";
import {
  serviceCreateCalendar,
  serviceUpdateCalendar,
} from "../../../../services/Calendar.service";

const initialForm = {
  name: "",
  holiday_type: "",
  type: "FULL_DAY",
  start_date: "",
  end_date: "",
  applies_locations: "",
  excluded_employees: [],
};
const useEventFormHook = ({ isOpen, handleToggle, editData, renderList }) => {
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

  const getEmpData = useMemo(() => {
    if (editData) {
      const obj = {};
      if (editData?.id) {
        obj.id = editData?.id;
        Object.keys({ ...initialForm }).forEach((key) => {
          if (key === "excluded_employees") {
            obj[key] = editData["excludedEmployees"]
              ? editData["excludedEmployees"]
              : [];
          } else {
            obj[key] = editData[key] ? editData[key] : "";
          }
        });
      } else {
        obj.start_date = editData?.start_date;
        obj.end_date = editData?.end_date;
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
        t["start_date"] = "";
        t["end_date"] = "";
        t[fieldName] = text;
      } else if (fieldName === "start_date") {
        if (form?.type === "HALF_DAY") {
          t["end_date"] = text;
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
      // "excluded_employees",
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
      let req = serviceCreateCalendar;
      if (editData?.id) {
        req = serviceUpdateCalendar;
      }
      req({
        ...form,
        excluded_employees: getEmpID ? getEmpID : [],
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
