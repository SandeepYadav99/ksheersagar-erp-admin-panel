import { useCallback, useState, useEffect } from "react";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import RouteName from "../../../routes/Route.name";
import { actionDeleteRoles } from "../../../actions/UserRoles.action";
import { useDispatch } from "react-redux";

import {
  serviceCreatePaytmMachines,
  serviceGetPaytmMachinesDetails,
  servicePaytmMachinesCheck,
  serviceUpdatePaytmMachines,
} from "../../../services/Machines.service";
import { actionFetchPaytmMachines } from "../../../actions/Machines.action";
import useDebounce from "../../../hooks/DebounceHook";
import { serviceGetList } from "../../../services/Common.service";

const initialForm = {
  machineName: "",
  td_id: "",
  serial_number: "",
  location_id: "",
  status: true,
};

const useMachinesCreateHook = ({
  handleToggleSidePannel,
  isSidePanel,
  machineId,
}) => {
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const codeDebouncerUnicTdId = useDebounce(form?.td_id, 500);
  const [isLoading, setIsLoading] = useState(false);
  const [listData, setListData] = useState({ LOCATIONS: [] });
  const dispatch = useDispatch();
  useEffect(() => {
    if (machineId) {
      serviceGetPaytmMachinesDetails({ id: machineId }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setForm({
            ...form,
            machineName: data?.name,
            td_id: data?.t_id,
            serial_number: data?.serial_no,
            location_id:data?.location.id,
            status: data?.status === "ACTIVE" ? true : false,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [machineId]);

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  useEffect(() => {
    serviceGetList(["LOCATIONS"], {location_types: ["SHOWROOM"]}).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["td_id", "serial_number", "machineName", "location_id"];
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

    const fd = {
      name: form?.machineName,
      t_id: form?.td_id,
      serial_no: form?.serial_number,
      is_active: form?.status,
      location_id:form?.location_id,
    };

    let req;
    if (machineId) {
      fd.id = machineId;

      req = serviceUpdatePaytmMachines(fd);
    } else {
      req = serviceCreatePaytmMachines(fd);
    }

    req.then((res) => {
      if (!res.error) {
        handleToggleSidePannel();
        dispatch(actionFetchPaytmMachines(1, {}, {}));
      } else {
        SnackbarUtils.error(res.message);
      }
      setIsSubmitting(false);
    });
  }, [form, isSubmitting, setIsSubmitting, machineId, handleToggleSidePannel]);

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

  const checkCodeValidationTId = useCallback(() => {
    if (form?.td_id) {
      servicePaytmMachinesCheck({
        id: machineId ? machineId : "",
        t_id: form?.td_id,
      }).then((res) => {
        if (!res.error) {
          const errors = JSON.parse(JSON.stringify(errorData));
          if (res.data.is_exists) {
            errors.td_id = "Td id already exist";
            setErrorData(errors);
          } else {
            delete errors.td_id;
            setErrorData(errors);
          }
        }
      });
    }
  }, [errorData, setErrorData, form.td_id, machineId]);

  useEffect(() => {
    if (codeDebouncerUnicTdId) {
      checkCodeValidationTId();
    }
  }, [codeDebouncerUnicTdId]);

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;

      const t = { ...form };
      if (fieldName === "machineName") {
        t[fieldName] = text?.trimStart();
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
    [changeTextData, checkCodeValidationTId]
  );

  const handleDelete = useCallback(() => {
    dispatch(actionDeleteRoles(machineId));
    // setIsDialog(false);
    // historyUtils.push("/product");
    historyUtils.push(RouteName.USER_ROLES);
  }, [machineId]);

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
    machineId,
    handleDelete,
    isSubmitting,
    listData,
  };
};

export default useMachinesCreateHook;
