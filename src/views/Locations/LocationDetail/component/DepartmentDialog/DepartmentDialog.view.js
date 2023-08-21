import React, { useCallback, useMemo, useState } from "react";
import {
  Button,
  ButtonBase,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { Close, Visibility, VisibilityOff } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import useDepartmentDialogHook from "./DepartmentDialog.hook";
import { Autocomplete } from "@material-ui/lab";

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

const DepartmentDialog = ({ isOpen, handleToggle, empId ,data}) => {
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
  } = useDepartmentDialogHook({ isOpen, handleToggle, empId ,data});

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
            <div>
              <Autocomplete
                multiple
                id="tags-outlined"
                onChange={(e, value) => {
                  changeTextData(value, "department");
                }}
                value={form?.department}
                // id="tags-standard"
                options={listData?.DEPARTMENTS ? listData?.DEPARTMENTS : []}
                getOptionLabel={(option) => option.name}
                defaultValue={form?.department}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Department Name"
                    error={errorData?.department}
                  />
                )}
              />
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={"createBtnreset"}
            >
              ADD DEPARTMENT
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DepartmentDialog;
