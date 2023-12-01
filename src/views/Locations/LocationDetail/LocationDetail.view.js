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
import downloadImage from "../../../assets/img/ic_download.png";
import LocationCreateView from "../LocationCreate/LocationCreate.view";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
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
    handleEditBtn,
    isSidePanel,
    handleToggleSidePannel,
    openGoogleMaps,
    setSidePanel
  } = useLocationDetail({});
console.log(data)
  const tableStructure = useMemo(() => {
    return [
      {
        key: "code",
        label: "DEPARTMENT CODE",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.squareDiv}>{all?.department?.code}</div>
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
        render: (value, all) => (
          <div>
            {console.log(all)}
            <img
              className={styles.tableQr}
              src={all?.department?.qr_code}
              alt="Ksheer Sager qr code"
            />
            <img
              className={styles.tableDownload}
              onClick={() => handleDownload(all?.department)}
              src={downloadImage}
              alt="Ksheer Sager qr code"
            />
          </div>
        ),
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
        data={allData}
      />
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.editFlex}>
            <div className={styles.heading}>Location Information</div>

            <div className={styles.editBtn}>
              <ButtonBase onClick={handleEditBtn} className={styles.edit}>
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
                {data?.is_department_attendance ? "Department Wise" : "location only"}
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
                      {data?.type}
                    </div>
                    <div className={styles.key}>
                      <span className={styles.value}>Location Address:</span>
                      {data?.address}
                    </div>
                    {/* <div className={styles.key}>
                      <span className={styles.value}>Email:</span>
                      {data?.head?.email}
                    </div> */}
                    <div>
                      <span
                        className={styles.addBtndownload}
                        onClick={() =>
                          openGoogleMaps(data?.location?.coordinates)
                        }
                      >
                        Open Geo Location
                      </span>
                    </div>
                    <div className={styles.imgKey}>
                      <div className={styles.imageKey}>
                        <img
                          className={styles.imgClass}
                          src={data?.qr_code}
                          alt="qr_scanner"
                        />
                      </div>
                      <span
                        className={styles.addBtndownload}
                        onClick={() => handleDownload(data)}
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
        <br />
        <div style={{ width: "100%" }}>
          <DataTables
            {...tableData.datatable}
            {...tableData.datatableFunctions}
          />
        </div>
      </div>

      <SidePanelComponent
        handleToggle={handleEditBtn}
        title={"Create Location"}
        open={isSidePanel}
        side={"right"}
      >
        
        <LocationCreateView isSidePanel={isSidePanel} setSidePanel={setSidePanel}/>
      </SidePanelComponent>
    </div>
  );
}

export default LocationDetail;
