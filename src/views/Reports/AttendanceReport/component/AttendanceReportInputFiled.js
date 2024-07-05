import React from "react";
import styles from "./Style.module.css";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import useAttendanceReportInputFiledHook from "./AttendanceReportInputFiledHook";
import { MenuItem } from "@material-ui/core";
const AttendanceReportInputFiled = () => {
  const { form, changeTextData } = useAttendanceReportInputFiledHook();
  return (
    <div className={styles.attendaceContainer}>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomSelectField
            // isError={errorData?.location_id}
            // errorText={errorData?.location_id}
            label={"Employee"}
            value={form?.location_id}
            handleChange={(value) => {
              changeTextData(value, "location_id");
            }}
          >
            <MenuItem value={"All_Employees"}>All Employees</MenuItem>;
          </CustomSelectField>
        </div>
        <div className={"formGroup"}>
          <CustomSelectField
            // isError={errorData?.location_id}
            // errorText={errorData?.location_id}
            label={"Location"}
            value={form?.location_id}
            handleChange={(value) => {
              changeTextData(value, "location_id");
            }}
          >
            <MenuItem value={"All_Locations"}>All Locations</MenuItem>;
          </CustomSelectField>
        </div>
        <div className={"formGroup"}>
          <CustomSelectField
            // isError={errorData?.location_id}
            // errorText={errorData?.location_id}
            label={"Department"}
            value={form?.location_id}
            handleChange={(value) => {
              changeTextData(value, "location_id");
            }}
          >
            <MenuItem value={"All_Department"}>All Department</MenuItem>;
          </CustomSelectField>
        </div>
        <div className={"formGroup"}>
          <CustomSelectField
            // isError={errorData?.location_id}
            // errorText={errorData?.location_id}
            label={"Role"}
            value={form?.location_id}
            handleChange={(value) => {
              changeTextData(value, "location_id");
            }}
          >
            <MenuItem value={"All_Role"}>All Role</MenuItem>;
          </CustomSelectField>
        </div>
        
      </div>
      <div className={"formFlex"}>
      <div className={"formGroup"}>
          <CustomSelectField
            // isError={errorData?.location_id}
            // errorText={errorData?.location_id}
            label={"Date Range"}
            value={form?.location_id}
            handleChange={(value) => {
              changeTextData(value, "location_id");
            }}
          >
            <MenuItem value={"20/06/2024 - 20/06/2024"}>20/06/2024 - 20/06/2024</MenuItem>;
          </CustomSelectField>
        </div>
      <div className={"formGroup"}>
          <CustomSelectField
            // isError={errorData?.location_id}
            // errorText={errorData?.location_id}
            label={"Employee Status"}
            value={form?.location_id}
            handleChange={(value) => {
              changeTextData(value, "location_id");
            }}
          >
            <MenuItem value={""}></MenuItem>;
          </CustomSelectField>
        </div>
     
        <div className={"formGroup"}></div>
        <div className={"formGroup"}></div>
      </div>
    </div>
  );
};

export default AttendanceReportInputFiled;
