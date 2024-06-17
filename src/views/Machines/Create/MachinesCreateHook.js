import React, { useCallback, useState, useEffect } from "react";
import {
  serviceCreateRoles,
  serviceRolesCheckIsExist,
  serviceRolesDetails,
  serviceRolesPermissions,
  serviceUpdateRoles,
} from "../../../services/UserRoles.service";
import { useParams } from "react-router-dom";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import RouteName from "../../../routes/Route.name";
import constants from "../../../config/constants";
import { actionDeleteRoles } from "../../../actions/UserRoles.action";
import { useDispatch } from "react-redux";
import { isAlpha, isAlphaNum, isAlphaNumeric } from "../../../libs/RegexUtils";
import { useMemo } from "react";
import debounce from "lodash.debounce";
import {
  serviceCreatePaytmMachines,
  serviceGetPaytmMachinesDetails,
  servicePaytmMachinesCheck,
  serviceUpdatePaytmMachines,
} from "../../../services/Machines.service";
import { actionFetchPaytmMachines } from "../../../actions/Machines.action";
const initialForm = {
  machineName: "",
  td_id: "",
  serial_number: "",
};
const useMachinesCreateHook = ({
  handleToggleSidePannel,
  isSidePanel,
  machineId,
}) => {
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
 

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

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["td_id", "serial_number"];
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
  }, [
    form,
    isSubmitting,
    setIsSubmitting,
    machineId,
 
  ]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    // console.log('dff',errors)
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }

    await submitToServer();
  }, [
    checkFormValidation,
    setErrorData,
    form,
    errorData,
    
  ]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const checkForSalaryInfo = (data, fieldName, errorArr) => {
    if (data) {
      // if (!id) return;
      let filteredForm = { id: machineId ? machineId : "" };
      filteredForm[fieldName] = data;

      let req = servicePaytmMachinesCheck({
        id: machineId ? machineId : "",
        t_id: data,
      });

      req.then((res) => {
        if (!res.error) {
          const errors = JSON.parse(JSON.stringify(errorArr));
          if (res.data.is_exists) {
            errors[fieldName] = `Td id already exist`;
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
  }, [checkForSalaryInfo]);
  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;

      const t = { ...form };
      if (fieldName === "machineName") {
        t[fieldName] = text?.trimStart();
      } else {
        t[fieldName] = text;
      }
      if (["td_id"].includes(fieldName)) {
        if (fieldName === "td_id") {
          checkSalaryInfoDebouncer(text, fieldName, errorData);
        }
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

    machineId,
    handleDelete,
  };
};

export default useMachinesCreateHook;
