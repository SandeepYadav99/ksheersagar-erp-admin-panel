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
import debounce from "lodash.debounce";

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
const useLocationDetail = ({ isSidePanel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [geofence, setGeoFence] = useState([]);
  const [geoLocation, setGeoLocation] = useState(null);
  const [isDialog, setIsDialog] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [mapAddress, setMapAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
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
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  const toggleConfirmDialog = useCallback(
    (type) => {
      setIsDialog((e) => !e);
    },
    [setIsDialog]
  );

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

  useEffect(() => {
    if (mapAddress) {
      checkSalaryInfoDebouncer(mapAddress, "address", errorData);
      setForm({ ...form, address: mapAddress });
    }
  }, [mapAddress]);

  const checkForSalaryInfo = (data, fieldName, errorArr) => {
    if (data) {
      let filteredForm = { id: id ? id : "" };
      filteredForm[fieldName] = data;
      let req = serviceLocationCheck({
        ...filteredForm,
      });
      req.then((res) => {
        if (!res.error) {
          const errors = JSON.parse(JSON.stringify(errorArr));
          if (res.data.is_exists) {
            errors[fieldName] = `Location ${fieldName} Exist`;
            setErrorData(errors);
          } else {
            delete errors[fieldName];
            setErrorData(errors);
          }
        }
      });
    }
  };
  const checkSalaryInfoDebouncer = useMemo(() => {
    return debounce((e, fieldName, errorArr) => {
      checkForSalaryInfo(e, fieldName, errorArr);
    }, 1000);
  }, []);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name_en", "name_hi", "code", "city", "address", "type"];
    
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (["code", "name_en", "name_hi", "address"].indexOf(val) < 0) {
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

  console.log("errorData", errorData);
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
          coordinates: [lat, lng],
          geofence_coordinates: geoLocation ? geoLocation : [],
        });
      }
      req.then((res) => {
        if (!res.error) {
          window.location.reload();
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
      if (fieldName === "type") {
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
      if (["code", "name_en", "name_hi", "address"]) {
        checkSalaryInfoDebouncer(
          fieldName === "code" ? text.toUpperCase() : text,
          fieldName,
          errorData
        );
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
    setErrorData({});
  }, [form]);

  const handleMapAddress = useCallback(
    (lat, lng, address) => {
      console.log("handleMapAddress", lat, lng, address);
      setLat(lat);
      setLng(lng);
      setMapAddress(address);
    },
    [lat, lng]
  );

  const handleCityCountry = (cityCountyObj) => {
    console.log("handleCityCountry", cityCountyObj);
  };

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
    isDialog,
    toggleConfirmDialog,
    handleMapAddress,
    handleCityCountry,
    lat,
    lng,
    geofence,
  };
};

export default useLocationDetail;
