import { useCallback, useEffect, useState } from "react";
import LogUtils from "../../../libs/LogUtils";
// import {serviceChangeEmployeePassword} from "../../../../services/Employee.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { serviceGetList } from "../../../services/index.services";
import { serviceLocationDepartmentUpdate } from "../../../services/Location.service";
import { serviceGetEmployAttendesReport } from "../../../services/Employee.service";
import historyUtils from "../../../libs/history.utils";
import { format } from "date-fns";

const initialForm = {
  date: "",
  location: "",
  startDate: "",
  endDate: "",
};

const useDownloadDialogHook = ({ isOpen, handleToggle, empId, data }) => {
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [resData, setResData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    if (data?.length > 0) {
      const departmentArray = data?.map((item) => item?.department);
      setForm({ ...form, department: departmentArray });
    }
  }, [data]);

  useEffect(() => {
    if (isOpen) {
      // setForm({ ...initialForm });
      setResData([]);
      setIsSubmitted(false);
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

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      t[fieldName] = text;
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );
  console.log({ form });
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["location", "startDate", "endDate"];
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
  console.log(form, "Form");
  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      // const month = form?.date?.getMonth() + 1;
      // const year = form?.date?.getFullYear();
      const date = form?.date;
      const month = date ? format(date, "MM") : "";
      const year = date ? format(date, "yyyy") : "";
      const startDateFormatted = form?.startDate ? format(form.startDate, 'yyyy-MM-dd') : ''; 
      const endDateFormatted = form?.endDate ? format(form.endDate, 'yyyy-MM-dd') : ''; 
  
      serviceGetEmployAttendesReport({
        month: month,
        year: year,
        location_id: form?.location,
        start_date: startDateFormatted,
        end_date: endDateFormatted,
      }).then((res) => {
        if (!res.error) {
          const data = res?.data;
          window.open(data, "_blank");
          handleToggle();
          
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
      setIsSubmitting(false);
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle]);

  useEffect(() => {
    if (!isOpen) {
      handleReset();
    }
  }, [isOpen]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    LogUtils.log("errors", errors);
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

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
    setErrorData({});
  }, [form]);
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
    listData,
  };
};

export default useDownloadDialogHook;
