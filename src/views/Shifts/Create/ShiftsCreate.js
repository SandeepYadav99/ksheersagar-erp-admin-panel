import React from "react";
import { ButtonBase, CircularProgress, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import ShiftDetailsIncludeForm from "./component/ShiftDetailsincludes/ShiftDetailsIncludes.component";
import useShiftsCreateHook from "./ShiftsCreateHook";

const ShiftsCreate = ({ handleToggleSidePannel, isSidePanel, editData }) => {
  const {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    isSubmitting,
    shiftRef,
  } = useShiftsCreateHook({ handleToggleSidePannel, isSidePanel, editData });

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
      <div className={styles.shiftcontainer}>
        <div className={styles.shiftHeader}>
          <div className={styles.divHead}>DAY</div>
          <div className={styles.divHead1}>START TIME</div>
          <div className={styles.divHead1}>END TIME</div>
          <div className={styles.divHead}>TOTAL HOURS</div>
          <div className={styles.divHead21}>WEEK OFF</div>
        </div>
        <ShiftDetailsIncludeForm ref={shiftRef} isSidePanel={isSidePanel}/>
      </div>

      <div className={styles.actionButton}>
        {/* <ButtonBase className={"createBtnDeletOutland"}>DELETE</ButtonBase> */}
        <ButtonBase className={"createBtnreset"} onClick={handleSubmit}>
          {isSubmitting ? (
            <CircularProgress color="success" size="20px" />
          ) : editData?.id ? (
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
