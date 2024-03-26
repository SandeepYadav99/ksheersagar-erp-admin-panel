import React, { useCallback, useState, useEffect } from "react";
import {
  serviceCreateRoles,
  serviceRolesDetails,
  serviceRolesPermissions,
  serviceUpdateRoles,
} from "../../../services/UserRoles.service";
import { useParams } from "react-router-dom";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import RouteName from "../../../routes/Route.name";
import constants from "../../../config/constants";

const initialForm = {
  role: "",
  role_description: "",
};
const useUserRolesCreateHook = () => {
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [permission, setPermissions] = useState([]);
  const [permissionUpdate, setPermissionsUpdate] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      serviceRolesDetails({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;

          setForm({
            ...form,
            // id:data._id,
            name: data?.name,

            // document: data.document,
            //  videos:data?.videos?.map((vi)=>vi),
            status: data?.status === constants.GENERAL_STATUS.ACTIVE,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    if (id) return;
    serviceRolesPermissions({ id: "" }).then((res) => {
      if (!res?.error) {
        setPermissions(res?.data);
      }
    });
  }, []);
  console.log(permission, "Permi");

  const permisionChangeHandler = useCallback(
    (index, data) => {
      console.log(data, index);
      const t = [...permission];
      console.log(t, "T");
      t[index] = { ...t[index], ...data };
      setPermissions(t);
    },
    [permission, setPermissions]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["role"];
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

  const submitToServer = useCallback(() => {
    setIsLoading(true);
    if (!isSubmitting) {
      setIsSubmitting(true);
    }
    const fd = {
      name: form?.role,
      description: form?.role_description,
      permissions: permission,
    };

    let req;
    if (id) {
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
  }, [form, isSubmitting, setIsSubmitting, id]);
  console.log(form, "Form");
  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    // console.log('dff',errors)
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }

    submitToServer();
  }, [checkFormValidation, setErrorData, form]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );
  console.log(permissionUpdate, "Update");
  const changeTextData = useCallback(
    (text, fieldName, index) => {
      let shouldRemoveError = true;
      console.log(text, "Text", fieldName, index);
      if (index) {
        // setPermissionsUpdate((prev)=>())
      }
      const t = { ...form };
      if (fieldName === "name") {
        t[fieldName] = text;
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
    [changeTextData]
  );

  const handleDelete = useCallback(() => {
    // dispatch(actionDeleteProduct(id));
    // setIsDialog(false);
    // historyUtils.push("/product");
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
  };
};

export default useUserRolesCreateHook;
