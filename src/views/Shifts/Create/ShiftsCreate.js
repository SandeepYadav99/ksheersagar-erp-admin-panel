import React from "react";
import { ButtonBase, CircularProgress, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";

import useShiftsCreateHook from "./ShiftsCreateHook";
import SessionTable from "../../../components/SectionTable/SectionTable";

const ShiftsCreate = ({ handleToggleSidePannel, isSidePanel, qrId }) => {
  const {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    isSubmitting,
    listData,
  } = useShiftsCreateHook({ handleToggleSidePannel, isSidePanel, qrId });

  return (
    <div className={styles.container}>
      <div className={"formFlex"} style={{ alignItems: "center" }}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.name}
            errorText={errorData?.name}
            label={"Shift Name*"}
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
      <div >
        <SessionTable />
      </div>

      <div className={styles.actionButton}>
        <ButtonBase className={"createBtnDeletOutland"}>
        DELETE
        </ButtonBase>
        <ButtonBase className={"createBtnreset"} onClick={handleSubmit}>
          {isSubmitting ? (
            <CircularProgress color="success" size="20px" />
          ) : qrId ? (
            "Update"
          ) : (
            " ADD"
          )}
        </ButtonBase>
      </div>
    </div>
  );
};

export default ShiftsCreate;
