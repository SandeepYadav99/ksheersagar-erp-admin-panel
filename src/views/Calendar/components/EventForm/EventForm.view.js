import React from "react";
import styles from "./Style.module.css";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import useEventFormHook from "./EventForm.hook";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomSwitch from "../../../../components/FormFields/CustomSwitch";
import { Button } from "@material-ui/core";

const EventForm = ({ isOpen, handleToggle, candidateId, isInterview }) => {
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    removeError,
    resData,
    isSubmitted,
    isSubmitting,
    listData,
  } = useEventFormHook({ isOpen, handleToggle, candidateId, isInterview });

  return (
    <div>
      <div className={styles.resetPasswordWrapper}>
        <div className={styles.fieldWrapper}>
          <CustomTextField
            isError={errorData?.title}
            errorText={errorData?.title}
            label={"Holiday Name*"}
            value={form?.title}
            onTextChange={(text) => {
              changeTextData(text, "title");
            }}
            onBlur={() => {
              onBlurHandler("title");
            }}
          />
          <CustomSelectField
            isError={errorData?.type}
            errorText={errorData?.type}
            label={"Choose Holiday Type*"}
            value={form?.type}
            handleChange={(value) => {
              changeTextData(value, "type");
            }}
          >
            <MenuItem value="GAZETTED">GAZETTED</MenuItem>
            <MenuItem value="OPTIONAL">OPTIONAL</MenuItem>
            <MenuItem value="RESTRICTED">RESTRICTED</MenuItem>
          </CustomSelectField>
          <CustomSwitch
            value={form?.is_all_day}
            handleChange={() => {
              changeTextData(!form?.is_all_day, "is_all_day");
            }}
            label={`All Day`}
          />
          <CustomDatePicker
            clearable
            label={"Start Date"}
            // maxDate={new Date()}
            onChange={(date) => {
              changeTextData(date, "start_date");
            }}
            value={form?.start_date}
            isError={errorData?.start_date}
          />
          <CustomDatePicker
            clearable
            label={"End Date"}
            // maxDate={new Date()}
            onChange={(date) => {
              changeTextData(date, "end_date");
            }}
            value={form?.end_date}
            isError={errorData?.end_date}
          />
          <CustomSelectField
            isError={errorData?.type}
            errorText={errorData?.type}
            label={"Applies to"}
            value={form?.type}
            handleChange={(value) => {
              changeTextData(value, "type");
            }}
          >
            <MenuItem value="SHOWROOM">SHOWROOM</MenuItem>
            <MenuItem value="FACTORY">FACTORY</MenuItem>
            <MenuItem value="WAREHOUSE">WAREHOUSE</MenuItem>
          </CustomSelectField>
          <Autocomplete
            multiple
            id="tags-outlined"
            onChange={(e, value) => {
              changeTextData(value, "guest_name");
            }}
            value={form?.guest_name}
            // id="tags-standard"
            options={listData ? listData : []}
            getOptionLabel={(option) => option.title}
            defaultValue={form?.guest_name}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Excluded Employees"
                error={errorData?.guest_name}
              />
            )}
          />
        </div>
        <div className={styles.printFlex}>
          <Button className={styles.createBtn} onClick={handleSubmit}>
            ADD
          </Button>
          <Button>CANCEL</Button>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
