import { ButtonBase } from "@material-ui/core";
import React from "react";
import StatusPill from "../../components/Status/StatusPill.component";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import history from "../../libs/history.utils";
import useEmployeeDetails from "./EmployeeDetail.hook";

function EmployeeDetail() {
  const { data, id } = useEmployeeDetails({});
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b> Employee Information</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.editFlex}>
            <div className={styles.heading}>Location Information</div>

            <div className={styles.editBtn}>
              <ButtonBase
                //   onClick={handleEditBtn}
                className={styles.edit}
              >
                EDIT
              </ButtonBase>
            </div>
          </div>

          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Age:</span>
                {data?.age}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Gender:</span>
                {data?.gender}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Phone Number:</span>
                {data?.contact}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Father's Name:</span>
                {data?.father_name}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Email ID:</span>
                {data?.email}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Aadhar No:</span>
                {data?.aadhar_no}
              </div>
              <div className={styles.key}>
                <div className={styles.parentWrap}>
                  {data?.aadhaar_front && (
                    <div className={styles.wrapadhar}>
                      <span className={styles.value}>Aadhar Card Front</span>
                      <img
                        src={data?.aadhaar_front}
                        className={styles.aadharView}
                      />
                    </div>
                  )}
                  {data?.aadhaar_back && (
                    <div className={styles.wrapadhar}>
                      <span className={styles.value}>Aadhar Card Back</span>
                      <img
                        src={data?.aadhaar_back}
                        className={styles.aadharView}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.vertical}></div>
            <div className={styles.right}>
              <div className={styles.left}>
                <div className={styles.detailFlex}>
                  <div className={styles.info}>
                    <div className={styles.key}>
                      <span className={styles.value}>Role:</span>{" "}
                      {data?.head?.name}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>D.O.J:</span>
                      {data?.dojText}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>Permanent Address:</span>
                      {data?.permanent_address}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>
                        Correspondence Address:
                      </span>
                      {data?.current_address}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>Status:</span>
                      {<StatusPill status={data?.status} />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetail;
