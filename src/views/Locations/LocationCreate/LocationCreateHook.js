import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  isAlpha,
  isAlphaNum,
  isAlphaNumChars,
  isEmail,
  isNum,
  isSpace,
} from "../../../libs/RegexUtils";
import {
  serviceCreateLocation,
  serviceGetLocationDetails,
  serviceLocationCheck,
  serviceUpdateLocation,
} from "../../../services/Location.service";
import useDebounce from "../../../hooks/DebounceHook";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import { useParams } from "react-router";
import Constants from "../../../config/constants";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/index.services";

const initialForm = {
  name_en: "",
  name_hi: "",
  code: "",
  city: "",
  head_id: "",
  address: "",
  type: "",
  is_active: true,
  is_department_attendance: false,
  google_page_url: "",
  contact: "",
};
const useLocationDetail = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [geoLocation, setGeoLocation] = useState([]);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [listData, setListData] = useState({
    EMPLOYEES: [],
  });
  const [isEdit, setIsEdit] = useState(false);
  const includeRef = useRef(null);
  const codeDebouncer = useDebounce(form?.code, 500);
  const { id } = useParams();

  useEffect(() => {
    serviceGetList(["EMPLOYEES"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  useEffect(() => {
    if (id) {
      serviceGetLocationDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setForm({
            ...data,
            is_active: data?.status === Constants.GENERAL_STATUS.ACTIVE,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [id]);

  const checkCodeValidation = useCallback(() => {
    if (form?.code) {
      serviceLocationCheck({ code: form?.code, id: id ? id : null }).then(
        (res) => {
          if (!res.error) {
            const errors = JSON.parse(JSON.stringify(errorData));
            if (res.data.is_exists) {
              errors["code"] = "Location Code Exists";
              setErrorData(errors);
            } else {
              delete errors.code;
              setErrorData(errors);
            }
          }
        }
      );
    }
  }, [errorData, setErrorData, form, id]);
  useEffect(() => {
    if (codeDebouncer) {
      checkCodeValidation();
    }
  }, [codeDebouncer]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "name_en",
      "name_hi",
      "code",
      "city",
      "head_id",
      "address",
      "type",
      "google_page_url",
      "contact",
    ];
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
    if (
      form?.contact &&
      (!isNum(form?.contact) || form?.contact?.length !== 10)
    ) {
      errors["contact"] = true;
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const handleCoordinate = (data) => {
    setGeoLocation(data);
  };
  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      let req = null;
      if (id) {
        req = serviceUpdateLocation({
          ...form,
        });
      } else {
        req = serviceCreateLocation({
          ...form,
          coordinates: geoLocation,
        });
      }
      req.then((res) => {
        if (!res.error) {
          historyUtils.push(RouteName.LOCATIONS);
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, id, geoLocation]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("erros", errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, submitToServer, geoLocation]);

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
      if (fieldName === "address") {
        if (!text || (isAlphaNumChars(text) && text.toString().length <= 50)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "type") {
        if (!text || (isAlpha(text) && text.toString().length <= 30)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "code") {
        if (!text || (!isSpace(text) && isAlphaNumChars(text))) {
          t[fieldName] = text.toUpperCase();
        }
        shouldRemoveError = false;
      } else if (fieldName === "contact") {
        if (isNum(text) && text.toString().length <= 10) {
          t[fieldName] = text;
        }
      } else {
        t[fieldName] = text;
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
    [changeTextData, checkCodeValidation]
  );

  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
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
    listData,
    id,
    handleCoordinate,
  };
};

export default useLocationDetail;
