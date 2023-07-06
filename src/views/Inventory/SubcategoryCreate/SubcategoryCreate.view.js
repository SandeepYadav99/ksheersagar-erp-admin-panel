import React, { useMemo } from "react";
import { Button, ButtonBase, MenuItem } from "@material-ui/core";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import history from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import useDepartmentDetail from "./SubcategoryCreateHook";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";


const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const DepartmentCreateView = ({ handleToggleSidePannel }) => {
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
    listData,
    subcategory_id
  } = useDepartmentDetail({ handleToggleSidePannel });
  const classes = useStyles();
  console.log('list',listData)
  return (
    <div className={styles.departmentWrap}>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.name}
            errorText={errorData?.name}
            label={"Sub-Category Name"}
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
        <CustomSelectField
              isError={errorData?.unit_id}
              errorText={errorData?.unit_id}
              label={"Sub-Category Unit"}
              value={form?.unit_id}
              handleChange={(value) => {
                changeTextData(value, "unit_id");
              }}
            >
              {listData?.UNITS?.map((dT) => {
                return (
                  <MenuItem value={dT?.id} key={dT?.id}>
                    {dT?.label}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          {/* <CustomTextField
            isError={errorData?.name}
            errorText={errorData?.name}
            label={"Sub-Category Unit"}
            value={form?.name}
            onTextChange={(text) => {
              changeTextData(text, "name");
            }}
            onBlur={() => {
              onBlurHandler("name");
            }}
          /> */}
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
          {subcategory_id!==0 ? "Update" : "Create"}
        </ButtonBase>
      </div>
    </div>
  );
};

export default DepartmentCreateView;
