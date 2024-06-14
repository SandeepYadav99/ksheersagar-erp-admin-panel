import { useCallback, useEffect, useState } from "react";

import SnackbarUtils from "../../../libs/SnackbarUtils";
import { serviceResetPasswordEmpMaster } from "../../../services/Employee.service";
import { actionFetchEmployee } from "../../../actions/Employee.action";
import { useDispatch } from "react-redux";

const initialForm = {
  password: "",
};

const useResetPasswordHook = ({
  handleDialog,
  isOpen,
  empId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
const dispatch = useDispatch()
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["password"];
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

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      if (!form?.password) {
        return;
      }
      serviceResetPasswordEmpMaster({
        employee_id: empId,
        password: form?.password,
      }).then((res) => {
        if (!res.error) {
          handleDialog()
          dispatch(
            actionFetchEmployee(
              1,
              { },
              {
              
              }
            )
          );
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, empId]);

  const handleUpdate = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form]);

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

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  useEffect(() => {
    if (!isOpen) {
      handleReset();
    }
  }, [isOpen, empId]);

  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
    setErrorData({})
  }, [form, errorData]);

 
  return {
    form,
    errorData,
    isSubmitting,
    onBlurHandler,
    changeTextData,
    showPasswordCurrent,
    setShowPasswordCurrent,
    handleUpdate,
  };
};

export default useResetPasswordHook;
