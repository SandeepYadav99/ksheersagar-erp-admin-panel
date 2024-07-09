import { useCallback, useEffect, useMemo, useState } from "react";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import { serviceGetShiftsDelete } from "../../../../../services/Shifts.service";
import { serviceGetList } from "../../../../../services/Common.service";
import { useDispatch } from "react-redux";
import { actionFetchShifts } from "../../../../../actions/ShiftsLists.action";

const initialForm = {
  replacement_shift_id: "",
};
const useDeleteDialogHook = ({ isOpen, handleToggle, deleteId }) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [resData, setResData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [declaration, setDeclaration] = useState(false);
  const dispatch = useDispatch();

  const [listData, setListData] = useState({
    SHIFTS: [],
  });
  useEffect(() => {
    serviceGetList(["SHIFTS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  const updatedList = useMemo(() => {
    if (listData?.SHIFTS?.length > 0) {
      return listData?.SHIFTS?.filter((item) => item?.name !== deleteId?.name);
    }
    return [];
  }, [listData,deleteId]);
  
  useEffect(() => {
    if (isOpen) {
      const defaultId =
        listData?.SHIFTS?.length > 0
          ? listData?.SHIFTS?.find((key) => key?.is_default)
          : {};
      setForm({
        replacement_shift_id: defaultId?.id,
      });
      setResData([]);
      setIsSubmitted(false);
      setErrorData({});
    }
  }, [isOpen, listData]);

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
      t[fieldName] = text;
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["replacement_shift_id"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if ([].indexOf(val) < 0) {
        delete errors[val];
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
      serviceGetShiftsDelete({
        ...form,
        id: deleteId?.id,
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Shift deleted successfully");
          handleToggle();
          dispatch(actionFetchShifts(1, {}, {}));
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle, deleteId]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("===?", form, errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, submitToServer, deleteId]);

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  return {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    setDeclaration,
    declaration,
    listData,
    updatedList
  };
};

export default useDeleteDialogHook;
