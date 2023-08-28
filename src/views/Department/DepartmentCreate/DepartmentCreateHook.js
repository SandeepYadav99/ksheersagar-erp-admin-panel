import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  isAlpha,
  isAlphaNum,
  isAlphaNumChars,
  isNum,
  isSpace,
} from "../../../libs/RegexUtils";
import useDebounce from "../../../hooks/DebounceHook";
import historyUtils from "../../../libs/history.utils";
import {
  serviceDepartmentCheck,
  serviceCreateDepartment,
  serviceGetDepartmentDetails,
  serviceUpdateDepartment,
} from "../../../services/Department.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import Constants from "../../../config/constants";
import RouteName from "../../../routes/Route.name";
import debounce from "lodash.debounce";

const initialForm = {
  name: "",
  code: "",
  is_active: true,
};

const useDepartmentDetail = ({
  handleToggleSidePannel,
  isSidePanel,
  empId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const includeRef = useRef(null);

  useEffect(() => {
    if (empId) {
      serviceGetDepartmentDetails({ id: empId }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setForm({
            ...form,
            code: data?.code,
            name: data?.name,
            is_active: data?.status === Constants.GENERAL_STATUS.ACTIVE,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [empId]);

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  const checkSalaryInfoDebouncer = useMemo(() => {
    return debounce((e, fieldName, errorArr) => {
      checkForSalaryInfo(e, fieldName, errorArr);
    }, 1000);
  }, []);

  const checkForSalaryInfo = (data, fieldName, errorArr) => {
    if (data) {
      let filteredForm = { id: empId ? empId : "" };
      filteredForm[fieldName] = data;
      let req = serviceDepartmentCheck({
        ...filteredForm,
      });
      req.then((res) => {
        if (!res.error) {
          const errors = JSON.parse(JSON.stringify(errorArr));
          if (res.data.is_exists) {
            errors[fieldName] = `Department ${fieldName} Exist`;
            setErrorData(errors);
          } else {
            delete errors[fieldName];
            setErrorData(errors);
          }
        }
      });
    }
  };

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "code"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (["code", "name"].indexOf(val) < 0) {
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
      let req;
      if (empId) {
        req = serviceUpdateDepartment({ ...form, id: empId ? empId : "" });
      } else {
        req = serviceCreateDepartment({ ...form });
      }
      req.then((res) => {
        if (!res.error) {
          handleToggleSidePannel();
          window.location.reload();
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, empId, errorData, setErrorData]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("validation", errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, includeRef.current]);

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
        if (!text || (isAlpha(text) && text.toString().length <= 30)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "code") {
        if (!text || (!isSpace(text) && isAlphaNumChars(text))) {
          t[fieldName] = text.toUpperCase();
        }
        shouldRemoveError = false;
      } else {
        t[fieldName] = text;
      }
      checkSalaryInfoDebouncer(
        fieldName === "code" ? text.toUpperCase() : text,
        fieldName,
        errorData
      );
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [
      removeError,
      form,
      setForm,
      checkSalaryInfoDebouncer,
      errorData,
      setErrorData,
    ]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const handleDelete = useCallback(() => {}, []);

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
    isLoading,
    isSubmitting,
    errorData,
    isEdit,
    handleDelete,
    includeRef,
    handleReset,
    empId,
  };
};

export default useDepartmentDetail;
