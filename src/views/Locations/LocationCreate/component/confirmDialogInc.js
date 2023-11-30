
import {
  Button,
  ButtonBase,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
} from "@material-ui/core";
import React from "react";
import GooglePlaceComponent from "./GooglePlace/GooglePlace.component";
import { Suspense } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogIncComponent = ({
  isOpen,
  handleClose,
  handleConfirm,
  lat,
  lng,
  handleMapAddress,
  handleCityCountry,
  handleDialogToggle,
}) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      keepMounted
      TransitionComponent={Transition}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      // classes={{paper: classes.dialog}}
    >
      <DialogContent>
        <Suspense fallback={<CircularProgress />}>
          <GooglePlaceComponent
            lat={lat ? lat : 0}
            lng={lng ? lng : 0}
            updateAddress={handleMapAddress}
            handelCityCountry={handleCityCountry}
          />
        </Suspense>
      </DialogContent>
      <DialogActions>
        <Button
          variant={"contained"}
          color={"primary"}
          onClick={handleDialogToggle}
          style={{ marginRight: "15px" }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogIncComponent;
