import React, { useEffect } from "react";
import ShiftDetailView from "../Componet/ShiftDetailView";
import { ButtonBase } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import historyUtils from "../../../libs/history.utils";
import styles from "./Style.module.css";
import AssociatedEmployees from "../AssociatedEmployees/AssociatedEmployees";
import { serviceGetShiftsDetail } from "../../../services/Shifts.service";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionDetailShifts } from "../../../actions/ShiftsLists.action";

const ShiftDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { shiftDetail } = useSelector((state) => state?.Shifts);

  useEffect(() => {
    dispatch(actionDetailShifts(id));
  }, [id]);
  const { shiftDays } = shiftDetail?.details || [];
if(!shiftDays){
  return 
}
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
      <ShiftDetailView shiftDays={shiftDays}/>
      <div className={styles.employe}>
        <AssociatedEmployees />
      </div>
    </div>
  );
};

export default ShiftDetail;
