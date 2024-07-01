import React from "react";
import styles from "./Style.module.css";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import useEventFormHook from "./EventForm.hook";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import {
  Button,
  ButtonBase,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

const EventForm = ({ isOpen, handleToggle, editData, renderList }) => {
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    removeError,
    isSubmitted,
    isSubmitting,
    listData,
    handleDelete,
  } = useEventFormHook({ isOpen, handleToggle, editData, renderList });

  return (
    <div>
      <div className={styles.resetPasswordWrapper}>
        <div className={styles.fieldWrapper}>
          <CustomTextField
            isError={errorData?.name}
            errorText={errorData?.name}
            label={"Holiday Name*"}
            value={form?.name}
            onTextChange={(text) => {
              changeTextData(text, "name");
            }}
            onBlur={() => {
              onBlurHandler("name");
            }}
          />
          <CustomSelectField
            isError={errorData?.holiday_type}
            errorText={errorData?.holiday_type}
            label={"Choose Holiday Type*"}
            value={form?.holiday_type}
            handleChange={(value) => {
              changeTextData(value, "holiday_type");
            }}
          >
            <MenuItem value="GAZETTED">GAZETTED</MenuItem>
            <MenuItem value="OPTIONAL">OPTIONAL</MenuItem>
            <MenuItem value="RESTRICTED">RESTRICTED</MenuItem>
          </CustomSelectField>
          <RadioGroup
            aria-label="option"
            name="type"
            value={form?.type}
            onChange={(e) => changeTextData(e.target.value, "type")}
            row
            className={styles.radioWrap}
          >
            <FormControlLabel
              value="FULL_DAY"
              control={<Radio />}
              label="Full Day"
            />
            <FormControlLabel
              value="HALF_DAY"
              control={<Radio />}
              label="Half Day"
            />
          </RadioGroup>
          {form?.type === "FULL_DAY" ? (
            <>
              <CustomDatePicker
                clearable
                label={"Start Date"}
                // minDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "start_date");
                }}
                value={form?.start_date}
                isError={errorData?.start_date}
              />
              <CustomDatePicker
                clearable
                label={"End Date"}
                // minDate={new Date()}
                onChange={(date) => {
                  changeTextData(date, "end_date");
                }}
                value={form?.end_date}
                isError={errorData?.end_date}
              />
            </>
          ) : (
            <CustomDatePicker
              clearable
              label={"Date"}
              // minDate={new Date()}
              onChange={(date) => {
                changeTextData(date, "start_date");
              }}
              value={form?.start_date}
              isError={errorData?.start_date}
            />
          )}

          <CustomSelectField
            isError={errorData?.applies_locations}
            errorText={errorData?.applies_locations}
            label={"Applies to"}
            value={form?.applies_locations}
            handleChange={(value) => {
              changeTextData(value, "applies_locations");
            }}
          >
            <MenuItem value="ALL_LOCATIONS">ALL LOCATIONS</MenuItem>
            <MenuItem value="SHOWROOM">SHOWROOM</MenuItem>
            <MenuItem value="FACTORY">FACTORY</MenuItem>
            <MenuItem value="WAREHOUSE">WAREHOUSE</MenuItem>
          </CustomSelectField>
          <Autocomplete
            multiple
            id="tags-outlined"
            onChange={(e, value) => {
              changeTextData(value, "excluded_employees");
            }}
            value={form?.excluded_employees}
            // id="tags-standard"
            options={listData?.EMPLOYEES ? listData?.EMPLOYEES : []}
            getOptionLabel={(option) => option.name}
            defaultValue={form?.excluded_employees}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Excluded Employees"
                error={errorData?.excluded_employees}
              />
            )}
          />
        </div>
        <div className={styles.printFlex}>
          {editData?.id ? (
            <ButtonBase
              className={styles.edit}
              onClick={() => handleDelete(editData?.id)}
            >
              Delete
            </ButtonBase>
          ) : (
            <div></div>
          )}
          <Button
            className={styles.createBtn}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : (
              "ADD"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
