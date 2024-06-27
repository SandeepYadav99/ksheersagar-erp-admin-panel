import styles from "./Style.module.css";
import { Close, Visibility, VisibilityOff } from "@material-ui/icons";
import { ButtonBase, Dialog, IconButton, InputAdornment, MenuItem, Slide } from "@material-ui/core";
import React from "react";

// import useResetPasswordHook from "./ResetPasswordPopup_Hook";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeletePopup = ({
  isOpen,
  handleDialog,
 
  empId,
  isSidePanel,
  handleToggleSidePannel
}) => {
//   const {
//     form,
//     errorData,
//     isSubmitting,
//     onBlurHandler,
//     changeTextData,
//     showPasswordCurrent,
//     setShowPasswordCurrent,
//     handleUpdate,
//   } = useResetPasswordHook({ handleDialog, isOpen, empId });

  return (
    <Dialog
      // fullWidth={true}
      maxWidth={"xs"}
      keepMounted
      TransitionComponent={Transition}
      open={isOpen}
      onClose={handleDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      // classes={{paper: classes.dialog}}
    >
      <div className={styles.InterviewPopUpWrapper}>
        <div className={styles.closeWrap}>
          <Close style={{ cursor: "pointer" }} onClick={handleDialog}></Close>
        </div>

        <div className={styles.loginSignupText}>
          <h1 className={styles.headingText}>Reset Password</h1>
          <div className={styles.newLine} />
        </div>
        <div className={"formGroup"}>
        
        </div>
        <div className={styles.confirmedWrapper}>
          <ButtonBase
            // disabled={isSubmitting}
            className={styles.createBtn}
            // onClick={handleUpdate}
          >
            UPDATE
          </ButtonBase>
        </div>
      </div>
    </Dialog>
  );
};

export default DeletePopup;
