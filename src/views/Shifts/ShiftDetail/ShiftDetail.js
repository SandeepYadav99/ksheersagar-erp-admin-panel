import React from "react";
import ShiftDetailView from "../Componet/ShiftDetailView";
import { ButtonBase } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import historyUtils from "../../../libs/history.utils";
import styles from "./Style.module.css";
import AssociatedEmployees from "../AssociatedEmployees/AssociatedEmployees";

const ShiftDetail = () => {
  return (
    <div>
      <div className={styles.container}>
        <ButtonBase onClick={() => historyUtils.goBack()}>
          <ArrowBackIos fontSize={"small"} />{" "}
          <span className={"capitalize"}>
            <b> Showroom Shift</b>
          </span>
        </ButtonBase>
        <div className={styles.newLine} />
      </div>
      <ShiftDetailView />
      <div className={styles.employe}>
        <AssociatedEmployees />
      </div>
    </div>
  );
};

export default ShiftDetail;
