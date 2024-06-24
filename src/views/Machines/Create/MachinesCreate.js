import React from "react";
import { ButtonBase, CircularProgress, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import useMachinesCreateHook from "./MachinesCreateHook";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";

const MachinesCreate = ({ handleToggleSidePannel, isSidePanel, machineId }) => {
  const {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    isSubmitting,
    listData,
  } = useMachinesCreateHook({ handleToggleSidePannel, isSidePanel, machineId });

  return (
    <div className={styles.container}>
      <div className={"formFlex"} style={{ alignItems: "center" }}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.machineName}
            errorText={errorData?.machineName}
            label={"Machine Name*"}
            value={form?.machineName}
            onTextChange={(text) => {
              changeTextData(text, "machineName");
            }}
            onBlur={() => {
              onBlurHandler("machineName");
            }}
          />
        </div>
      </div>

      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.td_id}
            errorText={errorData?.td_id}
            label={"TD ID*"}
            value={form?.td_id}
            onTextChange={(text) => {
              changeTextData(text, "td_id");
            }}
            // onBlur={() => {
            //   onBlurHandler("td_id");
            // }}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.serial_number}
            errorText={errorData?.serial_number}
            label={"Serial Number*"}
            // type={"number"}
            value={form?.serial_number}
            onTextChange={(text) => {
              changeTextData(text, "serial_number");
            }}
            onBlur={() => {
              onBlurHandler("serial_number");
            }}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomSelectField
            isError={errorData?.location_id}
            errorText={errorData?.location_id}
            label={"Location*"}
            value={form?.location_id}
            handleChange={(value) => {
              changeTextData(value, "location_id");
            }}
          >
            {listData?.LOCATIONS?.map((location) => {
              return <MenuItem value={location.id}>{location.name}</MenuItem>;
            })}
          </CustomSelectField>
        </div>
      </div>
      <div className={"headerFlex"}>
        <h4 className={"infoTitle"}>
          <div className={"heading"}>Status</div>
        </h4>
      </div>

      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomSwitch
            value={form?.status}
            handleChange={() => {
              changeTextData(!form?.status, "status");
            }}
            label={form?.status ? `Active` : `Inactive`}
          />
        </div>
      </div>
      <div className={styles.actionButton}>
        <ButtonBase className={"createBtnreset"} onClick={handleSubmit}>
          {isSubmitting ? (
            <CircularProgress color="success" size="20px" />
          ) : machineId ? (
            "Update"
          ) : (
            " ADD"
          )}
        </ButtonBase>
      </div>
    </div>
  );
};

export default MachinesCreate;
