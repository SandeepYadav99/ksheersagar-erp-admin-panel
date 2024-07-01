import styles from "./Style.module.css";
import { Close, Visibility, VisibilityOff } from "@material-ui/icons";
import { ButtonBase, Dialog, IconButton, InputAdornment, MenuItem, Slide } from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import { serviceShiftEmpRemove } from "../../../../services/AssociatedEmplyees.service";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionDeleteShiftEmpDeleted, actionGetJobOpeningShiftEmp } from "../../../../actions/AssociatedEmployees.action";


// import useResetPasswordHook from "./ResetPasswordPopup_Hook";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeletePopup = ({
  isOpen,
  handleDialog,
 
  empId,
  shiftId,
  handleToggleSidePannel
}) => {
  const {id}=useParams()
const dispatch= useDispatch()
  const handleUpdate =useCallback(()=>{
   if(!isOpen) return;
    dispatch(actionDeleteShiftEmpDeleted(shiftId?.shift_id, shiftId?.id))
    dispatch(actionGetJobOpeningShiftEmp(1, {}, {}))
    handleDialog()
    SnackbarUtils.success("Successfully Deleted")
  },[id, shiftId, isOpen, handleDialog])


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
       

        <div className={styles.loginSignupText}>
          <h1 className={styles.headingText}>Remove Employee</h1>
          <div className={styles.newLine} />
        </div>
        <div className={"formGroup"}>
        <div className={styles.title}>Do you want to remove this employee?</div>
        </div>
        <div className={styles.confirmedWrapper}>
        <ButtonBase
            // disabled={isSubmitting}
            className={"createBtnOutland"}
             onClick={handleDialog}
          >
            CANCEL
          </ButtonBase>
          <ButtonBase
            // disabled={isSubmitting}
            className={styles.createBtn}
             onClick={()=>handleUpdate()}
          >
            REMOVE
          </ButtonBase>
        </div>
      </div>
    </Dialog>
  );
};

export default DeletePopup;
