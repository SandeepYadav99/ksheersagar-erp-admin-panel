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
const initialForm = {
  role: "",
  role_description: "",
  is_active: true,
};
const useUserRolesCreateHook = () => {
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [permission, setPermissions] = useState([]);
  const [permissionUpdate, setPermissionsUpdate] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      serviceRolesDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;

          setForm({
            ...form,
            role: data?.name,
            role_description: data?.description,
            is_active: data?.status === "ACTIVE" ? true : false,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    serviceRolesPermissions({ id: id ? id : "" }).then((res) => {
      if (!res?.error) {
        setPermissions(res?.data);
      }
    });
  }, [id]);

  console.log(permission, "int");
  const permisionChangeHandler = useCallback(
    (index, data) => {
      const t = [...permission];
      console.log(data, "t");
      t[index] = { ...t[index], ...data };

      setPermissions(t);
    },
    [permission, setPermissions]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["role", "role_description"];
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
      name: form?.role,
      description: form?.role_description,
      permissions: permission,
      is_active: form?.is_active === true ? true : false,
    };

    let req;
    if (id) {
      fd.id = id;

      req = serviceUpdateRoles(fd);
    } else {
      req = serviceCreateRoles(fd);
    }

    req.then((res) => {
      if (!res.error) {
        //  handleToggleSidePannel();
        historyUtils.push(RouteName.USER_ROLES);
      } else {
        SnackbarUtils.error(res.message);
      }
      setIsSubmitting(false);
    });
  }, [form, isSubmitting, setIsSubmitting, id, permission, setPermissions]);

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
    permission,
    setPermissions,
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
      let filteredForm = { id: id ? id : "" };
      filteredForm[fieldName] = data;

      let req = serviceRolesCheckIsExist({
        id: id ? id : "",
        name: data,
      });

      req.then((res) => {
        if (!res.error) {
          const errors = JSON.parse(JSON.stringify(errorArr));
          if (res.data.is_exists) {
            errors[fieldName] = `Role  name already exist`;
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
      if (fieldName === "name") {
        t[fieldName] = text?.trimStart();
      } else if (fieldName === "role_description") {
        t[fieldName] = text?.trimStart();
      } else if (fieldName === "role") {
        if (!text || (isAlphaNum(text) && text.toString())) {
          t[fieldName] = text;
        }
      } else {
        t[fieldName] = text;
      }
      if (["role"].includes(fieldName)) {
        if (fieldName === "role") {
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
    dispatch(actionDeleteRoles(id));
    // setIsDialog(false);
    // historyUtils.push("/product");
    historyUtils.push(RouteName.USER_ROLES);
  }, [id]);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);

  return {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    permission,
    permisionChangeHandler,
    id,
    handleDelete,
  };
};

export default useUserRolesCreateHook;
