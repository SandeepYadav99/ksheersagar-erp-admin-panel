import React, { useMemo } from "react";
import { Button, ButtonBase, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import useDepartmentDetail from "./DepartmentCreateHook";
import { isAlpha } from "../../../libs/RegexUtils";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const UnitCreateView = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const {
    form,
    errorData,
    isSubmitting,
    isLoading,
    handleSubmit,
    removeError,
    onBlurHandler,
    changeTextData,
    id,
  } = useDepartmentDetail({ handleToggleSidePannel, isSidePanel, empId });
  const classes = useStyles();
  return (
    <div className={styles.departmentWrap}>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.name}
            errorText={errorData?.name}
            label={"Department Name*"}
            value={form?.name}
            onTextChange={(text) => {
              isAlpha(text) && changeTextData(text, "name");
            }}
            // onBlur={() => {
            //   onBlurHandler("name");
            // }}
          />
        </div>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.code}
            errorText={errorData?.code}
            label={"Department Code*"}
            value={form?.code}
            onTextChange={(text) => {
              changeTextData(text, "code");
            }}
          />
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

export default UnitCreateView;
