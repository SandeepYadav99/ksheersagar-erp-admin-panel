import React, { useEffect, useMemo } from "react";
import { TextField } from "@material-ui/core";
import styles from "./style.module.css";
import CustomCheckbox from "../../../../../components/FormFields/CustomCheckbox";
import { Autocomplete } from "@mui/material";
import CustomDateTimePicker from "../../../../../components/FormFields/DatePicker/CustomDateTimePicker";

const getWorkingDays = {
  1: "First",
  2: "Second",
  3: "Third",
  4: "Fouth",
};

const ShiftDetailsIncludeFields = ({
  index,
  changeData,
  data,
  errors,
  fieldLendth,
}) => {
  const handleChange = (e, fieldName) => {
    if (fieldName) {
      changeData(index, { [fieldName]: e });
    } else {
      const name = e?.target?.name;
      const value = e?.target?.value;
      changeData(index, { [name]: value });
    }
  };

  useEffect(() => {
    if (data?.start_time && data?.end_time) {
      const starttime = new Date(data?.start_time);
      const endtime = new Date(data?.end_time);
      const timeDifferenceInMilliseconds = endtime - starttime;
      const timeDifferenceInHours =
        timeDifferenceInMilliseconds / (1000 * 60 * 60);

      const roundedTimeDifference =
        Math.round(timeDifferenceInHours * 100) / 100;

      changeData(index, {
        ["total_hours"]: roundedTimeDifference,
      });
    }
  }, [data?.start_time, data?.end_time]);

  useEffect(() => {
    if (!data?.is_sunday_occasional_working) {
      changeData(index, {
        ["working_sundays"]: [],
      });
    }
  }, [data?.is_sunday_occasional_working]);
  return (
    <div>
      <div className={styles.flexContainer}>
        <div className={styles.formWrp}>
          <div className={styles.formGrphours}>{data?.name}</div>
          <div className={styles.formGrp1}>
            <CustomDateTimePicker
              disabled={data?.is_week_off}
              label={"Choose Time"}
              value={data?.start_time}
              onChange={(e) => handleChange(e, "start_time")}
              isError={errors?.start_time}
            />
            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                margin="dense"
                variant="inline"
                id="time-picker"
                fullWidth
                label={"Choose Time"}
                value={data?.start_time}
                onChange={(e) => handleChange(e, "start_time")}
                inputVariant={"outlined"}
                minutesStep={5}
                // format="HH:mm"
                format="h:mm a"
                error={errors?.start_time}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        style={errors?.end_time ? { color: "#ff493f" } : {}}
                      >
                        <AccessTimeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </MuiPickersUtilsProvider> */}
          </div>
          <div className={styles.formGrp1}>
            <CustomDateTimePicker
              disabled={data?.is_week_off}
              label={"Choose Time"}
              value={data?.end_time}
              onChange={(e) => handleChange(e, "end_time")}
              isError={errors?.end_time}
            />
            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <TimePicker
                margin="dense"
                variant="inline"
                id="time-picker"
                fullWidth
                label={"Choose Time"}
                value={data?.end_time}
                onChange={(e) => handleChange(e, "end_time")}
                inputVariant={"outlined"}
                minutesStep={5}
                // format="HH:mm"
                format="h:mm a"
                error={errors?.end_time}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        style={errors?.end_time ? { color: "#ff493f" } : {}}
                      >
                        <AccessTimeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </MuiPickersUtilsProvider> */}
          </div>
          <div className={styles.formGrphours}>
            {data?.total_hours ? data?.total_hours : 0}
          </div>
          <div className={styles.formGrp}>
            <CustomCheckbox
              color={"primary"}
              handleChange={() => {
                changeData(index, {
                  is_week_off: !data?.is_week_off,
                });
              }}
              // label={"Shortlist Approval"}
              checked={data?.is_week_off}
            />
          </div>
        </div>
        <div className={styles.formWrp}>
          <div className={styles.formGrp}></div>
          <div className={styles.formGrp14}>
            {" "}
            <div className={styles.checkBox}>
              <input
                type="checkbox"
                name={"is_sunday_occasional_working"}
                onClick={() => {
                  changeData(index, {
                    is_sunday_occasional_working:
                      !data?.is_sunday_occasional_working,
                  });
                }}
                className={styles.check}
                value={data?.is_sunday_occasional_working}
                checked={data?.is_sunday_occasional_working}
              />{" "}
              <label className={styles.checkboxlabel}>
                Do you want Occasional Working On {data?.name}?
              </label>
              <br />
            </div>
          </div>
          <div className={styles.formGrp1}></div>
        </div>
        {data?.is_sunday_occasional_working && (
          <div className={styles.formWrp}>
            <div className={styles.formGrp}></div>
            <div className={styles.formGrp14}>
              {" "}
              <Autocomplete
                multiple
                id="tags-outlined"
                onChange={(e, value) => {
                  handleChange(value, "working_sundays");
                }}
                value={data?.working_sundays}
                // id="tags-standard"
                options={[1, 2, 3, 4]}
                getOptionLabel={(option) => getWorkingDays[option]}
                defaultValue={data?.working_sundays}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Choose Working Days"
                    error={errors?.working_sundays}
                  />
                )}
              />
            </div>
            <div className={styles.formGrp1}></div>
          </div>
        )}
      </div>
      {fieldLendth !== index + 1 && (
        <div className={styles.horizontalLine}></div>
      )}
    </div>
  );
};

export default ShiftDetailsIncludeFields;
