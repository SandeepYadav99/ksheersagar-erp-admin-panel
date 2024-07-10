import { useCallback, useState, useEffect, useRef, useMemo } from "react";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import RouteName from "../../../routes/Route.name";
import { actionDeleteRoles } from "../../../actions/UserRoles.action";
import { useDispatch } from "react-redux";
import { serviceGetList } from "../../../services/Common.service";
import { shiftdays } from "../../../helper/helper";
import {
  serviceCreateShifts,
  serviceUpdateShifts,
} from "../../../services/Shifts.service";
import { actionFetchShifts } from "../../../actions/ShiftsLists.action";

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
const useShiftsCreateHook = ({
  handleToggleSidePannel,
  isSidePanel,
  editData,
}) => {
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    if (editData?.id) {
      setForm({
        name: editData?.name ? editData?.name : "",
      });
      shiftRef.current?.setData(editData?.shiftDays);
    } else {
      shiftRef.current?.setData(getdays);
    }
  }, [editData]);

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
      shiftRef.current?.setData([...getdays]);
      setErrorData({});
    }
  }, [isSidePanel]);

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
    const checkShift = shiftData?.some((day) => !day?.is_week_off);
    if (checkShift) {
      const updatedData = {
        ...form,
        shift_days: [...shiftData],
      };
      let req;
      if (editData?.id) {
        req = serviceUpdateShifts({ ...updatedData, id: editData?.id });
      } else {
        req = serviceCreateShifts({ ...updatedData });
      }

      req.then((res) => {
        if (!res.error) {
          SnackbarUtils.success(
            `Shift ${editData?.id ? "updated" : "created"} successfully`
          );
          handleToggleSidePannel();
          dispatch(actionFetchShifts(1, {}, {}));
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    } else {
      SnackbarUtils.error("Please select at least one slot");
    }
    setIsSubmitting(false);
  }, [form, isSubmitting, setIsSubmitting, editData, handleToggleSidePannel]);

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
    dispatch(actionDeleteRoles(editData));
    // setIsDialog(false);
    // historyUtils.push("/product");
    historyUtils.push(RouteName.USER_ROLES);
  }, [editData]);

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
    handleDelete,
    isSubmitting,
    shiftRef,
  };
};

export default useShiftsCreateHook;
