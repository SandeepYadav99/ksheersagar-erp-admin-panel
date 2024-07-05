import React from "react";
import { ButtonBase, CircularProgress, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";

import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";

import useHoursCreateHook from "./HoursCreateHook";

const HoursCreate = ({ handleToggleSidePannel, isSidePanel, qrId }) => {
  const {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    isSubmitting,
    listData,
  } = useHoursCreateHook({ handleToggleSidePannel, isSidePanel, qrId });

  return (
    <div className={styles.container}>
      <div className={"formFlex"} style={{ alignItems: "center" }}>
        <div className={"formGroup"}>
          <CustomTextField
            type="number"
            isError={errorData?.full_day}
            errorText={errorData?.full_day}
            label={"Full Day Hours"}
            value={form?.full_day}
            onTextChange={(text) => {
              changeTextData(text, "full_day");
            }}
            onBlur={() => {
              onBlurHandler("full_day");
            }}
          />
        </div>
      </div>

      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            type="number"
            isError={errorData?.half_day}
            errorText={errorData?.half_day}
            label={"Half Day Hours"}
            value={form?.half_day}
            onTextChange={(text) => {
              changeTextData(text, "half_day");
            }}
            // onBlur={() => {
            //   onBlurHandler("td_id");
            // }}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <div className={styles.notesDes}>
            <strong>Note: </strong>
            By Default, Full-day hours are set by the maximum hours in any
            shift, while half-day hours are half of that.
          </div>
        </div>
      </div>
      <div className={styles.actionButton}>
        <ButtonBase className={"createBtnreset"} onClick={handleSubmit}>
          {isSubmitting ? (
            <CircularProgress color="success" size="20px" />
          ) : qrId ? (
            "Update"
          ) : (
            " SAVE"
          )}
        </ButtonBase>
      </div>
    </div>
  );
};

export default HoursCreate;
