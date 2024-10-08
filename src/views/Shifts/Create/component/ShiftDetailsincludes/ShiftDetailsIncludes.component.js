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
import { isDate, isInvalidDateFormat } from "../../../../../libs/RegexUtils";
import debounce from "lodash.debounce";

const TEMP_OBJ = {
  name: "",
  week_day: "",
  start_time: new Date(0, 0, 0, 10, 0),
  end_time: new Date(0, 0, 0, 10, 0),
  total_hours: null,
  is_week_off: false,
  is_occasional_working: false,
  occasional_working_days: [],
};

const ShiftDetailsIncludeForm = (
  { data, errorData: errorForm, isSidePanel },
  ref
) => {
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

  useEffect(() => {
    if (!isSidePanel) {
      setErrorData({});
    }
  }, [isSidePanel]);

  const validateData = (index, type) => {
    const errors = {};
    fields.forEach((val, index) => {
      const err = {};
      const required = [];
      if (!val?.is_week_off || (val?.is_week_off && val?.is_occasional_working)) {
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
        if (isInvalidDateFormat(val?.start_time)) {
          SnackbarUtils.error("Please enter the valid Time");
          err["start_time"] = true;
        }
      }
      if (val?.end_time && !isDate(val?.end_time)) {
        if (isInvalidDateFormat(val?.end_time)) {
          SnackbarUtils.error("Please enter the valid Time");
          err["end_time"] = true;
        }
      }
      if (val?.total_hours && val?.total_hours < 0) {
        err["start_time"] = true;
        err["end_time"] = true;
        SnackbarUtils.error("Start time cannot be less than End time");
      }
      if (val?.start_time && val?.end_time && val?.total_hours == 0) {
        err["start_time"] = true;
        err["end_time"] = true;
        SnackbarUtils.error("Start time cannot be same as End time");
      }
      if (
        val?.is_occasional_working &&
        val?.occasional_working_days?.length === 0
      ) {
        err["occasional_working_days"] = true;
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

    tempData[index] = { ...tempData[index], ...data };
    LogUtils.log("data", data);
    setFields(tempData);
    const errArr = [];
    Object.keys(data).forEach((key) => {
      errArr.push(key);
    });
    removeErrors(index, errArr);
  };

  const handleTime = (e, fieldName, ind) => {
    const temp = [...fields];
    const updateTime = temp?.map((item, index) => {
      if (
        (!item?.is_week_off && !item[fieldName]) ||
        index === ind ||
        (item?.is_week_off && item?.is_occasional_working)
      ) {
        return { ...item, [fieldName]: e };
      }
      return item;
    });
    setFields([...updateTime]);
  };

  const debouncedHandleTime = debounce(handleTime,2000);

  const handleChangedebounce = (e, fieldName, ind) => {
    debouncedHandleTime(e, fieldName, ind);
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
            handleChangedebounce={handleChangedebounce}
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
    isSidePanel,
    setErrorData,
  ]);

  return <>{renderFields}</>;
};

export default forwardRef(ShiftDetailsIncludeForm);
