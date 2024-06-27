import { useCallback, useState, useEffect } from "react";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import RouteName from "../../../routes/Route.name";
import { actionDeleteRoles } from "../../../actions/UserRoles.action";
import { useDispatch } from "react-redux";
import { serviceGetList } from "../../../services/Common.service";
import {
  serviceCreateStaticQr,
  serviceGetStaticQrDetails,
  serviceStaticQrCheck,
  serviceUpdateStaticQr,
} from "../../../services/StaticQr.service";
import { actionFetchStaticQr } from "../../../actions/StaticQr.action";
import { isUpiID } from "../../../libs/RegexUtils";

const initialForm = {
  name: "",
  upi_id: "",
  code: "",
  location_id: "",
};

const useShiftsCreateHook = ({ handleToggleSidePannel, isSidePanel, qrId }) => {
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
            upi_id: data?.upi_id,
            code: data?.code,
            location_id: data?.location.id,
            // status: data?.status === "ACTIVE" ? true : false,
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

  useEffect(() => {
    serviceGetList(["LOCATIONS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["upi_id", "code", "location_id"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      }
    });

    if (form?.upi_id && !isUpiID(form?.upi_id)) {
      errors.upi_id = true;
      SnackbarUtils.error("Invalid upi id ");
    }
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

    let req;
    if (qrId) {
      req = serviceUpdateStaticQr({ ...form, id: qrId });
    } else {
      req = serviceCreateStaticQr({ ...form });
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

  const checkCodeValidationMId = useCallback(() => {
    if (form?.code) {
      serviceStaticQrCheck({
        id: qrId,
        code: form?.code,
      }).then((res) => {
        if (!res.error) {
          const errors = JSON.parse(JSON.stringify(errorData));
          if (res.data.is_exists) {
            errors.code = "M id already exist";
            setErrorData(errors);
          } else {
            delete errors.code;
            setErrorData(errors);
          }
        }
      });
    }
  }, [errorData, setErrorData, form.code, qrId]);

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
    [changeTextData, checkCodeValidationMId]
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

export default useShiftsCreateHook;
