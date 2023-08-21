import { useCallback, useEffect, useState } from "react";
import LogUtils from "../../../../../libs/LogUtils";
// import {serviceChangeEmployeePassword} from "../../../../services/Employee.service";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import { serviceGetList } from "../../../../../services/index.services";
import { serviceLocationDepartmentUpdate } from "../../../../../services/Location.service";

const initialForm = {
  department: [],
};

const useDepartmentDialogHook = ({ isOpen, handleToggle, empId, data }) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [resData, setResData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listData, setListData] = useState({
    DEPARTMENTS: [],
  });
  useEffect(() => {
    serviceGetList(["DEPARTMENTS"]).then((res) => {
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

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["department"];
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
      const departmentIds = form?.department?.map((item) => ({
        department_id: item?.id,
      }));
      serviceLocationDepartmentUpdate({
        location_id: empId,
        data: departmentIds,
      }).then((res) => {
        if (!res.error) {
          window.location?.reload();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
      setIsSubmitting(false);
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle]);

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

export default useDepartmentDialogHook;
