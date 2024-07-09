import React from "react";
import { ButtonBase, MenuItem } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import useDeleteDialogHook from "./DeleteDialog.hook";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";

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

const DeleteDialog = ({ isOpen, handleToggle, deleteId }) => {
  const classes = useStyles();
  const { changeTextData, errorData, form, handleSubmit, listData ,updatedList} =
    useDeleteDialogHook({ isOpen, handleToggle, deleteId });

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
            {/* <div className={styles.upperFlex}>Update Status</div> */}
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          <div className={styles.headingWrapper}>
            <div className={styles.heading}>Confirm Action</div>
            <div className={styles.newLine}></div>
            <div className={styles.des}>Do you want to remove this shift ?</div>
          </div>

          <div className={styles.fieldWrapper}>
            <div>
              <CustomSelectField
                isError={errorData?.replacement_shift_id}
                errorText={errorData?.replacement_shift_id}
                label={"Choose a shift to replace with"}
                value={form?.replacement_shift_id}
                handleChange={(value) => {
                  changeTextData(value, "replacement_shift_id");
                }}
              >
                {updatedList?.map((item, index) => (
                  <MenuItem key={`rep_${index}`} value={item?.id}>
                    {item?.name}
                  </MenuItem>
                ))}
              </CustomSelectField>
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase
              onClick={handleSubmit}
              // disabled={!declaration ? true : false}
              className={styles.createBtn}
            >
              Delete
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
