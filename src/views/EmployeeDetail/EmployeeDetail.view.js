import { ButtonBase } from "@material-ui/core";
import React from "react";
import StatusPill from "../../components/Status/StatusPill.component";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import history from "../../libs/history.utils";
import useEmployeeDetails from "./EmployeeDetail.hook";
import EmpRecord from "./Component/EmpRecord/EmpRecord"
function EmployeeDetail() {
  const { data, id , handleEditBtn, handleEmpInfoPage} = useEmployeeDetails({});
 

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
        <div className={styles.editBtn}>
          <ButtonBase onClick={handleEditBtn} className={styles.edit}>
            EDIT PROFILE
          </ButtonBase>
        </div>
      </div>
      <div className={styles.upperWrap}>
        <div className={styles.plainPaperLeft}>
          <div className={styles.profileWrap}>
            <img
              className={styles.imageProfile}
              src={data?.image}
              alt="Profile Image"
            />
            <span>{data?.name_en}</span>
            <span className={styles.nameWrap}>{data?.name_hi}</span>
            <span>{data?.emp_code}</span>
            <span>{data?.location?.name}</span>
            <span>{data?.department?.name}</span>
            <img src={data?.qr_code} />
          </div>
          <div className={styles.btnCont}>
            {/* <a href={`${`http://91.205.173.97:8587/employe/information/${data?.id}`}`} target="_blank" rel="noreferrer"> */}

            <ButtonBase
              // disabled={isSubmitting}
              type={"button"}
              onClick={()=>handleEmpInfoPage(data)}
              className={styles.createProfile_Detail}
            >
              DOWNLOAD ID CARD
            </ButtonBase>
            {/* </a> */}
          </div>
        </div>
        <div className={styles.plainPaperRight}>
          <div className={styles.newContainer}>
            <div className={styles.editFlex}>
              <div className={styles.heading}>Location Information</div>
            </div>


            <div className={styles.mainFlex}>
              
              <div className={styles.left}>
                <div className={styles.key}>
                  <span className={styles.value}>Age:</span>
                  {data?.age ? `${data?.age} Years` : " "}
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
                  <span className={styles.value}>UAN No:</span>
                  {data?.uan_no}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>ESI No:</span>
                  {data?.esi_no}
                </div>
                <div className={styles.key}>
                  <span className={styles.value}>External employee code:</span>
                  {data?.external_emp_code || "N/A"}
                </div>
                <div className={styles.key}>
                  <div className={styles.parentWrap}>
                    {data?.aadhaar_front && (
                      <div className={styles.wrapadhar}>
                        <span className={styles.value}>Aadhar Card Front</span>
                        <a href={data?.aadhaar_front} target="_blank" rel="noreferrer">
                          <img
                            src={data?.aadhaar_front}
                            className={styles.aadharView}
                          />
                        </a>
                      </div>
                    )}
                    {data?.aadhaar_back && (
                      <div className={styles.wrapadhar}>
                        <span className={styles.value}>Aadhar Card Back</span>
                        <a href={data?.aadhaar_back} target="_blank" rel="noreferrer">
                          <img
                            src={data?.aadhaar_back}
                            className={styles.aadharView}
                          />
                        </a>
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
                        {data?.role?.name}
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
     <EmpRecord id={id}/>
    </div>
  );
}

export default React.memo(EmployeeDetail);
