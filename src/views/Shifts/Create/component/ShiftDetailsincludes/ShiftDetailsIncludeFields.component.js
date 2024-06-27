import React, { useMemo } from "react";
import {
  TextField,
  ButtonBase,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import styles from "./style.module.css";
import CustomCheckbox from "../../../../../components/FormFields/CustomCheckbox";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { Autocomplete } from "@mui/material";
const ShiftDetailsIncludeFields = ({
  index,
  changeData,
  handlePress,
  data,
  errors,
  listData = [],
}) => {
  const handleChange = (e, fieldName) => {
    console.log(">>>>>", e, fieldName);
    if (fieldName) {
      changeData(index, { [fieldName]: e });
    } else {
      const name = e?.target?.name;
      const value = e?.target?.value;
      changeData(index, { [name]: value });
    }
  };
  console.log("data", data);
  return (
    <div>
      <div className={styles.flexContainer}>
        <div className={styles.formWrp}>
          <div className={styles.formGrphours}>sunday</div>
          <div className={styles.formGrp1}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                      <IconButton>
                        <AccessTimeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={styles.formGrp1}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                      <IconButton>
                        <AccessTimeIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={styles.formGrphours}>{data?.total_hours}</div>
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
                name={"isSame"}
                value={"isSame"}
                onClick={() => {
                  changeData(
                    !data?.is_sunday_occasional_working,
                    "is_sunday_occasional_working"
                  );
                }}
                className={styles.check}
                checked={data?.is_sunday_occasional_working}
              />{" "}
              <label className={styles.checkboxlabel}>
                {" "}
                Do you want Occasional Working On Sunday?
              </label>
              <br />
            </div>
          </div>
          <div className={styles.formGrp1}></div>
        </div>
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
              options={listData?.EMPLOYEES ? listData?.EMPLOYEES : []}
              getOptionLabel={(option) => option.name}
              defaultValue={data?.working_sundays}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Excluded Employees"
                  error={errors?.working_sundays}
                />
              )}
            />
          </div>
          <div className={styles.formGrp1}></div>
        </div>
        <div className={styles.firstRow221}>
          <div className={styles.btnWrap}>
            <ButtonBase
              className={styles.removeBtn}
              // label={this.props.index == 0 ? "+" : '-'}
              onClick={() => {
                handlePress(index == 0 ? "-" : "-", index);
              }}
            >
              {index == 0 ? "Remove" : "Remove"}
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftDetailsIncludeFields;
