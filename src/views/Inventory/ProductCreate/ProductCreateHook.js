import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  isAlphaNumChars, isNum, isAlpha
} from "../../../libs/RegexUtils";
import { useSelector, useDispatch } from "react-redux";

import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useParams } from "react-router";
import Constants from "../../../config/constants";
import RouteName from "../../../routes/Route.name";
import { serviceGetList } from "../../../services/Common.service";
import {
  serviceCreateProduct,
  serviceGetProductDetails,
  serviceUpdateProduct,
  serviceDeleteProductImage
} from "../../../services/Product.service";
import {
  actionDeleteProduct,
} from "../../../actions/Product.action";
import {
  actionFetchSubcategory,
} from "../../../actions/Subcategory.action";
import historyUtils from "../../../libs/history.utils";

const initialForm = {
  is_active: true,
  name_en: "",
  name_hi: "",
  image: "",
  code: "",
  category_id: "",
  sub_category_id: "",
  unit_ids: "",
  type: "",
  min_qty: 0,
  max_qty: 0,
  is_negative_allowed: false,
  is_batch_wise: false,
  is_first_in_first_out: false,

};

const useProductDetail = ({ handleToggleSidePannel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [subcatList, setSubcatList] = useState()
  const [isEdit, setIsEdit] = useState(false);
  const [isDialog, setIsDialog] = useState(false);

  const includeRef = useRef(null);
  const { id } = useParams();
  const [listData, setListData] = useState({
    UNITS:[],
    CATEGORIES:[],
    SUB_CATEGORIES:[]
  })
  const dispatch = useDispatch();
  const [defaultImg, setDefaultImg] = useState("");
  const [productDetail, setProductDetail] = useState();
  const [unitSelected,setUnitSelected] = useState()
  const [subcategoryId,setSubcategoryId] = useState()

  const {
    all, data, sorting_data: sortingData,

  } = useSelector((state) => state.subcategory);
  useEffect(() => {
    if (id) {
      serviceGetProductDetails({ id: id }).then((res) => {
        if (!res.error) {
          const dataVal = res?.data?.details;
          console.log('data', dataVal)
          setDefaultImg(dataVal?.image);
          setUnitSelected(dataVal?.units[0]?.name)
          setProductDetail(dataVal)
          setSubcategoryId(dataVal?.sub_category_id)
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
          const dataItem = { image: "" };
          Object.keys({ ...initialForm }).forEach((key) => {
            if (key in initialForm && key !== "image" & key != "is_active") {
              dataItem[key] = dataVal[key];
            }
          });
          setForm({
            ...initialForm, ...dataItem,
            id: dataVal?.id,
            is_active: dataVal?.status === Constants.GENERAL_STATUS.ACTIVE,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [id]);
  useEffect(() => {
    serviceGetList(["UNITS", "CATEGORIES","SUB_CATEGORIES"]).then(res => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  const addSubcatData = useCallback((value) => {
    console.log('value', value)
    // if(form?.category_id ==0)
    const payload = {
      index: 1,
      category_id: value
    }
    dispatch(
      actionFetchSubcategory(1, sortingData, {
        query: null,
        query_data: null,
        category_id: value
      }
      )
    );
    // setSubcatList(data)

    // console.log('listjsfhsxu', data)

  }, [])
  console.log('listjsfhsxu', data)
  const toggleConfirmDialog = useCallback((type) => {
    // setDialogType(type);
    setIsDialog(e => !e);
  }, [setIsDialog]);

  const dialogText = useMemo(() => {

    return (<p>
      Are you sure you want to{" "}
      <strong>SHORTLIST CANDIDATES - </strong>. The
      candidates once shortlisted will be sent automatic email regarding
      interview.
    </p>);

  }, [])
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name_en", "name_hi", "category_id", "code", "sub_category_id", "min_qty", "max_qty", "unit_ids", "type"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      }
      if (form?.["max_qty"] < form?.["min_qty"]) {
        errors["max_qty"] = true
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
    setIsLoading(true)
    if (!isSubmitting) {
      setIsSubmitting(true);
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (['unit_ids'].indexOf(key) < 0) {
          fd.append(key, form[key]);
        }
      });
      fd.append('unit_ids', JSON.stringify(form?.unit_ids));

      if (id) {
        console.log('id', id)
        console.log('fd', fd)
        serviceUpdateProduct(fd)
          .then((res) => {
            if (!res.error) {
              console.log('idrierei')
              setIsLoading(false)

              historyUtils.push("/product");
            } else {
              console.log('res', res)
              setIsLoading(false)

              // if(res?.err)
              SnackbarUtils.error(res.message);
            }
            setIsSubmitting(false);
          });
      } else {
        serviceCreateProduct(fd)
          .then((res) => {
            if (!res.error) {
              console.log('idrierei')
              setIsLoading(false)

              historyUtils.push("/product");
            } else {
              setIsLoading(false)

              console.log('res', res)
              if (res?.message == "Code already exists") {
                const temp = JSON.parse(JSON.stringify(errorData));
                temp["code"] = true;
                setErrorData(temp);
                SnackbarUtils.error("Product code already exists");

              } else {
                SnackbarUtils.error(res.message);

              }
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
      if (fieldName === "name_en" || fieldName === "name_hi") {
        if (!text || (isAlpha(text) && text.toString().length <= 30)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "max_qty" || fieldName === "min_qty") {
        if (!text || (isNum(text) && text.toString().length <= 30)) {
          t[fieldName] = text;
        }
    }else if (fieldName ==="unit_ids"){
      const index = listData?.UNITS?.findIndex((obj) => obj.id === text);
      setUnitSelected(listData?.UNITS[index]?.name)
      t[fieldName] = text
    }else if (fieldName ==="sub_category_id"){
      setSubcategoryId(text)
      t[fieldName]=text
    }
      else {
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
    setIsDialog(false);

    historyUtils.push("/product");

  }, [id]);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);
  const handleRemoveImage = useCallback(() => {
    setDefaultImg("")
    setForm({
      ...form,
      image: "",
    });
    serviceDeleteProductImage({ id: id }).then((res) => {
      console.log(res)
    });
  })

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
    addSubcatData,
    data,
    isDialog,
    toggleConfirmDialog,
    dialogText,
    handleRemoveImage,
    unitSelected,
    subcategoryId
  };
};

export default useProductDetail;
