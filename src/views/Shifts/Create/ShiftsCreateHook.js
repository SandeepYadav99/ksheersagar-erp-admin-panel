import { useCallback, useState, useEffect, useRef, useMemo } from "react";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import RouteName from "../../../routes/Route.name";
import { actionDeleteRoles } from "../../../actions/UserRoles.action";
import { useDispatch } from "react-redux";
import { serviceGetList } from "../../../services/Common.service";
import {
  serviceUpdateStaticQr,
} from "../../../services/StaticQr.service";
import { actionFetchStaticQr } from "../../../actions/StaticQr.action";
import { shiftdays } from "../../../helper/helper";
import { serviceCreateShifts } from "../../../services/Shifts.service";

const initialForm = {
  name: "",
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const useShiftsCreateHook = ({ handleToggleSidePannel, isSidePanel, qrId }) => {
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState({ LOCATIONS: [] });
  const shiftRef = useRef(null);
  const dispatch = useDispatch();

  const getdays = useMemo(() => {
    return days?.map((item) => {
      return {
        ...shiftdays,
        name: item,
      };
    });
  }, [shiftdays]);

  useEffect(() => {
    shiftRef.current?.setData(getdays);
  }, []);

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  useEffect(() => {
    serviceGetList(["LOCATIONS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name"];
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
    const shiftData = shiftRef.current.getData();
    const updatedData = {
      ...form,
      shift_days: [...shiftData],
    };
    let req;
    if (qrId) {
      req = serviceUpdateStaticQr({ ...form, id: qrId });
    } else {
      req = serviceCreateShifts({ ...updatedData });
    }

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
    const isShiftValid = shiftRef.current.isValid();
    if (!isShiftValid || Object.keys(errors).length > 0) {
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
      } else if (fieldName === "upi_id") {
        // if(!isUpiID(text)){
        t[fieldName] = text;
        // }
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
    shiftRef,
  };
};

export default useShiftsCreateHook;
