import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  ButtonBase,
  IconButton,
  InputAdornment,
  TextField,
  MenuItem,
} from "@material-ui/core";

import { Close, Visibility, VisibilityOff } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";

import { Autocomplete } from "@material-ui/lab";
import useDownloadDialogHook from "./DownloadHook";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "blue",
    textDecoration: "underline",
  },
  textField: {
    width: "100%",
  },
  closeBtn: {
    position: "absolute",
    right: "10px",
    top: "10px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DownloadDialog = ({ isOpen, handleToggle, empId, data }) => {
  const classes = useStyles();
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    removeError,
    isSubmitting,
    listData,
  } = useDownloadDialogHook({ isOpen, handleToggle, empId, data });

  return (
    <div>
      <Dialog
        onBackdropClick={() => {}}
        keepMounted
        fullWidth={true}
        maxWidth={"sm"}
        TransitionComponent={Transition}
        open={isOpen}
        onClose={() => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/*<DialogTitle id="alert-dialog-title">*/}
        <div className={styles.resetPasswordWrapper}>
          <div className={styles.resetWrapper}>
            <div className={styles.upperFlex}>Add Department</div>
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          {/*</DialogTitle>*/}
          <div className={styles.fieldWrapper}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomDatePicker
                  clearable
                  label={"Select Month & Year"}
                  maxDate={new Date()}
                  onChange={(date) => {
                    changeTextData(date, "date");
                  }}
                  format={
                    "MM-yyyy"
                }
                  value={form?.date}
                  isError={errorData?.date}
                />
              </div>
            </div>

            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomSelectField
                  isError={errorData?.location}
                  errorText={errorData?.location}
                  label={"Location"}
                  value={form?.location}
                  handleChange={(value) => {
                    changeTextData(value, "location");
                  }}
                >
                  {listData?.LOCATIONS?.map((location) => {
                    return (
                      <MenuItem value={location?.id}>{location?.name}</MenuItem>
                    );
                  })}
                </CustomSelectField>
              </div>
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={"createBtnreset"}
            >
              Download
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DownloadDialog;
