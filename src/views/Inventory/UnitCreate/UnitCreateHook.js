import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { isAlphaNumChars } from "../../../libs/RegexUtils";
import SnackbarUtils from "../../../libs/SnackbarUtils";

import {
  serviceCreateUnit,
  serviceGetUnitDetails,
  serviceUpdateUnit,
} from "../../../services/Unit.service";
import debounce from "lodash.debounce";
import { serviceRolesCheckIsExist } from "../../../services/UserRoles.service";
import { actionFetchUnit } from "../../../actions/Unit.action";
import { useDispatch } from "react-redux";
const initialForm = {
  name: "",
  full_name: "",
  is_general: false,
  is_active: true,
};

const useUnitDetail = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const includeRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (empId) {
      serviceGetUnitDetails({ id: empId }).then((res) => {
        if (!res.error) {
          const empData = res?.data?.details;
          console.log(">>>>", empData);
          const data = {};
          Object.keys({ ...empData }).forEach((key) => {
            if (key in initialForm) {
              data[key] = empData[key];
            }
          });
          console.log("data", data);
          setForm({
            ...initialForm,
            ...data,
            id: empData?.id,
            is_active: empData?.status === "ACTIVE",
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

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "full_name"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
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
      let req = serviceCreateUnit;
      if (empId) {
        req = serviceUpdateUnit;
      }
      req({
        ...form,
      }).then((res) => {
        if (!res.error) {
          handleToggleSidePannel();
          // window.location.reload();
          dispatch(actionFetchUnit(1));
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
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
  const checkForSalaryInfo = useCallback(
    (data, fieldName, errorArr) => {
      if (data) {
        // if (!id) return;

        let req = serviceRolesCheckIsExist({
          id: empId ? empId : "",
          name: data,
        });

        req.then((res) => {
          if (!res.error) {
            const errors = JSON.parse(JSON.stringify(errorArr));
            if (res.data.is_exists) {
              errors[fieldName] = `Display Name ${data} Exist`;
              setErrorData(errors);
            } else {
              delete errors[fieldName];
              setErrorData(errors);
            }
          }
        });
      }
    },
    [empId]
  );

  const checkSalaryInfoDebouncer = useMemo(() => {
    return debounce((e, fieldName, errorArr) => {
      checkForSalaryInfo(e, fieldName, errorArr);
    }, 1000);
  }, [checkForSalaryInfo]);

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "name") {
        if (!text || (isAlphaNumChars(text) && text.toString().length <= 30)) {
          t[fieldName] = text;
        }
      } else {
        t[fieldName] = text;
      }
      if (["name"].includes(fieldName)) {
        checkSalaryInfoDebouncer(text, fieldName, errorData);
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
    [changeTextData]
  );

  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
    setErrorData({})
  }, [setForm, setErrorData]);

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
  };
};

export default useUnitDetail;
