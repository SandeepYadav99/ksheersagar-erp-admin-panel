import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  isAlphaNumChars,
  isNum,
  isAlpha,
  positiveNumber,
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
  serviceDeleteProductImage,
} from "../../../services/Product.service";
import { actionDeleteProduct } from "../../../actions/Product.action";
import { actionFetchSubcategory } from "../../../actions/Subcategory.action";
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
  min_qty: "",
  max_qty: "",
  is_negative_allowed: false,
  is_batch_wise: false,
  is_first_in_first_out: false,

  gst_slab: "",
  expire_day: "",
  price: "",
  dead_weight: "",
  max_capacity: "",
  lanes: "",
  applicable_for: "",

  // selling_price: "",
};

const useProductDetail = ({ isSidePanel, handleToggleSidePannel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [subcatList, setSubcatList] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isDialog, setIsDialog] = useState(false);

  const includeRef = useRef(null);
  const { id } = useParams();
  const [listData, setListData] = useState({
    UNITS: [],
    CATEGORIES: [],
    SUB_CATEGORIES: [],
  });
  const dispatch = useDispatch();
  const [defaultImg, setDefaultImg] = useState("");
  const [productDetail, setProductDetail] = useState();
  const [unitSelected, setUnitSelected] = useState();
  const [subcategoryId, setSubcategoryId] = useState();
  const [finishedGood, setFinishedGood] = useState(false);
  const [mithaiBox, setMithaiBox] = useState(false);
  const [categoryIdSelect, setCategoryIdSelect] = useState("");
  const {
    all,
    data,
    sorting_data: sortingData,
  } = useSelector((state) => state.subcategory);

  useEffect(() => {
    if (id) {
      serviceGetProductDetails({ id: id }).then((res) => {
        if (!res.error) {
          const dataVal = res?.data?.details;
          console.log("data", dataVal);
          setDefaultImg(dataVal?.image);
          setUnitSelected(dataVal?.units[0]?.name);
          setProductDetail(dataVal);
          setSubcategoryId(dataVal?.sub_category_id);
          setCategoryIdSelect(dataVal?.category?.id);
          if (dataVal.type === "PACKAGING") {
            setMithaiBox(true);
          }
          if (dataVal.type === "FINISHED_GOODS") {
            setFinishedGood(true);
          }
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
            if (
              key in initialForm &&
              (key !== "image") & (key != "is_active")
            ) {
              dataItem[key] = dataVal[key];
            }
          });
          setForm({
            ...initialForm,
            ...dataItem,
            id: dataVal?.id,
            applicable_for: dataVal?.applicableFor,
            unit_ids: dataVal?.units[0]?.id,
            is_active: dataVal?.status === Constants.GENERAL_STATUS.ACTIVE,
            category_id: dataVal?.category?.id,
          });
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [id, setMithaiBox, setFinishedGood, setCategoryIdSelect]);
  useEffect(() => {
    serviceGetList(["UNITS", "CATEGORIES", "SUB_CATEGORIES"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);
  useEffect(() => {
    if (categoryIdSelect) {
      addSubcatData(categoryIdSelect);
    }
  }, [categoryIdSelect]);

  const addSubcatData = useCallback(
    (value) => {
      const payload = {
        index: 1,
        category_id: [value],
      };
      console.log(categoryIdSelect);
      dispatch(
        actionFetchSubcategory(1, sortingData, {
          query: null,
          query_data: null,
          category_id: value ? [value] : [categoryIdSelect],
        })
      );
      // setSubcatList(data)

      // console.log('listjsfhsxu', data)
    },
    [categoryIdSelect, id, dispatch]
  );

  const toggleConfirmDialog = useCallback(
    (type) => {
      // setDialogType(type);
      setIsDialog((e) => !e);
    },
    [setIsDialog]
  );

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  const dialogText = useMemo(() => {
    return (
      <p>
        Are you sure you want to <strong>SHORTLIST CANDIDATES - </strong>. The
        candidates once shortlisted will be sent automatic email regarding
        interview.
      </p>
    );
  }, []);
  console.log(form);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      // "daysExpiration",
      // "gst_slab",
      "name_en",
      "name_hi",
      "category_id",
      "code",
      "sub_category_id",
      "min_qty",
      "max_qty",
      "unit_ids",
      "type",
      ...(mithaiBox
        ? ["dead_weight", "lanes", "max_capacity", "price"]
        : []),
      ...(finishedGood ? ["price"] : []),
    ];

    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      }
    });
    console.log(form);
    if (Number(form?.["max_qty"]) < Number(form?.["min_qty"])) {
      errors["max_qty"] = "Max quantity should be greater than min quantity";
    } else if (Number(form?.["max_qty"]) === 0) {
      errors["max_qty"] = true;
    } else {
      delete errors.max_qty;
    }

    if (Number(form?.["min_qty"]) === 0) {
      errors["min_qty"] = true;
    } else {
      delete errors.min_qty;
    }
    if (form?.sub_category_id === " ") {
      errors.sub_category_id = true;
    } else {
      // delete errors.sub_category_id;
    }
    // if(!form?.category_id){
    //   SnackbarUtils.error("Please select the category first");
    // }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData, finishedGood, mithaiBox]);
  console.log(form);
  const submitToServer = useCallback(() => {
    setIsLoading(true);
    if (!isSubmitting) {
      setIsSubmitting(true);
      const industryID =
        Array.isArray(form.applicable_for) && form.applicable_for.length > 0
          ? form.applicable_for.map((item) => item.id || item._id)
          : [];
      const unitID = [form?.unit_ids];
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (key === "gst_slab") {
          console.log(form[key]);
          fd.append(key, form[key] ? form[key] : "0");
        } else if (key === "dead_weight") {
          fd.append(key, form[key] ? form[key] : "");
        } else if (key === "max_capacity") {
          fd.append(key, form[key] ? form[key] : "");
        } else if (key === "lanes") {
          fd.append(key, form[key] ? form[key] : "");
        } else if (key === "selling_price") {
          fd.append(key, form[key] ? form[key] : "");
          
        } else if (key === "price") {
          fd.append(key, form[key] ? form[key] : "");
         
        } else if (key === "applicable_for") {
          fd.append(key, JSON.stringify(industryID));
         
        } else if (key === "expire_day") {
          fd.append(key, form[key] ? form[key] : 0);
        
        } else if (key === "unit_ids") {
          // if (["unit_ids"].indexOf(key) < 0) {
          fd.append(key, JSON.stringify(unitID));
          // }
        } else {
          fd.append(key, form[key]);
        }
      });
      // fd.append("unit_ids", JSON.stringify(form?.unit_ids));

      if (id) {
        serviceUpdateProduct(fd).then((res) => {
          if (!res.error) {
            setIsLoading(false);

            historyUtils.push("/product");
          } else {
            setIsLoading(false);

            // if(res?.err)
            SnackbarUtils.error(res.message);
          }
          setIsSubmitting(false);
        });
      } else {
        serviceCreateProduct(fd).then((res) => {
          if (!res.error) {
            setIsLoading(false);

            historyUtils.push("/product");
          } else {
            setIsLoading(false);

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
    const errors = checkFormValidation();
    // console.log('dff',errors)
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      console.log({ errors });
      return true;
    }
    console.log("abnove");

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
      if (fieldName === "name_en") {
        if (!text || (isAlpha(text) && text.toString().length <= 30)) {
          t[fieldName] = text;
        }
      }
      if (fieldName === "name_hi") {
        t[fieldName] = text.toString();
      } else if (
        // fieldName === "max_qty" ||
        // fieldName === "min_qty" ||
        fieldName === "expire_day"
        // fieldName === "price" ||
        // fieldName === "lanes"
      ) {
        if (!text || (isNum(text) && text.toString().length <= 30)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "unit_ids") {
        const index = listData?.UNITS?.findIndex((obj) => obj.id === text);
        setUnitSelected(listData?.UNITS[index]?.name);
        t[fieldName] = text;
      } else if (fieldName === "max_qty" || fieldName === "min_qty") {
        if (isNum(text)) {
          t[fieldName] = text;
        }
      } else if (
        fieldName === "dead_weight" ||
        fieldName === "max_capacity" ||
        fieldName === "selling_price" ||
        fieldName === "lanes" ||
        fieldName === "price"
      ) {
        const value = parseFloat(text);
        if (!isNaN(value) && value >= 0) {
          t[fieldName] = text;
        } else if (text === "") {
          t[fieldName] = "";
        } else {
          t[fieldName] = ""; // Reset on invalid input
        }
      } else if (fieldName === "category_id") {
        t["sub_category_id"] = " ";
        t[fieldName] = text;
        addSubcatData(text);
      } else if (fieldName === "sub_category_id") {
        // setSubcategoryId(text);

        t[fieldName] = text;
      } else if (fieldName === "type") {
        if (text === "FINISHED_GOODS") {
          setFinishedGood(true);
          setMithaiBox(false);
        } else if (text === "PACKAGING") {
          setMithaiBox(true);
          setFinishedGood(false);
        } else {
          setFinishedGood(false);
          setMithaiBox(false);
        }
        t[fieldName] = text;
      } else if (fieldName === "applicable_for") {
        t[fieldName] = text?.filter((item, index, self) => {
          return (
            index ===
            self.findIndex((i) => i.id === item.id && i._id === item._id)
          );
        });
      } else if (fieldName === "deadWeight") {
        t[fieldName] = text;
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [
      removeError,
      form,
      setForm,
      setMithaiBox,
      setFinishedGood,
      addSubcatData,
      categoryIdSelect,
      mithaiBox,
    ]
  );
  console.log(errorData);

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
    setErrorData({});
  }, [form, errorData]);
  const handleRemoveImage = useCallback(() => {
    setDefaultImg("");
    setForm({
      ...form,
      image: "",
    });
    serviceDeleteProductImage({ id: id }).then((res) => {
      console.log(res);
    });
  });

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
    subcategoryId,
    setFinishedGood,
    finishedGood,
    mithaiBox,
    setMithaiBox,
  };
};

export default useProductDetail;
