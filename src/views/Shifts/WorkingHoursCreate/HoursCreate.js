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
            isError={errorData?.name}
            errorText={errorData?.name}
            label={"Full Day Hours"}
            value={form?.name}
            onTextChange={(text) => {
              changeTextData(text, "name");
            }}
            onBlur={() => {
              onBlurHandler("name");
            }}
          />
        </div>
      </div>

      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.upi_id}
            errorText={errorData?.upi_id}
            label={"Half Day Hours"}
            value={form?.upi_id}
            onTextChange={(text) => {
              changeTextData(text, "upi_id");
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
            <strong>Note:  </strong>
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
