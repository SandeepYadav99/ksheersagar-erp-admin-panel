import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  isAlphaNumChars,
} from "../../../libs/RegexUtils";
import { useSelector,useDispatch } from "react-redux";

import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useParams } from "react-router";
import Constants from "../../../config/constants";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/Common.service";
import {
  serviceCreateProduct,
  serviceGetProductDetails,
  serviceUpdateProduct,
} from "../../../services/Product.service";
import {
  actionDeleteProduct,
} from "../../../actions/Product.action";
import historyUtils from "../../../libs/history.utils";

const initialForm = {
  is_active: true,
  name_en: "",
  name_hi: "",
  image: "",
  code: "",
  category_id: "",
  sub_category_id: "",
  unit_ids: [],
  type: "",
  min_qty: 0,
  max_qty: 0,
  is_negative_allowed: false,
  is_batch_wise: false,
  is_first_in_first_out: true,

};

const useProductDetail = ({ handleToggleSidePannel, data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const includeRef = useRef(null);
  const { id } = useParams();
  const [listData, setListData] = useState()
  const dispatch = useDispatch();
  const [defaultImg, setDefaultImg] = useState("");

  useEffect(() => {
    if (id) {
      serviceGetProductDetails({ id: id }).then((res) => {
        if (!res.error) {
          const dataVal = res?.data?.details;
          console.log('data', dataVal)
          setDefaultImg(dataVal?.image);
          // Object.keys({ ...initialForm }).forEach((key) => {
          //   if (key in initialForm && key !== "image") {
          //     data[key] = dataVal[key];
          //   }
          // });
          // Object.keys({ ...dataVal }).forEach((key) => {
          //   if (key in initialForm && key !== "image" ) {
          //       data[key] = dataVal[key];
          //   }
          // });
          // setForm({...data});
          const data = { image: "" };
          Object.keys({ ...initialForm }).forEach((key) => {
            if (key in initialForm && key !== "image" & key!="is_active") {
              data[key] = dataVal[key];
            }
          });
          setForm({ ...initialForm, ...data,
          id:dataVal?.id,
          is_active: data?.status === Constants.GENERAL_STATUS.ACTIVE,
        });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [id]);
  useEffect(() => {
    serviceGetList(["UNITS", "CATEGORIES", "SUB_CATEGORIES"]).then(res => {
      if (!res.error) {
        setListData(res.data);
      }
    });


  }, []);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name_en", "name_hi", "category_id", "sub_category_id"];
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
    console.log('jenekfnek')
    if (!isSubmitting) {
      setIsSubmitting(true);
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (['unit_ids'].indexOf(key) < 0) {
          fd.append(key, form[key]);
        }
      });
      fd.append('unit_ids', JSON.stringify(form?.unit_ids));
      console.log('inital form data', fd)
      if (id) {
        console.log('id', id)
        console.log('fd', fd)
        serviceUpdateProduct(fd)
          .then((res) => {
            if (!res.error) {
              console.log('idrierei')
              historyUtils.push("/product");
            } else {
              SnackbarUtils.error(res.message);
            }
            setIsSubmitting(false);
          });
      } else {
        serviceCreateProduct(fd)
          .then((res) => {
            if (!res.error) {
              console.log('idrierei')
              historyUtils.push("/product");
            } else {
              SnackbarUtils.error(res.message);
            }
            setIsSubmitting(false);
          });
      }

    }
  }, [form, isSubmitting, setIsSubmitting, id]);

  const handleSubmit = useCallback(async () => {

    console.log('innnnnn')
    const errors = checkFormValidation();
    // console.log('dff',errors)
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    console.log('abnove')

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
  

  const handleDelete = useCallback(() => {
    dispatch(actionDeleteProduct(id));
    historyUtils.push("/product");

   }, [id]);

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
    defaultImg,

  };
};

export default useProductDetail;
