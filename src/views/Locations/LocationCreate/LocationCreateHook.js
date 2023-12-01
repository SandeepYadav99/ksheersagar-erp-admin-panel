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

import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";

import { useParams } from "react-router";
import Constants from "../../../config/constants";

import { serviceGetList } from "../../../services/index.services";
import debounce from "lodash.debounce";
import RouteName from "../../../routes/Route.name";

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

  const [geofencingSelected, setGeofencingSelected] = useState(false);
  const { id } = useParams();
  console.log(id);
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
            name_en: data?.name_en,
            is_active: data?.status === Constants.GENERAL_STATUS.ACTIVE,
          });

          setGeoFence(
            data?.geofence?.coordinates
              ? data.geofence.coordinates.map((coordinate) => [...coordinate])
              : []
          );
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
      if (!id) return;
      let filteredForm = { id: id ? id : "" };
      filteredForm[fieldName] = data;
      let req = serviceLocationCheck({
        ...filteredForm,
      });
      req.then((res) => {
        if (!res.error) {
          const errors = JSON.parse(JSON.stringify(errorArr));
          if (res.data.is_exists) {
            errors[fieldName] = `Location ${data} Exist`;
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
    console.log("DEBOUNCE");
    return debounce((e, fieldName, errorArr) => {
      checkForSalaryInfo(e, fieldName, errorArr);
    }, 1000);
  }, [checkForSalaryInfo]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name_en", "name_hi", "code", "city", "address", "type"];

    // if (!geofencingSelected) {
    //   errors["geofencing"] = true;
    //   SnackbarUtils.error("Please select the geo-fencing boundary on the Map");
    // } else {
    //   delete errors["geofencing"];
    // }
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
    if (form?.google_page_url) {
      if (!form.google_page_url.startsWith("https://")) {
        errors["google_page_url"] = true;
        SnackbarUtils.error("Please Enter Google Page URL With https://");
      } else {
        delete errors["google_page_url"];
      }
    }
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

  const handleCoordinate = useCallback(
    (data) => {
      console.log(data);
      setGeoLocation(data);
setGeoFence(data)
      setGeofencingSelected(true);
    },
    [setGeoLocation, setGeoFence]
  );
  
  const submitToServer = useCallback(() => {
    console.log(isSubmitting);
    if (!isSubmitting) {
      
      setIsSubmitting(true);
      // if (geofence.length >= 0) {
      //   SnackbarUtils.error("Please select the geo-fencing boundary on the Map");
      //   setIsSubmitting(false);
      
      // }
      let req;

      if (id) {
        const updateData = {
          id: form?.id,
          name_en: form?.name_en,
          name_hi: form?.name_hi,
          code: form?.code,
          city: form?.city,
          type: form?.type,
          contact: form?.contact,
          head_id: form?.head_id,
          address: form?.address,
          coordinates: form?.location?.coordinates,
          google_page_url: form?.google_page_url,
          is_department_attendance: form?.is_department_attendance,
          is_active: form?.is_active,
          geofence_coordinates: geoLocation ? geoLocation : [],
        };

        req = serviceUpdateLocation({
          ...updateData,
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
          // window.location.reload();
          //  historyUtils.goBack()
          historyUtils.push(RouteName.LOCATIONS);
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, id, geoLocation, setGeoFence]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("Component mounted or updated");
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, submitToServer]);

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
      console.log(address, lat, lng);
      setLat(lat);
      setLng(lng);
      setMapAddress(address);
    },
    [lat, lng]
  );

  const handleCityCountry = (cityCountyObj) => {
    console.log("handleCityCountry", cityCountyObj);
  };

  const openGoogleMaps = useCallback(() => {
    const url = `https://www.google.com/maps/place?q=${lat},${lng}`;

    window.open(url, "_blank");
  }, [lat, lng]);

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
    openGoogleMaps,
    geoLocation,
    setGeoFence,
  };
};

export default useLocationDetail;
