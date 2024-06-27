import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
} from "react";
import styles from "./style.module.css";
import { ButtonBase, } from "@material-ui/core";
import LogUtils from "../../../../../libs/LogUtils";
import { Add } from "@material-ui/icons";
import { useParams } from "react-router";
import ShiftDetailsIncludeFields from "./ShiftDetailsIncludeFields.component";


const TEMP_OBJ = {
  bill_date: "",
  bill_no: "",
  amount: "",
  details: "",
  relocation_documents: null,
  payment_mode: "",
  relocation_payment_proof: null,
};

const ShiftDetailsIncludeForm = ({ data, errorData: errorForm }, ref) => {
  const [fields, setFields] = useState([JSON.parse(JSON.stringify(TEMP_OBJ))]);
  const [errorData, setErrorData] = useState({});
  const [variants, setVariants] = useState([]);
  const { id } = useParams();
  useImperativeHandle(ref, () => ({
    isValid() {
      return validateData();
    },
    resetData() {
      setFields([JSON.parse(JSON.stringify(TEMP_OBJ))]);
    },
    getData() {
      return fields;
    },
    setData(data) {
      setFields([...data]);
    },
  }));

  const getState = () => {
    return fields;
  };

  const validateData = (index, type) => {
    const errors = {};
    fields.forEach((val, index) => {
      const err =
        index in errorData ? JSON.parse(JSON.stringify(errorData[index])) : {};
      const required = [
        "bill_date",
        "bill_no",
        "amount",
        "details",
        "relocation_documents",
        "payment_mode",
        "relocation_payment_proof",
      ];
      required.forEach((key) => {
        if (!val[key]) {
          err[key] = true;
        } else if (key === "amount" || key === "details") {
          // Check for empty space in "amount" and "details"
          if (val[key].trim() === "") {
            // || /^\s/.test(val[key]) if not want starting space
            err[key] = true;
          }
        }
      });
      required.forEach((key) => {
        if (!val[key]) {
          err[key] = true;
        }
      });
      if (val?.payment_mode === "Cash" && !val?.relocation_payment_proof) {
        delete err["relocation_payment_proof"];
      }
      // if (val?.bill_date && !isDate(val?.bill_date)) {
      //   if (isInvalidDateFormat(val?.bill_date)) {
      //     err["bill_date"] = true;
      //   }
      // }
      // if (val?.check_in && val?.check_out) {
      //   const joinDate = new Date(val?.check_in);
      //   const expectedDate = new Date(val?.check_out);
      //   joinDate.setHours(0, 0, 0, 0);
      //   expectedDate.setHours(0, 0, 0, 0);
      //   if (joinDate.getTime() > expectedDate.getTime()) {
      //     err["check_out"] = true;
      //     SnackbarUtils.error(
      //       "CheckOut Date should not be Less than CheckIn Date"
      //     );
      //   }
      // }
      if (Object.keys(err)?.length > 0) {
        errors[index] = err;
      }
    });

    console.log("othererroros", errors);
    setErrorData(errors);
    return !(Object.keys(errors).length > 0);
  };
  useEffect(() => {
    if (data) {
      setFields({ ...data });
    }
  }, [data]);

  const isValid = () => {
    return validateData();
  };

  const removeErrors = useCallback(
    (index, key) => {
      const errors = JSON.parse(JSON.stringify(errorData));
      if (errors[index] != undefined) {
        if (Array.isArray(key)) {
          key.forEach((k) => {
            delete errors[index][k];
          });
        } else {
          delete errors[index][key];
        }
        setErrorData(errors);
      }
    },
    [setErrorData, errorData]
  );

  const changeData = (index, data, dateValue) => {
    const tempData = [...fields];
    if (dateValue) {
      tempData.forEach((item) => (item.travel_date = ""));
    } else {
      tempData[index] = { ...tempData[index], ...data };
    }
    LogUtils.log("data", data);
    setFields(tempData);
    const errArr = [];
    Object.keys(data).forEach((key) => {
      errArr.push(key);
    });
    removeErrors(index, errArr);
  };

  const onBlur = useCallback(() => {}, []);
  const handlePress = async (type, index = 0) => {
    LogUtils.log("type", type, index);
    const oldState = [...fields];
    if (type == "ADDITION") {
      oldState.push(TEMP_OBJ);
    } else {
      if (oldState.length === 1) {
        return true;
      }
      oldState.splice(index, 1);
    }
    LogUtils.log("oldState", oldState);
    setFields(oldState);
    // validateData();
  };
  const renderFields = useMemo(() => {
    return fields.map((val, index) => {
      const tempFilters = variants.filter((variant) => {
        const index = fields.findIndex((val) => val?.sku?.sku === variant?.sku);
        return index < 0;
      });
      return (
        <div>
          <ShiftDetailsIncludeFields
            variants={tempFilters}
            validateData={validateData}
            errors={index in errorData ? errorData[index] : null}
            changeData={changeData}
            handlePress={handlePress}
            data={val}
            index={index}
            onBlur={onBlur}
          />
        </div>
      );
    });
  }, [
    variants,
    errorData,
    validateData,
    changeData,
    handlePress,
    onBlur,
    fields,
  ]);

  return (
    <>
      {renderFields}
      <div className={styles.btnWrapper}>
        <ButtonBase
          className={styles.addition}
          label={"+"}
          onClick={() => {
            handlePress("ADDITION", 0);
          }}
        >
          <Add fontSize={"small"} /> <span>Add More</span>
        </ButtonBase>
      </div>
    </>
  );
};

export default forwardRef(ShiftDetailsIncludeForm);
