import React from "react";
import { ButtonBase, CircularProgress, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";

import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import useStaticQrCreateHook from "./StaticQrCreateHook";

const StaticQrCreate = ({ handleToggleSidePannel, isSidePanel, qrId }) => {
  const {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    isSubmitting,
    listData,
  } = useStaticQrCreateHook({ handleToggleSidePannel, isSidePanel, qrId });

  return (
    <div className={styles.container}>
      <div className={"formFlex"} style={{ alignItems: "center" }}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.name}
            errorText={errorData?.name}
            label={"Name"}
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
            label={"UPI ID*"}
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
          <CustomTextField
            isError={errorData?.code}
            errorText={errorData?.code}
            label={"M ID*"}
            // type={"number"}
            value={form?.code}
            onTextChange={(text) => {
              changeTextData(text, "code");
            }}
            // onBlur={() => {
            //   onBlurHandler("code");
            // }}
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
      {/* <div className={"headerFlex"}>
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
      </div> */}
      <div className={styles.actionButton}>
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

export default StaticQrCreate;
