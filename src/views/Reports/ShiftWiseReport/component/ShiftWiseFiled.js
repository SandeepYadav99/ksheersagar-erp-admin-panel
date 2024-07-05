import React from "react";
import styles from "./Style.module.css";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";

import { MenuItem } from "@material-ui/core";
import useShiftWiseFiledHook from "./ShiftWiseFiledHook";
const ShiftWiseFiled = () => {
  const { form, changeTextData } = useShiftWiseFiledHook();
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
            label={"Shifts"}
            value={form?.location_id}
            handleChange={(value) => {
              changeTextData(value, "location_id");
            }}
          >
            <MenuItem value={"All Shifts"}>All Shifts</MenuItem>;
          </CustomSelectField>
        </div>
      <div className={"formGroup"}>
        
        </div>
     
        <div className={"formGroup"}></div>
        <div className={"formGroup"}></div>
      </div>
    </div>
  );
};

export default ShiftWiseFiled;
