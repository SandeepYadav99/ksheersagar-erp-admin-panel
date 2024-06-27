import { useCallback, useState, useEffect } from "react";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import RouteName from "../../../routes/Route.name";
import { actionDeleteRoles } from "../../../actions/UserRoles.action";
import { useDispatch } from "react-redux";

import { actionFetchPaytmMachines } from "../../../actions/Machines.action";
import useDebounce from "../../../hooks/DebounceHook";
import { serviceGetList } from "../../../services/Common.service";
import {

  serviceGetStaticQrDetails,
 
} from "../../../services/StaticQr.service";
import { actionFetchStaticQr } from "../../../actions/StaticQr.action";
import { isUpiID } from "../../../libs/RegexUtils";
import { serviceGetShiftsWorkingHours } from "../../../services/Shifts.service";

const initialForm = {
  key: "",

  full_day: '',
  half_day: '',
};

const useHoursCreateHook = ({ handleToggleSidePannel, isSidePanel, qrId }) => {
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState({ LOCATIONS: [] });
  const dispatch = useDispatch();

  useEffect(() => {
    if (qrId) {
      serviceGetStaticQrDetails({ id: qrId }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setForm({
            ...form,
            name: data?.name,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [qrId]);

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

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const submitToServer = useCallback(async () => {
    setIsLoading(true);
    if (!isSubmitting) {
      setIsSubmitting(true);
    }
    const valueString = JSON.stringify({
      full_day: Number(form.full_day),
      half_day: Number(form.half_day) ,
    }).replace(/"/g, "'");
  
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
      if (fieldName === "name") {
        t[fieldName] = text?.trimStart();
      }  else {
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
