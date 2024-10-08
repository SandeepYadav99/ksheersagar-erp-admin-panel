import React from "react";
import RoleTableComponent from "./Components/RoleTable.component";
import { Button, ButtonBase, IconButton, Tooltip } from "@material-ui/core";
import styles from "./Style.module.css";
import { ArrowBackIos, Delete, Info } from "@material-ui/icons";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import useUserRolesCreateHook from "./UserRolesCreateHook";
import historyUtils from "../../../libs/history.utils";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
const UserRolesCreate = () => {
  const {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    handleDelete,
    permission,
    handleSubmit,
    id,
    permisionChangeHandler,
  } = useUserRolesCreateHook();
  return (
    <div>
      <div className={styles.headerFlex}>
        <h4 className={styles.infoTitle}>
          <ButtonBase onClick={() => historyUtils.goBack()}>
            <ArrowBackIos fontSize={"small"} />{" "}
            {/* <span>
              <b> Employee Update</b>
            </span> */}
          </ButtonBase>
          <div className={styles.heading}>Role</div>
          <Tooltip title="Info" aria-label="info" placement="right">
            <Info fontSize={"small"} />
          </Tooltip>
        </h4>
        {/* {id && (
          <IconButton
            variant={"contained"}
          
            onClick={handleDelete}
            type="button"
          >
            <Delete />
          </IconButton>
         )}  */}
      </div>

      <div className={"plainPaper"}>
        <div className={"formFlex"} style={{ alignItems: "center" }}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.role}
              errorText={errorData?.role}
              label={"Role Name"}
              value={form?.role}
              onTextChange={(text) => {
                changeTextData(text, "role");
              }}
              onBlur={() => {
                onBlurHandler("role");
              }}
            />
          </div>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.role_description}
              errorText={errorData?.role_description}
              label={"Role Description"}
              value={form?.role_description}
              onTextChange={(text) => {
                changeTextData(text, "role_description");
              }}
              onBlur={() => {
                onBlurHandler("role_description");
              }}
              multiline
              rows={4}
            />
          </div>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <RoleTableComponent
              permissions={permission}
              changeTextData={changeTextData}
              permisionChangeHandler={permisionChangeHandler}
            />
          </div>
        </div>
        <br />
        <br />
        {console.log(form?.is_active)}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomSwitch
                value={form?.is_active }
                handleChange={() => {
                  changeTextData(!form?.is_active, "is_active");
                }}
                label={form?.is_active  ? `Active` : "Inactive"}
              />
            </div>
          </div>
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={handleSubmit}
          >
            {id ? "Update" : " Submit"}
           
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserRolesCreate;
