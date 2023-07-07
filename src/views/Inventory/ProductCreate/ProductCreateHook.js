import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  isAlphaNumChars,
} from "../../../libs/RegexUtils";
import {useSelector} from "react-redux";

import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useParams } from "react-router";
import Constants from "../../../config/constants";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/Common.service";
import { serviceCreateProduct,
  // serviceGetCategoryDetails,
  // serviceUpdateCategory
  // serviceGetUnitDetails, serviceUpdateUnit
} from "../../../services/Product.service";
import historyUtils from "../../../libs/history.utils";

const initialForm = {
  is_active: true,
  name_en:"",
  name_hi:"",
  image:"",
  code:"",
  category_id:"",
  sub_category_id:"",
  unit_ids:[],
  type:"",
  min_qty:0,
  max_qty:0,
  is_negative_allowed:false,
  is_batch_wise:false,
  is_first_in_first_out:true,

};

const useProductDetail = ({ handleToggleSidePannel,data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const includeRef = useRef(null);
  const { id } = useParams();
  const [ listData,setListData]=useState()
  const {category_id} = useSelector(state => state.category);
  console.log('id',category_id)

  useEffect(() => {
    // if (category_id !==0) {
    //   serviceGetCategoryDetails({ id: category_id }).then((res) => {
    //     if (!res.error) {
    //       const data = res?.data?.details;
    //       console.log('data',data)
    //       setForm({
    //         // ...data,
    //         id:data?.id,
    //         name:data?.name,
    //         is_active: data?.status === Constants.GENERAL_STATUS.ACTIVE,
    //       });
    //     } else {
    //       SnackbarUtils.error(res?.message);
    //     }
    //   });
    // }
  }, [category_id]);
  useEffect(() => {
    serviceGetList(["UNITS","CATEGORIES","SUB_CATEGORIES"]).then(res => {
      if (!res.error) {
        setListData(res.data);
      }
    });


  }, []);
  console.log('form',listData)
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name_en","name_hi","category_id","sub_category_id"];
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
        // LogUtils.log("key", key);
        if (['unit_ids'].indexOf(key) < 0) {
          fd.append(key, form[key]);
        }
      });
      fd.append('unit_ids', JSON.stringify(form?.unit_ids));
      // let req = serviceCreateProduct;
      // if (category_id !==0) {
      //   // req = serviceUpdateCategory;
      // }
      // req({
      //   ...form,
      // })
      serviceCreateProduct(fd)
      .then((res) => {
        if (!res.error) {
          console.log('idrierei')
          historyUtils.push("/employees");

          // handleToggleSidePannel();
          // window.location.reload();
        } else {
          SnackbarUtils.error(res.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, id]);

  const handleSubmit = useCallback(async () => {

    console.log('innnnnn')
    const errors = checkFormValidation();
    console.log('dff',errors)
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
    id,
    category_id,
    listData
  };
};

export default useProductDetail;
