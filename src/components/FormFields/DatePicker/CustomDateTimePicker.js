import React, { Component, useMemo } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

const CustomDateTimePicker = ({
  onChange,
  minDate,
  isError,
  maxDate,
  value,
  label,
  clearable,
}) => {
  const handleOnChange = (e, d) => {
    // const tempDate  = new Date(e);
    // const formattedDate = tempDate.getDate() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getFullYear();
    // console.log(formattedDate);
    onChange && onChange(e);
  };

  const mD = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 10);
    return maxDate ? maxDate : d;
  }, [maxDate]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        clearable
        margin="dense"
        variant="inline"
        id="time-picker"
        fullWidth
        label={label}
        value={value ? value : null}
        onChange={handleOnChange}
        inputVariant={"outlined"}
        // format={
        //     "dd-MM-yyyy HH:mm"
        // }
        error={isError ? true : false}
        minDate={minDate}
        maxDate={mD}
        showTodayButton
        keyboardIcon={
          <AccessTimeIcon style={isError ? { color: "#ff493f" } : {}} />
        }
        // KeyboardButtonProps={{
        //     'aria-label': 'change time',
        // }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default CustomDateTimePicker;
