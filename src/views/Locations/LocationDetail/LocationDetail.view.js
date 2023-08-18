import React, { useMemo } from "react";
import useLocationDetail from "./LocationDetail.hook";
import history from "../../../libs/history.utils";
import { ButtonBase } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import StatusPill from "../../../components/Status/StatusPill.component";
import DepartmentDialog from "./component/DepartmentDialog/DepartmentDialog.view";
import Constants from "../../../config/constants";
import DataTables from "../../../Datatables/Datatable.table";

function LocationDetail() {
  const {
    isSubmitting,
    data,
    handleDownload,
    isApprovalPopUp,
    toggleApprovalDialog,
    id,
    allData,
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
  } = useLocationDetail({});

  const tableStructure = useMemo(() => {
    return [
      {
        key: "code",
        label: "DEPARTMENT CODE",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.squareDiv}>
            {all?.department?.code}
          </div>
        ),
      },
      {
        key: "name",
        label: "DEPARTMENT NAME",
        sortable: false,
        render: (value, all) => <div>{all?.department?.name}</div>,
      },
      {
        key: "qr",
        label: "DEPARTMENT QR",
        sortable: false,
        render: (value, all) => <div>{<img className={styles.tableQr} src={all?.department?.qr_code}/>}</div>,
      },
    ];
  }, []);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: allData,
      hidePagination: true,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    allData,
  ]);
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>{data?.name} Location</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <DepartmentDialog
        isOpen={isApprovalPopUp}
        handleToggle={toggleApprovalDialog}
        empId={id}
      />
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
                <span className={styles.value}>Location Name:</span>
                {data?.name_en} | {data?.name_hi}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Location City:</span>
                {data?.city}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Location Code:</span>
                {data?.code}
              </div>
              <a
                className={styles.addBtn}
                href={data?.google_page_url}
                target="_blank"
              >
                <div style={{ marginBottom: "7px" }}>
                  <span className={styles.value}>Google Page URL:</span>
                  {data?.google_page_url}
                </div>
              </a>

              <div className={styles.key}>
                <span className={styles.value}>Attendance Type:</span>
                {data?.is_department_attendance ? "Department Wise" : "-"}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Phone Number:</span>
                {data?.contact}
              </div>

              <div className={styles.key}>
                <span className={styles.value}>Status:</span>
                {<StatusPill status={data?.status} />}
              </div>
            </div>
            <div className={styles.vertical}></div>
            <div className={styles.right}>
              <div className={styles.left}>
                <div className={styles.detailFlex}>
                  <div className={styles.info}>
                    <div className={styles.key}>
                      <span className={styles.value}>Location Manager:</span>{" "}
                      {data?.head?.name}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>Location Type:</span>
                      {data?.head?.code}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>Location Address:</span>
                      {data?.address}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>Email:</span>
                      {data?.head?.email}
                    </div>
                    <div className={styles.imgKey}>
                      <img
                        className={styles.imgClass}
                        src={data?.qr_code}
                        alt="qr_scanner"
                      />
                      <span
                        className={styles.addBtn}
                        onClick={() => handleDownload(data?.qr_code)}
                      >
                        Download
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.editFlex}>
          <div className={styles.heading}>Department List</div>
          <div className={styles.btnCont}>
            <ButtonBase
              onClick={toggleApprovalDialog}
              type={"button"}
              className={styles.createBtn}
            >
              ADD DEPARTMENT
            </ButtonBase>
          </div>
        </div>
        <br/>
        <div style={{ width: "100%" }}>
          <DataTables
            {...tableData.datatable}
            {...tableData.datatableFunctions}
          />
        </div>
      </div>
    </div>
  );
}

export default LocationDetail;
