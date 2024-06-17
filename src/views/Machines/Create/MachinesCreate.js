import React from "react";
import { Button, ButtonBase, IconButton, Tooltip } from "@material-ui/core";
import styles from "./Style.module.css";
import { ArrowBackIos, Delete, Info } from "@material-ui/icons";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";

import historyUtils from "../../../libs/history.utils";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import useMachinesCreateHook from "./MachinesCreateHook";
const MachinesCreate = ({handleToggleSidePannel, isSidePanel, machineId}) => {
  const {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
   
    handleSubmit,
    id,
   
  } = useMachinesCreateHook({handleToggleSidePannel, isSidePanel, machineId});
 
  return (
 
<div className={styles.container}>
      <div >
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
              onBlur={() => {
                onBlurHandler("td_id");
              }}
           
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

       
        <div style={{ textAlign:"end", marginTop:"20px", marginRight:"10px"}}>
        <ButtonBase className={"createBtnreset"} onClick={handleSubmit}>
           {machineId ? "Update" : " ADD"}
            </ButtonBase>
         
        </div>
      </div>
      </div>
  );
};

export default MachinesCreate;
