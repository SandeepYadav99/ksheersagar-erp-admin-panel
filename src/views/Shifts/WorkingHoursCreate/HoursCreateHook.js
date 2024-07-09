import { useCallback, useState, useEffect } from "react";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import RouteName from "../../../routes/Route.name";
import { actionDeleteRoles } from "../../../actions/UserRoles.action";
import { useDispatch, useSelector } from "react-redux";

import { actionFetchStaticQr } from "../../../actions/StaticQr.action";

import { serviceGetShiftsWorkingHours } from "../../../services/Shifts.service";
import { serviceGetAppSettings } from "../../../services/AppSettings.service";

const initialForm = {
  key: "",

  full_day: "",
  half_day: "",
};

const useHoursCreateHook = ({ handleToggleSidePannel, isSidePanel, qrId }) => {
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState({ LOCATIONS: [] });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isSidePanel) return;
    serviceGetAppSettings({}).then((res) => {
      if (!res.error) {
        const data = JSON.parse(res?.data?.WORKING_HOURS);

        setForm({
          ...form,
          full_day: data?.full_day,
          half_day: data?.half_day,
        });
      } else {
        SnackbarUtils.error(res?.message);
      }
    });
  }, [isSidePanel]);

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      }
    });
    const fullDayValue = parseFloat(form?.full_day);
    const halfDayValue = parseFloat(form?.half_day);

    if (isNaN(fullDayValue) || fullDayValue > 24) {
      errors.full_day = "Full day hours cann't be greater than 24";
    }

    if (
      !isNaN(fullDayValue) &&
      !isNaN(halfDayValue) &&
      halfDayValue > fullDayValue
    ) {
      errors.half_day =
        "Half day hours should not be greater than full day working hours";
    }
    if (!form?.full_day) {
      errors.full_day = "Please enter the full day hours";
    }

    if ((form?.full_day && form?.half_day === 0) || !form?.half_day) {
      errors.half_day = true;
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);
  console.log(form?.half_day);
  const submitToServer = useCallback(async () => {
    setIsLoading(true);
    if (!isSubmitting) {
      setIsSubmitting(true);
    }
    const valueString = JSON.stringify({
      full_day: Number(form.full_day),
      half_day: Number(form.half_day),
    });

    const formData = {
      key: "WORKING_HOURS",
      value: valueString,
    };
    let req;

    req = serviceGetShiftsWorkingHours(formData);

    req.then((res) => {
      if (!res.error) {
        handleToggleSidePannel();
        dispatch(actionFetchStaticQr(1, {}, {}));
      } else {
        SnackbarUtils.error(res.message);
      }
      setIsSubmitting(false);
    });
  }, [form, isSubmitting, setIsSubmitting, qrId, handleToggleSidePannel]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    // console.log('dff',errors)
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }

    await submitToServer();
  }, [checkFormValidation, setErrorData, form, errorData]);

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
      if (fieldName === "full_day") {
        if (text > 0) {
          t[fieldName] = text;
        } else {
          t[fieldName] = "";
        }
      } else if (fieldName === "half_day") {
        if (text > 0) {
          t[fieldName] = text;
        } else {
          t[fieldName] = "";
        }
      } else {
        t[fieldName] = text;
      }

      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm, errorData]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const handleDelete = useCallback(() => {
    dispatch(actionDeleteRoles(qrId));
    // setIsDialog(false);
    // historyUtils.push("/product");
    historyUtils.push(RouteName.USER_ROLES);
  }, [qrId]);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
    setErrorData({});
  }, [form, errorData, setErrorData]);

  return {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    isLoading,
    qrId,
    handleDelete,
    isSubmitting,
    listData,
  };
};

export default useHoursCreateHook;
