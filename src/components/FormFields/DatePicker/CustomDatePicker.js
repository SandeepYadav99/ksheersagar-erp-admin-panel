/**
 * Created by charnjeetelectrovese@gmail.com on 2/7/2020.
 */

import React, { useMemo } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const CustomDatePicker = ({
  onChange,
  minDate,
  isError,
  maxDate,
  value,
  label,
  clearable,
  ...rest
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

  if (clearable) {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          clearable
          margin="dense"
          variant="inline"
          id="time-picker"
          fullWidth
          label={label}
          value={value ? value : null}
          onChange={handleOnChange}
          inputVariant={"outlined"}
          format={"dd-MM-yyyy"}
          error={isError ? true : false}
          minDate={minDate}
          maxDate={mD}
          showTodayButton
          {...rest}
          // KeyboardButtonProps={{
          //     'aria-label': 'change time',
          // }}
        />
      </MuiPickersUtilsProvider>
    );
  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        margin="dense"
        variant="inline"
        id="time-picker"
        fullWidth
        label={label}
        value={value ? value : new Date()}
        onChange={handleOnChange}
        inputVariant={"outlined"}
        format={"dd-MM-yyyy"}
        error={isError}
        minDate={minDate}
        maxDate={mD}
        // KeyboardButtonProps={{
        //     'aria-label': 'change time',
        // }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default CustomDatePicker;
