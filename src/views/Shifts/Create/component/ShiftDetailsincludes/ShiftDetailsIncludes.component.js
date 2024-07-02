import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
} from "react";
import LogUtils from "../../../../../libs/LogUtils";
import { useParams } from "react-router";
import ShiftDetailsIncludeFields from "./ShiftDetailsIncludeFields.component";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import { isDate } from "../../../../../libs/RegexUtils";

const TEMP_OBJ = {
  name: "",
  week_day: "",
  start_time: new Date(0, 0, 0, 10, 0),
  end_time: new Date(0, 0, 0, 10, 0),
  total_hours: null,
  is_week_off: false,
  is_sunday_occasional_working: false,
  working_sundays: [],
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

  const validateData = (index, type) => {
    const errors = {};
    fields.forEach((val, index) => {
      const err = {};
      const required = [];
      if (!val?.is_week_off) {
        required.push("start_time", "end_time");
      }

      required.forEach((key) => {
        if (!val[key]) {
          err[key] = true;
        } else if (key === "details") {
          if (val[key].trim() === "") {
            err[key] = true;
          }
        }
      });
      required.forEach((key) => {
        if (!val[key]) {
          err[key] = true;
        }
      });
      if (val?.start_time && !isDate(val?.start_time)) {
        SnackbarUtils.error("Please enter the valid Time");
        err["start_time"] = true;
      }
      if (val?.end_date && !isDate(val?.end_date)) {
        SnackbarUtils.error("Please enter the valid Time");
        err["end_date"] = true;
      }
      if (val?.total_hours && val?.total_hours < 0) {
        err["total_hours"] = true;
        SnackbarUtils.error("Start time cannot be less than End time");
      }
      if (
        val?.is_sunday_occasional_working &&
        val?.working_sundays?.length === 0
      ) {
        err["working_sundays"] = true;
      }
      if (Object.keys(err)?.length > 0) {
        errors[index] = err;
      }
    });

    setErrorData(errors);
    return !(Object.keys(errors).length > 0);
  };
  useEffect(() => {
    if (data) {
      setFields({ ...data });
    }
  }, [data]);

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
            fieldLendth={fields?.length}
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

  return <>{renderFields}</>;
};

export default forwardRef(ShiftDetailsIncludeForm);
