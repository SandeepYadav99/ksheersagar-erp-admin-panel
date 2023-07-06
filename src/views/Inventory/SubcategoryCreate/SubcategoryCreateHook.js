import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  isAlphaNumChars,
} from "../../../libs/RegexUtils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useParams } from "react-router";
import Constants from "../../../config/constants";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/Common.service";
// import { serviceGetList } from "../../services/Common.service";
import {
  serviceCreateSubcategory,
  serviceGetSubcategoryDetails,
  serviceUpdateSubcategory
  // serviceGetUnitDetails, serviceUpdateUnit 
} from "../../../services/Subcategory.service";
import { useSelector } from "react-redux";
const initialForm = {
  name: "",
  // is_general: false,
  category_id: "",
  unit_id: "",
  is_active: true,
};

const useSubcategoryDetail = ({ handleToggleSidePannel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const includeRef = useRef(null);
  const { id } = useParams();
  const [listData, setListData] = useState();
  const { subcategory_id } = useSelector(state => state.subcategory);

  useEffect(() => {
    console.log('sjfjsfh')

    if (subcategory_id !== 0) {
      serviceGetSubcategoryDetails({ id: subcategory_id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          console.log('fgfgfffbf',data)
          setForm({
            // ...data,
            name: data?.name,
            unit_id: data?.unit_id,
            category_id: data?.category_id,
            id: subcategory_id,
            is_active: data?.status === Constants.GENERAL_STATUS.ACTIVE,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [subcategory_id]);
  useEffect(() => {
    serviceGetList(["UNITS"]).then(res => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  console.log('form', form)
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

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      let req = serviceCreateSubcategory;
      if (subcategory_id !== 0) {
        req = serviceUpdateSubcategory;
      }
      req({
        ...form,
        category_id: id
      }).then((res) => {
        if (!res.error) {
          handleToggleSidePannel();

          console.log('jherjhej')
          // window.location.reload();
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, includeRef.current]);

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
        if (!text || (isAlphaNumChars(text) && text.toString().length <= 30)) {
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
    [changeTextData]
  );

  const handleDelete = useCallback(() => { }, []);

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
    id,
    listData,
    subcategory_id
  };
};

export default useSubcategoryDetail;
