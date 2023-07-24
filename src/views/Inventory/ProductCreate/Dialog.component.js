import styles from "./Style.module.css";
import {Close} from "@material-ui/icons";
import {ButtonBase, Dialog, Slide} from "@material-ui/core";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogComponent = ({isOpen, handleClose, description, handleConfirm}) => {
    return (
        <Dialog
            keepMounted
            TransitionComponent={Transition}
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            // classes={{paper: classes.dialog}}
            // style={{width:300}}
        >
            <div className={styles.InterviewPopUpWrapper}>
                <div className={styles.closeWrap}>
                    <Close
                        style={{ cursor: "pointer" }}
                        onClick={handleClose}
                    ></Close>
                </div>

                <div className={styles.loginSignupText}>
                    <span className={styles.deleteProductHead}>Delete Product</span>
                    <div className={styles.deleteProductLine} />
                </div>
                <div>
                    <p>Do you want to delete this product?</p>
                </div>
                {/* <div className={styles.descriptionStrong}>
                    {description}
                </div> */}
                <div  className={styles.popupBtnContainer}>
                <ButtonBase onClick={handleClose}  className={styles.deleteBtn}>CANCEL</ButtonBase>

                    <ButtonBase onClick={handleConfirm} className={styles.createBtn}>CONFIRMED</ButtonBase>
                </div>
            </div>
        </Dialog>
    )
};

export default DialogComponent;
