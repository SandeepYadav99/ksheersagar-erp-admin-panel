import React, { useMemo } from "react";
import { Button, ButtonBase, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import useDepartmentDetail from "./UnitCreateHook";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const DepartmentCreateView = ({ handleToggleSidePannel,isSidePanel ,empId}) => {
  const {
    form,
    errorData,
    isSubmitting,
    isLoading,
    handleSubmit,
    removeError,
    onBlurHandler,
    changeTextData,
  } = useDepartmentDetail({ handleToggleSidePannel,isSidePanel ,empId});
  const classes = useStyles();
  return (
    <div className={styles.departmentWrap}>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.name}
            errorText={errorData?.name}
            label={"Display Name"}
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
            isError={errorData?.full_name}
            errorText={errorData?.full_name}
            label={"Unit Name"}
            value={form?.full_name}
            onTextChange={(text) => {
              changeTextData(text, "full_name");
            }}
            onBlur={() => {
              onBlurHandler("full_name");
            }}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <div className={styles.checkBox}>
            <input
              style={{cursor:'pointer'}}
              type="checkbox"
              name={"required"}
              value={"required"}
              onClick={() => {
                changeTextData(!form?.is_general, "is_general");
              }}
              id="required"
              checked={form?.is_general}
            />{" "}
            <label htmlFor="required"> Is General ?</label>
            <br />
          </div>
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
            value={form?.is_active}
            handleChange={() => {
              changeTextData(!form?.is_active, "is_active");
            }}
            label={`Active`}
          />
        </div>
      </div>

      <div className={styles.btnCont}>
        <ButtonBase
          disabled={isSubmitting}
          type={"button"}
          onClick={handleSubmit}
          className={styles.createBtn}
        >
          {empId ? "Update" : "Create"}
        </ButtonBase>
      </div>
    </div>
  );
};

export default DepartmentCreateView;
